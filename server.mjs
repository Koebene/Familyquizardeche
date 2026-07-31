// Lokale server om de quiz te testen zonder iets te installeren.
//
//   node server.mjs
//
// Draait op http://localhost:3000. Op Vercel wordt dit bestand niet
// gebruikt: daar serveert het platform /public en /api zelf.

import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, normalize } from 'node:path';
import { fileURLToPath } from 'node:url';
import { networkInterfaces } from 'node:os';

import handler from './api/spel.js';

const WORTEL = join(fileURLToPath(new URL('.', import.meta.url)), 'public');
const POORT = Number(process.env.PORT) || 3000;

const TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.webmanifest': 'application/manifest+json',
};

async function bestaatBestand(pad) {
  try {
    const info = await stat(pad);
    return info.isFile();
  } catch {
    return false;
  }
}

// Zoekt het bestand dat bij een pad hoort. "/host" vindt "host.html",
// net zoals Vercel dat doet met cleanUrls.
async function zoekBestand(pad) {
  const veilig = normalize(decodeURIComponent(pad)).replace(/^(\.\.[/\\])+/, '');
  const kandidaten = [];

  if (veilig === '/' || veilig === '\\') {
    kandidaten.push(join(WORTEL, 'index.html'));
  } else {
    kandidaten.push(join(WORTEL, veilig));
    if (!extname(veilig)) {
      kandidaten.push(join(WORTEL, `${veilig}.html`));
      kandidaten.push(join(WORTEL, veilig, 'index.html'));
    }
  }

  for (const kandidaat of kandidaten) {
    if (!kandidaat.startsWith(WORTEL)) continue;
    if (await bestaatBestand(kandidaat)) return kandidaat;
  }
  return null;
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (url.pathname === '/api/spel') {
    return handler(req, res);
  }

  // Het groot scherm draait meestal op localhost, maar dat adres is
  // waardeloos in een QR-code: een gsm die het scant zoekt zichzelf.
  // Hier vertellen we de pagina op welk adres de laptop te bereiken is.
  if (url.pathname === '/api/adres') {
    res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' });
    return res.end(JSON.stringify({ adres: `${lokaalAdres()}:${POORT}` }));
  }

  const bestand = await zoekBestand(url.pathname);
  if (!bestand) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Niet gevonden');
  }

  const inhoud = await readFile(bestand);
  res.writeHead(200, {
    'Content-Type': TYPES[extname(bestand)] || 'application/octet-stream',
    'Cache-Control': 'no-store',
  });
  res.end(inhoud);
});

function lokaalAdres() {
  for (const kaarten of Object.values(networkInterfaces())) {
    for (const kaart of kaarten || []) {
      if (kaart.family === 'IPv4' && !kaart.internal) return kaart.address;
    }
  }
  return 'localhost';
}

server.listen(POORT, () => {
  console.log(`\n  Familiequiz draait\n`);
  console.log(`  Groot scherm : http://localhost:${POORT}/`);
  console.log(`  Op je gsm    : http://${lokaalAdres()}:${POORT}/  (zelfde wifi)\n`);
});
