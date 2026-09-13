'use client';

import { motion } from 'motion/react';
import { SlideUp } from '@/components/motion/SlideUp';
import { TARGET_AUDIENCE } from '@/lib/constants';

export function TargetAudienceSection() {
  return (
    <section className="py-20 sm:py-32 border-t border-neutral/30 overflow-hidden relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SlideUp className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            A quién está <span className="text-white/90 border-b-2 border-primary pb-1">Destinado</span>
          </h2>
          <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto mt-6">
            Mi metodología no es para todos. Está diseñada para quienes están dispuestos a invertir en sí mismos y seguir el proceso.
          </p>
        </SlideUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 overflow-hidden py-4 px-4 -mx-4">
          {TARGET_AUDIENCE.map((item, index) => {
            // Animación alternada: 0 = Izquierda, 1 = Derecha, 2 = Izquierda
            const fromLeft = index % 2 === 0;
            
            return (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, x: fromLeft ? -150 : 150 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 1.2, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="bg-dark-card/60 backdrop-blur-md border border-neutral/30 hover:border-primary/50 transition-colors duration-300 p-8 rounded-2xl h-full flex flex-col justify-start relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/25 transition-colors duration-500" />
                
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 z-10 flex items-start gap-3">
                  <span className="text-primary mt-1 text-2xl leading-none font-black drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]">✓</span>
                  {item.title}
                </h3>
                <p className="text-white/70 font-medium z-10 leading-relaxed text-sm sm:text-base">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
