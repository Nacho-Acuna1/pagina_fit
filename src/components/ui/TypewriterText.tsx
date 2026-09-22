'use client';

import { motion } from 'framer-motion';

interface TypewriterTextProps {
  text: string;
  delay?: number;
  className?: string;
  highlightWords?: string[];
}

export function TypewriterText({ text, delay = 0, className = '', highlightWords = [] }: TypewriterTextProps) {
  // Dividimos por palabras para poder destacar algunas
  const words = text.split(' ');

  return (
    <span className={className}>
      {words.map((word, wordIndex) => {
        const isHighlighted = highlightWords.some(hw => word.toLowerCase().includes(hw.toLowerCase()));
        const wordDelay = delay + (wordIndex * 0.2); // Retraso acumulativo por palabra

        return (
          <span key={wordIndex} className="inline-block whitespace-nowrap">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={charIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.1,
                  delay: wordDelay + charIndex * 0.03, // Cada letra de la palabra aparece rápido
                }}
                className={isHighlighted ? 'text-primary' : ''}
              >
                {char}
              </motion.span>
            ))}
            {/* Espacio después de cada palabra excepto la última */}
            {wordIndex < words.length - 1 && <span>&nbsp;</span>}
          </span>
        );
      })}
    </span>
  );
}
