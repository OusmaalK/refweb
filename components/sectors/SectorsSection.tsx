'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

const SECTORS = [
  { key: 'agroalimentaire', image: '/static/agroalimentaire.png' },
  { key: 'chimie', image: '/static/chimie.png' },
  { key: 'constructions', image: '/static/constructions.png' },
  { key: 'energie', image: '/static/energie.png' },
];

export default function SectorsSection() {
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

  const getTranslation = (key: string, fallback: string): string => {
    if (key && t.sectors && typeof t.sectors === 'object') {
      if (key in t.sectors) {
        const value = t.sectors[key as keyof typeof t.sectors];
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
            {t.sectors?.title || 'SECTEURS D\'ACTIVITÉ'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {t.sectors?.subtitle || 'DES EXPERTISES ADAPTÉES À VOS SECTEURS'}
          </p>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ${isRTL ? 'rtl' : 'ltr'}`}>
          {SECTORS.map((sector, index) => (
            <div key={index} className="rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition">
              <div className="relative h-32 md:h-40 w-full">
                <Image
                  src={sector.image}
                  alt={getTranslation(`sectors.${sector.key}.title`, sector.key)}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-2 md:p-3">
                <h3 className="text-xs md:text-sm font-bold text-[#0a1628] uppercase">
                  {getTranslation(`sectors.${sector.key}.title`, sector.key)}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 md:mt-8">
          <Link
            href={`/${locale}/sectors`}
            className="inline-block bg-[#0a1628] hover:bg-[#1a2a4a] text-white font-bold px-4 md:px-6 py-2 rounded-lg transition transform hover:scale-105 text-sm md:text-base"
          >
            {t.sectors?.cta || 'Voir tous nos secteurs'}
          </Link>
        </div>
      </div>
    </section>
  );
}
