// De volledige vragenvoorraad.
//
// Elke ronde heeft méér vragen dan er in één avond gespeeld worden.
// `perSpel` zegt hoeveel er geloot worden; lib/loting.js doet dat in de
// verhouding 20% makkelijk, 60% gemiddeld, 20% moeilijk. Zo is elke quiz
// anders en blijft het niveau in balans.
//
// Elke vraag heeft een `niveau`: 'makkelijk', 'gemiddeld' of 'moeilijk'.
// Staat het er niet, dan telt hij als gemiddeld.
//
// Bij open vragen is `antwoord` wat op het scherm verschijnt, en `accept`
// de lijst alternatieven die ook goed gerekend worden. Typfouten worden
// sowieso vergeven, dus je hoeft niet elke schrijfwijze te bedenken.
//
// De foto's staan in public/fotos/ met hun herkomst in bronnen.json.

export const QUIZ_TITEL = 'De Grote Familiequiz';

export const rondes = [
  /* ================================================================ *
   * RONDE 1 — Meerkeuze over zes domeinen
   * ================================================================ */
  {
    id: 'meerkeuze',
    type: 'mc',
    naam: 'Ronde 1 — Door de vakjes',
    uitleg: 'Zes domeinen, vier antwoorden per vraag.',
    regels: ['Tik A, B, C of D op je gsm', '100 punten, plus tot 50 als je snel bent', 'Een fout antwoord kost 20 punten'],
    icoon: '🎲',
    seconden: 25,
    perSpel: 10,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', domein: 'Aardrijkskunde', q: 'Hoeveel provincies telt België?',
        opties: ['9', '10', '11', '12'], antwoord: 1,
        weetje: 'Vijf in Vlaanderen, vijf in Wallonië. Brussel is geen provincie.' },
      { niveau: 'makkelijk', domein: 'Wetenschap', q: 'Welke planeet staat het dichtst bij de zon?',
        opties: ['Venus', 'Mars', 'Mercurius', 'Aarde'], antwoord: 2,
        weetje: 'En toch is Venus de heetste planeet, door zijn dikke dampkring.' },
      { niveau: 'makkelijk', domein: 'Kunst', q: 'Wie schilderde de Mona Lisa?',
        opties: ['Michelangelo', 'Rembrandt', 'Picasso', 'Leonardo da Vinci'], antwoord: 3,
        weetje: 'Het schilderij is kleiner dan je denkt: ongeveer 77 op 53 centimeter.' },
      { niveau: 'makkelijk', domein: 'Sport', q: 'Hoeveel ringen telt het olympische logo?',
        opties: ['Vier', 'Vijf', 'Zes', 'Zeven'], antwoord: 1,
        weetje: 'Vijf ringen voor vijf continenten, in kleuren die in elke landsvlag voorkwamen.' },
      { niveau: 'makkelijk', domein: 'Wetenschap', q: 'Wat eet een reuzenpanda bijna uitsluitend?',
        opties: ['Bamboe', 'Vis', 'Eucalyptusbladeren', 'Insecten'], antwoord: 0,
        weetje: 'Tot 38 kilo per dag, want er zit bijna geen voeding in.' },
      { niveau: 'makkelijk', domein: 'Amusement', q: 'In welke reeks woont het hoofdpersonage in een ananas op de zeebodem?',
        opties: ['Finding Nemo', 'SpongeBob', 'Octonauts', 'De Kleine Zeemeermin'], antwoord: 1,
        weetje: 'De bedenker van SpongeBob was zeebioloog voor hij tekenaar werd.' },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Welk land telt de meeste tijdzones?',
        opties: ['Rusland', 'Verenigde Staten', 'Frankrijk', 'China'], antwoord: 2,
        weetje: 'Frankrijk komt aan twaalf, dankzij gebieden over de hele wereld. Rusland blijft op elf steken.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Door hoeveel landen stroomt de Donau?',
        opties: ['Vier', 'Zes', 'Tien', 'Veertien'], antwoord: 2,
        weetje: 'Tien — meer dan eender welke andere rivier ter wereld.' },
      { niveau: 'gemiddeld', domein: 'Geschiedenis', q: 'Hoe lang duurde de Honderdjarige Oorlog?',
        opties: ['99 jaar', '100 jaar', '116 jaar', '72 jaar'], antwoord: 2,
        weetje: 'Van 1337 tot 1453. Wie hem geteld heeft, was duidelijk niet van de precieze soort.' },
      { niveau: 'gemiddeld', domein: 'Geschiedenis', q: 'België had ooit het wereldrecord "langst zonder regering". Hoeveel dagen?',
        opties: ['289 dagen', '376 dagen', '541 dagen', '652 dagen'], antwoord: 2,
        weetje: '541 dagen, van 2010 tot 2011. Het land bleef gewoon draaien, wat sommigen tot nadenken stemde.' },
      { niveau: 'gemiddeld', domein: 'Wetenschap', q: 'Welke planeet draait als enige de andere kant op rond zijn as?',
        opties: ['Mars', 'Venus', 'Neptunus', 'Saturnus'], antwoord: 1,
        weetje: 'Op Venus komt de zon in het westen op. Een dag duurt er ook langer dan een jaar.' },
      { niveau: 'gemiddeld', domein: 'Wetenschap', q: 'Welk landdier draagt het langst voor het jong geboren wordt?',
        opties: ['De olifant', 'De giraf', 'De neushoorn', 'Het nijlpaard'], antwoord: 0,
        weetje: 'Bijna 22 maanden. Een olifantenkalf weegt bij de geboorte al zo’n honderd kilo.' },
      { niveau: 'gemiddeld', domein: 'Kunst', q: 'Wie schreef "De Leeuw van Vlaanderen"?',
        opties: ['Guido Gezelle', 'Hendrik Conscience', 'Louis Paul Boon', 'Willem Elsschot'], antwoord: 1,
        weetje: 'Conscience werd "de man die zijn volk leerde lezen" genoemd.' },
      { niveau: 'gemiddeld', domein: 'Kunst', q: 'Welk boek is na de Bijbel het meest vertaalde ter wereld?',
        opties: ['Don Quichot', 'De kleine prins', 'Pinokkio', 'Alice in Wonderland'], antwoord: 1,
        weetje: 'De kleine prins bestaat in meer dan vijfhonderd talen en dialecten.' },
      { niveau: 'gemiddeld', domein: 'Amusement', q: 'Welke film won als eerste niet-Engelstalige de Oscar voor beste film?',
        opties: ['Roma', 'Parasite', 'Amour', 'Life Is Beautiful'], antwoord: 1,
        weetje: 'Parasite, in 2020. De film won er die avond vier.' },
      { niveau: 'gemiddeld', domein: 'Sport', q: 'Bij welke sport hoort de techniek "Fosbury flop"?',
        opties: ['Hoogspringen', 'Turnen', 'Schoonspringen', 'Polsstokspringen'], antwoord: 0,
        weetje: 'Dick Fosbury sprong in 1968 achterwaarts over de lat en won goud. Iedereen lachte — tot ze het nadeden.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Wat is de hoofdstad van Australië?',
        opties: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], antwoord: 2,
        weetje: 'Sydney en Melbourne konden het niet eens worden, dus bouwden ze er een hoofdstad tussenin.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Welke rivier stroomt door Luik?',
        opties: ['De Schelde', 'De Maas', 'De Leie', 'De IJzer'], antwoord: 1,
        weetje: 'De Maas begint in Frankrijk en eindigt in Nederland.' },
      { niveau: 'gemiddeld', domein: 'Wetenschap', q: 'Wat is het grootste orgaan van het menselijk lichaam?',
        opties: ['De lever', 'De longen', 'De huid', 'De darmen'], antwoord: 2,
        weetje: 'Bij een volwassene gaat het al snel over twee vierkante meter.' },
      { niveau: 'gemiddeld', domein: 'Geschiedenis', q: 'In welk jaar viel de Berlijnse Muur?',
        opties: ['1987', '1989', '1991', '1993'], antwoord: 1,
        weetje: 'Op 9 november 1989, na een persconferentie waarin een woordvoerder zich vergiste.' },
      { niveau: 'gemiddeld', domein: 'Wetenschap', q: 'Welk metaal is bij kamertemperatuur vloeibaar?',
        opties: ['Kwik', 'Lood', 'Tin', 'Zink'], antwoord: 0,
        weetje: 'Daarom stond het vroeger in elke thermometer.' },
      { niveau: 'gemiddeld', domein: 'Wetenschap', q: 'Welk dier haalt de hoogste snelheid ter wereld?',
        opties: ['De cheeta', 'De slechtvalk', 'De zeilvis', 'De gierzwaluw'], antwoord: 1,
        weetje: 'In duikvlucht haalt de slechtvalk meer dan 300 km per uur.' },
      { niveau: 'gemiddeld', domein: 'Kunst', q: 'Wie componeerde de Negende symfonie, met de "Ode an die Freude"?',
        opties: ['Bach', 'Mozart', 'Beethoven', 'Brahms'], antwoord: 2,
        weetje: 'Beethoven was al zo goed als doof toen hij ze schreef. Het is nu de hymne van Europa.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Welk land telt vandaag de meeste inwoners?',
        opties: ['China', 'India', 'Verenigde Staten', 'Indonesië'], antwoord: 1,
        weetje: 'India ging China voorbij in 2023.' },
      { niveau: 'gemiddeld', domein: 'Vrije tijd', q: 'Hoeveel kaarten zitten er in een kaartspel zonder jokers?',
        opties: ['48', '52', '54', '56'], antwoord: 1,
        weetje: 'Vier kleuren van dertien kaarten. Met jokers erbij zijn het er 54.' },
      { niveau: 'gemiddeld', domein: 'Sport', q: 'Welke Belg werd in 2022 wereldkampioen wielrennen op de weg?',
        opties: ['Wout van Aert', 'Remco Evenepoel', 'Jasper Philipsen', 'Tim Wellens'], antwoord: 1,
        weetje: 'Evenepoel won dat jaar ook de Vuelta.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'In welk land ligt Machu Picchu?',
        opties: ['Mexico', 'Chili', 'Bolivia', 'Peru'], antwoord: 3,
        weetje: 'De stad ligt op zo’n 2400 meter hoogte in de Andes.' },
      { niveau: 'gemiddeld', domein: 'Geschiedenis', q: 'In welke stad komt het Europees Parlement samen, naast Brussel?',
        opties: ['Luxemburg', 'Straatsburg', 'Genève', 'Frankfurt'], antwoord: 1,
        weetje: 'Twaalf keer per jaar verhuist het hele parlement naar Straatsburg en weer terug.' },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', domein: 'Wetenschap', q: 'Hoeveel halswervels heeft een giraf?',
        opties: ['Zeven', 'Twaalf', 'Twintig', 'Tweeëndertig'], antwoord: 0,
        weetje: 'Zeven — precies evenveel als jij. Ze zijn alleen elk zo’n 25 centimeter lang.' },
      { niveau: 'moeilijk', domein: 'Aardrijkskunde', q: 'Welk land heeft als enige ter wereld een vlag die niet rechthoekig is?',
        opties: ['Zwitserland', 'Nepal', 'Bhutan', 'Qatar'], antwoord: 1,
        weetje: 'De vlag van Nepal bestaat uit twee driehoeken boven elkaar.' },
      { niveau: 'moeilijk', domein: 'Wetenschap', q: 'Welk scheikundig element heeft het symbool W?',
        opties: ['IJzer', 'Wolfraam', 'Zilver', 'Waterstof'], antwoord: 1,
        weetje: 'Van het Duitse "Wolfram". In het Engels heet het tungsten, maar het symbool bleef.' },
      { niveau: 'moeilijk', domein: 'Geschiedenis', q: 'Wie was de eerste vrouw in de ruimte?',
        opties: ['Sally Ride', 'Valentina Teresjkova', 'Mae Jemison', 'Helen Sharman'], antwoord: 1,
        weetje: 'In 1963, twintig jaar vóór de eerste Amerikaanse vrouw.' },
      { niveau: 'moeilijk', domein: 'Kunst', q: 'Wie schreef "Honderd jaar eenzaamheid"?',
        opties: ['Jorge Luis Borges', 'Pablo Neruda', 'Gabriel García Márquez', 'Isabel Allende'], antwoord: 2,
        weetje: 'De Colombiaan kreeg er in 1982 de Nobelprijs voor literatuur voor.' },
      { niveau: 'moeilijk', domein: 'Sport', q: 'In welk jaar werd de eerste Ronde van Vlaanderen gereden?',
        opties: ['1905', '1913', '1919', '1926'], antwoord: 1,
        weetje: 'In 1913, gewonnen door Paul Deman. Er stonden toen amper zevenendertig renners aan de start.' },
    ],
  },

  /* ================================================================ *
   * RONDE 2 — Waar of niet waar
   * ================================================================ */
  {
    id: 'waarnietwaar',
    type: 'truefalse',
    naam: 'Ronde 2 — Waar of niet waar',
    uitleg: 'Stellingen die je gelooft of niet.',
    regels: ['Waar of niet waar — meer keuze is er niet', '60 punten als je juist zit, 15 eraf als je fout zit', 'Twijfel je? Dan is gokken nog altijd de moeite'],
    icoon: '🤔',
    seconden: 18,
    perSpel: 10,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', q: 'De Grote Muur van China is met het blote oog zichtbaar vanaf de maan.', antwoord: false,
        weetje: 'Zelfs vanuit een gewone ruimtebaan is hij nauwelijks te onderscheiden.' },
      { niveau: 'makkelijk', q: 'Een goudvis heeft een geheugen van drie seconden.', antwoord: false,
        weetje: 'Ze onthouden dingen maandenlang en zijn zelfs te trainen.' },
      { niveau: 'makkelijk', q: 'Vleermuizen zijn blind.', antwoord: false,
        weetje: 'Ze zien prima, maar in het donker werkt hun echolocatie beter.' },
      { niveau: 'makkelijk', q: 'Een struisvogel steekt zijn kop in het zand als hij bang is.', antwoord: false,
        weetje: 'Hij draait zijn eieren om in het nest. Van ver lijkt dat op een kop in het zand.' },
      { niveau: 'makkelijk', q: 'België heeft drie officiële landstalen.', antwoord: true,
        weetje: 'Nederlands, Frans en Duits. De Duitstalige gemeenschap telt zo’n 78.000 inwoners.' },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: 'Een octopus heeft drie harten en blauw bloed.', antwoord: true,
        weetje: 'Twee harten pompen naar de kieuwen, één naar de rest. Het blauw komt van koper in plaats van ijzer.' },
      { niveau: 'gemiddeld', q: 'Napoleon was opvallend klein voor zijn tijd.', antwoord: false,
        weetje: 'Hij was ongeveer 1,68 m — doodgewoon toen. De mythe komt van Britse spotprenten.' },
      { niveau: 'gemiddeld', q: 'De Eiffeltoren is in de zomer iets hoger dan in de winter.', antwoord: true,
        weetje: 'Het ijzer zet uit door de warmte: goed voor een centimeter of vijftien.' },
      { niveau: 'gemiddeld', q: 'Honing kan duizenden jaren bewaard worden zonder te bederven.', antwoord: true,
        weetje: 'In Egyptische graven is honing gevonden die nog eetbaar was.' },
      { niveau: 'gemiddeld', q: 'Bananen zijn licht radioactief.', antwoord: true,
        weetje: 'Door het kalium. Zo licht dat je er tienduizenden zou moeten eten voor het iets uitmaakt.' },
      { niveau: 'gemiddeld', q: 'Spinazie bevat uitzonderlijk veel ijzer.', antwoord: false,
        weetje: 'Een oude rekenfout die door Popeye wereldberoemd werd.' },
      { niveau: 'gemiddeld', q: 'Botanisch gezien is een tomaat een fruit.', antwoord: true,
        weetje: 'Alles met zaden dat uit een bloem groeit, is botanisch fruit.' },
      { niveau: 'gemiddeld', q: 'België telt meer dan duizend soorten bier.', antwoord: true,
        weetje: 'De schattingen lopen boven de vijftienhonderd, en er komen er nog bij.' },
      { niveau: 'gemiddeld', q: 'Een slak kan drie jaar aan één stuk slapen.', antwoord: true,
        weetje: 'Bij droogte kruipen ze in hun huisje en wachten ze rustig af.' },
      { niveau: 'gemiddeld', q: 'Haaien bestonden al vóór de eerste bomen.', antwoord: true,
        weetje: 'Haaien zwemmen hier zo’n 400 miljoen jaar rond, bomen kwamen wat later.' },
      { niveau: 'gemiddeld', q: 'De kortste oorlog ooit duurde minder dan een uur.', antwoord: true,
        weetje: 'Groot-Brittannië tegen Zanzibar, 1896: ongeveer veertig minuten.' },
      { niveau: 'gemiddeld', q: 'Kameelmelk bevat meer vitamine C dan koeienmelk.', antwoord: true,
        weetje: 'Drie tot vijf keer zoveel, wat in de woestijn goed van pas komt.' },
      { niveau: 'gemiddeld', q: 'Een mens deelt ongeveer de helft van zijn DNA met een banaan.', antwoord: true,
        weetje: 'Grofweg 50 tot 60 procent. Alle leven werkt met dezelfde bouwstenen.' },
      { niveau: 'gemiddeld', q: 'De Dode Zee ligt onder de zeespiegel.', antwoord: true,
        weetje: 'Ruim 430 meter eronder: het laagste punt op het vasteland van de aarde.' },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: 'Er zijn meer mogelijke schaakpartijen dan atomen in het heelal.', antwoord: true,
        weetje: 'Al na tien zetten loopt het aantal mogelijke stellingen in de miljarden miljarden.' },
      { niveau: 'moeilijk', q: 'Cleopatra leefde dichter bij de bouw van de eerste iPhone dan bij de bouw van de piramides van Gizeh.', antwoord: true,
        weetje: 'De piramides waren in haar tijd al 2500 jaar oud. Wij leven "maar" 2000 jaar na haar.' },
      { niveau: 'moeilijk', q: 'De universiteit van Oxford is ouder dan het Azteekse rijk.', antwoord: true,
        weetje: 'In Oxford werd al les gegeven rond 1096; de Azteken stichtten Tenochtitlán in 1325.' },
      { niveau: 'moeilijk', q: 'Honing is het enige voedsel dat mieren niet kunnen aantasten.', antwoord: false,
        weetje: 'Mieren zijn dol op honing. Honing bederft niet, maar dat is iets anders.' },
      { niveau: 'moeilijk', q: 'Venus draait zo traag dat één dag er langer duurt dan één jaar.', antwoord: true,
        weetje: 'Een omwenteling om de as duurt 243 aardse dagen, een rondje om de zon maar 225.' },
    ],
  },

  /* ================================================================ *
   * RONDE 3 — Cryptische omschrijvingen
   * ================================================================ */
  {
    id: 'cryptisch',
    type: 'open',
    naam: 'Ronde 3 — Wie ben ik?',
    uitleg: 'Een cryptische omschrijving van iemand die je kent.',
    regels: ['Tik de naam in op je gsm', 'Typfouten worden vergeven, de achternaam volstaat', '120 punten, plus tot 60 voor snelheid'],
    icoon: '🕵️',
    seconden: 35,
    perSpel: 8,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', q: 'Deze wielrenner uit Meensel-Kiezegem kreeg de bijnaam De Kannibaal en won vijf keer de Ronde van Frankrijk.',
        antwoord: 'Eddy Merckx', accept: ['merckx', 'eddy merckx'] },
      { niveau: 'makkelijk', q: 'Deze acteur uit Berchem doet zijn spagaat tussen twee vrachtwagens en heet the Muscles from Brussels.',
        antwoord: 'Jean-Claude Van Damme', accept: ['van damme', 'jean claude van damme', 'jcvd', 'jean-claude van damme'] },
      { niveau: 'makkelijk', q: 'Deze natuurkundige met de wilde haardos bedacht dat tijd trager gaat als je snel genoeg beweegt.',
        antwoord: 'Albert Einstein', accept: ['einstein', 'albert einstein'] },
      { niveau: 'makkelijk', q: 'Deze Vlaamse tv-maker begon met een pratende hond en bouwde er een pretpark bij.',
        antwoord: 'Gert Verhulst', accept: ['gert verhulst', 'verhulst', 'gert'] },
      { niveau: 'makkelijk', q: 'Deze Argentijn werd wereldkampioen in 2022 en droeg daarvoor jarenlang nummer 10 bij Barcelona.',
        antwoord: 'Lionel Messi', accept: ['messi', 'lionel messi', 'leo messi'] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: 'Deze Belgische tekenaar stuurde een reporter met een kuifje naar de maan, vijftien jaar vóór Armstrong er stond.',
        antwoord: 'Hergé', accept: ['herge', 'hergé', 'georges remi'] },
      { niveau: 'gemiddeld', q: 'Deze Brusselse zanger bezong het vlakke land en stopte met optreden op zijn hoogtepunt.',
        antwoord: 'Jacques Brel', accept: ['brel', 'jacques brel'] },
      { niveau: 'gemiddeld', q: 'Deze Zuid-Afrikaan zat 27 jaar vast, werd daarna president, en nodigde zijn eigen cipier uit op de inhuldiging.',
        antwoord: 'Nelson Mandela', accept: ['mandela', 'nelson mandela'] },
      { niveau: 'gemiddeld', q: 'Deze Poolse wetenschapster won als eerste mens twee Nobelprijzen, in twee verschillende vakgebieden.',
        antwoord: 'Marie Curie', accept: ['marie curie', 'curie', 'maria sklodowska'] },
      { niveau: 'gemiddeld', q: 'Deze Amerikaanse zangeres nam haar eigen albums opnieuw op om ze terug te krijgen van haar platenfirma.',
        antwoord: 'Taylor Swift', accept: ['taylor swift', 'swift', 'taylor'] },
      { niveau: 'gemiddeld', q: 'Deze Belgische schilder zette een appel voor het gezicht van een man met een bolhoed.',
        antwoord: 'René Magritte', accept: ['magritte', 'rene magritte', 'rené magritte'] },
      { niveau: 'gemiddeld', q: 'Deze Britse natuuronderzoeker voer met de Beagle en schreef daarna over de oorsprong der soorten.',
        antwoord: 'Charles Darwin', accept: ['darwin', 'charles darwin'] },
      { niveau: 'gemiddeld', q: 'Deze Nederlandse schilder sneed een stuk van zijn oor af en schilderde zonnebloemen.',
        antwoord: 'Vincent van Gogh', accept: ['van gogh', 'vincent van gogh', 'gogh'] },
      { niveau: 'gemiddeld', q: 'Deze Rode Duivel speelde jarenlang bij Chelsea en Real Madrid; zijn broer Thorgan speelde ook voor de nationale ploeg.',
        antwoord: 'Eden Hazard', accept: ['hazard', 'eden hazard'] },
      { niveau: 'gemiddeld', q: 'Deze Amerikaanse ondernemer bracht de iPhone uit en droeg altijd dezelfde zwarte coltrui.',
        antwoord: 'Steve Jobs', accept: ['steve jobs', 'jobs'] },
      { niveau: 'gemiddeld', q: 'Deze Britse zangeres noemt haar albums naar haar leeftijd en zong "Rolling in the Deep".',
        antwoord: 'Adele', accept: ['adele'] },
      { niveau: 'gemiddeld', q: 'Deze Vlaamse zanger uit Veurne wordt de keizer van het Vlaamse lied genoemd.',
        antwoord: 'Will Tura', accept: ['will tura', 'tura'] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: 'Deze Britse wiskundige kraakte de Duitse codemachine en wordt de vader van de computer genoemd.',
        antwoord: 'Alan Turing', accept: ['turing', 'alan turing'] },
      { niveau: 'moeilijk', q: 'Deze Belgische priester en astronoom bedacht dat het heelal begon met een oerknal.',
        antwoord: 'Georges Lemaître', accept: ['lemaitre', 'lemaître', 'georges lemaitre', 'georges lemaître'] },
      { niveau: 'moeilijk', q: 'Deze Zweedse uitvinder bedacht dynamiet en liet zijn fortuin na aan een prijs voor de vrede.',
        antwoord: 'Alfred Nobel', accept: ['nobel', 'alfred nobel'] },
      { niveau: 'moeilijk', q: 'Deze Vlaamse anatoom uit Brussel tekende in de zestiende eeuw het menselijk lichaam zoals het echt is.',
        antwoord: 'Andreas Vesalius', accept: ['vesalius', 'andreas vesalius', 'vesalius andreas'] },
      { niveau: 'moeilijk', q: 'Deze Amerikaanse actrice was ook uitvindster, en bedacht een techniek die aan de basis ligt van wifi.',
        antwoord: 'Hedy Lamarr', accept: ['hedy lamarr', 'lamarr'] },
    ],
  },

  /* ================================================================ *
   * RONDE 4 — Landen raden op foto
   * ================================================================ */
  {
    id: 'geo',
    type: 'geo',
    naam: 'Ronde 4 — Waar ter wereld?',
    uitleg: 'Je ziet een foto van een plek ergens ter wereld.',
    regels: ['Tik in in welk land die foto genomen is', 'De landsnaam volstaat, geen stad', '120 punten, plus tot 60 voor snelheid'],
    icoon: '🌍',
    seconden: 30,
    perSpel: 10,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', foto: 'eiffel', plek: 'De Eiffeltoren in Parijs', antwoord: 'Frankrijk',
        accept: ['frankrijk', 'france', 'frankijk'] },
      { niveau: 'makkelijk', foto: 'colosseum', plek: 'Het Colosseum in Rome', antwoord: 'Italië',
        accept: ['italie', 'italië', 'italy', 'italia'] },
      { niveau: 'makkelijk', foto: 'atomium', plek: 'Het Atomium in Brussel', antwoord: 'België',
        accept: ['belgie', 'belgië', 'belgium', 'belgique'] },
      { niveau: 'makkelijk', foto: 'vrijheidsbeeld', plek: 'Het Vrijheidsbeeld in New York', antwoord: 'Verenigde Staten',
        accept: ['amerika', 'verenigde staten', 'vs', 'usa', 'us', 'america', 'de verenigde staten'] },
      { niveau: 'makkelijk', foto: 'gizeh', plek: 'De sfinx en de piramides van Gizeh', antwoord: 'Egypte',
        accept: ['egypte', 'egypt', 'egipte'] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', foto: 'bigben', plek: 'De Elizabeth Tower — Big Ben — in Londen', antwoord: 'Verenigd Koninkrijk',
        accept: ['engeland', 'verenigd koninkrijk', 'uk', 'groot-brittannie', 'groot brittannie', 'groot-brittannië', 'england', 'britain'] },
      { niveau: 'gemiddeld', foto: 'kinderdijk', plek: 'De molens van Kinderdijk', antwoord: 'Nederland',
        accept: ['nederland', 'holland', 'the netherlands', 'netherlands'] },
      { niveau: 'gemiddeld', foto: 'santorini', plek: 'Oia op Santorini', antwoord: 'Griekenland',
        accept: ['griekenland', 'greece', 'grieken'] },
      { niveau: 'gemiddeld', foto: 'sagrada', plek: 'De Sagrada Família in Barcelona', antwoord: 'Spanje',
        accept: ['spanje', 'spain', 'espana', 'españa'] },
      { niveau: 'gemiddeld', foto: 'christus', plek: 'Christus de Verlosser boven Rio de Janeiro', antwoord: 'Brazilië',
        accept: ['brazilie', 'brazilië', 'brazil', 'brasil'] },
      { niveau: 'gemiddeld', foto: 'tajmahal', plek: 'De Taj Mahal in Agra', antwoord: 'India',
        accept: ['india', 'indie', 'indië'] },
      { niveau: 'gemiddeld', foto: 'brandenburger', plek: 'De Brandenburger Tor in Berlijn', antwoord: 'Duitsland',
        accept: ['duitsland', 'germany', 'deutschland'] },
      { niveau: 'gemiddeld', foto: 'machupicchu', plek: 'Machu Picchu in de Andes', antwoord: 'Peru',
        accept: ['peru'] },
      { niveau: 'gemiddeld', foto: 'sydney', plek: 'De haven van Sydney', antwoord: 'Australië',
        accept: ['australie', 'australië', 'australia'] },
      { niveau: 'gemiddeld', foto: 'moskou', plek: 'De Basiliuskathedraal op het Rode Plein', antwoord: 'Rusland',
        accept: ['rusland', 'russia', 'ruslandt'] },
      { niveau: 'gemiddeld', foto: 'chichenitza', plek: 'De piramide van Chichén Itzá', antwoord: 'Mexico',
        accept: ['mexico'] },
      { niveau: 'gemiddeld', foto: 'praag', plek: 'Praag aan de Moldau', antwoord: 'Tsjechië',
        accept: ['tsjechie', 'tsjechië', 'czech', 'czechia', 'tsjechische republiek'] },
      { niveau: 'gemiddeld', foto: 'petra', plek: 'De Schatkamer van Petra', antwoord: 'Jordanië',
        accept: ['jordanie', 'jordanië', 'jordan'] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', foto: 'chefchaouen', plek: 'De blauwe stad Chefchaouen', antwoord: 'Marokko',
        accept: ['marokko', 'morocco', 'maroc'] },
      { niveau: 'moeilijk', foto: 'plitvice', plek: 'De watervallen van Plitvice', antwoord: 'Kroatië',
        accept: ['kroatie', 'kroatië', 'croatia', 'hrvatska'] },
      { niveau: 'moeilijk', foto: 'kirkjufell', plek: 'De berg Kirkjufell', antwoord: 'IJsland',
        accept: ['ijsland', 'iceland', 'island'] },
      { niveau: 'moeilijk', foto: 'cappadocia', plek: 'De ballonnen boven Cappadocië', antwoord: 'Turkije',
        accept: ['turkije', 'turkey', 'turkiye', 'türkiye'] },
      { niveau: 'moeilijk', foto: 'bagan', plek: 'De tempelvlakte van Bagan', antwoord: 'Myanmar',
        accept: ['myanmar', 'birma', 'burma'] },
      { niveau: 'moeilijk', foto: 'budapest', plek: 'Het parlement van Boedapest aan de Donau', antwoord: 'Hongarije',
        accept: ['hongarije', 'hungary', 'magyarorszag'] },
      { niveau: 'moeilijk', foto: 'hallstatt', plek: 'Het dorp Hallstatt aan het meer', antwoord: 'Oostenrijk',
        accept: ['oostenrijk', 'austria', 'osterreich', 'österreich'] },
      { niveau: 'moeilijk', foto: 'lissabon', plek: 'De Toren van Belém in Lissabon', antwoord: 'Portugal',
        accept: ['portugal'] },
    ],
  },

  /* ================================================================ *
   * RONDE 5 — Vreemde woorden
   * ================================================================ */
  {
    id: 'woorden',
    type: 'woord',
    naam: 'Ronde 5 — Wat betekent dat?',
    uitleg: 'Een woord uit een vreemde taal, in letters die we kunnen lezen.',
    regels: ['Kies uit vier betekenissen', 'Gewoon durven gokken loont', '100 punten juist, 20 eraf bij een misser'],
    icoon: '🗣️',
    seconden: 25,
    perSpel: 10,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', woord: 'gracias', taal: 'Spaans', opties: ['Alsjeblieft', 'Dank je wel', 'Tot ziens', 'Goedemorgen'], antwoord: 1,
        weetje: 'Verwant aan ons woord "gratie".' },
      { niveau: 'makkelijk', woord: 'formaggio', taal: 'Italiaans', opties: ['Kaas', 'Brood', 'Wijn', 'Vis'], antwoord: 0,
        weetje: 'Van het Latijnse "forma": de vorm waarin kaas geperst werd.' },
      { niveau: 'makkelijk', woord: 'sushi', taal: 'Japans', opties: ['Rauwe vis', 'Gezuurde rijst', 'Zeewier', 'Sojasaus'], antwoord: 1,
        weetje: 'Sushi verwijst naar de gezuurde rijst, niet naar de vis erop.' },
      { niveau: 'makkelijk', woord: 'da', taal: 'Russisch', opties: ['Nee', 'Ja', 'Misschien', 'Nooit'], antwoord: 1,
        weetje: 'Het tegenovergestelde, "njet", kent iedereen ook.' },
      { niveau: 'makkelijk', woord: 'mariposa', taal: 'Spaans', opties: ['Vlinder', 'Meisje', 'Bloem', 'Spiegel'], antwoord: 0,
        weetje: 'In Italië heet ze farfalla — vandaar de vlinderpasta.' },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', woord: 'thálassa', taal: 'Grieks', opties: ['Berg', 'Zee', 'Hemel', 'Bos'], antwoord: 1,
        weetje: 'Je hoort het terug in "thalassotherapie": een kuur met zeewater.' },
      { niveau: 'gemiddeld', woord: 'fragola', taal: 'Italiaans', opties: ['Aardbei', 'Vork', 'Lente', 'Geluk'], antwoord: 0,
        weetje: 'Van het Latijnse fragrum, dat naar de geur verwijst.' },
      { niveau: 'gemiddeld', woord: 'hanabi', taal: 'Japans', opties: ['Bloem', 'Vuurwerk', 'Regen', 'Brug'], antwoord: 1,
        weetje: 'Letterlijk "vuurbloem": hana is bloem, bi is vuur.' },
      { niveau: 'gemiddeld', woord: 'sobaka', taal: 'Russisch', opties: ['Hond', 'Laars', 'Suiker', 'Winter'], antwoord: 0,
        weetje: 'Russen noemen het apenstaartje in een e-mailadres ook sobaka: hondje.' },
      { niveau: 'gemiddeld', woord: 'psomí', taal: 'Grieks', opties: ['Kaas', 'Brood', 'Vis', 'Zout'], antwoord: 1,
        weetje: 'Het woord dat elke Griekse bakker op zijn deur heeft staan.' },
      { niveau: 'gemiddeld', woord: 'almohada', taal: 'Spaans', opties: ['Kast', 'Kussen', 'Handdoek', 'Trap'], antwoord: 1,
        weetje: 'Een van de vele Spaanse woorden die uit het Arabisch komen.' },
      { niveau: 'gemiddeld', woord: 'tartaruga', taal: 'Italiaans', opties: ['Taart', 'Schildpad', 'Donderdag', 'Trompet'], antwoord: 1,
        weetje: 'Je hoort het terug in het Engelse tortoise en het Franse tortue.' },
      { niveau: 'gemiddeld', woord: 'solntse', taal: 'Russisch', opties: ['Maan', 'Sneeuw', 'Zon', 'Soldaat'], antwoord: 2,
        weetje: 'Verwant aan ons "solair" en het Latijnse sol.' },
      { niveau: 'gemiddeld', woord: 'yama', taal: 'Japans', opties: ['Berg', 'Rivier', 'Paard', 'Avond'], antwoord: 0,
        weetje: 'De beroemdste is de Fuji-yama.' },
      { niveau: 'gemiddeld', woord: 'ouzo', taal: 'Grieks', opties: ['Dans', 'Anijsdrank', 'Vissersboot', 'Bruiloft'], antwoord: 1,
        weetje: 'Hij wordt melkwit zodra je er water bij giet.' },
      { niveau: 'gemiddeld', woord: 'kniga', taal: 'Russisch', opties: ['Boek', 'Koning', 'Sleutel', 'Knie'], antwoord: 0,
        weetje: 'Niets met knieën te maken, hoe verleidelijk het ook klinkt.' },
      { niveau: 'gemiddeld', woord: 'zanahoria', taal: 'Spaans', opties: ['Wortel', 'Ui', 'Peer', 'Boon'], antwoord: 0,
        weetje: 'Ook al uit het Arabisch, net als zoveel Spaanse groenten.' },
      { niveau: 'gemiddeld', woord: 'temporale', taal: 'Italiaans', opties: ['Onweer', 'Klok', 'Slaap', 'Wachtkamer'], antwoord: 0,
        weetje: 'Letterlijk "iets van de tijd" — het weer dus.' },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', woord: 'komorebi', taal: 'Japans', opties: ['Ochtendmist', 'Zonlicht door bladeren', 'Verre donder', 'Eerste sneeuw'], antwoord: 1,
        weetje: 'Het Japans heeft een apart woord voor het licht dat door de bomen valt.' },
      { niveau: 'moeilijk', woord: 'meraki', taal: 'Grieks', opties: ['Heimwee', 'Iets met ziel doen', 'Middagslaapje', 'Losse eindjes'], antwoord: 1,
        weetje: 'Iets doen met heel je hebben en houden erin.' },
      { niveau: 'moeilijk', woord: 'sobremesa', taal: 'Spaans', opties: ['Napraten aan tafel', 'Bovenverdieping', 'Tafelkleed', 'Voorgerecht'], antwoord: 0,
        weetje: 'De tijd die je aan tafel blijft zitten nadat het eten op is.' },
      { niveau: 'moeilijk', woord: 'abbiocco', taal: 'Italiaans', opties: ['Slaperigheid na het eten', 'Ochtendkoffie', 'Familieruzie', 'Zomerstorm'], antwoord: 0,
        weetje: 'Precies het gevoel na een goede pastalunch.' },
      { niveau: 'moeilijk', woord: 'toska', taal: 'Russisch', opties: ['Zware weemoed', 'Sneeuwstorm', 'Vriendschap', 'Marktplein'], antwoord: 0,
        weetje: 'Nabokov schreef dat geen enkel Engels woord het dekt.' },
    ],
  },

  /* ================================================================ *
   * RONDE 6 — Schatvragen
   * ================================================================ */
  {
    id: 'schatten',
    type: 'estimate',
    naam: 'Ronde 6 — Hoeveel denk je?',
    uitleg: 'Niemand weet dit exact. Het gaat om zo dicht mogelijk.',
    regels: ['Tik een getal in op je gsm', 'Dichtste bij wint: 120, dan 90, 70, 50', 'Iedereen die meedoet scoort iets — hier kan je niets verliezen'],
    icoon: '📏',
    seconden: 30,
    perSpel: 6,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', q: 'Hoeveel botten heeft een volwassen mens?', antwoord: 206, eenheid: 'botten',
        weetje: 'Een baby heeft er ongeveer 300; een deel groeit later samen.' },
      { niveau: 'makkelijk', q: 'Hoeveel toetsen heeft een gewone piano?', antwoord: 88, eenheid: 'toetsen',
        weetje: '52 witte en 36 zwarte.' },
      { niveau: 'makkelijk', q: 'Hoeveel inwoners telt België ongeveer?', antwoord: 11800000, eenheid: 'inwoners',
        weetje: 'Ongeveer 11,8 miljoen, en dat aantal groeit nog licht.' },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: 'Hoe lang is de Belgische kustlijn?', antwoord: 67, eenheid: 'kilometer',
        weetje: 'Amper 67 kilometer, van De Panne tot Knokke-Heist.' },
      { niveau: 'gemiddeld', q: 'Hoeveel keer klopt een mensenhart per dag, ruw geschat?', antwoord: 100000, eenheid: 'keer',
        weetje: 'Zo’n honderdduizend keer per dag, ruim 2,5 miljard in een mensenleven.' },
      { niveau: 'gemiddeld', q: 'Hoeveel liter water gaat er in een gemiddeld bad?', antwoord: 150, eenheid: 'liter',
        weetje: 'Ongeveer 150 liter — een douche van vijf minuten gebruikt er zo’n 60.' },
      { niveau: 'gemiddeld', q: 'In welk jaar werd de eerste sms verstuurd?', antwoord: 1992, eenheid: '',
        weetje: 'In 1992, en het bericht luidde "Merry Christmas".' },
      { niveau: 'gemiddeld', q: 'Hoe hoog is het Atomium?', antwoord: 102, eenheid: 'meter',
        weetje: '102 meter, gebouwd voor de wereldtentoonstelling van 1958.' },
      { niveau: 'gemiddeld', q: 'Hoeveel talen worden er wereldwijd ongeveer gesproken?', antwoord: 7000, eenheid: 'talen',
        weetje: 'Rond de zevenduizend, en er verdwijnt er gemiddeld één per twee weken.' },
      { niveau: 'gemiddeld', q: 'Hoeveel dagen duurt een zwangerschap bij een mens gemiddeld?', antwoord: 280, eenheid: 'dagen',
        weetje: 'Veertig weken, gerekend vanaf de laatste menstruatie.' },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: 'Hoeveel treden telt de Eiffeltoren tot de tweede verdieping?', antwoord: 674, eenheid: 'treden',
        weetje: '674 treden. Daarboven mag je verplicht de lift nemen.' },
      { niveau: 'moeilijk', q: 'Hoeveel kilometer bloedvaten zitten er in één mens?', antwoord: 100000, eenheid: 'kilometer',
        weetje: 'Uitgerold zo’n honderdduizend kilometer: twee en een half keer rond de aarde.' },
      { niveau: 'moeilijk', q: 'Hoeveel jaar duurde het om de Sagrada Família te bouwen tot vandaag?', antwoord: 143, eenheid: 'jaar',
        weetje: 'De bouw begon in 1882 en is nog altijd bezig.' },
      { niveau: 'moeilijk', q: 'Hoeveel liter bier drinkt een Belg gemiddeld per jaar?', antwoord: 68, eenheid: 'liter',
        weetje: 'Rond de zeventig liter — minder dan vroeger, maar wel van betere kwaliteit.' },
    ],
  },

  /* ================================================================ *
   * RONDE 7 — Emoji-films
   * ================================================================ */
  {
    id: 'emoji',
    type: 'open',
    naam: 'Ronde 7 — Emoji-films',
    uitleg: 'Welke film wordt hier uitgebeeld in emoji’s?',
    regels: ['Tik de filmtitel in', 'Nederlands of Engels, allebei goed', '120 punten, plus tot 60 voor snelheid'],
    icoon: '🍿',
    seconden: 25,
    groot: true,
    perSpel: 10,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', q: '🦁👑', antwoord: 'The Lion King', accept: ['lion king', 'the lion king', 'de leeuwenkoning', 'leeuwenkoning'] },
      { niveau: 'makkelijk', q: '🚢🧊💔', antwoord: 'Titanic', accept: ['titanic'] },
      { niveau: 'makkelijk', q: '❄️👸⛄', antwoord: 'Frozen', accept: ['frozen', 'la reine des neiges'] },
      { niveau: 'makkelijk', q: '🧙‍♂️⚡🤓', antwoord: 'Harry Potter', accept: ['harry potter', 'harry'] },
      { niveau: 'makkelijk', q: '🦖🏝️', antwoord: 'Jurassic Park', accept: ['jurassic park', 'jurassic world', 'jurassic'] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: '🎈🏠👴', antwoord: 'Up', accept: ['up'] },
      { niveau: 'gemiddeld', q: '👽🚲🌕', antwoord: 'E.T.', accept: ['et', 'e t', 'e.t.', 'the extra terrestrial'] },
      { niveau: 'gemiddeld', q: '🐼🥋', antwoord: 'Kung Fu Panda', accept: ['kung fu panda', 'kungfu panda', 'panda'] },
      { niveau: 'gemiddeld', q: '🤖❤️🌱', antwoord: 'WALL·E', accept: ['wall e', 'walle', 'wall-e'] },
      { niveau: 'gemiddeld', q: '🕶️💊🐇', antwoord: 'The Matrix', accept: ['matrix', 'the matrix'] },
      { niveau: 'gemiddeld', q: '🐟🔍🐠', antwoord: 'Finding Nemo', accept: ['finding nemo', 'nemo', 'finding dory', 'dory'] },
      { niveau: 'gemiddeld', q: '🚗⚡🕰️', antwoord: 'Back to the Future', accept: ['back to the future', 'terug naar de toekomst'] },
      { niveau: 'gemiddeld', q: '🧸🤠🚀', antwoord: 'Toy Story', accept: ['toy story'] },
      { niveau: 'gemiddeld', q: '🦇🃏🌃', antwoord: 'The Dark Knight', accept: ['the dark knight', 'dark knight', 'batman'] },
      { niveau: 'gemiddeld', q: '🍫🏭🎩', antwoord: 'Charlie and the Chocolate Factory', accept: ['charlie and the chocolate factory', 'sjakie en de chocoladefabriek', 'wonka', 'chocoladefabriek'] },
      { niveau: 'gemiddeld', q: '🐭🍝👨‍🍳', antwoord: 'Ratatouille', accept: ['ratatouille'] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: '💍🌋🧝', antwoord: 'The Lord of the Rings', accept: ['lord of the rings', 'the lord of the rings', 'in de ban van de ring', 'lotr'] },
      { niveau: 'moeilijk', q: '🌽🚀🕳️', antwoord: 'Interstellar', accept: ['interstellar'] },
      { niveau: 'moeilijk', q: '🎩💤🌀', antwoord: 'Inception', accept: ['inception'] },
      { niveau: 'moeilijk', q: '🐑🤫🍷', antwoord: 'The Silence of the Lambs', accept: ['silence of the lambs', 'the silence of the lambs'] },
      { niveau: 'moeilijk', q: '🏨🎩🇭🇺', antwoord: 'The Grand Budapest Hotel', accept: ['grand budapest hotel', 'the grand budapest hotel'] },
      { niveau: 'moeilijk', q: '🌊🏝️🏐', antwoord: 'Cast Away', accept: ['cast away', 'castaway'] },
    ],
  },

  /* ================================================================ *
   * RONDE 8 — Uitzoomen
   * ================================================================ */
  {
    id: 'zoom',
    type: 'zoom',
    naam: 'Ronde 8 — Uitzoomen',
    uitleg: 'De foto begint sterk ingezoomd en gaat traag open.',
    regels: ['Blijf raden tot je het juist hebt', 'Wie eerst raadt: 150, dan 110, 85, 65', 'Elke misgok kost 15 punten — dus denk even na'],
    icoon: '🔍',
    seconden: 30,
    perSpel: 8,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', foto: 'voetbal', antwoord: 'Een voetbal', accept: ['voetbal', 'bal', 'football'] },
      { niveau: 'makkelijk', foto: 'zonnebloem', antwoord: 'Een zonnebloem', accept: ['zonnebloem', 'bloem', 'sunflower'] },
      { niveau: 'makkelijk', foto: 'ijsje', antwoord: 'Een ijsje', accept: ['ijsje', 'ijs', 'hoorntje', 'ijshoorntje', 'roomijs', 'gelato'] },
      { niveau: 'makkelijk', foto: 'lego', antwoord: 'Een legoblokje', accept: ['lego', 'legoblok', 'legoblokje', 'blokje', 'bouwsteen'] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', foto: 'frieten', antwoord: 'Een pak frieten', accept: ['friet', 'frieten', 'frietjes', 'patat', 'pak frieten', 'frituur', 'frietzak'] },
      { niveau: 'gemiddeld', foto: 'fiets', antwoord: 'Een fiets', accept: ['fiets', 'velo', 'vélo', 'bicycle'] },
      { niveau: 'gemiddeld', foto: 'paraplu', antwoord: 'Een paraplu', accept: ['paraplu', 'regenscherm', 'parasol'] },
      { niveau: 'gemiddeld', foto: 'gitaar', antwoord: 'Een gitaar', accept: ['gitaar', 'guitar'] },
      { niveau: 'gemiddeld', foto: 'schaakstuk', antwoord: 'Een schaakspel', accept: ['schaken', 'schaakspel', 'schaakbord', 'schaakstuk', 'schaakstukken', 'chess'] },
      { niveau: 'gemiddeld', foto: 'ananas', antwoord: 'Een ananas', accept: ['ananas', 'pineapple'] },
      { niveau: 'gemiddeld', foto: 'dennenappel', antwoord: 'Een dennenappel', accept: ['dennenappel', 'pijnappel', 'pine cone', 'kegel'] },
      { niveau: 'gemiddeld', foto: 'wol', antwoord: 'Een bol wol', accept: ['wol', 'bol wol', 'garen', 'breiwol', 'wolbol'] },
      { niveau: 'gemiddeld', foto: 'ui', antwoord: 'Een ui', accept: ['ui', 'ajuin', 'onion'] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', foto: 'honingraat', antwoord: 'Een honingraat', accept: ['honingraat', 'honing raat', 'bijenwas', 'raat', 'honeycomb', 'bijenkorf'] },
      { niveau: 'moeilijk', foto: 'kiwi', antwoord: 'Een kiwi', accept: ['kiwi', 'kiwifruit'] },
      { niveau: 'moeilijk', foto: 'ritssluiting', antwoord: 'Een ritssluiting', accept: ['rits', 'ritssluiting', 'zip', 'zipper'] },
      { niveau: 'moeilijk', foto: 'schelp', antwoord: 'Een schelp', accept: ['schelp', 'nautilus', 'slakkenhuis', 'shell'] },
      { niveau: 'moeilijk', foto: 'veer', antwoord: 'Een veer', accept: ['veer', 'pluim', 'vogelveer', 'feather'] },
    ],
  },

  /* ================================================================ *
   * RONDE 9 — Tekenen
   * ================================================================ */
  {
    id: 'tekenen',
    type: 'tekenen',
    naam: 'Ronde 9 — Tekenen maar',
    uitleg: 'Eén team tekent op zijn gsm, de tekening verschijnt live op het groot scherm.',
    regels: ['Geen letters of cijfers tekenen', 'Raders krijgen 150, 110 en 80 — elke misgok kost 15', 'De tekenaar krijgt 60 per team dat het raadt'],
    icoon: '🎨',
    seconden: 90,
    perSpel: 6,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', q: 'Een sneeuwman op het strand', sleutelwoorden: [['sneeuwman', 'sneeuwpop'], ['strand', 'zee', 'zand']] },
      { niveau: 'makkelijk', q: 'Een giraf met een sjaal', sleutelwoorden: [['giraf'], ['sjaal']] },
      { niveau: 'makkelijk', q: 'Een kat die op een stofzuiger rijdt', sleutelwoorden: [['kat', 'poes'], ['stofzuiger']] },
      { niveau: 'makkelijk', q: 'Een vis met een hoed', sleutelwoorden: [['vis'], ['hoed', 'pet', 'muts']] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: 'Een gsm die in het toilet valt', sleutelwoorden: [['gsm', 'telefoon', 'smartphone', 'iphone'], ['toilet', 'wc', 'pot']] },
      { niveau: 'gemiddeld', q: 'Een barbecue die in brand staat', sleutelwoorden: [['barbecue', 'bbq'], ['brand', 'vuur', 'vlammen']] },
      { niveau: 'gemiddeld', q: 'Een astronaut die frietjes eet', sleutelwoorden: [['astronaut', 'ruimtevaarder'], ['friet']] },
      { niveau: 'gemiddeld', q: 'Een olifant op een skateboard', sleutelwoorden: [['olifant'], ['skateboard', 'skate', 'rolplank']] },
      { niveau: 'gemiddeld', q: 'Een pinguïn met een zonnebril', sleutelwoorden: [['pinguin'], ['zonnebril', 'bril']] },
      { niveau: 'gemiddeld', q: 'Een kok die een pizza in de lucht gooit', sleutelwoorden: [['kok', 'chef', 'bakker'], ['pizza']] },
      { niveau: 'gemiddeld', q: 'Een hond die een brief bezorgt', sleutelwoorden: [['hond'], ['brief', 'post', 'envelop']] },
      { niveau: 'gemiddeld', q: 'Een boom vol schoenen', sleutelwoorden: [['boom'], ['schoen', 'schoenen', 'laarzen']] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: 'Iemand die zijn eigen schaduw kwijt is', sleutelwoorden: [['schaduw']] },
      { niveau: 'moeilijk', q: 'Een wolk die het regent op één persoon', sleutelwoorden: [['wolk'], ['regen', 'regent', 'druppels']] },
      { niveau: 'moeilijk', q: 'Een robot die een bloem water geeft', sleutelwoorden: [['robot'], ['bloem', 'plant']] },
      { niveau: 'moeilijk', q: 'Een spiegel die iets anders toont dan wat ervoor staat', sleutelwoorden: [['spiegel']] },
    ],
  },

  /* ================================================================ *
   * RONDE 10 — Uitbeelden
   * ================================================================ */
  {
    id: 'uitbeelden',
    type: 'charades',
    naam: 'Ronde 10 — Uitbeelden',
    uitleg: 'Eén speler krijgt de opdracht op zijn gsm en beeldt uit.',
    regels: ['Niet praten, niet wijzen naar dingen in de kamer', 'Raders krijgen 150, 110 en 80 — elke misgok kost 15', 'De uitbeelder krijgt 60 per team dat het raadt'],
    icoon: '🎭',
    seconden: 75,
    perSpel: 8,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', q: 'Een pinguïn die over het ijs waggelt', sleutelwoorden: [['pinguin']] },
      { niveau: 'makkelijk', q: 'Frietjes bakken in de frituur', sleutelwoorden: [['friet']] },
      { niveau: 'makkelijk', q: 'Tanden poetsen', sleutelwoorden: [['tand', 'tanden', 'poetsen', 'tandenborstel']] },
      { niveau: 'makkelijk', q: 'Een spin ontdekken in de badkamer', sleutelwoorden: [['spin']] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: 'Een selfie nemen die maar niet lukt', sleutelwoorden: [['selfie', 'foto']] },
      { niveau: 'gemiddeld', q: 'Een penalty missen', sleutelwoorden: [['penalty', 'strafschop', 'elfmeter']] },
      { niveau: 'gemiddeld', q: 'Een koffer inpakken die niet meer dicht gaat', sleutelwoorden: [['koffer', 'valies']] },
      { niveau: 'gemiddeld', q: 'Een ijsje dat op de grond valt', sleutelwoorden: [['ijsje', 'ijs', 'ijsco', 'hoorntje']] },
      { niveau: 'gemiddeld', q: 'Iemand die in de verkeerde lift stapt', sleutelwoorden: [['lift']] },
      { niveau: 'gemiddeld', q: 'Een auto die niet wil starten', sleutelwoorden: [['auto', 'wagen'], ['start', 'starten', 'panne', 'stuk']] },
      { niveau: 'gemiddeld', q: 'Een kaars uitblazen op een verjaardagstaart', sleutelwoorden: [['kaars', 'kaarsjes', 'taart', 'verjaardag']] },
      { niveau: 'gemiddeld', q: 'Sneeuw ruimen voor de deur', sleutelwoorden: [['sneeuw'], ['ruimen', 'scheppen', 'schuiven', 'vegen']] },
      { niveau: 'gemiddeld', q: 'Een baby in slaap wiegen', sleutelwoorden: [['baby', 'kindje'], ['slaap', 'wiegen', 'slapen']] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: 'Een dirigent voor een orkest', sleutelwoorden: [['dirigent', 'dirigeren', 'orkest']] },
      { niveau: 'moeilijk', q: 'Iemand die zeeziek wordt op een boot', sleutelwoorden: [['zeeziek', 'boot', 'misselijk', 'schip']] },
      { niveau: 'moeilijk', q: 'Een standbeeld dat tot leven komt', sleutelwoorden: [['standbeeld', 'beeld', 'statue']] },
      { niveau: 'moeilijk', q: 'Een goochelaar die zijn truc verknoeit', sleutelwoorden: [['goochelaar', 'goochelen', 'truc', 'magie', 'tovenaar']] },
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
