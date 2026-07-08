'use client';

import { useRef, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { ArrowLeft, FileText, Shield, Scale, Cookie, HelpCircle, ChevronRight } from 'lucide-react';

interface LegalPageProps {
  titleKey: string;
  contentKey: string;
  lastUpdateKey?: string;
  icon?: React.ElementType;
}

export default function LegalPage({ titleKey, contentKey, lastUpdateKey, icon }: LegalPageProps) {
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

  const IconComponent = icon || FileText;

  return (
    <div ref={pageRef} className="min-h-screen bg-linear-to-br from-[#f8fafc] to-[#e8f0fe] text-[#0a1628] pt-20 md:pt-24 lg:pt-28 pb-12 md:pb-16">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Bouton retour avec style */}
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-[#0a1628] hover:underline mb-6 transition"
        >
          <ArrowLeft size={16} />
          {t.legal?.back || 'Retour à l\'accueil'}
        </Link>

        {/* En-tête avec icône et titre */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 mb-8">
          <div className="flex items-center gap-4 mb-2">
            <div className="bg-[#0a1628] p-3 rounded-full">
              <IconComponent className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#0a1628]">
              {t.legal?.[titleKey] || 'Titre de la page'}
            </h1>
          </div>
          
          {/* Date de dernière mise à jour */}
          {lastUpdateKey && (
            <p className="text-sm text-gray-500 ml-1">
              {t.legal?.last_update || 'Dernière mise à jour le'} {t.legal?.[lastUpdateKey] || '1er janvier 2025'}
            </p>
          )}
        </div>

        {/* Contenu avec style premium */}
        <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-gray-100 prose prose-sm md:prose-lg max-w-none text-gray-700">
          <div className="[&_h3]:text-[#0a1628] [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-3 [&_ul]:space-y-1 [&_ul]:list-disc [&_ul]:pl-5 [&_p]:leading-relaxed [&_p]:mb-4">
            <div dangerouslySetInnerHTML={{ __html: t.legal?.[contentKey] || 'Contenu de la page juridique à définir.' }} />
          </div>
        </div>

      </div>
    </div>
  );
}
