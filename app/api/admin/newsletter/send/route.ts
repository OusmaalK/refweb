import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Resend } from 'resend';

// Initialisation de Resend avec votre clé API
const resend = new Resend(process.env.RESEND_API_KEY);

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

    // 3. Envoi via Resend
    // Note : Pour de très grandes listes, considérez l'utilisation de l'API "Batch" de Resend
    // 3. Envoi via Resend
    const { data, error } = await resend.emails.send({
        // --- MODE TEST (À décommenter si le domaine n'est pas encore vérifié) ---
        from: 'onboarding@resend.dev',
        
        // --- MODE PRODUCTION (À décommenter une fois le domaine activé dans Resend) ---
        // from: 'RFC Assurance <newsletter@rfc-assurance.dz>', 
        
        to: emails,
        subject: subject,
        html: htmlTemplate,
      });
    if (error) {
      console.error("Erreur Resend:", error);
      return NextResponse.json({ error: 'Erreur lors de l\'envoi via Resend' }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: 'Newsletter envoyée avec succès' });

  } catch (error) {
    console.error("Erreur serveur:", error);
    return NextResponse.json({ error: 'Erreur interne du serveur' }, { status: 500 });
  }
}