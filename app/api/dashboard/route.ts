import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const [subscribersCount, articlesCount, usersCount] = await Promise.all([
      prisma.subscriber.count(),
      prisma.article.count(),
      prisma.user.count(),
    ]);

    // Récupération des abonnés des 7 derniers jours
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const subscribers = await prisma.subscriber.findMany({
      where: { subscribedAt: { gte: sevenDaysAgo } },
      select: { subscribedAt: true }
    });

    // Transformation des données : compter les abonnés par jour
    const dailyCounts: Record<string, number> = {};
    subscribers.forEach(sub => {
      const dayName = sub.subscribedAt.toLocaleDateString('fr-FR', { weekday: 'short' });
      dailyCounts[dayName] = (dailyCounts[dayName] || 0) + 1;
    });

    // Formatage final pour Recharts
    const graphData = ['lun.', 'mar.', 'mer.', 'jeu.', 'ven.', 'sam.', 'dim.'].map(day => ({
      name: day.charAt(0).toUpperCase() + day.slice(1, 3), // Lun, Mar...
      abonnés: dailyCounts[day] || 0
    }));

    return NextResponse.json({
      stats: {
        subscribers: subscribersCount,
        articles: articlesCount,
        newsletters: 0,
        views: usersCount
      },
      graphData
    });
  } catch (error) {
    console.error("Erreur API Dashboard:", error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
