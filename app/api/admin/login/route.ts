import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { username, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { username: username },
    });

    if (!user) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Identifiants incorrects' }, { status: 401 });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    // Création du cookie de session sécurisé
    const cookieStore = await cookies();
    cookieStore.set('admin-token', 'logged-in', {
      httpOnly: true, // Empêche l'accès via JavaScript côté client
      secure: process.env.NODE_ENV === 'production', // Uniquement HTTPS en production
      sameSite: 'strict',
      maxAge: 60 * 60 * 8, // 8 heures de session
    });

    return NextResponse.json({ message: 'Connexion réussie' }, { status: 200 });

  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
