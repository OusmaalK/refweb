'use client';

import { useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Image from 'next/image';

const CLIENTS = [
  { name: 'General Electric Healthcare', logo: '/static/clients/ge.svg' },
  { name: 'Siemens Algérie', logo: '/static/clients/siemens.png' },
  { name: 'Grant Thornton', logo: '/static/clients/thomson.png' },
  { name: 'Elsecom', logo: '/static/clients/elsecom.png' },
  { name: 'Bimo', logo: '/static/clients/bimo.png' },
];

export default function ReferencesSection() {
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

  return (
    <section ref={sectionRef} className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-[#0a1628] text-white px-4 py-1 rounded-full text-xs md:text-sm font-medium mb-3">
            {t.references?.tag || '07'}
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#0a1628]">
            {t.references?.title || 'ILS NOUS FONT CONFIANCE'}
          </h2>
          <p className="text-gray-600 text-sm md:text-base">
            {t.references?.subtitle || 'Nous accompagnons des entreprises leaders dans leurs secteurs.'}
          </p>
          <div className="w-16 h-1 bg-[#eab308] mx-auto mt-3"></div>
        </div>

        <div className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 ${isRTL ? 'rtl' : 'ltr'}`}>
          {CLIENTS.map((client, index) => (
            <div key={index} className="bg-white rounded-xl p-3 md:p-4 shadow-sm hover:shadow-md transition border border-gray-100 flex flex-col items-center text-center">
              <div className="relative h-12 md:h-16 w-full mb-2">
                <Image
                  src={client.logo}
                  alt={client.name}
                  fill
                  className="object-contain"
                />
              </div>
              <p className="text-xs md:text-sm font-medium text-[#0a1628]">{client.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
