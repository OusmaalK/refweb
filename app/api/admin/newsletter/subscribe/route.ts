import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 });
    }

    // Enregistrement dans la base de données
    const newSubscriber = await prisma.subscriber.create({
      data: { email }
    });

    return NextResponse.json(newSubscriber, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur lors de l\'inscription' }, { status: 500 });
  }
}