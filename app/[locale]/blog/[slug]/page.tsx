// app/[locale]/blog/[slug]/page.tsx
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import Image from 'next/image';

interface BlogPostPageProps {
  params: Promise<{ slug: string; locale: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;

  // Récupération de l'article avec vérification du slug
  const post = await prisma.article.findUnique({
    where: { slug: slug },
  });

  if (!post) notFound();

  return (
    <article className="max-w-4xl mx-auto py-16 px-6">
      {/* Image de couverture avec sécurité */}
      <div className="relative w-full h-100 mb-10 overflow-hidden rounded-2xl shadow-xl">
        {post.imagePath ? (
          <Image 
            src={post.imagePath} 
            alt={post.title} 
            fill 
            className="object-cover" 
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            Pas d'image disponible
          </div>
        )}
      </div>
      
      {/* En-tête de l'article */}
      <header className="mb-10">
        <div className="flex gap-4 text-sm text-[#eab308] font-bold uppercase tracking-wider mb-4">
          <span>{post.category}</span>
          <span>•</span>
          <span>{new Date(post.createdAt).toLocaleDateString('fr-FR')}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#0a1628] leading-tight">{post.title}</h1>
        <p className="text-xl text-gray-600 mt-6 italic font-light">{post.subtitle}</p>
        <div className="mt-4 text-sm text-gray-500">Par {post.author}</div>
      </header>
      
      {/* Contenu principal */}
      <div className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
        <div style={{ whiteSpace: 'pre-line' }}>{post.content}</div>
      </div>
    </article>
  );
}