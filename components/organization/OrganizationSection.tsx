'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { Users, Award, Target, Shield, HeartHandshake, Globe, CheckCircle } from 'lucide-react';

export default function OrganizationSection() {
  const { t, locale } = useTranslation();
  const isRTL = locale === 'ar';
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const getTranslation = (key: string): string => {
    try {
      const value = key.split('.').reduce((obj, k) => obj?.[k], t.organization);
      return typeof value === 'string' ? value : key;
    } catch {
      return key;
    }
  };

  // Données enrichies pour les cartes
  const cards = [
    { 
      icon: Target, 
      title: getTranslation('mission.title'),
      desc: getTranslation('mission.desc')
    },
    { 
      icon: Shield, 
      title: getTranslation('vision.title'),
      desc: getTranslation('vision.desc')
    },
    { 
      icon: HeartHandshake, 
      title: getTranslation('values.integrity'),
      desc: getTranslation('values.integrity_desc')
    },
    { 
      icon: Globe, 
      title: getTranslation('leadership.title'),
      desc: getTranslation('leadership.ceo') + ' • ' + getTranslation('leadership.director')
    },
  ];

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a1628]">
            {t.organization?.title || 'Notre Organisation'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {t.organization?.subtitle || 'Une structure d\'excellence au service de vos risques'}
          </p>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ${isRTL ? 'rtl' : 'ltr'}`}>
          {cards.map((card, index) => (
            <div key={index} className="bg-white rounded-xl p-4 md:p-6 shadow-md hover:shadow-xl transition border border-gray-100 text-center group">
              <div className="w-12 h-12 md:w-14 md:h-14 mx-auto rounded-full bg-[##ef4444]/10 flex items-center justify-center mb-3 group-hover:bg-[#eab308]/20 transition">
                <card.icon className="w-6 h-6 md:w-7 md:h-7 text-[#ef4444]" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-[#0a1628] mb-2">
                {card.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 leading-relaxed line-clamp-2">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 md:mt-8">
          <Link
            href={`/${locale}/organization`}
            className="inline-block bg-[#0a1628] hover:bg-[#1a2a4a] text-white font-bold px-4 md:px-6 py-2 rounded-lg transition transform hover:scale-105 text-sm md:text-base"
          >
            {t.organization?.cta || 'Voir notre organisation'}
          </Link>
        </div>
      </div>
    </section>
  );
}