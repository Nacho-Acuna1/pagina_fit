'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_LINKS } from '@/lib/constants';

export function StaggeredMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const menuVariants = {
    closed: {
      scale: 0.95,
      opacity: 0,
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
        when: "afterChildren"
      }
    },
    open: {
      scale: 1,
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    closed: { opacity: 0, y: 15, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.3 } }
  };

  return (
    <div className="relative" ref={menuRef}>
      {/* Botón de Menú (Las 3 líneas) mejorado */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-4 sm:px-6 py-3 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 rounded-full transition-all group"
      >
        <span className="text-sm font-bold tracking-widest uppercase text-white/90 group-hover:text-white hidden sm:block">Menú</span>
        <div className="relative w-6 h-4 flex flex-col justify-between">
          <span className={`h-[2px] w-full bg-primary transition-all duration-300 origin-left ${isOpen ? 'rotate-45 translate-x-[2px]' : ''}`} />
          <span className={`h-[2px] w-full bg-primary transition-all duration-300 ${isOpen ? 'opacity-0 translate-x-4' : 'opacity-100'}`} />
          <span className={`h-[2px] w-full bg-primary transition-all duration-300 origin-left ${isOpen ? '-rotate-45 translate-x-[2px]' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ transformOrigin: 'top right' }}
            className="absolute right-0 top-full mt-4 w-[calc(100vw-2rem)] sm:w-96 p-6 sm:p-8 bg-dark/95 backdrop-blur-3xl border border-white/10 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.8)] overflow-hidden z-50 flex flex-col gap-8"
          >
            {/* Logo en Grande dentro del menú */}
            <motion.div variants={itemVariants} className="flex justify-center pb-6 border-b border-white/10">
              <img src="/images/logo.png" alt="Logo FT Nutrition" className="h-28 sm:h-36 w-auto object-contain drop-shadow-2xl opacity-90" />
            </motion.div>

            {/* Enlaces de navegación */}
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <motion.div key={link.href} variants={itemVariants}>
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between px-6 py-4 rounded-2xl text-lg sm:text-xl font-bold transition-all ${
                        isActive 
                          ? 'bg-primary/10 text-primary border border-primary/20' 
                          : 'text-white/80 hover:bg-white/5 hover:text-white border border-transparent'
                      }`}
                    >
                      {link.label}
                      {isActive && <div className="w-2.5 h-2.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(220,38,38,0.8)]" />}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Pie del menú / Preparación para WhatsApp */}
            <motion.div variants={itemVariants} className="pt-4 border-t border-white/10 flex flex-col gap-4 text-center">
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase">¿Listo para empezar?</p>
              <button 
                onClick={() => setIsOpen(false)} 
                className="w-full bg-primary/20 text-primary py-4 rounded-xl font-bold text-lg hover:bg-primary hover:text-white transition-all border border-primary/30 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]"
              >
                Contactar por WhatsApp
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
