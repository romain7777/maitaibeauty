import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import type { BusinessInfo } from "@shared/schema";

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReservationModal({ isOpen, onClose }: ReservationModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  // Fetch business info for phone number
  const { data: businessInfo } = useQuery<BusinessInfo>({
    queryKey: ['/api/business-info'],
    gcTime: 5 * 60 * 1000,
    staleTime: 30 * 1000,
  });

  const phoneNumber = businessInfo?.phone || "40 57 52 86";

  // Handle modal effects
  useEffect(() => {
    if (isOpen) {
      // Reset all body styles completely
      document.body.style.cssText = '';
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.height = '100%';
      document.body.style.top = '0';
      document.body.style.left = '0';
    } else {
      // Reset body styles when closing
      document.body.style.cssText = '';
    }

    return () => {
      document.body.style.cssText = '';
    };
  }, [isOpen]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4"
      style={{ 
        zIndex: 10000,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div 
        ref={modalRef}
        className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{
          position: 'relative',
          zIndex: 10001
        }}
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
  );
}