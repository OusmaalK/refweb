'use client';

import { useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Search, Lightbulb, Settings, UserCheck, ArrowRight } from 'lucide-react';

const STEPS = [
  { icon: Search, key: 'analysis' },
  { icon: Lightbulb, key: 'recommendations' },
  { icon: Settings, key: 'implementation' },
  { icon: UserCheck, key: 'followup' },
];

export default function ApproachSection() {
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
      const value = key.split('.').reduce((obj, k) => obj?.[k], t.approach);
      return typeof value === 'string' ? value : key;
    } catch {
      return key;
    }
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-[#f8fafc]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-[#0a1628] text-white px-4 py-1 rounded-full text-xs md:text-sm font-medium mb-3">
            {t.approach?.tag || '08'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a1628]">
            {t.approach?.title || 'NOTRE APPROCHE'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {t.approach?.subtitle || 'Une démarche indépendante et orientée résultats.'}
          </p>
          {/* Barre de séparation en rouge */}
          <div className="w-16 h-1 bg-[#ef4444] mx-auto mt-3"></div>
        </div>

        {/* Grille */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ${isRTL ? 'rtl' : 'ltr'}`}>
          {STEPS.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center group relative">
              {/* Cercle avec bordure rouge au survol */}
              <div className="relative w-20 h-20 md:w-28 md:h-28 rounded-full border-2 border-[#0a1628] flex items-center justify-center mb-3 group-hover:border-[#ef4444] transition">
                <step.icon className="w-6 h-6 md:w-10 md:h-10 text-[#0a1628] group-hover:text-[#ef4444] transition" />
              </div>
              
              {/* Flèche de transition en rouge */}
              {index < STEPS.length - 1 && (
                <ArrowRight className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 text-[#ef4444]" />
              )}
              
              <h3 className="text-xs md:text-base font-bold text-[#0a1628] mb-1">
                {getTranslation(`step.${step.key}.title`)}
              </h3>
              <p className="text-[10px] md:text-sm text-gray-600">
                {getTranslation(`step.${step.key}.desc`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
