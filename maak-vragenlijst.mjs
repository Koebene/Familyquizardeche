// Zet de volledige vragenvoorraad in één overzichtelijke pagina.
//
//   node maak-vragenlijst.mjs
//
// Handig om vóór een avond in te schatten wat er kan komen, en om te
// zien of het niveau bij het gezelschap past. Alles staat er, gegroepeerd
// per ronde en per niveau — één quiz speelt er maar een deel van.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

import { rondes } from './lib/quiz-data.js';
import { FOTOS } from './lib/fotos.js';

const esc = (t) => String(t ?? '').replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const NIVEAUS = ['makkelijk', 'gemiddeld', 'moeilijk'];

// Wat is bij deze vraag "het antwoord", in het kort?
function kortAntwoord(ronde, v) {
  switch (ronde.type) {
    case 'mc':
    case 'woord':
      return esc(v.opties[v.antwoord]);
    case 'truefalse':
      return v.antwoord ? 'Waar' : 'Niet waar';
    case 'estimate':
      return `${new Intl.NumberFormat('nl-BE').format(v.antwoord)}${v.eenheid ? ' ' + esc(v.eenheid) : ''}`;
    case 'geo':
      return `${esc(v.antwoord)} <span class="plek">(${esc(v.plek)})</span>`;
    case 'charades':
    case 'tekenen':
      return '<span class="opdracht">uitbeelden / tekenen</span>';
    default:
      return esc(v.antwoord);
  }
}

// En wat is de vraag zelf?
function kortVraag(ronde, v) {
  if (ronde.type === 'woord') return `<em>${esc(v.woord)}</em> <span class="plek">(${esc(v.taal)})</span>`;
  if (ronde.type === 'geo' || ronde.type === 'zoom') {
    const foto = FOTOS[v.foto];
    return `<span class="fotonaam">foto: ${esc(v.foto)}</span>${foto ? '' : ' <b class="fout">ONTBREEKT</b>'}`;
  }
  return esc(v.q);
}

const secties = rondes.map((ronde) => {
  const perNiveau = NIVEAUS.map((niveau) => {
    const vragen = ronde.vragen.filter((v) => (v.niveau || 'gemiddeld') === niveau);
    if (!vragen.length) return '';
    return `
      <h3 class="n-${niveau}">${niveau} <span class="aantal">${vragen.length}</span></h3>
      <table>
        ${vragen.map((v) => `
          <tr>
            <td class="vraag">${kortVraag(ronde, v)}${v.domein ? ` <span class="domein">${esc(v.domein)}</span>` : ''}</td>
            <td class="antw">${kortAntwoord(ronde, v)}</td>
          </tr>`).join('')}
      </table>`;
  }).join('');

  const perSpel = ronde.perSpel || ronde.vragen.length;
  return `
    <section>
      <h2>${esc(ronde.icoon)} ${esc(ronde.naam)}</h2>
      <p class="meta">${ronde.vragen.length} in voorraad — er worden er <b>${perSpel}</b> geloot per quiz · ${ronde.seconden} seconden per vraag</p>
      <p class="uitleg">${esc(ronde.uitleg)}</p>
      ${perNiveau}
    </section>`;
}).join('');

const totaal = rondes.reduce((n, r) => n + r.vragen.length, 0);
const perAvond = rondes.reduce((n, r) => n + (r.perSpel || r.vragen.length), 0);

const html = `<!doctype html>
<meta charset="utf-8">
<title>Alle vragen — De Grote Familiequiz</title>
<style>
  :root { color-scheme: light dark; }
  body { margin:0 auto; padding:32px 24px 64px; max-width:1000px;
         font-family:"Segoe UI",system-ui,sans-serif; line-height:1.5;
         background:#faf8f5; color:#1b1720; }
  @media (prefers-color-scheme: dark) {
    body { background:#0f0c14; color:#f0ece5; }
    section { background:#171320 !important; border-color:rgba(255,255,255,.09) !important; }
    tr:nth-child(even) td { background:rgba(255,255,255,.03); }
    .antw { color:#e8b563 !important; }
  }
  h1 { font-size:1.9rem; margin:0 0 .2rem; }
  .intro { color:#7a7285; margin:0 0 2rem; }
  section { background:#fff; border:1px solid rgba(0,0,0,.09); border-radius:14px;
            padding:20px 22px; margin-bottom:20px; }
  h2 { font-size:1.2rem; margin:0 0 .3rem; }
  .meta { margin:0; font-size:.82rem; color:#8a8296; }
  .uitleg { margin:.3rem 0 1rem; font-size:.9rem; color:#6f6780; font-style:italic; }
  h3 { font-size:.75rem; text-transform:uppercase; letter-spacing:.16em;
       margin:1.2rem 0 .4rem; color:#8a8296; }
  h3 .aantal { opacity:.6; letter-spacing:0; }
  .n-makkelijk { color:#3f9d6b; } .n-gemiddeld { color:#c08a2e; } .n-moeilijk { color:#c0554f; }
  table { width:100%; border-collapse:collapse; font-size:.9rem; }
  td { padding:.4rem .5rem; vertical-align:top; border-top:1px solid rgba(0,0,0,.06); }
  .vraag { width:64%; }
  .antw { width:36%; font-weight:700; color:#96651a; }
  .domein { font-size:.72rem; text-transform:uppercase; letter-spacing:.1em;
            opacity:.55; margin-left:.4rem; }
  .plek, .fotonaam { opacity:.6; font-weight:400; font-size:.85em; }
  .opdracht { opacity:.5; font-weight:400; font-style:italic; }
  .fout { color:#c0554f; }
</style>
<h1>Alle vragen van de familiequiz</h1>
<p class="intro"><b>${totaal} vragen in voorraad.</b> Eén quiz loot er ${perAvond}, in de verhouding
20% makkelijk, 60% gemiddeld en 20% moeilijk — dus je speelt er nooit twee keer dezelfde avond mee.</p>
${secties}
`;

const pad = join(dirname(fileURLToPath(import.meta.url)), 'vragenlijst.html');
writeFileSync(pad, html, 'utf8');
console.log(`Geschreven: ${pad}  (${totaal} vragen, ${perAvond} per quiz)`);
