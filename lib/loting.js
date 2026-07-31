// Welke vragen komen er in déze quiz?
//
// De voorraad is groter dan wat één avond aankan. Bij het starten van een
// spel loten we per ronde een selectie, in een vaste verhouding van
// makkelijk, gemiddeld en moeilijk. Zo is elke quiz anders, blijft het
// niveau in balans, en kan je hem meerdere keren spelen zonder dat het
// dezelfde avond wordt.

import { rondes } from './quiz-data.js';

// Twee op de tien vragen mag iedereen aankunnen, zes zijn gewoon te
// doen, en twee mogen echt lastig zijn.
export const VERHOUDING = { makkelijk: 0.2, gemiddeld: 0.6, moeilijk: 0.2 };

const NIVEAUS = ['makkelijk', 'gemiddeld', 'moeilijk'];

function schud(lijst, willekeur = Math.random) {
  const uit = lijst.slice();
  for (let i = uit.length - 1; i > 0; i--) {
    const j = Math.floor(willekeur() * (i + 1));
    [uit[i], uit[j]] = [uit[j], uit[i]];
  }
  return uit;
}

/**
 * Loot de vraagnummers voor één ronde.
 *
 * Zijn er van een niveau te weinig vragen, dan vullen we aan met wat er
 * wél is — een ronde mag nooit korter worden dan bedoeld omdat de
 * voorraad scheef zit.
 */
export function lootRonde(ronde, willekeur = Math.random) {
  const totaal = ronde.vragen.length;
  const gewenst = Math.min(ronde.perSpel || totaal, totaal);

  // Per niveau de beschikbare nummers, geschud.
  const potten = {};
  for (const niveau of NIVEAUS) {
    potten[niveau] = schud(
      ronde.vragen.map((v, i) => ({ v, i })).filter(({ v }) => (v.niveau || 'gemiddeld') === niveau).map(({ i }) => i),
      willekeur
    );
  }

  const gekozen = [];
  for (const niveau of NIVEAUS) {
    const aantal = Math.round(gewenst * VERHOUDING[niveau]);
    gekozen.push(...potten[niveau].splice(0, aantal));
  }

  // Aanvullen als de verhouding niet precies opgaat of een pot leeg was.
  const rest = schud([...potten.gemiddeld, ...potten.makkelijk, ...potten.moeilijk], willekeur);
  while (gekozen.length < gewenst && rest.length) gekozen.push(rest.shift());

  // Binnen de ronde oplopend van makkelijk naar moeilijk: dat voelt
  // natuurlijker dan willekeurig heen en weer springen.
  const zwaarte = { makkelijk: 0, gemiddeld: 1, moeilijk: 2 };
  return gekozen
    .slice(0, gewenst)
    .sort((a, b) => zwaarte[ronde.vragen[a].niveau || 'gemiddeld'] - zwaarte[ronde.vragen[b].niveau || 'gemiddeld']);
}

// De loting voor een hele quiz: per ronde-id een lijst vraagnummers.
export function lootSpel(willekeur = Math.random) {
  const uit = {};
  for (const ronde of rondes) uit[ronde.id] = lootRonde(ronde, willekeur);
  return uit;
}

// Hoeveel vragen zitten er in de voorraad, per niveau?
export function voorraad() {
  return rondes.map((ronde) => {
    const tel = { makkelijk: 0, gemiddeld: 0, moeilijk: 0 };
    for (const v of ronde.vragen) tel[v.niveau || 'gemiddeld']++;
    return { id: ronde.id, naam: ronde.naam, totaal: ronde.vragen.length, perSpel: ronde.perSpel || ronde.vragen.length, ...tel };
  });
}
