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

    // 1. Récupérer tous les emails des abonnés
    const subscribers = await prisma.subscriber.findMany({
      select: { email: true }
    });

    if (subscribers.length === 0) {
      return NextResponse.json({ error: 'Aucun abonné trouvé' }, { status: 404 });
    }

    const emails = subscribers.map(sub => sub.email);

    // 2. Template HTML enrichi avec logo, styles, et mise en page professionnelle
    const htmlTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>RFC Assurance Newsletter</title>
        <style>
          /* Styles de base pour la compatibilité email */
          body { margin: 0; padding: 0; min-width: 100%; background-color: #f4f4f9; font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 40px 30px; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
          .header { text-align: center; border-bottom: 2px solid #eab308; padding-bottom: 20px; margin-bottom: 30px; }
          .logo { max-width: 150px; height: auto; display: block; margin: 0 auto; }
          .content { color: #333333; line-height: 1.6; font-size: 16px; }
          .content h1, .content h2, .content h3 { color: #0a1628; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e0e0e0; text-align: center; font-size: 12px; color: #999999; }
          .cta-button { display: inline-block; background-color: #eab308; color: #0a1628; text-decoration: none; padding: 12px 30px; border-radius: 6px; font-weight: bold; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header avec Logo -->
          <div class="header">
            <!-- ✅ Utilisation de l'URL publique de votre logo -->
            <img src="https://www.rfc.dz/static/logo.png" alt="RFC Assurance" class="logo" />
            <h1 style="color: #0a1628; margin-top: 10px; font-size: 24px;">RFC Assurance</h1>
          </div>

          <!-- Contenu du message -->
          <div class="content">
            ${content}
          </div>

          <!-- Pied de page -->
          <div class="footer">
            <p>© 2026 RFC Assurance - Alger, Algérie</p>
            <p>Pour vous désabonner, <a href="#" style="color: #eab308;">cliquez ici</a>.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // 3. Configurer le transporteur nodemailer
    const transporter = nodemailer.createTransport({
      host: 'mail.rfc.dz',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 4. Envoyer la newsletter
    await transporter.sendMail({
      from: '"RFC Assurance" <contact@rfc.dz>',
      to: 'contact@rfc.dz',
      bcc: emails,
      subject: subject,
      html: htmlTemplate,
    });

    // ✅ Retour de succès
    return NextResponse.json({ 
      success: true, 
      message: `Newsletter envoyée à ${emails.length} abonnés` 
    });

  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}