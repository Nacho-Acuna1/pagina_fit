'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';

interface CustomerData {
  nombre: string;
  edad: string;
  peso: string;
  altura: string;
  objetivo: string;
}

interface CheckoutFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CustomerData) => void;
  planName: string;
  loading: boolean;
}

export function CheckoutFormModal({ isOpen, onClose, onSubmit, planName, loading }: CheckoutFormModalProps) {
  const [form, setForm] = useState<CustomerData>({
    nombre: '',
    edad: '',
    peso: '',
    altura: '',
    objetivo: '',
  });

  const [errors, setErrors] = useState<Partial<CustomerData>>({});

  const validate = (): boolean => {
    const newErrors: Partial<CustomerData> = {};
    if (!form.nombre.trim()) newErrors.nombre = 'Requerido';
    if (!form.edad.trim() || isNaN(Number(form.edad))) newErrors.edad = 'Ingresá tu edad';
    if (!form.peso.trim()) newErrors.peso = 'Requerido';
    if (!form.altura.trim()) newErrors.altura = 'Requerido';
    if (!form.objetivo.trim()) newErrors.objetivo = 'Contanos tu objetivo';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(form);
    }
  };

  const handleChange = (field: keyof CustomerData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-lg bg-dark border border-neutral/30 rounded-2xl shadow-2xl z-10 overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 pt-6 pb-4 border-b border-neutral/20">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-primary text-xs font-bold uppercase tracking-widest mb-1">Último paso</p>
                  <h3 className="text-xl font-bold text-white">Completá tus datos</h3>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>
              <p className="text-white/50 text-sm mt-2">
                Plan seleccionado: <span className="text-white font-semibold">{planName}</span>
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Nombre */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">Nombre completo</label>
                <input
                  type="text"
                  value={form.nombre}
                  onChange={e => handleChange('nombre', e.target.value)}
                  placeholder="Ej: Juan Pérez"
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.nombre ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre}</p>}
              </div>

              {/* Edad + Peso + Altura en fila */}
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Edad</label>
                  <input
                    type="number"
                    value={form.edad}
                    onChange={e => handleChange('edad', e.target.value)}
                    placeholder="25"
                    min="10"
                    max="99"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.edad ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {errors.edad && <p className="text-red-400 text-xs mt-1">{errors.edad}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Peso (kg)</label>
                  <input
                    type="text"
                    value={form.peso}
                    onChange={e => handleChange('peso', e.target.value)}
                    placeholder="75"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.peso ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {errors.peso && <p className="text-red-400 text-xs mt-1">{errors.peso}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-white/70 mb-1.5">Altura (cm)</label>
                  <input
                    type="text"
                    value={form.altura}
                    onChange={e => handleChange('altura', e.target.value)}
                    placeholder="175"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all ${errors.altura ? 'border-red-500' : 'border-white/10'}`}
                  />
                  {errors.altura && <p className="text-red-400 text-xs mt-1">{errors.altura}</p>}
                </div>
              </div>

              {/* Objetivo */}
              <div>
                <label className="block text-sm font-medium text-white/70 mb-1.5">¿Cuál es tu objetivo?</label>
                <textarea
                  value={form.objetivo}
                  onChange={e => handleChange('objetivo', e.target.value)}
                  placeholder="Ej: Quiero bajar de peso y ganar masa muscular para sentirme mejor conmigo mismo..."
                  rows={3}
                  className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none ${errors.objetivo ? 'border-red-500' : 'border-white/10'}`}
                />
                {errors.objetivo && <p className="text-red-400 text-xs mt-1">{errors.objetivo}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none shadow-[0_0_20px_rgba(220,38,38,0.3)] mt-2"
              >
                {loading ? 'Redirigiendo al pago...' : 'Continuar al Pago'}
              </button>

              <p className="text-white/30 text-xs text-center">
                🔒 Tus datos están protegidos y solo serán usados por tu entrenador.
              </p>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
