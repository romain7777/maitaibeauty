import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { Link } from 'wouter';
import { useQuery } from "@tanstack/react-query";
import type { BusinessInfo } from "@shared/schema";

export default function Footer() {
  // Fetch business info for phone number and address
  const { data: businessInfo } = useQuery<BusinessInfo>({
    queryKey: ['/api/business-info'],
  });

  const scrollToSection = (sectionId: string) => {
    // Solution ChatGPT: scroll contrôlé avec délai pour éviter les bugs
    if (sectionId === 'accueil') {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        // S'assurer que l'élément est visible avant de scroller
        element.style.display = 'block';
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  };

  return (
    <footer className="footer-moodboard text-white py-10">
      <div className="container mx-auto px-4">
        <div className="text-center">
          {/* Logo and Description */}
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center items-center mb-6">
              <img 
                src="/maitai beauty lg.png" 
                alt="Maitai Beauty Logo" 
                className="h-12 w-auto object-contain"
                style={{ transform: 'scale(4.6)' }}
              />
            </div>
            <p className="footer-text leading-relaxed">
              Votre institut de beauté et spa de référence à Punaauia. Découvrez l'excellence des soins esthétiques dans un cadre idyllique face au Carlton Plage.
            </p>
          </div>
        </div>

        <div className="border-t footer-border border-opacity-30 mt-8 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <p className="footer-text text-center md:text-left">
              © 2025 Maitai Beauty Tahiti – Tous droits réservés.
              <Link href="/admin">
                <span className="inline-block w-2 h-2 opacity-60 hover:opacity-100 rounded-full ml-3 cursor-pointer transition-all duration-300" style={{ backgroundColor: '#A38B87' }} title="Administration"></span>
              </Link>
            </p>
            <div className="mt-4 md:mt-0 flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 md:pr-20">
              <div className="flex space-x-6">
                <button 
                  onClick={() => scrollToSection('accueil')} 
                  className="footer-text footer-link transition-colors"
                >
                  Accueil
                </button>
                <button 
                  onClick={() => scrollToSection('services')} 
                  className="footer-text footer-link transition-colors"
                >
                  Services
                </button>
              </div>
              <a 
                href={`mailto:${businessInfo?.email || 'info@maitai-beauty-tahiti.com'}`}
                className="text-white footer-link transition-colors"
              >
                {businessInfo?.email || "info@maitai-beauty-tahiti.com"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
