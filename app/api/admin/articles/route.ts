// app/api/admin/articles/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

export async function GET() {
  try {
    console.log('🔍 API articles - Début');
    
    if (!db) {
      console.log('❌ Base de données non disponible');
      return NextResponse.json([]);
    }

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

    // On vérifie si on reçoit du JSON ou du FormData
    const contentType = req.headers.get('content-type') || '';
    
    let title, subtitle, content, category, lang, author, imagePath = '/images/blog/default.jpg';

    if (contentType.includes('multipart/form-data')) {
      // 📁 MODE UPLOAD D'IMAGE (FormData)
      const formData = await req.formData();
      title = formData.get('title') as string;
      subtitle = formData.get('subtitle') as string;
      content = formData.get('content') as string;
      category = formData.get('category') as string;
      lang = formData.get('lang') as string;
      author = formData.get('author') as string;
      const imageFile = formData.get('image') as File | null;

      // Traitement de l'image si un fichier a été envoyé
      if (imageFile && imageFile.size > 0) {
        const bytes = await imageFile.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        // Créer un nom de fichier unique pour éviter les conflits
        const timestamp = Date.now();
        const ext = path.extname(imageFile.name);
        const filename = `${timestamp}${ext}`;
        
        // Chemin absolu du dossier public
        const publicDir = path.join(process.cwd(), 'public', 'images', 'blog');
        
        // Créer le dossier s'il n'existe pas
        if (!existsSync(publicDir)) {
          await mkdir(publicDir, { recursive: true });
        }
        
        const filePath = path.join(publicDir, filename);
        await writeFile(filePath, buffer);
        
        // Chemin relatif pour la base de données
        imagePath = `/images/blog/${filename}`;
      }

    } else {
      // 📄 MODE JSON (sans image)
      const body = await req.json();
      title = body.title;
      subtitle = body.subtitle || '';
      content = body.content;
      category = body.category || 'General';
      lang = body.lang || 'fr';
      author = body.author || 'Admin';
      imagePath = body.imagePath || '/images/blog/default.jpg';
    }

    // Création de l'article dans la base de données
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
    return NextResponse.json(
      { error: 'Erreur lors de la création de l\'article' }, 
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    if (!db) {
      return NextResponse.json({ error: 'Base de données non disponible' }, { status: 500 });
    }

    const formData = await req.formData();
    const id = parseInt(formData.get('id') as string);
    const title = formData.get('title') as string;
    const subtitle = formData.get('subtitle') as string;
    const content = formData.get('content') as string;
    const category = formData.get('category') as string;
    const lang = formData.get('lang') as string;
    const imageFile = formData.get('image') as File | null;

    let imagePath = undefined; // On ne change l'image que si une nouvelle est fournie

    if (imageFile && imageFile.size > 0) {
      // Logique d'upload d'image (identique à celle du POST)
      const bytes = await imageFile.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const timestamp = Date.now();
      const ext = path.extname(imageFile.name);
      const filename = `${timestamp}${ext}`;
      const publicDir = path.join(process.cwd(), 'public', 'images', 'blog');
      if (!existsSync(publicDir)) await mkdir(publicDir, { recursive: true });
      const filePath = path.join(publicDir, filename);
      await writeFile(filePath, buffer);
      imagePath = `/images/blog/${filename}`;
    }

    const updatedArticle = await db.article.update({
      where: { id },
      data: {
        title,
        subtitle,
        content,
        category,
        lang,
        ...(imagePath && { imagePath }), // Mise à jour conditionnelle de l'image
      },
    });

    return NextResponse.json(updatedArticle);
  } catch (error) {
    console.error('❌ Erreur mise à jour:', error);
    return NextResponse.json({ error: 'Erreur mise à jour' }, { status: 500 });
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