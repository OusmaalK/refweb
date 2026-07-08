'use client';

import { Shield, CheckCircle, HeartHandshake, Target } from 'lucide-react';
import { useTranslation } from '@/hooks/useTranslation';

export default function Features() {
  const { t, locale } = useTranslation();
  const isRTL = locale === 'ar';

  // Configuration des fonctionnalités avec traductions
  const featuresData = [
    { 
      icon: Shield,
      // Utilisation des clés from "about" pour les titres complets
      title: t.about?.why_us_1 || 'Expertise reconnue depuis 2014',
      // Utilisation des clés from "features" pour les sous-titres
      desc: t.features?.expertise_desc || t.about?.stat_1_desc || 'Depuis 2014'
    },
    { 
      icon: CheckCircle,
      title: t.about?.why_us_2 || 'Approche sur-mesure et indépendante',
      desc: t.features?.custom_desc || 'Et indépendante'
    },
    { 
      icon: HeartHandshake,
      title: t.about?.why_us_3 || 'Défense exclusive de vos intérêts',
      desc: t.features?.defense_desc || 'De vos intérêts'
    },
    { 
      icon: Target,
      title: t.about?.why_us_4 || 'Suivi global de la souscription au sinistre',
      desc: t.features?.global_desc || 'De la souscription au sinistre'
    },
  ];

  return (
    <div className="bg-[#0a1628] pb-12 pt-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
          {featuresData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="bg-white/5 p-3 rounded-full mb-3 group-hover:bg-[#eab308]/20 transition-all duration-300">
                <item.icon className="w-6 h-6 text-white group-hover:text-[#eab308]" />
              </div>
              <h4 className="text-white font-bold text-sm md:text-base">
                {item.title}
              </h4>
              <p className="text-gray-400 text-xs md:text-sm">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}