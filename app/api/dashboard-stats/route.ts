import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Votre instance Prisma

export async function GET() {
  // Exemples de requêtes Prisma
  const subscribers = await prisma.subscriber.count();
  const articles = await prisma.article.count();
  
  // Exemple de calcul pour le graphique (derniers 7 jours)
  const graph = [
    { name: 'Lun', abonnés: 10 }, // Ici vous pourriez faire des count groupés par date
    // ...
  ];

  return NextResponse.json({
    stats: { subscribers, articles, newsletters: 12, views: 2400 },
    graph
  });
}
