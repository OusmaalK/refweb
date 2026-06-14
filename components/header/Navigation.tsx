'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { NAV_ITEMS } from '@/constants/nav';

export default function Navigation({ t, locale, mobile, onClose }: any) {
  const isRTL = locale === 'ar';
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const baseClasses = mobile
    ? 'flex flex-col space-y-4 text-lg font-medium'
    : 'flex items-center gap-6 text-sm font-medium';

  const linkClasses = (hasDropdown: boolean) =>
    `text-gray-200 hover:text-[#eab308] transition-colors flex items-center gap-1 ${
      hasDropdown ? 'cursor-pointer' : ''
    }`;

  return (
    <nav className={baseClasses}>
      {NAV_ITEMS.map((item) => {
        const label = t.nav?.[item.label] || item.label;

        if (item.hasDropdown) {
          const isOpen = openDropdown === item.label;
          return (
            <div key={item.label} className="relative">
              <button
                onClick={() => setOpenDropdown(isOpen ? null : item.label)}
                className={linkClasses(true)}
              >
                {label}
                <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className={`${mobile ? 'mt-2 pl-4 border-l border-white/20 space-y-2' : 'absolute top-full left-0 mt-2 bg-[#0a1628] border border-white/10 rounded-lg p-2 min-w-50 shadow-xl'}`}>
                  {item.dropdownItems?.map((sub) => (
                    <Link
                      key={sub.href}
                      href={`/${locale}${sub.href}`}
                      className="block text-gray-300 hover:text-[#eab308] py-1 px-2 text-sm"
                      onClick={() => { setOpenDropdown(null); onClose?.(); }}
                    >
                      {sub.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        }

        return (
          <Link
            key={item.href}
            href={`/${locale}${item.href}`}
            className={linkClasses(false)}
            onClick={onClose}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}