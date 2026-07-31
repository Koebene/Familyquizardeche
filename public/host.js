// Het groot scherm. Toont wat er te zien moet zijn en heeft één knop
// die telkens naar de volgende stap gaat.

import { qrAlsSvg } from './qr.js';
import { TEKENKLEUREN, DIKTES, TEKENBREEDTE, TEKENHOOGTE } from './tekenkleuren.js';

const midden = document.getElementById('midden');
const rondeLabel = document.getElementById('rondeLabel');
const codeChip = document.getElementById('codeChip');
const voetStatus = document.getElementById('voetStatus');
const verderKnop = document.getElementById('verderKnop');

const code = new URLSearchParams(location.search).get('code')?.toUpperCase() || '';
const hostToken = localStorage.getItem(`quiz:host:${code}`) || '';

// Het adres dat in de QR-code terechtkomt. Online is dat gewoon het
// adres van deze pagina; draait de quiz lokaal op localhost, dan vragen
// we de server naar zijn netwerkadres — want "localhost" op een gsm
// wijst naar die gsm zelf en niet naar de laptop.
let deelBasis = location.origin;

async function bepaalDeelAdres() {
  if (!/^(localhost|127\.0\.0\.1|\[::1\])$/i.test(location.hostname)) return;
  try {
    const antwoord = await fetch('/api/adres', { cache: 'no-store' });
    if (!antwoord.ok) return;
    const { adres } = await antwoord.json();
    if (adres) deelBasis = `http://${adres}`;
  } catch {
    // Lukt het niet, dan blijft localhost staan en tikt men het adres
    // van de laptop zelf in. Beter dan een QR-code die niets doet.
  }
}

let beeld = null;
let sleutel = '';
let klokAfwijking = 0; // verschil tussen de serverklok en deze machine
let bezig = false;

const esc = (tekst) =>
  String(tekst ?? '').replace(/[&<>"']/g, (t) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[t]));

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/* ------------------------------------------------------------------ *
 * Praten met de server
 * ------------------------------------------------------------------ */

async function haalOp() {
  const url = `/api/spel?code=${encodeURIComponent(code)}&rol=host&hostToken=${encodeURIComponent(hostToken)}`;
  const antwoord = await fetch(url, { cache: 'no-store' });
  const data = await antwoord.json();
  if (!antwoord.ok) throw new Error(data.fout || 'Kon de quiz niet ophalen.');
  return data;
}

async function stuurCommando(commando) {
  if (bezig) return;
  bezig = true;
  verderKnop.disabled = true;
  try {
    const antwoord = await fetch('/api/spel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ actie: 'host', code, hostToken, commando }),
    });
    const data = await antwoord.json();
    if (antwoord.ok && data.beeld) verwerk(data.beeld);
    else if (data.fout) voetStatus.textContent = data.fout;
  } catch {
    voetStatus.textContent = 'Even geen verbinding…';
  } finally {
    bezig = false;
    verderKnop.disabled = false;
  }
}

/* ------------------------------------------------------------------ *
 * Tekenen
 * ------------------------------------------------------------------ */

function verwerk(nieuw) {
  beeld = nieuw;
  klokAfwijking = nieuw.nu - Date.now();

  codeChip.textContent = nieuw.code;
  rondeLabel.textContent = nieuw.ronde && nieuw.fase !== 'lobby' ? nieuw.ronde.naam : '';

  const nieuweSleutel = [
    nieuw.fase,
    nieuw.ronde?.id || '',
    nieuw.vraag?.nummer || 0,
    nieuw.fase === 'lobby' ? nieuw.stand.length : '',
    nieuw.fase === 'tussenstand' || nieuw.fase === 'einde' ? nieuw.versie : '',
  ].join('|');

  if (nieuweSleutel !== sleutel) {
    sleutel = nieuweSleutel;
    midden.innerHTML = tekenFase(nieuw);
  }
  werkLosseDelenBij(nieuw);

  verderKnop.textContent = knoptekst(nieuw.fase);
}

function knoptekst(fase) {
  if (fase === 'lobby') return 'Start de quiz';
  if (fase === 'vraag') return 'Tijd is om';
  if (fase === 'reveal') return 'Verder';
  if (fase === 'einde') return 'Klaar';
  return 'Verder';
}

function tekenFase(b) {
  switch (b.fase) {
    case 'lobby': return tekenLobby(b);
    case 'ronde-intro': return tekenIntro(b);
    case 'vraag': return tekenVraag(b, false);
    case 'reveal': return tekenVraag(b, true);
    case 'tussenstand': return tekenStand(b, 'Tussenstand');
    case 'einde': return tekenEinde(b);
    default: return '';
  }
}

/* ------------------------------- Lobby ------------------------------ */

function tekenLobby(b) {
  const url = `${deelBasis}/mee?code=${b.code}`;
  const qr = qrAlsSvg(url, { module: 6, rand: 3 });

  const teams = b.stand.length
    ? b.stand.map((t) => `
        <div class="team-bubbel">
          <span class="stip" style="background:${esc(t.kleur)}"></span>
          <span>${esc(t.emoji)} ${esc(t.naam)}</span>
          <span class="aantal">${t.leden.length}</span>
        </div>`).join('')
    : '<p class="leeg-tekst">Nog niemand aangesloten…</p>';

  return `
    <div class="lobby">
      <div class="lobby-links">
        <div class="lobby-qr">${qr}</div>
        <div class="lobby-url">of surf naar<br><strong>${esc(deelBasis.replace(/^https?:\/\//, ''))}</strong></div>
      </div>
      <div class="lobby-rechts">
        <h1>Scan met je gsm</h1>
        <div class="lobby-code">${esc(b.code)}</div>
        <p class="lobby-uitleg">Maak een team aan of sluit aan bij een bestaand team.<br>
          Zet gerust een kind bij een volwassene — dat speelt het leukst.</p>
        <div class="team-wolk">${teams}</div>
      </div>
    </div>`;
}

/* ---------------------------- Ronde-intro --------------------------- */

function tekenIntro(b) {
  return `
    <div class="intro">
      <div class="icoon">${esc(b.ronde.icoon)}</div>
      <h1>${esc(b.ronde.naam)}</h1>
      <p>${esc(b.ronde.uitleg)}</p>
    </div>`;
}

/* ------------------------------- Vraag ------------------------------ */

function tekenVraag(b, onthul) {
  const v = b.vraag;
  if (!v) return '';

  const stukken = [];

  switch (v.type) {
    case 'mc':
      stukken.push(`<h2 class="vraagtekst">${esc(v.tekst)}</h2>`);
      stukken.push(tekenOpties(v, onthul));
      break;

    case 'woord':
      stukken.push(`
        <div style="text-align:center">
          <div style="font-size:2.2vmin;letter-spacing:.2em;text-transform:uppercase;color:var(--grijs)">${esc(v.taal)}</div>
          <h2 class="vraagtekst" style="font-size:9vmin;margin-top:1vmin">${esc(v.woord)}</h2>
        </div>`);
      stukken.push(tekenOpties(v, onthul));
      break;

    case 'truefalse':
      stukken.push(`<h2 class="vraagtekst">${esc(v.tekst)}</h2>`);
      stukken.push(`
        <div class="wnw">
          <div class="vak ${onthul ? (v.antwoord === true ? 'juist' : 'fout') : ''}">Waar</div>
          <div class="vak ${onthul ? (v.antwoord === false ? 'juist' : 'fout') : ''}">Niet waar</div>
        </div>`);
      break;

    case 'estimate':
      stukken.push(`<h2 class="vraagtekst">${esc(v.tekst)}</h2>`);
      if (v.eenheid) stukken.push(`<div class="eenheid">antwoord in ${esc(v.eenheid)}</div>`);
      break;

    case 'geo':
      stukken.push(`<div class="tekening" id="tekening">${svgVan(v.art)}</div>`);
      break;

    case 'zoom':
      stukken.push(`<div class="tekening" id="tekening">${svgVan(v.art, true)}</div>`);
      break;

    case 'charades':
      stukken.push(`
        <div class="opdrachtkaart">
          <div class="wie">${b.uitbeelder?.naam
            ? `<strong>${esc(b.uitbeelder.naam)}</strong> van team ${esc(b.uitbeelder.team)} beeldt uit`
            : `Team <strong>${esc(b.uitbeelder?.team || '')}</strong> beeldt uit`}</div>
          <div class="hint">De opdracht staat op hun gsm. Alle andere teams raden mee.</div>
        </div>`);
      break;

    case 'tekenen':
      stukken.push(`
        <div style="font-size:2.4vmin;color:var(--grijs)">
          Team <strong style="color:var(--amber)">${esc(b.uitbeelder?.team || '')}</strong> tekent
        </div>`);
      stukken.push(`<div class="tekenvlak"><svg id="tekenDoek" viewBox="0 0 ${TEKENBREEDTE} ${TEKENHOOGTE}"></svg></div>`);
      break;

    default: // open vragen en de emoji-ronde
      stukken.push(`<h2 class="vraagtekst ${v.groot ? 'groot' : ''}">${esc(v.tekst)}</h2>`);
  }

  if (onthul) {
    stukken.push(tekenOnthulling(b, v));
    stukken.push(tekenUitslag(b));
  } else {
    stukken.push(`
      <div class="meterrij">
        <div class="klok" id="klok">
          <svg viewBox="0 0 100 100">
            <circle class="spoor" cx="50" cy="50" r="43"></circle>
            <circle class="balk" cx="50" cy="50" r="43" id="klokBalk"
                    stroke-dasharray="270.2" stroke-dashoffset="0"></circle>
          </svg>
          <div class="cijfer" id="klokCijfer">–</div>
        </div>
        <div class="teller"><strong id="binnenTeller">0</strong> / ${b.stand.length} binnen</div>
      </div>`);
  }

  return `<div class="vraagblok">
      <div style="font-size:2vmin;color:var(--grijs);letter-spacing:.14em">VRAAG ${v.nummer} / ${v.totaal}</div>
      ${stukken.join('\n')}
    </div>`;
}

function tekenOpties(v, onthul) {
  return `<div class="opties">${v.opties.map((tekst, i) => {
    const klasse = onthul ? (i === v.antwoord ? 'juist' : 'fout') : '';
    return `<div class="optie ${klasse}">
        <span class="letter">${LETTERS[i]}</span>
        <span>${esc(tekst)}</span>
      </div>`;
  }).join('')}</div>`;
}

function svgVan(art, isZoom = false) {
  if (!art) return '';
  const id = isZoom ? ' id="zoomSvg"' : '';
  return `<svg${id} xmlns="http://www.w3.org/2000/svg" viewBox="${art.viewBox}" preserveAspectRatio="xMidYMid slice">${art.svg}</svg>`;
}

function tekenOnthulling(b, v) {
  let waarde = '';
  if (v.type === 'mc' || v.type === 'woord') waarde = v.opties[v.antwoord];
  else if (v.type === 'truefalse') waarde = v.antwoord ? 'Waar' : 'Niet waar';
  else if (v.type === 'estimate') waarde = new Intl.NumberFormat('nl-BE').format(v.antwoord) + (v.eenheid ? ` ${v.eenheid}` : '');
  else if (v.type === 'geo') waarde = `${v.antwoord}${v.plek ? ` — ${v.plek}` : ''}`;
  else waarde = v.antwoord;

  return `
    <div class="antwoordbanner">
      <div class="label">Het juiste antwoord</div>
      <div class="waarde">${esc(waarde)}</div>
      ${v.weetje ? `<p class="weetje">${esc(v.weetje)}</p>` : ''}
    </div>`;
}

function tekenUitslag(b) {
  if (!b.uitslag?.length) return '<p class="leeg-tekst">Niemand heeft geantwoord.</p>';
  return `<div class="uitslagrij">${b.uitslag.map((r) => `
      <div class="uitslag-kaart ${r.goed ? 'goed' : ''}">
        <span>${esc(r.emoji)} ${esc(r.naam)}</span>
        <span class="detail">${esc(r.toelichting)}</span>
        <span class="punten">${r.punten > 0 ? '+' : ''}${r.punten}</span>
      </div>`).join('')}</div>`;
}

/* ---------------------------- Standen ------------------------------- */

function tekenStand(b, titel) {
  return `
    <div class="stand">
      <h1>${esc(titel)}</h1>
      ${b.stand.map((t, i) => `
        <div class="standrij ${i === 0 ? 'top' : ''}" style="animation-delay:${i * 90}ms">
          <span class="plaats">${t.plaats}</span>
          <span class="emoji">${esc(t.emoji)}</span>
          <span class="naam">${esc(t.naam)}</span>
          <span class="punten">${t.score}</span>
        </div>`).join('')}
    </div>`;
}

function tekenEinde(b) {
  const top = b.stand.slice(0, 3);
  const rest = b.stand.slice(3);
  if (!top.length) return '<div class="intro"><h1>Geen deelnemers</h1></div>';

  const winnaar = top[0];
  const treden = top.map((t, i) => `
    <div class="trede p${i + 1}">
      <div class="kop">
        <div class="emoji">${esc(t.emoji)}</div>
        <div class="naam">${esc(t.naam)}</div>
        <div class="punten">${t.score} punten</div>
      </div>
      <div class="blok" style="animation-delay:${(2 - i) * 180}ms">${i + 1}</div>
    </div>`).join('');

  return `
    <div style="display:flex;flex-direction:column;align-items:center;gap:3vmin;width:100%">
      <div class="winnaar">
        <div class="kroon">👑</div>
        <h1>${esc(winnaar.naam)} wint!</h1>
        <p>Proficiat — en aan de rest: volgend jaar herkansing.</p>
      </div>
      <div class="podium">${treden}</div>
      ${rest.length ? `<div class="stand" style="max-width:80vmin">${rest.map((t) => `
        <div class="standrij">
          <span class="plaats">${t.plaats}</span>
          <span class="emoji">${esc(t.emoji)}</span>
          <span class="naam">${esc(t.naam)}</span>
          <span class="punten">${t.score}</span>
        </div>`).join('')}</div>` : ''}
    </div>`;
}

/* ------------------------------------------------------------------ *
 * Klok, teller en het uitzoomen
 * ------------------------------------------------------------------ */

const OMTREK = 2 * Math.PI * 43;

// De tekening komt binnen als lijnen, niet als afbeelding. We tekenen
// ze elke ronde opnieuw: dat is goedkoper dan het lijkt en altijd juist,
// ook nadat de tekenaar op "wissen" heeft geduwd.
function tekenStrepen(b) {
  const doek = document.getElementById('tekenDoek');
  if (!doek || !Array.isArray(b.tekening)) return;

  const stukken = b.tekening.map((streep) => {
    const punten = [];
    for (let i = 0; i + 1 < streep.p.length; i += 2) punten.push(`${streep.p[i]},${streep.p[i + 1]}`);
    if (punten.length === 1) punten.push(punten[0]); // een losse tik blijft zichtbaar
    const kleur = TEKENKLEUREN[streep.k] || TEKENKLEUREN[0];
    return `<polyline points="${punten.join(' ')}" fill="none" stroke="${kleur}"
              stroke-width="${DIKTES[streep.d] || DIKTES[1]}" stroke-linecap="round" stroke-linejoin="round"/>`;
  });
  doek.innerHTML = stukken.join('');
}

function werkLosseDelenBij(b) {
  const teller = document.getElementById('binnenTeller');
  if (teller) teller.textContent = b.antwoordenBinnen;

  tekenStrepen(b);

  if (b.fase === 'lobby') {
    voetStatus.textContent = b.stand.length
      ? `${b.stand.length} team${b.stand.length === 1 ? '' : 's'} klaar`
      : 'Wachten op de eerste ploeg…';
  } else if (b.fase === 'vraag') {
    voetStatus.textContent = 'Vraag staat open';
  } else {
    voetStatus.textContent = '';
  }
}

function tik() {
  requestAnimationFrame(tik);
  if (!beeld || beeld.fase !== 'vraag' || !beeld.vraagStart) return;

  const limiet = beeld.vraag?.seconden || 30;
  const verstreken = (Date.now() + klokAfwijking - beeld.vraagStart) / 1000;
  const over = Math.max(0, limiet - verstreken);
  const deel = Math.min(1, Math.max(0, verstreken / limiet));

  const cijfer = document.getElementById('klokCijfer');
  const balk = document.getElementById('klokBalk');
  const klok = document.getElementById('klok');
  if (cijfer) cijfer.textContent = Math.ceil(over);
  if (balk) balk.style.strokeDashoffset = String(OMTREK * deel);
  if (klok) klok.classList.toggle('bijna', over <= 5);

  // De zoomronde: we beginnen op een detail en openen traag het beeld.
  const zoom = document.getElementById('zoomSvg');
  if (zoom && beeld.vraag?.focus) {
    const f = beeld.vraag.focus;
    const [vx, vy, vb, vh] = beeld.vraag.art.viewBox.split(' ').map(Number);
    const t = deel * deel; // eerst traag, dan sneller open
    const x = f.x + (vx - f.x) * t;
    const y = f.y + (vy - f.y) * t;
    const b2 = f.w + (vb - f.w) * t;
    const h2 = f.h + (vh - f.h) * t;
    zoom.setAttribute('viewBox', `${x} ${y} ${b2} ${h2}`);
  }
}

/* ------------------------------------------------------------------ *
 * Opstarten
 * ------------------------------------------------------------------ */

verderKnop.addEventListener('click', () => stuurCommando('volgende'));

document.addEventListener('keydown', (e) => {
  if (e.target.tagName === 'INPUT') return;
  if (e.code === 'Space' || e.code === 'Enter' || e.code === 'ArrowRight') {
    e.preventDefault();
    stuurCommando('volgende');
  } else if (e.code === 'ArrowLeft' || e.code === 'Backspace') {
    e.preventDefault();
    stuurCommando('terug');
  }
});

// Tijdens het tekenen kijken we vaker, zodat de lijnen vlot op het
// scherm verschijnen. De rest van de tijd volstaat rustiger polsen.
function polsTempo() {
  const tekent = beeld?.fase === 'vraag' && beeld?.ronde?.type === 'tekenen';
  return tekent ? 700 : 1500;
}

async function pols() {
  try {
    verwerk(await haalOp());
  } catch (fout) {
    voetStatus.textContent = fout.message;
  }
  setTimeout(pols, polsTempo());
}

if (!code || !hostToken) {
  midden.innerHTML = `
    <div class="intro">
      <div class="icoon">🤔</div>
      <h1>Dit scherm is de quizmaster niet</h1>
      <p>Start de quiz opnieuw vanaf de <a href="/" style="color:var(--amber)">startpagina</a>,
         op het toestel dat aan het groot scherm hangt.</p>
    </div>`;
  verderKnop.disabled = true;
} else {
  // Eerst het juiste deeladres ophalen, anders staat er even een
  // QR-code met "localhost" op het scherm die niemand kan gebruiken.
  bepaalDeelAdres().then(() => {
    pols();
    requestAnimationFrame(tik);
  });
}
