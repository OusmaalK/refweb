// components/hero/HeroContent.tsx
'use client';

import { memo } from 'react';
import { FileText } from 'lucide-react';
import { HeroFeatures } from './HeroFeatures';

interface HeroContentProps {
  t: any;
  onOpenModal: () => void;
}

export const HeroContent = memo(({ t, onOpenModal }: HeroContentProps) => {
  return (
    <div className="lg:col-span-7 space-y-4 md:space-y-8">
      <span className="text-orange-500 font-bold tracking-[0.2em] md:tracking-[0.3em] text-sm md:text-lg font-sans block text-center md:text-left">
        {t?.hero?.tag}
      </span>
      <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold leading-[1.15] font-sans tracking-wide text-center md:text-left">
        {t?.hero?.title}
      </h1>
      <p className="text-base md:text-xl text-gray-300 max-w-2xl font-light leading-relaxed text-center md:text-left">
        {t?.hero?.subtitle}
      </p>

      <HeroFeatures t={t} />

      <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-2 items-center md:items-start">
        <button
          onClick={onOpenModal}
          className="bg-[#f97316] hover:bg-orange-600 text-white px-6 md:px-8 py-2 md:py-3 rounded-md font-bold text-xs md:text-sm tracking-wide transition inline-flex items-center justify-center shadow-lg shadow-orange-500/25 whitespace-nowrap gap-2"
        >
          {t?.hero?.rfq || 'Request Quotation'}
        </button>
        <button
          onClick={onOpenModal}
          className="border border-gray-500 hover:border-white hover:bg-white/10 text-white px-6 md:px-8 py-2 md:py-3 rounded-md font-bold text-xs md:text-sm tracking-wide transition inline-flex items-center justify-center gap-2 whitespace-nowrap"
        >
          <FileText className="w-3 h-3 md:w-4" />
          {t?.hero?.catalogue || 'Download Catalogue'}
        </button>
      </div>
    </div>
  );
});

HeroContent.displayName = 'HeroContent';