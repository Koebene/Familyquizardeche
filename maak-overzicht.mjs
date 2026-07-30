// Bouwt één HTML-pagina met alle tekeningen van de quiz naast elkaar.
//
//   node maak-overzicht.mjs
//
// Handig om te controleren of elke plek meteen herkenbaar is, en om te
// zien waar de zoomronde begint voor ze opengaat.

import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join, dirname } from 'node:path';

import { art } from './lib/art.js';
import { rondes } from './lib/quiz-data.js';

const geo = rondes.find((r) => r.id === 'geo').vragen;
const zoom = rondes.find((r) => r.id === 'zoom').vragen;

const kaart = (sleutel, titel, onder, extra = '') => {
  const a = art[sleutel];
  return `<figure>
    <div class="doek">
      <svg viewBox="${a.viewBox}" preserveAspectRatio="xMidYMid slice">${a.svg}</svg>
      ${extra}
    </div>
    <figcaption><strong>${titel}</strong><span>${onder}</span></figcaption>
  </figure>`;
};

// Het kadertje waarop de zoomronde begint.
const zoomKader = (a) => {
  if (!a.focus) return '';
  const [, , breed, hoog] = a.viewBox.split(' ').map(Number);
  const f = a.focus;
  return `<div class="kader" style="left:${(f.x / breed) * 100}%;top:${(f.y / hoog) * 100}%;
    width:${(f.w / breed) * 100}%;height:${(f.h / hoog) * 100}%"></div>`;
};

const html = `<!doctype html>
<meta charset="utf-8">
<title>Tekeningen van de familiequiz</title>
<style>
  :root { color-scheme: dark; }
  body { margin:0; padding:32px; background:#14111f; color:#f6f2ea;
         font-family:"Segoe UI",system-ui,sans-serif; }
  h1 { font-size:1.8rem; margin:0 0 .3rem; }
  h2 { font-size:1.15rem; margin:2.4rem 0 1rem; color:#f5b942;
       border-bottom:1px solid rgba(255,255,255,.12); padding-bottom:.5rem; }
  p.lead { margin:0 0 1rem; color:#a79fb8; max-width:70ch; line-height:1.6; }
  .raster { display:grid; gap:18px; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); }
  figure { margin:0; }
  .doek { position:relative; aspect-ratio:4/3; border-radius:12px; overflow:hidden;
          border:1px solid rgba(255,255,255,.12); background:#0d0b14; }
  .doek svg { width:100%; height:100%; display:block; }
  .kader { position:absolute; border:2px solid #f5b942; border-radius:3px;
           box-shadow:0 0 0 9999px rgba(10,8,16,.66); }
  figcaption { margin-top:.55rem; font-size:.9rem; display:flex;
               justify-content:space-between; gap:1rem; align-items:baseline; }
  figcaption span { color:#a79fb8; font-size:.84rem; text-align:right; }
</style>
<h1>Tekeningen van de familiequiz</h1>
<p class="lead">Alles is in code getekend, dus er zijn geen foto's nodig en er kan niets wegvallen.
Kijk vooral of elke plek meteen herkenbaar is — dat is wat de ronde laat werken of niet.</p>

<h2>Ronde 4 — Waar ter wereld? (raad het land)</h2>
<div class="raster">
${geo.map((v) => kaart(v.art, v.antwoord, v.plek)).join('\n')}
</div>

<h2>Ronde 8 — Uitzoomen</h2>
<p class="lead">Het gele kadertje is wat de familie als eerste ziet; van daaruit zoomt het beeld
traag open tot het volledige plaatje.</p>
<div class="raster">
${zoom.map((v) => kaart(v.art, v.antwoord, 'start in het kader', zoomKader(art[v.art]))).join('\n')}
</div>
`;

const pad = join(dirname(fileURLToPath(import.meta.url)), 'tekeningen-overzicht.html');
writeFileSync(pad, html, 'utf8');
console.log('Geschreven:', pad);
