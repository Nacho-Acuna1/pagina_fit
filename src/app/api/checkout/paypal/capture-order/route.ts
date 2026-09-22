import { NextResponse } from 'next/server';

const PAYPAL_API_BASE = 'https://api-m.paypal.com';

async function generateAccessToken() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('Faltan credenciales de PayPal');
  }

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: 'POST',
    body: 'grant_type=client_credentials',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error_description || 'Error generando access token');
  }
  return data.access_token;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderID } = body;

    if (!orderID) {
      return NextResponse.json({ error: 'ID de orden no proporcionado' }, { status: 400 });
    }

    const accessToken = await generateAccessToken();

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const captureData = await response.json();

    if (!response.ok) {
      throw new Error(captureData.message || 'Error al capturar orden en PayPal');
    }

    return NextResponse.json(captureData);
  } catch (error) {
    console.error('Error en capture-order PayPal:', error);
    return NextResponse.json({ error: 'Error al capturar el pago con PayPal' }, { status: 500 });
  }
}
