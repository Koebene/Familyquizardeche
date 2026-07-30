// Een kleine QR-generator, zodat gasten de quiz kunnen scannen.
//
// Bewust zelf geschreven en niet van een CDN geladen: de quiz moet ook
// werken als het internet ter plaatse tegenvalt, en er hoort geen
// externe dienst mee te kijken met wie er meespeelt.
//
// Ondersteunt byte-modus, versie 1 tot 10, foutcorrectieniveau M.
// Dat is ruim genoeg voor een deelname-URL.

/* ----------------------------- GF(256) ----------------------------- */

const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
(function vulTabellen() {
  let x = 1;
  for (let i = 0; i < 255; i++) {
    EXP[i] = x;
    LOG[x] = i;
    x <<= 1;
    if (x & 0x100) x ^= 0x11d;
  }
  for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
})();

function maal(a, b) {
  if (a === 0 || b === 0) return 0;
  return EXP[LOG[a] + LOG[b]];
}

// De deler waarmee we de foutcorrectiecodes berekenen.
function generator(graad) {
  let poly = [1];
  for (let i = 0; i < graad; i++) {
    const volgende = new Array(poly.length + 1).fill(0);
    for (let j = 0; j < poly.length; j++) {
      volgende[j] ^= poly[j];
      volgende[j + 1] ^= maal(poly[j], EXP[i]);
    }
    poly = volgende;
  }
  return poly;
}

function foutcorrectie(data, aantal) {
  const gen = generator(aantal);
  const rest = new Array(aantal).fill(0);
  for (const byte of data) {
    const factor = byte ^ rest[0];
    rest.shift();
    rest.push(0);
    if (factor !== 0) {
      for (let i = 0; i < aantal; i++) {
        rest[i] ^= maal(gen[i + 1], factor);
      }
    }
  }
  return rest;
}

/* --------------------------- Versietabel --------------------------- */

// Per versie: [foutcorrectiecodes per blok, [aantal blokken, datacodes], ...]
const VERSIES_M = {
  1: [10, [[1, 16]]],
  2: [16, [[1, 28]]],
  3: [26, [[1, 44]]],
  4: [18, [[2, 32]]],
  5: [24, [[2, 43]]],
  6: [16, [[4, 27]]],
  7: [18, [[4, 31]]],
  8: [22, [[2, 38], [2, 39]]],
  9: [22, [[3, 36], [2, 37]]],
  10: [26, [[4, 43], [1, 44]]],
};

const UITLIJNING = {
  1: [], 2: [6, 18], 3: [6, 22], 4: [6, 26], 5: [6, 30],
  6: [6, 34], 7: [6, 22, 38], 8: [6, 24, 42], 9: [6, 26, 46], 10: [6, 28, 50],
};

function dataCapaciteit(versie) {
  const [, groepen] = VERSIES_M[versie];
  return groepen.reduce((som, [blokken, per]) => som + blokken * per, 0);
}

function kiesVersie(aantalBytes) {
  for (let v = 1; v <= 10; v++) {
    const telBits = v <= 9 ? 8 : 16;
    const nodig = 4 + telBits + aantalBytes * 8;
    if (nodig <= dataCapaciteit(v) * 8) return v;
  }
  throw new Error('Tekst te lang voor deze QR-generator.');
}

/* ---------------------------- Bitstroom ---------------------------- */

function maakDatacodes(tekst) {
  const bytes = new TextEncoder().encode(tekst);
  const versie = kiesVersie(bytes.length);
  const telBits = versie <= 9 ? 8 : 16;
  const capaciteit = dataCapaciteit(versie);

  const bits = [];
  const schrijf = (waarde, aantal) => {
    for (let i = aantal - 1; i >= 0; i--) bits.push((waarde >> i) & 1);
  };

  schrijf(0b0100, 4);              // byte-modus
  schrijf(bytes.length, telBits);
  for (const byte of bytes) schrijf(byte, 8);

  // Afsluiter, daarna aanvullen tot een heel aantal bytes.
  const ruimte = capaciteit * 8;
  for (let i = 0; i < 4 && bits.length < ruimte; i++) bits.push(0);
  while (bits.length % 8 !== 0) bits.push(0);

  const codes = [];
  for (let i = 0; i < bits.length; i += 8) {
    let byte = 0;
    for (let j = 0; j < 8; j++) byte = (byte << 1) | bits[i + j];
    codes.push(byte);
  }
  // Opvulbytes die de standaard voorschrijft.
  const opvul = [0xec, 0x11];
  let i = 0;
  while (codes.length < capaciteit) codes.push(opvul[i++ % 2]);

  return { versie, codes };
}

// Data- en foutcorrectieblokken worden om beurt uitgeschreven.
function verweefBlokken(versie, codes) {
  const [ecPerBlok, groepen] = VERSIES_M[versie];
  const dataBlokken = [];
  const ecBlokken = [];

  let positie = 0;
  for (const [aantalBlokken, perBlok] of groepen) {
    for (let b = 0; b < aantalBlokken; b++) {
      const blok = codes.slice(positie, positie + perBlok);
      positie += perBlok;
      dataBlokken.push(blok);
      ecBlokken.push(foutcorrectie(blok, ecPerBlok));
    }
  }

  const resultaat = [];
  const langste = Math.max(...dataBlokken.map((b) => b.length));
  for (let i = 0; i < langste; i++) {
    for (const blok of dataBlokken) if (i < blok.length) resultaat.push(blok[i]);
  }
  for (let i = 0; i < ecPerBlok; i++) {
    for (const blok of ecBlokken) resultaat.push(blok[i]);
  }
  return resultaat;
}

/* --------------------------- Patronen ------------------------------ */

function leegRaster(grootte) {
  return Array.from({ length: grootte }, () => new Array(grootte).fill(null));
}

function zetZoeker(raster, gereserveerd, rij, kol) {
  for (let r = -1; r <= 7; r++) {
    for (let k = -1; k <= 7; k++) {
      const rr = rij + r;
      const kk = kol + k;
      if (rr < 0 || kk < 0 || rr >= raster.length || kk >= raster.length) continue;
      const rand = r === -1 || r === 7 || k === -1 || k === 7;
      const buiten = r < 0 || r > 6 || k < 0 || k > 6;
      const binnenRing = r >= 0 && r <= 6 && k >= 0 && k <= 6 && (r === 0 || r === 6 || k === 0 || k === 6);
      const kern = r >= 2 && r <= 4 && k >= 2 && k <= 4;
      raster[rr][kk] = !buiten && (binnenRing || kern) ? 1 : 0;
      if (rand || !buiten) gereserveerd[rr][kk] = true;
    }
  }
}

function zetUitlijning(raster, gereserveerd, versie) {
  const centra = UITLIJNING[versie];
  const grootte = raster.length;
  for (const r of centra) {
    for (const k of centra) {
      // Niet bovenop de zoekpatronen in de drie hoeken.
      const inHoek =
        (r <= 8 && k <= 8) ||
        (r <= 8 && k >= grootte - 9) ||
        (r >= grootte - 9 && k <= 8);
      if (inHoek) continue;
      for (let dr = -2; dr <= 2; dr++) {
        for (let dk = -2; dk <= 2; dk++) {
          const ring = Math.max(Math.abs(dr), Math.abs(dk));
          raster[r + dr][k + dk] = ring === 1 ? 0 : 1;
          gereserveerd[r + dr][k + dk] = true;
        }
      }
    }
  }
}

function zetTiming(raster, gereserveerd) {
  const grootte = raster.length;
  for (let i = 8; i < grootte - 8; i++) {
    const waarde = i % 2 === 0 ? 1 : 0;
    raster[6][i] = waarde;
    raster[i][6] = waarde;
    gereserveerd[6][i] = true;
    gereserveerd[i][6] = true;
  }
}

function reserveerFormaat(gereserveerd, versie) {
  const grootte = gereserveerd.length;
  for (let i = 0; i < 9; i++) {
    if (i !== 6) {
      gereserveerd[8][i] = true;
      gereserveerd[i][8] = true;
    }
  }
  gereserveerd[8][8] = true;
  for (let i = 0; i < 8; i++) {
    gereserveerd[8][grootte - 1 - i] = true;
    gereserveerd[grootte - 1 - i][8] = true;
  }
  if (versie >= 7) {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 3; j++) {
        gereserveerd[i][grootte - 11 + j] = true;
        gereserveerd[grootte - 11 + j][i] = true;
      }
    }
  }
}

/* ------------------------ Formaat en versie ------------------------ */

export function formaatBits(masker) {
  // Niveau M is 00 in de codering van de standaard.
  let waarde = (0b00 << 3) | masker;
  let rest = waarde << 10;
  for (let i = 14; i >= 10; i--) {
    if ((rest >> i) & 1) rest ^= 0b10100110111 << (i - 10);
  }
  return ((waarde << 10) | rest) ^ 0b101010000010010;
}

export function versieBits(versie) {
  let rest = versie << 12;
  for (let i = 17; i >= 12; i--) {
    if ((rest >> i) & 1) rest ^= 0b1111100100101 << (i - 12);
  }
  return (versie << 12) | rest;
}

function schrijfFormaat(raster, masker) {
  const bits = formaatBits(masker);
  const grootte = raster.length;
  const lees = (i) => (bits >> i) & 1;

  // Eerste kopie: omlaag langs kolom 8, dan naar links langs rij 8.
  for (let i = 0; i <= 5; i++) raster[i][8] = lees(i);
  raster[7][8] = lees(6);
  raster[8][8] = lees(7);
  raster[8][7] = lees(8);
  for (let i = 9; i <= 14; i++) raster[8][14 - i] = lees(i);

  // Tweede kopie: langs rij 8 van rechts, en omhoog langs kolom 8.
  for (let i = 0; i <= 7; i++) raster[8][grootte - 1 - i] = lees(i);
  for (let i = 8; i <= 14; i++) raster[grootte - 15 + i][8] = lees(i);
  raster[grootte - 8][8] = 1; // de vaste donkere module
}

function schrijfVersie(raster, versie) {
  if (versie < 7) return;
  const bits = versieBits(versie);
  const grootte = raster.length;
  for (let i = 0; i < 18; i++) {
    const bit = (bits >> i) & 1;
    const r = Math.floor(i / 3);
    const k = i % 3;
    raster[r][grootte - 11 + k] = bit;
    raster[grootte - 11 + k][r] = bit;
  }
}

/* --------------------------- Data plaatsen ------------------------- */

function plaatsData(raster, gereserveerd, codes) {
  const grootte = raster.length;
  const bits = [];
  for (const byte of codes) {
    for (let i = 7; i >= 0; i--) bits.push((byte >> i) & 1);
  }

  let index = 0;
  let omhoog = true;
  for (let kol = grootte - 1; kol > 0; kol -= 2) {
    if (kol === 6) kol--; // de verticale timingkolom slaan we over
    for (let stap = 0; stap < grootte; stap++) {
      const rij = omhoog ? grootte - 1 - stap : stap;
      for (const k of [kol, kol - 1]) {
        if (gereserveerd[rij][k]) continue;
        raster[rij][k] = index < bits.length ? bits[index] : 0;
        index++;
      }
    }
    omhoog = !omhoog;
  }
}

const MASKERS = [
  (r, k) => (r + k) % 2 === 0,
  (r) => r % 2 === 0,
  (r, k) => k % 3 === 0,
  (r, k) => (r + k) % 3 === 0,
  (r, k) => (Math.floor(r / 2) + Math.floor(k / 3)) % 2 === 0,
  (r, k) => ((r * k) % 2) + ((r * k) % 3) === 0,
  (r, k) => (((r * k) % 2) + ((r * k) % 3)) % 2 === 0,
  (r, k) => (((r + k) % 2) + ((r * k) % 3)) % 2 === 0,
];

/* ------------------------- Masker uitkiezen ------------------------ */

function strafpunten(raster) {
  const n = raster.length;
  let straf = 0;

  // Regel 1: rijtjes van vijf of meer dezelfde modules.
  for (let i = 0; i < n; i++) {
    for (const richting of ['rij', 'kol']) {
      let vorige = -1;
      let reeks = 0;
      for (let j = 0; j < n; j++) {
        const waarde = richting === 'rij' ? raster[i][j] : raster[j][i];
        if (waarde === vorige) {
          reeks++;
        } else {
          if (reeks >= 5) straf += 3 + (reeks - 5);
          vorige = waarde;
          reeks = 1;
        }
      }
      if (reeks >= 5) straf += 3 + (reeks - 5);
    }
  }

  // Regel 2: blokjes van twee bij twee.
  for (let r = 0; r < n - 1; r++) {
    for (let k = 0; k < n - 1; k++) {
      const w = raster[r][k];
      if (w === raster[r][k + 1] && w === raster[r + 1][k] && w === raster[r + 1][k + 1]) straf += 3;
    }
  }

  // Regel 3: patronen die op een zoekpatroon lijken.
  const patroonA = [1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 0];
  const patroonB = [0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1];
  const komtVoor = (lijn, patroon) => {
    for (let i = 0; i + patroon.length <= lijn.length; i++) {
      let gelijk = true;
      for (let j = 0; j < patroon.length; j++) {
        if (lijn[i + j] !== patroon[j]) { gelijk = false; break; }
      }
      if (gelijk) return true;
    }
    return false;
  };
  for (let i = 0; i < n; i++) {
    const rij = raster[i];
    const kol = raster.map((r) => r[i]);
    for (const lijn of [rij, kol]) {
      if (komtVoor(lijn, patroonA)) straf += 40;
      if (komtVoor(lijn, patroonB)) straf += 40;
    }
  }

  // Regel 4: scheve verhouding zwart/wit.
  let donker = 0;
  for (const rij of raster) for (const w of rij) if (w) donker++;
  const percent = (donker * 100) / (n * n);
  straf += Math.floor(Math.abs(percent - 50) / 5) * 10;

  return straf;
}

/* ------------------------------ Publiek ---------------------------- */

export function maakQrMatrix(tekst) {
  const { versie, codes } = maakDatacodes(tekst);
  const verweven = verweefBlokken(versie, codes);
  const grootte = versie * 4 + 17;

  const basis = leegRaster(grootte);
  const gereserveerd = Array.from({ length: grootte }, () => new Array(grootte).fill(false));

  zetZoeker(basis, gereserveerd, 0, 0);
  zetZoeker(basis, gereserveerd, 0, grootte - 7);
  zetZoeker(basis, gereserveerd, grootte - 7, 0);
  zetUitlijning(basis, gereserveerd, versie);
  zetTiming(basis, gereserveerd);
  reserveerFormaat(gereserveerd, versie);
  plaatsData(basis, gereserveerd, verweven);

  let beste = null;
  for (let masker = 0; masker < 8; masker++) {
    const kandidaat = basis.map((rij) => rij.slice());
    for (let r = 0; r < grootte; r++) {
      for (let k = 0; k < grootte; k++) {
        if (!gereserveerd[r][k] && MASKERS[masker](r, k)) kandidaat[r][k] ^= 1;
      }
    }
    schrijfVersie(kandidaat, versie);
    schrijfFormaat(kandidaat, masker);
    const straf = strafpunten(kandidaat);
    if (!beste || straf < beste.straf) beste = { straf, raster: kandidaat };
  }

  return beste.raster;
}

// Tekent de QR als SVG. De witte rand eromheen is verplicht, anders
// vinden telefoons de code niet terug.
export function qrAlsSvg(tekst, { module = 6, rand = 4, kleur = '#12161c', achtergrond = '#ffffff' } = {}) {
  const raster = maakQrMatrix(tekst);
  const n = raster.length;
  const zijde = (n + rand * 2) * module;

  let pad = '';
  for (let r = 0; r < n; r++) {
    for (let k = 0; k < n; k++) {
      if (raster[r][k]) {
        pad += `M${(k + rand) * module} ${(r + rand) * module}h${module}v${module}h-${module}z`;
      }
    }
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${zijde}" height="${zijde}" viewBox="0 0 ${zijde} ${zijde}" shape-rendering="crispEdges" role="img" aria-label="QR-code om deel te nemen">
    <rect width="${zijde}" height="${zijde}" fill="${achtergrond}"/>
    <path d="${pad}" fill="${kleur}"/>
  </svg>`;
}
