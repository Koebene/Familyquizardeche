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
    regels: ['Tik A, B, C of D op je gsm', '100 punten, plus tot 50 als je snel bent', 'Fout gokken kost niets — dus doe altijd mee'],
    icoon: '🎲',
    seconden: 25,
    perSpel: 10,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', domein: 'Wetenschap', q: 'Hoeveel poten heeft een spin?',
        opties: ['Zes', 'Acht', 'Tien', 'Twaalf'], antwoord: 1,
        weetje: 'Acht poten, en dat is meteen het verschil met insecten: die hebben er zes. Spinnen zijn dan ook geen insecten maar spinachtigen, net als schorpioenen en teken.' },
      { niveau: 'makkelijk', domein: 'Sport', q: 'In welke sport sla je een shuttle over een net?',
        opties: ['Squash', 'Badminton', 'Tafeltennis', 'Padel'], antwoord: 1,
        weetje: 'Een shuttle is het snelste projectiel in de sport: bij een smash haalt hij ruim 400 km per uur. Maar hij remt ook razendsnel af, want die veertjes vangen enorm veel lucht.' },
      { niveau: 'makkelijk', domein: 'Aardrijkskunde', q: 'Wat is de hoofdstad van Italië?',
        opties: ['Milaan', 'Napels', 'Rome', 'Turijn'], antwoord: 2,
        weetje: 'Rome is ook de enige hoofdstad ter wereld met een volledig ander land binnen haar grenzen: Vaticaanstad. En het zwaartepunt van Italië ligt economisch eigenlijk in Milaan, niet in Rome.' },
      { niveau: 'makkelijk', domein: 'Wetenschap', q: 'Welk dier staat in het logo van het Wereldnatuurfonds?',
        opties: ['De tijger', 'De reuzenpanda', 'De olifant', 'De ijsbeer'], antwoord: 1,
        weetje: 'De panda werd in 1961 gekozen omdat hij herkenbaar is én omdat een zwart-wit logo destijds een pak goedkoper was om te drukken.' },
      { niveau: 'makkelijk', domein: 'Geschiedenis', q: 'In welk jaar zette de eerste mens voet op de maan?',
        opties: ['1965', '1969', '1972', '1975'], antwoord: 1,
        weetje: 'Op 20 juli 1969 zette Neil Armstrong de eerste voet op de maan. De boordcomputer had minder rekenkracht dan de goedkoopste gsm van vandaag, en tijdens de landing gaf hij alarm omdat hij overbelast raakte.' },
      { niveau: 'makkelijk', domein: 'Wetenschap', q: 'Hoeveel dagen telt een schrikkeljaar?',
        opties: ['364', '365', '366', '367'], antwoord: 2,
        weetje: 'De aarde doet er 365 dagen en bijna zes uur over rond de zon. Die uren sparen we op tot een extra dag. Eeuwjaren slaan we over, tenzij ze deelbaar zijn door 400 — daarom was 2000 wel een schrikkeljaar en 1900 niet.' },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', domein: 'Wetenschap', q: 'Welk orgaan maakt insuline aan?',
        opties: ['De lever', 'De alvleesklier', 'De nieren', 'De milt'], antwoord: 1,
        weetje: 'De alvleesklier ligt achter je maag en regelt je bloedsuiker. Werkt dat stuk niet meer, dan spreken we van diabetes — een orgaan waar je pas over nadenkt als het stilvalt.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Welke zee ligt tussen Italië en Kroatië?',
        opties: ['De Egeïsche Zee', 'De Adriatische Zee', 'De Ionische Zee', 'De Tyrreense Zee'], antwoord: 1,
        weetje: 'De Adriatische Zee scheidt de Italiaanse laars van de Balkan. Venetië ligt helemaal bovenaan, Kroatië met zijn duizend eilanden aan de overkant.' },
      { niveau: 'gemiddeld', domein: 'Kunst', q: 'Wie schreef "Romeo en Julia"?',
        opties: ['Charles Dickens', 'William Shakespeare', 'Oscar Wilde', 'Jane Austen'], antwoord: 1,
        weetje: 'Shakespeare schreef het rond 1595, maar verzon het verhaal niet zelf: het liep al rond als Italiaanse novelle. Zijn versie werd de bekendste, en Verona krijgt er nog altijd toeristen door.' },
      { niveau: 'gemiddeld', domein: 'Sport', q: 'Hoeveel spelers van één ploeg staan er bij rugby op het veld?',
        opties: ['Elf', 'Dertien', 'Vijftien', 'Zeventien'], antwoord: 2,
        weetje: 'Vijftien bij rugby union, de bekendste vorm. Er bestaat ook rugby league met dertien spelers, en op de Olympische Spelen speelt men rugby sevens: zeven per ploeg.' },
      { niveau: 'gemiddeld', domein: 'Geschiedenis', q: 'Welk land schonk het Vrijheidsbeeld aan de Verenigde Staten?',
        opties: ['Engeland', 'Frankrijk', 'Nederland', 'Spanje'], antwoord: 1,
        weetje: 'Frankrijk gaf het beeld in 1886 cadeau voor het eeuwfeest van de Amerikaanse onafhankelijkheid. Het werd in 350 stukken over de oceaan verscheept en ter plaatse weer in elkaar gezet.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Welke Belgische stad heet in het Frans "Mons"?',
        opties: ['Bergen', 'Doornik', 'Namen', 'Luik'], antwoord: 0,
        weetje: 'Bergen in het Frans Mons, Doornik is Tournai, Luik is Liège en Namen is Namur. Bergen was in 2015 culturele hoofdstad van Europa.' },
      { niveau: 'gemiddeld', domein: 'Wetenschap', q: 'Welk gas nemen planten op om te groeien?',
        opties: ['Zuurstof', 'Stikstof', 'Koolstofdioxide', 'Waterstof'], antwoord: 2,
        weetje: 'Planten halen koolstofdioxide uit de lucht en bouwen daar met zonlicht suikers mee. De zuurstof die overblijft geven ze weer af — een ruil waar wij bijzonder goed mee wegkomen.' },
      { niveau: 'gemiddeld', domein: 'Kunst', q: 'Wie schilderde "De Nachtwacht"?',
        opties: ['Vermeer', 'Rembrandt', 'Rubens', 'Van Gogh'], antwoord: 1,
        weetje: 'Rembrandt schilderde het in 1642. De scène speelt zich overdag af: de naam Nachtwacht ontstond pas eeuwen later, toen een donker geworden vernislaag het doek somber maakte.' },
      { niveau: 'gemiddeld', domein: 'Sport', q: 'Welke stad organiseerde de Olympische Zomerspelen van 2021?',
        opties: ['Rio de Janeiro', 'Tokio', 'Parijs', 'Peking'], antwoord: 1,
        weetje: 'Ze heten officiîel nog altijd Tokio 2020. Door de pandemie gingen ze een jaar later door, en voor het eerst in de geschiedenis zonder publiek in de tribunes.' },
      { niveau: 'gemiddeld', domein: 'Amusement', q: 'In welk land werd de Rubiks kubus uitgevonden?',
        opties: ['Duitsland', 'Japan', 'Hongarije', 'Tsjechië'], antwoord: 2,
        weetje: 'De Hongaar Ernő Rubik maakte hem in 1974 als lesmateriaal, om ruimtelijk inzicht uit te leggen. Hij had er zelf een maand voor nodig om zijn eigen kubus weer op te lossen.' },
      { niveau: 'gemiddeld', domein: 'Wetenschap', q: 'Welke planeet heeft de meeste manen?',
        opties: ['Jupiter', 'Saturnus', 'Uranus', 'Neptunus'], antwoord: 1,
        weetje: 'Saturnus. Lange tijd was Jupiter de koploper, maar met sterkere telescopen zijn er rond Saturnus zoveel kleine manen ontdekt dat hij Jupiter ruim voorbijgestoken is. Een exact aantal noemen heeft weinig zin: er komen er elk jaar bij, en het staat er intussen al ruim dubbel zoveel als bij Jupiter.' },
      { niveau: 'gemiddeld', domein: 'Amusement', q: 'Welk bedrijf bracht de Walkman op de markt?',
        opties: ['Panasonic', 'Philips', 'Sony', 'Sharp'], antwoord: 2,
        weetje: 'Sony bracht hem uit in 1979. Voor het eerst kon je je eigen muziek meenemen op straat — precies wat een gsm nu doet, maar dan met cassettes.' },
      { niveau: 'gemiddeld', domein: 'Kunst', q: 'Hoeveel snaren heeft een viool?',
        opties: ['Drie', 'Vier', 'Vijf', 'Zes'], antwoord: 1,
        weetje: 'Vier snaren: G, D, A en E. Een altviool heeft er evenveel maar klinkt lager, en een cello ook — alleen moet je die tussen je knieen klemmen.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Welke rivier stroomt door Parijs?',
        opties: ['De Loire', 'De Rhône', 'De Seine', 'De Garonne'], antwoord: 2,
        weetje: 'De Seine. Op het eiland midden in de rivier, het Île de la Cité, begon de stad ooit — daar staat ook de Notre-Dame.' },
      { niveau: 'gemiddeld', domein: 'Wetenschap', q: 'Welke vitamine maakt je lichaam zelf aan bij zonlicht?',
        opties: ['Vitamine A', 'Vitamine C', 'Vitamine D', 'Vitamine K'], antwoord: 2,
        weetje: 'Je huid maakt vitamine D aan onder invloed van zonlicht. In onze streken staat de zon in de winter te laag om dat te doen, en daarom slikken veel mensen ze dan bij.' },
      { niveau: 'gemiddeld', domein: 'Kunst', q: 'Wie schreef "Het verdriet van België"?',
        opties: ['Hugo Claus', 'Louis Paul Boon', 'Tom Lanoye', 'Jef Geeraerts'], antwoord: 0,
        weetje: 'Hugo Claus schreef het in 1983: het verhaal van een jongen in Vlaanderen tijdens de bezetting. Claus werd er jarenlang voor getipt voor de Nobelprijs, maar heeft hem nooit gekregen.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Welk land heeft de langste kustlijn ter wereld?',
        opties: ['Rusland', 'Canada', 'Australië', 'Indonesië'], antwoord: 1,
        weetje: 'Ruim 200.000 kilometer — goed voor bijna de helft van alle kustlijn ter wereld. Dat komt door de tienduizenden eilanden in het noorden, waar de kust alle kanten op kronkelt.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Wat is de grootste woestijn ter wereld?',
        opties: ['De Sahara', 'Antarctica', 'De Gobi', 'De Kalahari'], antwoord: 1,
        weetje: 'Een woestijn wordt bepaald door neerslag, niet door zand. In Antarctica valt zo goed als niets, en op sommige plekken heeft het al miljoenen jaren niet geregend. Het is dus de grootste én de droogste woestijn.' },
      { niveau: 'gemiddeld', domein: 'Amusement', q: 'Welke groep bracht "Bohemian Rhapsody" uit?',
        opties: ['The Rolling Stones', 'Queen', 'Pink Floyd', 'Led Zeppelin'], antwoord: 1,
        weetje: 'Bijna zes minuten, met een operastuk in het midden. De platenfirma vond het onmogelijk voor de radio, tot een deejay het uit koppigheid toch draaide. Het stond datzelfde jaar negen weken op nummer één.' },
      { niveau: 'gemiddeld', domein: 'Amusement', q: 'Hoeveel keer won België het Eurovisiesongfestival?',
        opties: ['Nooit', 'Eén keer', 'Twee keer', 'Drie keer'], antwoord: 1,
        weetje: 'Één keer, in 1986 met Sandra Kim en het liedje J’aime la vie. Ze was pas dertien en had opgegeven dat ze vijftien was — toen dat uitkwam, eiste Zwitserland de titel op. Tevergeefs.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Wat is het kleinste land ter wereld?',
        opties: ['Monaco', 'San Marino', 'Vaticaanstad', 'Liechtenstein'], antwoord: 2,
        weetje: 'Vaticaanstad is nog geen halve vierkante kilometer groot, met een paar honderd inwoners. Je kan er in een kwartier omheen wandelen, en het ligt volledig binnen Rome.' },
      { niveau: 'gemiddeld', domein: 'Geschiedenis', q: 'Wie was de eerste president van de Verenigde Staten?',
        opties: ['Thomas Jefferson', 'George Washington', 'John Adams', 'Benjamin Franklin'], antwoord: 1,
        weetje: 'Washington weigerde een derde ambtstermijn omdat hij geen koning wilde lijken. Dat werd anderhalve eeuw lang een ongeschreven regel, tot ze na Roosevelt in de grondwet werd gezet.' },
      { niveau: 'gemiddeld', domein: 'Aardrijkskunde', q: 'Welke taal heeft wereldwijd de meeste moedertaalsprekers?',
        opties: ['Engels', 'Spaans', 'Mandarijn-Chinees', 'Hindi'], antwoord: 2,
        weetje: 'Mandarijn heeft veruit de meeste moedertaalsprekers. Engels wordt door méér mensen gesproken in totaal, maar voor de meesten daarvan is het een tweede taal.' },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', domein: 'Wetenschap', q: 'Wie ontdekte bij toeval penicilline?',
        opties: ['Louis Pasteur', 'Alexander Fleming', 'Robert Koch', 'Edward Jenner'], antwoord: 1,
        weetje: 'Fleming ging in 1928 op vakantie en liet een schaaltje bacteriën openstaan. Er groeide schimmel op, en rond die schimmel bleven de bacteriën weg. Slordigheid die miljoenen levens gered heeft.' },
      { niveau: 'moeilijk', domein: 'Aardrijkskunde', q: 'Wat is de langste rivier van Europa?',
        opties: ['De Donau', 'De Wolga', 'De Rijn', 'De Oder'], antwoord: 1,
        weetje: 'De Wolga is ruim 3500 kilometer lang en stroomt volledig door Rusland. Ze mondt niet uit in een oceaan maar in de Kaspische Zee — het grootste meer ter wereld.' },
      { niveau: 'moeilijk', domein: 'Wetenschap', q: 'Hoeveel botten heeft een haai?',
        opties: ['Geen enkel', 'Veertig', 'Honderdzes', 'Tweehonderdzes'], antwoord: 0,
        weetje: 'Geen enkel. Hun skelet is volledig kraakbeen, hetzelfde spul als je oorschelp. Dat is lichter dan bot, waardoor ze minder moeite moeten doen om te blijven drijven. Wat we van haaien terugvinden zijn dan ook bijna altijd alleen hun tanden.' },
      { niveau: 'moeilijk', domein: 'Geschiedenis', q: 'Welk land heette vroeger Perzië?',
        opties: ['Irak', 'Iran', 'Turkije', 'Syrië'], antwoord: 1,
        weetje: 'In 1935 vroeg de regering om het land voortaan Iran te noemen, de naam die het in het Perzisch altijd al had. Perzië was de naam die de Grieken eraan gaven.' },
      { niveau: 'moeilijk', domein: 'Kunst', q: 'Wie componeerde de opera "Carmen"?',
        opties: ['Verdi', 'Puccini', 'Bizet', 'Rossini'], antwoord: 2,
        weetje: 'Carmen viel bij de première in 1875 volledig door de mand: te schokkend, vond het publiek. Bizet stierf precies drie maanden later, op zijn zesendertigste, zonder te weten dat het één van de meest gespeelde opera’s ooit zou worden.' },
      { niveau: 'moeilijk', domein: 'Geschiedenis', q: 'In welk jaar werd het World Wide Web publiek toegankelijk?',
        opties: ['1987', '1991', '1995', '1998'], antwoord: 1,
        weetje: 'Tim Berners-Lee bedacht het web bij CERN in Zwitserland. In 1991 ging de eerste website online, en CERN besliste de techniek gratis weg te geven. Had men er patent op genomen, dan zag het internet er vandaag heel anders uit.' },
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
    regels: ['Waar of niet waar — meer keuze is er niet', '60 punten per juiste stelling', 'Fout kost niets, dus gokken mag altijd'],
    icoon: '🤔',
    seconden: 18,
    perSpel: 10,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', q: 'Een jaar op aarde duurt precies 365 dagen.', antwoord: false,
        weetje: 'Een rondje om de zon duurt 365 dagen en bijna zes uur. Die extra uren sparen we op tot één dag om de vier jaar. Zonder die correctie zou de kalender per eeuw bijna een maand verschuiven.' },
      { niveau: 'makkelijk', q: 'Vleermuizen zijn de enige zoogdieren die echt kunnen vliegen.', antwoord: true,
        weetje: 'Vleermuizen zijn de enige zoogdieren die op eigen kracht kunnen vliegen. Vliegende eekhoorns en vliegende honden zweven enkel naar beneden — dat is vallen met stijl.' },
      { niveau: 'makkelijk', q: 'Een struisvogel kan niet vliegen.', antwoord: true,
        weetje: 'Vliegen lukt niet, maar lopen des te beter: tot 70 kilometer per uur, met stappen van bijna vijf meter. Een struisvogel is ook de enige vogel met twee tenen per poot.' },
      { niveau: 'makkelijk', q: 'Water kookt op zeeniveau bij honderd graden.', antwoord: true,
        weetje: 'Op zeeniveau kookt water bij honderd graden. Hoe hoger je komt, hoe lager de luchtdruk en hoe vroeger het kookt — op de Mount Everest al rond 70 graden. Daar krijg je een ei nooit hardgekookt.' },
      { niveau: 'makkelijk', q: 'De Melkweg telt meer dan honderd miljard sterren.', antwoord: true,
        weetje: 'De schattingen lopen van honderd tot vierhonderd miljard sterren, en niemand kan ze tellen: we zitten er middenin en kijken door de sterren heen die ervoor staan.' },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: 'Een naaktslak heeft duizenden tanden.', antwoord: true,
        weetje: 'Een slak heeft een raspende tong met duizenden minuscule tandjes, de radula. Sommige soorten komen aan meer dan twintigduizend. Daarmee schrapen ze zich moeiteloos door je sla.' },
      { niveau: 'gemiddeld', q: 'De Titanic zonk tijdens zijn tweede reis.', antwoord: false,
        weetje: 'Het was zijn allereerste reis, in april 1912. Het schip had plaats voor reddingsboten voor iedereen, maar er waren er minder aan boord gezet omdat het dek anders te rommelig oogde.' },
      { niveau: 'gemiddeld', q: 'Australië is breder dan de maan.', antwoord: true,
        weetje: 'Australië is van west naar oost zo’n 4000 kilometer breed, de maan meet er 3475 in doorsnede. Australië is dus breder dan de maan — al is de maan natuurlijk wel een bol.' },
      { niveau: 'gemiddeld', q: 'Een kolibrie kan achteruit vliegen.', antwoord: true,
        weetje: 'De kolibrie is de enige vogel die echt achteruit kan vliegen. Zijn vleugels bewegen in een liggende acht, tot tachtig keer per seconde. Daarom hoor je dat zoemen.' },
      { niveau: 'gemiddeld', q: 'Sneeuw is altijd wit.', antwoord: false,
        weetje: 'In de bergen kleurt oude sneeuw soms roze of rood door algen die erin groeien: watermeloensneeuw. Ze ruikt zelfs vaag zoet, maar je kan er flink ziek van worden.' },
      { niveau: 'gemiddeld', q: 'De Eiffeltoren was bedoeld als tijdelijk bouwwerk.', antwoord: true,
        weetje: 'De toren werd gebouwd voor de wereldtentoonstelling van 1889 en mocht twintig jaar blijven staan. Kunstenaars vonden hem een gedrocht. Dat hij er nog staat, dankt hij aan de radio-antenne bovenop: te nuttig om af te breken.' },
      { niveau: 'gemiddeld', q: 'Katten kunnen geen zoet proeven.', antwoord: true,
        weetje: 'Katten missen het gen voor de zoetsmaakreceptor. Als vleeseters hadden ze er nooit iets aan. Als je kat toch aan je ijsje komt, is het om het vet of de melk — niet om de suiker.' },
      { niveau: 'gemiddeld', q: 'Een octopus kan door een gat kruipen dat zo groot is als zijn oog.', antwoord: true,
        weetje: 'Een octopus heeft geen botten: het enige harde stuk is zijn snavel. Alles wat daar doorheen past, past er dus doorheen. Aquaria moeten hun deksels vastschroeven.' },
      { niveau: 'gemiddeld', q: 'IJsberen zijn linkshandig.', antwoord: false,
        weetje: 'Een taai verhaal dat in talloze weetjesboeken staat, maar onderzoekers hebben nooit enige voorkeur voor links of rechts gevonden bij ijsberen.' },
      { niveau: 'gemiddeld', q: 'Er staan meer bomen op aarde dan er sterren in de Melkweg staan.', antwoord: true,
        weetje: 'Onderzoekers kwamen in 2015 op ongeveer drie biljoen bomen. Dat is ruw geschat tien keer meer dan het aantal sterren in de Melkweg — al zijn het er ooit bijna dubbel zoveel geweest.' },
      { niveau: 'gemiddeld', q: 'De roze kleur van flamingo’s komt uit hun voedsel.', antwoord: true,
        weetje: 'Flamingo’s worden wit geboren. De roze kleur komt van kleurstoffen in de garnaaltjes en algen die ze eten. Krijgen ze dat niet, dan verbleken ze. In dierentuinen wordt het bijgevoerd.' },
      { niveau: 'gemiddeld', q: 'Wolken kunnen honderden tonnen wegen.', antwoord: true,
        weetje: 'Een gewone stapelwolk bevat al snel een half miljoen kilo water: het gewicht van honderd olifanten. Ze blijft hangen omdat de druppels zo klein zijn dat ze nauwelijks vallen.' },
      { niveau: 'gemiddeld', q: 'In je lichaam zit genoeg ijzer voor een spijker van enkele centimeters.', antwoord: true,
        weetje: 'Een volwassene draagt ongeveer vier gram ijzer met zich mee, het meeste in de rode bloedcellen. Genoeg voor een kleine spijker — en precies waarom bloed roest-rood is.' },
      { niveau: 'gemiddeld', q: 'Er bestaat een dier dat in theorie niet aan ouderdom sterft.', antwoord: true,
        weetje: 'Het kwalletje Turritopsis dohrnii kan zichzelf bij stress terugzetten naar een eerder levensstadium en opnieuw beginnen. In theorie oneindig. In de praktijk wordt het meestal gewoon opgegeten.' },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: 'Vikingen droegen helmen met hoorns.', antwoord: false,
        weetje: 'Geen enkele opgegraven vikinghelm heeft hoorns. Het beeld komt van kostuums voor een Wagner-opera in 1876 — hoorns op je helm zijn in een gevecht trouwens vooral handig voor je tegenstander.' },
      { niveau: 'moeilijk', q: 'Ten tijde van de dinosauriërs duurde een dag korter dan nu.', antwoord: true,
        weetje: 'Toen de dinosauriërs leefden duurde een dag ongeveer 23 uur. De getijden remmen de aarde heel traag af: per eeuw komt er zo’n twee duizendste seconde bij. Over honderden miljoenen jaren telt dat aan.' },
      { niveau: 'moeilijk', q: 'De Grote Piramide van Gizeh was bijna vierduizend jaar het hoogste bouwwerk ter wereld.', antwoord: true,
        weetje: 'De piramide werd rond 2560 voor Christus gebouwd en bleef bijna 3800 jaar het hoogste bouwwerk ter wereld, tot de kathedraal van Lincoln hem rond 1311 voorbijstak. Geen enkel bouwwerk heeft dat record ooit benaderd.' },
      { niveau: 'moeilijk', q: 'Bloed is blauw zolang het geen zuurstof heeft.', antwoord: false,
        weetje: 'Bloed is altijd rood, zuurstofarm bloed gewoon donkerder. Je aderen ogen blauw omdat je huid rood licht dieper doorlaat dan blauw. Bij een bloedafname komt er dus ook gewoon rood bloed uit.' },
      { niveau: 'moeilijk', q: 'Het menselijk oog kan meer dan een miljoen kleuren onderscheiden.', antwoord: true,
        weetje: 'De schattingen lopen tot zo’n tien miljoen kleuren. Sommige mensen, bijna altijd vrouwen, hebben een vierde type kegeltje en zien er nog meer — al is dat moeilijk te bewijzen.' },
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
      { niveau: 'makkelijk', q: 'Deze Amerikaanse bokser noemde zichzelf de grootste en zweefde als een vlinder.',
        antwoord: 'Muhammad Ali', accept: ['muhammad ali', 'ali', 'cassius clay'] },
      { niveau: 'makkelijk', q: 'Deze Britse band uit Liverpool telde vier leden en zette de popmuziek op zijn kop.',
        antwoord: 'The Beatles', accept: ['beatles', 'the beatles'] },
      { niveau: 'makkelijk', q: 'Deze Italiaanse zeevaarder zeilde in 1492 westwaarts en dacht dat hij in Indië was aangekomen.',
        antwoord: 'Christoffel Columbus', accept: ['columbus', 'christoffel columbus', 'colombus', 'colon'] },
      { niveau: 'makkelijk', q: 'Deze Vlaamse wielrenner uit Mol won drie keer de Ronde van Vlaanderen en heet Tom.',
        antwoord: 'Tom Boonen', accept: ['boonen', 'tom boonen', 'tommeke'] },
      { niveau: 'makkelijk', q: 'Deze Duitse componist werd doof en schreef daarna zijn beroemdste symfonie.',
        antwoord: 'Ludwig van Beethoven', accept: ['beethoven', 'ludwig van beethoven'] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: 'Deze Oostenrijker componeerde al als kind en stierf jong, met een onvoltooid requiem.',
        antwoord: 'Wolfgang Amadeus Mozart', accept: ['mozart', 'wolfgang amadeus mozart', 'amadeus'] },
      { niveau: 'gemiddeld', q: 'Deze Amerikaanse regisseur maakte een film over een witte haai en één over een buitenaards wezen op een fiets.',
        antwoord: 'Steven Spielberg', accept: ['spielberg', 'steven spielberg'] },
      { niveau: 'gemiddeld', q: 'Deze Britse premier loodste zijn land door de Tweede Wereldoorlog, met sigaar en overwinningsteken.',
        antwoord: 'Winston Churchill', accept: ['churchill', 'winston churchill'] },
      { niveau: 'gemiddeld', q: 'Deze Nederlandse voetballer droeg nummer 14 en gaf zijn naam aan een schijnbeweging.',
        antwoord: 'Johan Cruijff', accept: ['cruijff', 'cruyff', 'johan cruijff', 'johan cruyff'] },
      { niveau: 'gemiddeld', q: 'Deze Franse keizer werd klein afgeschilderd en verloor uiteindelijk bij Waterloo.',
        antwoord: 'Napoleon Bonaparte', accept: ['napoleon', 'napoleon bonaparte', 'bonaparte'] },
      { niveau: 'gemiddeld', q: 'Deze Belgische zangeres won het Eurovisiesongfestival op haar dertiende, en zei dat ze vijftien was.',
        antwoord: 'Sandra Kim', accept: ['sandra kim', 'kim'] },
      { niveau: 'gemiddeld', q: 'Deze Zwitserse tennisser won acht keer Wimbledon en stond bekend om zijn elegante backhand.',
        antwoord: 'Roger Federer', accept: ['federer', 'roger federer'] },
      { niveau: 'gemiddeld', q: 'Deze Griekse geleerde sprong volgens het verhaal uit zijn bad met een uitroep die iedereen kent.',
        antwoord: 'Archimedes', accept: ['archimedes'] },
      { niveau: 'gemiddeld', q: 'Deze Vlaamse schilder maakte in Gent een altaarstuk met een lam in het midden.',
        antwoord: 'Jan van Eyck', accept: ['van eyck', 'jan van eyck', 'eyck'] },
      { niveau: 'gemiddeld', q: 'Deze Amerikaanse popster droeg één witte handschoen en gleed achteruit over het podium.',
        antwoord: 'Michael Jackson', accept: ['michael jackson', 'jackson'] },
      { niveau: 'gemiddeld', q: 'Deze Britse stem begeleidt al decennia natuurdocumentaires over pinguïns en oerwouden.',
        antwoord: 'David Attenborough', accept: ['attenborough', 'david attenborough'] },
      { niveau: 'gemiddeld', q: 'Deze zakenman stuurt raketten de ruimte in, bouwt elektrische auto’s en kocht een sociaal netwerk.',
        antwoord: 'Elon Musk', accept: ['elon musk', 'musk'] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: 'Deze Servisch-Amerikaanse uitvinder droomde van draadloze stroom en gaf zijn naam aan een eenheid.',
        antwoord: 'Nikola Tesla', accept: ['tesla', 'nikola tesla'] },
      { niveau: 'moeilijk', q: 'Deze Vlaamse cartograaf uit Rupelmonde bedacht de kaartprojectie die nog altijd aan schoolmuren hangt.',
        antwoord: 'Gerardus Mercator', accept: ['mercator', 'gerardus mercator', 'gerard mercator'] },
      { niveau: 'moeilijk', q: 'Deze Duitse monnik spijkerde vijfennegentig stellingen op een kerkdeur.',
        antwoord: 'Maarten Luther', accept: ['luther', 'maarten luther', 'martin luther'] },
      { niveau: 'moeilijk', q: 'Deze Belgische instrumentbouwer uit Dinant gaf zijn naam aan een blaasinstrument.',
        antwoord: 'Adolphe Sax', accept: ['adolphe sax', 'sax'] },
      { niveau: 'moeilijk', q: 'Deze Hollywoodactrice uit de jaren veertig was ook uitvindster: haar techniek tegen het storen van radiosignalen ligt mee aan de basis van wifi.',
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
      { niveau: 'makkelijk', foto: 'pisa', plek: 'De scheve toren van Pisa', antwoord: 'Italië',
        accept: ['italie', 'italië', 'italy', 'italia'] },
      { niveau: 'makkelijk', foto: 'goldengate', plek: 'De Golden Gate Bridge in San Francisco', antwoord: 'Verenigde Staten',
        accept: ['amerika', 'verenigde staten', 'vs', 'usa', 'us', 'america', 'de verenigde staten'] },
      { niveau: 'makkelijk', foto: 'brugge', plek: 'De grachten van Brugge', antwoord: 'België',
        accept: ['belgie', 'belgië', 'belgium', 'belgique'] },
      { niveau: 'makkelijk', foto: 'towerbridge', plek: 'Tower Bridge over de Theems', antwoord: 'Verenigd Koninkrijk',
        accept: ['engeland', 'verenigd koninkrijk', 'uk', 'groot-brittannie', 'groot brittannie', 'groot-brittannië', 'england', 'britain'] },
      { niveau: 'makkelijk', foto: 'amsterdam', plek: 'De grachtenpanden van Amsterdam', antwoord: 'Nederland',
        accept: ['nederland', 'holland', 'the netherlands', 'netherlands'] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', foto: 'montsaintmichel', plek: 'De abdij van Mont-Saint-Michel', antwoord: 'Frankrijk',
        accept: ['frankrijk', 'france', 'frankijk'] },
      { niveau: 'gemiddeld', foto: 'neuschwanstein', plek: 'Kasteel Neuschwanstein in Beieren', antwoord: 'Duitsland',
        accept: ['duitsland', 'germany', 'deutschland', 'beieren'] },
      { niveau: 'gemiddeld', foto: 'akropolis', plek: 'Het Parthenon op de Akropolis', antwoord: 'Griekenland',
        accept: ['griekenland', 'greece', 'grieken'] },
      { niveau: 'gemiddeld', foto: 'alhambra', plek: 'Het Alhambra in Granada', antwoord: 'Spanje',
        accept: ['spanje', 'spain', 'espana', 'españa'] },
      { niveau: 'gemiddeld', foto: 'uluru', plek: 'Uluru in het rode hart van het land', antwoord: 'Australië',
        accept: ['australie', 'australië', 'australia'] },
      { niveau: 'gemiddeld', foto: 'niagara', plek: 'De Niagarawatervallen', antwoord: 'Canada',
        accept: ['canada'] },
      { niveau: 'gemiddeld', foto: 'fuji', plek: 'De berg Fuji achter een pagode', antwoord: 'Japan',
        accept: ['japan', 'nippon'] },
      { niveau: 'gemiddeld', foto: 'chinesemuur', plek: 'De Chinese Muur bij Mutianyu', antwoord: 'China',
        accept: ['china'] },
      { niveau: 'gemiddeld', foto: 'angkor', plek: 'De tempel van Angkor Wat', antwoord: 'Cambodja',
        accept: ['cambodja', 'cambodia', 'kambodja'] },
      { niveau: 'gemiddeld', foto: 'tafelberg', plek: 'De Tafelberg bij Kaapstad', antwoord: 'Zuid-Afrika',
        accept: ['zuid afrika', 'zuid-afrika', 'south africa', 'zuidafrika'] },
      { niveau: 'gemiddeld', foto: 'dubai', plek: 'De skyline van Dubai', antwoord: 'Verenigde Arabische Emiraten',
        accept: ['verenigde arabische emiraten', 'emiraten', 'vae', 'uae', 'dubai', 'arabische emiraten'] },
      { niveau: 'gemiddeld', foto: 'matterhorn', plek: 'De Matterhorn bij Zermatt', antwoord: 'Zwitserland',
        accept: ['zwitserland', 'switzerland', 'suisse', 'schweiz'] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', foto: 'bled', plek: 'Het eilandkerkje in het meer van Bled', antwoord: 'Slovenië',
        accept: ['slovenie', 'slovenië', 'slovenia'] },
      { niveau: 'moeilijk', foto: 'uyuni', plek: 'De zoutvlakte van Uyuni', antwoord: 'Bolivia',
        accept: ['bolivia'] },
      { niveau: 'moeilijk', foto: 'lofoten', plek: 'Het vissersdorp Reine op de Lofoten', antwoord: 'Noorwegen',
        accept: ['noorwegen', 'norway', 'norge'] },
      { niveau: 'moeilijk', foto: 'halong', plek: 'De rotseilanden van Ha Long Bay', antwoord: 'Vietnam',
        accept: ['vietnam', 'viet nam'] },
      { niveau: 'moeilijk', foto: 'bran', plek: 'Kasteel Bran in Transsylvanië', antwoord: 'Roemenië',
        accept: ['roemenie', 'roemenië', 'romania', 'transsylvanie'] },
      { niveau: 'moeilijk', foto: 'cinqueterre', plek: 'Manarola in de Cinque Terre', antwoord: 'Italië',
        accept: ['italie', 'italië', 'italy', 'italia'] },
      { niveau: 'moeilijk', foto: 'tallinn', plek: 'Het oude stadsplein van Tallinn', antwoord: 'Estland',
        accept: ['estland', 'estonia', 'eesti'] },
      { niveau: 'makkelijk', foto: 'stonehenge', plek: 'De steencirkel van Stonehenge', antwoord: 'Verenigd Koninkrijk',
        accept: ['engeland', 'verenigd koninkrijk', 'uk', 'groot-brittannie', 'groot brittannie', 'groot-brittannië', 'england', 'britain'] },
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
    regels: ['Kies uit vier betekenissen', '100 punten, plus tot 50 voor snelheid', 'Fout kost niets — gewoon durven gokken dus'],
    icoon: '🗣️',
    seconden: 25,
    perSpel: 10,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', woord: 'agua', taal: 'Spaans', opties: ['Vuur', 'Water', 'Lucht', 'Aarde'], antwoord: 1,
        weetje: 'Je herkent het in "aquarium".' },
      { niveau: 'makkelijk', woord: 'arigatō', taal: 'Japans', opties: ['Tot ziens', 'Dank je wel', 'Sorry', 'Goedemorgen'], antwoord: 1,
        weetje: 'Letterlijk iets als "dit is zeldzaam" — iets waar je dankbaar voor mag zijn.' },
      { niveau: 'makkelijk', woord: 'njet', taal: 'Russisch', opties: ['Ja', 'Nee', 'Straks', 'Altijd'], antwoord: 1,
        weetje: 'Het tegenovergestelde is "da".' },
      { niveau: 'makkelijk', woord: 'kalimera', taal: 'Grieks', opties: ['Goedenacht', 'Goedemorgen', 'Tot ziens', 'Proost'], antwoord: 1,
        weetje: 'Letterlijk "goede dag": kali is goed, mera is dag.' },
      { niveau: 'makkelijk', woord: 'gelato', taal: 'Italiaans', opties: ['IJs', 'Koek', 'Kaas', 'Soep'], antwoord: 0,
        weetje: 'Van "gelare", bevriezen.' },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', woord: 'gato', taal: 'Spaans', opties: ['Hond', 'Kat', 'Geit', 'Muis'], antwoord: 1,
        weetje: 'In het Italiaans wordt het gatto, in het Frans chat.' },
      { niveau: 'gemiddeld', woord: 'libro', taal: 'Italiaans', opties: ['Boek', 'Weegschaal', 'Vrijheid', 'Pond'], antwoord: 0,
        weetje: 'Van het Latijnse liber — vandaar ook "bibliotheek".' },
      { niveau: 'gemiddeld', woord: 'inu', taal: 'Japans', opties: ['Kat', 'Hond', 'Vogel', 'Vis'], antwoord: 1,
        weetje: 'De beroemdste is de shiba inu, het hondje van de internetgrappen.' },
      { niveau: 'gemiddeld', woord: 'mir', taal: 'Russisch', opties: ['Vrede', 'Oorlog', 'Berg', 'Water'], antwoord: 0,
        weetje: 'Hetzelfde woord betekent ook "wereld". Het ruimtestation heette er niet toevallig naar.' },
      { niveau: 'gemiddeld', woord: 'nero', taal: 'Italiaans', opties: ['Wit', 'Zwart', 'Rood', 'Blauw'], antwoord: 1,
        weetje: 'Vandaar "nero d’Avola", een donkere Siciliaanse wijn.' },
      { niveau: 'gemiddeld', woord: 'fuego', taal: 'Spaans', opties: ['Water', 'Vuur', 'Wind', 'Sneeuw'], antwoord: 1,
        weetje: 'Tierra del Fuego, Vuurland, is naar de vuren van de bewoners genoemd.' },
      { niveau: 'gemiddeld', woord: 'sakura', taal: 'Japans', opties: ['Kersenbloesem', 'Zonsopgang', 'Zwaard', 'Thee'], antwoord: 0,
        weetje: 'Het hele land volgt in het voorjaar waar de bloesem staat.' },
      { niveau: 'gemiddeld', woord: 'krasny', taal: 'Russisch', opties: ['Groen', 'Rood', 'Koud', 'Groot'], antwoord: 1,
        weetje: 'Vroeger betekende het ook "mooi" — het Rode Plein heette eerst het Mooie Plein.' },
      { niveau: 'gemiddeld', woord: 'nychta', taal: 'Grieks', opties: ['Nacht', 'Wolk', 'Nagel', 'Feest'], antwoord: 0,
        weetje: 'Verwant aan ons "nacht" en het Latijnse nox.' },
      { niveau: 'gemiddeld', woord: 'reloj', taal: 'Spaans', opties: ['Ring', 'Klok', 'Regel', 'Rivier'], antwoord: 1,
        weetje: 'Van het Latijnse horologium, "uuraanwijzer".' },
      { niveau: 'gemiddeld', woord: 'ame', taal: 'Japans', opties: ['Regen', 'Vriend', 'Berg', 'Zee'], antwoord: 0,
        weetje: 'Hetzelfde woord betekent met een andere toon ook snoep.' },
      { niveau: 'gemiddeld', woord: 'zima', taal: 'Russisch', opties: ['Zomer', 'Winter', 'Ochtend', 'Zaad'], antwoord: 1,
        weetje: 'Een woord dat in Rusland een half jaar meegaat.' },
      { niveau: 'gemiddeld', woord: 'agora', taal: 'Grieks', opties: ['Marktplein', 'Tempel', 'Haven', 'Berg'], antwoord: 0,
        weetje: 'Vandaar "agorafobie": angst voor open, drukke ruimtes.' },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', woord: 'natsukashii', taal: 'Japans', opties: ['Ondraaglijk warm', 'Warme herinnering', 'Volstrekt nieuw', 'Diep beschaamd'], antwoord: 1,
        weetje: 'Het fijne gevoel als iets je plots aan vroeger doet denken.' },
      { niveau: 'moeilijk', woord: 'duende', taal: 'Spaans', opties: ['Bezieling van een kunstenaar', 'Avondwandeling', 'Erfstuk', 'Schuld'], antwoord: 0,
        weetje: 'Wat flamenco van een nette voorstelling in iets onvergetelijks verandert.' },
      { niveau: 'moeilijk', woord: 'magari', taal: 'Italiaans', opties: ['Nooit meer', 'Was het maar waar', 'Op mijn kosten', 'Later'], antwoord: 1,
        weetje: 'Half verlangen, half berusting — heel Italiaans.' },
      { niveau: 'moeilijk', woord: 'philotimo', taal: 'Grieks', opties: ['Liefde voor geld', 'Eergevoel en gastvrijheid', 'Angst voor vreemden', 'Ochtendhumeur'], antwoord: 1,
        weetje: 'Grieken noemen het zelf onvertaalbaar: doen wat hoort, omdat het hoort.' },
      { niveau: 'moeilijk', woord: 'avos', taal: 'Russisch', opties: ['Vertrouwen op geluk', 'Strenge regel', 'Late lente', 'Oude schuld'], antwoord: 0,
        weetje: 'Het maar doen en hopen dat het goed komt.' },
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
      { niveau: 'makkelijk', q: 'Hoeveel tanden heeft een volwassen mens, verstandskiezen meegerekend?', antwoord: 32, eenheid: 'tanden',
        weetje: 'Tweeëndertig met de verstandskiezen erbij, al worden die bij veel mensen getrokken of komen ze nooit door. Als kind heb je er twintig, en die wissel je allemaal.' },
      { niveau: 'makkelijk', q: 'Hoeveel minuten zitten er in een week?', antwoord: 10080, eenheid: 'minuten',
        weetje: 'Zeven dagen van 24 uur van 60 minuten: 10.080. Handig om te weten hoe weinig een uur eigenlijk voorstelt in een week.' },
      { niveau: 'makkelijk', q: 'Hoeveel landen zijn er lid van de Verenigde Naties?', antwoord: 193, eenheid: 'landen',
        weetje: 'Honderddrieënnegentig lidstaten. Vaticaanstad is bewust geen lid maar wel waarnemer, net als Palestina. Zuid-Soedan was in 2011 het jongste land dat erbij kwam.' },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: 'Hoeveel seconden doet zonlicht erover om de aarde te bereiken?', antwoord: 500, eenheid: 'seconden',
        weetje: 'Ongeveer 500 seconden, ruim acht minuten. Je ziet de zon dus altijd zoals ze acht minuten geleden was — zou ze nu uitdoven, dan merkten we dat pas na het avondeten.' },
      { niveau: 'gemiddeld', q: 'Hoeveel haren heeft een mens gemiddeld op zijn hoofd?', antwoord: 100000, eenheid: 'haren',
        weetje: 'Rond de honderdduizend haren, afhankelijk van je haarkleur: roodharigen hebben er het minst, blondines het meest. Je verliest er elke dag zo’n vijftig tot honderd, en dat is volkomen normaal.' },
      { niveau: 'gemiddeld', q: 'Hoe diep is het diepste punt van de oceaan, in meter?', antwoord: 11000, eenheid: 'meter',
        weetje: 'De Marianentrog in de Stille Oceaan gaat bijna elfduizend meter diep. Zet je de Mount Everest erin, dan blijft er nog ruim twee kilometer water boven de top staan.' },
      { niveau: 'gemiddeld', q: 'In welk jaar werd de eerste Ronde van Frankrijk gereden?', antwoord: 1903, eenheid: '',
        weetje: 'De eerste Tour werd in 1903 georganiseerd door een sportkrant die meer exemplaren wilde slijten. Zestig renners startten, eenentwintig haalden Parijs — sommige etappes waren meer dan 400 kilometer lang.' },
      { niveau: 'gemiddeld', q: 'Hoeveel kilo weegt een volwassen blauwe vinvis, in kilo?', antwoord: 150000, eenheid: 'kilo',
        weetje: 'Zo’n honderdvijftig ton, het zwaarste dier dat ooit geleefd heeft — zwaarder dan eender welke dinosauriër. Zijn hart alleen al weegt ongeveer evenveel als een kleine auto.' },
      { niveau: 'gemiddeld', q: 'Hoeveel liter lucht adem je op een dag in?', antwoord: 11000, eenheid: 'liter',
        weetje: 'Ongeveer elfduizend liter lucht per dag, verdeeld over een stuk of twintigduizend ademhalingen — en je denkt er geen enkele keer bij na.' },
      { niveau: 'gemiddeld', q: 'Hoeveel kilometer rijdt een Belg gemiddeld per jaar met de auto?', antwoord: 15000, eenheid: 'kilometer',
        weetje: 'Rond de vijftienduizend kilometer per jaar, goed voor bijna drie keer de afstand Brussel-Moskou heen en terug. Dat cijfer daalt al enkele jaren licht.' },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: 'Hoeveel miljoen jaar geleden stierven de dinosauriërs uit?', antwoord: 66, eenheid: 'miljoen jaar',
        weetje: 'Zesenzestig miljoen jaar geleden, na de inslag van een planetoïde bij het huidige Mexico. Niet alle dinosauriërs verdwenen trouwens: de vogels in je tuin zijn hun rechtstreekse nakomelingen.' },
      { niveau: 'moeilijk', q: 'Hoeveel kilometer is de omtrek van de aarde langs de evenaar?', antwoord: 40075, eenheid: 'kilometer',
        weetje: '40.075 kilometer langs de evenaar. Dat ronde getal is geen toeval: de meter werd ooit gedefinieerd als een tienmiljoenste van de afstand van de evenaar tot de noordpool.' },
      { niveau: 'moeilijk', q: 'Hoeveel liter bloed pompt een hart per dag rond?', antwoord: 7000, eenheid: 'liter',
        weetje: 'Zo’n zevenduizend liter per dag, met ongeveer honderdduizend hartslagen. In een gemiddeld mensenleven komt dat neer op meer dan twee miljard keer kloppen.' },
      { niveau: 'moeilijk', q: 'Hoeveel miljoen jaar oud is de aarde?', antwoord: 4540, eenheid: 'miljoen jaar',
        weetje: '4,54 miljard jaar, met een marge van ongeveer een procent — bepaald door de ouderdom van meteorieten te meten. Leven ontstond er al vrij snel na, maar bleef miljarden jaren eencellig.' },
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
      { niveau: 'makkelijk', q: '🕷️🧑', antwoord: 'Spider-Man', accept: ['spiderman', 'spider man', 'spider-man'] },
      { niveau: 'makkelijk', q: '🧊🦣🐿️', antwoord: 'Ice Age', accept: ['ice age', 'ijstijd'] },
      { niveau: 'makkelijk', q: '🚗🏁⚡', antwoord: 'Cars', accept: ['cars'] },
      { niveau: 'makkelijk', q: '👸🍎🧙‍♀️', antwoord: 'Sneeuwwitje', accept: ['sneeuwwitje', 'snow white'] },
      { niveau: 'makkelijk', q: '🦈🌊😱', antwoord: 'Jaws', accept: ['jaws', 'de witte haai'] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: '🎩🐰⏰', antwoord: 'Alice in Wonderland', accept: ['alice in wonderland', 'alice'] },
      { niveau: 'gemiddeld', q: '🚢🏴‍☠️💀', antwoord: 'Pirates of the Caribbean', accept: ['pirates of the caribbean', 'pirates', 'piraten van de caraiben'] },
      { niveau: 'gemiddeld', q: '🦍🏙️✈️', antwoord: 'King Kong', accept: ['king kong', 'kingkong'] },
      { niveau: 'gemiddeld', q: '👨‍🚀🔴🥔', antwoord: 'The Martian', accept: ['the martian', 'martian'] },
      { niveau: 'gemiddeld', q: '🐘🎪👂', antwoord: 'Dumbo', accept: ['dumbo'] },
      { niveau: 'gemiddeld', q: '🥊🇺🇸🏃', antwoord: 'Rocky', accept: ['rocky'] },
      { niveau: 'gemiddeld', q: '🧅👹🐴', antwoord: 'Shrek', accept: ['shrek'] },
      { niveau: 'gemiddeld', q: '🧞‍♂️🪔🐒', antwoord: 'Aladdin', accept: ['aladdin', 'aladin'] },
      { niveau: 'gemiddeld', q: '💀🎸🇲🇽', antwoord: 'Coco', accept: ['coco'] },
      { niveau: 'gemiddeld', q: '🦁🦓🌴', antwoord: 'Madagascar', accept: ['madagascar', 'madagaskar'] },
      { niveau: 'gemiddeld', q: '👧⚔️🐉', antwoord: 'Mulan', accept: ['mulan'] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: '🐳⛵🧔', antwoord: 'Moby Dick', accept: ['moby dick', 'mobydick'] },
      { niveau: 'moeilijk', q: '🏹🔥🕊️', antwoord: 'The Hunger Games', accept: ['hunger games', 'the hunger games'] },
      { niveau: 'moeilijk', q: '🧠😢😡😨', antwoord: 'Inside Out', accept: ['inside out', 'binnenstebuiten'] },
      { niveau: 'moeilijk', q: '🌪️🏠👠', antwoord: 'The Wizard of Oz', accept: ['wizard of oz', 'the wizard of oz', 'de tovenaar van oz', 'oz'] },
      { niveau: 'moeilijk', q: '🍕🐢🥷', antwoord: 'Teenage Mutant Ninja Turtles', accept: ['ninja turtles', 'teenage mutant ninja turtles', 'turtles'] },
      { niveau: 'moeilijk', q: '⚔️🏛️🦁', antwoord: 'Gladiator', accept: ['gladiator'] },
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
      { niveau: 'makkelijk', foto: 'aardbei', antwoord: 'Een aardbei', accept: ['aardbei', 'aardbeien', 'strawberry'] },
      { niveau: 'makkelijk', foto: 'banaan', antwoord: 'Bananen', accept: ['banaan', 'bananen', 'banana'] },
      { niveau: 'makkelijk', foto: 'potloden', antwoord: 'Kleurpotloden', accept: ['potlood', 'potloden', 'kleurpotloden', 'kleurpotlood', 'pencil'] },
      { niveau: 'makkelijk', foto: 'popcorn', antwoord: 'Popcorn', accept: ['popcorn', 'mais', 'maïs'] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', foto: 'sleutels', antwoord: 'Een slot met sleutels', accept: ['sleutel', 'sleutels', 'slot', 'hangslot', 'key'] },
      { niveau: 'gemiddeld', foto: 'knikkers', antwoord: 'Knikkers', accept: ['knikker', 'knikkers', 'marbles', 'glazen bollen'] },
      { niveau: 'gemiddeld', foto: 'koffiebonen', antwoord: 'Koffiebonen', accept: ['koffie', 'koffieboon', 'koffiebonen', 'coffee'] },
      { niveau: 'gemiddeld', foto: 'spaghetti', antwoord: 'Spaghetti', accept: ['spaghetti', 'pasta', 'noedels'] },
      { niveau: 'gemiddeld', foto: 'kurk', antwoord: 'Een kurk', accept: ['kurk', 'kurken', 'cork', 'flessenkurk'] },
      { niveau: 'gemiddeld', foto: 'horloge', antwoord: 'Het binnenwerk van een klok', accept: ['klok', 'horloge', 'uurwerk', 'wekker', 'veer', 'binnenwerk'] },
      { niveau: 'gemiddeld', foto: 'broccoli', antwoord: 'Romanesco', accept: ['broccoli', 'romanesco', 'bloemkool', 'kool'] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', foto: 'bubbeltjes', antwoord: 'Bubbeltjesplastic', accept: ['bubbeltjesplastic', 'noppenfolie', 'bubbelplastic', 'bubbels', 'bubble wrap', 'plastic'] },
      { niveau: 'moeilijk', foto: 'boomschors', antwoord: 'Boomschors', accept: ['schors', 'boomschors', 'bast', 'boom', 'stam'] },
      { niveau: 'moeilijk', foto: 'mos', antwoord: 'Mos', accept: ['mos', 'blad', 'moss'] },
      { niveau: 'moeilijk', foto: 'zeepbel', antwoord: 'Een zeepbel', accept: ['zeepbel', 'bel', 'bellenblaas', 'bubble'] },
      { niveau: 'moeilijk', foto: 'paardenbloem', antwoord: 'Een paardenbloem', accept: ['paardenbloem', 'pluizenbol', 'pluisbol', 'dandelion'] },
    ],
  },

  /* ================================================================ *
   * RONDE 9 — Tekenen
   * ================================================================ *
   * Bewust korte, enkelvoudige onderwerpen: op een gsm-scherm is weinig
   * plaats, en een hele scène tekenen op een doekje van zeven centimeter
   * werkt niet.                                                        */
  {
    id: 'tekenen',
    type: 'tekenen',
    naam: 'Ronde 9 — Tekenen maar',
    uitleg: 'Eén team tekent op zijn gsm, de tekening verschijnt live op het groot scherm.',
    regels: ['Eén woord, dus hou het simpel', 'Geen letters of cijfers tekenen', 'De tekenaar krijgt 60 punten per team dat het raadt'],
    icoon: '🎨',
    seconden: 75,
    perSpel: 6,
    vragen: [
      /* --- makkelijk --- */
      { niveau: 'makkelijk', q: 'Een huis', sleutelwoorden: [['huis', 'woning']] },
      { niveau: 'makkelijk', q: 'Een boom', sleutelwoorden: [['boom']] },
      { niveau: 'makkelijk', q: 'Een kat', sleutelwoorden: [['kat', 'poes']] },
      { niveau: 'makkelijk', q: 'De zon', sleutelwoorden: [['zon']] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: 'Een raket', sleutelwoorden: [['raket']] },
      { niveau: 'gemiddeld', q: 'Een paraplu', sleutelwoorden: [['paraplu', 'regenscherm']] },
      { niveau: 'gemiddeld', q: 'Een sleutel', sleutelwoorden: [['sleutel']] },
      { niveau: 'gemiddeld', q: 'Een taart', sleutelwoorden: [['taart', 'cake']] },
      { niveau: 'gemiddeld', q: 'Een spin', sleutelwoorden: [['spin']] },
      { niveau: 'gemiddeld', q: 'Een kroon', sleutelwoorden: [['kroon']] },
      { niveau: 'gemiddeld', q: 'Een boot', sleutelwoorden: [['boot', 'schip', 'zeilboot']] },
      { niveau: 'gemiddeld', q: 'Een ladder', sleutelwoorden: [['ladder']] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: 'Een vuurtoren', sleutelwoorden: [['vuurtoren']] },
      { niveau: 'moeilijk', q: 'Een octopus', sleutelwoorden: [['octopus', 'inktvis']] },
      { niveau: 'moeilijk', q: 'Een parachute', sleutelwoorden: [['parachute', 'valscherm']] },
      { niveau: 'moeilijk', q: 'Een windmolen', sleutelwoorden: [['windmolen', 'molen']] },
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
      { niveau: 'makkelijk', q: 'Slapen', sleutelwoorden: [['slapen', 'slaap', 'dutten']] },
      { niveau: 'makkelijk', q: 'Zwemmen', sleutelwoorden: [['zwemmen', 'zwem']] },
      { niveau: 'makkelijk', q: 'Fietsen', sleutelwoorden: [['fietsen', 'fiets', 'velo']] },
      { niveau: 'makkelijk', q: 'Eten met stokjes', sleutelwoorden: [['stokjes', 'chinees', 'sushi', 'eetstokjes']] },

      /* --- gemiddeld --- */
      { niveau: 'gemiddeld', q: 'Een muur schilderen', sleutelwoorden: [['schilderen', 'verven', 'muur']] },
      { niveau: 'gemiddeld', q: 'Golfen', sleutelwoorden: [['golf', 'golfen']] },
      { niveau: 'gemiddeld', q: 'Stofzuigen', sleutelwoorden: [['stofzuigen', 'stofzuiger']] },
      { niveau: 'gemiddeld', q: 'Een ei bakken', sleutelwoorden: [['ei', 'eieren', 'bakken', 'spiegelei']] },
      { niveau: 'gemiddeld', q: 'Op een trampoline springen', sleutelwoorden: [['trampoline', 'springen']] },
      { niveau: 'gemiddeld', q: 'Een brief schrijven', sleutelwoorden: [['brief', 'schrijven', 'post']] },
      { niveau: 'gemiddeld', q: 'Bergbeklimmen', sleutelwoorden: [['bergbeklimmen', 'klimmen', 'berg', 'klim']] },
      { niveau: 'gemiddeld', q: 'Een hond uitlaten die hard trekt', sleutelwoorden: [['hond'], ['uitlaten', 'trekt', 'trekken', 'wandelen', 'riem']] },
      { niveau: 'gemiddeld', q: 'Een auto wassen', sleutelwoorden: [['auto', 'wagen'], ['wassen', 'poetsen', 'kuisen']] },

      /* --- moeilijk --- */
      { niveau: 'moeilijk', q: 'Strijken', sleutelwoorden: [['strijken', 'strijkijzer', 'strijkplank']] },
      { niveau: 'moeilijk', q: 'Yoga doen', sleutelwoorden: [['yoga', 'mediteren', 'meditatie']] },
      { niveau: 'moeilijk', q: 'Een tent opzetten', sleutelwoorden: [['tent', 'kamperen', 'camping']] },
      { niveau: 'moeilijk', q: 'Jongleren', sleutelwoorden: [['jongleren', 'jongleur', 'ballen']] },
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
