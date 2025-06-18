import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { BusinessInfo } from "@shared/schema";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showReservation, setShowReservation] = useState(false);
  const [location] = useLocation();
  const reservationRef = useRef<HTMLDivElement>(null);

  // Fetch business info for phone number
  const { data: businessInfo } = useQuery<BusinessInfo>({
    queryKey: ['/api/business-info'],
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (reservationRef.current && !reservationRef.current.contains(event.target as Node)) {
        setShowReservation(false);
      }
    };

    if (showReservation) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showReservation]);

  const scrollToSection = (sectionId: string) => {
    setIsMenuOpen(false);
    
    // Naviguer vers la page d'accueil si on n'y est pas déjà
    if (location !== '/') {
      // Rediriger vers la page d'accueil avec l'ancre
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    // Si on est déjà sur la page d'accueil, scroller vers la section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className="navbar relative py-2 bg-gradient-to-r from-brown-primary via-brown-dark to-brown-primary"
      style={{ zIndex: 10003 }}
    >
      <nav className="w-full px-2 md:container md:mx-auto md:px-8">
        <div className="flex items-center w-full">
          <Link href="/" className="flex-shrink-0">
            <motion.div 
              className="flex items-center cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <img 
                src="/maitai beauty lg.png" 
                alt="Maitai Beauty Logo" 
                className="h-8 w-auto object-contain"
                style={{ 
                  transform: 'scale(6.5)',
                  transformOrigin: 'left center'
                }}
              />
            </motion.div>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-12 flex-1 justify-center">
            <motion.button 
              onClick={() => scrollToSection('services')}
              className="nav-button text-white hover:text-white/80 transition-all duration-300 font-medium relative focus:outline-none focus:ring-0 active:outline-none"
              style={{ 
                outline: 'none', 
                border: 'none', 
                background: 'transparent',
                padding: '0',
                margin: '0'
              }}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ y: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Services
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('about')}
              className="nav-button text-white hover:text-white/80 transition-all duration-300 font-medium relative focus:outline-none focus:ring-0 active:outline-none"
              style={{ 
                outline: 'none', 
                border: 'none', 
                background: 'transparent',
                padding: '0',
                margin: '0'
              }}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ y: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              À propos
            </motion.button>
            <motion.button 
              onClick={() => scrollToSection('contact')}
              className="nav-button text-white hover:text-white/80 transition-all duration-300 font-medium relative focus:outline-none focus:ring-0 active:outline-none"
              style={{ 
                outline: 'none', 
                border: 'none', 
                background: 'transparent',
                padding: '0',
                margin: '0'
              }}
              whileHover={{ y: -2, scale: 1.05 }}
              whileTap={{ y: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              Contact
            </motion.button>
            <Link href="/localisation" style={{ margin: '0 32px' }}>
              <motion.button 
                className="nav-button text-white hover:text-white/80 transition-all duration-300 font-medium relative focus:outline-none focus:ring-0 active:outline-none"
                style={{ 
                  outline: 'none', 
                  border: 'none', 
                  background: 'transparent',
                  padding: '8px 0',
                  margin: '0'
                }}
                whileHover={{ y: -2, scale: 1.05 }}
                whileTap={{ y: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                Localisation
              </motion.button>
            </Link>
          </div>

          {/* Reservation Button */}
          <div className="hidden md:block relative flex-shrink-0" ref={reservationRef}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Button 
                onClick={() => setShowReservation(!showReservation)}
                className="border-2 text-white font-bold py-3 px-6 rounded-full transition-colors"
                style={{ 
                  backgroundColor: '#A38B87',
                  borderColor: '#A38B87'
                }}
              >
                Réserver
              </Button>
            </motion.div>
            
            {/* Dropdown Reservation */}
            {showReservation && (
              <div className="absolute top-full mt-2 right-0 bg-white rounded-2xl p-6 shadow-xl border-2 border-brown-primary min-w-80" style={{ zIndex: 10002 }}>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-brown-primary mb-4">Réservation</h3>
                  <p className="text-brown-dark mb-6">Contactez-nous pour prendre rendez-vous</p>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <h4 className="text-lg font-semibold text-brown-primary mb-3">Par appel :</h4>
                      <a 
                        href={`tel:${businessInfo?.phone?.replace(/\s+/g, '') || '40575286'}`}
                        className="inline-block py-3 px-4 font-bold hover:bg-brown-light/10 rounded-lg transition-colors"
                        style={{ color: '#000000', fontSize: '1.5rem' }}
                      >
                        <div className="flex items-center justify-center space-x-3">
                          <svg className="w-6 h-6 fill-black" viewBox="0 0 24 24">
                            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                          </svg>
                          <span>{businessInfo?.phone || "40 57 52 86"}</span>
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
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex-shrink-0">
            <button onClick={toggleMenu} className="text-white p-2 relative z-50">
              {isMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - positioned absolutely */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-40">
            <div className="container mx-auto px-8 py-4">
              <button 
                onClick={() => scrollToSection('services')}
                className="block w-full text-left py-3 text-gray-800 font-medium border-b border-gray-200 hover:bg-gray-50"
              >
                Services
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left py-3 text-gray-800 font-medium border-b border-gray-200 hover:bg-gray-50"
              >
                À propos
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="block w-full text-left py-3 text-gray-800 font-medium border-b border-gray-200 hover:bg-gray-50"
              >
                Contact
              </button>
              <Link href="/localisation">
                <button 
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-left py-3 text-gray-800 font-medium border-b border-gray-200 hover:bg-gray-50"
                >
                  Localisation
                </button>
              </Link>
              <div className="pt-4">
                <Button 
                  onClick={() => {
                    const modal = document.getElementById('reservation-modal');
                    if (modal) modal.style.display = 'flex';
                    setIsMenuOpen(false);
                  }}
                  className="w-full bg-black text-white py-3 rounded-full font-medium"
                >
                  Réserver
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Reservation Modal */}
      <div 
        id="reservation-modal" 
        className="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            const modal = document.getElementById('reservation-modal');
            if (modal) modal.style.display = 'none';
          }
        }}
      >
        <div className="bg-white rounded-2xl p-8 max-w-md mx-4 relative">
          <div className="text-center">
            <h3 className="text-3xl font-bold text-brown-primary mb-6">Réservation</h3>
            <p className="text-brown-dark mb-8 text-lg">Contactez-nous pour prendre rendez-vous</p>
            
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-xl font-semibold text-brown-primary mb-4">Par appel :</h4>
                <a 
                  href={`tel:${businessInfo?.phone?.replace(/\s+/g, '') || '40575286'}`}
                  className="inline-block py-4 px-6 font-bold hover:bg-brown-light transition-colors"
                  style={{ color: '#000000', fontSize: '1.75rem' }}
                >
                  <div className="flex items-center justify-center space-x-4">
                    <svg className="w-8 h-8 fill-black" viewBox="0 0 24 24">
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                    </svg>
                    <span style={{ color: '#000000', fontSize: '1.75rem' }}>{businessInfo?.phone || "40 57 52 86"}</span>
                  </div>
                </a>
              </div>
              
              <div className="text-center">
                <h4 className="text-xl font-semibold text-brown-primary mb-4">Par MP sur nos réseaux :</h4>
                <div className="flex justify-center space-x-6">
                  <a 
                    href="https://www.facebook.com/p/Maitai-Beauty-100076625366246/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center space-y-2 group"
                  >
                    <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                    </div>
                    <span className="text-sm text-brown-dark group-hover:text-brown-primary" style={{ fontSize: '1.1rem' }}>Facebook</span>
                  </a>
                  
                  <a 
                    href="https://www.instagram.com/maitai.beauty/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center space-y-2 group"
                  >
                    <div className="w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                    <span className="text-sm text-brown-dark group-hover:text-brown-primary" style={{ fontSize: '1.1rem' }}>Instagram</span>
                  </a>
                  
                  <a 
                    href="https://www.tiktok.com/@maitai.beauty" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex flex-col items-center space-y-2 group"
                  >
                    <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                      <svg className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                      </svg>
                    </div>
                    <span className="text-sm text-brown-dark group-hover:text-brown-primary" style={{ fontSize: '1.1rem' }}>TikTok</span>
                  </a>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => {
                const modal = document.getElementById('reservation-modal');
                if (modal) modal.style.display = 'none';
              }}
              className="mt-8 text-brown-dark hover:text-brown-primary transition-colors text-lg font-medium"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}