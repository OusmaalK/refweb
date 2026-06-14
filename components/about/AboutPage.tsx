'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight, Target, Award, Users, Shield, CheckCircle, HeartHandshake, Star, TrendingUp } from 'lucide-react';

export default function AboutPage() {
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

  return (
    <div ref={pageRef} className="min-h-screen bg-gradient-to-br from-[#e8f0fe] to-[#d4e2f5] text-[#0a1628] pt-16 md:pt-20 lg:pt-24 pb-0">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* En-tête de la page */}
        <div className="mb-6 md:mb-10 text-center">
          <div className="inline-block bg-[#0a1628] text-white px-4 py-1 rounded-full text-xs md:text-sm font-medium mb-2">
            {t.about?.tag || 'Qui sommes-nous ?'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628]">
            {t.about?.page_title || 'À PROPOS DE RFC'}
          </h1>
          <div className="w-16 h-1 bg-[#eab308] mx-auto mt-2"></div>
        </div>

        {/* Section principale : Texte à gauche, Image à droite */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10 mb-6 md:mb-10 items-center">
          <div className={`order-2 lg:order-1 ${isRTL ? 'rtl' : 'ltr'}`}>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              {t.about?.full_description || 'Depuis 2014, RFC accompagne les entreprises industrielles, commerciales et de services dans la maîtrise de leurs risques et la protection de leurs intérêts.'}
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              {t.about?.full_description_2 || 'Nous veillons à la protection de nos clients à chaque étape, de la souscription jusqu\'au règlement définitif des sinistres.'}
            </p>
            
            {/* Notre mission */}
            <div className="bg-white/70 p-4 md:p-5 rounded-lg mb-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-5 h-5 text-[#eab308]" />
                <h3 className="text-sm md:text-base font-bold text-[#0a1628]">
                  {t.about?.mission || 'Notre mission'}
                </h3>
              </div>
              <p className="text-sm md:text-base text-gray-700">
                {t.about?.mission_desc || 'Offrir à nos clients une protection optimale à un coût maîtrisé, grâce à une expertise technique et une connaissance approfondie du marché de l\'assurance.'}
              </p>
            </div>

            {/* Bouton RFC-App */}
            <Link
              href={`/${locale}/rfc-app`}
              className="inline-flex items-center gap-2 bg-[#eab308] hover:bg-yellow-500 text-[#0a1628] font-bold px-5 md:px-6 py-2.5 md:py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              {t.about?.cta_rfcapp || 'Découvrir RFC-App'}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className={`order-1 lg:order-2 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="relative h-56 md:h-72 lg:h-80 w-full rounded-2xl overflow-hidden shadow-xl group">
              <Image
                src="/static/building.png"
                alt="Bâtiment RFC"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
        </div>

        {/* Section Nos valeurs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5 mb-6 md:mb-8">
          <div className="bg-white/80 p-3 md:p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition">
            <Award className="w-6 h-6 md:w-8 md:h-8 text-[#eab308] mx-auto mb-1" />
            <h4 className="text-xs md:text-sm font-bold text-[#0a1628]">{t.about?.value_1 || 'Transparence'}</h4>
            <p className="text-[10px] md:text-xs text-gray-500">{t.about?.value_1_desc || 'Une relation de confiance'}</p>
          </div>
          <div className="bg-white/80 p-3 md:p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition">
            <Award className="w-6 h-6 md:w-8 md:h-8 text-[#eab308] mx-auto mb-1" />
            <h4 className="text-xs md:text-sm font-bold text-[#0a1628]">{t.about?.value_2 || 'Expertise'}</h4>
            <p className="text-[10px] md:text-xs text-gray-500">{t.about?.value_2_desc || 'Une équipe qualifiée'}</p>
          </div>
          <div className="bg-white/80 p-3 md:p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition">
            <HeartHandshake className="w-6 h-6 md:w-8 md:h-8 text-[#eab308] mx-auto mb-1" />
            <h4 className="text-xs md:text-sm font-bold text-[#0a1628]">{t.about?.value_3 || 'Engagement'}</h4>
            <p className="text-[10px] md:text-xs text-gray-500">{t.about?.value_3_desc || 'Un suivi personnalisé'}</p>
          </div>
          <div className="bg-white/80 p-3 md:p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition">
            <TrendingUp className="w-6 h-6 md:w-8 md:h-8 text-[#eab308] mx-auto mb-1" />
            <h4 className="text-xs md:text-sm font-bold text-[#0a1628]">{t.about?.value_4 || 'Innovation'}</h4>
            <p className="text-[10px] md:text-xs text-gray-500">{t.about?.value_4_desc || 'Des solutions adaptées'}</p>
          </div>
        </div>

        {/* Section Pourquoi nous choisir */}
        <div className="bg-[#0a1628] text-white rounded-xl p-4 md:p-6 mb-6 md:mb-8">
          <h3 className="text-lg md:text-xl font-bold mb-3 text-center">
            {t.about?.why_us_title || 'Pourquoi nous choisir ?'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#eab308] shrink-0" />
              <span className="text-xs md:text-sm">{t.about?.why_us_1 || 'Expertise reconnue depuis 2014'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#eab308] shrink-0" />
              <span className="text-xs md:text-sm">{t.about?.why_us_2 || 'Approche sur-mesure et indépendante'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#eab308] shrink-0" />
              <span className="text-xs md:text-sm">{t.about?.why_us_3 || 'Défense exclusive de vos intérêts'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-[#eab308] shrink-0" />
              <span className="text-xs md:text-sm">{t.about?.why_us_4 || 'Suivi global de la souscription au sinistre'}</span>
            </div>
          </div>
        </div>

{/* Section des chiffres clés - CERCLES INTÉGRÉS */}
<div className="mb-0">
  <div className="border-2 border-[#0a1628] bg-white rounded-xl p-4 md:p-8 relative shadow-lg">
    
    {/* Grille avec cercles intégrés */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 pt-2 md:pt-0">
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0a1628] flex items-center justify-center bg-white mb-1 shadow-sm">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-[#0a1628]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
        </div>
        <div className="text-2xl md:text-4xl font-bold text-[#0a1628]">2014</div>
        <div className="text-[10px] md:text-sm font-semibold text-[#0a1628]">{t.about?.stat_1_title || 'Création de RFC'}</div>
        <div className="text-[8px] md:text-xs text-gray-500">{t.about?.stat_1_desc || 'Expertise historique'}</div>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0a1628] flex items-center justify-center bg-white mb-1 shadow-sm">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-[#0a1628]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-2xl md:text-4xl font-bold text-[#0a1628]">15+</div>
        <div className="text-[10px] md:text-sm font-semibold text-[#0a1628]">{t.about?.stat_2_title || 'Années d\'expertise'}</div>
        <div className="text-[8px] md:text-xs text-gray-500">{t.about?.stat_2_desc || 'Approche éprouvée'}</div>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0a1628] flex items-center justify-center bg-white mb-1 shadow-sm">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-[#0a1628]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 20h5v-2a3 3 0 00-5.36-1.5M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.36-1.5M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <div className="text-2xl md:text-4xl font-bold text-[#0a1628]">100+</div>
        <div className="text-[10px] md:text-sm font-semibold text-[#0a1628]">{t.about?.stat_3_title || 'Partenaires Corporate'}</div>
        <div className="text-[8px] md:text-xs text-gray-500">{t.about?.stat_3_desc || 'Références de confiance'}</div>
      </div>
      <div className="flex flex-col items-center text-center">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#0a1628] flex items-center justify-center bg-white mb-1 shadow-sm">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-[#0a1628]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
        <div className="text-2xl md:text-4xl font-bold text-[#0a1628]">4</div>
        <div className="text-[10px] md:text-sm font-semibold text-[#0a1628]">{t.about?.stat_4_title || 'Pôles d\'expertise'}</div>
        <div className="text-[8px] md:text-xs text-gray-500">{t.about?.stat_4_desc || 'Intervention globale'}</div>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
}