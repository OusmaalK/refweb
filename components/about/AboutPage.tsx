'use client';

import { useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';
import { ArrowRight, Target, Award, Users, CheckCircle, HeartHandshake, TrendingUp } from 'lucide-react';

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
    <div ref={pageRef} className="min-h-screen bg-linear-to-br from-[#e8f0fe] to-[#d4e2f5] text-[#0a1628] pt-16 md:pt-20 lg:pt-24 pb-12">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* En-tête de la page */}
        <div className="mb-10 text-center">
          <div className="inline-block bg-[#0a1628] text-white px-4 py-1 rounded-full text-xs md:text-sm font-medium mb-2">
            {t.about?.tag || 'Qui sommes-nous ?'}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628]">
            {t.about?.page_title || 'À PROPOS DE RFC'}
          </h1>
          <div className="w-16 h-1 bg-[#ef4444] mx-auto mt-2"></div>
        </div>

        {/* Section principale */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-10 items-center">
          <div className={`order-2 lg:order-1 ${isRTL ? 'rtl' : 'ltr'}`}>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              {t.about?.full_description || 'Depuis 2014, RFC accompagne les entreprises industrielles, commerciales et de services dans la maîtrise de leurs risques.'}
            </p>
            <p className="text-base md:text-lg text-gray-700 leading-relaxed mb-4">
              {t.about?.full_description_2 || 'Nous veillons à la protection de nos clients à chaque étape, de la souscription jusqu\'au règlement définitif des sinistres.'}
            </p>
            
            <div className="bg-white/70 p-5 rounded-lg mb-5 border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-5 h-5 text-[#ef4444]" />
                <h3 className="text-base font-bold text-[#0a1628]">{t.about?.mission || 'Notre mission'}</h3>
              </div>
              <p className="text-sm md:text-base text-gray-700">
                {t.about?.mission_desc || 'Offrir une protection optimale grâce à une expertise technique approfondie.'}
              </p>
            </div>

            <Link
              href={`/${locale}/rfc-app`}
              className="inline-flex items-center gap-2 bg-[#ef4444] hover:bg-yellow-500 text-white font-bold px-6 py-3 rounded-lg transition-all transform hover:scale-105"
            >
              {t.about?.cta_rfcapp || 'Découvrir RFC-App'}
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className={`order-1 lg:order-2 ${isRTL ? 'rtl' : 'ltr'}`}>
            <div className="relative h-72 w-full rounded-2xl overflow-hidden shadow-xl">
              <Image src="/static/building.png" alt="Bâtiment RFC" fill className="object-cover" />
            </div>
          </div>
        </div>

        {/* Section Nos valeurs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-8">
          {[
            { icon: Award, title: t.about?.value_1 || 'Transparence', desc: t.about?.value_1_desc || 'Relation de confiance' },
            { icon: Award, title: t.about?.value_2 || 'Expertise', desc: t.about?.value_2_desc || 'Équipe qualifiée' },
            { icon: HeartHandshake, title: t.about?.value_3 || 'Engagement', desc: t.about?.value_3_desc || 'Suivi personnalisé' },
            { icon: TrendingUp, title: t.about?.value_4 || 'Innovation', desc: t.about?.value_4_desc || 'Solutions adaptées' }
          ].map((val, i) => (
            <div key={i} className="bg-white/80 p-4 rounded-lg border border-gray-200 text-center hover:shadow-md transition">
              <val.icon className="w-8 h-8 text-[#ef4444] mx-auto mb-2" />
              <h4 className="text-sm font-bold text-[#0a1628]">{val.title}</h4>
              <p className="text-xs text-gray-500">{val.desc}</p>
            </div>
          ))}
        </div>

        {/* Section Pourquoi nous choisir : ICONES CENTRÉES AU-DESSUS */}
        <div className="bg-[#0a1628] text-white rounded-xl p-8 mb-8 shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold mb-10 text-center">
            {t.about?.why_us_title || 'Pourquoi nous choisir ?'}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[t.about?.why_us_1, t.about?.why_us_2, t.about?.why_us_3, t.about?.why_us_4].map((text, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-4">
                <CheckCircle className="w-10 h-10 text-[#ef4444]" />
                <span className="text-sm md:text-base font-medium leading-snug">{text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Section des chiffres clés */}
{/* Section des chiffres clés - Version raffinée */}
<div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
    {[
      { val: "2014", title: t.about?.stat_1_title || "Création" },
      { val: "15+", title: t.about?.stat_2_title || "Années" },
      { val: "100+", title: t.about?.stat_3_title || "Partenaires" },
      { val: "4", title: t.about?.stat_4_title || "Pôles" }
    ].map((stat, i) => (
      <div key={i} className="flex flex-col items-center text-center space-y-1">
        {/* Icône plus petite et sobre */}
        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center mb-1">
          <Users className="w-5 h-5 text-[#0a1628]" />
        </div>
        
        {/* Valeur numérique plus légère */}
        <div className="text-2xl font-bold text-[#0a1628]">
          {stat.val}
        </div>
        
        {/* Titre minimal */}
        <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide">
          {stat.title}
        </div>
      </div>
    ))}
  </div>
</div>

      </div>
    </div>
  );
}