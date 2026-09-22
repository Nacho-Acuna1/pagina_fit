'use client';

import { useState } from 'react';
import { useRegion } from '@/hooks/useRegion';
import { CheckoutFormModal } from './CheckoutFormModal';

// Mapeo de productId a nombre legible para el modal
const PLAN_DISPLAY_NAMES: Record<string, string> = {
  mensual: 'Plan Mensual',
  completo: 'Plan Completo',
  digital: 'Rutina Personalizada (Digital)',
  'rutina-medida': 'Rutina Personalizada (Digital)',
};

interface CheckoutButtonProps {
  productId?: string;
  className?: string;
  label?: string;
}

export function CheckoutButton({ productId = 'digital', className = '', label = 'Comprar Ahora' }: CheckoutButtonProps) {
  const { currency, isReady } = useRegion();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  if (!isReady) {
    return (
      <div className={`flex items-center justify-center animate-pulse bg-zinc-800 rounded-xl px-8 py-4 ${className}`}>
        <span className="text-transparent">Cargando...</span>
      </div>
    );
  }

  const handleFormSubmit = async (customerData: { nombre: string; edad: string; peso: string; altura: string; objetivo: string }) => {
    try {
      setLoading(true);
      setError(null);

      const endpoint = currency === 'ARS' 
        ? '/api/checkout/mercadopago' 
        : '/api/checkout/paypal/create-order';

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId, customer: customerData }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Error al procesar el pago');

      // Redirigir al checkout correspondiente
      window.location.href = data.url;
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        <button
          onClick={() => setShowForm(true)}
          disabled={loading}
          className={`inline-flex items-center justify-center w-full min-h-12 px-6 py-4 font-bold rounded-xl transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${className || 'bg-primary hover:bg-primary-dark shadow-[0_0_20px_rgba(220,38,38,0.3)] text-white'}`}
        >
          {label}
        </button>

        {error && (
          <p className="text-red-500 text-sm text-center mt-2">{error}</p>
        )}
      </div>

      <CheckoutFormModal
        isOpen={showForm}
        onClose={() => { setShowForm(false); setError(null); }}
        onSubmit={handleFormSubmit}
        planName={PLAN_DISPLAY_NAMES[productId] || productId}
        loading={loading}
      />
    </>
  );
}
