// Bouwt één HTML-pagina met alle foto's van de quiz naast elkaar.
//
//   node maak-overzicht.mjs
//
// Handig om te controleren of elke plek meteen herkenbaar is, en om te
// zien waarmee de zoomronde begint voor het beeld opengaat.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

import { FOTOS } from './lib/fotos.js';
import { rondes } from './lib/quiz-data.js';

const geo = rondes.find((r) => r.id === 'geo').vragen;
const zoom = rondes.find((r) => r.id === 'zoom').vragen;

const kaart = (vraag, onder, ingezoomd = false) => {
  const foto = FOTOS[vraag.foto];
  if (!foto) return '';
  return `<figure>
    <div class="doek${ingezoomd ? ' zoom' : ''}">
      <img src="public${foto.bestand}" alt="">
    </div>
    <figcaption>
      <strong>${vraag.antwoord}</strong>
      <span>${onder}</span>
    </figcaption>
    <div class="bron">${foto.maker || 'onbekend'} — ${foto.licentie}</div>
  </figure>`;
};

const html = `<!doctype html>
<meta charset="utf-8">
<title>Foto's van de familiequiz</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; padding:32px; background:#0e0b14; color:#f6f2ea;
         font-family:"Segoe UI",system-ui,sans-serif; }
  h1 { font-size:1.8rem; margin:0 0 .3rem; }
  h2 { font-size:1.15rem; margin:2.4rem 0 1rem; color:#e0b25e;
       border-bottom:1px solid rgba(255,255,255,.12); padding-bottom:.5rem; }
  p.lead { margin:0 0 1rem; color:#a79fb8; max-width:70ch; line-height:1.6; }
  .raster { display:grid; gap:18px; grid-template-columns:repeat(auto-fill,minmax(300px,1fr)); }
  figure { margin:0; }
  .doek { aspect-ratio:4/3; border-radius:12px; overflow:hidden;
          border:1px solid rgba(255,255,255,.12); background:#000; }
  .doek img { width:100%; height:100%; object-fit:cover; display:block; }
  .doek.zoom img { transform:scale(8); transition:transform 6s ease-out; }
  .doek.zoom:hover img { transform:scale(1); }
  figcaption { margin-top:.55rem; font-size:.95rem; display:flex;
               justify-content:space-between; gap:1rem; align-items:baseline; }
  figcaption span { color:#a79fb8; font-size:.84rem; text-align:right; }
  .bron { margin-top:.2rem; font-size:.75rem; color:#6f6885; }
</style>
<h1>Foto's van de familiequiz</h1>
<p class="lead">Allemaal vrij gelicentieerd materiaal van Wikimedia Commons. Kijk vooral of elke
plek meteen herkenbaar is — dat is wat de ronde laat werken of niet.</p>

<h2>Ronde 4 — Waar ter wereld? (raad het land)</h2>
<div class="raster">
${geo.map((v) => kaart(v, v.plek)).join('\n')}
</div>

<h2>Ronde 8 — Uitzoomen</h2>
<p class="lead">Zo begint het beeld. Ga er met de muis over om te zien hoe het opengaat.</p>
<div class="raster">
${zoom.map((v) => kaart(v, 'beweeg de muis erover', true)).join('\n')}
</div>
`;

const pad = join(dirname(fileURLToPath(import.meta.url)), 'fotos-overzicht.html');
writeFileSync(pad, html, 'utf8');
console.log('Geschreven:', pad);
