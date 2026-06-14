'use client';

import { useRef, useEffect, useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { ChevronDown, ChevronUp, HelpCircle, Search } from 'lucide-react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function FAQ() {
  const { t, locale } = useTranslation();
  const isRTL = locale === 'ar';
  const pageRef = useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

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

  const faqs = [
    { q: 'faq_1_q', a: 'faq_1_a' },
    { q: 'faq_2_q', a: 'faq_2_a' },
    { q: 'faq_3_q', a: 'faq_3_a' },
    { q: 'faq_4_q', a: 'faq_4_a' },
    { q: 'faq_5_q', a: 'faq_5_a' },
    { q: 'faq_6_q', a: 'faq_6_a' },
  ];

  const filteredFaqs = searchQuery
    ? faqs.filter(faq => 
        t.legal?.[faq.q]?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.legal?.[faq.a]?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs;

  return (
    <div ref={pageRef} className="min-h-screen bg-linear-to-br from-[#f8fafc] to-[#e8f0fe] text-[#0a1628] pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Bouton retour */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0a1628] hover:underline mb-6 transition"
        >
          <ArrowLeft size={16} />
          {t.legal?.back || 'Retour à l\'accueil'}
        </Link>

        {/* En-tête avec icône */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-[#0a1628] p-3 rounded-full">
              <HelpCircle className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628]">
              {t.legal?.faq_title || 'FAQ'}
            </h1>
          </div>
          <p className="text-sm text-gray-500 ml-1">
            {t.legal?.faq_subtitle || 'Trouvez rapidement les réponses à vos questions.'}
          </p>
        </div>

        {/* Barre de recherche */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.legal?.faq_search_placeholder || 'Rechercher une question...'}
              className="w-full bg-white border border-gray-200 rounded-xl px-12 py-4 focus:outline-none focus:border-[#0a1628] shadow-sm transition"
            />
          </div>
        </div>

        {/* Liste des questions */}
        <div className="space-y-3">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className={`w-full text-left px-4 md:px-6 py-3 md:py-4 flex items-center justify-between transition ${isRTL ? 'text-right' : 'text-left'}`}
                >
                  <span className="font-medium text-sm md:text-base text-[#0a1628]">{t.legal?.[faq.q] || 'Question'}</span>
                  {openIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
                {openIndex === index && (
                  <div className="px-4 md:px-6 pb-3 md:pb-4 border-t border-gray-100">
                    <p className="text-sm md:text-base text-gray-600 leading-relaxed">{t.legal?.[faq.a] || 'Réponse'}</p>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {t.legal?.faq_no_results || 'Aucune question trouvée.'}
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}