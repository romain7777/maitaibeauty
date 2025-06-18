import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { BusinessInfo } from "@shared/schema";
import Header from "@/components/navigation/header";
import PageNav from "@/components/navigation/page-nav";
import Footer from "@/components/sections/footer";

export default function Personnel() {
  const [showPersonnelReservation, setShowPersonnelReservation] = useState(false);
  const personnelModalRef = useRef<HTMLDivElement>(null);

  // Fetch business info for phone number
  const { data: businessInfo } = useQuery<BusinessInfo>({
    queryKey: ['/api/business-info'],
    gcTime: 5 * 60 * 1000,
    staleTime: 30 * 1000,
  });

  const phoneNumber = businessInfo?.phone || "40 57 52 86";

  // Force reset et gestionnaire modal personnel
  useEffect(() => {
    if (showPersonnelReservation) {
      // Reset complet immédiat
      document.body.style.cssText = '';
      document.documentElement.style.cssText = '';
      window.scrollTo(0, window.scrollY);
      
      // Application des nouveaux styles
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
      document.body.style.width = '100%';
    } else {
      const scrollY = document.body.style.top;
      document.body.style.cssText = '';
      document.documentElement.style.cssText = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    const handlePersonnelModal = (event: MouseEvent) => {
      if (personnelModalRef.current && !personnelModalRef.current.contains(event.target as Node)) {
        setShowPersonnelReservation(false);
      }
    };

    if (showPersonnelReservation) {
      document.addEventListener('mousedown', handlePersonnelModal);
    }

    return () => {
      document.removeEventListener('mousedown', handlePersonnelModal);
    };
  }, [showPersonnelReservation]);

  // Équipe de Maitai Beauty
  const teamMembers = [
    {
      name: "Maeva",
      role: "Fondatrice & Esthéticienne",
      specialties: ["Soins du visage", "Épilation", "Conseils beauté"],
      description: "Passionnée par l'esthétique depuis plus de 10 ans, Maeva a créé Maitai Beauty pour offrir des soins de qualité dans un cadre idyllique à Punaauia.",
      image: "/logo1.png" // Utilisera le logo en attendant une vraie photo
    },
    {
      name: "Tehina",
      role: "Spécialiste Spa & Massage",
      specialties: ["Massage relaxant", "Soins corporels", "Dôme japonais"],
      description: "Experte en techniques de massage polynésiennes et modernes, Tehina vous guide vers un bien-être total.",
      image: "/logo1.png"
    },
    {
      name: "Vanessa",
      role: "Prothésiste Ongulaire",
      specialties: ["Manucure", "Pose d'ongles", "Nail art"],
      description: "Artiste des ongles, Vanessa transforme vos mains en véritables œuvres d'art avec créativité et précision.",
      image: "/logo1.png"
    },
    {
      name: "Hinatea",
      role: "Coiffeuse Styliste",
      specialties: ["Coupe", "Couleur", "Lissage"],
      description: "Styliste expérimentée, Hinatea sublime votre chevelure avec des techniques modernes et respectueuses.",
      image: "/logo1.png"
    }
  ];

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <PageNav />
      <main className="pt-4">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-cream via-pink-50 to-cream">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-brown-primary mb-6">
                Notre Équipe
              </h1>
              <p className="text-xl text-brown-dark max-w-3xl mx-auto leading-relaxed">
                Rencontrez les professionnelles passionnées qui vous accompagnent dans votre quête de beauté et de bien-être
              </p>
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {teamMembers.map((member, index) => (
                <motion.div
                  key={index}
                  className="bg-white rounded-3xl shadow-lg overflow-hidden rose-glow hover:shadow-2xl transition-all duration-300"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="p-8">
                    <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-6">
                      {/* Photo */}
                      <div className="flex-shrink-0">
                        <div className="w-32 h-32 rounded-full overflow-hidden bg-brown-light/10 flex items-center justify-center">
                          <img
                            src={member.image}
                            alt={member.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/logo1.png';
                            }}
                          />
                        </div>
                      </div>
                      
                      {/* Info */}
                      <div className="flex-1 text-center md:text-left">
                        <h3 className="text-2xl font-bold text-brown-primary mb-2">
                          {member.name}
                        </h3>
                        <p className="text-lg font-semibold mb-4" style={{ color: '#A38B87' }}>
                          {member.role}
                        </p>
                        <p className="text-brown-dark mb-4 leading-relaxed">
                          {member.description}
                        </p>
                        
                        {/* Spécialités */}
                        <div>
                          <h4 className="font-semibold text-brown-primary mb-2">Spécialités :</h4>
                          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                            {member.specialties.map((specialty, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-pink-accent/20 text-brown-primary rounded-full text-sm font-medium"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section className="py-20 bg-brown-light/10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold text-brown-primary mb-8">
                  Notre Philosophie
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-brown-primary mb-2">Passion</h3>
                    <p className="text-brown-dark">Nous mettons tout notre cœur dans chaque soin pour votre épanouissement</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-brown-primary mb-2">Excellence</h3>
                    <p className="text-brown-dark">Des techniques avancées et des produits de qualité pour des résultats optimaux</p>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-16 h-16 bg-pink-accent rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-brown-primary mb-2">Confiance</h3>
                    <p className="text-brown-dark">Un environnement bienveillant où vous vous sentez en sécurité et écoutée</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-brown-primary mb-6">
                Prenez rendez-vous avec notre équipe
              </h2>
              <p className="text-brown-dark text-lg mb-8 max-w-2xl mx-auto">
                Nos professionnelles sont à votre disposition pour vous conseiller et vous offrir les meilleurs soins
              </p>
              <motion.button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowPersonnelReservation(true);
                }}
                className="button text-lg px-10 py-4 inline-block"
                style={{ 
                  backgroundColor: '#A38B87',
                  borderColor: '#A38B87'
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="inline-block w-4 h-4 mr-3 bg-cream rounded-full"></span>
                Réserver Maintenant
              </motion.button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />

      {/* Modal de réservation PERSONNEL UNIQUEMENT */}
      {showPersonnelReservation && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50"
          style={{ 
            zIndex: 10001,
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setShowPersonnelReservation(false)}
        >
          <div 
            ref={personnelModalRef}
            className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center">
              <h3 className="text-2xl font-bold text-brown-primary mb-4">Réservation</h3>
              <p className="text-brown-dark mb-6">Contactez-nous pour prendre rendez-vous</p>
              
              <div className="space-y-4">
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-brown-primary mb-3">Par appel :</h4>
                  <a 
                    href={`tel:${phoneNumber.replace(/\s+/g, '')}`}
                    className="inline-block py-3 px-4 font-bold hover:bg-brown-light/10 rounded-lg transition-colors"
                    style={{ color: '#000000', fontSize: '1.5rem' }}
                  >
                    <div className="flex items-center justify-center space-x-3">
                      <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
                        <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                      </svg>
                      <span>{phoneNumber}</span>
                    </div>
                  </a>
                </div>
                
                <div className="text-center">
                  <h4 className="text-lg font-semibold text-brown-primary mb-3">Par MP sur nos réseaux :</h4>
                  <div className="flex justify-center space-x-4">
                    <a href="https://www.facebook.com/p/Maitai-Beauty-100076625366246/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 fill-[#1877F2]" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </a>
                    <a href="https://www.instagram.com/maitai.beauty/" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 fill-[#E4405F]" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.40s-.644-1.44-1.439-1.40z"/>
                      </svg>
                    </a>
                    <a href="https://www.tiktok.com/@maitai.beauty" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                      <svg className="w-8 h-8 fill-black" viewBox="0 0 24 24">
                        <path d="M19.321 5.562a5.124 5.124 0 0 1-.443-.258 6.228 6.228 0 0 1-1.137-.966c-.849-.849-1.242-1.891-1.242-3.338h-2.427v11.933c0 .8-.321 1.527-.849 2.055-.527.527-1.254.849-2.055.849-1.6 0-2.904-1.304-2.904-2.904 0-1.6 1.304-2.904 2.904-2.904.313 0 .614.05.896.143V7.745a5.558 5.558 0 0 0-.896-.072c-3.108 0-5.632 2.524-5.632 5.632 0 3.108 2.524 5.632 5.632 5.632 3.108 0 5.632-2.524 5.632-5.632V8.235a8.61 8.61 0 0 0 4.92 1.53V7.337c-1.008 0-1.955-.339-2.7-.898-.166-.125-.329-.257-.487-.395a4.84 4.84 0 0 1-.35-.482z"/>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}