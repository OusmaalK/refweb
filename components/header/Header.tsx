'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import Navigation from './Navigation';
import Actions from './Actions';

interface HeaderProps {
  t: any;
  locale: string;
  changeLanguage: (newLocale: 'en' | 'fr' | 'ar') => void;
}

export default function Header({ t, locale, changeLanguage }: HeaderProps) {
  const isRTL = locale === 'ar';
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full border-b border-slate-900 bg-[#0f172a] shadow-xl">
      <div 
        className={`w-full max-w-[100vw] overflow-x-hidden flex h-20 md:h-32 items-center justify-between px-4 sm:px-6 lg:px-8 ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        {/* Logo - Responsive */}
        <div className={`flex items-center shrink-0 ${isRTL ? 'lg:-mr-2' : 'lg:-ml-2'}`}>
          <Link href={`/${locale}`} className="flex items-center">
            <Image 
              src="/icons/logo.png"
              alt="Algeria Metal Export Logo"
              width={400}
              height={130}
              priority             
              className="object-contain h-16 w-auto md:h-32.5"
            />
          </Link>
        </div>

        {/* Navigation Desktop */}
        <div className="hidden lg:flex flex-1 justify-center px-6">
          <Navigation t={t} locale={locale} />
        </div>

        {/* Actions */}
        <div className="flex items-center shrink-0">
          <Actions t={t} locale={locale} changeLanguage={changeLanguage} />
        </div>

        {/* Menu Hamburger pour mobile - PLUS GRAND */}
        <button 
          className="lg:hidden text-white p-2 hover:bg-white/10 rounded-lg transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
        </button>
      </div>

      {/* Menu Mobile déroulant - AMÉLIORÉ */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#0f172a] border-t border-slate-900 py-6 px-6">
          <div className="flex flex-col space-y-4">
            <Link 
              href={`/${locale}`} 
              className="text-slate-300 hover:text-white transition text-base font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {t?.nav?.home || 'Home'}
            </Link>
            <Link 
              href={`/${locale}/products`} 
              className="text-slate-300 hover:text-white transition text-base font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {t?.nav?.products || 'Products'}
            </Link>
            <Link 
              href={`/${locale}/logistics`} 
              className="text-slate-300 hover:text-white transition text-base font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {t?.nav?.logistics || 'Logistics'}
            </Link>
            <Link 
              href={`/${locale}/certification`} 
              className="text-slate-300 hover:text-white transition text-base font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {t?.nav?.quality || 'Quality'}
            </Link>
            <Link 
              href={`/${locale}/about`} 
              className="text-slate-300 hover:text-white transition text-base font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {t?.nav?.about || 'About'}
            </Link>
            <Link 
              href={`/${locale}/contact`} 
              className="text-slate-300 hover:text-white transition text-base font-bold"
              onClick={() => setIsMenuOpen(false)}
            >
              {t?.nav?.contact || 'Contact'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}