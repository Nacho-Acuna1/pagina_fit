'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';

interface AutoExpandProps {
  src: string;
  mediaType?: 'image' | 'video';
  title?: ReactNode;
  children?: ReactNode;
  startWidth?: number;
  startHeight?: number;
  startRadius?: number;
  mediaZoom?: number;
  duration?: number;
}

export function AutoExpand({
  src,
  mediaType = 'video',
  title,
  children,
  startWidth = 45,
  startHeight = 65, // Ligeramente mayor porque el contenedor final es más corto
  startRadius = 24,
  mediaZoom = 1.35,
  duration = 1.4, // Ni muy lento, ni muy rápido
}: AutoExpandProps) {
  // Calculamos el recorte inicial (clip-path) basado en el ancho y alto que queremos al principio
  const ix = Math.max(0, (100 - startWidth) / 2);
  const iy = Math.max(0, (100 - startHeight) / 2);
  const initialClipPath = `inset(${iy}% ${ix}% ${iy}% ${ix}% round ${startRadius}px)`;
  const finalClipPath = `inset(0% 0% 0% 0% round 24px)`; // Termina con bordes redondeados porque no toca la pantalla completa

  // Curva de aceleración ultra suave (glide-out) que empieza rápido y frena muy delicadamente
  const transition = { duration: 1.8, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.2 };

  return (
    <section className="relative w-[96%] max-w-[1400px] mx-auto h-[80dvh] mt-28 mb-16 overflow-hidden bg-dark rounded-3xl shadow-2xl border border-white/10">
      {/* Marco (Frame) físico que acompaña al video y le da presencia al recuadro */}
      <motion.div
        initial={{
          width: `${startWidth}%`,
          height: `${startHeight}%`,
          borderRadius: `${startRadius}px`,
          border: '1px solid rgba(255, 255, 255, 0.15)',
          boxShadow: '0 30px 60px rgba(0,0,0,0.8), 0 0 30px rgba(220, 38, 38, 0.15)' // Sombra oscura profunda + resplandor rojo primario
        }}
        animate={{
          width: '100%',
          height: '100%',
          borderRadius: '0px',
          border: '0px solid rgba(255, 255, 255, 0)',
          boxShadow: '0 0 0 rgba(0,0,0,0), 0 0 0 rgba(220, 38, 38, 0)'
        }}
        transition={transition}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20"
      />

      {/* Contenedor animado que se expande */}
      <motion.div
        initial={{ clipPath: initialClipPath }}
        animate={{ clipPath: finalClipPath }}
        transition={transition}
        className="absolute inset-0 w-full h-full"
      >
        {mediaType === 'video' ? (
          <motion.video
            initial={{ scale: mediaZoom }}
            animate={{ scale: 1 }}
            transition={transition}
            src={src}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <motion.img
            initial={{ scale: mediaZoom }}
            animate={{ scale: 1 }}
            transition={transition}
            src={src}
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
        )}

        {/* Oscurecimiento (Scrim) para poder leer el texto interno */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration, ease: 'easeOut', delay: duration * 0.4 }}
          className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-dark/20"
        />

        {/* Contenido Interior (Tus datos) que aparece cuando ya se está expandiendo */}
        {children && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: duration * 0.6 }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6"
          >
            {children}
          </motion.div>
        )}
      </motion.div>

      {/* Título inicial (Tu Nombre) que está por fuera y desaparece al expandirse */}
      {title && (
        <motion.div
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -40, scale: 1.05 }}
          transition={{ duration: duration * 0.7, ease: 'easeInOut', delay: 0.1 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <h1 className="text-4xl sm:text-6xl font-bold text-white tracking-tight drop-shadow-2xl text-center px-4">
            {title}
          </h1>
        </motion.div>
      )}
    </section>
  );
}
