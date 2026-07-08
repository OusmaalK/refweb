'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function LanguageSelector() {
  const { locale } = useTranslation();
  const pathname = usePathname();
  const currentPath = pathname.replace(/^\/[a-z]{2}/, '');

  const languages = [
    { code: 'en', label: 'EN', flag: '🇬🇧' },
    { code: 'fr', label: 'FR', flag: '🇫🇷' },
    { code: 'ar', label: 'AR', flag: '🇩🇿' }
  ];

  return (
    <div className="flex flex-col gap-1 p-2 rounded-md border border-gray-600 bg-[#0f172a]">
      {languages.map((lang) => (
        <Link
          key={lang.code}
          href={`/${lang.code}${currentPath}`}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-md cursor-pointer transition w-full ${
            locale === lang.code
              ? 'bg-orange-500 text-white'
              : 'text-gray-300 hover:text-white hover:bg-gray-800'
          }`}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </Link>
      ))}
    </div>
  );
}
