'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { Factory, Users, Building, Heart } from 'lucide-react';

const SERVICES = [
  { icon: Factory, key: 'protect_assets' },
  { icon: Users, key: 'protect_liabilities' },
  { icon: Building, key: 'protect_projects' },
  { icon: Heart, key: 'protect_employees' },
];

export default function ServicesSection() {
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

  // ✅ Helper pour accéder aux traductions sans erreur TypeScript
  const getTranslation = (key: string, fallback: string): string => {
    if (key && t.services && typeof t.services === 'object') {
      // Vérifier si la clé existe dans t.services
      if (key in t.services) {
        const value = t.services[key as keyof typeof t.services];
        return typeof value === 'string' ? value : fallback;
      }
    }
    return fallback;
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a1628]">
            {t.services?.title || 'NOS PRESTATIONS'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {t.services?.subtitle || 'Une offre complète pour une protection à 360°'}
          </p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ${isRTL ? 'rtl' : 'ltr'}`}>
          {SERVICES.map((service, index) => (
            <div key={index} className="bg-white rounded-xl p-3 md:p-4 shadow-md hover:shadow-lg transition border border-gray-100 text-center group">
              <div className="bg-[#0a1628]/5 p-2 rounded-full mb-2 w-fit mx-auto group-hover:bg-[#eab308]/10 transition">
                <service.icon className="w-6 h-6 md:w-8 md:h-8 text-[#0a1628] group-hover:text-[#eab308] transition" />
              </div>
              <h3 className="text-xs md:text-sm font-bold text-[#0a1628] uppercase">
                {getTranslation(service.key, 'Service')}
              </h3>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 md:mt-8">
          <Link
            href={`/${locale}/service`} // ✅ Corrigé de /services à /service
            className="inline-block bg-[#0a1628] hover:bg-[#1a2a4a] text-white font-bold px-4 md:px-6 py-2 rounded-lg transition transform hover:scale-105 text-sm md:text-base"
          >
            {t.services?.cta || 'Voir tous nos services'}
          </Link>
        </div>
      </div>
    </section>
  );
}
