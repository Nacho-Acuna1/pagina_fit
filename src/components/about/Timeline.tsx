'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import type { TimelineEvent } from '@/lib/constants';

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  const [openDiploma, setOpenDiploma] = useState<string | null>(null);

  return (
    <>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-neutral/50 sm:-translate-x-px" />

        <div className="space-y-12">
          {events.map((event, index) => {
            const hasDiploma = !!event.diplomaImage;

            return (
              <motion.div
                key={`${event.year}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-0 ${
                  index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                }`}
              >
                {/* Dot */}
                <div className={`absolute left-4 sm:left-1/2 w-3 h-3 rounded-full -translate-x-1.5 mt-1.5 ring-4 ring-dark z-10 ${
                  hasDiploma ? 'bg-primary' : 'bg-neutral-500'
                }`} />

                {/* Content */}
                <div
                  className={`ml-10 sm:ml-0 sm:w-1/2 ${
                    index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'
                  }`}
                >
                  <span className="text-primary font-bold text-sm">{event.year}</span>
                  <h3 className="text-lg font-semibold text-text mt-1">{event.title}</h3>
                  <p className="text-text-muted text-sm mt-2 leading-relaxed">
                    {event.description}
                  </p>

                  {/* Clickable diploma link */}
                  {hasDiploma && (
                    <button
                      onClick={() => setOpenDiploma(event.diplomaImage!)}
                      className="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-primary/80 hover:text-primary transition-colors group"
                    >
                      <span className="w-5 h-5 flex items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                        📜
                      </span>
                      Ver certificado
                    </button>
                  )}
                </div>

                {/* Spacer for alternating side */}
                <div className="hidden sm:block sm:w-1/2" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Diploma Modal */}
      {typeof document !== 'undefined' && createPortal(
        <AnimatePresence>
          {openDiploma && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setOpenDiploma(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative z-10 w-full max-w-2xl"
              >
                <button
                  onClick={() => setOpenDiploma(null)}
                  className="absolute -top-3 -right-3 z-20 w-10 h-10 flex items-center justify-center bg-dark border border-neutral/30 text-white rounded-full hover:bg-primary transition-colors shadow-xl"
                >
                  ✕
                </button>
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-neutral/20 shadow-2xl">
                  <Image
                    src={openDiploma}
                    alt="Certificado"
                    fill
                    className="object-contain bg-white"
                    sizes="(max-width: 672px) 100vw, 672px"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}
