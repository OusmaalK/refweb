import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

// Initialisation de Prisma
const prisma = new PrismaClient();

// GET: Récupérer tous les articles triés par date
export async function GET() {
  try {
    const articles = await prisma.article.findMany({ 
      orderBy: { createdAt: 'desc' } 
    });
    return NextResponse.json(articles);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
}

// POST: Créer un nouvel article avec tous les champs requis
export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // On extrait les données du formulaire
    const { title, slug, subtitle, content, imagePath, author, category, lang } = body;

    // Validation basique
    if (!title || !slug || !content) {
      return NextResponse.json({ error: 'Champs obligatoires manquants' }, { status: 400 });
    }

    const newArticle = await prisma.article.create({
      data: {
        title,
        slug,
        subtitle: subtitle || "",
        content,
        imagePath: imagePath || "",
        author: author || "Admin",
        category: category || "Non classé",
        lang: lang || "fr",
      },
    });

    return NextResponse.json(newArticle, { status: 201 });
  } catch (error) {
    console.error("Erreur Prisma:", error);
    return NextResponse.json({ error: 'Erreur lors de la création de l\'article' }, { status: 500 });
  }
}

// DELETE: Supprimer un article par son ID
export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID manquant' }, { status: 400 });
    }

    await prisma.article.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Article supprimé avec succès' });
  } catch (error) {
    console.error("Erreur suppression:", error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}