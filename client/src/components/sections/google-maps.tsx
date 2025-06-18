import { Button } from "@/components/ui/button";

export default function GoogleMaps() {
  return (
    <section id="contact" className="py-20 bg-cream rose-bg-subtle">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-brown-primary mb-4">Localisation</h2>
          <p className="text-brown-dark text-lg max-w-2xl mx-auto">
            Trouvez-nous facilement à Punaauia, PK18 face au Carlton Plage
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg overflow-hidden rose-glow p-8 text-center">
          <div className="flex flex-col items-center space-y-6">
            <div className="text-5xl mb-4">
              🌍
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-brown-primary mb-2">Voir notre emplacement sur Google Maps</h3>
              <p className="text-brown-dark mb-6">Cliquez pour ouvrir notre localisation exacte et obtenir un itinéraire</p>
              <Button asChild className="bg-brown-primary text-cream hover:bg-brown-dark rounded-full px-8 py-3">
                <a 
                  href="https://www.google.com/maps/place/Institut+coiffure+d%C3%B4me+Maitai+Beauty/@-17.6565559,-149.5994659,17z/data=!3m1!4b1!4m6!3m5!1s0x769a33134447f103:0x7529e166dadf41f!8m2!3d-17.656561!4d-149.596891!16s%2Fg%2F11smh2053t?hl=fr&entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2"
                >
                  <span>Ouvrir dans Google Maps</span>
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 p-8 bg-brown-light bg-opacity-20 rounded-3xl">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div>
              <h3 className="text-2xl font-semibold text-brown-primary mb-2">Adresse Exacte</h3>
              <p className="text-brown-dark">3366 Pk18, Côté montagne<br/>Punaauia 98703, Polynésie française<br/>En face du Carlton Plage</p>
            </div>
            <div className="mt-4 md:mt-0">
              <Button asChild className="bg-brown-primary text-cream hover:bg-brown-dark rounded-full">
                <a 
                  href="https://www.google.com/maps/place/Institut+coiffure+d%C3%B4me+Maitai+Beauty/@-17.6565559,-149.5994659,17z/data=!3m1!4b1!4m6!3m5!1s0x769a33134447f103:0x7529e166dadf41f!8m2!3d-17.656561!4d-149.596891!16s%2Fg%2F11smh2053t?hl=fr&entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2"
                >
                  <span>Itinéraire</span>
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}