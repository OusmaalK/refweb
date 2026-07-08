import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET: Récupérer tous les abonnés
export async function GET() {
  try {
    const subscribers = await prisma.subscriber.findMany({ 
      orderBy: { subscribedAt: 'desc' } 
    });
    return NextResponse.json(subscribers);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de la récupération' }, { status: 500 });
  }
}