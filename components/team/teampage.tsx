// components/team/TeamPage.tsx
'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import { Mail, Phone, Linkedin, Award, ShieldCheck, Globe, Leaf, Users, Target } from 'lucide-react';

export default function TeamPage() {
  const { t, locale, changeLanguage } = useTranslation();
  const isRTL = locale === 'ar';

  return (
    <div className={`min-h-screen bg-[#0f172a] text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header t={t} locale={locale} changeLanguage={changeLanguage} />
      
      <main className="container mx-auto px-6 py-12 space-y-16">
        
        {/* ===== HERO SECTION ===== */}
        <section className="text-center max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            {t?.team?.hero_title || 'Notre Équipe de Direction'}
          </h1>
          <p className="text-lg text-gray-300">
            {t?.team?.hero_subtitle || 'Des experts engagés pour une métallurgie d\'avenir'}
          </p>
        </section>

        {/* ===== PROFIL GÉRANT ===== */}
        <section className="bg-[#1e293b] rounded-2xl p-6 md:p-8 border border-gray-700 shadow-lg hover:border-orange-500 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0">
              <div className="w-full h-full rounded-full bg-linear-to-br from-orange-500 to-amber-600 p-1">
                <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center text-2xl font-bold text-white">
                  {t?.team?.manager_initials || 'BA'}
                </div>
              </div>
            </div>
            
            {/* Infos */}
            <div className={`flex-1 space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold">{t?.team?.manager_name || 'Boulaioune Abdelkader'}</h2>
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {t?.team?.manager_role || 'Gérant & Fondateur'}
                </span>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {t?.team?.manager_bio || 'Fort de 20 ans d\'expérience dans les filières métallurgiques et logistiques, Abdelkader Boulaioune a fondé Shlang Metal en 2026 avec une vision claire : connecter l\'Algérie aux marchés internationaux avec des standards de qualité irréprochables. Diplômé de l\'École Polytechnique d\'Alger, il a piloté plus de 300 000 tonnes d\'exportation vers l\'Europe, le Moyen-Orient et l\'Afrique.'}
              </p>

              {/* Compétences */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-gray-800 text-xs text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                  {t?.team?.skill_1 || 'Logistique internationale'}
                </span>
                <span className="bg-gray-800 text-xs text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                  {t?.team?.skill_2 || 'Négociation'}
                </span>
                <span className="bg-gray-800 text-xs text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                  {t?.team?.skill_3 || 'Conformité'}
                </span>
                <span className="bg-gray-800 text-xs text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                  {t?.team?.skill_4 || 'Réseau international'}
                </span>
              </div>

              {/* Contact */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4 text-sm">
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className="w-4 h-4 text-orange-500" />
                  <span>boulaioune_abdelkader@shlang.dz</span>
                </div>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>+213 770 684 184</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== PROFIL COGÉRANT ===== */}
        <section className="bg-[#1e293b] rounded-2xl p-6 md:p-8 border border-gray-700 shadow-lg hover:border-orange-500 transition-all duration-300">
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            {/* Avatar */}
            <div className="w-32 h-32 md:w-40 md:h-40 shrink-0">
              <div className="w-full h-full rounded-full bg-linear-to-br from-orange-500 to-amber-600 p-1">
                <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center text-2xl font-bold text-white">
                  {t?.team?.cmanager_initials || 'AM'}
                </div>
              </div>
            </div>
            
            {/* Infos */}
            <div className={`flex-1 space-y-3 ${isRTL ? 'text-right' : 'text-left'}`}>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold">{t?.team?.cmanager_name || 'Akrour Mansour'}</h2>
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {t?.team?.cmanager_role || 'Cogérant & Directeur des Opérations'}
                </span>
              </div>
              
              <p className="text-gray-300 leading-relaxed">
                {t?.team?.cmanager_bio || 'Mansour Akrour apporte une expertise terrain essentielle à Shlang Metal. Véritable artisan de la fluidité logistique, il supervise l\'approvisionnement, le contrôle qualité et les opérations portuaires. Avec plus de 15 ans de pratique dans la gestion de parcs à ferraille, il a su transformer des contraintes d\'approvisionnement en opportunités stratégiques.'}
              </p>

              {/* Compétences */}
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="bg-gray-800 text-xs text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                  {t?.team?.skill_5 || 'Gestion opérationnelle'}
                </span>
                <span className="bg-gray-800 text-xs text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                  {t?.team?.skill_6 || 'Contrôle qualité'}
                </span>
                <span className="bg-gray-800 text-xs text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                  {t?.team?.skill_7 || 'Logistique terrain'}
                </span>
                <span className="bg-gray-800 text-xs text-gray-300 px-3 py-1 rounded-full border border-gray-700">
                  {t?.team?.skill_8 || 'Relation fournisseurs'}
                </span>
              </div>

              {/* Contact */}
              <div className="flex flex-col sm:flex-row gap-2 mt-4 text-sm">
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Mail className="w-4 h-4 text-orange-500" />
                  <span>akrour_mansour@shlang.dz</span>
                </div>
                <div className={`flex items-center gap-2 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Phone className="w-4 h-4 text-orange-500" />
                  <span>+213 770 684 195</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== NOTRE ENGAGEMENT ===== */}
        <section className="bg-[#1e293b] rounded-2xl p-6 md:p-8 border border-gray-700">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-orange-500 pl-4">
            {t?.team?.ethics_title || 'Notre Engagement'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className={`flex items-start gap-3 p-4 bg-[#0f172a] rounded-lg border border-gray-800 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <ShieldCheck className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-base">{t?.team?.ethics_transparency || 'Transparence'}</h3>
                <p className="text-sm text-gray-400">{t?.team?.ethics_transparency_desc || 'Toutes nos transactions sont documentées et traçables, du chargement jusqu\'à la livraison.'}</p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 bg-[#0f172a] rounded-lg border border-gray-800 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <Award className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-base">{t?.team?.ethics_compliance || 'Conformité'}</h3>
                <p className="text-sm text-gray-400">{t?.team?.ethics_compliance_desc || 'Nous respectons les normes internationales ASTM, EN et ISO 9001:2015.'}</p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 bg-[#0f172a] rounded-lg border border-gray-800 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <Users className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-base">{t?.team?.ethics_ethics || 'Éthique'}</h3>
                <p className="text-sm text-gray-400">{t?.team?.ethics_ethics_desc || 'Pratiques commerciales loyales, respect des réglementations douanières et fiscales.'}</p>
              </div>
            </div>
            <div className={`flex items-start gap-3 p-4 bg-[#0f172a] rounded-lg border border-gray-800 ${isRTL ? 'flex-row-reverse text-right' : ''}`}>
              <Leaf className="w-6 h-6 text-orange-500 shrink-0 mt-1" />
              <div>
                <h3 className="font-bold text-base">{t?.team?.ethics_responsibility || 'Responsabilité'}</h3>
                <p className="text-sm text-gray-400">{t?.team?.ethics_responsibility_desc || 'Promotion de l\'économie circulaire et du recyclage des métaux.'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ===== NOS VALEURS ===== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 text-center hover:border-orange-500 transition-colors">
            <ShieldCheck className="w-12 h-12 text-orange-500 mx-auto mb-3" />
            <h3 className="font-bold text-lg">{t?.team?.value_integrity || 'Intégrité'}</h3>
            <p className="text-sm text-gray-400 mt-1">
              {t?.team?.value_integrity_desc || 'La confiance se gagne par la transparence.'}
            </p>
          </div>
          <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 text-center hover:border-orange-500 transition-colors">
            <Target className="w-12 h-12 text-orange-500 mx-auto mb-3" />
            <h3 className="font-bold text-lg">{t?.team?.value_expertise || 'Expertise'}</h3>
            <p className="text-sm text-gray-400 mt-1">
              {t?.team?.value_expertise_desc || 'La maîtrise du produit et du marché.'}
            </p>
          </div>
          <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-700 text-center hover:border-orange-500 transition-colors">
            <Globe className="w-12 h-12 text-orange-500 mx-auto mb-3" />
            <h3 className="font-bold text-lg">{t?.team?.value_partnership || 'Partenariat'}</h3>
            <p className="text-sm text-gray-400 mt-1">
              {t?.team?.value_partnership_desc || 'Une vision à long terme avec nos clients.'}
            </p>
          </div>
        </section>

        {/* ===== STATISTIQUES ===== */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-800 hover:border-orange-500 transition-colors">
            <Award className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">35+</div>
            <div className="text-xs text-gray-400">{t?.team?.stat_exp || 'Expérience combinée (années)'}</div>
          </div>
          <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-800 hover:border-orange-500 transition-colors">
            <Globe className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">3</div>
            <div className="text-xs text-gray-400">{t?.team?.stat_ports || 'Ports opérés'}</div>
          </div>
          <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-800 hover:border-orange-500 transition-colors">
            <Users className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">20+</div>
            <div className="text-xs text-gray-400">{t?.team?.stat_countries || 'Pays desservis'}</div>
          </div>
          <div className="bg-[#1e293b] p-4 rounded-xl border border-gray-800 hover:border-orange-500 transition-colors">
            <Target className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold">100k+</div>
            <div className="text-xs text-gray-400">{t?.team?.stat_volume || 'Volume annuel (tonnes)'}</div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="bg-[#1e293b] rounded-2xl p-8 border border-gray-700 text-center">
          <h3 className="text-xl font-bold mb-2">
            {t?.team?.cta_title || 'Envie d’échanger avec nos experts ?'}
          </h3>
          <p className="text-gray-400 mb-4">
            {t?.team?.cta_subtitle || 'Réponse sous 24h'}
          </p>
          <a
            href={`/${locale}/contact`}
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-3 rounded-md transition"
          >
            {t?.team?.cta_button || 'Contactez notre équipe'}
          </a>
        </section>

      </main>

    </div>
  );
}