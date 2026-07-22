'use client';

import { useState, useEffect } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import BlogCard from './BlogCard';

// ✅ Ajout de l'interface pour dire à TypeScript à quoi ressemblent les données
interface Article {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  content: string;
  imagePath: string;
  author: string;
  category: string;
  lang: string;
  createdAt: string;
}

export default function BlogSection() {
  const { locale } = useTranslation();
  const [posts, setPosts] = useState<Article[]>([]); // ✅ TypeScript sait maintenant que c'est un tableau d'articles
  const [loading, setLoading] = useState(true);
  const isRTL = locale === 'ar';

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('/api/blog/latest');
        const data = await res.json();
        setPosts(data);
      } catch (error) {
        console.error('Erreur chargement articles:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Regroupement des articles par catégorie
  const categories = posts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, Article[]>); // ✅ TypeScript est content

  // Traductions pour le titre de la section
  const data = locale === 'ar' ? require('@/data/translations/ar').default
            : locale === 'en' ? require('@/data/translations/en').default
            : require('@/data/translations/fr').default;

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

        {loading ? (
          <p className="text-center text-gray-500">Chargement des articles...</p>
        ) : Object.keys(categories).length === 0 ? (
          <p className="text-center text-gray-500">Aucun article publié pour le moment.</p>
        ) : (
          <div className={`space-y-12 ${isRTL ? 'rtl' : 'ltr'}`}>
            {/* Boucle sur les catégories */}
            {Object.entries(categories).map(([category, categoryPosts]) => (
              <div key={category}>
                <h3 className="text-xl font-bold text-[#0a1628] mb-6 border-l-4 border-[#eab308] pl-4">
                  {category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {categoryPosts.map((post) => (
                    <BlogCard
                      key={post.id}
                      slug={post.slug}
                      category={post.category}
                      title={post.title}
                      excerpt={post.subtitle}
                      date={new Date(post.createdAt).toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' })}
                      image={post.imagePath}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}