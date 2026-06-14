'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation'; // ✅ Import ajouté

export default function AboutSection() {
  const { t, locale } = useTranslation(); // ✅ Récupération directe
  const sectionRef = useRef<HTMLElement>(null);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          sectionRef.current?.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-[#0f1a2e]">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`max-w-3xl mx-auto text-center ${isRTL ? 'rtl' : 'ltr'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 md:mb-6">
            {t.about?.title || 'À propos de RFC Assurance'}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed">
            {t.about?.summary || 'Fondée en 2014, RFC Assurance est une société de courtage d\'assurance et de conseil en gestion des risques. Nous accompagnons les entreprises dans la protection de leurs actifs et la prévention des risques industriels.'}
          </p>
          <Link
            href={`/${locale}/about`}
            className="inline-block mt-6 md:mt-8 bg-[#eab308] hover:bg-yellow-500 text-[#0a1628] font-bold px-4 md:px-6 py-2 md:py-3 rounded-md transition text-sm md:text-base"
          >
            {t.about?.cta || 'En savoir plus'}
          </Link>
        </div>
      </div>
    </section>
  );
}