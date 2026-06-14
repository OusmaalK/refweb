'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, ChevronDown } from 'lucide-react';

export default function Actions({ t, locale, mobile }: any) {
  const router = useRouter();
  const pathname = usePathname();
  const [langOpen, setLangOpen] = useState(false);

  const languages = [
    { code: 'fr', label: 'Français' },
    { code: 'en', label: 'English' },
    { code: 'ar', label: 'العربية' },
  ];

  const switchLanguage = (code: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${code}`);
    router.push(newPath);
    setLangOpen(false);
  };

  if (mobile) {
    return (
      <div className="flex flex-col gap-3">
        <div className="flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => switchLanguage(lang.code)}
              className={`px-3 py-1 rounded text-sm ${locale === lang.code ? 'bg-[#eab308] text-black' : 'text-white hover:bg-white/10'}`}
            >
              {lang.label}
            </button>
          ))}
        </div>
        <Link
          href={`/${locale}/contact`}
          className="bg-[#eab308] hover:bg-yellow-500 text-black px-4 py-2 rounded font-bold text-sm text-center transition"
        >
          {t.nav?.contact || 'Contact'}
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      {/* Langue selector */}
      <div className="relative">
        <button
          onClick={() => setLangOpen(!langOpen)}
          className="flex items-center gap-1 text-white hover:text-[#eab308] text-sm"
        >
          <Globe size={16} />
          <span>{locale.toUpperCase()}</span>
          <ChevronDown size={12} />
        </button>
        {langOpen && (
          <div className="absolute top-full right-0 mt-2 bg-[#0a1628] border border-white/10 rounded-lg p-1 min-w-30 shadow-xl z-50">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => switchLanguage(lang.code)}
                className={`block w-full text-left px-3 py-1.5 rounded text-sm ${locale === lang.code ? 'bg-[#eab308] text-black' : 'text-white hover:bg-white/10'}`}
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>

      <Link
        href={`/${locale}/contact`}
        className="bg-[#eab308] hover:bg-yellow-500 text-black px-4 py-1.5 rounded font-bold text-sm transition whitespace-nowrap"
      >
        {t.nav?.contact || 'Contact'}
      </Link>
    </div>
  );
}