import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar, MapPin, Phone } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { useQuery } from "@tanstack/react-query";
import type { BusinessInfo } from "@shared/schema";

export default function ContactInfo() {
  const { data: businessInfo } = useQuery<BusinessInfo>({
    queryKey: ['/api/business-info'],
  });
  return (
    <section id="contact" className="py-20 bg-brown-light bg-opacity-20 rose-bg-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brown-primary mb-6 section-title-gradient">Informations Pratiques</h2>
          <p className="text-lg text-brown-dark max-w-2xl mx-auto">
            Tout ce que vous devez savoir pour planifier votre visite
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Hours Card */}
          <Card className="bg-cream rounded-3xl shadow-lg border-0 rose-glow">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">
                <div className="w-16 h-16 bg-brown-primary rounded-full flex items-center justify-center mx-auto">
                  <Clock className="w-8 h-8 text-cream" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-brown-primary mb-4">Horaires</h3>
              <div className="space-y-2 text-brown-dark">
                <p><strong>Lundi</strong></p>
                <p>{businessInfo?.mondayHours || "Fermé"}</p>
                <p className="mt-2"><strong>Mardi</strong></p>
                <p>{businessInfo?.tuesdayHours || "09:00-17:00"}</p>
                <p className="mt-2"><strong>Mercredi</strong></p>
                <p>{businessInfo?.wednesdayHours || "09:00-17:00"}</p>
                <p className="mt-2"><strong>Jeudi</strong></p>
                <p>{businessInfo?.thursdayHours || "09:00-17:00"}</p>
                <p className="mt-2"><strong>Vendredi</strong></p>
                <p>{businessInfo?.fridayHours || "09:00-17:00"}</p>
                <p className="mt-2"><strong>Samedi</strong></p>
                <p>{businessInfo?.saturdayHours || "09:00-12:00"}</p>
                <p className="mt-2"><strong>Dimanche</strong></p>
                <p>{businessInfo?.sundayHours || "Fermé"}</p>
              </div>
            </CardContent>
          </Card>

          {/* Reservation Card */}
          <Card className="bg-cream rounded-3xl shadow-lg border-0 rose-glow">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">
                <div className="w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mx-auto">
                  <Calendar className="w-8 h-8 text-black" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-brown-primary mb-4">Réservation</h3>
              <div className="space-y-4 text-brown-dark">
                <p>Prenez rendez-vous facilement :</p>
                <div className="space-y-3">
                  <Button asChild className="w-full bg-brown-primary text-cream hover:bg-brown-dark rounded-full">
                    <a href={`tel:${businessInfo?.phone?.replace(/\s+/g, '') || '40575286'}`} className="flex items-center justify-center space-x-2">
                      <Phone className="w-4 h-4 text-cream" />
                      <span>{businessInfo?.phone || "40 57 52 86"}</span>
                    </a>
                  </Button>
                  <p className="text-sm">ou par message privé sur nos réseaux :</p>
                  <div className="flex justify-center space-x-4 pt-2">
                    <a 
                      href="https://www.facebook.com/p/Maitai-Beauty-100076625366246/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                      aria-label="Facebook Maitai Beauty"
                    >
                      <FaFacebookF className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href="https://www.instagram.com/maitai.beauty/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                      aria-label="Instagram Maitai Beauty"
                    >
                      <FaInstagram className="w-5 h-5 text-white" />
                    </a>
                    <a 
                      href="https://www.tiktok.com/@maitai.beauty" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-black rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
                      aria-label="TikTok Maitai Beauty"
                    >
                      <FaTiktok className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Location Card */}
          <Card className="bg-cream rounded-3xl shadow-lg border-0 rose-glow">
            <CardContent className="p-8 text-center">
              <div className="text-6xl mb-6">
                <div className="w-16 h-16 bg-brown-light rounded-full flex items-center justify-center mx-auto">
                  <MapPin className="w-8 h-8 text-brown-primary" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-brown-primary mb-4">Localisation</h3>
              <div className="text-brown-dark space-y-2">
                <p><strong>{businessInfo?.address || "Punaauia, PK18"}</strong></p>
                <p>En face du Carlton Plage</p>
                <p>Servitude Hopuare 4</p>
                <p className="mt-4">
                  <a 
                    href={`mailto:${businessInfo?.email || 'info@maitai-beauty-tahiti.com'}`}
                    className="text-pink-accent hover:text-brown-primary transition-colors"
                  >
                    {businessInfo?.email || "info@maitai-beauty-tahiti.com"}
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
