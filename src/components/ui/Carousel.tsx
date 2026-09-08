'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface CarouselProps {
  children: React.ReactNode;
  autoPlayInterval?: number;
}

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export function Carousel({ children, autoPlayInterval = 6000 }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const items = React.Children.toArray(children);
  const count = items.length;

  useEffect(() => {
    if (isHovered) return; // Pausa el auto-play si el usuario está interactuando o leyendo

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % count);
    }, autoPlayInterval);

    return () => clearInterval(timer);
  }, [count, autoPlayInterval, isHovered]);

  // Calcula la posición relativa para el loop infinito (3D coverflow effect)
  const getRelativePosition = (index: number) => {
    const diff = index - currentIndex;
    if (diff === count - 1) return -1;
    if (diff === -(count - 1)) return 1;
    
    if (diff > 1) return 2;
    if (diff < -1) return -2;
    
    return diff;
  };

  return (
    <div 
      className="relative w-full py-8 sm:py-12 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
    >
      {/* Contenedor central (Slider) */}
      <div className="relative h-[480px] sm:h-[450px] w-full max-w-7xl mx-auto flex items-center justify-center">
        <AnimatePresence initial={false}>
          {items.map((child, i) => {
            const relativePos = getRelativePosition(i);
            
            const isActive = relativePos === 0;
            const isPrev = relativePos === -1;
            const isNext = relativePos === 1;
            const isHidden = relativePos < -1 || relativePos > 1;

            let x = '0%';
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;
            let blur = 0;

            if (isPrev) {
              x = '-75%'; // Desplazado a la izquierda (peaking)
              scale = 0.8; // Escala reducida
              opacity = 0.35; // Semi-transparente
              zIndex = 20;
              blur = 4; // Difulminado (Blur)
            } else if (isNext) {
              x = '75%'; // Desplazado a la derecha
              scale = 0.8;
              opacity = 0.35;
              zIndex = 20;
              blur = 4;
            } else if (isHidden) {
              x = relativePos < 0 ? '-120%' : '120%'; // Ocultos fuera de la pantalla
              scale = 0.5;
              opacity = 0;
              zIndex = 10;
              blur = 8;
            }

            return (
              <motion.div
                key={i}
                className="absolute w-[85%] sm:w-[50%] lg:w-[40%] max-w-[450px] cursor-grab active:cursor-grabbing"
                initial={false}
                animate={{
                  x,
                  scale,
                  opacity,
                  zIndex,
                  filter: `blur(${blur}px)`
                }}
                transition={{
                  duration: 0.7,
                  ease: [0.16, 1, 0.3, 1] // Movimiento suave muy Apple (Spring feel)
                }}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(e, { offset, velocity }) => {
                  if (!isActive) return;
                  const swipe = swipePower(offset.x, velocity.x);
                  if (swipe < -swipeConfidenceThreshold) {
                    setCurrentIndex((prev) => (prev + 1) % count);
                  } else if (swipe > swipeConfidenceThreshold) {
                    setCurrentIndex((prev) => (prev - 1 + count) % count);
                  }
                }}
              >
                {/* Overlay clickeable en las tarjetas adyacentes para que vengan al centro */}
                <div 
                  className={`transition-all duration-300 w-full rounded-2xl ${
                    !isActive ? 'pointer-events-auto cursor-pointer hover:opacity-100 hover:scale-[1.02]' : ''
                  }`}
                  onClick={() => {
                    if (isPrev) setCurrentIndex((prev) => (prev - 1 + count) % count);
                    if (isNext) setCurrentIndex((prev) => (prev + 1) % count);
                  }}
                >
                  <div className={!isActive ? 'pointer-events-none' : ''}>
                    {child}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Indicadores inferiores */}
      <div className="flex justify-center gap-3 mt-6 relative z-40">
        {items.map((_, i) => (
          <button
            key={i}
            aria-label={`Ir a tarjeta ${i + 1}`}
            onClick={() => setCurrentIndex(i)}
            className={`transition-all duration-300 rounded-full ${
              i === currentIndex 
                ? 'w-10 h-2.5 bg-primary shadow-[0_0_15px_rgba(220,38,38,0.8)]' 
                : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/40'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
