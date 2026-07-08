'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Header from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import NewsletterModal from '@/components/Newsletter/NewsletterModal';
import CookieConsent from '@/components/cookies/CookieConsent';
import { useParams } from 'next/navigation';

export default function LocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { t, locale } = useTranslation();
  const params = useParams();
  const currentLocale = params?.locale as string || locale || 'fr';
  const isRTL = currentLocale === 'ar';

  return (
    <div
      className={`min-h-screen bg-[#0a1628] text-white ${isRTL ? 'rtl' : 'ltr'}`}
      suppressHydrationWarning  // ✅ AJOUTÉ
    >
      {/* On place les composants globaux ici.
         Assurez-vous que NewsletterModal a z-[100] 
         et CookieConsent a z-[9999] pour qu'ils ne se gênent pas.
      */}
      <NewsletterModal />
      <CookieConsent />

      <Header t={t} locale={currentLocale} />

      <main className="pt-0">
        {children}
      </main>

      <Footer />
    </div>
  );
}