'use client';

import Link from 'next/link';
import { useTranslation } from '@/hooks/useTranslation';

interface ActionsProps {
  t: any;
  locale: string;
}

export default function Actions({ t, locale }: ActionsProps) {
  const { changeLanguage } = useTranslation();
  const isRTL = locale === 'ar';

  return (
    <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
      
      {/* Bouton de demande de devis */}
      <Link
        href={`/${locale}/request`}
        className="bg-[#f97316] hover:bg-orange-600 text-white px-4 py-2 rounded-md font-bold text-xs tracking-wider uppercase transition shadow-md shadow-orange-500/10 whitespace-nowrap"
      >
        {t?.nav?.quotation || 'Request Quotation'}
      </Link>
      
      {/* Sélecteur de langue */}
      <div className={`flex items-center gap-1 text-xs font-bold text-slate-300 ${isRTL ? 'flex-row-reverse' : ''}`}>
        <button 
          onClick={() => changeLanguage('en')} 
          className={`transition-colors uppercase ${locale === 'en' ? 'text-white font-extrabold' : 'hover:text-white text-slate-400'}`}
        >
          EN
        </button>
        <span className="text-slate-600">|</span>
        <button 
          onClick={() => changeLanguage('fr')} 
          className={`transition-colors uppercase ${locale === 'fr' ? 'text-white font-extrabold' : 'hover:text-white text-slate-400'}`}
        >
          FR
        </button>
        <span className="text-slate-600">|</span>
        <button 
          onClick={() => changeLanguage('ar')} 
          className={`transition-colors uppercase ${locale === 'ar' ? 'text-white font-extrabold' : 'hover:text-white text-slate-400'}`}
        >
          AR
        </button>
      </div>

    </div>
  );
}