// app/[locale]/blog/page.tsx
import { prisma } from '@/lib/prisma';
export const revalidate = 0; // Force le rechargement des données à chaque visite
import Link from 'next/link';
import Image from 'next/image';

interface BlogIndexPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogIndexPage({ params }: BlogIndexPageProps) {
  const { locale } = await params;
  
  // Récupération de tous les articles depuis Supabase
  const posts = await prisma.article.findMany({ 
    orderBy: { createdAt: 'desc' } 
  });

  // Regroupement des articles par catégorie
  const categories = posts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, typeof posts>);

  return (
    <div className="min-h-screen bg-[#0a1628] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl text-white font-bold mb-4">Actualités & Expertise</h1>
          <p className="text-gray-400 text-lg">Restez informés sur la gestion des risques industriels en Algérie.</p>
          <div className="w-16 h-1 bg-[#eab308] mx-auto mt-4 rounded-full"></div>
        </div>

        {Object.keys(categories).length === 0 ? (
          <p className="text-center text-gray-400">Aucun article publié pour le moment.</p>
        ) : (
          <div className="space-y-16">
            {Object.entries(categories).map(([category, categoryPosts]) => (
              <div key={category}>
                <h2 className="text-2xl font-bold text-white mb-8 border-l-4 border-[#eab308] pl-4">
                  {category}
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {categoryPosts.map((post) => (
                    <Link 
                      key={post.id} 
                      href={`/${locale}/blog/${post.slug}`} 
                      className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#eab308] transition-all"
                    >
                      <div className="relative h-56 w-full bg-gray-800">
                        {post.imagePath ? (
                          <Image 
                            src={post.imagePath} 
                            alt={post.title} 
                            fill 
                            className="object-cover" 
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500 text-sm">
                            Aucune image
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-bold text-white leading-tight">{post.title}</h3>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.subtitle}</p>
                        <span className="text-[#eab308] font-semibold text-sm group-hover:underline">
                          Lire la suite →
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}