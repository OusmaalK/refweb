'use client';

import { useTranslation } from '@/hooks/useTranslation';
import Link from 'next/link';

interface BlogCardProps {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  date: string;
  image: string; // Ajout de la prop image
}

export default function BlogCard({ slug, category, title, excerpt, date, image }: BlogCardProps) {
  const { locale } = useTranslation();
  const isRTL = locale === 'ar';

  return (
    <div className={`flex flex-col bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-300 ${isRTL ? 'rtl' : 'ltr'}`}>
      
      {/* Image de la carte */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
        />
      </div>

      {/* Contenu de la carte */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Catégorie */}
        <div className="mb-3">
          <span className="inline-block bg-[#0a1628]/5 text-[#0a1628] text-[10px] md:text-xs font-bold uppercase tracking-widest px-2 py-1 rounded">
            {category}
          </span>
        </div>

        {/* Titre */}
        <h3 className="text-lg md:text-xl font-bold text-[#0a1628] mb-3 leading-tight transition-colors">
          {title}
        </h3>

        {/* Extrait */}
        <p className="text-gray-600 text-sm md:text-base mb-6 flex-grow">
          {excerpt}
        </p>

        {/* Footer : Date & Lien */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <span className="text-[10px] md:text-xs text-gray-400 font-medium">
            {date}
          </span>
          <Link 
            href={`/${locale}/blog/${slug}`} 
            className="text-[#0a1628] text-xs md:text-sm font-bold hover:text-[#eab308] transition-colors flex items-center gap-1"
          >
            {isRTL ? 'اقرأ المزيد ←' : 'Lire la suite →'}
          </Link>
        </div>
      </div>
    </div>
  );
}