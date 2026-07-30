// Alle beelden voor de quiz zijn hier in code getekend.
// Geen externe foto's: niets kan offline vallen, niets moet je zelf zoeken.
//
// Elk item levert { viewBox, svg }. Voor de zoomronde staat er ook een
// `focus` bij: het kadertje waarop we starten voor we uitzoomen.

const SCENE = '0 0 400 300';

/* ------------------------------------------------------------------ *
 * Herbruikbare stukjes
 * ------------------------------------------------------------------ */

function sky(top, bottom) {
  return `<defs><linearGradient id="lucht" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="${top}"/><stop offset="1" stop-color="${bottom}"/>
  </linearGradient></defs>
  <rect width="400" height="300" fill="url(#lucht)"/>`;
}

function sun(x, y, r, fill = '#ffe08a') {
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" opacity=".85"/>`;
}

function cloud(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="#ffffff" opacity=".75">
    <ellipse cx="0" cy="0" rx="26" ry="12"/>
    <ellipse cx="18" cy="4" rx="20" ry="10"/>
    <ellipse cx="-18" cy="4" rx="18" ry="9"/>
  </g>`;
}

/* ------------------------------------------------------------------ *
 * GeoGuessr-ronde: herkenbare plekken
 * ------------------------------------------------------------------ */

const atomium = {
  viewBox: SCENE,
  svg: `
    ${sky('#4a90d9', '#bfe0f5')}
    ${cloud(70, 55, 0.9)}${cloud(320, 80, 0.7)}
    <rect y="235" width="400" height="65" fill="#5c9a52"/>
    <rect y="235" width="400" height="8" fill="#4a8442"/>
    <g stroke="#9fb2bd" stroke-width="7" stroke-linecap="round">
      <line x1="200" y1="45" x2="125" y2="95"/>
      <line x1="200" y1="45" x2="275" y2="95"/>
      <line x1="200" y1="45" x2="200" y2="130"/>
      <line x1="125" y1="95" x2="125" y2="180"/>
      <line x1="275" y1="95" x2="275" y2="180"/>
      <line x1="200" y1="130" x2="200" y2="215"/>
      <line x1="125" y1="180" x2="200" y2="230"/>
      <line x1="275" y1="180" x2="200" y2="230"/>
      <line x1="200" y1="215" x2="200" y2="230"/>
      <line x1="125" y1="95" x2="200" y2="130"/>
      <line x1="275" y1="95" x2="200" y2="130"/>
      <line x1="125" y1="180" x2="200" y2="215"/>
      <line x1="275" y1="180" x2="200" y2="215"/>
      <line x1="200" y1="45" x2="200" y2="230"/>
    </g>
    <g>
      <circle cx="200" cy="45" r="22" fill="#d7dee3"/>
      <circle cx="125" cy="95" r="22" fill="#c3ccd3"/>
      <circle cx="275" cy="95" r="22" fill="#e2e8ec"/>
      <circle cx="200" cy="130" r="22" fill="#d0d8de"/>
      <circle cx="125" cy="180" r="22" fill="#c3ccd3"/>
      <circle cx="275" cy="180" r="22" fill="#e2e8ec"/>
      <circle cx="200" cy="215" r="22" fill="#d0d8de"/>
      <circle cx="200" cy="230" r="20" fill="#c8d1d7"/>
      <circle cx="200" cy="137" r="24" fill="#dfe6ea"/>
    </g>
    <g fill="#ffffff" opacity=".55">
      <ellipse cx="193" cy="38" rx="7" ry="5"/>
      <ellipse cx="118" cy="88" rx="7" ry="5"/>
      <ellipse cx="268" cy="88" rx="7" ry="5"/>
      <ellipse cx="193" cy="130" rx="7" ry="5"/>
      <ellipse cx="118" cy="173" rx="7" ry="5"/>
      <ellipse cx="268" cy="173" rx="7" ry="5"/>
    </g>`,
};

const eiffel = {
  viewBox: SCENE,
  svg: `
    ${sky('#f2a65a', '#ffe3c2')}
    ${sun(320, 70, 30, '#ffd18a')}
    <rect y="245" width="400" height="55" fill="#7d8b6a"/>
    <g fill="#6b4f3a">
      <path d="M200 30 l6 0 3 40 -12 0 z"/>
      <path d="M191 70 h18 l6 55 h-30 z"/>
      <path d="M185 125 h30 l10 65 h-50 z"/>
      <path d="M175 190 h50 l22 62 h-94 z"/>
      <path d="M153 252 h94 v8 h-94 z"/>
    </g>
    <g fill="none" stroke="#5b4230" stroke-width="4">
      <path d="M178 252 q22 -38 22 -70"/>
      <path d="M222 252 q-22 -38 -22 -70"/>
      <path d="M162 252 q30 -46 38 -100"/>
      <path d="M238 252 q-30 -46 -38 -100"/>
    </g>
    <g fill="#5b4230">
      <rect x="170" y="186" width="60" height="7"/>
      <rect x="182" y="121" width="36" height="6"/>
      <rect x="188" y="66" width="24" height="5"/>
    </g>
    <g stroke="#6b4f3a" stroke-width="2" opacity=".8">
      <line x1="180" y1="196" x2="220" y2="245"/>
      <line x1="220" y1="196" x2="180" y2="245"/>
      <line x1="188" y1="131" x2="212" y2="182"/>
      <line x1="212" y1="131" x2="188" y2="182"/>
    </g>
    <circle cx="200" cy="26" r="4" fill="#fff3c4"/>`,
};

const colosseum = {
  viewBox: SCENE,
  svg: `
    ${sky('#5fa8e0', '#d9edfb')}
    ${cloud(80, 50, 0.8)}${cloud(310, 65, 0.6)}
    <rect y="238" width="400" height="62" fill="#b7a888"/>
    <rect y="238" width="400" height="7" fill="#a2946f"/>
    <g fill="#d9c9a3" stroke="#b9a67d" stroke-width="2">
      <path d="M70 238 V110 q0 -22 40 -32 q90 -22 180 0 q40 10 40 32 V238 Z"/>
    </g>
    <path d="M70 110 q0 -22 40 -32 q90 -22 180 0 q40 10 40 32 q-130 -20 -260 0 Z" fill="#c9b58a"/>
    <g fill="#8d7a55">
      <rect x="82" y="120" width="18" height="30" rx="9"/>
      <rect x="112" y="112" width="18" height="30" rx="9"/>
      <rect x="142" y="107" width="18" height="30" rx="9"/>
      <rect x="172" y="104" width="18" height="30" rx="9"/>
      <rect x="202" y="104" width="18" height="30" rx="9"/>
      <rect x="232" y="107" width="18" height="30" rx="9"/>
      <rect x="262" y="112" width="18" height="30" rx="9"/>
      <rect x="292" y="120" width="18" height="30" rx="9"/>
      <rect x="82" y="163" width="18" height="30" rx="9"/>
      <rect x="112" y="160" width="18" height="30" rx="9"/>
      <rect x="142" y="158" width="18" height="30" rx="9"/>
      <rect x="172" y="157" width="18" height="30" rx="9"/>
      <rect x="202" y="157" width="18" height="30" rx="9"/>
      <rect x="232" y="158" width="18" height="30" rx="9"/>
      <rect x="262" y="160" width="18" height="30" rx="9"/>
      <rect x="292" y="163" width="18" height="30" rx="9"/>
      <rect x="82" y="205" width="18" height="33" rx="9"/>
      <rect x="112" y="205" width="18" height="33" rx="9"/>
      <rect x="142" y="205" width="18" height="33" rx="9"/>
      <rect x="172" y="205" width="18" height="33" rx="9"/>
      <rect x="202" y="205" width="18" height="33" rx="9"/>
      <rect x="232" y="205" width="18" height="33" rx="9"/>
      <rect x="262" y="205" width="18" height="33" rx="9"/>
      <rect x="292" y="205" width="18" height="33" rx="9"/>
    </g>
    <path d="M232 100 q30 -14 62 -2 q26 10 26 30 V238 h-88 Z" fill="#cbb896"/>
    <path d="M240 238 V104 q40 -14 80 4 V238 Z" fill="#e4d6b4" opacity=".55"/>
    <g stroke="#b9a67d" stroke-width="3" fill="none">
      <line x1="70" y1="152" x2="330" y2="152"/>
      <line x1="70" y1="197" x2="330" y2="197"/>
    </g>
    <path d="M70 110 q60 -30 130 -30 q70 0 130 30" fill="none" stroke="#b9a67d" stroke-width="3"/>
    <g fill="#8f7f5c" opacity=".5">
      <ellipse cx="40" cy="250" rx="26" ry="6"/>
      <ellipse cx="360" cy="256" rx="30" ry="7"/>
    </g>`,
};

const bigben = {
  viewBox: SCENE,
  svg: `
    ${sky('#6f7f96', '#c8d4e2')}
    ${cloud(95, 48, 0.9)}${cloud(305, 70, 0.7)}
    <rect y="252" width="400" height="48" fill="#4d5b6b"/>
    <rect x="0" y="230" width="400" height="24" fill="#7b6a5c"/>
    <g fill="#c9a878">
      <rect x="168" y="120" width="64" height="132"/>
      <rect x="162" y="112" width="76" height="14" rx="3"/>
      <rect x="164" y="96" width="72" height="18" rx="3"/>
    </g>
    <path d="M170 96 L200 34 L230 96 Z" fill="#8fa08a"/>
    <path d="M186 60 L200 34 L214 60 Z" fill="#a4b59e"/>
    <rect x="197" y="18" width="6" height="18" fill="#8fa08a"/>
    <circle cx="200" cy="16" r="5" fill="#ffe08a"/>
    <circle cx="200" cy="150" r="26" fill="#f5efdf" stroke="#9c7f54" stroke-width="4"/>
    <g stroke="#5a4a30" stroke-width="3" stroke-linecap="round">
      <line x1="200" y1="150" x2="200" y2="133"/>
      <line x1="200" y1="150" x2="213" y2="157"/>
    </g>
    <g fill="#5a4a30">
      <circle cx="200" cy="129" r="1.8"/><circle cx="221" cy="150" r="1.8"/>
      <circle cx="200" cy="171" r="1.8"/><circle cx="179" cy="150" r="1.8"/>
    </g>
    <g fill="#a8895f">
      <rect x="176" y="188" width="10" height="24" rx="5"/>
      <rect x="195" y="188" width="10" height="24" rx="5"/>
      <rect x="214" y="188" width="10" height="24" rx="5"/>
      <rect x="176" y="220" width="10" height="24" rx="5"/>
      <rect x="195" y="220" width="10" height="24" rx="5"/>
      <rect x="214" y="220" width="10" height="24" rx="5"/>
    </g>
    <g fill="#b09270">
      <rect x="60" y="196" width="90" height="56"/>
      <rect x="250" y="204" width="80" height="48"/>
    </g>
    <g fill="#8a7154">
      <rect x="70" y="210" width="9" height="20" rx="4"/><rect x="88" y="210" width="9" height="20" rx="4"/>
      <rect x="106" y="210" width="9" height="20" rx="4"/><rect x="124" y="210" width="9" height="20" rx="4"/>
      <rect x="262" y="218" width="9" height="18" rx="4"/><rect x="280" y="218" width="9" height="18" rx="4"/>
      <rect x="298" y="218" width="9" height="18" rx="4"/>
    </g>
    <path d="M0 252 q100 12 200 0 q100 -12 200 0 V300 H0 Z" fill="#3f4c5b"/>`,
};

const nederland = {
  viewBox: SCENE,
  svg: `
    ${sky('#7cb6e8', '#dff0fb')}
    ${cloud(90, 45, 1)}${cloud(300, 62, 0.8)}
    <rect y="200" width="400" height="100" fill="#7fb069"/>
    <rect y="200" width="400" height="6" fill="#6a9857"/>
    <path d="M0 236 h400 v10 H0 Z" fill="#5fa8d3" opacity=".55"/>
    <g transform="translate(230 96)">
      <path d="M-26 104 L-14 0 h28 L26 104 Z" fill="#8a6a4f"/>
      <path d="M-30 104 h60 v8 h-60 z" fill="#6f543d"/>
      <path d="M-18 8 q18 -18 36 0 z" fill="#5c4432"/>
      <circle cx="0" cy="6" r="7" fill="#5c4432"/>
      <g stroke="#e8e2d4" stroke-width="4" fill="#d8d0bd">
        <g transform="rotate(20)">
          <rect x="-3" y="-72" width="6" height="66"/><rect x="-3" y="6" width="6" height="66"/>
          <rect x="-72" y="-3" width="66" height="6"/><rect x="6" y="-3" width="66" height="6"/>
        </g>
      </g>
      <g fill="#f3efe4" opacity=".8" transform="rotate(20)">
        <rect x="-13" y="-70" width="10" height="60"/><rect x="3" y="10" width="10" height="60"/>
        <rect x="-70" y="3" width="60" height="10"/><rect x="10" y="-13" width="60" height="10"/>
      </g>
      <rect x="-9" y="52" width="18" height="26" fill="#5c4432"/>
    </g>
    <g transform="translate(96 150) scale(.55)">
      <path d="M-26 104 L-14 0 h28 L26 104 Z" fill="#96775b"/>
      <path d="M-30 104 h60 v8 h-60 z" fill="#7b5f47"/>
      <circle cx="0" cy="6" r="7" fill="#68503b"/>
      <g stroke="#e8e2d4" stroke-width="6" fill="#d8d0bd" transform="rotate(-15)">
        <rect x="-4" y="-72" width="8" height="66"/><rect x="-4" y="6" width="8" height="66"/>
        <rect x="-72" y="-4" width="66" height="8"/><rect x="6" y="-4" width="66" height="8"/>
      </g>
    </g>
    <g>
      <g fill="#e04a4a">
        <ellipse cx="40" cy="256" rx="9" ry="12"/><ellipse cx="78" cy="264" rx="9" ry="12"/>
        <ellipse cx="116" cy="256" rx="9" ry="12"/><ellipse cx="154" cy="266" rx="9" ry="12"/>
      </g>
      <g fill="#f2b134">
        <ellipse cx="196" cy="258" rx="9" ry="12"/><ellipse cx="234" cy="268" rx="9" ry="12"/>
        <ellipse cx="272" cy="258" rx="9" ry="12"/>
      </g>
      <g fill="#d94f8a">
        <ellipse cx="312" cy="266" rx="9" ry="12"/><ellipse cx="352" cy="256" rx="9" ry="12"/>
        <ellipse cx="386" cy="268" rx="9" ry="12"/>
      </g>
      <g stroke="#4f8f3f" stroke-width="3" stroke-linecap="round">
        <line x1="40" y1="268" x2="40" y2="292"/><line x1="78" y1="276" x2="78" y2="298"/>
        <line x1="116" y1="268" x2="116" y2="292"/><line x1="154" y1="278" x2="154" y2="300"/>
        <line x1="196" y1="270" x2="196" y2="294"/><line x1="234" y1="280" x2="234" y2="300"/>
        <line x1="272" y1="270" x2="272" y2="294"/><line x1="312" y1="278" x2="312" y2="300"/>
        <line x1="352" y1="268" x2="352" y2="292"/><line x1="386" y1="280" x2="386" y2="300"/>
      </g>
    </g>`,
};

const egypte = {
  viewBox: SCENE,
  svg: `
    ${sky('#f6b25c', '#ffe6b8')}
    ${sun(78, 66, 34, '#ffd782')}
    <rect y="215" width="400" height="85" fill="#e8c98d"/>
    <path d="M0 215 q100 -18 200 0 q100 18 200 0 V240 H0 Z" fill="#dcb974"/>
    <path d="M200 60 L296 218 H104 Z" fill="#d8b169"/>
    <path d="M200 60 L296 218 H200 Z" fill="#c39a55"/>
    <path d="M96 122 L162 218 H30 Z" fill="#dbb772"/>
    <path d="M96 122 L162 218 H96 Z" fill="#c8a25c"/>
    <path d="M330 140 L386 218 H274 Z" fill="#dbb772"/>
    <path d="M330 140 L386 218 H330 Z" fill="#c8a25c"/>
    <g transform="translate(238 196)">
      <path d="M0 34 q34 -6 60 0 v14 h-60 z" fill="#c9a065"/>
      <path d="M-6 34 q6 -30 22 -32 q16 -2 20 12 q2 12 -6 20 z" fill="#d4ab70"/>
      <path d="M8 6 q12 -12 24 -2 l4 12 -30 4 z" fill="#c69a5c"/>
      <circle cx="26" cy="12" r="2.4" fill="#6b4d2a"/>
      <path d="M60 34 q10 4 14 14 h-14 z" fill="#bf9257"/>
    </g>
    <g transform="translate(354 176)">
      <rect x="-3" y="0" width="6" height="42" fill="#8a6a3f"/>
      <g fill="#5f8f4a">
        <path d="M0 2 q-26 -8 -34 6 q20 -2 34 4 z"/>
        <path d="M0 2 q26 -8 34 6 q-20 -2 -34 4 z"/>
        <path d="M0 0 q-14 -22 -30 -22 q14 8 26 24 z"/>
        <path d="M0 0 q14 -22 30 -22 q-14 8 -26 24 z"/>
      </g>
    </g>
    <g fill="#c9a86e" opacity=".7">
      <ellipse cx="60" cy="264" rx="40" ry="7"/>
      <ellipse cx="300" cy="278" rx="52" ry="8"/>
    </g>`,
};

const newyork = {
  viewBox: SCENE,
  svg: `
    ${sky('#8fb8dd', '#e6f2fb')}
    ${cloud(300, 50, 0.8)}
    <rect y="238" width="400" height="62" fill="#4f86ab"/>
    <g stroke="#6fa3c4" stroke-width="3" opacity=".6">
      <line x1="20" y1="256" x2="90" y2="256"/><line x1="140" y1="270" x2="210" y2="270"/>
      <line x1="280" y1="252" x2="360" y2="252"/><line x1="60" y1="284" x2="150" y2="284"/>
      <line x1="250" y1="288" x2="340" y2="288"/>
    </g>
    <g fill="#9fb8b0" opacity=".55">
      <rect x="20" y="182" width="26" height="58"/><rect x="52" y="200" width="20" height="40"/>
      <rect x="330" y="190" width="24" height="50"/><rect x="358" y="206" width="18" height="34"/>
    </g>
    <g fill="#8a7f6a">
      <path d="M156 238 h88 v-22 h-88 z"/>
      <path d="M164 216 h72 v-26 h-72 z"/>
      <path d="M176 190 h48 v-14 h-48 z"/>
    </g>
    <g fill="#79b3a2">
      <path d="M186 176 q0 -34 14 -46 q14 12 14 46 z"/>
      <path d="M182 176 q6 -16 18 -18 q12 2 18 18 z"/>
      <path d="M198 130 q-3 -22 2 -34 q5 12 2 34 z"/>
      <path d="M196 96 q4 -8 8 0 q-4 4 -8 0 z"/>
      <circle cx="200" cy="88" r="9"/>
      <path d="M191 84 l-9 -9 3 12 z"/><path d="M209 84 l9 -9 -3 12 z"/>
      <path d="M194 80 l-3 -13 6 12 z"/><path d="M206 80 l3 -13 -6 12 z"/>
      <path d="M200 78 l0 -14 2 13 z"/>
      <path d="M188 100 q-10 -6 -14 -22 l6 -2 q4 14 12 18 z"/>
      <path d="M213 96 q10 -12 12 -34 l6 2 q-2 24 -12 36 z"/>
    </g>
    <g fill="#f5c948">
      <path d="M226 58 q6 -10 12 0 q-6 6 -12 0 z"/>
      <path d="M232 56 q0 -16 6 -22 q6 6 6 22 z" fill="#ffd85e"/>
      <circle cx="238" cy="34" r="7" fill="#fff0b0"/>
    </g>
    <rect x="228" y="60" width="14" height="8" rx="2" fill="#5f9384"/>
    <path d="M0 238 h400 v6 H0 Z" fill="#3f6f8f"/>`,
};

const santorini = {
  viewBox: SCENE,
  svg: `
    ${sky('#4aa3dd', '#cfeafb')}
    ${sun(340, 54, 26, '#fff0b8')}
    <rect y="196" width="400" height="104" fill="#2f7fbf"/>
    <g stroke="#69b0dd" stroke-width="3" opacity=".55">
      <line x1="20" y1="220" x2="110" y2="220"/><line x1="160" y1="238" x2="250" y2="238"/>
      <line x1="290" y1="214" x2="380" y2="214"/><line x1="60" y1="262" x2="170" y2="262"/>
      <line x1="230" y1="278" x2="340" y2="278"/>
    </g>
    <path d="M0 196 q60 -22 130 -14 q90 10 130 -6 q70 -16 140 4 V300 H0 Z" fill="#e3d9c9"/>
    <path d="M0 210 q60 -18 130 -10 q90 10 130 -4 q70 -14 140 6 V300 H0 Z" fill="#efe7d9"/>
    <g fill="#ffffff" stroke="#ded3bf" stroke-width="1.5">
      <rect x="34" y="150" width="52" height="46" rx="3"/>
      <rect x="96" y="164" width="40" height="32" rx="3"/>
      <rect x="150" y="140" width="60" height="52" rx="3"/>
      <rect x="222" y="158" width="46" height="38" rx="3"/>
      <rect x="284" y="146" width="56" height="50" rx="3"/>
      <rect x="70" y="216" width="46" height="34" rx="3"/>
      <rect x="196" y="228" width="52" height="38" rx="3"/>
      <rect x="300" y="222" width="44" height="32" rx="3"/>
    </g>
    <g fill="#2a6fb0">
      <path d="M40 150 q20 -26 40 0 z"/>
      <path d="M156 140 q24 -30 48 0 z"/>
      <path d="M290 146 q23 -28 44 0 z"/>
      <path d="M202 228 q20 -24 40 0 z"/>
      <path d="M76 216 q17 -20 34 0 z"/>
    </g>
    <g fill="#1f5d97">
      <rect x="58" y="118" width="4" height="8"/><rect x="178" y="106" width="4" height="8"/>
      <rect x="310" y="114" width="4" height="8"/>
    </g>
    <g fill="#2a6fb0" opacity=".9">
      <rect x="44" y="166" width="10" height="14" rx="2"/><rect x="66" y="166" width="10" height="14" rx="2"/>
      <rect x="162" y="158" width="12" height="16" rx="2"/><rect x="186" y="158" width="12" height="16" rx="2"/>
      <rect x="296" y="164" width="11" height="15" rx="2"/><rect x="318" y="164" width="11" height="15" rx="2"/>
      <rect x="208" y="242" width="11" height="14" rx="2"/><rect x="228" y="242" width="11" height="14" rx="2"/>
    </g>
    <g fill="#e8b0c0">
      <ellipse cx="130" cy="206" rx="14" ry="8"/><ellipse cx="264" cy="212" rx="16" ry="9"/>
      <ellipse cx="30" cy="232" rx="12" ry="7"/>
    </g>`,
};

/* ------------------------------------------------------------------ *
 * Zoomronde: alledaagse voorwerpen
 * ------------------------------------------------------------------ */

const frietjes = {
  viewBox: SCENE,
  focus: { x: 196, y: 108, w: 46, h: 35 },
  svg: `
    <rect width="400" height="300" fill="#f4ece0"/>
    <circle cx="200" cy="160" r="130" fill="#eadfcd" opacity=".7"/>
    <path d="M150 118 L250 118 L226 282 L174 282 Z" fill="#f7f3ea" stroke="#ded2be" stroke-width="3"/>
    <path d="M200 118 L250 118 L226 282 L200 282 Z" fill="#ebe3d4" opacity=".6"/>
    <g fill="#f0b93f" stroke="#d69b26" stroke-width="2" stroke-linejoin="round">
      <rect x="160" y="52" width="15" height="76" rx="3" transform="rotate(-14 167 90)"/>
      <rect x="184" y="38" width="15" height="90" rx="3" transform="rotate(-5 191 83)"/>
      <rect x="206" y="44" width="15" height="84" rx="3" transform="rotate(7 213 86)"/>
      <rect x="228" y="60" width="15" height="70" rx="3" transform="rotate(16 235 95)"/>
      <rect x="172" y="72" width="14" height="58" rx="3" transform="rotate(-22 179 101)"/>
      <rect x="216" y="76" width="14" height="56" rx="3" transform="rotate(24 223 104)"/>
    </g>
    <g fill="#f8cf6a" opacity=".8">
      <rect x="186" y="46" width="5" height="78" rx="2" transform="rotate(-5 188 85)"/>
      <rect x="208" y="52" width="5" height="70" rx="2" transform="rotate(7 210 87)"/>
    </g>
    <ellipse cx="200" cy="128" rx="46" ry="12" fill="#f6f1e6" opacity=".55"/>
    <path d="M176 96 q14 -22 30 -6 q14 14 -2 22 q-20 8 -28 -16 z" fill="#fdfaf0" stroke="#e9e0cb" stroke-width="2"/>
    <g stroke="#e0d3ba" stroke-width="2" opacity=".6">
      <line x1="158" y1="150" x2="240" y2="150"/>
      <line x1="163" y1="186" x2="235" y2="186"/>
      <line x1="168" y1="222" x2="230" y2="222"/>
    </g>`,
};

const voetbal = {
  viewBox: SCENE,
  focus: { x: 182, y: 128, w: 42, h: 32 },
  svg: `
    <rect width="400" height="300" fill="#6fae5a"/>
    <g stroke="#7cbb66" stroke-width="16" opacity=".5">
      <line x1="0" y1="30" x2="400" y2="30"/><line x1="0" y1="94" x2="400" y2="94"/>
      <line x1="0" y1="158" x2="400" y2="158"/><line x1="0" y1="222" x2="400" y2="222"/>
      <line x1="0" y1="286" x2="400" y2="286"/>
    </g>
    <ellipse cx="200" cy="252" rx="76" ry="12" fill="#3f6b34" opacity=".35"/>
    <circle cx="200" cy="150" r="96" fill="#fbfbf8" stroke="#d8d8d0" stroke-width="3"/>
    <g fill="#22262b">
      <path d="M200 108 l34 25 -13 40 h-42 l-13 -40 z"/>
      <path d="M200 54 l24 18 -10 26 -28 0 -10 -26 z" opacity=".92"/>
      <path d="M112 132 l28 -22 20 26 -14 30 -30 -8 z" opacity=".92"/>
      <path d="M288 132 l-28 -22 -20 26 14 30 30 -8 z" opacity=".92"/>
      <path d="M148 228 l16 -30 34 12 4 32 -30 10 z" opacity=".92"/>
      <path d="M252 228 l-16 -30 -34 12 -4 32 30 10 z" opacity=".92"/>
    </g>
    <g stroke="#22262b" stroke-width="3" fill="none" opacity=".7">
      <line x1="200" y1="98" x2="200" y2="72"/>
      <line x1="166" y1="133" x2="142" y2="122"/>
      <line x1="234" y1="133" x2="258" y2="122"/>
      <line x1="179" y1="173" x2="168" y2="200"/>
      <line x1="221" y1="173" x2="232" y2="200"/>
    </g>
    <ellipse cx="168" cy="112" rx="26" ry="16" fill="#ffffff" opacity=".5" transform="rotate(-30 168 112)"/>`,
};

const fiets = {
  viewBox: SCENE,
  focus: { x: 100, y: 176, w: 44, h: 33 },
  svg: `
    <rect width="400" height="300" fill="#eef2f4"/>
    <rect y="246" width="400" height="54" fill="#d9dfe3"/>
    <g stroke="#2f3a42" stroke-width="9" fill="none">
      <circle cx="110" cy="196" r="58"/>
      <circle cx="290" cy="196" r="58"/>
    </g>
    <g stroke="#9aa7b0" stroke-width="2.5" opacity=".9">
      <line x1="110" y1="140" x2="110" y2="252"/><line x1="54" y1="196" x2="166" y2="196"/>
      <line x1="70" y1="156" x2="150" y2="236"/><line x1="150" y1="156" x2="70" y2="236"/>
      <line x1="290" y1="140" x2="290" y2="252"/><line x1="234" y1="196" x2="346" y2="196"/>
      <line x1="250" y1="156" x2="330" y2="236"/><line x1="330" y1="156" x2="250" y2="236"/>
    </g>
    <circle cx="110" cy="196" r="9" fill="#5a666f"/>
    <circle cx="290" cy="196" r="9" fill="#5a666f"/>
    <g stroke="#c9433a" stroke-width="10" stroke-linecap="round" fill="none">
      <line x1="110" y1="196" x2="196" y2="196"/>
      <line x1="196" y1="196" x2="164" y2="112"/>
      <line x1="110" y1="196" x2="164" y2="112"/>
      <line x1="196" y1="196" x2="250" y2="120"/>
      <line x1="164" y1="112" x2="250" y2="120"/>
      <line x1="250" y1="120" x2="290" y2="196"/>
    </g>
    <g stroke="#2f3a42" stroke-width="8" stroke-linecap="round" fill="none">
      <line x1="252" y1="118" x2="262" y2="76"/>
      <path d="M262 78 q-22 -10 -34 -2"/>
      <path d="M262 78 q20 -8 30 2"/>
    </g>
    <path d="M144 100 q22 -12 42 0 q-10 10 -42 0 z" fill="#2f3a42"/>
    <g stroke="#3d4a53" stroke-width="5" fill="none">
      <circle cx="196" cy="196" r="20"/>
      <line x1="196" y1="196" x2="212" y2="216"/>
      <line x1="196" y1="196" x2="180" y2="176"/>
    </g>
    <g fill="#2f3a42">
      <rect x="206" y="214" width="16" height="7" rx="3"/>
      <rect x="170" y="171" width="16" height="7" rx="3"/>
    </g>
    <ellipse cx="200" cy="262" rx="150" ry="10" fill="#c2cad0" opacity=".6"/>`,
};

const ijsje = {
  viewBox: SCENE,
  focus: { x: 178, y: 92, w: 44, h: 33 },
  svg: `
    <rect width="400" height="300" fill="#ffeef2"/>
    <circle cx="200" cy="140" r="120" fill="#ffe3ea" opacity=".8"/>
    <path d="M162 168 L238 168 L200 288 Z" fill="#e0a763" stroke="#c78d4c" stroke-width="3"/>
    <g stroke="#c78d4c" stroke-width="2.5" opacity=".8">
      <line x1="172" y1="184" x2="228" y2="184"/><line x1="180" y1="208" x2="220" y2="208"/>
      <line x1="187" y1="232" x2="213" y2="232"/><line x1="193" y1="256" x2="207" y2="256"/>
      <line x1="176" y1="176" x2="212" y2="272"/><line x1="224" y1="176" x2="188" y2="272"/>
    </g>
    <ellipse cx="200" cy="164" rx="46" ry="16" fill="#f7d9a8"/>
    <circle cx="200" cy="132" r="44" fill="#fff0f4" stroke="#f3d3dc" stroke-width="2"/>
    <circle cx="178" cy="96" r="36" fill="#f9a8c0" stroke="#eb8fab" stroke-width="2"/>
    <circle cx="220" cy="88" r="32" fill="#a8d8b9" stroke="#8dc4a2" stroke-width="2"/>
    <g fill="#ffffff" opacity=".55">
      <ellipse cx="166" cy="84" rx="12" ry="8" transform="rotate(-25 166 84)"/>
      <ellipse cx="211" cy="76" rx="10" ry="7" transform="rotate(-25 211 76)"/>
      <ellipse cx="184" cy="120" rx="12" ry="8" transform="rotate(-25 184 120)"/>
    </g>
    <path d="M240 76 q10 -16 20 -4 q-6 12 -20 4 z" fill="#c0392b"/>
    <path d="M244 70 q6 -14 2 -22" stroke="#5c8a3a" stroke-width="3" fill="none"/>
    <g fill="#ff9ab5">
      <circle cx="150" cy="122" r="3"/><circle cx="238" cy="112" r="3"/><circle cx="196" cy="60" r="3"/>
    </g>
    <g fill="#f7c6d4">
      <circle cx="72" cy="70" r="9"/><circle cx="330" cy="96" r="12"/><circle cx="94" cy="228" r="7"/>
    </g>`,
};

const paraplu = {
  viewBox: SCENE,
  focus: { x: 190, y: 106, w: 44, h: 33 },
  svg: `
    <rect width="400" height="300" fill="#dfe7ee"/>
    <g stroke="#b6c4d1" stroke-width="3" stroke-linecap="round" opacity=".85">
      <line x1="40" y1="20" x2="28" y2="56"/><line x1="96" y1="8" x2="84" y2="44"/>
      <line x1="150" y1="26" x2="138" y2="62"/><line x1="300" y1="14" x2="288" y2="50"/>
      <line x1="356" y1="30" x2="344" y2="66"/><line x1="60" y1="120" x2="48" y2="156"/>
      <line x1="340" y1="130" x2="328" y2="166"/><line x1="30" y1="210" x2="18" y2="246"/>
      <line x1="372" y1="200" x2="360" y2="236"/><line x1="86" y1="248" x2="74" y2="284"/>
      <line x1="318" y1="252" x2="306" y2="288"/>
    </g>
    <path d="M92 152 q108 -118 216 0 q-54 -26 -108 -26 q-54 0 -108 26 z" fill="#d64550"/>
    <path d="M200 126 q-54 0 -108 26 q26 -104 108 -110 z" fill="#e8636d"/>
    <path d="M200 126 q54 0 108 26 q-26 -104 -108 -110 z" fill="#bf3944"/>
    <g fill="none" stroke="#9c2c36" stroke-width="2.5">
      <path d="M200 42 v84"/><path d="M146 50 q-6 60 -20 90"/><path d="M254 50 q6 60 20 90"/>
    </g>
    <path d="M92 152 q28 24 54 0 q28 24 54 0 q28 24 54 0 q28 24 54 0" fill="none" stroke="#9c2c36" stroke-width="4"/>
    <rect x="196" y="30" width="8" height="18" rx="4" fill="#6b7580"/>
    <rect x="196" y="146" width="9" height="106" fill="#8a949f"/>
    <path d="M196 252 q6 34 34 30 q22 -4 20 -24" fill="none" stroke="#8a949f" stroke-width="9" stroke-linecap="round"/>
    <g fill="#4d90c4" opacity=".6">
      <ellipse cx="120" cy="272" rx="34" ry="6"/><ellipse cx="290" cy="278" rx="40" ry="7"/>
    </g>`,
};

const gitaar = {
  viewBox: SCENE,
  focus: { x: 178, y: 188, w: 44, h: 33 },
  svg: `
    <rect width="400" height="300" fill="#2c2f36"/>
    <circle cx="200" cy="150" r="140" fill="#363a43" opacity=".7"/>
    <rect x="184" y="14" width="32" height="132" rx="4" fill="#5a3d28"/>
    <path d="M180 14 h40 q10 0 10 10 v22 q0 10 -10 10 h-40 q-10 0 -10 -10 v-22 q0 -10 10 -10 z" fill="#4a3120"/>
    <g fill="#cfd4da">
      <rect x="166" y="22" width="12" height="5" rx="2.5"/><rect x="166" y="34" width="12" height="5" rx="2.5"/>
      <rect x="166" y="46" width="12" height="5" rx="2.5"/><rect x="222" y="22" width="12" height="5" rx="2.5"/>
      <rect x="222" y="34" width="12" height="5" rx="2.5"/><rect x="222" y="46" width="12" height="5" rx="2.5"/>
    </g>
    <g fill="#8e99a4">
      <rect x="186" y="64" width="28" height="3"/><rect x="186" y="84" width="28" height="3"/>
      <rect x="186" y="104" width="28" height="3"/><rect x="186" y="124" width="28" height="3"/>
    </g>
    <path d="M200 146 q-62 0 -68 44 q-4 30 16 42 q-22 16 -18 46 q6 40 70 40 q64 0 70 -40 q4 -30 -18 -46 q20 -12 16 -42 q-6 -44 -68 -44 z" fill="#b5763c"/>
    <path d="M200 146 q-62 0 -68 44 q-4 30 16 42 q-22 16 -18 46 q6 40 70 40 z" fill="#c98a4c"/>
    <path d="M200 146 q-62 0 -68 44 q-4 30 16 42 q-22 16 -18 46 q6 40 70 40 q64 0 70 -40 q4 -30 -18 -46 q20 -12 16 -42 q-6 -44 -68 -44 z" fill="none" stroke="#7d4f24" stroke-width="4"/>
    <circle cx="200" cy="200" r="30" fill="#2a1c10"/>
    <circle cx="200" cy="200" r="34" fill="none" stroke="#8a5a2c" stroke-width="4"/>
    <rect x="176" y="252" width="48" height="12" rx="3" fill="#4a3120"/>
    <g stroke="#e6e9ec" stroke-width="1.6">
      <line x1="190" y1="56" x2="188" y2="258"/><line x1="195" y1="56" x2="194" y2="258"/>
      <line x1="200" y1="56" x2="200" y2="258"/><line x1="205" y1="56" x2="206" y2="258"/>
      <line x1="210" y1="56" x2="212" y2="258"/>
    </g>
    <ellipse cx="150" cy="180" rx="18" ry="34" fill="#ffffff" opacity=".07" transform="rotate(-20 150 180)"/>`,
};

/* ------------------------------------------------------------------ *
 * Export
 * ------------------------------------------------------------------ */

export const art = {
  atomium,
  eiffel,
  colosseum,
  bigben,
  nederland,
  egypte,
  newyork,
  santorini,
  frietjes,
  voetbal,
  fiets,
  ijsje,
  paraplu,
  gitaar,
};

export function getArt(key) {
  return art[key] || null;
}
