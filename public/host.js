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

// Zodra iedereen geantwoord heeft tellen we kort af en gaan we vanzelf
// naar het antwoord. Die paar seconden zijn er met opzet: wie net getikt
// heeft kan zich nog bedenken, en het voelt minder abrupt.
const AFTELLEN_MS = 3000;
let aftelTot = 0;
let aftelVoor = '';

const esc = (tekst) =>
  String(tekst ?? '').replace(/[&<>"']/g, (t) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[t]));

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

// Een team toont zijn foto als het er een heeft, anders zijn emoji.
function gezicht(team, maat = 'klein') {
  if (team.foto) {
    return `<img class="gezicht ${maat}" src="${team.foto}" alt="" style="border-color:${esc(team.kleur)}">`;
  }
  return `<div class="gezicht ${maat} leeg" style="border-color:${esc(team.kleur)}">${esc(team.emoji)}</div>`;
}

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
    case 'tussenstand': return tekenEinde(b, false);
    case 'einde': return tekenEinde(b, true);
    default: return '';
  }
}

/* ------------------------------- Lobby ------------------------------ */

function tekenLobby(b) {
  const url = `${deelBasis}/mee?code=${b.code}`;
  const qr = qrAlsSvg(url, { module: 6, rand: 3 });

  const teams = b.stand.length
    ? b.stand.map((t, i) => `
        <div class="team-kaart" style="animation-delay:${i * 70}ms">
          ${gezicht(t, 'middel')}
          <span class="naam">${esc(t.naam)}</span>
        </div>`).join('')
    : '<p class="leeg-tekst">Nog niemand aangesloten…</p>';

  return `
    <div class="lobbyblok">
      <div class="lobby">
        <div class="lobby-qr">${qr}</div>
        <div class="lobby-tekst">
          <div class="eyebrow">Scan met je gsm, of surf naar</div>
          <div class="lobby-adres">${esc(deelBasis.replace(/^https?:\/\//, ''))}</div>
          <div class="lobby-code">${esc(b.code)}</div>
          <p class="lobby-uitleg">Maak een team of sluit aan bij een bestaand team.<br>
            Zet gerust een kind bij een volwassene — dat speelt het leukst.</p>
        </div>
      </div>
      <div class="teamband">
        <div class="bandlabel">${b.stand.length ? `${b.stand.length} team${b.stand.length === 1 ? '' : 's'} klaar` : 'Wachten op de eerste ploeg'}</div>
        <div class="team-wolk">${teams}</div>
      </div>
    </div>`;
}

/* ---------------------------- Ronde-intro --------------------------- */

function tekenIntro(b) {
  const regels = (b.ronde.regels || []).map((regel, i) => `
    <li style="animation-delay:${180 + i * 130}ms">${esc(regel)}</li>`).join('');

  return `
    <div class="intro">
      <div class="icoon">${esc(b.ronde.icoon)}</div>
      <h1>${esc(b.ronde.naam)}</h1>
      <p>${esc(b.ronde.uitleg)}</p>
      ${regels ? `<ul class="regels">${regels}</ul>` : ''}
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

    // Bij het antwoord moet de foto plaats maken voor de uitslag,
    // anders valt de onderste helft van het scherm weg.
    case 'geo':
      stukken.push(`<div class="fotokader ${onthul ? 'compact' : ''}"><img src="${esc(v.foto)}" alt=""></div>`);
      break;

    case 'zoom':
      // Begint sterk ingezoomd op het midden en opent traag, met CSS.
      stukken.push(`<div class="fotokader zoomkader ${onthul ? 'compact' : ''}"><img id="zoomFoto" src="${esc(v.foto)}" alt=""></div>`);
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
        <div class="teller">
          <strong id="binnenTeller">0</strong> / ${b.verwachteAntwoorden ?? b.stand.length} binnen
          <div class="aftellen verborgen" id="aftellen"></div>
        </div>
      </div>`);
  }

  return `<div class="vraagblok">
      <div class="vraagkop">
        <span>Vraag ${v.nummer} / ${v.totaal}</span>
        ${v.domein ? `<span class="scheiding"></span><span class="domein">${esc(v.domein)}</span>` : ''}
        <span class="scheiding"></span>${tekenNiveau(v.niveau)}
      </div>
      ${stukken.join('\n')}
    </div>`;
}

// Drie bolletjes die aangeven hoe zwaar de vraag is. Zonder woorden,
// zodat het niemand afschrikt voor hij de vraag gelezen heeft.
function tekenNiveau(niveau) {
  const hoeveel = { makkelijk: 1, gemiddeld: 2, moeilijk: 3 }[niveau] || 2;
  const bollen = [1, 2, 3].map((n) => `<i class="${n <= hoeveel ? 'aan' : ''}"></i>`).join('');
  return `<span class="niveau" title="${esc(niveau || 'gemiddeld')}">${bollen}</span>`;
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
      ${v.bron ? `<p class="bronvermelding">Foto: ${esc(v.bron.maker || 'onbekend')} — ${esc(v.bron.licentie)}, via Wikimedia Commons</p>` : ''}
    </div>`;
}

function tekenUitslag(b) {
  if (!b.uitslag?.length) return '<p class="leeg-tekst">Niemand heeft geantwoord.</p>';
  return `<div class="uitslagrij">${b.uitslag.map((r) => `
      <div class="uitslag-kaart ${r.goed ? 'goed' : ''}">
        ${gezicht(r)}<span>${esc(r.naam)}</span>
        <span class="detail">${esc(r.toelichting)}</span>
        <span class="punten">${r.punten > 0 ? '+' : ''}${r.punten}</span>
      </div>`).join('')}</div>`;
}

/* ---------------------------- Standen ------------------------------- */

// Hetzelfde podium voor de tussenstand en de eindstand. Het verschil zit
// in de kop erboven en in wat er te vieren valt.
function tekenEinde(b, isEinde) {
  const top = b.stand.slice(0, 3);
  const rest = b.stand.slice(3);
  if (!top.length) return '<div class="intro"><h1>Geen deelnemers</h1></div>';

  const leider = top[0];
  const treden = top.map((t, i) => `
    <div class="trede p${i + 1}">
      <div class="kop">
        ${gezicht(t, 'groot')}
        <div class="naam">${esc(t.naam)}</div>
        <div class="punten">${t.score} punten</div>
      </div>
      <div class="blok" style="animation-delay:${(2 - i) * 180}ms">${i + 1}</div>
    </div>`).join('');

  const kop = isEinde
    ? `<div class="winnaar">
         <div class="kroon">👑</div>
         <h1>${esc(leider.naam)} wint!</h1>
         <p>Proficiat — en aan de rest: volgend jaar herkansing.</p>
       </div>`
    : `<div class="winnaar">
         <div class="kroon">📊</div>
         <h1>Tussenstand</h1>
         <p>${esc(koploperZin(b.stand))}</p>
       </div>`;

  return `
    <div class="podiumblok">
      ${kop}
      <div class="podium">${treden}</div>
      ${rest.length ? `<div class="stand smal">${rest.map((t) => `
        <div class="standrij">
          <span class="plaats">${t.plaats}</span>
          ${gezicht(t, 'klein')}
          <span class="naam">${esc(t.naam)}</span>
          <span class="punten">${t.score}</span>
        </div>`).join('')}</div>` : ''}
    </div>`;
}

// Eén nette zin over hoe het ervoor staat, in plaats van losse stukjes
// die aan elkaar geplakt raar gaan lopen.
function koploperZin(stand) {
  if (!stand.length) return '';
  if (stand.length < 2) return `${stand[0].naam} staat alleen aan kop`;

  const verschil = stand[0].score - stand[1].score;
  if (verschil === 0) {
    const gelijk = stand.filter((t) => t.score === stand[0].score).length;
    return gelijk > 2
      ? `${gelijk} teams delen de leiding — dit wordt spannend`
      : 'Gelijkspel aan kop — dit wordt spannend';
  }
  if (verschil <= 30) return `${stand[0].naam} staat nipt voor, met ${verschil} punten`;
  return `${stand[0].naam} staat voor met ${verschil} punten`;
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

// Start of stopt het aftellen, afhankelijk van of alle teams binnen zijn.
function regelAftellen(b) {
  const vraagId = `${b.ronde?.id || ''}|${b.vraag?.nummer || 0}`;

  if (b.fase === 'vraag' && b.iedereenKlaar) {
    if (aftelVoor !== vraagId) {
      aftelVoor = vraagId;
      aftelTot = Date.now() + AFTELLEN_MS;
    }
    return;
  }
  // Vraag gesloten of iemand kan nog antwoorden: niet (meer) aftellen.
  aftelTot = 0;
  if (b.fase !== 'vraag') aftelVoor = '';
}

// Eén keer, tijdens de lobby: alle foto's in de cache trekken.
let fotosGeladen = false;
function laadFotosVooraf(b) {
  if (fotosGeladen || !b.fotosVooraf?.length) return;
  fotosGeladen = true;
  for (const pad of b.fotosVooraf) new Image().src = pad;
}

function werkLosseDelenBij(b) {
  const teller = document.getElementById('binnenTeller');
  if (teller) teller.textContent = b.antwoordenBinnen;

  laadFotosVooraf(b);

  regelAftellen(b);
  tekenStrepen(b);

  if (b.fase === 'lobby') {
    voetStatus.textContent = ''; // staat al groot in beeld bij de teams
  } else if (b.fase === 'vraag') {
    voetStatus.textContent = 'Vraag staat open';
  } else {
    voetStatus.textContent = '';
  }
}

function tik() {
  requestAnimationFrame(tik);
  if (!beeld || beeld.fase !== 'vraag' || !beeld.vraagStart) return;

  // Iedereen is binnen: nog even, en dan het antwoord.
  const aftelVak = document.getElementById('aftellen');
  if (aftelTot) {
    const over = Math.max(0, aftelTot - Date.now());
    if (aftelVak) {
      aftelVak.classList.remove('verborgen');
      aftelVak.textContent = `Iedereen is binnen — antwoord over ${Math.ceil(over / 1000)}`;
    }
    if (over === 0) {
      aftelTot = 0;
      stuurCommando('volgende');
    }
  } else if (aftelVak) {
    aftelVak.classList.add('verborgen');
  }

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

  // De zoomronde: sterk ingezoomd beginnen en traag opentrekken.
  const zoom = document.getElementById('zoomFoto');
  if (zoom) {
    const t = deel * deel; // eerst traag, dan sneller open
    const schaal = 8 - 7 * t; // van 8x tot 1x
    zoom.style.transform = `scale(${schaal.toFixed(3)})`;
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
