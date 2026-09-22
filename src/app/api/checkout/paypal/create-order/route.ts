import { NextResponse } from 'next/server';

const PRICES_USD: Record<string, number> = {
  digital: 1, 
  mensual: 1,
  completo: 1,
  'rutina-medida': 1,
};

const PLAN_NAMES: Record<string, string> = {
  digital: 'Rutina Personalizada (Digital)',
  mensual: 'Plan de Entrenamiento Mensual',
  completo: 'Plan de Entrenamiento Completo',
  'rutina-medida': 'Rutina Personalizada (Digital)',
};

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
    const { productId, customer } = body;

    if (!productId || !PRICES_USD[productId]) {
      return NextResponse.json({ error: 'Producto no válido' }, { status: 400 });
    }

    const accessToken = await generateAccessToken();

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').trim();
    const returnUrl = siteUrl.includes('localhost') 
      ? `https://google.com/success?gateway=paypal` 
      : `${siteUrl}/success?gateway=paypal`;
    const cancelUrl = siteUrl.includes('localhost')
      ? `https://google.com/servicios`
      : `${siteUrl}/servicios`;

    const response = await fetch(`${PAYPAL_API_BASE}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [
          {
            reference_id: productId,
            custom_id: customer 
              ? `${customer.nombre}|${customer.edad}|${customer.peso}kg|${customer.altura}cm|${customer.objetivo}`.substring(0, 127) 
              : 'sin-datos',
            amount: {
              currency_code: 'USD',
              value: PRICES_USD[productId].toString(),
            },
            description: PLAN_NAMES[productId],
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              payment_method_preference: 'IMMEDIATE_PAYMENT_REQUIRED',
              user_action: 'PAY_NOW',
              return_url: returnUrl,
              cancel_url: cancelUrl,
            },
          },
        },
      }),
    });

    const orderData = await response.json();

    if (!response.ok) {
      console.error('PayPal order error:', JSON.stringify(orderData, null, 2));
      throw new Error(orderData.message || 'Error al crear orden en PayPal');
    }

    // Buscar el link de aprobación para redirigir al usuario
    const approveLink = orderData.links?.find((l: any) => l.rel === 'payer-action' || l.rel === 'approve');
    
    if (!approveLink) {
      throw new Error('No se encontró el link de aprobación de PayPal');
    }

    return NextResponse.json({ url: approveLink.href, id: orderData.id });
  } catch (error) {
    console.error('Error en create-order PayPal:', error);
    return NextResponse.json({ error: 'Error al procesar el pago con PayPal' }, { status: 500 });
  }
}
