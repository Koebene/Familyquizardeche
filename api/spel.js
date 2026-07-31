// Het enige eindpunt van de quiz.
//
// Bewust geschreven met gewone Node-request/response-objecten, zodat
// exact dezelfde code draait op Vercel én in de lokale server.mjs.

import {
  nieuwSpel,
  maakCode,
  maakId,
  voegTeamToe,
  sluitAan,
  neemAntwoord,
  neemTekening,
  volgende,
  terug,
  hostBeeld,
  spelerBeeld,
} from '../lib/engine.js';
import { lees, schrijfNieuw, pasAan, gebruiktRedis, gevondenOpslagVariabelen } from '../lib/store.js';

// Op Vercel draait elke aanvraag mogelijk op een andere machine. Zonder
// Redis lijkt de quiz te starten en valt ze halverwege om, precies
// wanneer de familie al aan tafel zit. Dan liever meteen duidelijk zijn.
const ONGECONFIGUREERD = Boolean(process.env.VERCEL) && !gebruiktRedis;

// De namen van de gevonden variabelen erbij, zodat meteen duidelijk is
// of de koppeling ontbreekt of alleen anders heet dan verwacht.
function opslagFout() {
  const gezien = gevondenOpslagVariabelen();
  return {
    fout:
      'Deze quiz heeft nog geen opslag. Koppel in Vercel onder Storage een Redis ' +
      'en deploy daarna opnieuw — omgevingsvariabelen tellen pas mee na een nieuwe deploy.',
    gevondenVariabelen: gezien.length ? gezien : null,
  };
}

function stuur(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Cache-Control': 'no-store',
  });
  res.end(body);
}

async function leesBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') {
    try { return JSON.parse(req.body); } catch { return {}; }
  }
  const stukken = [];
  for await (const stuk of req) stukken.push(stuk);
  if (!stukken.length) return {};
  try {
    return JSON.parse(Buffer.concat(stukken).toString('utf8'));
  } catch {
    return {};
  }
}

function schoonCode(waarde) {
  return String(waarde || '').trim().toUpperCase().slice(0, 6);
}

export default async function handler(req, res) {
  try {
    if (ONGECONFIGUREERD) return stuur(res, 503, opslagFout());
    if (req.method === 'GET') return await afhandelenGet(req, res);
    if (req.method === 'POST') return await afhandelenPost(req, res);
    return stuur(res, 405, { fout: 'Methode niet toegestaan.' });
  } catch (err) {
    console.error('[quiz]', err);
    return stuur(res, 500, { fout: 'Er ging iets mis op de server.' });
  }
}

/* ------------------------------------------------------------------ *
 * Opvragen
 * ------------------------------------------------------------------ */

async function afhandelenGet(req, res) {
  const url = new URL(req.url, 'http://localhost');
  const code = schoonCode(url.searchParams.get('code'));
  const rol = url.searchParams.get('rol') || 'speler';

  if (!code) return stuur(res, 400, { fout: 'Geen code opgegeven.' });

  const spel = await lees(code);
  if (!spel) return stuur(res, 404, { fout: 'Deze quiz bestaat niet (meer). Klopt de code?' });

  if (rol === 'host') {
    if (url.searchParams.get('hostToken') !== spel.hostToken) {
      return stuur(res, 403, { fout: 'Dit scherm is niet de quizmaster.' });
    }
    return stuur(res, 200, hostBeeld(spel));
  }

  return stuur(res, 200, spelerBeeld(spel, url.searchParams.get('spelerId') || ''));
}

/* ------------------------------------------------------------------ *
 * Aanpassen
 * ------------------------------------------------------------------ */

async function afhandelenPost(req, res) {
  const body = await leesBody(req);
  const actie = body.actie;
  const code = schoonCode(body.code);

  if (actie === 'nieuw') {
    for (let poging = 0; poging < 8; poging++) {
      const nieuweCode = maakCode();
      const spel = nieuwSpel(nieuweCode);
      spel.hostToken = maakId();
      if (await schrijfNieuw(nieuweCode, spel)) {
        return stuur(res, 200, { code: nieuweCode, hostToken: spel.hostToken });
      }
    }
    return stuur(res, 503, { fout: 'Kon geen vrije quizcode vinden. Probeer opnieuw.' });
  }

  if (!code) return stuur(res, 400, { fout: 'Geen code opgegeven.' });

  /* ---- een team aanmaken en er meteen bij gaan ---- */
  if (actie === 'nieuwTeam') {
    const spelerId = String(body.spelerId || '').slice(0, 40) || maakId();
    const uitkomst = await pasAan(code, (spel) => {
      if (spel.fase !== 'lobby') return { fout: 'De quiz is al bezig. Sluit aan bij een bestaand team.' };
      const gemaakt = voegTeamToe(spel, body.naam);
      if (gemaakt.fout) return gemaakt;
      return sluitAan(spel, gemaakt.team.id, spelerId, body.spelerNaam);
    });
    if (uitkomst.fout) return stuur(res, 400, uitkomst);
    return stuur(res, 200, { ok: true, spelerId, beeld: spelerBeeld(uitkomst.spel, spelerId) });
  }

  /* ---- bij een bestaand team gaan ---- */
  if (actie === 'join') {
    const spelerId = String(body.spelerId || '').slice(0, 40) || maakId();
    const uitkomst = await pasAan(code, (spel) => sluitAan(spel, body.teamId, spelerId, body.spelerNaam));
    if (uitkomst.fout) return stuur(res, 400, uitkomst);
    return stuur(res, 200, { ok: true, spelerId, beeld: spelerBeeld(uitkomst.spel, spelerId) });
  }

  /* ---- een antwoord insturen ---- */
  if (actie === 'antwoord') {
    const spelerId = String(body.spelerId || '').slice(0, 40);
    const uitkomst = await pasAan(code, (spel) => {
      const team = spel.teams.find((t) => t.leden.some((l) => l.id === spelerId));
      if (!team) return { fout: 'Je zit nog in geen enkel team.' };
      return neemAntwoord(spel, team.id, body.waarde);
    });
    if (uitkomst.fout) return stuur(res, 400, uitkomst);
    return stuur(res, 200, { ok: true, beeld: spelerBeeld(uitkomst.spel, spelerId) });
  }

  /* ---- nieuwe lijnen van de tekenaar ---- */
  if (actie === 'tekenen') {
    const spelerId = String(body.spelerId || '').slice(0, 40);
    const uitkomst = await pasAan(code, (spel) => neemTekening(spel, spelerId, body.strepen, body.wissen));
    if (uitkomst.fout) return stuur(res, 400, uitkomst);
    return stuur(res, 200, { ok: true });
  }

  /* ---- knoppen van de quizmaster ---- */
  if (actie === 'host') {
    const uitkomst = await pasAan(code, (spel) => {
      if (body.hostToken !== spel.hostToken) return { fout: 'Dit scherm is niet de quizmaster.' };
      if (body.commando === 'volgende') return volgende(spel);
      if (body.commando === 'terug') return terug(spel);
      return { fout: 'Onbekend commando.' };
    });
    if (uitkomst.fout) return stuur(res, 400, uitkomst);
    return stuur(res, 200, { ok: true, beeld: hostBeeld(uitkomst.spel) });
  }

  return stuur(res, 400, { fout: 'Onbekende actie.' });
}
