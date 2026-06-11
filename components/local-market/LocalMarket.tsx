// components/local-market/LocalMarket.tsx
'use client';

import { memo } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { MapPin, Zap, Factory } from 'lucide-react';
import { LocalMarketCard } from './LocalMarketCard';

interface LocalMarketProps {
  t?: any;
  locale?: string;
}

export const LocalMarket = memo(({ t: propT, locale: propLocale }: LocalMarketProps = {}) => {
  const { t: hookT, locale: hookLocale } = useTranslation();
  const t = propT || hookT;
  const locale = propLocale || hookLocale;
  const isRTL = locale === 'ar';

  const items = [
    {
      id: 'anchor',
      icon: MapPin,
      titleKey: 'local_market.anchor_title',
      descKey: 'local_market.anchor_desc',
      image: '/images/local/anchor.jpg',
      altKey: 'local_market.anchor_alt',
    },
    {
      id: 'leadership',
      icon: Zap,
      titleKey: 'local_market.leadership_title',
      descKey: 'local_market.leadership_desc',
      image: '/images/local/leadership.jpg',
      altKey: 'local_market.leadership_alt',
    },
    {
      id: 'mastery',
      icon: Factory,
      titleKey: 'local_market.mastery_title',
      descKey: 'local_market.mastery_desc',
      image: '/images/local/mastery.jpg',
      altKey: 'local_market.mastery_alt',
    },
  ];

  return (
    <section className="py-8 md:py-10 bg-[#0f172a] text-white relative overflow-hidden mt-16 md:mt-24">
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {t?.local_market?.title || 'Une maîtrise locale du marché des métaux en Algérie'}
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            {t?.local_market?.subtitle || 'Un leadership engagé, une expertise reconnue'}
          </p>
          <div className="w-16 h-1 bg-orange-500 mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {items.map((item, index) => (
            <LocalMarketCard
              key={item.id}
              t={t}
              item={item}
              isRTL={isRTL}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

LocalMarket.displayName = 'LocalMarket';