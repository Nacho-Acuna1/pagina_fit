'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // La pantalla de carga dura 2.5 segundos antes de desvanecerse
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-dark overflow-hidden"
        >
          {/* Fondo animado (luces) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1.5, opacity: 0.15 }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] bg-primary rounded-full blur-[100px]"
            />
          </div>

          <motion.div
            initial={{ scale: 0.8, opacity: 0, filter: 'blur(20px)' }}
            animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-64 h-64 sm:w-80 sm:h-80 z-10"
          >
            <Image 
              src="/images/logo.png" 
              alt="FT Nutrition Logo" 
              fill 
              className="object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.1)]" 
              priority 
            />
          </motion.div>

          {/* Barra de progreso decorativa */}
          <motion.div 
            className="absolute bottom-20 w-48 h-1 bg-white/10 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
