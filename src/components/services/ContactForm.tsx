'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function ContactForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [planRef, setPlanRef] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name, 
          email, 
          message: `Plan referido: ${planRef}\n\nDuda/Objetivo: ${message}` 
        }),
      });

      if (response.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setPlanRef('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-dark-card border border-neutral/30 rounded-3xl p-6 sm:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

      <AnimatePresence mode="wait">
        {status === 'success' ? (
          <motion.div 
            key="success"
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center text-center py-10 relative z-10"
          >
            <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">¡Consulta enviada!</h3>
            <p className="text-text-muted leading-relaxed">
              He recibido tu mensaje correctamente. Me pondré en contacto contigo a través de tu correo lo antes posible para resolver tus dudas y organizar tu plan.
            </p>
            <button 
              onClick={() => setStatus('idle')}
              className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
            >
              Enviar otra consulta
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="text-3xl font-black text-white mb-2 relative z-10">¿Aún tienes dudas?</h3>
            <p className="text-text-muted mb-8 text-sm md:text-base relative z-10">
              Déjame tus datos, indícame qué plan te interesa y cuál es tu duda. Me comunicaré contigo por correo electrónico.
            </p>
            
            {status === 'error' && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-sm text-red-200">
                Hubo un problema al enviar la consulta. Por favor intenta más tarde o contáctame por redes.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Nombre completo</label>
                  <input 
                    required 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ej. Juan Pérez"
                    className="w-full bg-dark/50 border border-neutral/40 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-2">Correo electrónico</label>
                  <input 
                    required 
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@correo.com"
                    className="w-full bg-dark/50 border border-neutral/40 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">¿A qué plan te refieres?</label>
                <select
                  required
                  value={planRef}
                  onChange={(e) => setPlanRef(e.target.value)}
                  className="w-full bg-dark/50 border border-neutral/40 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
                >
                  <option value="" disabled>Selecciona un plan...</option>
                  <option value="Programa Evolución">Programa Evolución (Mensual)</option>
                  <option value="Pack Transformación">Pack Transformación (Trimestral)</option>
                  <option value="Plan Digital">Plan Digital de Entrenamiento</option>
                  <option value="Aún no lo sé">Aún no lo sé / Otra consulta</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/70 mb-2">¿Cuál es tu duda o cuéntame tu objetivo?</label>
                <textarea 
                  required 
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Quiero mejorar mi fuerza y entrenar en casa..."
                  className="w-full bg-dark/50 border border-neutral/40 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-none"
                />
              </div>
              
              <button 
                disabled={status === 'loading'}
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 rounded-xl transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2 mt-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Enviando...
                  </>
                ) : (
                  'Enviar consulta'
                )}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
