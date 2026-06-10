// app/[locale]/layout.tsx
'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  const { t, locale } = useTranslation(); // ✅ Plus de changeLanguage
  const isRTL = locale === 'ar';

  return (
    <div className={`min-h-screen bg-[#0f172a] text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header t={t} locale={locale} /> {/* ✅ Plus de changeLanguage */}
      <div className="pt-20 md:pt-24">
        {children}
      </div>
      <Footer t={t} locale={locale} />
    </div>
  );
}