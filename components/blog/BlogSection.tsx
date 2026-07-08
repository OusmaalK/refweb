'use client';

import { useTranslation } from '@/hooks/useTranslation';
import BlogCard from './BlogCard';
// Importez vos données traduites
import fr from '@/data/translations/fr';
import en from '@/data/translations/en';
import ar from '@/data/translations/ar';

export default function BlogSection() {
  const { locale } = useTranslation();
  
  // Sélectionner les données selon la locale
  const data = locale === 'ar' ? ar : locale === 'en' ? en : fr;
  const isRTL = locale === 'ar';

  return (
    <section className="py-16 bg-[#f8fafc]">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header de section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#0a1628] mb-4">
            {data.blog.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {data.blog.subtitle}
          </p>
          <div className="w-16 h-1 bg-[#eab308] mx-auto mt-6"></div>
        </div>

        {/* Grille des articles */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${isRTL ? 'rtl' : 'ltr'}`}>
          {Object.entries(data.blog.posts).map(([slug, post]) => (
            <BlogCard
              key={slug}
              slug={slug}
              category={data.blog.categories[post.category].title}
              title={post.title}
              excerpt={post.subtitle}
              date="Juin 2026"
              image={post.image} // Transmission de l'image ici
            />
          ))}
        </div>
      </div>
    </section>
  );
}