'use client';

import { useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Users, Shield, Scale, Headphones, Factory, Building2, Briefcase, HeartHandshake, Award, TrendingUp, Globe, Lock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const TEAM_MEMBERS = [
  { icon: Factory, key: 'engineers', color: 'blue', expertise: ['Risques industriels', 'ATEX', 'HSE', 'Sûreté de fonctionnement'] },
  { icon: Shield, key: 'specialists', color: 'emerald', expertise: ['Assurance dommages', 'Réassurance', 'RC Professionnelle', 'Capitaux'] },
  { icon: Scale, key: 'lawyers', color: 'purple', expertise: ['Responsabilité civile', 'Conformité réglementaire', 'Droit des assurances', 'Litiges'] },
  { icon: Headphones, key: 'adjusters', color: 'orange', expertise: ['Gestion des sinistres', 'Expertise technique', 'Suivi des dossiers', 'Règlement'] },
];

const COLOR_MAP = {
  blue: { bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/40', glow: 'rgba(59,130,246,0.15)' },
  emerald: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/40', glow: 'rgba(16,185,129,0.15)' },
  purple: { bg: 'bg-purple-500/20', text: 'text-purple-400', border: 'border-purple-500/40', glow: 'rgba(168,85,247,0.15)' },
  orange: { bg: 'bg-orange-500/20', text: 'text-orange-400', border: 'border-orange-500/40', glow: 'rgba(249,115,22,0.15)' },
};

export default function TeamSection() {
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

  // ✅ Helper pour les objets imbriqués
  const getNestedTranslation = (key: string, fallback: string): string => {
    const keys = key.split('.');
    let value: any = t;
  
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return fallback;
      }
    }
  
    return typeof value === 'string' ? value : fallback;
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-[#0a1628] text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628] via-[#0f1a2e] to-[#0a1628] opacity-50" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        
        {/* En-tête de la section */}
        <div className="text-center mb-16 md:mb-20">

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {t.team?.title || 'UNE ÉQUIPE D\'EXPERTS À VOTRE SERVICE'}
          </h2>
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto mt-4">
            {t.team?.subtitle || 'Des compétences pluridisciplinaires pour vous apporter les meilleures solutions.'}
          </p>
          <div className="w-24 h-1 bg-[#eab308] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Grille des 4 profils */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
          {TEAM_MEMBERS.map((member, index) => {
            const colors = COLOR_MAP[member.color as keyof typeof COLOR_MAP];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group relative bg-[#0f1a2e] rounded-2xl p-8 border border-white/10 hover:border-[#eab308]/50 transition-all duration-500 hover:shadow-[0_0_40px_rgba(234,179,8,0.1)]"
              >
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`} style={{ background: `radial-gradient(circle at 50% 0%, ${colors.glow}, transparent 70%)` }} />
                
                <div className={`relative w-20 h-20 mx-auto rounded-full ${colors.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <member.icon className={`w-10 h-10 ${colors.text}`} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 text-center">
                  {getNestedTranslation(`team.${member.key}.title`, 'Titre')}
                </h3>
                
                <p className="text-gray-400 text-sm text-center mb-6">
                  {getNestedTranslation(`team.${member.key}.desc`, 'Description')}
                </p>
                
                <div className="w-full border-t border-white/10 mb-6"></div>
                
                <div>
                  <p className="text-xs text-gray-500 font-medium mb-3 uppercase tracking-wider text-center">
                    {t.team?.expertise_label || 'DOMAINES D\'EXPERTISE'}
                  </p>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {member.expertise.map((exp, i) => (
                      <span key={i} className="text-[10px] md:text-xs bg-[#eab308]/10 text-[#eab308] px-3 py-1 rounded-full">
                        {exp}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Section supplémentaire : Chiffres clés de l'équipe */}
        <div className="mt-20 pt-12 border-t border-white/10">
          <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-[#eab308] group-hover:scale-110 transition-transform duration-300">15+</div>
              <p className="text-gray-400 text-sm mt-2">{t.team?.stat_1 || 'Années d\'expérience'}</p>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-[#eab308] group-hover:scale-110 transition-transform duration-300">50+</div>
              <p className="text-gray-400 text-sm mt-2">{t.team?.stat_2 || 'Projets accompagnés'}</p>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-[#eab308] group-hover:scale-110 transition-transform duration-300">100%</div>
              <p className="text-gray-400 text-sm mt-2">{t.team?.stat_3 || 'Satisfaction client'}</p>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold text-[#eab308] group-hover:scale-110 transition-transform duration-300">24/7</div>
              <p className="text-gray-400 text-sm mt-2">{t.team?.stat_4 || 'Support disponible'}</p>
            </div>
          </div>
        </div>

        {/* CTA vers l'équipe */}
        <div className="mt-12 text-center">
          <Link
            href={`/${locale}/#contact`}
            className="inline-flex items-center gap-2 bg-[#eab308] hover:bg-yellow-500 text-[#0a1628] font-bold px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105"
          >
            {t.team?.cta || 'Rencontrer notre équipe'}
            <ChevronRight size={18} />
          </Link>
        </div>

      </div>
    </section>
  );
}