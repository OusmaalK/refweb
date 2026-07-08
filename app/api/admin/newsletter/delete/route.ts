import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const idString = searchParams.get('id');

  // 1. Vérifier si l'id existe
  if (!idString) {
    return NextResponse.json({ error: 'ID requis' }, { status: 400 });
  }

  // 2. Convertir la string en nombre (Integer)
  const id = parseInt(idString, 10);

  // 3. Vérifier si la conversion a bien fonctionné
  if (isNaN(id)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    // 4. Utiliser l'ID converti
    await prisma.subscriber.delete({ 
      where: { id: id } 
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Erreur suppression:", error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
}