// app/[locale]/layout.tsx
'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer'; // ✅ Import ajouté

export default function LocaleLayout({ children }: { children: React.ReactNode }) {
  const { t, locale } = useTranslation();
  const isRTL = locale === 'ar';

  return (
    <div className={`min-h-screen bg-[#0a1628] text-white ${isRTL ? 'rtl' : 'ltr'}`}>
      <Header t={t} locale={locale} />
      <div className="pt-0">
        {children}
      </div>
      <Footer /> {/* ✅ Ajout du Footer ici */}
    </div>
  );
}