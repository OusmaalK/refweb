'use client';

import { Ship, Globe, Clock, Box } from 'lucide-react';
import ProcessSteps from './ProcessSteps';

// 1. Définition de l'interface pour accepter 't' et 'locale' depuis la page
interface LogisticsProps {
  t: any;
  locale: string;
}

export default function Logistics({ t, locale }: LogisticsProps) {
  const isRTL = locale === 'ar';

  const sections = [
    { icon: Ship, key: 'ports' },
    { icon: Globe, key: 'markets' },
    { icon: Clock, key: 'shipping' },
    { icon: Box, key: 'incoterms' },
  ];

  return (
    <section id="logistics" className="py-10 bg-gray-50">
      <div className="container mx-auto px-6">
        
        {/* Titre de section adaptatif : bordure à gauche en LTR, à droite en RTL */}
        <h2 
          className={`text-2xl md:text-3xl font-bold text-[#0f172a] mb-10 border-orange-500 ${
            isRTL ? 'border-r-4 pr-4 text-right' : 'border-l-4 pl-4 text-left'
          }`}
        >
          {t.logistics?.title}
        </h2>

        {/* Grille des informations logistiques */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {sections.map((section) => (
            <div 
              key={section.key} 
              className={isRTL ? 'text-right' : 'text-left'}
            >
              {/* En-tête de bloc (Icône + Titre du bloc) */}
              <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                <section.icon className="w-8 h-8 text-orange-500 shrink-0" />
                <h3 className="font-bold text-sm text-[#0f172a]">
                  {t.logistics?.[section.key]?.title}
                </h3>
              </div>
              
              {/* Liste à puces traduits */}
              <ul 
                className={`text-xs text-gray-600 space-y-1.5 list-disc list-inside ${
                  isRTL ? 'mr-1' : 'ml-1'
                }`}
              >
                {t.logistics?.[section.key]?.items?.map((item: string, index: number) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 2. On transmet 't' à ProcessSteps pour traduire l'arborescence des étapes */}
        <ProcessSteps t={t} locale={''} />
      </div>
    </section>
  );
}