import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Récupérer tous les emails
    const subscribers = await prisma.subscriber.findMany({
      orderBy: { subscribedAt: 'desc' }
    });

    // Transformer en format CSV
    const headers = "Email,Date d'inscription\n";
    const rows = subscribers
      .map(sub => `${sub.email},${sub.subscribedAt.toISOString()}`)
      .join("\n");

    const csvData = headers + rows;

    // Retourner la réponse avec les headers pour le téléchargement
    return new NextResponse(csvData, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': 'attachment; filename="abonnés_newsletter.csv"',
      },
    });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur export CSV' }, { status: 500 });
  }
}
