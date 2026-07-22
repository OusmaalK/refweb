// app/api/blog/latest/route.ts
import { NextResponse } from 'next/server';
import { db } from '@/lib/prisma';

export async function GET() {
  try {
    // On supprime le "take: 3" pour récupérer TOUS les articles
    const posts = await db.article.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Erreur récupération articles:', error);
    return NextResponse.json([]);
  }
}