'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { TRAINER } from '@/lib/constants';

export function HeroSection() {
  return (
    <section className="relative min-h-dvh flex items-center justify-center overflow-hidden">
      
      {/* Background Video with gradient mask to blend into WebGL below */}
      <motion.div
        initial={{ scale: 1.1, filter: 'blur(15px)', opacity: 0 }}
        animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          src="/videos/hero-fitness.mp4" 
        />
        {/* Overlay para oscurecer y desenfocar un poco como pidió (medio desenfocado) */}
        <div className="absolute inset-0 bg-dark/40 backdrop-blur-[3px]" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 py-32 sm:px-6 lg:px-8 text-center">
        {/* Badge / Píldora Superior */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-6 sm:mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-white/90 text-xs sm:text-sm font-medium tracking-wide uppercase">
            {TRAINER.title}
          </span>
        </motion.div>

        {/* Título Principal */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.1] mb-6 drop-shadow-2xl tracking-tight"
        >
          {TRAINER.heroTagline.split(' ').map((word, i) => (
            <span key={i}>
              {word.toLowerCase() === 'transformación' ||
              word.toLowerCase() === 'límites' ||
              word.toLowerCase() === 'versión' ? (
                <span className="text-primary">{word}</span>
              ) : (
                word
              )}{' '}
            </span>
          ))}
        </motion.h1>

        {/* Subtítulo / Descripción */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-text-muted text-lg sm:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 font-medium leading-relaxed"
        >
          {TRAINER.heroSubtitle}
        </motion.p>

        {/* Fila de Beneficios Rápidos (Rellena el espacio y da valor) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="flex flex-col sm:flex-row flex-wrap justify-center items-center gap-x-8 gap-y-3 mb-10 text-sm sm:text-base font-medium text-white/80"
        >
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Rutinas 100% Personalizadas
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Asesoría Nutricional
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
            Soporte Continuo
          </div>
        </motion.div>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/servicios"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-12 px-8 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-all active:scale-95"
          >
            Empieza Tu Transformación
          </Link>
          <Link
            href="/sobre-mi"
            className="w-full sm:w-auto inline-flex items-center justify-center min-h-12 px-8 border border-neutral hover:border-primary text-text-muted hover:text-primary font-semibold rounded-lg transition-all active:scale-95 backdrop-blur-sm"
          >
            Conoce al Entrenador
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2 backdrop-blur-md"
        >
          <div className="w-1 h-2 bg-primary rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
