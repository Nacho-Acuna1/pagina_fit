'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.01.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 2.23-.9 4.45-2.43 6.08-1.48 1.55-3.6 2.47-5.78 2.5-2.06.01-4.14-.52-5.83-1.68-1.57-1.07-2.71-2.61-3.26-4.45-.63-2.14-.38-4.52.74-6.42 1.05-1.78 2.77-3.13 4.74-3.73 1.11-.34 2.28-.48 3.44-.45.02 1.34.01 2.68.01 4.02-.85-.1-1.72-.03-2.54.21-1.07.31-2.02.97-2.62 1.87-.61.9-.84 2.04-.64 3.1.2 1.04.83 1.95 1.69 2.53.86.58 1.92.83 2.94.73 1.25-.12 2.43-.75 3.18-1.72.69-.9.99-2.04.97-3.18.04-4.83.02-9.66.02-14.49zm-5.06 7.42c.02.01.03.01.05.02-.02-.01-.03-.01-.05-.02z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);

const EmailIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
    <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
);

export function Footer() {
  const pathname = usePathname();
  const showCTA = pathname !== '/servicios';

  return (
    <footer className="bg-dark-light border-t border-neutral/30 mt-auto">
      {/* CTA Section - Hidden on /servicios */}
      {showCTA && (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 text-center border-b border-neutral/20">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            ¿Listo para <span className="text-primary">transformarte</span>?
          </h2>
          <p className="text-text-muted mb-8 max-w-md mx-auto">
            Da el primer paso hacia la mejor versión de ti mismo. Tu transformación empieza hoy.
          </p>
          <Link
            href="/servicios"
            className="inline-flex items-center justify-center min-h-12 px-10 bg-primary hover:bg-primary-dark text-white font-bold rounded-full transition-colors active:scale-95 shadow-[0_0_15px_rgba(220,38,38,0.3)]"
          >
            Ver Planes
          </Link>
        </div>
      )}

      {/* Main Footer Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-6">
          
          {/* Social Links */}
          <div className="flex items-center gap-8">
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform" aria-label="Instagram">
              <InstagramIcon />
            </a>
            <a href="#" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform" aria-label="TikTok">
              <TikTokIcon />
            </a>
            <a href="mailto:tu-correo@ejemplo.com" className="text-white/60 hover:text-white transition-colors hover:scale-110 transform" aria-label="Email">
              <EmailIcon />
            </a>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-10 pt-8 border-t border-white/5 text-center">
          <p className="text-xs text-text-muted">
            © {new Date().getFullYear()} FT Nutrition. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
