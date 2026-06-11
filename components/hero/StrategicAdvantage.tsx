// components/hero/StrategicAdvantage.tsx
'use client';

import { memo } from 'react';
import { Globe } from 'lucide-react';

interface StrategicAdvantageProps {
  t: any;
}

export const StrategicAdvantage = memo(({ t }: StrategicAdvantageProps) => {
  return (
    <div className="backdrop-blur-sm bg-[#0f172a]/90 border border-orange-500/30 p-4 md:p-6 rounded-xl max-w-sm w-full text-center shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-orange-500 to-transparent" />

      <h3 className="text-white font-bold text-sm md:text-lg mb-1 drop-shadow-md">
        {t?.strategic?.title || 'STRATEGIC ADVANTAGE'}
      </h3>
      <h4 className="text-base md:text-xl font-bold mb-2 md:mb-4 drop-shadow-md">
        {t?.strategic?.subtitle || 'Closer to Europe, Stronger Together'}
      </h4>
      <p className="text-gray-200 text-[10px] md:text-xs mb-2 md:mb-4 drop-shadow-sm">
        {t?.strategic?.description || 'Reduced sea distance to Europe compared to Asia'}
      </p>

      <div className="flex flex-col items-center">
        <div className="animate-spin-slow">
          <Globe className="w-24 h-24 md:w-40 text-orange-500 stroke-[1.5]" />
        </div>
        <div className="mt-2 md:mt-4 text-center">
          <div className="text-orange-500 font-bold text-xl md:text-3xl drop-shadow-md">
            {t?.strategic?.percent || '50%'}
          </div>
          <div className="text-gray-200 text-[8px] md:text-[10px] text-center leading-tight drop-shadow-md">
            {t?.strategic?.distance || 'UP TO\nSHORTER SEA DISTANCE'}
          </div>
        </div>
      </div>
    </div>
  );
});

StrategicAdvantage.displayName = 'StrategicAdvantage';