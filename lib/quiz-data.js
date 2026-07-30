// De volledige quiz. Alles wat je wil aanpassen, pas je hier aan.
//
// Wil je een vraag weg? Verwijder het object. Wil je er een bij? Kopieer
// een buur en pas hem aan. De rest van de app past zich vanzelf aan.
//
// Bij open vragen is `answer` wat op het scherm verschijnt, en `accept`
// de lijst met alternatieven die ook goed gerekend worden. Kleine
// typfouten worden sowieso vergeven, dus je hoeft niet elke variant te
// bedenken.

export const QUIZ_TITEL = 'De Grote Familiequiz';

export const rondes = [
  /* ---------------------------------------------------------------- */
  {
    id: 'meerkeuze',
    type: 'mc',
    naam: 'Ronde 1 — Van alles wat',
    uitleg: 'Vier antwoorden, eentje klopt. Wie snel is, pakt bonuspunten.',
    icoon: '🎲',
    seconden: 25,
    vragen: [
      {
        q: 'Wat is de hoofdstad van Australië?',
        opties: ['Sydney', 'Melbourne', 'Canberra', 'Perth'],
        antwoord: 2,
        weetje: 'Sydney en Melbourne konden het niet eens worden, dus bouwden ze er een hoofdstad tussenin.',
      },
      {
        q: 'Hoeveel provincies telt België?',
        opties: ['9', '10', '11', '12'],
        antwoord: 1,
        weetje: 'Vijf in Vlaanderen, vijf in Wallonië. Brussel is geen provincie.',
      },
      {
        q: 'Welke planeet staat het dichtst bij de zon?',
        opties: ['Venus', 'Mars', 'Mercurius', 'Aarde'],
        antwoord: 2,
        weetje: 'En toch is Venus de heetste planeet, door zijn dikke dampkring.',
      },
      {
        q: 'Welke rivier stroomt door Luik?',
        opties: ['De Schelde', 'De Maas', 'De Leie', 'De IJzer'],
        antwoord: 1,
        weetje: 'De Maas begint in Frankrijk en eindigt in Nederland.',
      },
      {
        q: 'Wie schilderde de Mona Lisa?',
        opties: ['Michelangelo', 'Rembrandt', 'Picasso', 'Leonardo da Vinci'],
        antwoord: 3,
        weetje: 'Het schilderij is kleiner dan je denkt: ongeveer 77 op 53 centimeter.',
      },
      {
        q: 'Wat eet een reuzenpanda bijna uitsluitend?',
        opties: ['Bamboe', 'Vis', 'Bladeren van de eucalyptus', 'Insecten'],
        antwoord: 0,
        weetje: 'Een panda eet er tot 38 kilo per dag van, want er zit bijna geen voeding in.',
      },
      {
        q: 'Hoeveel kaarten zitten er in een kaartspel zonder jokers?',
        opties: ['48', '52', '54', '56'],
        antwoord: 1,
        weetje: 'Vier kleuren van dertien kaarten. Met jokers erbij zijn het er 54.',
      },
      {
        q: 'Wat is het grootste orgaan van het menselijk lichaam?',
        opties: ['De lever', 'De longen', 'De huid', 'De darmen'],
        antwoord: 2,
        weetje: 'Bij een volwassene gaat het al snel over twee vierkante meter.',
      },
      {
        q: 'In welk land ligt Machu Picchu?',
        opties: ['Mexico', 'Chili', 'Bolivia', 'Peru'],
        antwoord: 3,
        weetje: 'De stad ligt op zo’n 2400 meter hoogte in de Andes.',
      },
      {
        q: 'Hoeveel snaren heeft een klassieke gitaar?',
        opties: ['4', '5', '6', '7'],
        antwoord: 2,
        weetje: 'Een basgitaar heeft er meestal vier.',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'waarnietwaar',
    type: 'truefalse',
    naam: 'Ronde 2 — Waar of niet waar',
    uitleg: 'Tien stellingen, twee knoppen. Gokken mag, niemand die het ziet.',
    icoon: '🤔',
    seconden: 18,
    vragen: [
      { q: 'Een octopus heeft drie harten.', antwoord: true, weetje: 'Twee pompen bloed naar de kieuwen, eentje naar de rest van het lichaam.' },
      { q: 'De Chinese Muur is met het blote oog zichtbaar vanaf de maan.', antwoord: false, weetje: 'Zelfs vanuit een gewone ruimtebaan is hij nauwelijks te zien.' },
      { q: 'Honing kan eeuwenlang bewaard worden zonder te bederven.', antwoord: true, weetje: 'In Egyptische graven is honing gevonden die nog eetbaar was.' },
      { q: 'België heeft drie officiële landstalen.', antwoord: true, weetje: 'Nederlands, Frans en Duits. De Duitstalige gemeenschap telt zo’n 78.000 inwoners.' },
      { q: 'Een struisvogel steekt zijn kop in het zand als hij bang is.', antwoord: false, weetje: 'Hij draait zijn eieren om in het nest. Van ver lijkt dat op een kop in het zand.' },
      { q: 'Vleermuizen zijn blind.', antwoord: false, weetje: 'Ze zien prima, maar in het donker werkt hun echolocatie beter.' },
      { q: 'Spinazie bevat uitzonderlijk veel ijzer.', antwoord: false, weetje: 'Een oude rekenfout die door Popeye wereldberoemd werd.' },
      { q: 'De Eiffeltoren is in de zomer iets hoger dan in de winter.', antwoord: true, weetje: 'Het ijzer zet uit door de warmte, goed voor een centimeter of vijftien.' },
      { q: 'Een goudvis heeft een geheugen van drie seconden.', antwoord: false, weetje: 'Ze onthouden dingen maandenlang en zijn te trainen.' },
      { q: 'Botanisch gezien is een tomaat een fruit.', antwoord: true, weetje: 'Alles met zaden dat uit een bloem groeit, is botanisch fruit.' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'cryptisch',
    type: 'open',
    naam: 'Ronde 3 — Wie ben ik?',
    uitleg: 'Een cryptische omschrijving van iemand die iedereen kent. Tik de naam in.',
    icoon: '🕵️',
    seconden: 35,
    vragen: [
      {
        q: 'Deze wielrenner uit het Brabantse Meensel-Kiezegem kreeg de bijnaam De Kannibaal en won vijf keer de Ronde van Frankrijk.',
        antwoord: 'Eddy Merckx',
        accept: ['merckx', 'eddy merckx'],
      },
      {
        q: 'Deze acteur uit Berchem staat bekend om zijn spagaat tussen twee vrachtwagens en om zijn bijnaam: the Muscles from Brussels.',
        antwoord: 'Jean-Claude Van Damme',
        accept: ['van damme', 'jean claude van damme', 'jcvd', 'jean-claude van damme'],
      },
      {
        q: 'Deze Duitse natuurkundige met de wilde haardos bedacht de beroemdste formule ter wereld: E = mc².',
        antwoord: 'Albert Einstein',
        accept: ['einstein', 'albert einstein'],
      },
      {
        q: 'Deze Belgische tekenaar bedacht een reporter met een kuifje en een wit hondje.',
        antwoord: 'Hergé',
        accept: ['herge', 'hergé', 'georges remi'],
      },
      {
        q: 'Deze Amerikaanse zangeres schrijft liedjes over haar exen, brengt haar albums opnieuw uit als "Taylor’s Version", en haar fans heten Swifties.',
        antwoord: 'Taylor Swift',
        accept: ['taylor swift', 'swift', 'taylor'],
      },
      {
        q: 'Deze Zuid-Afrikaan zat 27 jaar in de gevangenis en werd daarna president van zijn land.',
        antwoord: 'Nelson Mandela',
        accept: ['mandela', 'nelson mandela'],
      },
      {
        q: 'Deze Rode Duivel speelde jarenlang bij Chelsea en Real Madrid, en zijn broer Thorgan droeg ook het shirt van de nationale ploeg.',
        antwoord: 'Eden Hazard',
        accept: ['hazard', 'eden hazard'],
      },
      {
        q: 'Deze Brusselse zanger schreef "Ne me quitte pas" en bezong het vlakke land waar hij vandaan kwam.',
        antwoord: 'Jacques Brel',
        accept: ['brel', 'jacques brel'],
      },
      {
        q: 'Deze Vlaamse tv-maker bedacht Samson, K3 en Plopsaland.',
        antwoord: 'Gert Verhulst',
        accept: ['gert verhulst', 'verhulst', 'gert'],
      },
      {
        q: 'Deze Argentijn won het WK van 2022 en droeg jarenlang het nummer 10 bij Barcelona.',
        antwoord: 'Lionel Messi',
        accept: ['messi', 'lionel messi', 'leo messi'],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'geo',
    type: 'geo',
    naam: 'Ronde 4 — Waar ter wereld?',
    uitleg: 'Je ziet een plek op het scherm. Tik in in welk land je staat.',
    icoon: '🌍',
    seconden: 30,
    vragen: [
      {
        art: 'atomium',
        plek: 'Het Atomium in Brussel',
        antwoord: 'België',
        accept: ['belgie', 'belgië', 'belgium', 'belgique'],
      },
      {
        art: 'eiffel',
        plek: 'De Eiffeltoren in Parijs',
        antwoord: 'Frankrijk',
        accept: ['frankrijk', 'france', 'frankijk'],
      },
      {
        art: 'colosseum',
        plek: 'Het Colosseum in Rome',
        antwoord: 'Italië',
        accept: ['italie', 'italië', 'italy', 'italia'],
      },
      {
        art: 'bigben',
        plek: 'Big Ben in Londen',
        antwoord: 'Verenigd Koninkrijk',
        accept: ['engeland', 'verenigd koninkrijk', 'uk', 'groot-brittannie', 'groot brittannie', 'groot-brittannië', 'england', 'britain'],
      },
      {
        art: 'nederland',
        plek: 'De molens en tulpenvelden van Kinderdijk',
        antwoord: 'Nederland',
        accept: ['nederland', 'holland', 'the netherlands', 'netherlands'],
      },
      {
        art: 'egypte',
        plek: 'De piramides en de sfinx van Gizeh',
        antwoord: 'Egypte',
        accept: ['egypte', 'egypt', 'egipte'],
      },
      {
        art: 'newyork',
        plek: 'Het Vrijheidsbeeld in New York',
        antwoord: 'Verenigde Staten',
        accept: ['amerika', 'verenigde staten', 'vs', 'usa', 'us', 'america', 'de verenigde staten'],
      },
      {
        art: 'santorini',
        plek: 'De witte huisjes van Santorini',
        antwoord: 'Griekenland',
        accept: ['griekenland', 'greece', 'grieken'],
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'woorden',
    type: 'woord',
    naam: 'Ronde 5 — Wat betekent dat?',
    uitleg: 'Een woord uit een vreemde taal, in letters die we kunnen lezen. Wat betekent het?',
    icoon: '🗣️',
    seconden: 25,
    vragen: [
      {
        woord: 'thálassa',
        taal: 'Grieks',
        opties: ['Berg', 'Zee', 'Hemel', 'Bos'],
        antwoord: 1,
        weetje: 'Je hoort het terug in "thalassotherapie": een kuur met zeewater.',
      },
      {
        woord: 'mariposa',
        taal: 'Spaans',
        opties: ['Vlinder', 'Meisje', 'Bloem', 'Spiegel'],
        antwoord: 0,
        weetje: 'In Italië heet ze farfalla — vandaar de vlinderpasta.',
      },
      {
        woord: 'fragola',
        taal: 'Italiaans',
        opties: ['Aardbei', 'Vork', 'Lente', 'Geluk'],
        antwoord: 0,
        weetje: 'Van het Latijnse fragrum, dat naar de geur verwijst.',
      },
      {
        woord: 'hanabi',
        taal: 'Japans',
        opties: ['Bloem', 'Vuurwerk', 'Regen', 'Brug'],
        antwoord: 1,
        weetje: 'Letterlijk "vuurbloem": hana is bloem, bi is vuur.',
      },
      {
        woord: 'sobaka',
        taal: 'Russisch',
        opties: ['Hond', 'Laars', 'Suiker', 'Winter'],
        antwoord: 0,
        weetje: 'Russen noemen het apenstaartje in een e-mailadres ook sobaka: hondje.',
      },
      {
        woord: 'psomí',
        taal: 'Grieks',
        opties: ['Kaas', 'Brood', 'Vis', 'Zout'],
        antwoord: 1,
        weetje: 'Het woord dat elke Griekse bakker op zijn deur heeft staan.',
      },
      {
        woord: 'almohada',
        taal: 'Spaans',
        opties: ['Kast', 'Kussen', 'Handdoek', 'Trap'],
        antwoord: 1,
        weetje: 'Een van de vele Spaanse woorden die uit het Arabisch komen.',
      },
      {
        woord: 'tartaruga',
        taal: 'Italiaans',
        opties: ['Taart', 'Schildpad', 'Donderdag', 'Trompet'],
        antwoord: 1,
        weetje: 'Je hoort het terug in het Engelse tortoise en het Franse tortue.',
      },
      {
        woord: 'yama',
        taal: 'Japans',
        opties: ['Berg', 'Rivier', 'Paard', 'Avond'],
        antwoord: 0,
        weetje: 'De beroemdste is de Fuji-yama.',
      },
      {
        woord: 'solntse',
        taal: 'Russisch',
        opties: ['Maan', 'Sneeuw', 'Zon', 'Soldaat'],
        antwoord: 2,
        weetje: 'Verwant aan ons "solair" en het Latijnse sol.',
      },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'schatten',
    type: 'estimate',
    naam: 'Ronde 6 — Hoeveel denk je?',
    uitleg: 'Niemand weet dit exact. Wie het dichtst zit, pakt de meeste punten — en iedereen scoort iets.',
    icoon: '📏',
    seconden: 30,
    vragen: [
      { q: 'Hoeveel inwoners telt België ongeveer?', antwoord: 11800000, eenheid: 'inwoners', weetje: 'Ongeveer 11,8 miljoen, en dat aantal groeit nog licht.' },
      { q: 'Hoe hoog is het Atomium?', antwoord: 102, eenheid: 'meter', weetje: '102 meter, gebouwd voor de wereldtentoonstelling van 1958.' },
      { q: 'Hoeveel botten heeft een volwassen mens?', antwoord: 206, eenheid: 'botten', weetje: 'Een baby wordt geboren met er ongeveer 300; een deel groeit later samen.' },
      { q: 'Hoe lang is de Belgische kustlijn?', antwoord: 67, eenheid: 'kilometer', weetje: 'Amper 67 kilometer, van De Panne tot Knokke-Heist.' },
      { q: 'In welk jaar werd België onafhankelijk?', antwoord: 1830, eenheid: '', weetje: 'De onafhankelijkheid werd uitgeroepen in 1830, na de opstand in Brussel.' },
      { q: 'Hoeveel toetsen heeft een gewone piano?', antwoord: 88, eenheid: 'toetsen', weetje: '52 witte en 36 zwarte.' },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'emoji',
    type: 'open',
    naam: 'Ronde 7 — Emoji-films',
    uitleg: 'Welke film wordt hier uitgebeeld in emoji’s?',
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
      { q: '🐠🔍', antwoord: 'Finding Nemo', accept: ['finding nemo', 'nemo', 'finding dory', 'dory'] },
      { q: '👽🚲🌕', antwoord: 'E.T.', accept: ['et', 'e t', 'e.t.', 'the extra terrestrial'] },
      { q: '🐼🥋', antwoord: 'Kung Fu Panda', accept: ['kung fu panda', 'kungfu panda', 'panda'] },
      { q: '🤖❤️🌱', antwoord: 'WALL·E', accept: ['wall e', 'walle', 'wall-e'] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'zoom',
    type: 'zoom',
    naam: 'Ronde 8 — Uitzoomen',
    uitleg: 'Het beeld zoomt traag uit. Hoe sneller je raadt, hoe meer punten.',
    icoon: '🔍',
    seconden: 30,
    vragen: [
      { art: 'frietjes', antwoord: 'Een pak frieten', accept: ['friet', 'frieten', 'frietjes', 'patat', 'pak frieten', 'frituur', 'frietzak'] },
      { art: 'voetbal', antwoord: 'Een voetbal', accept: ['voetbal', 'bal', 'football', 'soccerbal'] },
      { art: 'fiets', antwoord: 'Een fiets', accept: ['fiets', 'velo', 'vélo', 'bicycle'] },
      { art: 'ijsje', antwoord: 'Een ijsje', accept: ['ijsje', 'ijs', 'hoorntje', 'ijshoorntje', 'roomijs'] },
      { art: 'paraplu', antwoord: 'Een paraplu', accept: ['paraplu', 'regenscherm', 'parasol'] },
      { art: 'gitaar', antwoord: 'Een gitaar', accept: ['gitaar', 'guitar'] },
    ],
  },

  /* ---------------------------------------------------------------- */
  {
    id: 'tekenen',
    type: 'tekenen',
    naam: 'Ronde 9 — Tekenen maar',
    uitleg: 'Eén team tekent op zijn gsm, de tekening verschijnt live op het scherm. Hoe meer teams het raden, hoe meer punten de tekenaar krijgt.',
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
    uitleg: 'Eén speler krijgt de opdracht op zijn gsm en beeldt uit. De andere teams raden. Niet praten!',
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
export const tussenstandNa = ['waarnietwaar', 'geo', 'schatten', 'zoom'];

export function rondeOpIndex(i) {
  return rondes[i] || null;
}

export function aantalRondes() {
  return rondes.length;
}
