// components/logistics/LogisticsMarkets.tsx
'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Globe } from 'lucide-react';
import { LOGISTICS_MARKETS } from '@/constants/logistics';
import type { LogisticsMarketsProps } from './types';

// Mapping des couleurs pour Tailwind
const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    hover: 'hover:bg-blue-100',
    text: 'text-blue-800',
    icon: 'text-blue-600',
    list: 'text-blue-700',
    ellipsis: 'text-blue-400',
  },
  green: {
    bg: 'bg-green-50',
    hover: 'hover:bg-green-100',
    text: 'text-green-800',
    icon: 'text-green-600',
    list: 'text-green-700',
    ellipsis: 'text-green-400',
  },
  orange: {
    bg: 'bg-orange-50',
    hover: 'hover:bg-orange-100',
    text: 'text-orange-800',
    icon: 'text-orange-600',
    list: 'text-orange-700',
    ellipsis: 'text-orange-400',
  },
  purple: {
    bg: 'bg-purple-50',
    hover: 'hover:bg-purple-100',
    text: 'text-purple-800',
    icon: 'text-purple-600',
    list: 'text-purple-700',
    ellipsis: 'text-purple-400',
  },
} as const;

export const LogisticsMarkets = memo(({ t, locale }: LogisticsMarketsProps) => {
  return (
    <div className="mb-12 bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
      <h2 className="text-2xl md:text-3xl font-bold text-[#0f172a] mb-6 border-l-4 border-orange-500 pl-4">
        {t.logistics_page.markets_title}
      </h2>
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/2 relative h-64 bg-gray-100 rounded-lg overflow-hidden">
          <Image src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" alt="World Map" fill className="object-contain p-4" />
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 md:grid-cols-4 gap-4">
          {LOGISTICS_MARKETS.map((market, index) => {
            const colors = colorClasses[market.color as keyof typeof colorClasses];
            
            return (
              <div 
                key={index} 
                className={`p-4 rounded-xl ${colors.bg} ${colors.hover} transition-all duration-300 hover:-translate-y-1 hover:shadow-md`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Globe className={`w-5 h-5 ${colors.icon}`} />
                  <h4 className={`font-bold text-sm ${colors.text}`}>
                    {t.logistics_page[market.regionKey]}
                  </h4>
                </div>
                <ul className={`text-xs ${colors.list} space-y-1`}>
                  {market.countries.map((country) => (
                    <li key={country} className="hover:font-semibold transition-colors">
                      {country}
                    </li>
                  ))}
                  <li className={`${colors.ellipsis}`}>...</li>
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

LogisticsMarkets.displayName = 'LogisticsMarkets';