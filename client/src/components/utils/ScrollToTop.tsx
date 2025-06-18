import { useEffect } from "react";
import { useLocation } from "wouter";

export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Réinitialisation complète pour chaque changement de route
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    // Scroll vers le haut pour toutes les pages
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location]);

  return null;
}