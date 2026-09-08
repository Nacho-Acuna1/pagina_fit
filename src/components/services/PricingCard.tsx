'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import type { PricingPlan } from '@/lib/constants';

interface PricingCardProps {
  plan: PricingPlan;
  index: number;
}

export function PricingCard({ plan, index }: PricingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: 'easeOut' }}
      className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 transition-colors h-full ${
        plan.highlighted
          ? 'border-white/80 bg-white/5 scale-[1.05] shadow-[0_0_40px_rgba(255,255,255,0.15)] ring-1 ring-white/30 z-10'
          : 'border-neutral/30 bg-dark-card hover:border-neutral/60'
      }`}
    >
      {/* Badge (Fire Emoji) */}
      {plan.badge && (
        <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-4xl drop-shadow-[0_0_20px_rgba(220,38,38,0.8)] animate-bounce z-20">
          {plan.badge}
        </span>
      )}

      {/* Animated Edge Shine (only on borders) */}
      {plan.highlighted && (
        <div 
          className="absolute inset-0 pointer-events-none rounded-2xl z-20"
          style={{ 
            padding: '2px', 
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude'
          }}
        >
          <motion.div
            animate={{ x: ['-200%', '200%'] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 5, ease: 'easeInOut' }}
            className="w-full h-full bg-gradient-to-r from-transparent via-white to-transparent skew-x-[30deg] opacity-90"
          />
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-text mb-2">{plan.name}</h3>
        <p className="text-text-muted text-sm">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="mb-6">
        <span className="text-3xl sm:text-4xl font-bold text-text">{plan.price}</span>
        {plan.duration && (
          <span className="text-text-muted text-sm ml-2">/ {plan.duration}</span>
        )}
      </div>

      {/* Features */}
      <ul className="space-y-3 mb-8 flex-1">
        {plan.features.map((feature) => (
          <li key={feature} className="flex items-start gap-3 text-sm">
            <span className={`mt-0.5 shrink-0 ${plan.highlighted ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]' : 'text-primary'}`}>
              ✓
            </span>
            <span className="text-text-muted">{feature}</span>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link
        href="#contacto"
        className={`inline-flex items-center justify-center min-h-12 w-full rounded-lg font-bold transition-all active:scale-95 ${
          plan.highlighted
            ? 'bg-white hover:bg-gray-200 text-dark shadow-[0_0_20px_rgba(255,255,255,0.4)]'
            : 'bg-neutral/40 hover:bg-neutral/60 text-text'
        }`}
      >
        Elegir Plan
      </Link>
    </motion.div>
  );
}
