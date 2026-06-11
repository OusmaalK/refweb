// app/[locale]/page.tsx
'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Hero from '@/components/hero/Hero';
import Stats from '@/components/stats/Stats';
import Products from '@/components/products/Products';
import Logistics from '@/components/logistics/Logistics';
import Quality from '@/components/quality/Quality';

export default function Home() {
  const { t, locale } = useTranslation();

  if (!t || Object.keys(t).length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#f97316]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <Hero />
      <Stats t={t} locale={locale} />
      <Products t={t} locale={locale} />
      <Logistics t={t} locale={locale} />
      <Quality t={t} locale={locale} />
    </div>
  );
}