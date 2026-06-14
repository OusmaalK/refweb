'use client';

import Image from 'next/image';
import { Shield, Lock, TrendingUp, Users } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface RFCAppHeroProps {
  t: any;
  locale: string;
}

const TOP_ICONS = [
  { icon: Shield, key: 'expertise' },
  { icon: Lock, key: 'security' },
  { icon: TrendingUp, key: 'performance' },
  { icon: Users, key: 'support' },
];

export default function RFCAppHero({ t, locale }: RFCAppHeroProps) {
  const isRTL = locale === 'ar';
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.1 }
    );
    if (heroRef.current) observer.observe(heroRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative bg-[#0a1628] pt-10 pb-8 md:pb-12 overflow-hidden">
      {/* Header avec logo RFC et 4 icônes */}
      <div className="container mx-auto px-4 md:px-6 mb-8 md:mb-12">
        <div className={`flex flex-col md:flex-row items-center justify-between gap-4 ${isRTL ? 'rtl' : 'ltr'}`}>
          {/* Logo RFC */}
          <div className="flex items-center gap-2">
            <span className="text-3xl md:text-4xl font-bold text-white">RFC</span>
            <span className="text-xs md:text-sm text-gray-400 border-l border-gray-600 pl-3">
              {t.rfc_app?.top_header?.subtitle || 'EXPERTS EN ASSURANCE ET GESTION DES RISQUES'}
            </span>
          </div>
          {/* 4 Icônes */}
          <div className={`flex items-center gap-4 md:gap-6 ${isRTL ? 'rtl' : 'ltr'}`}>
            {TOP_ICONS.map((item, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <item.icon className="w-5 h-5 md:w-6 md:h-6 text-[#eab308] mb-1" />
                <span className="text-[8px] md:text-[10px] text-white uppercase tracking-wider">
                  {t.rfc_app?.top_header?.items?.[item.key] || item.key}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6">
        <div ref={heroRef} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center ${isRTL ? 'rtl' : 'ltr'}`}>
          
          {/* Colonne gauche : Texte */}
          <div className="order-2 lg:order-1">
            {/* Badge NOUVEAU */}
            <div className="inline-block bg-[#eab308] text-[#0a1628] px-4 py-1 rounded-full font-bold text-sm mb-4">
              {t.rfc_app?.badge || 'NOUVEAU'}
            </div>

            {/* Titre principal */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-1">
              <span className="text-[#eab308]">RFC</span>-App
            </h1>

            {/* Sous-titre */}
            <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-3 uppercase">
              {t.rfc_app?.subtitle || 'LA SUITE LOGICIELLE MÉTIER DES PROFESSIONNELS DE L\'ASSURANCE'}
            </h2>

            {/* Ligne décorative */}
            <div className="w-12 h-1 bg-[#eab308] mb-4"></div>

            {/* Description */}
            <p className="text-gray-300 text-sm md:text-base mb-6">
              {t.rfc_app?.description || 'Une solution intégrée et intelligente pour digitaliser, automatiser et piloter l\'ensemble de vos activités d\'assurance.'}
            </p>
          </div>

          {/* Colonne droite : Images */}
          <div className="order-1 lg:order-2 relative">
            <div className="relative flex justify-center">
              {/* Image principale (ordinateur) */}
              <div className="relative z-10 w-full max-w-[800px]">
                <Image
                  src="/static/rfc-app-desktop.png"
                  alt="RFC-App Desktop"
                  width={800}
                  height={500}
                  className="w-full h-auto object-contain"
                />
              </div>
              {/* Image secondaire (smartphone) */}
              <div className="absolute -bottom-4 -left-4 sm:-left-8 z-20 w-24 sm:w-32 md:w-40">
                <Image
                  src="/static/rfc-app-mobile.png"
                  alt="RFC-App Mobile"
                  width={200}
                  height={400}
                  className="w-full h-auto object-contain"
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}