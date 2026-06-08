'use client';

import Link from 'next/link';
import Image from 'next/image';
import Navigation from './Navigation';
import Actions from './Actions';

interface HeaderProps {
  t: any;
  locale: string;
  changeLanguage: (newLocale: 'en' | 'fr' | 'ar') => void;
}

export default function Header({ t, locale, changeLanguage }: HeaderProps) {
  const isRTL = locale === 'ar';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-900 bg-[#0f172a] shadow-xl">
      <div 
        className={`w-full max-w-[100vw] overflow-x-hidden flex h-24 items-center justify-between px-2 sm:px-4 lg:px-6 ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Logo */}
        <div className={`flex items-center shrink-0 ${isRTL ? 'lg:-mr-2' : 'lg:-ml-2'}`}>
          <Link href={`/${locale}`} className="flex items-center">
            <Image 
              src="/icons/logo.svg"
              alt="Algeria Metal Export Logo"
              width={200}
              height={65}
              priority              
              className="object-contain max-h-[60px]"
            />
          </Link>
        </div>

        {/* Navigation */}
        <div className="flex-1 flex justify-center px-4">
          <Navigation t={t} locale={locale} />
        </div>

        {/* Actions */}
        <div className="flex items-center shrink-0">
          <Actions t={t} locale={locale} changeLanguage={changeLanguage} />
        </div>
      </div>
    </header>
  );
}