'use client';

import { useTranslation } from '@/hooks/useTranslation';
import RFCAppHero from './RFCAppHero';
import RFCAppFeatures from './RFCAppFeatures';
import RFCAppFooter from './RFCAppFooter';

export default function RFCAppLanding() {
  const { t, locale } = useTranslation();

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      <RFCAppHero t={t} locale={locale} />
      <RFCAppFeatures t={t} locale={locale} />
      <RFCAppFooter t={t} locale={locale} />
    </div>
  );
}
