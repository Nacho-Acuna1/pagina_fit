'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SITE_CONFIG } from '@/lib/constants';
import { motion } from 'framer-motion';

function SuccessContent() {
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(5);
  
  // MercadoPago manda "payment_id" y "status"
  // PayPal enviamos "orderId" y "gateway=paypal" desde el frontend
  const paymentId = searchParams.get('payment_id') || searchParams.get('orderId') || 'Desconocido';
  const gateway = searchParams.get('gateway') || 'mercadopago';

  const whatsappMessage = encodeURIComponent(
    `Hola! Acabo de comprar el Plan Digital.\n\n` +
    `ID de Transacción: #${paymentId}\n` +
    `Método: ${gateway.toUpperCase()}\n\n` +
    `Te escribo para recibir mi rutina y contarte sobre mí!`
  );
  
  const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${whatsappMessage}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = whatsappUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [whatsappUrl]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 max-w-lg w-full text-center shadow-2xl"
      >
        <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h1 className="text-3xl font-black text-white mb-4">¡Pago Exitoso!</h1>
        <p className="text-zinc-400 mb-2">Tu transacción se ha procesado correctamente.</p>
        <p className="text-xs text-zinc-600 mb-8 font-mono">Ref: {paymentId}</p>

        <div className="bg-zinc-950 rounded-xl p-4 mb-8 text-sm text-zinc-300">
          <p className="mb-2">Ahora necesitamos enviarte tu rutina y armar tu expediente.</p>
          <p className="text-primary font-bold">Serás redirigido a WhatsApp en {countdown} segundos...</p>
        </div>

        <a 
          href={whatsappUrl}
          className="inline-flex items-center justify-center w-full px-6 py-4 bg-[#25D366] hover:bg-[#128C7E] text-white font-bold rounded-xl transition-all duration-300 active:scale-95"
        >
          Ir a WhatsApp Ahora
        </a>
      </motion.div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center">Cargando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
