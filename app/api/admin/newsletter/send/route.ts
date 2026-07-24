// app/api/admin/newsletter/send/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { subject, content } = await req.json();

    if (!subject || !content) {
      return NextResponse.json({ error: 'Sujet et contenu requis' }, { status: 400 });
    }

    // 1. Récupérer tous les emails des abonnés depuis la base de données
    const subscribers = await prisma.subscriber.findMany({
      select: { email: true }
    });

    if (subscribers.length === 0) {
      return NextResponse.json({ error: 'Aucun abonné trouvé' }, { status: 404 });
    }

    const emails = subscribers.map(sub => sub.email);

    // 2. Définition du template HTML enveloppant votre contenu
    const htmlTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="color: #0a1628;">RFC Assurance</h1>
        </div>
        <div style="line-height: 1.6; color: #333;">
          ${content}
        </div>
        <div style="margin-top: 40px; font-size: 12px; color: #777; text-align: center;">
          © 2026 RFC Assurance - Alger, Algérie
        </div>
      </div>
    `;

    // 3. Configurer le transporteur nodemailer avec votre serveur cPanel
    const transporter = nodemailer.createTransport({
      host: 'mail.rfc.dz',
      port: 465,
      secure: true, // SSL/TLS
      auth: {
        user: process.env.EMAIL_USER, // contact@rfc.dz
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Envoyer la newsletter
    await transporter.sendMail({
      from: '"RFC Assurance" <contact@rfc.dz>',
      to: 'contact@rfc.dz', // On envoie à nous-mêmes en premier
      bcc: emails, // Les abonnés sont en copie cachée
      subject: subject,
      html: htmlTemplate,
    });

    return NextResponse.json({ success: true, message: `Newsletter envoyée à ${emails.length} abonnés` });

  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}