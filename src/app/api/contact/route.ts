import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Initialisation lazy du client Resend
const getResendClient = () => {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
};

// Adresse de destination officielle (par défaut l'email lié au compte Resend gratuit)
const RECIPIENT_EMAIL = process.env.CONTACT_RECIPIENT_EMAIL || 'yembitsaimon2@gmail.com';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nom, entreprise, email, telephone, typeProjet, budget, message, _gotcha } = body;

    // Protection anti-spam Honeypot
    if (_gotcha) {
      return NextResponse.json({ success: true, message: 'Message reçu' }, { status: 200 });
    }

    // Validation des données côté serveur
    if (!nom || typeof nom !== 'string' || !nom.trim()) {
      return NextResponse.json({ error: 'Le champ Nom est requis.' }, { status: 400 });
    }

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return NextResponse.json({ error: 'Adresse e-mail invalide.' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Le message est requis.' }, { status: 400 });
    }

    // Protection contre les payloads trop volumineux
    if (nom.length > 100 || email.length > 150 || message.length > 5000) {
      return NextResponse.json({ error: 'Contenu trop volumineux.' }, { status: 400 });
    }

    const resend = getResendClient();

    if (!resend) {
      console.warn('⚠️ RESEND_API_KEY non configurée dans les variables d’environnement.');
      // En l'absence de clé d'API (ex: dev local avant config Vercel), on valide la structure
      return NextResponse.json(
        {
          success: true,
          warning: 'API_KEY_MISSING',
          message: 'Demande validée côté serveur (ajoutez RESEND_API_KEY sur Vercel pour la délivrabilité réelle).',
        },
        { status: 200 }
      );
    }

    // Construction de l'email HTML propre aux couleurs Digitech Web
    const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0a0a0a; color: #f5f0eb; padding: 30px; margin: 0; }
            .container { max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid rgba(255,255,255,0.1); border-radius: 16px; padding: 32px; }
            .header { border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 20px; margin-bottom: 24px; }
            .title { font-size: 20px; font-weight: 700; color: #c8f04a; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: 1px; }
            .subtitle { font-size: 13px; color: #9a9590; margin: 0; }
            .field-group { margin-bottom: 18px; }
            .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #5a5753; margin-bottom: 4px; font-weight: 600; }
            .field-value { font-size: 15px; color: #f5f0eb; line-height: 1.5; }
            .highlight { color: #c8f04a; font-weight: 600; }
            .message-box { background-color: #161616; border: 1px solid rgba(255,255,255,0.08); border-radius: 8px; padding: 18px; margin-top: 10px; font-size: 14px; white-space: pre-wrap; color: #f5f0eb; }
            .footer { margin-top: 32px; pt: 20px; border-top: 1px solid rgba(255,255,255,0.1); font-size: 12px; color: #5a5753; text-align: center; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 class="title">Nouvelle Demande de Projet</h1>
              <p class="subtitle">Transmise via le formulaire de contact digitech-web.fr</p>
            </div>

            <div class="field-group">
              <div class="field-label">Expéditeur</div>
              <div class="field-value"><strong>${nom}</strong> ${entreprise ? `(${entreprise})` : ''}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Contact</div>
              <div class="field-value">
                E-mail : <a href="mailto:${email}" style="color: #c8f04a; text-decoration: none;">${email}</a><br>
                ${telephone ? `Téléphone : <a href="tel:${telephone}" style="color: #f5f0eb; text-decoration: none;">${telephone}</a>` : 'Téléphone : Non renseigné'}
              </div>
            </div>

            <div class="field-group">
              <div class="field-label">Détails du Projet</div>
              <div class="field-value">
                Type de projet : <span class="highlight">${typeProjet || 'Non spécifié'}</span><br>
                Budget indicatif : <span class="highlight">${budget || 'Non spécifié'}</span>
              </div>
            </div>

            <div class="field-group">
              <div class="field-label">Message</div>
              <div class="message-box">${message}</div>
            </div>

            <div class="footer">
              Message envoyé depuis le site Digitech Web • ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}
            </div>
          </div>
        </body>
      </html>
    `;

    const { data, error } = await resend.emails.send({
      from: 'Digitech Web <onboarding@resend.dev>', // Ou adresse de domaine vérifiée
      to: [RECIPIENT_EMAIL],
      replyTo: email,
      subject: `[Nouveau Projet Digitech Web] — ${nom}${typeProjet ? ` (${typeProjet})` : ''}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Erreur lors de l’envoi Resend:', error);
      return NextResponse.json({ error: 'Erreur lors de l’envoi de votre message. Veuillez réessayer.' }, { status: 500 });
    }

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (err) {
    console.error('Erreur serveur API /api/contact:', err);
    return NextResponse.json({ error: 'Erreur serveur inattendue.' }, { status: 500 });
  }
}
