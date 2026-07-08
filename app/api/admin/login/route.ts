// app/api/admin/login/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function POST(req: Request) {
  try {
    // Récupérer les données
    const body = await req.json();
    const { username, password } = body;

    console.log('🔐 Tentative de connexion:', { username });

    // ✅ Identifiants en dur (fallback)
    const ADMIN_USERNAME = 'admin';
    const ADMIN_PASSWORD = 'khaled2026';

    // ✅ ESSAI 1 : Identifiants en dur
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      console.log('✅ Connexion réussie (fallback)');
      const response = NextResponse.json({ 
        success: true, 
        message: 'Connexion réussie' 
      });

      response.cookies.set('admin-token', 'authenticated', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 8,
        sameSite: 'strict',
        path: '/',
      });

      return response;
    }

    // ✅ ESSAI 2 : Base de données (si disponible)
    try {
      console.log('🔍 Recherche dans la BDD...');
      const user = await prisma.user.findUnique({
        where: { username },
      });

      if (user) {
        const isValid = await bcrypt.compare(password, user.passwordHash);
        if (isValid) {
          console.log('✅ Connexion réussie (BDD)');
          await prisma.user.update({
            where: { id: user.id },
            data: { lastLogin: new Date() },
          });

          const response = NextResponse.json({ 
            success: true, 
            message: 'Connexion réussie' 
          });

          response.cookies.set('admin-token', 'authenticated', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60 * 8,
            sameSite: 'strict',
            path: '/',
          });

          return response;
        }
        console.log('❌ Mot de passe invalide');
      } else {
        console.log('❌ Utilisateur non trouvé');
      }
    } catch (dbError) {
      console.warn('⚠️ Erreur BDD:', dbError);
    }

    return NextResponse.json(
      { error: 'Identifiants incorrects' },
      { status: 401 }
    );

  } catch (error) {
    console.error('❌ Erreur serveur:', error);
    return NextResponse.json(
      { error: 'Erreur interne du serveur: ' + (error as Error).message },
      { status: 500 }
    );
  }
}