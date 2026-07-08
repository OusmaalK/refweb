'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';

interface HeaderProps {
  t: any;
  locale: string;
}

export default function Header({ t, locale }: HeaderProps) {
  const isRTL = locale === 'ar';
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMenuOpen]);

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  const switchLanguage = (code: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${code}`);
    router.push(newPath);
    setLangOpen(false);
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: t.nav?.home || 'Accueil', href: `/${locale}` },
    { label: t.nav?.about || 'À propos', href: `/${locale}/about` },
    { label: t.nav?.services || 'Prestations', href: `/${locale}/service` },

    { label: t.nav?.sectors || 'Secteurs', href: `/${locale}/sectors` },
    { label: t.nav?.organization || 'Organisation', href: `/${locale}/organization` },
    { label: t.nav?.contact || 'Contact', href: `/${locale}#contact` }, 
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-9999 bg-white shadow-md h-16 md:h-20 lg:h-24">
      <div className={`container mx-auto px-4 md:px-6 flex h-full items-center justify-between ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
        
        {/* Logo RFC */}
        <Link 
          href={`/${locale}`} 
          className="flex items-center shrink-0"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <Image
            src="/static/logo.png"
            alt="RFC Assurance"
            width={120}
            height={50}
            className="h-10 w-auto object-contain sm:h-12 md:h-14 lg:h-16"
            loading="eager"
            priority
          />
        </Link>

        {/* Navigation Desktop */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm xl:text-base font-semibold">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative text-[#1a2a4a] hover:text-[#1e3a8a] transition-colors group"
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#1e3a8a] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Actions Desktop */}
        <div className="flex items-center gap-2">
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-1 text-[#1a2a4a] hover:text-[#1e3a8a] text-sm font-semibold"
            >
              <Globe size={16} />
              <span>{locale.toUpperCase()}</span>
              <ChevronDown size={12} />
            </button>
            {langOpen && (
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg p-1 min-w-30 shadow-xl z-50">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={`block w-full text-left px-3 py-1.5 rounded text-sm ${locale === lang.code ? 'bg-[#1e3a8a] text-white' : 'text-[#1a2a4a] hover:bg-gray-100'}`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Burger */}
        <button
          className="lg:hidden text-[#1a2a4a] p-2 hover:bg-gray-100 rounded-lg transition"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* ✅ MOBILE MENU - PREMIUM (Bleu + Blanc + Animations) */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40 bg-[#0a1628] flex flex-col p-6 overflow-y-auto animate-fade-in-up">
          
          {/* En-tête du menu mobile */}
          <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
            <Image src="/static/logo.png" alt="RFC" width={100} height={40} className="h-10 w-auto object-contain" />
            <button onClick={() => setIsMenuOpen(false)} className="text-white hover:text-[#eab308] transition">
              <X size={28} />
            </button>
          </div>

          {/* Navigation items avec animation */}
          <div className="flex flex-col space-y-2">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="text-white text-lg font-medium py-3 px-4 rounded-lg hover:bg-white/10 transition-all duration-300 transform hover:translate-x-2"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Sélecteur de langue dans le menu mobile */}
          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-gray-400 text-sm mb-3">Choisir la langue</p>
            <div className="flex flex-wrap gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => switchLanguage(lang.code)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    locale === lang.code
                      ? 'bg-[#eab308] text-[#0a1628]'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>

          {/* Bouton CTA dans le menu mobile */}
          <div className="mt-6">
            <Link
              href={`/${locale}/contact`}
              onClick={() => setIsMenuOpen(false)}
              className="block w-full bg-[#eab308] hover:bg-yellow-500 text-[#0a1628] text-center font-bold py-3 rounded-lg transition transform hover:scale-105"
            >
              {t.nav?.contact || 'Contact'}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
