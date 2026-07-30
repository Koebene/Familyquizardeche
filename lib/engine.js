// De spelmotor. Alle regels van de quiz staan hier, en nergens anders.
//
// De server is de enige die de waarheid kent: telefoons en het groot
// scherm vragen gewoon om de laatste stand van zaken. Zo kan niemand
// per ongeluk (of expres) zijn eigen score aanpassen.

import { rondes, tussenstandNa, QUIZ_TITEL } from './quiz-data.js';
import { getArt } from './art.js';

export { QUIZ_TITEL };

/* ------------------------------------------------------------------ *
 * Kleine hulpjes
 * ------------------------------------------------------------------ */

// Geen I, O, 0 of 1: die worden te vaak verkeerd overgetikt.
const CODE_LETTERS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

export function maakCode(lengte = 4) {
  let code = '';
  for (let i = 0; i < lengte; i++) {
    code += CODE_LETTERS[Math.floor(Math.random() * CODE_LETTERS.length)];
  }
  return code;
}

export function maakId() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

const TEAM_EMOJI = ['🦊', '🐼', '🦉', '🐝', '🦁', '🐙', '🦩', '🐢', '🦔', '🐳', '🦕', '🐧'];
const TEAM_KLEUR = ['#e8643c', '#3d8bd4', '#4fa86a', '#c94f8c', '#e0a32e', '#7a5cc4', '#2fa39b', '#d05252'];

/* ------------------------------------------------------------------ *
 * Antwoorden vergelijken
 * ------------------------------------------------------------------ */

// "Bélgië!" en "belgie" moeten hetzelfde zijn. Lidwoorden gooien we weg,
// want "een fiets" en "fiets" zijn allebei prima.
export function normaliseer(tekst) {
  return String(tekst ?? '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/^(de|het|een|the|a|an|le|la|les)\s+/, '');
}

function levenshtein(a, b) {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;
  let vorige = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 0; i < a.length; i++) {
    const huidige = [i + 1];
    for (let j = 0; j < b.length; j++) {
      const kost = a[i] === b[j] ? 0 : 1;
      huidige[j + 1] = Math.min(huidige[j] + 1, vorige[j + 1] + 1, vorige[j] + kost);
    }
    vorige = huidige;
  }
  return vorige[b.length];
}

// Hoeveel typfouten we vergeven, afhankelijk van de lengte van het woord.
function tolerantie(woord) {
  if (woord.length <= 4) return 0;
  if (woord.length <= 8) return 1;
  return 2;
}

// Vergelijkt twee losse woorden, met wat marge voor verbuigingen:
// "frietjes" telt als "friet", "pinguins" als "pinguin".
function woordMatcht(gegeven, sleutel) {
  if (gegeven === sleutel) return true;
  if (sleutel.length >= 4 && gegeven.startsWith(sleutel)) return true;
  if (gegeven.length >= 4 && sleutel.startsWith(gegeven)) return true;

  // Nederlandse verbuigingen lopen soms ver uit elkaar ("stofzuigende"
  // tegenover "stofzuiger"), maar delen wel een flinke stam.
  const kortste = Math.min(gegeven.length, sleutel.length);
  let gedeeld = 0;
  while (gedeeld < kortste && gegeven[gedeeld] === sleutel[gedeeld]) gedeeld++;
  if (gedeeld >= 6 && gedeeld >= kortste * 0.6) return true;

  return levenshtein(gegeven, sleutel) <= tolerantie(sleutel);
}

/**
 * Voor het uitbeelden en het tekenen kijken we niet of de hele zin
 * klopt, maar of de kern erin zit. "een kat op een stofzuiger" en
 * "stofzuigende poes" zijn allebei raak.
 *
 * Elke groep moet voorkomen; binnen een groep volstaat één woord.
 */
function bevatSleutelwoorden(gegeven, groepen) {
  const woorden = normaliseer(gegeven).split(' ').filter(Boolean);
  if (!woorden.length) return false;

  return groepen.every((groep) => {
    const opties = (Array.isArray(groep) ? groep : [groep]).map(normaliseer);
    return opties.some((optie) => woorden.some((woord) => woordMatcht(woord, optie)));
  });
}

export function isGoedAntwoord(gegeven, vraag) {
  const invoer = normaliseer(gegeven);
  if (!invoer) return false;

  if (vraag.sleutelwoorden?.length) {
    return bevatSleutelwoorden(gegeven, vraag.sleutelwoorden);
  }

  const kandidaten = [vraag.antwoord, ...(vraag.accept || [])]
    .filter(Boolean)
    .map(normaliseer)
    .filter(Boolean);

  for (const kandidaat of kandidaten) {
    if (invoer === kandidaat) return true;
    if (levenshtein(invoer, kandidaat) <= tolerantie(kandidaat)) return true;
    // "eddy merckx" mag ook gewoon "merckx" zijn: laatste woord telt.
    const laatste = kandidaat.split(' ').pop();
    if (laatste.length >= 5 && invoer === laatste) return true;
  }
  return false;
}

/* ------------------------------------------------------------------ *
 * Punten
 * ------------------------------------------------------------------ */

const BASIS = { mc: 100, woord: 100, truefalse: 60, open: 120, geo: 120 };

// Rondes waar je uit vier vakjes kiest, worden op dezelfde manier nagekeken.
const IS_MEERKEUZE = (type) => type === 'mc' || type === 'woord';

// Uitbeelden en tekenen werken hetzelfde: één team voert iets op, de
// rest raadt, en de opvoerder wordt beloond naar het aantal raders.
const IS_OPVOERING = (type) => type === 'charades' || type === 'tekenen';

// Wie snel antwoordt krijgt tot de helft van de basisscore erbij.
function snelheidsbonus(basis, seconden, limiet) {
  if (!Number.isFinite(seconden) || seconden < 0) return 0;
  const rest = Math.max(0, 1 - seconden / Math.max(1, limiet));
  return Math.round(basis * 0.5 * rest);
}

function secondenSinds(start, tijdstip) {
  if (!start || !tijdstip) return 0;
  return Math.max(0, (tijdstip - start) / 1000);
}

// Rekent voor één vraag uit wie hoeveel punten krijgt.
// Geeft een object terug: { teamId: { punten, goed, toelichting } }
export function berekenPunten(ronde, vraag, inzendingen, vraagStart, teams) {
  const uitslag = {};
  const limiet = ronde.seconden || 30;

  if (ronde.type === 'estimate') {
    const doel = vraag.antwoord;
    const gerangschikt = Object.entries(inzendingen)
      .map(([teamId, inzending]) => {
        const getal = Number(String(inzending.waarde).replace(/[^\d.,-]/g, '').replace(',', '.'));
        return { teamId, getal, afwijking: Number.isFinite(getal) ? Math.abs(getal - doel) : Infinity };
      })
      .filter((r) => Number.isFinite(r.afwijking))
      .sort((a, b) => a.afwijking - b.afwijking);

    const trap = [120, 90, 70, 50];
    gerangschikt.forEach((rij, i) => {
      let punten = trap[i] ?? 30;
      if (rij.afwijking === 0) punten += 50;
      uitslag[rij.teamId] = {
        punten,
        goed: rij.afwijking === 0,
        toelichting: rij.afwijking === 0 ? 'Exact juist!' : `${formatGetal(rij.getal)} — ${formatGetal(rij.afwijking)} ernaast`,
      };
    });
    // Wie niets instuurde, krijgt niets.
    for (const teamId of Object.keys(inzendingen)) {
      if (!uitslag[teamId]) uitslag[teamId] = { punten: 0, goed: false, toelichting: 'Geen geldig getal' };
    }
    return uitslag;
  }

  if (ronde.type === 'zoom') {
    for (const [teamId, inzending] of Object.entries(inzendingen)) {
      const goed = isGoedAntwoord(inzending.waarde, vraag);
      if (!goed) {
        uitslag[teamId] = { punten: 0, goed: false, toelichting: inzending.waarde };
        continue;
      }
      const s = secondenSinds(vraagStart, inzending.at);
      const rest = Math.max(0, 1 - s / Math.max(1, limiet));
      const punten = Math.round(60 + 90 * rest);
      uitslag[teamId] = { punten, goed: true, toelichting: `Geraden na ${Math.round(s)} sec` };
    }
    return uitslag;
  }

  if (IS_OPVOERING(ronde.type)) {
    const raders = Object.entries(inzendingen)
      .filter(([, inzending]) => isGoedAntwoord(inzending.waarde, vraag))
      .sort((a, b) => a[1].at - b[1].at);

    const trap = [150, 110, 80];
    raders.forEach(([teamId], i) => {
      uitslag[teamId] = { punten: trap[i] ?? 50, goed: true, toelichting: i === 0 ? 'Als eerste geraden!' : 'Geraden' };
    });
    for (const [teamId, inzending] of Object.entries(inzendingen)) {
      if (!uitslag[teamId]) uitslag[teamId] = { punten: 0, goed: false, toelichting: inzending.waarde };
    }
    // Het opvoerende team wordt beloond naar het aantal teams dat het
    // doorhad: hoe duidelijker je tekent of speelt, hoe meer je pakt.
    if (vraag._opvoerTeam) {
      const punten = raders.length * 60;
      uitslag[vraag._opvoerTeam] = {
        punten,
        goed: raders.length > 0,
        toelichting: raders.length
          ? `${raders.length} team${raders.length === 1 ? '' : 's'} raadden het`
          : 'Niemand raadde het',
      };
    }
    return uitslag;
  }

  // Meerkeuze, waar/niet waar, open vragen en de geo-ronde.
  const basis = BASIS[ronde.type] ?? 100;
  for (const [teamId, inzending] of Object.entries(inzendingen)) {
    let goed;
    if (IS_MEERKEUZE(ronde.type)) {
      goed = Number(inzending.waarde) === vraag.antwoord;
    } else if (ronde.type === 'truefalse') {
      goed = (inzending.waarde === true || inzending.waarde === 'true') === vraag.antwoord;
    } else {
      goed = isGoedAntwoord(inzending.waarde, vraag);
    }
    const s = secondenSinds(vraagStart, inzending.at);
    uitslag[teamId] = {
      punten: goed ? basis + snelheidsbonus(basis, s, limiet) : 0,
      goed,
      toelichting: leesbaarAntwoord(ronde, vraag, inzending.waarde),
    };
  }
  return uitslag;
}

function leesbaarAntwoord(ronde, vraag, waarde) {
  if (IS_MEERKEUZE(ronde.type)) {
    const i = Number(waarde);
    return vraag.opties?.[i] ?? '—';
  }
  if (ronde.type === 'truefalse') {
    return waarde === true || waarde === 'true' ? 'Waar' : 'Niet waar';
  }
  return String(waarde ?? '').trim() || '—';
}

function formatGetal(n) {
  if (!Number.isFinite(n)) return '—';
  return new Intl.NumberFormat('nl-BE').format(Math.round(n * 100) / 100);
}

/* ------------------------------------------------------------------ *
 * Een nieuw spel
 * ------------------------------------------------------------------ */

export function nieuwSpel(code) {
  return {
    code,
    aangemaakt: Date.now(),
    versie: 1,
    fase: 'lobby',
    rondeIndex: 0,
    vraagIndex: 0,
    vraagStart: null,
    vraagOpen: false,
    teams: [],
    antwoorden: {},
    laatsteUitslag: null,
    uitbeelder: null,
    tekening: [],
  };
}

function sleutel(rondeIndex, vraagIndex) {
  return `${rondeIndex}:${vraagIndex}`;
}

// De vorm waarin een uitbeeld- of tekenopdracht nagekeken wordt.
function opvoerAntwoord(vraag) {
  return {
    antwoord: vraag.q,
    accept: vraag.accept || [],
    sleutelwoorden: vraag.sleutelwoorden || null,
  };
}

function huidigeRonde(spel) {
  return rondes[spel.rondeIndex] || null;
}

function huidigeVraag(spel) {
  const ronde = huidigeRonde(spel);
  return ronde?.vragen?.[spel.vraagIndex] || null;
}

/* ------------------------------------------------------------------ *
 * Spelers en teams
 * ------------------------------------------------------------------ */

export function voegTeamToe(spel, naam) {
  const schoon = String(naam || '').trim().slice(0, 24);
  if (!schoon) return { fout: 'Geef je team een naam.' };
  if (spel.teams.length >= 10) return { fout: 'Er passen maximaal 10 teams in één quiz.' };
  const bestaat = spel.teams.some((t) => normaliseer(t.naam) === normaliseer(schoon));
  if (bestaat) return { fout: 'Die teamnaam is al genomen. Kies er een andere.' };

  const team = {
    id: maakId(),
    naam: schoon,
    emoji: TEAM_EMOJI[spel.teams.length % TEAM_EMOJI.length],
    kleur: TEAM_KLEUR[spel.teams.length % TEAM_KLEUR.length],
    score: 0,
    leden: [],
  };
  spel.teams.push(team);
  return { team };
}

export function sluitAan(spel, teamId, spelerId, spelerNaam) {
  const team = spel.teams.find((t) => t.id === teamId);
  if (!team) return { fout: 'Dat team bestaat niet meer.' };
  const naam = String(spelerNaam || '').trim().slice(0, 20) || 'Speler';

  // Iemand die opnieuw verbindt, moet niet dubbel in de lijst komen.
  for (const t of spel.teams) {
    t.leden = t.leden.filter((l) => l.id !== spelerId);
  }
  team.leden.push({ id: spelerId, naam });
  return { team };
}

/* ------------------------------------------------------------------ *
 * Antwoorden binnenkrijgen
 * ------------------------------------------------------------------ */

export function neemAntwoord(spel, teamId, waarde) {
  if (spel.fase !== 'vraag' || !spel.vraagOpen) {
    return { fout: 'De vraag staat niet open.' };
  }
  const team = spel.teams.find((t) => t.id === teamId);
  if (!team) return { fout: 'Onbekend team.' };

  const ronde = huidigeRonde(spel);
  if (IS_OPVOERING(ronde?.type) && spel.uitbeelder?.teamId === teamId) {
    return { fout: 'Jullie zijn aan de beurt — jullie mogen niet meeraden.' };
  }

  // De klok op het groot scherm moet ook echt gelden. Anderhalve seconde
  // speling, want een gsm op mobiel internet is soms even onderweg.
  const verstreken = (Date.now() - (spel.vraagStart || 0)) / 1000;
  if (ronde && verstreken > (ronde.seconden || 30) + 1.5) {
    return { fout: 'Te laat — de tijd is om.' };
  }

  const k = sleutel(spel.rondeIndex, spel.vraagIndex);
  spel.antwoorden[k] = spel.antwoorden[k] || {};

  // Bij het uitbeelden telt alleen het eerste juiste antwoord: daarna
  // blijft de tijd staan en kan een team zich niet meer "verbeteren".
  const bestaand = spel.antwoorden[k][teamId];
  if (IS_OPVOERING(ronde?.type) && bestaand?.vast) {
    return { fout: 'Jullie antwoord staat al vast.' };
  }

  // Bij uitbeelden en tekenen is de opdracht zelf het juiste antwoord.
  const vraag = huidigeVraag(spel);
  const juist = IS_OPVOERING(ronde?.type) && vraag
    ? isGoedAntwoord(waarde, opvoerAntwoord(vraag))
    : false;

  spel.antwoorden[k][teamId] = {
    waarde,
    at: Date.now(),
    vast: juist,
  };
  return { ok: true };
}

/* ------------------------------------------------------------------ *
 * De fases van het spel
 * ------------------------------------------------------------------ */

// Kiest wie uitbeeldt: teams komen om beurt aan bod, en binnen een team
// ook de leden. Zo staat niet altijd dezelfde nonkel recht.
function kiesUitbeelder(spel) {
  if (!spel.teams.length) return null;
  const team = spel.teams[spel.vraagIndex % spel.teams.length];
  if (!team.leden.length) return { teamId: team.id, naam: null, spelerId: null };
  const ronde = Math.floor(spel.vraagIndex / spel.teams.length);
  const lid = team.leden[ronde % team.leden.length];
  return { teamId: team.id, naam: lid.naam, spelerId: lid.id };
}

function openVraag(spel) {
  spel.fase = 'vraag';
  spel.vraagOpen = true;
  spel.vraagStart = Date.now();
  spel.laatsteUitslag = null;
  spel.tekening = [];
  const ronde = huidigeRonde(spel);
  spel.uitbeelder = IS_OPVOERING(ronde?.type) ? kiesUitbeelder(spel) : null;
}

/**
 * Neemt nieuwe lijnen van de tekenaar aan.
 *
 * We sturen geen afbeelding heen en weer maar alleen de punten van elke
 * streek. Dat is klein genoeg voor een gsm-verbinding, en het groot
 * scherm tekent ze zelf opnieuw.
 */
export function neemTekening(spel, spelerId, strepen, wissen) {
  const ronde = huidigeRonde(spel);
  if (ronde?.type !== 'tekenen') return { fout: 'Er valt nu niets te tekenen.' };
  if (spel.fase !== 'vraag' || !spel.vraagOpen) return { fout: 'De vraag staat niet open.' };

  const team = spel.teams.find((t) => t.leden.some((l) => l.id === spelerId));
  if (!team || team.id !== spel.uitbeelder?.teamId) {
    return { fout: 'Jullie zijn niet aan de beurt om te tekenen.' };
  }

  if (wissen) spel.tekening = [];

  for (const streep of strepen || []) {
    if (!Array.isArray(streep?.p) || streep.p.length < 2) continue;
    // Een grens op de omvang, zodat een enthousiaste krabbelaar de
    // quiz niet traag maakt.
    if (spel.tekening.length >= 300) break;
    spel.tekening.push({
      k: Math.max(0, Math.min(7, Number(streep.k) || 0)),
      d: Math.max(1, Math.min(4, Number(streep.d) || 1)),
      p: streep.p.slice(0, 400).map((n) => Math.round(Number(n) || 0)),
    });
  }
  return { ok: true };
}

function sluitVraag(spel) {
  const ronde = huidigeRonde(spel);
  const vraag = huidigeVraag(spel);
  if (!ronde || !vraag) return;

  spel.vraagOpen = false;
  const k = sleutel(spel.rondeIndex, spel.vraagIndex);
  const inzendingen = spel.antwoorden[k] || {};

  const vraagVoorScore = IS_OPVOERING(ronde.type)
    ? { ...opvoerAntwoord(vraag), _opvoerTeam: spel.uitbeelder?.teamId }
    : vraag;

  const uitslag = berekenPunten(ronde, vraagVoorScore, inzendingen, spel.vraagStart, spel.teams);

  for (const team of spel.teams) {
    const r = uitslag[team.id];
    if (r) team.score += r.punten;
  }
  spel.laatsteUitslag = uitslag;
  spel.fase = 'reveal';
}

function naVraag(spel) {
  const ronde = huidigeRonde(spel);
  if (!ronde) return;

  if (spel.vraagIndex + 1 < ronde.vragen.length) {
    spel.vraagIndex += 1;
    openVraag(spel);
    return;
  }

  // Ronde is uit.
  const laatsteRonde = spel.rondeIndex + 1 >= rondes.length;
  if (laatsteRonde) {
    spel.fase = 'einde';
    return;
  }
  if (tussenstandNa.includes(ronde.id)) {
    spel.fase = 'tussenstand';
    return;
  }
  spel.rondeIndex += 1;
  spel.vraagIndex = 0;
  spel.fase = 'ronde-intro';
}

// De enige knop die de host echt nodig heeft: "verder".
export function volgende(spel) {
  switch (spel.fase) {
    case 'lobby':
      if (!spel.teams.length) return { fout: 'Er is nog geen enkel team aangesloten.' };
      spel.rondeIndex = 0;
      spel.vraagIndex = 0;
      spel.fase = 'ronde-intro';
      break;
    case 'ronde-intro':
      openVraag(spel);
      break;
    case 'vraag':
      sluitVraag(spel);
      break;
    case 'reveal':
      naVraag(spel);
      break;
    case 'tussenstand':
      spel.rondeIndex += 1;
      spel.vraagIndex = 0;
      spel.fase = spel.rondeIndex >= rondes.length ? 'einde' : 'ronde-intro';
      break;
    default:
      break;
  }
  return { ok: true };
}

// Handig als de host te snel klikt.
export function terug(spel) {
  if (spel.fase === 'reveal') {
    // Punten van deze vraag terugdraaien en de vraag heropenen.
    if (spel.laatsteUitslag) {
      for (const team of spel.teams) {
        const r = spel.laatsteUitslag[team.id];
        if (r) team.score -= r.punten;
      }
    }
    spel.laatsteUitslag = null;
    spel.vraagOpen = true;
    spel.fase = 'vraag';
    return { ok: true };
  }
  if (spel.fase === 'vraag') {
    spel.fase = 'ronde-intro';
    spel.vraagOpen = false;
    return { ok: true };
  }
  return { fout: 'Hier kan ik niet terug.' };
}

/* ------------------------------------------------------------------ *
 * Wat de schermen te zien krijgen
 * ------------------------------------------------------------------ */

function stand(spel) {
  return [...spel.teams]
    .sort((a, b) => b.score - a.score || a.naam.localeCompare(b.naam))
    .map((t, i) => ({
      plaats: i + 1,
      id: t.id,
      naam: t.naam,
      emoji: t.emoji,
      kleur: t.kleur,
      score: t.score,
      leden: t.leden.map((l) => l.naam),
    }));
}

function vraagVoorScherm(spel, ronde, vraag, toonAntwoord) {
  if (!ronde || !vraag) return null;
  const basis = {
    nummer: spel.vraagIndex + 1,
    totaal: ronde.vragen.length,
    type: ronde.type,
    seconden: ronde.seconden,
  };

  if (ronde.type === 'mc') {
    return { ...basis, tekst: vraag.q, opties: vraag.opties, antwoord: toonAntwoord ? vraag.antwoord : null, weetje: toonAntwoord ? vraag.weetje : null };
  }
  if (ronde.type === 'woord') {
    return { ...basis, woord: vraag.woord, taal: vraag.taal, opties: vraag.opties, antwoord: toonAntwoord ? vraag.antwoord : null, weetje: toonAntwoord ? vraag.weetje : null };
  }
  if (ronde.type === 'truefalse') {
    return { ...basis, tekst: vraag.q, antwoord: toonAntwoord ? vraag.antwoord : null, weetje: toonAntwoord ? vraag.weetje : null };
  }
  if (ronde.type === 'estimate') {
    return { ...basis, tekst: vraag.q, eenheid: vraag.eenheid, antwoord: toonAntwoord ? vraag.antwoord : null, weetje: toonAntwoord ? vraag.weetje : null };
  }
  if (ronde.type === 'geo') {
    return { ...basis, art: getArt(vraag.art), plek: toonAntwoord ? vraag.plek : null, antwoord: toonAntwoord ? vraag.antwoord : null };
  }
  if (ronde.type === 'zoom') {
    const beeld = getArt(vraag.art);
    return { ...basis, art: beeld, focus: beeld?.focus || null, antwoord: toonAntwoord ? vraag.antwoord : null };
  }
  if (IS_OPVOERING(ronde.type)) {
    return { ...basis, antwoord: toonAntwoord ? vraag.q : null };
  }
  // Open vragen en de emoji-ronde.
  return { ...basis, tekst: vraag.q, groot: !!ronde.groot, antwoord: toonAntwoord ? vraag.antwoord : null, weetje: toonAntwoord ? vraag.weetje : null };
}

function uitslagVoorScherm(spel) {
  if (!spel.laatsteUitslag) return null;
  return spel.teams
    .map((t) => {
      const r = spel.laatsteUitslag[t.id];
      if (!r) return null;
      return { id: t.id, naam: t.naam, emoji: t.emoji, kleur: t.kleur, punten: r.punten, goed: r.goed, toelichting: r.toelichting };
    })
    .filter(Boolean)
    .sort((a, b) => b.punten - a.punten);
}

export function hostBeeld(spel) {
  const ronde = huidigeRonde(spel);
  const vraag = huidigeVraag(spel);
  const toon = spel.fase === 'reveal';
  const k = sleutel(spel.rondeIndex, spel.vraagIndex);
  const binnen = Object.keys(spel.antwoorden[k] || {}).length;

  return {
    rol: 'host',
    code: spel.code,
    versie: spel.versie,
    nu: Date.now(), // zodat de schermen hun klok kunnen gelijkzetten

    fase: spel.fase,
    titel: QUIZ_TITEL,
    ronde: ronde ? { id: ronde.id, naam: ronde.naam, uitleg: ronde.uitleg, icoon: ronde.icoon, type: ronde.type, nummer: spel.rondeIndex + 1, totaal: rondes.length } : null,
    vraag: vraagVoorScherm(spel, ronde, vraag, toon),
    vraagStart: spel.vraagStart,
    vraagOpen: spel.vraagOpen,
    antwoordenBinnen: binnen,
    uitbeelder: spel.uitbeelder ? { ...spel.uitbeelder, team: spel.teams.find((t) => t.id === spel.uitbeelder.teamId)?.naam } : null,
    tekening: ronde?.type === 'tekenen' ? spel.tekening || [] : null,
    uitslag: uitslagVoorScherm(spel),
    stand: stand(spel),
  };
}

export function spelerBeeld(spel, spelerId) {
  const team = spel.teams.find((t) => t.leden.some((l) => l.id === spelerId));
  const ronde = huidigeRonde(spel);
  const vraag = huidigeVraag(spel);
  const toon = spel.fase === 'reveal';
  const k = sleutel(spel.rondeIndex, spel.vraagIndex);
  const eigenAntwoord = team ? spel.antwoorden[k]?.[team.id] : null;

  // Is dit het team dat aan de beurt is om uit te beelden of te tekenen?
  const isOpvoering = IS_OPVOERING(ronde?.type);
  const beeldtUit = !!(isOpvoering && spel.uitbeelder && team && spel.uitbeelder.teamId === team.id);
  const isDeUitbeelder = beeldtUit && spel.uitbeelder.spelerId === spelerId;

  // De opdracht gaat naar het hele team dat aan de beurt is: dat team
  // raadt toch niet mee, en zo valt de ronde niet stil als één gsm
  // leeg is. Alle andere telefoons krijgen hem niet te zien.
  const opdracht = beeldtUit && vraag ? vraag.q : null;
  const magTekenen = beeldtUit && ronde?.type === 'tekenen';

  const alleStanden = stand(spel);
  const eigenStand = team ? alleStanden.find((s) => s.id === team.id) : null;

  return {
    rol: 'speler',
    code: spel.code,
    versie: spel.versie,
    nu: Date.now(),

    fase: spel.fase,
    titel: QUIZ_TITEL,
    team: team ? { id: team.id, naam: team.naam, emoji: team.emoji, kleur: team.kleur, score: team.score, plaats: eigenStand?.plaats ?? null } : null,
    teams: spel.teams.map((t) => ({ id: t.id, naam: t.naam, emoji: t.emoji, kleur: t.kleur, aantal: t.leden.length })),
    ronde: ronde ? { id: ronde.id, naam: ronde.naam, uitleg: ronde.uitleg, icoon: ronde.icoon, type: ronde.type } : null,
    vraag: vraagVoorScherm(spel, ronde, vraag, toon),
    vraagStart: spel.vraagStart,
    vraagOpen: spel.vraagOpen,
    antwoord: eigenAntwoord ? { waarde: eigenAntwoord.waarde, vast: !!eigenAntwoord.vast } : null,
    beeldtUit,
    isDeUitbeelder,
    magTekenen,
    opdracht,
    tekening: magTekenen ? spel.tekening || [] : null,
    uitbeelder: spel.uitbeelder ? { naam: spel.uitbeelder.naam, team: spel.teams.find((t) => t.id === spel.uitbeelder.teamId)?.naam } : null,
    resultaat: toon && team && spel.laatsteUitslag?.[team.id] ? spel.laatsteUitslag[team.id] : null,
    stand: alleStanden,
    aantalTeams: spel.teams.length,
  };
}
