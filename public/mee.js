// De telefoon van een deelnemer.

import { TEKENKLEUREN, DIKTES, TEKENBREEDTE, TEKENHOOGTE } from './tekenkleuren.js';

const body = document.getElementById('body');
const gsmKop = document.getElementById('gsmKop');
const kopStip = document.getElementById('kopStip');
const kopNaam = document.getElementById('kopNaam');
const kopPlek = document.getElementById('kopPlek');
const kopScore = document.getElementById('kopScore');

const code = new URLSearchParams(location.search).get('code')?.toUpperCase() || '';

// Deze telefoon houdt zijn eigen kenmerk bij, zodat je na een herlaadbeurt
// gewoon weer in je eigen team zit.
let spelerId = localStorage.getItem('quiz:speler');
if (!spelerId) {
  spelerId = Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  localStorage.setItem('quiz:speler', spelerId);
}

let beeld = null;
let sleutel = '';
let klokAfwijking = 0;
let bezig = false;

const esc = (t) =>
  String(t ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

const LETTERS = ['A', 'B', 'C', 'D', 'E', 'F'];

/* ------------------------------------------------------------------ *
 * Verkeer met de server
 * ------------------------------------------------------------------ */

async function haalOp() {
  const url = `/api/spel?code=${encodeURIComponent(code)}&rol=speler&spelerId=${encodeURIComponent(spelerId)}`;
  const antwoord = await fetch(url, { cache: 'no-store' });
  const data = await antwoord.json();
  if (!antwoord.ok) throw new Error(data.fout || 'Kon de quiz niet bereiken.');
  return data;
}

async function stuur(lading) {
  const antwoord = await fetch('/api/spel', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, spelerId, ...lading }),
  });
  const data = await antwoord.json();
  if (!antwoord.ok) throw new Error(data.fout || 'Dat lukte niet.');
  return data;
}

async function stuurAntwoord(waarde) {
  if (bezig) return;
  bezig = true;
  try {
    const data = await stuur({ actie: 'antwoord', waarde });
    if (data.beeld) verwerk(data.beeld, true);
  } catch (fout) {
    toonFout(fout.message);
  } finally {
    bezig = false;
  }
}

function toonFout(tekst) {
  const vak = document.getElementById('foutVak');
  if (!vak) return;
  vak.textContent = tekst;
  vak.classList.remove('verborgen');
  setTimeout(() => vak.classList.add('verborgen'), 3500);
}

/* ------------------------------------------------------------------ *
 * Tekenen
 * ------------------------------------------------------------------ */

const teken = {
  strepen: [],
  verzonden: 0,
  moetWissen: false,
  bezig: false,
  kleur: 0,
  dikte: 2,
  actief: null,
};

function herstartTekening() {
  teken.strepen = [];
  teken.verzonden = 0;
  teken.moetWissen = false;
  teken.actief = null;
}

function tekenOpnieuw() {
  const doek = document.getElementById('mijnDoek');
  if (!doek) return;
  const ctx = doek.getContext('2d');
  const schaal = doek.width / TEKENBREEDTE;

  ctx.fillStyle = '#171320';
  ctx.fillRect(0, 0, doek.width, doek.height);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';

  for (const streep of teken.strepen) {
    ctx.strokeStyle = TEKENKLEUREN[streep.k] || TEKENKLEUREN[0];
    ctx.lineWidth = (DIKTES[streep.d] || DIKTES[1]) * schaal;
    ctx.beginPath();
    for (let i = 0; i + 1 < streep.p.length; i += 2) {
      const x = streep.p[i] * schaal;
      const y = streep.p[i + 1] * schaal;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    if (streep.p.length === 2) ctx.lineTo(streep.p[0] * schaal + 0.1, streep.p[1] * schaal);
    ctx.stroke();
  }
}

// Elke halve seconde gaan de nieuwe lijnen naar de server. Alleen wat er
// bij gekomen is, niet de hele tekening opnieuw.
async function verstuurLijnen() {
  if (teken.bezig) return;
  const heeftNieuwe = teken.strepen.length > teken.verzonden;
  if (!teken.moetWissen && !heeftNieuwe) return;

  teken.bezig = true;
  const wissen = teken.moetWissen;
  const teSturen = wissen ? teken.strepen.slice() : teken.strepen.slice(teken.verzonden);
  const tot = teken.strepen.length;

  try {
    await stuur({ actie: 'tekenen', strepen: teSturen, wissen });
    teken.verzonden = tot;
    if (wissen) teken.moetWissen = false;
  } catch {
    // Niet erg: bij de volgende beurt proberen we het gewoon opnieuw.
  } finally {
    teken.bezig = false;
  }
}

setInterval(() => {
  if (beeld?.magTekenen && beeld.fase === 'vraag') verstuurLijnen();
}, 600);

function koppelTekenvlak() {
  const doek = document.getElementById('mijnDoek');
  if (!doek || doek.dataset.klaar) return;
  doek.dataset.klaar = '1';

  const meet = () => {
    const breedte = doek.clientWidth;
    doek.width = Math.round(breedte);
    doek.height = Math.round((breedte * TEKENHOOGTE) / TEKENBREEDTE);
    tekenOpnieuw();
  };
  meet();
  new ResizeObserver(meet).observe(doek);

  const naarVlak = (e) => {
    const r = doek.getBoundingClientRect();
    return [
      Math.round(((e.clientX - r.left) / r.width) * TEKENBREEDTE),
      Math.round(((e.clientY - r.top) / r.height) * TEKENHOOGTE),
    ];
  };

  doek.addEventListener('pointerdown', (e) => {
    if (!beeld?.magTekenen || beeld.fase !== 'vraag') return;
    doek.setPointerCapture(e.pointerId);
    const [x, y] = naarVlak(e);
    teken.actief = { k: teken.kleur, d: teken.dikte, p: [x, y] };
    teken.strepen.push(teken.actief);
    tekenOpnieuw();
  });

  doek.addEventListener('pointermove', (e) => {
    if (!teken.actief) return;
    const [x, y] = naarVlak(e);
    const p = teken.actief.p;
    const dx = x - p[p.length - 2];
    const dy = y - p[p.length - 1];
    // Kleine bewegingen negeren: dat scheelt veel punten zonder dat je
    // het aan de lijn ziet.
    if (dx * dx + dy * dy < 36) return;
    if (p.length >= 400) return;
    p.push(x, y);
    tekenOpnieuw();
  });

  const stop = () => { teken.actief = null; };
  doek.addEventListener('pointerup', stop);
  doek.addEventListener('pointercancel', stop);
  doek.addEventListener('pointerleave', stop);
}

/* ------------------------------------------------------------------ *
 * Tekenen: de knoppen eronder
 * ------------------------------------------------------------------ */

function tekengereedschap() {
  const kleuren = TEKENKLEUREN.map((kleur, i) => `
    <button class="kleurknop ${i === teken.kleur ? 'aan' : ''}" data-kleur="${i}"
            style="background:${kleur}" aria-label="Kleur ${i + 1}"></button>`).join('');
  const diktes = [1, 2, 3, 4].map((d) => `
    <button class="dikteknop ${d === teken.dikte ? 'aan' : ''}" data-dikte="${d}" aria-label="Dikte ${d}">
      <span style="width:${4 + d * 3}px;height:${4 + d * 3}px"></span>
    </button>`).join('');

  return `
    <div class="gereedschap">
      <div class="kleuren">${kleuren}</div>
      <div class="onderrij">
        <div class="diktes">${diktes}</div>
        <button class="knop stil klein" id="ongedaan">Terug</button>
        <button class="knop stil klein" id="wisAlles">Wissen</button>
      </div>
    </div>`;
}

function koppelGereedschap() {
  document.querySelectorAll('[data-kleur]').forEach((knop) => {
    knop.addEventListener('click', () => {
      teken.kleur = Number(knop.dataset.kleur);
      document.querySelectorAll('[data-kleur]').forEach((k) => k.classList.toggle('aan', k === knop));
    });
  });
  document.querySelectorAll('[data-dikte]').forEach((knop) => {
    knop.addEventListener('click', () => {
      teken.dikte = Number(knop.dataset.dikte);
      document.querySelectorAll('[data-dikte]').forEach((k) => k.classList.toggle('aan', k === knop));
    });
  });
  document.getElementById('ongedaan')?.addEventListener('click', () => {
    if (!teken.strepen.length) return;
    teken.strepen.pop();
    // De server kent geen "laatste weg": we sturen de tekening opnieuw.
    teken.moetWissen = true;
    tekenOpnieuw();
  });
  document.getElementById('wisAlles')?.addEventListener('click', () => {
    teken.strepen = [];
    teken.verzonden = 0;
    teken.moetWissen = true;
    tekenOpnieuw();
  });
}

/* ------------------------------------------------------------------ *
 * De schermen
 * ------------------------------------------------------------------ */

function verwerk(nieuw, gedwongen = false) {
  const vorigeVraag = beeld ? `${beeld.ronde?.id}|${beeld.vraag?.nummer}` : '';
  beeld = nieuw;
  klokAfwijking = nieuw.nu - Date.now();

  // Nieuwe tekenopdracht? Dan begint het doek leeg.
  const nieuweVraag = `${nieuw.ronde?.id}|${nieuw.vraag?.nummer}`;
  if (nieuweVraag !== vorigeVraag) herstartTekening();

  if (nieuw.team) {
    gsmKop.classList.remove('verborgen');
    kopStip.style.background = nieuw.team.kleur;
    kopNaam.textContent = `${nieuw.team.emoji} ${nieuw.team.naam}`;
    kopScore.textContent = nieuw.team.score;
    kopPlek.textContent = nieuw.team.plaats ? `${nieuw.team.plaats}e` : '';
  } else {
    gsmKop.classList.add('verborgen');
  }

  const nieuweSleutel = [
    nieuw.team ? 'in' : 'uit',
    nieuw.fase,
    nieuw.ronde?.id || '',
    nieuw.vraag?.nummer || 0,
    nieuw.magTekenen ? 'teken' : '',
    nieuw.beeldtUit ? 'op' : '',
    nieuw.fase === 'lobby' ? nieuw.teams.length : '',
  ].join('|');

  if (gedwongen || nieuweSleutel !== sleutel) {
    sleutel = nieuweSleutel;
    body.innerHTML = tekenScherm(nieuw);
    koppelScherm(nieuw);
  }
  werkBij(nieuw);
}

function tekenScherm(b) {
  if (!b.team) return tekenAanmelden(b);
  switch (b.fase) {
    case 'lobby': return wacht('🛋️', 'Je zit erin!', 'We wachten tot de quizmaster start. Hou je gsm bij de hand.');
    case 'ronde-intro': return `
      <div class="wachtblok">
        <div class="groot">${esc(b.ronde.icoon)}</div>
        <h1 class="gsm-titel">${esc(b.ronde.naam)}</h1>
        <p class="gsm-sub">${esc(b.ronde.uitleg)}</p>
      </div>`;
    case 'vraag': return tekenVraag(b);
    case 'reveal': return tekenReveal(b);
    case 'tussenstand': return tekenStand(b, 'Tussenstand');
    case 'einde': return tekenStand(b, 'Eindstand');
    default: return '';
  }
}

function wacht(icoon, titel, tekst) {
  return `
    <div class="wachtblok">
      <div class="groot">${icoon}</div>
      <h1 class="gsm-titel">${esc(titel)}</h1>
      <p class="gsm-sub">${esc(tekst)}</p>
      <div class="puls"><span></span><span></span><span></span></div>
    </div>`;
}

/* ----------------------------- Aanmelden ---------------------------- */

function tekenAanmelden(b) {
  const teams = b.teams?.length
    ? b.teams.map((t) => `
        <button class="keuze" data-team="${esc(t.id)}">
          <span class="letter">${esc(t.emoji)}</span>
          <span>${esc(t.naam)}<br><small style="color:var(--grijs)">${t.aantal} speler${t.aantal === 1 ? '' : 's'}</small></span>
        </button>`).join('')
    : '';

  return `
    <h1 class="gsm-titel">Wie ben jij?</h1>
    <input class="veld" id="naamVeld" maxlength="20" placeholder="Je voornaam"
           autocomplete="given-name" enterkeyhint="done">

    ${teams ? `
      <h2 class="gsm-titel" style="font-size:1.1rem;margin-top:.6rem">Sluit aan bij een team</h2>
      <div class="teamlijst">${teams}</div>
      <p class="gsm-sub" style="text-align:center">of</p>` : ''}

    <h2 class="gsm-titel" style="font-size:1.1rem">${teams ? 'Maak een nieuw team' : 'Maak je team'}</h2>
    <form class="invoerrij" id="teamForm">
      <input class="veld" id="teamVeld" maxlength="24" placeholder="Teamnaam" enterkeyhint="go">
      <button class="knop" type="submit">Maak</button>
    </form>
    <p class="melding verborgen" id="foutVak" role="alert"></p>`;
}

/* ------------------------------- Vraag ------------------------------ */

function tekenVraag(b) {
  const v = b.vraag;
  if (!v) return wacht('⏳', 'Even geduld', 'De volgende vraag komt eraan.');

  // Het team dat aan de beurt is om te tekenen of uit te beelden.
  if (b.beeldtUit) {
    const kop = `
      <div class="uitbeeldkaart">
        <div class="label">${v.type === 'tekenen' ? 'Teken dit' : 'Beeld dit uit'}</div>
        <div class="opdracht">${esc(b.opdracht || '')}</div>
        <div class="hint">${v.type === 'tekenen'
          ? 'Geen letters of cijfers! Hoe meer teams het raden, hoe meer punten jullie pakken.'
          : 'Niet praten, niet wijzen naar voorwerpen in de kamer.'}</div>
      </div>`;

    if (v.type === 'tekenen') {
      return `${kop}
        <div class="doekhouder"><canvas id="mijnDoek"></canvas></div>
        ${tekengereedschap()}
        ${statusregel()}
        <p class="melding verborgen" id="foutVak" role="alert"></p>`;
    }
    return `${kop}${statusregel()}<p class="melding verborgen" id="foutVak" role="alert"></p>`;
  }

  const kop = `<p class="gsm-sub">Vraag ${v.nummer} van ${v.totaal}</p>`;
  let invoer = '';

  switch (v.type) {
    case 'mc':
    case 'woord':
      invoer = `<div class="keuzes">${v.opties.map((tekst, i) => `
        <button class="keuze" data-keuze="${i}">
          <span class="letter">${LETTERS[i]}</span><span>${esc(tekst)}</span>
        </button>`).join('')}</div>`;
      break;

    case 'truefalse':
      invoer = `<div class="duo">
          <button class="keuze" data-keuze="true">Waar</button>
          <button class="keuze" data-keuze="false">Niet waar</button>
        </div>`;
      break;

    case 'estimate':
      invoer = `<form class="invoerrij" id="tekstForm">
          <input class="veld" id="tekstVeld" inputmode="numeric" autocomplete="off"
                 placeholder="Je schatting" enterkeyhint="send">
          <button class="knop" type="submit">Stuur</button>
        </form>
        ${v.eenheid ? `<p class="gsm-sub">in ${esc(v.eenheid)}</p>` : ''}`;
      break;

    default: // open vragen, geo, emoji, zoom en het raden bij een opvoering
      invoer = `<form class="invoerrij" id="tekstForm">
          <input class="veld" id="tekstVeld" autocomplete="off" autocapitalize="none"
                 spellcheck="false" placeholder="Je antwoord" enterkeyhint="send">
          <button class="knop" type="submit">Stuur</button>
        </form>`;
  }

  const vraagtekst = v.type === 'woord'
    ? `<h1 class="gsm-titel">Wat betekent <em style="color:var(--amber)">${esc(v.woord)}</em>?</h1>`
    : v.type === 'geo' ? '<h1 class="gsm-titel">In welk land is dit?</h1>'
    : v.type === 'zoom' ? '<h1 class="gsm-titel">Wat zie je?</h1>'
    : v.type === 'charades' || v.type === 'tekenen' ? '<h1 class="gsm-titel">Wat is het?</h1>'
    : v.tekst ? `<h1 class="gsm-titel">${esc(v.tekst)}</h1>` : '';

  const kijkHint = ['geo', 'zoom', 'charades', 'tekenen'].includes(v.type)
    ? '<p class="gsm-sub">Kijk naar het groot scherm.</p>' : '';

  return `${kop}${vraagtekst}${kijkHint}${invoer}${statusregel()}
    <p class="melding verborgen" id="foutVak" role="alert"></p>`;
}

function statusregel() {
  return `
    <div class="statusregel" id="statusregel">
      <span id="statusTekst">Nog niets ingestuurd</span>
      <span class="balk"><i id="statusBalk" style="width:100%"></i></span>
      <span id="statusKlok">–</span>
    </div>`;
}

/* ------------------------------ Reveal ------------------------------ */

function tekenReveal(b) {
  const r = b.resultaat;
  const v = b.vraag;

  let juist = '';
  if (v) {
    if (v.type === 'mc' || v.type === 'woord') juist = v.opties[v.antwoord];
    else if (v.type === 'truefalse') juist = v.antwoord ? 'Waar' : 'Niet waar';
    else if (v.type === 'estimate') juist = new Intl.NumberFormat('nl-BE').format(v.antwoord);
    else juist = v.antwoord;
  }

  if (!r) {
    return `
      <div class="resultaatkaart">
        <div class="kop">🙈</div>
        <div class="tekst">Geen antwoord</div>
        <div class="detail">Het was: ${esc(juist)}</div>
      </div>${miniStand(b)}`;
  }

  return `
    <div class="resultaatkaart ${r.goed ? 'goed' : 'mis'}">
      <div class="kop">${r.goed ? '🎉' : '😬'}</div>
      <div class="tekst">${r.goed ? 'Juist!' : 'Helaas'}</div>
      <div class="punten">${r.punten > 0 ? '+' : ''}${r.punten} punten</div>
      <div class="detail">${esc(r.toelichting || '')}${!r.goed && juist ? ` — het was: ${esc(juist)}` : ''}</div>
    </div>${miniStand(b)}`;
}

function miniStand(b) {
  return `<div class="mini-stand">${b.stand.map((t) => `
    <div class="mini-rij ${t.id === b.team?.id ? 'ik' : ''}">
      <span class="plaats">${t.plaats}</span>
      <span>${esc(t.emoji)}</span>
      <span class="naam">${esc(t.naam)}</span>
      <span class="punten">${t.score}</span>
    </div>`).join('')}</div>`;
}

function tekenStand(b, titel) {
  const ik = b.stand.find((t) => t.id === b.team?.id);
  const kop = titel === 'Eindstand' && ik?.plaats === 1
    ? '<div class="wachtblok" style="padding:1rem 0"><div class="groot">🏆</div><h1 class="gsm-titel">Jullie winnen!</h1></div>'
    : `<h1 class="gsm-titel">${esc(titel)}</h1>`;
  return `${kop}${miniStand(b)}`;
}

/* ------------------------------------------------------------------ *
 * Koppelen en bijwerken
 * ------------------------------------------------------------------ */

function koppelScherm(b) {
  // Aanmelden
  const naamVeld = document.getElementById('naamVeld');
  if (naamVeld) {
    naamVeld.value = localStorage.getItem('quiz:naam') || '';
    naamVeld.addEventListener('input', () => localStorage.setItem('quiz:naam', naamVeld.value));
  }

  document.querySelectorAll('[data-team]').forEach((knop) => {
    knop.addEventListener('click', async () => {
      try {
        const data = await stuur({ actie: 'join', teamId: knop.dataset.team, spelerNaam: naamVeld?.value });
        if (data.beeld) verwerk(data.beeld, true);
      } catch (fout) { toonFout(fout.message); }
    });
  });

  document.getElementById('teamForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const naam = document.getElementById('teamVeld').value;
    try {
      const data = await stuur({ actie: 'nieuwTeam', naam, spelerNaam: naamVeld?.value });
      if (data.beeld) verwerk(data.beeld, true);
    } catch (fout) { toonFout(fout.message); }
  });

  // Antwoorden
  document.querySelectorAll('[data-keuze]').forEach((knop) => {
    knop.addEventListener('click', () => {
      const rauw = knop.dataset.keuze;
      stuurAntwoord(rauw === 'true' ? true : rauw === 'false' ? false : Number(rauw));
    });
  });

  document.getElementById('tekstForm')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const veld = document.getElementById('tekstVeld');
    const waarde = veld.value.trim();
    if (!waarde) return;
    stuurAntwoord(waarde);
    if (b.ronde?.type === 'charades' || b.ronde?.type === 'tekenen') veld.value = '';
    else veld.blur();
  });

  // Tekenen
  koppelTekenvlak();
  koppelGereedschap();
}

function werkBij(b) {
  // Welke keuze staat aangeduid?
  const gekozen = b.antwoord?.waarde;
  document.querySelectorAll('[data-keuze]').forEach((knop) => {
    const rauw = knop.dataset.keuze;
    const waarde = rauw === 'true' ? true : rauw === 'false' ? false : Number(rauw);
    knop.classList.toggle('gekozen', gekozen === waarde);
  });

  const tekst = document.getElementById('statusTekst');
  if (tekst) {
    if (b.magTekenen) tekst.textContent = 'Iedereen kijkt mee';
    else if (b.beeldtUit) tekst.textContent = 'Jullie zijn aan zet';
    else if (b.antwoord?.vast) tekst.textContent = 'Juist! Vastgezet';
    else if (b.antwoord != null) tekst.textContent = 'Ingestuurd — je mag nog wijzigen';
    else tekst.textContent = 'Nog niets ingestuurd';
  }
}

function tik() {
  requestAnimationFrame(tik);
  if (!beeld || beeld.fase !== 'vraag' || !beeld.vraagStart) return;

  const limiet = beeld.vraag?.seconden || 30;
  const verstreken = (Date.now() + klokAfwijking - beeld.vraagStart) / 1000;
  const over = Math.max(0, limiet - verstreken);

  const balk = document.getElementById('statusBalk');
  const klok = document.getElementById('statusKlok');
  const regel = document.getElementById('statusregel');
  if (balk) balk.style.width = `${Math.max(0, Math.min(100, (over / limiet) * 100))}%`;
  if (klok) klok.textContent = `${Math.ceil(over)}s`;
  if (regel) regel.classList.toggle('bijna', over <= 5);

  // Tijd om: invoer op slot, zodat niemand nog nagooit.
  if (over <= 0) {
    document.querySelectorAll('.keuze, #tekstForm button, #tekstVeld').forEach((el) => {
      el.disabled = true;
    });
  }
}

/* ------------------------------------------------------------------ *
 * Opstarten
 * ------------------------------------------------------------------ */

async function pols() {
  try {
    verwerk(await haalOp());
  } catch (fout) {
    if (!beeld) {
      body.innerHTML = `
        <div class="wachtblok">
          <div class="groot">🤷</div>
          <h1 class="gsm-titel">Quiz niet gevonden</h1>
          <p class="gsm-sub">${esc(fout.message)}</p>
          <a class="knop" href="/">Terug naar het begin</a>
        </div>`;
    }
  }
  setTimeout(pols, beeld?.fase === 'vraag' ? 1200 : 2000);
}

if (!code) {
  location.href = '/';
} else {
  pols();
  requestAnimationFrame(tik);
}
