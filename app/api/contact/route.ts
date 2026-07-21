import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message, subscribe } = body;

    // 1. Enregistrer le message dans la base de données (Optionnel mais recommandé)
    await prisma.contactMessage.create({
      data: {
        name,
        email,
        phone: phone || '',
        message,
      },
    });

    // 2. Si la personne est inscrite à la newsletter, on l'ajoute à la table Subscriber
    if (subscribe) {
      // On utilise upsert pour éviter les erreurs si l'email existe déjà
      await prisma.subscriber.upsert({
        where: { email },
        update: { isActive: true },
        create: { email },
      });
    }

    // 3. Envoyer l'email via SMTP (votre compte cPanel)
    // IMPORTANT: Ces variables doivent être dans votre fichier .env.local
    const transporter = nodemailer.createTransport({
      host: 'mail.rfc.dz', // Votre serveur SMTP
      port: 465, // Port sécurisé
      secure: true, // SSL/TLS
      auth: {
        user: process.env.EMAIL_USER, // ex: khaled.ousmaal@rfc.dz
        pass: process.env.EMAIL_PASS, // Le mot de passe de ce compte
      },
    });

    await transporter.sendMail({
      from: `"Site Web RFC" <${process.env.EMAIL_USER}>`,
      to: 'contact@rfc.dz', // L'adresse où vous voulez recevoir le mail
      subject: `Nouveau message de contact de ${name}`,
      html: `
        <h2>Nouveau message depuis le site RFC</h2>
        <p><strong>Nom :</strong> ${name}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Téléphone :</strong> ${phone || 'Non renseigné'}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
        <hr>
        <p><em>Inscrit à la newsletter : ${subscribe ? 'Oui' : 'Non'}</em></p>
      `,
    });

    return NextResponse.json({ success: true, message: 'Message envoyé avec succès' });

  } catch (error) {
    console.error('Erreur lors de l\'envoi du message:', error);
    return NextResponse.json(
      { success: false, message: 'Erreur lors de l\'envoi du message' },
      { status: 500 }
    );
  }
}