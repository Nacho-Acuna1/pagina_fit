'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Simulated form submission (Here you would hook up Formspree, Resend, or your own API)
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    // Simulate network request
    setTimeout(() => {
      setStatus('success');
    }, 1500);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center justify-center w-full sm:w-auto px-8 py-4 border border-white/20 hover:border-primary bg-white/5 hover:bg-primary text-white font-bold rounded-xl transition-all duration-300 active:scale-95"
      >
        Consultar por correo
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-dark/80 backdrop-blur-sm"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-dark-card border border-neutral/30 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-hidden"
            >
              {/* Decorative background glow */}
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/20 rounded-full blur-[80px] pointer-events-none" />

              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-colors z-20"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex flex-col items-center text-center py-10 relative z-10"
                >
                  <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                    <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">¡Consulta enviada!</h3>
                  <p className="text-text-muted leading-relaxed">
                    He recibido tu mensaje correctamente. Me pondré en contacto contigo a través de tu correo lo antes posible para organizar tu plan a medida.
                  </p>
                  <button 
                    onClick={() => {
                      setIsOpen(false);
                      setTimeout(() => setStatus('idle'), 300);
                    }}
                    className="mt-8 px-8 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors"
                  >
                    Cerrar ventana
                  </button>
                </motion.div>
              ) : (
                <>
                  <h3 className="text-2xl font-bold text-white mb-2 relative z-10">Consulta por tu Plan</h3>
                  <p className="text-text-muted mb-8 text-sm relative z-10">
                    Déjame tus datos y me comunicaré contigo por correo electrónico para empezar.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Nombre completo</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="Ej. Juan Pérez"
                        className="w-full bg-dark/50 border border-neutral/40 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Correo electrónico</label>
                      <input 
                        required 
                        type="email" 
                        placeholder="tu@correo.com"
                        className="w-full bg-dark/50 border border-neutral/40 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white/70 mb-2">Cuéntame un poco de tu objetivo</label>
                      <textarea 
                        required 
                        rows={3}
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
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
