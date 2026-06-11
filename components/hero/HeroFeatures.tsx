// components/hero/HeroFeatures.tsx
'use client';

import { memo } from 'react';
import { HERO_FEATURES } from '@/constants/hero';

interface HeroFeaturesProps {
  t: any;
}

export const HeroFeatures = memo(({ t }: HeroFeaturesProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 pt-4 md:pt-6 border-t border-gray-700/50 mt-4 md:mt-6">
      {HERO_FEATURES.map((feature, index) => (
        <div key={index} className="flex items-start gap-2 md:gap-3 justify-center md:justify-start">
          <feature.icon className="w-8 md:w-12 h-12 text-orange-500 shrink-0" />
          <div className="text-center md:text-left">
            <p className="font-bold text-xs md:text-base">{t?.hero?.[feature.key]}</p>
            <p className="text-[8px] md:text-xs text-gray-400 leading-tight whitespace-pre-line">{feature.sub}</p>
          </div>
        </div>
      ))}
    </div>
  );
});

HeroFeatures.displayName = 'HeroFeatures';