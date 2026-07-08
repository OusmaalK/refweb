'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

interface BridgeSectionProps {
  variant?: 'default' | 'light' | 'dark' | 'compact';
  titleKey?: string;
  subtitleKey?: string;
  ctaKey?: string;
  ctaLink?: string;
  className?: string;
}

export default function BridgeSection({
  variant = 'default',
  titleKey = 'bridge.title',
  subtitleKey = 'bridge.subtitle',
  ctaKey = 'bridge.cta',
  ctaLink = '/rfc-app',
  className = '',
}: BridgeSectionProps) {
  const { t, locale } = useTranslation();
  const isRTL = locale === 'ar';

  // Bouton personnalisé : Fond blanc, texte rouge, bordure rouge
  const buttonStyle = "bg-white hover:bg-gray-50 text-[#ef4444] border-2 border-[#ef4444] font-bold transition transform hover:scale-105";

  const variants = {
    default: {
      container: 'bg-[#0a1628] text-white',
      title: 'text-white',
      subtitle: 'text-gray-300',
      button: buttonStyle,
    },
    light: {
      container: 'bg-[#e8f0fe] text-[#0a1628]',
      title: 'text-[#0a1628]',
      subtitle: 'text-gray-600',
      button: buttonStyle,
    },
    dark: {
      container: 'bg-[#0f1a2e] text-white',
      title: 'text-white',
      subtitle: 'text-gray-400',
      button: buttonStyle,
    },
    compact: {
      container: 'bg-[#0a1628] text-white py-4',
      title: 'text-white text-base md:text-lg',
      subtitle: 'text-gray-300 text-sm',
      button: `${buttonStyle} text-sm px-4 py-1.5`,
    },
  };

  const style = variants[variant] || variants.default;

  const getTranslation = (key: string, fallback: string): string => {
    if (key && typeof t === 'object') {
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
    }
    return fallback;
  };

  return (
    <section className={`w-full py-8 md:py-12 ${style.container} ${className}`}>
      <div className="container mx-auto px-4 md:px-6">
        <div className={`max-w-4xl mx-auto text-center ${isRTL ? 'rtl' : 'ltr'}`}>
          
          <h2 className={`text-xl md:text-2xl lg:text-3xl font-bold mb-3 ${style.title}`}>
            {getTranslation(titleKey, 'Une plateforme de gestion conçue pour les courtiers d\'assurance')}
          </h2>

          <p className={`text-sm md:text-base mb-4 md:mb-6 max-w-2xl mx-auto ${style.subtitle}`}>
            {getTranslation(subtitleKey, 'Plans Essentiel, Pro & Expert pour optimiser la gestion de vos clients, contrats et sinistres.')}
          </p>

          <Link
            href={`/${locale}${ctaLink}`}
            className={`inline-block px-6 md:px-8 py-2.5 md:py-3 rounded-full ${style.button}`}
          >
            {getTranslation(ctaKey, 'Accéder à mon espace')}
          </Link>

        </div>
      </div>
    </section>
  );
}
