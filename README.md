# De Grote Familiequiz

Tien rondes op het groot scherm, iedereen antwoordt op zijn eigen gsm.
Gemaakt voor een gemengd gezelschap: geen pub-quizniveau, wel veel variatie.

## Zo speel je

1. Jij opent de startpagina op de laptop die aan de tv of beamer hangt en
   klikt **Nieuwe quiz starten**.
2. Op het scherm verschijnt een QR-code en een code van vier tekens.
   Iedereen scant of surft naar het adres en tikt de code in.
3. Spelers maken een team of sluiten aan bij een bestaand team.
   Zet gerust een kind bij een volwassene.
4. Jij drukt op **spatie** (of de knop *Verder*) om telkens een stap
   vooruit te gaan: ronde-intro → vraag → antwoord → volgende vraag.
   Met **pijltje links** ga je een stap terug als je te snel was; de
   punten van die vraag worden dan netjes teruggedraaid.

Reken op anderhalf à twee uur voor de volle tien rondes.
Te lang? Verwijder een ronde uit `lib/quiz-data.js`, de rest past zich aan.

## De rondes

| # | Ronde | Wat het is |
|---|-------|------------|
| 1 | Van alles wat | Meerkeuze, gemengde thema's |
| 2 | Waar of niet waar | Snelvuur, twee knoppen |
| 3 | Wie ben ik? | Cryptische omschrijvingen van bekende mensen |
| 4 | Waar ter wereld? | Herkenbare plek op het scherm, tik het land in |
| 5 | Wat betekent dat? | Woord uit het Grieks, Spaans, Italiaans, Japans of Russisch |
| 6 | Hoeveel denk je? | Schatvragen — dichtste bij wint, iedereen scoort iets |
| 7 | Emoji-films | Film raden uit emoji's |
| 8 | Uitzoomen | Beeld zoomt traag open, hoe sneller je raadt hoe meer punten |
| 9 | Tekenen maar | Eén team tekent op de gsm, de rest raadt |
| 10 | Uitbeelden | Eén speler beeldt uit, de rest raadt |

Na de rondes 2, 4, 6 en 8 verschijnt een tussenstand. Op het einde een podium.

### Punten

* Gewone vragen: 100 punten, plus tot 50 bonus als je snel bent.
* Waar/niet waar: 60 punten (want fiftyfifty).
* Schatvragen: 120 / 90 / 70 / 50 naar hoe dicht je zit, en 30 voor de rest.
  Exact juist geeft 50 extra.
* Uitzoomen: 150 punten die zakken naar 60 naarmate het beeld opengaat.
* Tekenen en uitbeelden: de raders krijgen 150 / 110 / 80, en het team dat
  tekent of uitbeeldt krijgt **60 per team dat het geraden heeft**.

## Zelf aanpassen

Alle vragen staan in [`lib/quiz-data.js`](lib/quiz-data.js). Een vraag
bijzetten is een buur kopiëren en aanpassen. Bij open vragen is `answer`
wat op het scherm komt en `accept` de lijst alternatieven; typfouten
worden sowieso vergeven, dus je hoeft niet elke schrijfwijze te bedenken.

De tekeningen staan in [`lib/art.js`](lib/art.js) — allemaal in code, dus
geen foto's die je moet zoeken en niets dat offline kan vallen. Open
`tekeningen-overzicht.html` in je browser om ze allemaal naast elkaar te
zien.

## Lokaal draaien

```bash
node server.mjs
```

Dan staat het op `http://localhost:3000`. De terminal toont ook het adres
op je eigen netwerk, zodat je met een echte gsm op dezelfde wifi kan
testen. Lokaal wordt het spel in het geheugen bewaard: herstart je de
server, dan is de quiz weg. Prima om te testen.

## Online zetten (Vercel)

De quiz heeft online een klein stukje opslag nodig, omdat elke aanvraag
op een andere machine kan belanden. Eenmalig instellen:

1. Ga naar [vercel.com/new](https://vercel.com/new) en importeer de repo
   `Koebene/Familyquizardeche`. Alle instellingen mogen op de standaard
   blijven staan — er is geen build-stap.
2. Open daarna het project → tabblad **Storage** → **Upstash Redis**
   toevoegen. Het gratis plan volstaat ruimschoots: een avond quizzen
   kost er maar een fractie van.
3. Vercel zet zelf `KV_REST_API_URL` en `KV_REST_API_TOKEN` klaar.
   Deploy daarna nog één keer opnieuw, want omgevingsvariabelen worden
   pas bij een nieuwe deploy opgepikt (tabblad **Deployments** →
   *Redeploy* bij de bovenste).

Vergeet je stap 2, dan zegt de app dat meteen in plaats van halverwege de
quiz om te vallen.

Vanaf dan deployt elke `git push` vanzelf. Zet je er later vragen bij,
dan staat dat binnen de minuut online.

Een quiz blijft twaalf uur bewaard en verdwijnt daarna vanzelf.

## Hoe het in elkaar zit

Geen build-stap, geen framework. Statische bestanden in `public/` en één
serverless functie in `api/`.

```
public/    index.html, host.html (groot scherm), mee.html (gsm),
           stijl.css, host.js, mee.js, qr.js
api/       spel.js — het enige eindpunt
lib/       engine.js   spelregels, fases en punten
           quiz-data.js alle vragen
           art.js       alle tekeningen
           store.js     Redis, met geheugen als terugval
server.mjs lokale server; op Vercel niet gebruikt
```

De server houdt als enige de stand bij; de schermen vragen elke één à twee
seconden wat de situatie is. Geen websockets, dus niets dat stilvalt als
een gsm even in slaap valt of van wifi naar 4G springt.

De QR-code wordt in de browser zelf berekend (`public/qr.js`), zonder
externe dienst.

## Wat je best even test vóór het feest

* **Scan de QR-code één keer met je eigen gsm.** De generator is getest
  tegen de referentiewaarden uit de QR-standaard, maar een echte scan is
  een echte scan.
* Loop met twee toestellen een ronde of drie door, zodat je de knoppen in
  de vingers hebt.
* Zet de browser op het groot scherm in volledig scherm (**F11**).
