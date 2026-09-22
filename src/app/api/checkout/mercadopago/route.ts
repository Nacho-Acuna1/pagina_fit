import { NextResponse } from 'next/server';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Montos hardcodeados por seguridad (TEMPORALMENTE en $1 para pruebas)
const PRICES_ARS: Record<string, number> = {
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

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productId, customer } = body;

    if (!productId || !PRICES_ARS[productId]) {
      return NextResponse.json({ error: 'Producto no válido' }, { status: 400 });
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      console.error('Falta configurar MP_ACCESS_TOKEN');
      return NextResponse.json({ error: 'Error de configuración del servidor' }, { status: 500 });
    }

    // Configurar cliente de Mercado Pago
    const client = new MercadoPagoConfig({ accessToken, options: { timeout: 5000 } });
    const preference = new Preference(client);

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').trim();
    const backBase = siteUrl.includes('localhost') ? 'https://google.com' : siteUrl;

    // Guardar datos del cliente como referencia externa (visible en tu panel de MP)
    const customerRef = customer 
      ? `${customer.nombre}|${customer.edad}|${customer.peso}kg|${customer.altura}cm|${customer.objetivo}` 
      : 'sin-datos';

    // Crear la preferencia
    const result = await preference.create({
      body: {
        items: [
          {
            id: productId,
            title: PLAN_NAMES[productId],
            quantity: 1,
            unit_price: PRICES_ARS[productId],
            currency_id: 'ARS',
          },
        ],
        payer: customer ? {
          name: customer.nombre,
        } : undefined,
        external_reference: customerRef,
        back_urls: {
          success: `${backBase}/success?gateway=mp`,
          failure: `${backBase}/servicios`,
          pending: `${backBase}/servicios`,
        },
        auto_return: 'approved',
      },
    });

    return NextResponse.json({ url: result.init_point });
  } catch (error) {
    console.error('Error al crear preferencia MP:', error);
    return NextResponse.json({ error: 'Error al procesar el pago' }, { status: 500 });
  }
}
