// Waar de spellen bewaard worden.
//
// Staan de Upstash-variabelen ingesteld (op Vercel), dan gaat alles naar
// Redis. Staan ze er niet (lokaal op je laptop), dan houden we het spel
// gewoon in het geheugen. Dezelfde code, geen configuratie nodig om te
// testen.

const URL_ = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;

export const gebruiktRedis = Boolean(URL_ && TOKEN);

// Een spel verdwijnt twaalf uur na de laatste aanpassing.
const TTL_SECONDEN = 12 * 60 * 60;

/* ------------------------------- lokaal ------------------------------- */

const geheugen = new Map();

/* ------------------------------- Redis -------------------------------- */

async function redis(commando) {
  const antwoord = await fetch(URL_, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commando),
  });
  if (!antwoord.ok) {
    throw new Error(`Redis gaf ${antwoord.status}: ${await antwoord.text()}`);
  }
  const data = await antwoord.json();
  if (data.error) throw new Error(`Redis: ${data.error}`);
  return data.result;
}

// Alleen schrijven als er ondertussen niemand anders geschreven heeft.
// Twee telefoons die op hetzelfde moment antwoorden mogen elkaar niet
// overschrijven.
const CAS = `
local huidig = redis.call('GET', KEYS[1])
if huidig == ARGV[1] then
  redis.call('SET', KEYS[1], ARGV[2], 'EX', ARGV[3])
  return 1
end
if huidig == false and ARGV[1] == '' then
  redis.call('SET', KEYS[1], ARGV[2], 'EX', ARGV[3])
  return 1
end
return 0
`;

/* ------------------------------- publiek ------------------------------ */

function sleutel(code) {
  return `quiz:${code}`;
}

export async function lees(code) {
  if (!gebruiktRedis) {
    const rauw = geheugen.get(sleutel(code));
    return rauw ? JSON.parse(rauw) : null;
  }
  const rauw = await redis(['GET', sleutel(code)]);
  return rauw ? JSON.parse(rauw) : null;
}

export async function schrijfNieuw(code, spel) {
  const rauw = JSON.stringify(spel);
  if (!gebruiktRedis) {
    if (geheugen.has(sleutel(code))) return false;
    geheugen.set(sleutel(code), rauw);
    return true;
  }
  const gezet = await redis(['SET', sleutel(code), rauw, 'NX', 'EX', String(TTL_SECONDEN)]);
  return gezet === 'OK';
}

/**
 * Leest het spel, laat `aanpassing` erop los en schrijft het terug.
 * Botst dat met een gelijktijdige schrijver, dan proberen we opnieuw
 * met verse gegevens.
 *
 * `aanpassing` geeft terug wat de aanroeper wil weten; geeft ze
 * `{ fout }` terug, dan slaan we niets op.
 */
export async function pasAan(code, aanpassing, pogingen = 4) {
  for (let poging = 0; poging < pogingen; poging++) {
    const rauwVoor = gebruiktRedis
      ? await redis(['GET', sleutel(code)])
      : geheugen.get(sleutel(code)) ?? null;

    if (!rauwVoor) return { fout: 'Deze quiz bestaat niet (meer). Klopt de code?' };

    const spel = JSON.parse(rauwVoor);
    const uitkomst = aanpassing(spel) || {};
    if (uitkomst.fout) return uitkomst;

    spel.versie = (spel.versie || 0) + 1;
    const rauwNa = JSON.stringify(spel);

    if (!gebruiktRedis) {
      // Eén proces, dus hier kan niets tussenkomen.
      geheugen.set(sleutel(code), rauwNa);
      return { ...uitkomst, spel };
    }

    const gelukt = await redis(['EVAL', CAS, '1', sleutel(code), rauwVoor, rauwNa, String(TTL_SECONDEN)]);
    if (gelukt === 1) return { ...uitkomst, spel };
    // Iemand was ons voor: opnieuw, met de nieuwe stand.
  }
  return { fout: 'Het was even te druk. Probeer het opnieuw.' };
}
