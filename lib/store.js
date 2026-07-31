// Waar de spellen bewaard worden.
//
// Drie mogelijkheden, in deze volgorde:
//
//   1. Een gewone Redis via REDIS_URL — dat is wat de Redis-integratie
//      van Vercel klaarzet.
//   2. De REST-variant van Upstash (KV_REST_API_URL + token), voor als
//      je later toch die integratie kiest.
//   3. Geen van beide: dan houden we het spel in het geheugen. Precies
//      wat je lokaal wil, zonder enige configuratie.

const TCP_URL = process.env.REDIS_URL || process.env.KV_URL || process.env.REDIS_URI || '';

const REST_URL = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || '';
const REST_TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || '';

const gebruiktTcp = Boolean(TCP_URL);
const gebruiktRest = Boolean(REST_URL && REST_TOKEN);

export const gebruiktRedis = gebruiktTcp || gebruiktRest;

// Handig als er iets niet klopt: welke variabelen zien we wél staan?
// Alleen de namen — nooit de waarden, want daar zit het wachtwoord in.
export function gevondenOpslagVariabelen() {
  return Object.keys(process.env).filter((naam) => /^(REDIS|KV_|UPSTASH)/i.test(naam)).sort();
}

// Een spel verdwijnt twaalf uur na de laatste aanpassing.
const TTL_SECONDEN = 12 * 60 * 60;

/* ------------------------------- lokaal ------------------------------- */

const geheugen = new Map();

/* --------------------------- Redis over TCP --------------------------- */

// Serverless start dit bestand vaak opnieuw op, maar hergebruikt een
// warme instantie. We houden daarom één verbinding per instantie vast in
// plaats van er bij elke aanvraag een op te zetten.
let verbindingBelofte = null;

async function verbinding() {
  if (!verbindingBelofte) {
    verbindingBelofte = (async () => {
      const { createClient } = await import('redis');
      const klant = createClient({
        url: TCP_URL,
        socket: {
          connectTimeout: 5000,
          reconnectStrategy: (pogingen) => Math.min(pogingen * 100, 2000),
        },
      });
      // Zonder deze luisteraar legt een netwerkhik het hele proces om.
      klant.on('error', (fout) => console.error('[redis]', fout.message));
      await klant.connect();
      return klant;
    })().catch((fout) => {
      verbindingBelofte = null; // de volgende aanvraag mag het opnieuw proberen
      throw fout;
    });
  }
  return verbindingBelofte;
}

/* --------------------------- Redis over REST -------------------------- */

async function rest(commando) {
  const antwoord = await fetch(REST_URL, {
    method: 'POST',
    headers: { Authorization: `Bearer ${REST_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commando),
  });
  if (!antwoord.ok) throw new Error(`Redis gaf ${antwoord.status}: ${await antwoord.text()}`);
  const data = await antwoord.json();
  if (data.error) throw new Error(`Redis: ${data.error}`);
  return data.result;
}

/* ------------------------------------------------------------------ *
 * De drie bewerkingen die de quiz nodig heeft
 * ------------------------------------------------------------------ */

// Alleen schrijven als er ondertussen niemand anders geschreven heeft.
// Twee telefoons die op hetzelfde moment antwoorden mogen elkaars punten
// niet overschrijven.
const CAS = `
local huidig = redis.call('GET', KEYS[1])
if huidig == ARGV[1] then
  redis.call('SET', KEYS[1], ARGV[2], 'EX', ARGV[3])
  return 1
end
return 0
`;

function sleutel(code) {
  return `quiz:${code}`;
}

async function haal(k) {
  if (gebruiktTcp) return (await verbinding()).get(k);
  if (gebruiktRest) return rest(['GET', k]);
  return geheugen.get(k) ?? null;
}

async function zetAlsNieuw(k, waarde) {
  if (gebruiktTcp) {
    const gezet = await (await verbinding()).set(k, waarde, { NX: true, EX: TTL_SECONDEN });
    return gezet === 'OK';
  }
  if (gebruiktRest) {
    return (await rest(['SET', k, waarde, 'NX', 'EX', String(TTL_SECONDEN)])) === 'OK';
  }
  if (geheugen.has(k)) return false;
  geheugen.set(k, waarde);
  return true;
}

async function vervangAls(k, verwacht, nieuw) {
  if (gebruiktTcp) {
    const klant = await verbinding();
    const uitkomst = await klant.eval(CAS, {
      keys: [k],
      arguments: [verwacht, nieuw, String(TTL_SECONDEN)],
    });
    return Number(uitkomst) === 1;
  }
  if (gebruiktRest) {
    return Number(await rest(['EVAL', CAS, '1', k, verwacht, nieuw, String(TTL_SECONDEN)])) === 1;
  }
  geheugen.set(k, nieuw); // één proces, dus hier kan niets tussenkomen
  return true;
}

/* ------------------------------- publiek ------------------------------ */

export async function lees(code) {
  const rauw = await haal(sleutel(code));
  return rauw ? JSON.parse(rauw) : null;
}

export async function schrijfNieuw(code, spel) {
  return zetAlsNieuw(sleutel(code), JSON.stringify(spel));
}

/**
 * Leest het spel, laat `aanpassing` erop los en schrijft het terug.
 * Botst dat met een gelijktijdige schrijver, dan proberen we opnieuw met
 * verse gegevens.
 *
 * `aanpassing` geeft terug wat de aanroeper wil weten; geeft ze
 * `{ fout }` terug, dan slaan we niets op.
 */
export async function pasAan(code, aanpassing, pogingen = 4) {
  const k = sleutel(code);

  for (let poging = 0; poging < pogingen; poging++) {
    const rauwVoor = await haal(k);
    if (!rauwVoor) return { fout: 'Deze quiz bestaat niet (meer). Klopt de code?' };

    const spel = JSON.parse(rauwVoor);
    const uitkomst = aanpassing(spel) || {};
    if (uitkomst.fout) return uitkomst;

    spel.versie = (spel.versie || 0) + 1;
    const rauwNa = JSON.stringify(spel);

    if (await vervangAls(k, rauwVoor, rauwNa)) return { ...uitkomst, spel };
    // Iemand was ons voor: opnieuw, met de nieuwe stand.
  }
  return { fout: 'Het was even te druk. Probeer het opnieuw.' };
}
