import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Service as ServiceType } from "@shared/schema";

// Service emoji mapping for display
const serviceEmojis: { [key: string]: string } = {
  "Esthétique": "✨",
  "Onglerie": "💅", 
  "Spa": "🧖‍♀️",
  "Spa & Détente": "🧖‍♀️",
  "Massage": "💆‍♀️",
  "Coiffure": "💇‍♀️",
  "Beauté du Regard": "👁️"
};

// Service color mapping
const serviceColors: { [key: string]: string } = {
  "Esthétique": "text-brown-primary",
  "Onglerie": "text-pink-accent",
  "Spa": "text-brown-light",
  "Spa & Détente": "text-brown-light", 
  "Massage": "text-pink-accent",
  "Coiffure": "text-brown-primary",
  "Beauté du Regard": "text-pink-accent"
};

type ServiceWithDisplay = ServiceType & {
  emoji: string;
  iconColor: string;
  shortDescription: string;
  servicesList: string[];
  fullDescription: string;
  alt: string;
};

export default function Services() {
  const [expandedService, setExpandedService] = useState<number | null>(null);

  // Toggle accordion - un seul ouvert à la fois
  const handleServiceClick = (serviceId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Si c'est déjà ouvert, le fermer, sinon ouvrir uniquement celui-ci
    setExpandedService(expandedService === serviceId ? null : serviceId);
  };
  
  // Fetch services from API
  const { data: apiServices = [], isLoading } = useQuery({
    queryKey: ['/api/services'],
    queryFn: async () => {
      const response = await fetch('/api/services');
      if (!response.ok) throw new Error('Failed to fetch services');
      return response.json();
    }
  });

  // Transform API services to display format
  const services: ServiceWithDisplay[] = apiServices.map((service: any) => ({
    ...service,
    emoji: serviceEmojis[service.title] || "✨",
    iconColor: serviceColors[service.title] || "text-brown-primary",
    shortDescription: service.description,
    servicesList: service.details.split('\n').filter((line: string) => line.trim().startsWith('•')).map((line: string) => line.replace('•', '').trim()),
    fullDescription: service.details.split('\n').filter((line: string) => !line.trim().startsWith('•')).join(' ').trim() || service.description,
    alt: `${service.title} - Maitai Beauty`
  }));

  if (isLoading) {
    return (
      <section id="services" className="section-spacing bg-gradient-to-br from-brown-light/10 to-pink-accent/5 rose-bg-subtle">
        <div className="container mx-auto px-8 py-16">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-brown-primary mb-6 section-title-gradient">Nos Services</h2>
            <p className="text-lg text-brown-light">Chargement des services...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="services" className="section-spacing bg-gradient-to-br from-brown-light/10 to-pink-accent/5 rose-bg-subtle">
        <div className="container mx-auto px-8 py-16">
          {/* Enhanced Header with Motion */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-brown-primary mb-6 section-title-gradient">
              Nos Services
            </h2>
            <p className="text-lg text-brown-light max-w-3xl mx-auto leading-relaxed">
              Découvrez notre gamme complète de soins de beauté et de bien-être conçus pour révéler votre beauté
            </p>
          </motion.div>

          {/* Modern Grid Layout - hauteurs indépendantes */}
          <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                className="group w-full sm:w-80 md:w-96"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 border-0 group overflow-hidden rose-glow w-full">
                  <CardContent className="p-0">
                    <div className="relative overflow-hidden">
                      <img 
                        src={service.image} 
                        alt={service.alt} 
                        className="w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brown-dark/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-2xl font-semibold text-brown-primary mb-4 group-hover:text-pink-accent transition-colors duration-300">
                        {service.title}
                      </h3>
                      <button
                        onClick={(event) => handleServiceClick(service.id, event)}
                        className="flex items-center justify-between w-full text-brown-primary font-medium hover:text-pink-accent transition-colors duration-300 cursor-pointer"
                      >
                        <span>
                          {expandedService === service.id ? "Voir moins" : "En savoir plus"}
                        </span>
                        <span className={`transition-transform duration-300 ${expandedService === service.id ? "rotate-90" : ""}`}>
                          →
                        </span>
                      </button>
                      
                      {/* Accordion Content */}
                      {expandedService === service.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 pt-4 border-t border-brown-light/20"
                        >
                          <p className="text-brown-dark mb-4 leading-relaxed">
                            {service.fullDescription}
                          </p>
                          <h4 className="text-lg font-semibold text-brown-primary mb-3">Services inclus :</h4>
                          <ul className="text-brown-dark space-y-2">
                            {service.servicesList.map((item: string, index: number) => (
                              <li key={index} className="flex items-center space-x-3">
                                <div className="bg-brown-primary text-white p-1 rounded-full w-5 h-5 flex items-center justify-center text-xs">
                                  ✓
                                </div>
                                <span className="text-sm">{item}</span>
                              </li>
                            ))}
                          </ul>
                        </motion.div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}