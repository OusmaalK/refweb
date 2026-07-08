// app/[locale]/blog/page.tsx
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import Image from 'next/image';

interface BlogIndexPageProps {
  params: Promise<{ locale: string }>;
}

export default async function BlogIndexPage({ params }: BlogIndexPageProps) {
  const { locale } = await params;
  const posts = await prisma.article.findMany({ orderBy: { createdAt: 'desc' } });

  return (
    <div className="min-h-screen bg-[#0a1628] py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl text-white font-bold mb-12 text-center">Blog</h1>
        
        {posts.length === 0 ? (
          <p className="text-center text-gray-400">Aucun article publié pour le moment.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link 
                key={post.id} 
                href={`/${locale}/blog/${post.slug}`} 
                className="group bg-white/5 rounded-2xl overflow-hidden border border-white/10 hover:border-[#eab308] transition-all"
              >
                {/* Gestion sécurisée de l'image */}
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
                    <h2 className="text-xl font-bold text-white leading-tight">{post.title}</h2>
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{post.subtitle}</p>
                  <span className="text-[#eab308] font-semibold text-sm group-hover:underline">
                    Lire l'article →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}