import { useEffect } from "react";
import Header from "@/components/navigation/header";
import PageNav from "@/components/navigation/page-nav";
import Hero from "@/components/sections/hero";
import Services from "@/components/sections/services";
import About from "@/components/sections/about";
import ContactInfo from "@/components/sections/contact-info";
import Footer from "@/components/sections/footer";

export default function Home() {
  // Réinitialisation complète quand on arrive sur l'accueil
  useEffect(() => {
    // Nettoyer tous les styles qui pourraient être restés
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Remonter en haut de la page pour un reset complet
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }, []);
  const ParticleTransition = () => (
    <div className="relative h-20 bg-cream overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-pink-300 rounded-full opacity-50 animate-float"
            style={{
              width: `${4 + Math.random() * 6}px`,
              height: `${4 + Math.random() * 6}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 6}s`,
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-cream">
      <Header />
      <PageNav />
      <main>
        <Hero key="hero-stable" />
        <div className="h-20"></div>
        <Services />
        <ParticleTransition />
        <About />
        <ParticleTransition />
        <ContactInfo />
      </main>
      <Footer />
    </div>
  );
}
