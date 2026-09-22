'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StaggeredMenu } from './StaggeredMenu';

export function Navbar() {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    function handleScroll() {
      setIsAtTop(window.scrollY < 10);
    }

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className={`transition-all duration-300 ${isAtTop ? 'bg-transparent' : 'bg-dark/80 backdrop-blur-md'}`}>
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 sm:h-24 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 group"
              aria-label="Inicio"
            >
              <Image 
                src="/images/logo.png" 
                alt="Logo FT Nutrition" 
                width={150}
                height={96}
                priority
                className="h-16 sm:h-20 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
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
