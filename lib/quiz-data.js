// De volledige quiz. Alles wat je wil aanpassen, pas je hier aan.
//
// Wil je een vraag weg? Verwijder het object. Wil je er een bij? Kopieer
// een buur en pas hem aan. De rest van de app past zich vanzelf aan.
//
// Bij open vragen is `antwoord` wat op het scherm verschijnt, en `accept`
// de lijst met alternatieven die ook goed gerekend worden. Kleine
// typfouten worden sowieso vergeven, dus je hoeft niet elke variant te
// bedenken.
//
// De foto's staan in public/fotos/ met hun herkomst in bronnen.json.

export const QUIZ_TITEL = 'De Grote Familiequiz';

export const rondes = [
  /* ---------------------------------------------------------------- */
  {
    id: 'meerkeuze',
    type: 'mc',
    naam: 'Ronde 1 — Door de vakjes',
    uitleg: 'Zes domeinen, vier antwoorden per vraag.',
    regels: ['Tik A, B, C of D op je gsm', '100 punten, plus tot 50 als je snel bent', 'Wijzigen mag tot de vraag sluit'],
    icoon: '🎲',
    seconden: 25,
    vragen: [
      {
        domein: 'Aardrijkskunde',
        q: 'Welk land telt de meeste tijdzones?',
        opties: ['Rusland', 'Verenigde Staten', 'Frankrijk', 'China'],
        antwoord: 2,
        weetje: 'Frankrijk komt aan twaalf, dankzij eilanden en gebieden over de hele wereld. Rusland blijft op elf steken.',
      },
      {
        domein: 'Aardrijkskunde',
        q: 'Door hoeveel landen stroomt de Donau?',
        opties: ['Vier', 'Zes', 'Tien', 'Veertien'],
        antwoord: 2,
        weetje: 'Tien — meer dan eender welke andere rivier ter wereld.',
      },
      {
        domein: 'Geschiedenis',
        q: 'Hoe lang duurde de Honderdjarige Oorlog?',
        opties: ['99 jaar', '100 jaar', '116 jaar', '72 jaar'],
        antwoord: 2,
        weetje: 'Van 1337 tot 1453. Wie hem geteld heeft, was duidelijk niet van de precieze soort.',
      },
      {
        domein: 'Geschiedenis',
        q: 'België had ooit het wereldrecord "langst zonder regering". Hoeveel dagen?',
        opties: ['289 dagen', '376 dagen', '541 dagen', '652 dagen'],
        antwoord: 2,
        weetje: '541 dagen, van 2010 tot 2011. Het land bleef gewoon draaien, wat sommigen tot nadenken stemde.',
      },
      {
        domein: 'Wetenschap',
        q: 'Welke planeet draait als enige de andere kant op rond zijn as?',
        opties: ['Mars', 'Venus', 'Neptunus', 'Saturnus'],
        antwoord: 1,
        weetje: 'Op Venus komt de zon in het westen op. Een dag duurt er ook langer dan een jaar.',
      },
      {
        domein: 'Wetenschap',
        q: 'Welk dier draagt het langst van alle landdieren?',
        opties: ['De olifant', 'De giraf', 'De neushoorn', 'Het nijlpaard'],
        antwoord: 0,
        weetje: 'Bijna 22 maanden. Een olifantenkalf weegt bij de geboorte al zo’n honderd kilo.',
      },
      {
        domein: 'Kunst',
        q: 'Wie schreef "De Leeuw van Vlaanderen"?',
        opties: ['Guido Gezelle', 'Hendrik Conscience', 'Louis Paul Boon', 'Willem Elsschot'],
        antwoord: 1,
        weetje: 'Conscience werd "de man die zijn volk leerde lezen" genoemd.',
      },
      {
        domein: 'Kunst',
        q: 'Welk boek is na de Bijbel het meest vertaalde ter wereld?',
        opties: ['Don Quichot', 'De kleine prins', 'Pinokkio', 'Alice in Wonderland'],
        antwoord: 1,
        weetje: 'De kleine prins bestaat in meer dan vijfhonderd talen en dialecten.',
      },
      {
        domein: 'Amusement',
        q: 'Welke film won als eerste niet-Engelstalige de Oscar voor beste film?',
        opties: ['Roma', 'Parasite', 'Amour', 'Life Is Beautiful'],
        antwoord: 1,
        weetje: 'Parasite, in 2020. De film won er die avond vier.',
      },
      {
        domein: 'Amusement',
        q: 'In welke tekenfilmreeks woont het hoofdpersonage in een ananas op de zeebodem?',
        opties: ['Finding Nemo', 'SpongeBob', 'Octonauts', 'De Kleine Zeemeermin'],
        antwoord: 1,
        weetje: 'De bedenker van SpongeBob was zeebioloog voor hij tekenaar werd.',
      },
      {
        domein: 'Sport',
        q: 'Bij welke sport hoort de techniek "Fosbury flop"?',
        opties: ['Hoogspringen', 'Turnen', 'Schoonspringen', 'Polsstokspringen'],
        antwoord: 0,
        weetje: 'Dick Fosbury sprong in 1968 achterwaarts over de lat en won goud. Iedereen lachte — tot ze het nadeden.',
      },
      {
        domein: 'Sport',
        q: 'Hoeveel spelers van één ploeg staan er bij volleybal op het veld?',
        opties: ['Vijf', 'Zes', 'Zeven', 'Acht'],
        antwoord: 1,
        weetje: 'Zes, en ze draaien na elk gewonnen opslagpunt een plaats door.',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'waarnietwaar',
    type: 'truefalse',
    naam: 'Ronde 2 — Waar of niet waar',
    uitleg: 'Tien stellingen, twee knoppen.',
    regels: ['Waar of niet waar — meer keuze is er niet', '60 punten per juiste stelling', 'Gokken mag, niemand die het ziet'],
    icoon: '🤔',
    seconden: 18,
    vragen: [
      { q: 'Een octopus heeft drie harten en blauw bloed.', antwoord: true, weetje: 'Twee harten pompen naar de kieuwen, één naar de rest. Het blauw komt van koper in plaats van ijzer.' },
      { q: 'Napoleon was opvallend klein voor zijn tijd.', antwoord: false, weetje: 'Hij was ongeveer 1,68 m — doodgewoon toen. De mythe komt van Britse spotprenten.' },
      { q: 'Er zijn meer mogelijke schaakpartijen dan atomen in het heelal.', antwoord: true, weetje: 'Al na tien zetten loopt het aantal mogelijke stellingen in de miljarden miljarden.' },
      { q: 'De Eiffeltoren is in de zomer iets hoger dan in de winter.', antwoord: true, weetje: 'Het ijzer zet uit door de warmte: goed voor een centimeter of vijftien.' },
      { q: 'Een goudvis heeft een geheugen van drie seconden.', antwoord: false, weetje: 'Ze onthouden dingen maandenlang en zijn zelfs te trainen.' },
      { q: 'Honing kan duizenden jaren bewaard worden zonder te bederven.', antwoord: true, weetje: 'In Egyptische graven is honing gevonden die nog eetbaar was.' },
      { q: 'Bananen zijn radioactief.', antwoord: true, weetje: 'Door het kalium. Zo licht dat je er tienduizenden zou moeten eten voor het iets uitmaakt.' },
      { q: 'De Grote Muur van China is met het blote oog zichtbaar vanaf de maan.', antwoord: false, weetje: 'Zelfs vanuit een gewone ruimtebaan is hij nauwelijks te onderscheiden.' },
      { q: 'België heeft meer dan tweeduizend soorten bier.', antwoord: true, weetje: 'De schattingen lopen boven de vijftienhonderd, en er komen er nog bij.' },
      { q: 'Een slak kan drie jaar aan één stuk slapen.', antwoord: true, weetje: 'Bij droogte kruipen ze in hun huisje en wachten ze rustig af.' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'cryptisch',
    type: 'open',
    naam: 'Ronde 3 — Wie ben ik?',
    uitleg: 'Een cryptische omschrijving van iemand die iedereen kent.',
    regels: ['Tik de naam in op je gsm', 'Typfouten worden vergeven, de achternaam volstaat', '120 punten, plus tot 60 voor snelheid'],
    icoon: '🕵️',
    seconden: 35,
    vragen: [
      {
        q: 'Deze wielrenner uit Meensel-Kiezegem kreeg de bijnaam De Kannibaal en won vijf keer de Ronde van Frankrijk.',
        antwoord: 'Eddy Merckx',
        accept: ['merckx', 'eddy merckx'],
      },
      {
        q: 'Deze acteur uit Berchem doet zijn spagaat tussen twee vrachtwagens en heet the Muscles from Brussels.',
        antwoord: 'Jean-Claude Van Damme',
        accept: ['van damme', 'jean claude van damme', 'jcvd', 'jean-claude van damme'],
      },
      {
        q: 'Deze natuurkundige werkte op een patentbureau toen hij bedacht dat tijd langzamer gaat als je snel genoeg beweegt.',
        antwoord: 'Albert Einstein',
        accept: ['einstein', 'albert einstein'],
      },
      {
        q: 'Deze Belgische tekenaar stuurde een reporter met een kuifje naar de maan, vijftien jaar vóór Armstrong er stond.',
        antwoord: 'Hergé',
        accept: ['herge', 'hergé', 'georges remi'],
      },
      {
        q: 'Deze Brusselse zanger bezong het vlakke land en weigerde ooit nog te zingen toen hij op zijn hoogtepunt stond.',
        antwoord: 'Jacques Brel',
        accept: ['brel', 'jacques brel'],
      },
      {
        q: 'Deze Zuid-Afrikaan zat 27 jaar vast, werd daarna president, en nodigde zijn eigen cipier uit op de inhuldiging.',
        antwoord: 'Nelson Mandela',
        accept: ['mandela', 'nelson mandela'],
      },
      {
        q: 'Deze Vlaamse tv-maker begon met een pratende hond en bouwde er een pretpark bij.',
        antwoord: 'Gert Verhulst',
        accept: ['gert verhulst', 'verhulst', 'gert'],
      },
      {
        q: 'Deze Poolse wetenschapster won als eerste mens twee Nobelprijzen, in twee verschillende vakgebieden.',
        antwoord: 'Marie Curie',
        accept: ['marie curie', 'curie', 'maria sklodowska'],
      },
      {
        q: 'Deze Argentijn werd wereldkampioen in 2022 en droeg daarvoor jarenlang nummer 10 bij Barcelona.',
        antwoord: 'Lionel Messi',
        accept: ['messi', 'lionel messi', 'leo messi'],
      },
      {
        q: 'Deze Amerikaanse zangeres nam haar eigen albums opnieuw op om ze terug te krijgen van haar platenfirma.',
        antwoord: 'Taylor Swift',
        accept: ['taylor swift', 'swift', 'taylor'],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'geo',
    type: 'geo',
    naam: 'Ronde 4 — Waar ter wereld?',
    uitleg: 'Je ziet een foto van een plek ergens ter wereld.',
    regels: ['Tik in in welk land die foto genomen is', 'De landsnaam volstaat, geen stad', '120 punten, plus tot 60 voor snelheid'],
    icoon: '🌍',
    seconden: 30,
    vragen: [
      { foto: 'atomium', plek: 'Het Atomium in Brussel', antwoord: 'België', accept: ['belgie', 'belgië', 'belgium', 'belgique'] },
      { foto: 'eiffel', plek: 'De Eiffeltoren in Parijs', antwoord: 'Frankrijk', accept: ['frankrijk', 'france', 'frankijk'] },
      { foto: 'colosseum', plek: 'Het Colosseum in Rome', antwoord: 'Italië', accept: ['italie', 'italië', 'italy', 'italia'] },
      { foto: 'bigben', plek: 'De Elizabeth Tower — Big Ben — in Londen', antwoord: 'Verenigd Koninkrijk', accept: ['engeland', 'verenigd koninkrijk', 'uk', 'groot-brittannie', 'groot brittannie', 'groot-brittannië', 'england', 'britain'] },
      { foto: 'kinderdijk', plek: 'De molens van Kinderdijk', antwoord: 'Nederland', accept: ['nederland', 'holland', 'the netherlands', 'netherlands'] },
      { foto: 'gizeh', plek: 'De sfinx en de piramides van Gizeh', antwoord: 'Egypte', accept: ['egypte', 'egypt', 'egipte'] },
      { foto: 'vrijheidsbeeld', plek: 'Het Vrijheidsbeeld in New York', antwoord: 'Verenigde Staten', accept: ['amerika', 'verenigde staten', 'vs', 'usa', 'us', 'america', 'de verenigde staten'] },
      { foto: 'santorini', plek: 'Oia op Santorini', antwoord: 'Griekenland', accept: ['griekenland', 'greece', 'grieken'] },
      { foto: 'sagrada', plek: 'De Sagrada Família in Barcelona', antwoord: 'Spanje', accept: ['spanje', 'spain', 'espana', 'españa'] },
      { foto: 'christus', plek: 'Christus de Verlosser boven Rio de Janeiro', antwoord: 'Brazilië', accept: ['brazilie', 'brazilië', 'brazil', 'brasil'] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'woorden',
    type: 'woord',
    naam: 'Ronde 5 — Wat betekent dat?',
    uitleg: 'Een woord uit een vreemde taal, in letters die we kunnen lezen.',
    regels: ['Kies uit vier betekenissen', 'Gewoon durven gokken loont', '100 punten, plus tot 50 voor snelheid'],
    icoon: '🗣️',
    seconden: 25,
    vragen: [
      { woord: 'thálassa', taal: 'Grieks', opties: ['Berg', 'Zee', 'Hemel', 'Bos'], antwoord: 1, weetje: 'Je hoort het terug in "thalassotherapie": een kuur met zeewater.' },
      { woord: 'mariposa', taal: 'Spaans', opties: ['Vlinder', 'Meisje', 'Bloem', 'Spiegel'], antwoord: 0, weetje: 'In Italië heet ze farfalla — vandaar de vlinderpasta.' },
      { woord: 'fragola', taal: 'Italiaans', opties: ['Aardbei', 'Vork', 'Lente', 'Geluk'], antwoord: 0, weetje: 'Van het Latijnse fragrum, dat naar de geur verwijst.' },
      { woord: 'hanabi', taal: 'Japans', opties: ['Bloem', 'Vuurwerk', 'Regen', 'Brug'], antwoord: 1, weetje: 'Letterlijk "vuurbloem": hana is bloem, bi is vuur.' },
      { woord: 'sobaka', taal: 'Russisch', opties: ['Hond', 'Laars', 'Suiker', 'Winter'], antwoord: 0, weetje: 'Russen noemen het apenstaartje in een e-mailadres ook sobaka: hondje.' },
      { woord: 'psomí', taal: 'Grieks', opties: ['Kaas', 'Brood', 'Vis', 'Zout'], antwoord: 1, weetje: 'Het woord dat elke Griekse bakker op zijn deur heeft staan.' },
      { woord: 'almohada', taal: 'Spaans', opties: ['Kast', 'Kussen', 'Handdoek', 'Trap'], antwoord: 1, weetje: 'Een van de vele Spaanse woorden die uit het Arabisch komen.' },
      { woord: 'tartaruga', taal: 'Italiaans', opties: ['Taart', 'Schildpad', 'Donderdag', 'Trompet'], antwoord: 1, weetje: 'Je hoort het terug in het Engelse tortoise en het Franse tortue.' },
      { woord: 'komorebi', taal: 'Japans', opties: ['Ochtendmist', 'Zonlicht door bladeren', 'Verre donder', 'Eerste sneeuw'], antwoord: 1, weetje: 'Het Japans heeft een apart woord voor het licht dat door de bomen valt.' },
      { woord: 'solntse', taal: 'Russisch', opties: ['Maan', 'Sneeuw', 'Zon', 'Soldaat'], antwoord: 2, weetje: 'Verwant aan ons "solair" en het Latijnse sol.' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'schatten',
    type: 'estimate',
    naam: 'Ronde 6 — Hoeveel denk je?',
    uitleg: 'Niemand weet dit exact. Het gaat om zo dicht mogelijk.',
    regels: ['Tik een getal in op je gsm', 'Dichtste bij wint: 120, dan 90, 70, 50', 'Iedereen die meedoet scoort iets'],
    icoon: '📏',
    seconden: 30,
    vragen: [
      { q: 'Hoeveel inwoners telt België ongeveer?', antwoord: 11800000, eenheid: 'inwoners', weetje: 'Ongeveer 11,8 miljoen, en dat aantal groeit nog licht.' },
      { q: 'Hoeveel keer klopt een mensenhart per dag, ruw geschat?', antwoord: 100000, eenheid: 'keer', weetje: 'Zo’n honderdduizend keer per dag, ruim 2,5 miljard in een mensenleven.' },
      { q: 'Hoeveel botten heeft een volwassen mens?', antwoord: 206, eenheid: 'botten', weetje: 'Een baby heeft er ongeveer 300; een deel groeit later samen.' },
      { q: 'Hoe lang is de Belgische kustlijn?', antwoord: 67, eenheid: 'kilometer', weetje: 'Amper 67 kilometer, van De Panne tot Knokke-Heist.' },
      { q: 'Hoeveel treden telt de Eiffeltoren tot de tweede verdieping?', antwoord: 674, eenheid: 'treden', weetje: '674 treden. Daarboven mag je verplicht de lift nemen.' },
      { q: 'Hoeveel liter water gaat er in een gemiddeld bad?', antwoord: 150, eenheid: 'liter', weetje: 'Ongeveer 150 liter — een douche van vijf minuten gebruikt er zo’n 60.' },
      { q: 'In welk jaar werd de eerste sms verstuurd?', antwoord: 1992, eenheid: '', weetje: 'In 1992, en het bericht luidde "Merry Christmas".' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'emoji',
    type: 'open',
    naam: 'Ronde 7 — Emoji-films',
    uitleg: 'Welke film wordt hier uitgebeeld in emoji’s?',
    regels: ['Tik de filmtitel in', 'Nederlands of Engels, allebei goed', '120 punten, plus tot 60 voor snelheid'],
    icoon: '🍿',
    seconden: 25,
    groot: true,
    vragen: [
      { q: '🦁👑', antwoord: 'The Lion King', accept: ['lion king', 'the lion king', 'de leeuwenkoning', 'leeuwenkoning'] },
      { q: '🚢🧊💔', antwoord: 'Titanic', accept: ['titanic'] },
      { q: '❄️👸⛄', antwoord: 'Frozen', accept: ['frozen', 'la reine des neiges'] },
      { q: '🧙‍♂️⚡🤓', antwoord: 'Harry Potter', accept: ['harry potter', 'harry'] },
      { q: '🦖🏝️', antwoord: 'Jurassic Park', accept: ['jurassic park', 'jurassic world', 'jurassic'] },
      { q: '🎈🏠👴', antwoord: 'Up', accept: ['up'] },
      { q: '👽🚲🌕', antwoord: 'E.T.', accept: ['et', 'e t', 'e.t.', 'the extra terrestrial'] },
      { q: '🐼🥋', antwoord: 'Kung Fu Panda', accept: ['kung fu panda', 'kungfu panda', 'panda'] },
      { q: '🤖❤️🌱', antwoord: 'WALL·E', accept: ['wall e', 'walle', 'wall-e'] },
      { q: '🕶️💊🐇', antwoord: 'The Matrix', accept: ['matrix', 'the matrix'] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'zoom',
    type: 'zoom',
    naam: 'Ronde 8 — Uitzoomen',
    uitleg: 'De foto begint sterk ingezoomd en gaat traag open.',
    regels: ['Blijf raden tot je het juist hebt — fout kost niets', 'Wie eerst raadt: 150, dan 110, 85, 65', 'Een juist antwoord staat meteen vast'],
    icoon: '🔍',
    seconden: 30,
    vragen: [
      { foto: 'frieten', antwoord: 'Een pak frieten', accept: ['friet', 'frieten', 'frietjes', 'patat', 'pak frieten', 'frituur', 'frietzak'] },
      { foto: 'voetbal', antwoord: 'Een voetbal', accept: ['voetbal', 'bal', 'football'] },
      { foto: 'ijsje', antwoord: 'Een ijsje', accept: ['ijsje', 'ijs', 'hoorntje', 'ijshoorntje', 'roomijs', 'gelato'] },
      { foto: 'fiets', antwoord: 'Een fiets', accept: ['fiets', 'velo', 'vélo', 'bicycle'] },
      { foto: 'paraplu', antwoord: 'Een paraplu', accept: ['paraplu', 'regenscherm', 'parasol'] },
      { foto: 'gitaar', antwoord: 'Een gitaar', accept: ['gitaar', 'guitar'] },
      { foto: 'zonnebloem', antwoord: 'Een zonnebloem', accept: ['zonnebloem', 'bloem', 'sunflower'] },
      { foto: 'schaakstuk', antwoord: 'Een schaakspel', accept: ['schaken', 'schaakspel', 'schaakbord', 'schaakstuk', 'schaakstukken', 'chess'] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'tekenen',
    type: 'tekenen',
    naam: 'Ronde 9 — Tekenen maar',
    uitleg: 'Eén team tekent op zijn gsm, de tekening verschijnt live op het groot scherm.',
    regels: ['Geen letters of cijfers tekenen', 'Raders krijgen 150, 110 en 80', 'De tekenaar krijgt 60 per team dat het raadt'],
    icoon: '🎨',
    seconden: 90,
    vragen: [
      { q: 'Een kat die op een stofzuiger rijdt', sleutelwoorden: [['kat', 'poes'], ['stofzuiger']] },
      { q: 'Een sneeuwman op het strand', sleutelwoorden: [['sneeuwman', 'sneeuwpop'], ['strand', 'zee', 'zand']] },
      { q: 'Een gsm die in het toilet valt', sleutelwoorden: [['gsm', 'telefoon', 'smartphone', 'iphone'], ['toilet', 'wc', 'pot']] },
      { q: 'Een giraf met een sjaal', sleutelwoorden: [['giraf'], ['sjaal']] },
      { q: 'Een barbecue die in brand staat', sleutelwoorden: [['barbecue', 'bbq'], ['brand', 'vuur', 'vlammen']] },
      { q: 'Een astronaut die frietjes eet', sleutelwoorden: [['astronaut', 'ruimtevaarder'], ['friet']] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'uitbeelden',
    type: 'charades',
    naam: 'Ronde 10 — Uitbeelden',
    uitleg: 'Eén speler krijgt de opdracht op zijn gsm en beeldt uit.',
    regels: ['Niet praten, niet wijzen naar dingen in de kamer', 'Raders krijgen 150, 110 en 80', 'De uitbeelder krijgt 60 per team dat het raadt'],
    icoon: '🎭',
    seconden: 75,
    vragen: [
      { q: 'Een pinguïn die over het ijs waggelt', sleutelwoorden: [['pinguin']] },
      { q: 'Frietjes bakken in de frituur', sleutelwoorden: [['friet']] },
      { q: 'Een selfie nemen die maar niet lukt', sleutelwoorden: [['selfie', 'foto']] },
      { q: 'Een penalty missen', sleutelwoorden: [['penalty', 'strafschop', 'elfmeter']] },
      { q: 'Een spin ontdekken in de badkamer', sleutelwoorden: [['spin']] },
      { q: 'Een koffer inpakken die niet meer dicht gaat', sleutelwoorden: [['koffer', 'valies']] },
      { q: 'Een ijsje dat op de grond valt', sleutelwoorden: [['ijsje', 'ijs', 'ijsco', 'hoorntje']] },
      { q: 'Iemand die in de verkeerde lift stapt', sleutelwoorden: [['lift']] },
    ],
  },
];

// Na welke rondes tonen we een tussenstand op het groot scherm.
// Na elke ronde, behalve de laatste — daar volgt de eindstand.
export const tussenstandNa = rondes.slice(0, -1).map((r) => r.id);

export function rondeOpIndex(i) {
  return rondes[i] || null;
}

export function aantalRondes() {
  return rondes.length;
}
