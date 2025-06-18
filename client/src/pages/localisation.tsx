import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/navigation/header";
import Footer from "@/components/sections/footer";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { BusinessInfo } from "@shared/schema";

export default function Localisation() {
  // Fetch business info for phone number and address
  const { data: businessInfo } = useQuery<BusinessInfo>({
    queryKey: ['/api/business-info'],
  });

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      {/* Header Section */}
      <section className="py-20 bg-gradient-to-br from-brown-primary via-brown-dark to-brown-primary relative">
        <div className="container mx-auto px-4 text-center">
          {/* Back Button */}
          <div className="absolute top-8 left-8">
            <Link href="/">
              <motion.div
                className="flex items-center space-x-2 text-cream hover:text-brown-light transition-colors cursor-pointer"
                whileHover={{ scale: 1.05, x: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
                </svg>
                <span className="font-medium">Retour</span>
              </motion.div>
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-cream mb-6">Notre Localisation</h1>
          <p className="text-xl text-brown-light max-w-2xl mx-auto">
            Facilement accessible à Punaauia, PK18 en face du Carlton Plage
          </p>
        </div>
      </section>

      {/* Map Link Section */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-lg overflow-hidden p-8 text-center rose-glow">
            <div className="flex flex-col items-center space-y-6">
              <div className="text-6xl mb-4">
                🌍
              </div>
              <div>
                <h3 className="text-3xl font-semibold text-brown-primary mb-2">Voir notre emplacement sur Google Maps</h3>
                <p className="text-brown-dark mb-6">Cliquez pour ouvrir notre localisation exacte et obtenir un itinéraire</p>
                <Button asChild className="bg-brown-primary text-cream hover:bg-brown-dark rounded-full px-8 py-4 text-lg">
                  <a 
                    href="https://www.google.com/maps/place/Institut+coiffure+d%C3%B4me+Maitai+Beauty/@-17.6565559,-149.5994659,17z/data=!3m1!4b1!4m6!3m5!1s0x769a33134447f103:0x7529e166dadf41f!8m2!3d-17.656561!4d-149.596891!16s%2Fg%2F11smh2053t?hl=fr&entry=ttu&g_ep=EgoyMDI1MDYxMS4wIKXMDSoASAFQAw%3D%3D" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center space-x-3"
                  >
                    <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"/>
                    </svg>
                    <span>Ouvrir Google Maps</span>
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Details */}
      <section className="py-16 bg-brown-light bg-opacity-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Address Card */}
            <Card className="bg-cream rounded-3xl shadow-lg border-0 rose-glow">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-4xl mb-6">
                    <div className="w-16 h-16 bg-brown-primary rounded-full flex items-center justify-center mx-auto">
                      <svg className="w-8 h-8 text-cream" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-brown-primary mb-4">Adresse Exacte</h3>
                  <div className="space-y-2 text-brown-dark">
                    <p className="text-lg font-semibold">{businessInfo?.address || "Punaauia, PK18"}</p>
                    <p>En face du Carlton Plage</p>
                    <p>Servitude Hopuare 4</p>
                    <p className="text-sm text-brown-primary mt-4">Tahiti, Polynésie Française</p>
                  </div>

                </div>
              </CardContent>
            </Card>

            {/* Access Info */}
            <Card className="bg-cream rounded-3xl shadow-lg border-0 rose-glow">
              <CardContent className="p-8">
                <div className="text-center">
                  <div className="text-4xl text-pink-accent mb-6">
                    <div className="w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mx-auto">
                      <div className="text-white text-3xl font-bold">🚗</div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-semibold text-brown-primary mb-4">Accès & Stationnement</h3>
                  <div className="space-y-4 text-brown-dark">
                    <div>
                      <h4 className="font-semibold text-brown-primary">En voiture</h4>
                      <p className="text-sm">Parking gratuit disponible sur place</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brown-primary">Transports en commun</h4>
                      <p className="text-sm">Arrêt de bus à proximité (PK18)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-brown-primary">Repère</h4>
                      <p className="text-sm">Face au Carlton Plage, facilement reconnaissable</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-cream">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-brown-primary mb-4">Vous avez des questions ?</h2>
            <p className="text-lg text-brown-dark">N'hésitez pas à nous contacter pour plus d'informations</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <Card className="bg-brown-primary rounded-3xl shadow-lg border-0 rose-glow">
              <CardContent className="p-6 text-center">
                <div className="text-3xl text-cream mb-4">
                  <div className="w-12 h-12 bg-cream rounded-full mx-auto flex items-center justify-center">
                    <svg className="w-6 h-6 text-brown-primary" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-cream mb-2">Téléphone</h4>
                <a href={`tel:${businessInfo?.phone?.replace(/\s+/g, '') || '40575286'}`} className="text-brown-light hover:text-cream transition-colors">
                  {businessInfo?.phone || "40 57 52 86"}
                </a>
              </CardContent>
            </Card>
            
            <Card className="bg-pink-accent rounded-3xl shadow-lg border-0 rose-glow">
              <CardContent className="p-6 text-center">
                <div className="text-3xl text-brown-dark mb-4">
                  <div className="w-12 h-12 bg-brown-dark rounded-full mx-auto flex items-center justify-center">
                    <svg className="w-6 h-6 text-pink-accent" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </div>
                </div>
                <h4 className="text-xl font-semibold text-brown-dark mb-2">Email</h4>
                <a 
                  href={`mailto:${businessInfo?.email || 'info@maitai-beauty-tahiti.com'}`}
                  className="text-brown-primary hover:text-brown-dark transition-colors text-sm"
                >
                  {businessInfo?.email || "info@maitai-beauty-tahiti.com"}
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}