'use client';

import { useRef, useEffect } from 'react';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { motion } from 'framer-motion';
import { 
  Users, Award, Target, Shield, 
  Building2, Briefcase, Globe, 
  TrendingUp, HeartHandshake, 
  CheckCircle, Star, MapPin, 
  Phone, Mail, Clock 
} from 'lucide-react';

export default function OrganizationPage() {
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

  // ✅ Traduction simplifiée
  const getTranslation = (key: string): string => {
    try {
      const value = key.split('.').reduce((obj, k) => obj?.[k], t.organization);
      return typeof value === 'string' ? value : key;
    } catch {
      return key;
    }
  };

  const leadership = [
    { name: 'M. Karim Benali', role: getTranslation('leadership.ceo'), image: '/static/ceo.jpg' },
    { name: 'Mme. Nadia Tounsi', role: getTranslation('leadership.director'), image: '/static/director.jpg' },
    { name: 'M. Amine Bensaïd', role: getTranslation('leadership.risk'), image: '/static/risk.jpg' },
    { name: 'M. Sofiane Hamdi', role: getTranslation('leadership.brokerage'), image: '/static/brokerage.jpg' },
  ];

  const values = [
    { icon: HeartHandshake, key: 'integrity' },
    { icon: Award, key: 'excellence' },
    { icon: Users, key: 'collaboration' },
    { icon: Globe, key: 'innovation' },
  ];

  const stats = [
    { value: '15+', label: 'years_experience' },
    { value: '200+', label: 'clients' },
    { value: '50+', label: 'partners' },
    { value: '98%', label: 'satisfaction' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
            {t.organization?.tag || 'Gouvernance'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            {t.organization?.title || 'Notre Organisation'}
          </h1>
          <p className="text-gray-600 text-sm md:text-base mt-2">
            {t.organization?.subtitle || 'Une structure d\'excellence au service de vos risques'}
          </p>
          <div className="w-16 h-1 bg-[#eab308] mx-auto mt-3"></div>
        </motion.div>

        {/* Section : Mission & Vision */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mb-12 md:mb-16"
        >
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition">
            <div className="flex items-center gap-2 mb-3">
              <Target className="w-6 h-6 text-[#eab308]" />
              <h2 className="text-lg md:text-xl font-bold">
                {getTranslation('mission.title')}
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {getTranslation('mission.desc')}
            </p>
          </div>
          <div className="bg-white rounded-xl p-5 md:p-6 shadow-md hover:shadow-xl transition">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="w-6 h-6 text-[#eab308]" />
              <h2 className="text-lg md:text-xl font-bold">
                {getTranslation('vision.title')}
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              {getTranslation('vision.desc')}
            </p>
          </div>
        </motion.div>

        {/* Section : Nos valeurs */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 md:mb-16"
        >
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
            {getTranslation('values.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-4 md:p-5 shadow-md hover:shadow-xl transition text-center"
              >
                <value.icon className="w-8 h-8 md:w-10 md:h-10 text-[#eab308] mx-auto mb-2" />
                <h3 className="text-sm md:text-base font-bold">
                  {getTranslation(`values.${value.key}`)}
                </h3>
                <p className="text-xs text-gray-500">
                  {getTranslation(`values.${value.key}_desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section : Leadership */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 md:mb-16"
        >
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
            {getTranslation('leadership.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {leadership.map((leader, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-4 md:p-5 shadow-md hover:shadow-xl transition text-center"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 mx-auto rounded-full bg-[#0a1628]/10 mb-3 flex items-center justify-center">
                  <Users className="w-8 h-8 text-[#0a1628]" />
                </div>
                <h3 className="text-sm md:text-base font-bold">{leader.name}</h3>
                <p className="text-xs text-gray-500">{leader.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section : Chiffres clés */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12 md:mb-16"
        >
          <h2 className="text-xl md:text-2xl font-bold text-center mb-6">
            {getTranslation('stats.title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl p-4 md:p-5 shadow-md hover:shadow-xl transition text-center"
              >
                <div className="text-2xl md:text-3xl font-bold text-[#0a1628]">{stat.value}</div>
                <div className="text-xs md:text-sm text-gray-500">
                  {getTranslation(`stats.${stat.label}`)}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Section : Contact & Localisation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="bg-[#0a1628] text-white rounded-xl p-6 md:p-8"
        >
          <h2 className="text-xl md:text-2xl font-bold text-center mb-4">
            {getTranslation('contact.title')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            <div className="flex items-center gap-3 justify-center">
              <MapPin className="w-5 h-5 text-[#eab308]" />
              <span className="text-sm">{getTranslation('contact.address')}</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Phone className="w-5 h-5 text-[#eab308]" />
              <span className="text-sm">{getTranslation('contact.phone')}</span>
            </div>
            <div className="flex items-center gap-3 justify-center">
              <Mail className="w-5 h-5 text-[#eab308]" />
              <span className="text-sm">{getTranslation('contact.email')}</span>
            </div>
          </div>
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
            className="inline-block bg-[#0a1628] hover:bg-[#1a2a4a] text-white font-bold px-6 md:px-8 py-3 rounded-lg transition transform hover:scale-105"
          >
            {t.organization?.cta || 'Contactez-nous'}
          </Link>
        </motion.div>

      </div>
    </div>
  );
}