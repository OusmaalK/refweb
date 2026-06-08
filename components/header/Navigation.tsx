'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type NavKey = 'home' | 'products' | 'logistics' | 'quality' | 'about' | 'contact';

interface NavigationProps {
  t: any;
  locale: string;
}

export default function Navigation({ t, locale }: NavigationProps) {
  const pathname = usePathname();
  const isRTL = locale === 'ar';

  // Mise à jour des liens : on pointe vers les routes réelles de l'application
  const links: { key: NavKey; href: string }[] = [
    { key: 'home', href: `/${locale}` },
    { key: 'products', href: `/${locale}/products` },
    { key: 'logistics', href: `/${locale}/logistics` },
    { key: 'quality', href: `/${locale}/certification` },
    { key: 'about', href: `/${locale}/about` },
    { key: 'contact', href: `/${locale}/contact` },
  ];

  return (
    <nav 
      className={`hidden lg:flex items-center gap-4 xl:gap-6 text-xs xl:text-sm font-bold tracking-widest ${
        isRTL ? 'flex-row-reverse' : 'flex-row'
      }`}
    >
      {links.map((link) => (
        <Link
          key={link.key}
          href={link.href}
          className={`relative group py-2 transition uppercase whitespace-nowrap ${
            pathname === link.href
              ? 'text-orange-500'
              : 'text-slate-300 hover:text-white'
          }`}
        >
          {t?.nav?.[link.key] || link.key}
          {/* Barre de soulignement animée de couleur orange au survol */}
          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
        </Link>
      ))}
    </nav>
  );
}