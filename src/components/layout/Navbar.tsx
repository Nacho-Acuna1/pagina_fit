'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { StaggeredMenu } from './StaggeredMenu';

export function Navbar() {
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    function handleScroll() {
      const currentScrollY = window.scrollY;

      setIsAtTop(currentScrollY < 10);
      setIsVisible(currentScrollY < lastScrollY.current || currentScrollY < 10);
      lastScrollY.current = currentScrollY;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <nav
        className={`transition-colors duration-300 ${
          isAtTop ? 'bg-transparent' : 'bg-dark/90 backdrop-blur-md border-b border-neutral/50'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-24 sm:h-32 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Inicio"
            >
              <img 
                src="/images/logo.png" 
                alt="Logo FT Nutrition" 
                className="h-20 sm:h-24 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Staggered Menu Component replacing the standard links */}
            <StaggeredMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
