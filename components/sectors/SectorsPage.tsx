'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, Shield, TrendingUp, 
  Factory, Flame, Pipette, Truck, 
  Building, HardHat, Wrench, 
  Droplet, Wind, Zap 
} from 'lucide-react';

const SECTORS = [
  {
    key: 'agroalimentaire',
    image: '/static/agroalimentaire.png',
    color: 'green',
    risks: [
      { labelKey: 'sectors.agroalimentaire.risks.contamination', icon: AlertTriangle },
      { labelKey: 'sectors.agroalimentaire.risks.recall', icon: TrendingUp },
      { labelKey: 'sectors.agroalimentaire.risks.traceability', icon: Shield },
      { labelKey: 'sectors.agroalimentaire.risks.storage', icon: Factory },
    ],
    solutions: [
      'sectors.agroalimentaire.solutions.recall',
      'sectors.agroalimentaire.solutions.loss',
      'sectors.agroalimentaire.solutions.rc',
      'sectors.agroalimentaire.solutions.transport',
    ],
  },
  {
    key: 'chimie',
    image: '/static/chimie.png',
    color: 'purple',
    risks: [
      { labelKey: 'sectors.chimie.risks.atex', icon: Flame },
      { labelKey: 'sectors.chimie.risks.toxic', icon: Pipette },
      { labelKey: 'sectors.chimie.risks.transport', icon: Truck },
      { labelKey: 'sectors.chimie.risks.waste', icon: Shield },
    ],
    solutions: [
      'sectors.chimie.solutions.rc',
      'sectors.chimie.solutions.environment',
      'sectors.chimie.solutions.transport',
      'sectors.chimie.solutions.waste',
    ],
  },
  {
    key: 'constructions',
    image: '/static/constructions.png',
    color: 'orange',
    risks: [
      { labelKey: 'sectors.constructions.risks.site', icon: Building },
      { labelKey: 'sectors.constructions.risks.subcontractors', icon: HardHat },
      { labelKey: 'sectors.constructions.risks.works', icon: Wrench },
      { labelKey: 'sectors.constructions.risks.delays', icon: TrendingUp },
    ],
    solutions: [
      'sectors.constructions.solutions.decennial',
      'sectors.constructions.solutions.all_risks',
      'sectors.constructions.solutions.works',
      'sectors.constructions.solutions.loss',
    ],
  },
  {
    key: 'energie',
    image: '/static/energie.png',
    color: 'blue',
    risks: [
      { labelKey: 'sectors.energie.risks.forage', icon: Droplet },
      { labelKey: 'sectors.energie.risks.platform', icon: Wind },
      { labelKey: 'sectors.energie.risks.pipeline', icon: Zap },
      { labelKey: 'sectors.energie.risks.production', icon: TrendingUp },
    ],
    solutions: [
      'sectors.energie.solutions.all_risks',
      'sectors.energie.solutions.production_loss',
      'sectors.energie.solutions.rc',
      'sectors.energie.solutions.transport',
    ],
  },
];

const COLOR_MAP = {
  green: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200' },
  orange: { bg: 'bg-orange-50', text: 'text-orange-600', border: 'border-orange-200' },
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200' },
};

export default function SectorsPage() {
  const { t, locale } = useTranslation();
  const isRTL = locale === 'ar';
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.1 }
    );
    if (pageRef.current) observer.observe(pageRef.current);
    return () => observer.disconnect();
  }, []);

  // ✅ Version modifiée pour accepter un seul argument
  const getTranslation = (key: string): string => {
    try {
      const value = key.split('.').reduce((obj, k) => obj?.[k], t);
      return typeof value === 'string' ? value : key;
    } catch {
      return key;
    }
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-linear-to-br from-[#f0f4ff] to-[#faf0ff] text-[#0a1628] pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* En-tête de la page */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block bg-[#0a1628] text-white px-4 py-1 rounded-full text-xs md:text-sm font-medium mb-3">
            {t.sectors?.tag || 'Expertise sectorielle'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628]">
            {t.sectors?.title || 'SECTEURS D\'ACTIVITÉ'}
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0a1628] mt-2">
            {t.sectors?.subtitle || 'DES EXPERTISES ADAPTÉES À VOS SECTEURS'}
          </h2>
        </div>

        {/* Grille des 4 secteurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8">
          {SECTORS.map((sector, index) => {
            const colors = COLOR_MAP[sector.color as keyof typeof COLOR_MAP];
            return (
              <motion.div
                key={sector.key}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.02 }}
                className={`bg-white rounded-xl p-4 md:p-5 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border ${colors.border}`}
              >
                {/* Image */}
                <div className="relative h-40 md:h-48 w-full rounded-lg overflow-hidden mb-4">
                  <Image
                    src={sector.image}
                    alt={getTranslation(`sectors.${sector.key}.title`)}
                    fill
                    className="object-cover"
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                {/* Titre */}
                <h3 className="text-base md:text-lg font-bold text-[#0a1628] mb-2 uppercase">
                  {getTranslation(`sectors.${sector.key}.title`)}
                </h3>

                {/* Description courte */}
                <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                  {getTranslation(`sectors.${sector.key}.desc`)}
                </p>

                {/* Risques spécifiques */}
                <div className="mb-4">
                  <h4 className="text-xs font-bold text-[#0a1628] uppercase mb-2 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-[#eab308]" />
                    {getTranslation('sectors.risks_title')}
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {sector.risks.map((risk, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <risk.icon className={`w-3 h-3 ${colors.text} shrink-0 mt-0.5`} />
                        <span>{getTranslation(risk.labelKey)}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Solutions d'assurance */}
                <div className="bg-[#0a1628]/5 p-3 rounded-lg mb-2">
                  <h4 className="text-xs font-bold text-[#0a1628] uppercase mb-1 flex items-center gap-1">
                    <Shield className="w-3 h-3 text-[#eab308]" />
                    {getTranslation('sectors.solutions_title')}
                  </h4>
                  <ul className="text-xs text-gray-600 space-y-0.5">
                    {sector.solutions.map((solution, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#eab308] mt-0.5">•</span>
                        <span>{getTranslation(solution)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bannière bas de page */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-10 md:mt-14"
        >
          <div className="bg-[#0a1628] text-white rounded-xl p-5 md:p-6 text-center shadow-lg">
            <p className="text-sm md:text-base font-medium">
              {t.sectors?.banner || 'Pour chaque secteur, une étude macro des risques et des solutions sur mesure.'}
            </p>
            <Link
              href={`/${locale}/#contact`}
              className="inline-block mt-3 bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold px-4 md:px-6 py-2 rounded-lg transition transform hover:scale-105 text-xs md:text-sm"
            >
              {t.sectors?.cta_banner || 'Demander une étude'}
            </Link>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
