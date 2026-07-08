// app/api/admin/articles/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';  // ← Utiliser db au lieu de prisma

export async function GET() {
  try {
    console.log('🔍 API articles - Début');
    
    if (!db) {
      console.log('❌ Base de données non disponible');
      return NextResponse.json([]);
    }

    // Récupérer les articles
    const articles = await db.article.findMany({
      orderBy: { createdAt: 'desc' },
    });

    console.log(`✅ ${articles.length} articles récupérés`);
    return NextResponse.json(articles);

  } catch (error) {
    console.error('❌ Erreur:', error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: 'Base de données non disponible' }, { status: 500 });
    }

    const body = await req.json();

    const article = await db.article.create({
      data: {
        slug: body.slug || body.title.toLowerCase().replace(/\s/g, '-'),
        title: body.title,
        subtitle: body.subtitle || '',
        content: body.content,
        imagePath: body.imagePath || '/images/default.jpg',
        author: body.author || 'Admin',
        category: body.category || 'General',
        lang: body.lang || 'fr',
      },
    });

    return NextResponse.json(article);

  } catch (error) {
    console.error('❌ Erreur création:', error);
    return NextResponse.json({ error: 'Erreur création' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: 'Base de données non disponible' }, { status: 500 });
    }

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id') || '0');

    if (!id) {
      return NextResponse.json({ error: 'ID requis' }, { status: 400 });
    }

    await db.article.delete({ where: { id } });
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('❌ Erreur suppression:', error);
    return NextResponse.json({ error: 'Erreur suppression' }, { status: 500 });
  }
}