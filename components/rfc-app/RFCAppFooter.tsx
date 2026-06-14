'use client';

import Link from 'next/link';
import { ShieldCheck, CheckCircle, Cloud, Settings } from 'lucide-react';
import { useRef, useEffect } from 'react';

interface RFCAppFooterProps {
  t: any;
  locale: string;
}

const ARGUMENTS = [
  { icon: ShieldCheck, key: 'expert' },
  { icon: CheckCircle, key: 'custom' },
  { icon: Cloud, key: 'secure' },
  { icon: Settings, key: 'integrated' },
];

export default function RFCAppFooter({ t, locale }: RFCAppFooterProps) {
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
    <section ref={sectionRef} className="py-8 md:py-12 bg-[#0a1628]">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Section supérieure : 4 arguments */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-10 ${isRTL ? 'rtl' : 'ltr'}`}>
          {ARGUMENTS.map((arg, index) => (
            <div key={index} className="flex items-center gap-2 md:gap-3 justify-center text-center md:text-left">
              <arg.icon className="w-6 h-6 md:w-8 md:h-8 text-[#eab308] shrink-0" />
              <div>
                <h4 className="text-[10px] md:text-xs font-bold text-white uppercase">
                  {t.rfc_app?.arguments?.[arg.key]?.title || 'ARGUMENT'}
                </h4>
                <p className="text-[8px] md:text-[10px] text-gray-400">
                  {t.rfc_app?.arguments?.[arg.key]?.desc || 'Description'}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Section inférieure : Bouton CTA principal */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 bg-[#0f1a2e] p-4 md:p-6 rounded-lg border border-white/10">
          <div className="text-center md:text-left">
            <h3 className="text-sm md:text-base font-bold text-white mb-0.5 uppercase">
              {t.rfc_app?.cta_final?.title || 'CONÇU PAR DES EXPERTS MÉTIER, POUR DES EXPERTS MÉTIER'}
            </h3>
            <p className="text-[10px] md:text-xs text-gray-400">
              {t.rfc_app?.cta_final?.desc || 'Rejoignez les professionnels de l\'assurance qui font confiance à RFC-App.'}
            </p>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="bg-[#eab308] hover:bg-yellow-500 text-[#0a1628] font-bold px-4 md:px-6 py-2 rounded-md transition transform hover:scale-105 text-center whitespace-nowrap text-xs md:text-sm"
          >
            {t.rfc_app?.cta_final?.button || 'DEMANDEZ UNE DÉMO ET DÉCOUVREZ RFC-APP'}
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center mt-4">
          <p className="text-gray-500 text-[8px] md:text-[10px]">
            {t.rfc_app?.footer || 'RFC-App, la performance digitale au service de l\'excellence en assurance.'}
          </p>
        </div>

      </div>
    </section>
  );
}