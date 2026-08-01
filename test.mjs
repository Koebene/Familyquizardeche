// Controle van de hele quiz. Draaien met:
//
//   node test.mjs
//
// Heeft niets nodig behalve Node: de test start zelf een server op een
// vrije poort, speelt een volledige quiz uit en zet alles daarna weer af.

import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';
import { statSync } from 'node:fs';

import { rondes, tussenstandNa } from './lib/quiz-data.js';
import { FOTOS } from './lib/fotos.js';
import { isGoedAntwoord, normaliseer, PUNTEN, berekenPunten } from './lib/engine.js';
import { lootRonde, VERHOUDING } from './lib/loting.js';
import { maakQrMatrix, formaatBits, versieBits } from './public/qr.js';

const HIER = dirname(fileURLToPath(import.meta.url));

let fouten = 0;
let gedaan = 0;
const check = (naam, ok, extra = '') => {
  gedaan++;
  if (!ok) {
    fouten++;
    console.log(`  FOUT  ${naam}${extra ? `  — ${extra}` : ''}`);
  }
};
const kop = (tekst) => console.log(`\n${tekst}`);

/* ================================================================== *
 * 1. Kloppen de vragen zelf?
 * ================================================================== */

kop('De vragen');

check('er zijn tien rondes', rondes.length === 10, `${rondes.length} gevonden`);

const ids = new Set();
for (const ronde of rondes) {
  const waar = `ronde "${ronde.id}"`;
  check(`${waar} heeft een unieke id`, !ids.has(ronde.id));
  ids.add(ronde.id);
  check(`${waar} heeft een naam, uitleg en icoon`, !!(ronde.naam && ronde.uitleg && ronde.icoon));
  check(`${waar} heeft een redelijke tijdslimiet`, ronde.seconden >= 15 && ronde.seconden <= 120, String(ronde.seconden));
  check(`${waar} heeft vragen`, Array.isArray(ronde.vragen) && ronde.vragen.length > 0);

  // Een ruime voorraad is het punt van de loting: minstens anderhalf
  // keer wat er in één avond gespeeld wordt.
  const perSpel = ronde.perSpel || ronde.vragen.length;
  check(`${waar} heeft voorraad genoeg`, ronde.vragen.length >= perSpel * 1.5,
    `${ronde.vragen.length} vragen voor ${perSpel} per spel`);

  const perNiveau = { makkelijk: 0, gemiddeld: 0, moeilijk: 0 };
  for (const v of ronde.vragen) perNiveau[v.niveau || 'gemiddeld']++;
  for (const [niveau, deel] of Object.entries(VERHOUDING)) {
    // Genoeg van elk niveau om de verhouding te kunnen halen.
    check(`${waar} heeft genoeg ${niveau}e vragen`, perNiveau[niveau] >= Math.round(perSpel * deel),
      `${perNiveau[niveau]} beschikbaar, ${Math.round(perSpel * deel)} nodig`);
  }

  ronde.vragen.forEach((v, i) => {
    const waarV = `${ronde.id} vraag ${i + 1}`;
    check(`${waarV} heeft een geldig niveau`, ['makkelijk', 'gemiddeld', 'moeilijk'].includes(v.niveau || 'gemiddeld'), String(v.niveau));

    if (ronde.type === 'mc' || ronde.type === 'woord') {
      check(`${waarV} heeft vier opties`, v.opties?.length === 4, String(v.opties?.length));
      check(`${waarV} wijst een geldige optie aan`, Number.isInteger(v.antwoord) && v.antwoord >= 0 && v.antwoord < 4, String(v.antwoord));
      const uniek = new Set(v.opties?.map(normaliseer));
      check(`${waarV} heeft geen dubbele opties`, uniek.size === 4);
      if (ronde.type === 'woord') check(`${waarV} heeft woord en taal`, !!(v.woord && v.taal));
      else check(`${waarV} heeft een vraagtekst`, !!v.q);
    }

    if (ronde.type === 'truefalse') {
      check(`${waarV} is waar of niet waar`, typeof v.antwoord === 'boolean');
      check(`${waarV} heeft een weetje`, !!v.weetje);
    }

    if (ronde.type === 'estimate') {
      check(`${waarV} heeft een getal als antwoord`, Number.isFinite(v.antwoord), String(v.antwoord));
    }

    if (ronde.type === 'geo' || ronde.type === 'zoom') {
      check(`${waarV} verwijst naar een bestaande foto`, !!FOTOS[v.foto], v.foto);
      check(`${waarV} heeft alternatieve antwoorden`, (v.accept?.length ?? 0) > 0);
      check(`${waarV} keurt zijn eigen antwoord goed`, isGoedAntwoord(v.antwoord, v));
      const bestand = FOTOS[v.foto]?.bestand;
      if (bestand) {
        const pad = join(HIER, 'public', bestand.replace(/^\//, ''));
        let grootte = 0;
        try { grootte = statSync(pad).size; } catch { /* blijft 0 */ }
        check(`${waarV}: het fotobestand staat er`, grootte > 10000, `${bestand} (${grootte} bytes)`);
        check(`${waarV}: de foto is niet loodzwaar`, grootte < 1200 * 1024, `${(grootte / 1024).toFixed(0)}kB`);
      }
    }

    if (ronde.type === 'mc') {
      check(`${waarV} heeft een domein`, !!v.domein);
    }

    if (ronde.type === 'open') {
      check(`${waarV} heeft een antwoord`, !!v.antwoord);
      check(`${waarV} keurt zijn eigen antwoord goed`, isGoedAntwoord(v.antwoord, v));
    }

    if (ronde.type === 'charades' || ronde.type === 'tekenen') {
      check(`${waarV} heeft een opdracht`, !!v.q);
      check(`${waarV} heeft sleutelwoorden`, (v.sleutelwoorden?.length ?? 0) > 0);
      // De opdracht zelf moet als antwoord aanvaard worden, anders klopt
      // er iets niet met de sleutelwoorden.
      check(`${waarV} keurt de opdracht zelf goed`, isGoedAntwoord(v.q, { antwoord: v.q, sleutelwoorden: v.sleutelwoorden }), v.q);
    }
  });
}

for (const id of tussenstandNa) {
  check(`tussenstand verwijst naar bestaande ronde "${id}"`, ids.has(id));
}
check('de laatste ronde krijgt geen tussenstand', !tussenstandNa.includes(rondes[rondes.length - 1].id));

// Elke foto die we gebruiken moet een bronvermelding hebben, want het
// gaat om werk van iemand anders.
const gebruikteFotos = new Set(rondes.flatMap((r) => r.vragen.map((v) => v.foto)).filter(Boolean));
for (const sleutel of gebruikteFotos) {
  const foto = FOTOS[sleutel];
  check(`foto "${sleutel}" heeft een maker`, !!foto?.maker);
  check(`foto "${sleutel}" heeft een licentie`, !!foto?.licentie);
  check(`foto "${sleutel}" verwijst naar zijn bronpagina`, /^https:\/\/commons\.wikimedia\.org\//.test(foto?.pagina || ''));
}

/* ================================================================== *
 * 1b. Doet de loting wat ze belooft?
 * ================================================================== */

kop('De loting');

for (const ronde of rondes) {
  const perSpel = ronde.perSpel || ronde.vragen.length;
  const tellingen = { makkelijk: 0, gemiddeld: 0, moeilijk: 0 };
  const gezien = new Set();
  const RONDES = 200;

  for (let n = 0; n < RONDES; n++) {
    const nummers = lootRonde(ronde);
    if (n === 0) check(`${ronde.id}: loot het juiste aantal`, nummers.length === perSpel, `${nummers.length} van ${perSpel}`);
    if (new Set(nummers).size !== nummers.length) check(`${ronde.id}: geen dubbele vragen`, false);
    for (const i of nummers) {
      gezien.add(i);
      tellingen[ronde.vragen[i].niveau || 'gemiddeld']++;
    }
  }

  const totaal = perSpel * RONDES;
  for (const [niveau, deel] of Object.entries(VERHOUDING)) {
    const gemeten = tellingen[niveau] / totaal;
    check(`${ronde.id}: aandeel ${niveau} klopt ongeveer`, Math.abs(gemeten - deel) < 0.12,
      `${(gemeten * 100).toFixed(0)}% tegenover de bedoelde ${(deel * 100).toFixed(0)}%`);
  }
  check(`${ronde.id}: op den duur komt elke vraag aan bod`, gezien.size === ronde.vragen.length,
    `${gezien.size} van ${ronde.vragen.length} vragen ooit geloot`);
}

/* ================================================================== *
 * 2. Worden echte antwoorden herkend?
 * ================================================================== */

kop('Antwoorden van echte mensen');

// Vragen opzoeken op inhoud, niet op volgnummer: de voorraad groeit en
// schuift, en dan mag een test niet stilletjes iets anders gaan testen.
function vraag(rondeId, zoek) {
  const ronde = rondes.find((r) => r.id === rondeId);
  const gevonden = ronde.vragen.find((v) =>
    (v.antwoord && String(v.antwoord).toLowerCase().includes(zoek.toLowerCase())) ||
    (v.q && String(v.q).toLowerCase().includes(zoek.toLowerCase())) ||
    (v.foto && v.foto === zoek));
  if (!gevonden) throw new Error(`test verwijst naar een vraag die niet bestaat: ${rondeId} / "${zoek}"`);
  return gevonden;
}

function opdracht(rondeId, zoek) {
  const v = vraag(rondeId, zoek);
  return { antwoord: v.q, sleutelwoorden: v.sleutelwoorden };
}

const goed = (invoer, v, label) => check(`"${invoer}" is goed (${label})`, isGoedAntwoord(invoer, v));
const mis = (invoer, v, label) => check(`"${invoer}" is fout (${label})`, !isGoedAntwoord(invoer, v));

const beethoven = vraag('cryptisch', 'Beethoven');
goed('Ludwig van Beethoven', beethoven, 'volledig');
goed('beethoven', beethoven, 'achternaam');
mis('Mozart', beethoven, 'andere componist');

const boonen = vraag('cryptisch', 'Boonen');
goed('Tom Boonen', boonen, 'volledig');
goed('boonen', boonen, 'achternaam');
goed('Tommeke', boonen, 'bijnaam');

const mercator = vraag('cryptisch', 'Mercator');
goed('Mercator', mercator, 'achternaam');
goed('Gerardus Mercator', mercator, 'volledig');
goed('mercatoor', mercator, 'typfout');

const belgie = vraag('geo', 'brugge');
goed('België', belgie, 'met accent');
goed('belgie', belgie, 'zonder accent');
mis('Nederland', belgie, 'ander land');

const uk = vraag('geo', 'towerbridge');
goed('Engeland', uk, 'volkstaal');
goed('uk', uk, 'afkorting');
goed('Verenigd Koninkrijk', uk, 'officieel');

const emiraten = vraag('geo', 'dubai');
goed('Verenigde Arabische Emiraten', emiraten, 'voluit');
goed('emiraten', emiraten, 'kort');

const spider = vraag('emoji', 'Spider-Man');
goed('spiderman', spider, 'aaneen');
goed('Spider-Man', spider, 'met streepje');
mis('Batman', spider, 'andere held');

const aardbei = vraag('zoom', 'aardbei');
goed('aardbeien', aardbei, 'meervoud');
goed('een aardbei', aardbei, 'met lidwoord');
mis('framboos', aardbei, 'ander fruit');

const pluis = vraag('zoom', 'paardenbloem');
goed('pluizenbol', pluis, 'volksnaam');
goed('paardenbloem', pluis, 'gewone naam');

// De opvoerrondes werken op sleutelwoorden, niet op de hele zin.
const fietsen = opdracht('uitbeelden', 'Fietsen');
goed('fietsen', fietsen, 'kernwoord');
goed('hij is aan het fietsen', fietsen, 'in een zin');
goed('velo', fietsen, 'synoniem');
mis('lopen', fietsen, 'iets anders');

const stofzuigen = opdracht('uitbeelden', 'Stofzuigen');
goed('stofzuigen', stofzuigen, 'kernwoord');
goed('met de stofzuiger bezig', stofzuigen, 'in een zin');

const tekenKat = opdracht('tekenen', 'Een kat');
goed('kat', tekenKat, 'kernwoord');
goed('een poes', tekenKat, 'synoniem met lidwoord');
mis('hond', tekenKat, 'verkeerd dier');

const vuurtoren = opdracht('tekenen', 'vuurtoren');
goed('vuurtoren', vuurtoren, 'kernwoord');
goed('een vuurtoren aan zee', vuurtoren, 'in een zin');

/* ================================================================== *
 * 2b. Kosten foute antwoorden wat ze horen te kosten?
 * ================================================================== */

kop('Strafpunten');

{
  const nu = Date.now();
  const mcRonde = { type: 'mc', seconden: 25 };
  const mcVraag = { antwoord: 1, opties: ['A', 'B', 'C', 'D'] };

  const mcUit = berekenPunten(mcRonde, mcVraag, {
    juist: { waarde: 1, at: nu },
    fout: { waarde: 3, at: nu },
  }, nu, []);
  check('juist meerkeuze levert punten op', mcUit.juist.punten > 0, String(mcUit.juist.punten));
  // Buiten de doorraadrondes staat er bewust geen straf op een misser:
  // daar valt met gokken toch niets te winnen.
  check('fout meerkeuze kost niets', mcUit.fout.punten === 0, String(mcUit.fout.punten));
  check('wie niets instuurt komt niet in de uitslag', !('stil' in mcUit));

  const wnwUit = berekenPunten({ type: 'truefalse', seconden: 18 }, { antwoord: true }, {
    juist: { waarde: true, at: nu },
    fout: { waarde: false, at: nu },
  }, nu, []);
  check('fout bij waar/niet waar kost niets', wnwUit.fout.punten === 0, String(wnwUit.fout.punten));

  const openUit = berekenPunten({ type: 'open', seconden: 30 }, { antwoord: 'Titanic', accept: ['titanic'] }, {
    juist: { waarde: 'titanic', at: nu },
    fout: { waarde: 'iets anders', at: nu },
  }, nu, []);
  check('fout bij een open vraag kost niets', openUit.fout.punten === 0, String(openUit.fout.punten));

  const zoomRonde = { type: 'zoom', seconden: 30 };
  const zoomVraag = { antwoord: 'Een fiets', accept: ['fiets'] };
  const zoomUit = berekenPunten(zoomRonde, zoomVraag, {
    snel: { waarde: 'fiets', at: nu + 2000, mis: 0 },
    traag: { waarde: 'fiets', at: nu + 9000, mis: 3 },
    mis: { waarde: 'auto', at: nu + 5000, mis: 2 },
    spam: { waarde: 'auto', at: nu + 6000, mis: 40 },
  }, nu, []);
  check('eerste rader krijgt de hoogste trap', zoomUit.snel.punten === PUNTEN.zoom[0], String(zoomUit.snel.punten));
  check('tweede rader krijgt minder, min zijn misgokken',
    zoomUit.traag.punten === PUNTEN.zoom[1] + 3 * PUNTEN.misgok, String(zoomUit.traag.punten));
  check('wie het nooit raadt betaalt zijn misgokken',
    zoomUit.mis.punten === 2 * PUNTEN.misgok, String(zoomUit.mis.punten));
  check('eindeloos spammen wordt afgetopt',
    zoomUit.spam.punten === PUNTEN.misgokBodem, String(zoomUit.spam.punten));

  const schatUit = berekenPunten({ type: 'estimate', seconden: 30 }, { antwoord: 100 }, {
    dichtst: { waarde: 98, at: nu },
    verder: { waarde: 300, at: nu },
  }, nu, []);
  check('bij schatten verliest niemand punten',
    schatUit.dichtst.punten > 0 && schatUit.verder.punten > 0,
    `${schatUit.dichtst.punten} en ${schatUit.verder.punten}`);
}

/* ================================================================== *
 * 3. Klopt de QR-code?
 * ================================================================== */

kop('QR-code');

// De waarden uit de QR-standaard, foutcorrectieniveau M.
const FORMAAT_M = [
  '101010000010010', '101000100100101', '101111001111100', '101101101001011',
  '100010111111001', '100000011001110', '100111110010111', '100101010100000',
];
FORMAAT_M.forEach((verwacht, masker) => {
  check(`formaatbits masker ${masker}`, formaatBits(masker).toString(2).padStart(15, '0') === verwacht);
});
const VERSIE = { 7: '000111110010010100', 8: '001000010110111100', 9: '001001101010011001', 10: '001010010011010011' };
for (const [v, verwacht] of Object.entries(VERSIE)) {
  check(`versiebits v${v}`, versieBits(Number(v)).toString(2).padStart(18, '0') === verwacht);
}

const ZOEKPATROON = [
  [1,1,1,1,1,1,1],[1,0,0,0,0,0,1],[1,0,1,1,1,0,1],[1,0,1,1,1,0,1],
  [1,0,1,1,1,0,1],[1,0,0,0,0,0,1],[1,1,1,1,1,1,1],
];
for (const proef of ['https://familiequiz.vercel.app/mee?code=RTKM', 'http://192.168.0.14:3000/mee?code=AB12']) {
  const m = maakQrMatrix(proef);
  const n = m.length;
  check(`matrix heeft een geldige maat (${n}x${n})`, (n - 17) % 4 === 0 && n >= 21);
  const zoeker = (r0, k0) => ZOEKPATROON.every((rij, r) => rij.every((w, k) => m[r0 + r][k0 + k] === w));
  check('zoekpatronen op alle drie de hoeken', zoeker(0, 0) && zoeker(0, n - 7) && zoeker(n - 7, 0));
  let timing = true;
  for (let i = 8; i < n - 8; i++) {
    if (m[6][i] !== (i % 2 === 0 ? 1 : 0) || m[i][6] !== (i % 2 === 0 ? 1 : 0)) timing = false;
  }
  check('timingpatronen', timing);
  check('vaste donkere module', m[n - 8][8] === 1);
  check('geen lege modules', m.every((rij) => rij.every((w) => w !== null)));
}

/* ================================================================== *
 * 4. Speelt een volledige quiz door?
 * ================================================================== */

kop('Een volledige quiz spelen');

const POORT = 3400 + Math.floor(Math.random() * 400);
const server = spawn(process.execPath, [join(HIER, 'server.mjs')], {
  env: { ...process.env, PORT: String(POORT) },
  stdio: ['ignore', 'ignore', 'pipe'],
});
let serverFout = '';
server.stderr.on('data', (d) => { serverFout += d.toString(); });

const BASIS = `http://127.0.0.1:${POORT}/api/spel`;
const post = async (l) => {
  const a = await fetch(BASIS, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(l) });
  return { status: a.status, data: await a.json() };
};
const spelerKant = async (code, id) => (await fetch(`${BASIS}?code=${code}&rol=speler&spelerId=${id}`)).json();

async function wachtOpServer() {
  for (let i = 0; i < 60; i++) {
    try {
      const a = await fetch(`http://127.0.0.1:${POORT}/`);
      if (a.ok) return true;
    } catch { /* nog niet klaar */ }
    await new Promise((r) => setTimeout(r, 100));
  }
  return false;
}

try {
  check('de server start op', await wachtOpServer(), serverFout.slice(0, 300));

  // Statische bestanden moeten bereikbaar zijn.
  for (const pad of ['/', '/host', '/mee', '/stijl.css', '/host.js', '/mee.js', '/qr.js', '/tekenkleuren.js']) {
    const a = await fetch(`http://127.0.0.1:${POORT}${pad}`);
    check(`${pad} wordt geserveerd`, a.ok, String(a.status));
  }

  const { data: nieuw } = await post({ actie: 'nieuw' });
  const { code, hostToken } = nieuw;
  check('een quiz aanmaken lukt', /^[A-Z0-9]{4}$/.test(code || ''), code);

  const spelers = [['s1', 'Ruben', 'De Frietjes'], ['s2', 'Marie', 'Team Nonkel'], ['s3', 'Lotte', 'De Krieken']];
  for (const [id, naam, team] of spelers) {
    const { status } = await post({ actie: 'nieuwTeam', code, naam: team, spelerId: id, spelerNaam: naam });
    check(`team "${team}" aangemaakt`, status === 200);
  }
  const dubbel = await post({ actie: 'nieuwTeam', code, naam: 'De Frietjes', spelerId: 's9', spelerNaam: 'X' });
  check('dubbele teamnaam wordt geweigerd', dubbel.status === 400);

  const nepHost = await post({ actie: 'host', code, hostToken: 'fout', commando: 'volgende' });
  check('zonder de juiste sleutel geen hostknoppen', nepHost.status === 400);

  const verder = async () => (await post({ actie: 'host', code, hostToken, commando: 'volgende' })).data.beeld;

  let b = await verder();
  check('de quiz start', b.fase === 'ronde-intro', b.fase);

  const gespeeld = new Set();
  const standen = [];
  let stap = 0;

  while (b.fase !== 'einde' && stap++ < 600) {
    if (b.fase === 'ronde-intro') { gespeeld.add(b.ronde.id); b = await verder(); continue; }
    if (b.fase === 'tussenstand') { standen.push(b.ronde.id); b = await verder(); continue; }

    if (b.fase === 'vraag') {
      const type = b.vraag.type;
      for (const [id] of spelers) {
        const kant = await spelerKant(code, id);
        if (kant.beeldtUit) {
          if (kant.magTekenen) {
            const t = await post({ actie: 'tekenen', code, spelerId: id, strepen: [{ k: 2, d: 2, p: [10, 10, 500, 400] }] });
            check('tekening wordt aanvaard', t.status === 200);
          }
          const geweigerd = await post({ actie: 'antwoord', code, spelerId: id, waarde: 'test' });
          check('wie opvoert mag niet meeraden', geweigerd.status === 400);
          continue;
        }
        const waarde = type === 'mc' || type === 'woord' ? 0
          : type === 'truefalse' ? true
          : type === 'estimate' ? 42
          : 'gok';
        const { status } = await post({ actie: 'antwoord', code, spelerId: id, waarde });
        check(`antwoord op een ${type}-vraag`, status === 200);
      }
      b = await verder();
      check(`na een ${type}-vraag volgt het antwoord`, b.fase === 'reveal', b.fase);
      check(`uitslag berekend na ${type}`, Array.isArray(b.uitslag));
      b = await verder();
      continue;
    }
    check('geen onverwachte fase', false, b.fase);
    break;
  }

  check('de quiz bereikt het einde', b.fase === 'einde', b.fase);
  check('alle tien de rondes zijn gespeeld', gespeeld.size === 10, [...gespeeld].join(', '));
  check('na elke ronde behalve de laatste een tussenstand', standen.length === rondes.length - 1, standen.join(', '));
  check('elk team heeft punten', b.stand.every((t) => t.score > 0), b.stand.map((t) => `${t.naam}:${t.score}`).join(' '));
  check('de stand is op volgorde', b.stand.every((t, i) => i === 0 || b.stand[i - 1].score >= t.score));

  check('geen serverfouten', !serverFout.includes('Error'), serverFout.slice(0, 300));
} finally {
  server.kill();
}

/* ================================================================== */

console.log(`\n${gedaan} controles, ${fouten} fout${fouten === 1 ? '' : 'en'}.`);
if (fouten === 0) console.log('Alles werkt.\n');
process.exitCode = fouten === 0 ? 0 : 1;
