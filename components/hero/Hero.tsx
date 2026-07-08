'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Hero() {
  const { t, locale } = useTranslation();
  const isRTL = locale === 'ar';
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollY = window.scrollY;
        const opacity = Math.min(1, 1 - scrollY / 800);
        const scale = 1 + scrollY / 2000;
        heroRef.current.style.opacity = Math.max(0.3, opacity).toString();
        heroRef.current.style.transform = `scale(${Math.min(1.05, scale)})`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-[40vh] sm:min-h-[45vh] md:min-h-[50vh] lg:min-h-screen overflow-hidden">
      {/* Image de fond */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/static/fond.png"
          alt="Industrie"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-[#0a1628]/70" />
      </div>

      {/* Contenu */}
      <div ref={heroRef} className="container mx-auto px-4 md:px-6 relative z-10 pt-24 sm:pt-36 md:pt-48 lg:pt-56 flex flex-col justify-start transition-all duration-300">
        <div className={`max-w-3xl ${isRTL ? 'text-right ml-auto' : ''}`}>
          <span className="inline-block text-white font-medium tracking-widest text-[10px] sm:text-xs md:text-base mb-1 sm:mb-1 animate-fade-in-up">
            {t.hero?.tag || 'LE CONSEIL PAR EXCELLENCE'}
          </span>

          <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-0.5 sm:mb-1 animate-fade-in-up animation-delay-200">
            <span dangerouslySetInnerHTML={{ 
              __html: t.hero?.title || 
                'Société de Courtage d\'Assurance et de Conseil en Gestion des Risques<br />Audit & Prévention des Risques Industriels' 
            }} />
          </h1>

          <p className="text-xs sm:text-sm md:text-lg lg:text-xl text-[#eab308] mb-1 sm:mb-1 animate-fade-in-up animation-delay-400">
            {t.hero?.subtitle || 'Courtier d\'assurance agréé par le Ministère des Finances'}
          </p>

          {/* Bloc des boutons d'action */}
          <div className={`flex flex-col sm:flex-row gap-2 animate-fade-in-up animation-delay-600 ${isRTL ? 'sm:flex-row-reverse' : ''}`}>
            <Link
              href={`/${locale}/#contact`}
              className="bg-white hover:bg-gray-50 text-[#ef4444] font-bold px-3 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 rounded-md transition transform hover:scale-105 text-center text-[10px] sm:text-xs md:text-sm"
            >
              {t.hero?.cta_audit || 'Solliciter un audit'}
            </Link>
            <Link
              href={`/${locale}/service`}
              className="border border-white/30 hover:border-white text-white font-bold px-3 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 rounded-md transition hover:bg-white/10 text-center text-[10px] sm:text-xs md:text-sm"
            >
              {t.hero?.cta_services || 'Découvrir nos prestations'}
            </Link>
            {/* Bouton Blog - CORRIGÉ */}
            <Link
              href={`/${locale}/blog`}
              className="border border-white/30 hover:bg-white/20 text-white font-bold px-3 sm:px-4 md:px-6 py-1 sm:py-2 md:py-3 rounded-md transition text-center text-[10px] sm:text-xs md:text-sm backdrop-blur-sm"
            >
              {t.hero?.cta_blog || 'Actualités & Expertise'}  {/* ← MODIFICATION ICI */}
            </Link>
          </div>
        </div>
      </div>

      {/* Vague décorative en bas */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50 Q360 20 720 50 Q1080 80 1440 50 L1440 100 L0 100 Z" fill="#0a1628"/>
        </svg>
      </div>
    </section>
  );
}
