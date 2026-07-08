'use client';

import { useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Rocket, MapPin, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const AMBITIONS = [
  { icon: Rocket, key: 'startups' },
  { icon: MapPin, key: 'deployment' },
  { icon: Globe, key: 'export' },
  { icon: Shield, key: 'expertise' },
];

export default function AmbitionsSection() {
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
      const value = key.split('.').reduce((obj, k) => obj?.[k], t.ambitions);
      return typeof value === 'string' ? value : key;
    } catch {
      return key;
    }
  };

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-[#0a1628] text-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-[#0a1628] text-white px-4 py-1 rounded-full text-xs md:text-sm font-medium mb-3">
            {t.ambitions?.tag || 'Vision'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {t.ambitions?.title || 'NOS AMBITIONS AVENIRS'}
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            {t.ambitions?.subtitle || 'Être l\'accompagnateur de référence des entreprises en croissance.'}
          </p>
          <div className="w-16 h-1 bg-[#ffffff] mx-auto mt-3"></div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 ${isRTL ? 'rtl' : 'ltr'}`}>
          {AMBITIONS.map((ambition, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              className="bg-[#0f1a2e] rounded-xl p-4 md:p-6 border border-[#ffffff]/30 hover:border-[#ffffff] transition flex flex-col items-center text-center"
            >
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#ffffff]/10 flex items-center justify-center mb-3">
                <ambition.icon className="w-6 h-6 md:w-7 md:h-7 text-[#ffffff]" />
              </div>
              <h3 className="text-sm md:text-base font-bold text-white mb-1">
                {getTranslation(`ambition.${ambition.key}.title`)}
              </h3>
              <p className="text-xs md:text-sm text-gray-400">
                {getTranslation(`ambition.${ambition.key}.desc`)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
