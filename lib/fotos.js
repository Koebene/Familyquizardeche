// De foto's van de beeldrondes, met hun herkomst.
//
// Allemaal vrij gelicentieerd materiaal van Wikimedia Commons. De maker
// en de licentie verschijnen klein in beeld bij het antwoord, want dat
// hoort erbij en het kost niets.
//
// Dit bestand wordt gegenereerd uit public/fotos/bronnen.json.

export const FOTOS = {
  atomium: { bestand: "/fotos/atomium.jpg", maker: "Marek Śliwecki", licentie: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Brussels_-_Atomium_2022.jpg" },
  eiffel: { bestand: "/fotos/eiffel.jpg", maker: "Tristan Nitot", licentie: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Tour%20eiffel%20at%20sunrise%20from%20the%20trocadero.jpg" },
  bigben: { bestand: "/fotos/bigben.jpg", maker: "Dave Bezaire", licentie: "CC BY-SA 2.0", pagina: "https://commons.wikimedia.org/wiki/File:Elizabeth_Tower%2C_June_2022.jpg" },
  gizeh: { bestand: "/fotos/gizeh.jpg", maker: "Hesham Ebaid", licentie: "CC0", pagina: "https://commons.wikimedia.org/wiki/File:Sphinx_with_the_third_pyramid.jpg" },
  santorini: { bestand: "/fotos/santorini.jpg", maker: "TomasEE", licentie: "CC BY 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Oia_sunset_-_panoramio_(2).jpg" },
  sagrada: { bestand: "/fotos/sagrada.jpg", maker: "Canaan", licentie: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:SF_maig_2_cropped.jpg" },
  christus: { bestand: "/fotos/christus.jpg", maker: "Arne Müseler", licentie: "CC BY-SA 3.0 de", pagina: "https://commons.wikimedia.org/wiki/File:Christ_the_Redeemer_-_Cristo_Redentor.jpg" },
  tajmahal: { bestand: "/fotos/tajmahal.jpg", maker: "Yann; edited by Jim Carter", licentie: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Taj_Mahal_(Edited).jpeg" },
  voetbal: { bestand: "/fotos/voetbal.jpg", maker: "Илья Яковлев", licentie: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Football%20ball.jpg" },
  paraplu: { bestand: "/fotos/paraplu.jpg", maker: "CEphoto, Uwe Aranas", licentie: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Malacca%20Malaysia%20Colourful-Two-ladies-with-umbrellas-01.jpg" },
  gitaar: { bestand: "/fotos/gitaar.jpg", maker: "Manfred Werner - Tsui", licentie: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Harri%20Stojka%2030.08.2008c.jpg" },
  zonnebloem: { bestand: "/fotos/zonnebloem.jpg", maker: "LubGua987", licentie: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Close-up%20photographs%20of%20sunflowers%20in%20Bulacan%2002.jpg" },
  colosseum: { bestand: "/fotos/colosseum.jpg", maker: "Nicholas Gemini", licentie: "CC BY-SA 4.0", pagina: "https://commons.wikimedia.org/wiki/File:Exterior%20of%20the%20Colosseum%2003.jpg" },
  kinderdijk: { bestand: "/fotos/kinderdijk.jpg", maker: "Lucas Hirschegger", licentie: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:KinderdijkMolens02.jpg" },
  vrijheidsbeeld: { bestand: "/fotos/vrijheidsbeeld.jpg", maker: "Daniel Schwen", licentie: "Public domain", pagina: "https://commons.wikimedia.org/wiki/File:Statue%20of%20Liberty%20frontal%202.jpg" },
  brandenburger: { bestand: "/fotos/brandenburger.jpg", maker: "א (Aleph) Creator: Johann Gottfried Schadow", licentie: "CC BY-SA 2.5", pagina: "https://commons.wikimedia.org/wiki/File:Brandenburg%20Gate%20Quadriga%20at%20Night.jpg" },
  frieten: { bestand: "/fotos/frieten.jpg", maker: "Jon Åslund", licentie: "CC BY 2.0", pagina: "https://commons.wikimedia.org/wiki/File:Frituur%20fries%20frikandel%20mayo%20curry%20ketchup.jpg" },
  fiets: { bestand: "/fotos/fiets.jpg", maker: "Jason Zhang", licentie: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Bike%20Share%20Toronto%20bicycle%20at%20Yonge%20and%20Lake%20Shore%20kiosk.jpg" },
  ijsje: { bestand: "/fotos/ijsje.jpg", maker: "Aaron", licentie: "CC BY 2.0", pagina: "https://commons.wikimedia.org/wiki/File:Gelato%20Cones%20(Florence).jpg" },
  schaakstuk: { bestand: "/fotos/schaakstuk.jpg", maker: "Jorge Royan", licentie: "CC BY-SA 3.0", pagina: "https://commons.wikimedia.org/wiki/File:Paris%20-%20Playing%20chess%20at%20the%20Jardins%20du%20Luxembourg%20-%202966.jpg" },
};

export function getFoto(sleutel) {
  return FOTOS[sleutel] || null;
}
