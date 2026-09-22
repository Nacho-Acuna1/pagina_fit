'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FadeIn } from '@/components/motion/FadeIn';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import type { Transformation } from '@/lib/constants';

interface TransformationCardProps {
  transformation: Transformation;
  index: number;
}

export function TransformationCard({ transformation, index }: TransformationCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const modalContent = isOpen ? (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl max-h-full overflow-y-auto bg-dark border border-neutral/30 rounded-2xl shadow-2xl z-10 flex flex-col sm:flex-row"
      >
        <button 
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center bg-black/50 text-white rounded-full hover:bg-primary transition-colors"
        >
          ✕
        </button>

        {/* Modal Images */}
        <div className="flex w-full sm:w-1/2 min-h-[300px]">
          <div className="relative flex-1 bg-neutral/20">
            <Image 
              src={transformation.imageBefore} 
              alt={`Antes de ${transformation.name}`}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white/90 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
              Antes
            </div>
          </div>
          <div className="relative flex-1 bg-neutral/20">
            <Image 
              src={transformation.imageAfter} 
              alt={`Después de ${transformation.name}`}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
              Después
            </div>
          </div>
        </div>

        {/* Modal Text */}
        <div className="w-full sm:w-1/2 p-6 sm:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-4 mb-4">
            <h3 className="text-2xl font-bold text-text">{transformation.name}</h3>
            <span className="text-xs text-primary font-bold bg-primary/10 px-3 py-1 rounded-full">
              {transformation.duration}
            </span>
          </div>
          <p className="text-base text-text-muted leading-relaxed">
            {transformation.description}
          </p>
        </div>
      </motion.div>
    </div>
  ) : null;

  return (
    <>
      <FadeIn delay={index * 0.15} className="group">
        <div 
          className="bg-dark-card rounded-xl overflow-hidden border border-neutral/30 hover:border-primary/50 transition-colors cursor-pointer flex flex-col h-full"
          onClick={() => setIsOpen(true)}
        >
          {/* Before/After images */}
          <div className="grid grid-cols-2 gap-px bg-neutral/30">
            <div className="relative aspect-[3/4] bg-neutral/20 group-hover:brightness-110 transition-all">
              <Image 
                src={transformation.imageBefore} 
                alt={`Antes de ${transformation.name}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white/90 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
                Antes
              </div>
            </div>
            <div className="relative aspect-[3/4] bg-neutral/20 group-hover:brightness-110 transition-all">
              <Image 
                src={transformation.imageAfter} 
                alt={`Después de ${transformation.name}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
                Después
              </div>
            </div>
          </div>

          {/* Info */}
          <div className="p-5 flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-text">{transformation.name}</h3>
              <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full whitespace-nowrap ml-2">
                {transformation.duration}
              </span>
            </div>
            <p className="text-sm text-text-muted leading-relaxed line-clamp-3">
              {transformation.description}
            </p>
            <div className="mt-auto pt-3">
              <span className="text-xs font-semibold text-neutral-400 group-hover:text-neutral-300 transition-colors">Ver todo</span>
            </div>
          </div>
        </div>
      </FadeIn>
      
      {mounted && typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {isOpen && modalContent}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
