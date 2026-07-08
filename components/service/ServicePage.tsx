'use client';

import { useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { 
  Factory, Users, Building, Heart, 
  Shield, TrendingUp, FileText, Briefcase,
  AlertTriangle, CheckCircle, Clock, Phone,
  Plane, Car, Home, Umbrella
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

const SERVICES = [
  {
    icon: Factory,
    titleKey: 'protect_assets',
    color: 'blue',
    description: 'Protection de vos actifs matériels et immatériels',
    items: [
      { label: 'Dommages aux biens (incendie, dégâts des eaux, vol)', icon: Shield },
      { label: 'Pertes d\'exploitation (interruption d\'activité)', icon: TrendingUp },
      { label: 'Flottes automobiles (véhicules professionnels)', icon: Car },
      { label: 'Transports (marchandises et fret)', icon: Plane },
    ],
  },
  {
    icon: Users,
    titleKey: 'protect_liabilities',
    color: 'emerald',
    description: 'Couverture de vos responsabilités civiles et professionnelles',
    items: [
      { label: 'RC Exploitation (dommages causés aux tiers)', icon: AlertTriangle },
      { label: 'RC Produits livrés (défauts de fabrication)', icon: CheckCircle },
      { label: 'RC Professionnelle (erreurs, omissions, conseils)', icon: Clock },
      { label: 'RC Dirigeants (responsabilité des mandataires sociaux)', icon: Phone },
    ],
  },
  {
    icon: Building,
    titleKey: 'protect_projects',
    color: 'purple',
    description: 'Protection de vos projets et chantiers',
    items: [
      { label: 'Risques chantiers (travaux, installations)', icon: Home },
      { label: 'Risques montage (assemblage, installation)', icon: Umbrella },
      { label: 'RC Décennale (garantie décennale des constructeurs)', icon: CheckCircle },
    ],
  },
  {
    icon: Heart,
    titleKey: 'protect_employees',
    color: 'rose',
    description: 'Protection de vos collaborateurs',
    items: [
      { label: 'Prévoyance collective (décès, invalidité, incapacité)', icon: Heart },
      { label: 'Complémentaire santé (remboursements santé)', icon: CheckCircle },
      { label: 'Assurance voyage (déplacements professionnels)', icon: Plane },
    ],
  },
];

const COLOR_MAP = {
  blue: { bg: 'bg-blue-50', text: 'text-blue-600', border: 'border-blue-200', hover: 'hover:bg-blue-100' },
  emerald: { bg: 'bg-emerald-50', text: 'text-emerald-600', border: 'border-emerald-200', hover: 'hover:bg-emerald-100' },
  purple: { bg: 'bg-purple-50', text: 'text-purple-600', border: 'border-purple-200', hover: 'hover:bg-purple-100' },
  rose: { bg: 'bg-rose-50', text: 'text-rose-600', border: 'border-rose-200', hover: 'hover:bg-rose-100' },
};

export default function ServicesPage() {
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

  const getTranslation = (key: string, fallback: string): string => {
    if (key && t.services && typeof t.services === 'object') {
      if (key in t.services) {
        const value = t.services[key as keyof typeof t.services];
        return typeof value === 'string' ? value : fallback;
      }
    }
    return fallback;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div ref={pageRef} className="min-h-screen bg-linear-to-br from-[#f0f4ff] to-[#faf0ff] text-[#0a1628] pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* En-tête de la page */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 md:mb-14"
        >
          <div className="inline-block bg-[#0a1628] text-white px-4 py-1 rounded-full text-xs md:text-sm font-medium mb-3">
            {t.services?.tag || 'Protection 360°'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2">
            {t.services?.title || 'NOS PRESTATIONS'}
          </h1>
          <p className="text-gray-600 text-sm md:text-base">
            {t.services?.subtitle || 'Une offre complète pour une protection à 360°'}
          </p>
          <div className="w-16 h-1 bg-[#ef4444] mx-auto mt-3"></div>
        </motion.div>

        {/* Grille des 4 piliers */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
        >
          {SERVICES.map((service, index) => {
            const colors = COLOR_MAP[service.color as keyof typeof COLOR_MAP];
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                className={`bg-white rounded-2xl p-5 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col group ${colors.border} hover:border-${service.color}-400`}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl ${colors.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                  <service.icon className={`w-6 h-6 md:w-7 md:h-7 ${colors.text}`} />
                </div>
                <h3 className="text-sm md:text-base font-bold text-[#0a1628] mb-1 uppercase">
                  {getTranslation(service.titleKey, 'Titre')}
                </h3>
                <p className="text-xs md:text-sm text-gray-500 mb-3">
                  {service.description}
                </p>
                <ul className="text-xs md:text-sm text-gray-600 space-y-2 text-left w-full">
                  {service.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <item.icon className={`w-3 h-3 md:w-4 md:h-4 ${colors.text} shrink-0 mt-0.5`} />
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mt-10 md:mt-14 text-center"
        >
          <Link
          href={`/${locale}/#contact`}
          className="inline-block bg-[#ef4444] hover:bg-[#dc2626] text-white font-bold px-6 md:px-8 py-3 rounded-lg transition transform hover:scale-105 shadow-lg"
        >
          {t.services?.cta || 'Demander un devis'}
        </Link>
        </motion.div>

      </div>
    </div>
  );
}