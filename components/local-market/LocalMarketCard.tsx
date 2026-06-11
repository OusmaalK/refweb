// components/local-market/LocalMarketCard.tsx
'use client';

import { memo } from 'react';
import Image from 'next/image';

interface LocalMarketCardProps {
  t: any;
  item: any;
  isRTL: boolean;
  index: number;
}

export const LocalMarketCard = memo(({ t, item, isRTL, index }: LocalMarketCardProps) => {
  // Extraire le nom de la clé sans le préfixe
  const titleKey = item.titleKey.split('.')[1];
  const descKey = item.descKey.split('.')[1];
  const altKey = item.altKey.split('.')[1];

  return (
    <div className="group relative bg-[#1e293b] rounded-xl overflow-hidden border border-gray-800 hover:border-orange-500/50 transition-all duration-500 hover:shadow-[0_8px_30px_rgba(249,115,22,0.15)]">
      <div className="relative h-64 md:h-72 w-full overflow-hidden">
        <Image
          src={item.image}
          alt={t?.local_market?.[altKey] || `Image ${index + 1}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#0f172a] via-transparent to-transparent opacity-60" />
      </div>
      
      <div className="p-6">
        <div className={`flex items-center gap-3 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0">
            <item.icon className="w-5 h-5 text-orange-500" />
          </div>
          <h3 className="font-bold text-lg group-hover:text-orange-500 transition-colors">
            {t?.local_market?.[titleKey] || `Bloc ${index + 1}`}
          </h3>
        </div>
        <p className="text-gray-400 text-sm leading-relaxed">
          {t?.local_market?.[descKey] || 'Description du bloc'}
        </p>
      </div>
    </div>
  );
});

LocalMarketCard.displayName = 'LocalMarketCard';