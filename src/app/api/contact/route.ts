import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { SITE_CONFIG } from '@/lib/constants';

// Initialize Resend lazily inside the handler to prevent build errors when the key is not present
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Faltan campos obligatorios' },
        { status: 400 }
      );
    }

    const data = await resend?.emails.send({
      from: 'FT Nutrition <onboarding@resend.dev>', // Por defecto en Resend para pruebas
      to: [SITE_CONFIG.contact.email], // Se lee desde constants.ts
      subject: `Nueva Consulta de Plan Deportivo - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
          <h2 style="color: #dc2626;">¡Tienes una nueva consulta desde la web!</h2>
          <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>👤 Nombre:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>✉️ Email:</strong> ${email}</p>
            <p style="margin: 15px 0 5px 0;"><strong>🎯 Objetivo o Mensaje:</strong></p>
            <p style="background: #fff; padding: 15px; border-left: 4px solid #dc2626; margin: 0; white-space: pre-wrap;">${message}</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Error enviando correo:', error);
    return NextResponse.json(
      { error: 'Hubo un error interno al enviar el correo' },
      { status: 500 }
    );
  }
}
