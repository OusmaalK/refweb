// app/api/admin/articles/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { createClient } from '@supabase/supabase-js';

// Initialisation du client Supabase pour le storage
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    if (!db) return NextResponse.json([]);
    const articles = await db.article.findMany({ orderBy: { createdAt: 'desc' } });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    if (!db) return NextResponse.json({ error: 'Base de données non disponible' }, { status: 500 });

    const contentType = req.headers.get('content-type') || '';
    let title, subtitle, content, category, lang, author, imagePath = '/images/blog/default.jpg';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      title = formData.get('title') as string;
      subtitle = formData.get('subtitle') as string;
      content = formData.get('content') as string;
      category = formData.get('category') as string;
      lang = formData.get('lang') as string;
      author = formData.get('author') as string;
      const imageFile = formData.get('image') as File | null;

      if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const timestamp = Date.now();
        const ext = imageFile.name.split('.').pop();
        const filename = `${timestamp}.${ext}`;

        // ✅ Upload vers Supabase Storage
        const { data, error } = await supabase.storage
          .from('blog-images')
          .upload(filename, buffer, {
            contentType: imageFile.type,
            upsert: true,
          });

        if (error) {
          console.error('Erreur upload Supabase:', error);
          return NextResponse.json({ error: 'Erreur upload image' }, { status: 500 });
        }

        // ✅ Récupérer l'URL publique
        const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(filename);
        imagePath = urlData.publicUrl;
      }
    } else {
      const body = await req.json();
      title = body.title;
      subtitle = body.subtitle || '';
      content = body.content;
      category = body.category || 'General';
      lang = body.lang || 'fr';
      author = body.author || 'Admin';
      imagePath = body.imagePath || '/images/blog/default.jpg';
    }

    const article = await db.article.create({
      data: {
        slug: title.toLowerCase().replace(/\s/g, '-'),
        title,
        subtitle,
        content,
        imagePath,
        author,
        category,
        lang,
      },
    });

    return NextResponse.json(article, { status: 201 });
  } catch (error) {
    console.error('❌ Erreur création:', error);
    return NextResponse.json({ error: 'Erreur création' }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    if (!db) return NextResponse.json({ error: 'Base de données non disponible' }, { status: 500 });

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id') || '0');
    if (!id) return NextResponse.json({ error: 'ID requis' }, { status: 400 });

    const formData = await req.formData();
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const lang = formData.get('lang') as string;
    const imageFile = formData.get('image') as File | null;

    const existingArticle = await db.article.findUnique({ where: { id } });
    let imagePath = existingArticle?.imagePath;

    if (imageFile && imageFile.size > 0) {
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const timestamp = Date.now();
      const ext = imageFile.name.split('.').pop();
      const filename = `${timestamp}.${ext}`;

      // ✅ Upload vers Supabase Storage
      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filename, buffer, {
          contentType: imageFile.type,
          upsert: true,
        });

      if (error) {
        console.error('Erreur upload Supabase:', error);
        return NextResponse.json({ error: 'Erreur upload image' }, { status: 500 });
      }

      const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(filename);
      imagePath = urlData.publicUrl;
    }

    const updatedArticle = await db.article.update({
      where: { id },
      data: { title, subtitle, content, category, lang, imagePath },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('❌ Erreur mise à jour:', error);
    return NextResponse.json({ error: 'Erreur mise à jour' }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    if (!db) return NextResponse.json({ error: 'Base de données non disponible' }, { status: 500 });

    const { searchParams } = new URL(req.url);
    const id = parseInt(searchParams.get('id') || '0');
    if (!id) return NextResponse.json({ error: 'ID requis' }, { status: 400 });

    await db.article.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur suppression' }, { status: 500 });
  }
}