// app/api/dashboard/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  // ✅ Données par défaut
  const defaultData = {
    stats: { subscribers: 0, articles: 0, newsletters: 0, views: 0 },
    graphData: [
      { name: 'Lun', abonnés: 0 },
      { name: 'Mar', abonnés: 0 },
      { name: 'Mer', abonnés: 0 },
      { name: 'Jeu', abonnés: 0 },
      { name: 'Ven', abonnés: 0 },
      { name: 'Sam', abonnés: 0 },
      { name: 'Dim', abonnés: 0 },
    ],
  };

  try {
    // Vérifier si prisma existe
    if (!prisma) return NextResponse.json(defaultData);

    // Compter avec gestion d'erreur individuelle
    let subscribersCount = 0;
    let articlesCount = 0;
    let usersCount = 0;

    try {
      subscribersCount = await prisma.subscriber.count();
    } catch (e) { /* Table Subscriber n'existe pas */ }
    
    try {
      articlesCount = await prisma.article.count();
    } catch (e) { /* Table Article n'existe pas */ }
    
    try {
      usersCount = await prisma.user.count();
    } catch (e) { /* Table User n'existe pas */ }

    return NextResponse.json({
      stats: {
        subscribers: subscribersCount,
        articles: articlesCount,
        newsletters: 0,
        views: usersCount,
      },
      graphData: defaultData.graphData,
    });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(defaultData);
  }
}