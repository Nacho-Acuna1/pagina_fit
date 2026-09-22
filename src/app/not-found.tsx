import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="absolute inset-0 -z-10 bg-dark pointer-events-none" />
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

      <h1 className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 drop-shadow-2xl mb-4">
        404
      </h1>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 uppercase tracking-widest">
        Serie <span className="text-primary">Fallida</span>
      </h2>
      
      <p className="text-text-muted text-lg max-w-md mx-auto mb-10 leading-relaxed">
        Parece que te desviaste de tu rutina. La página que estás buscando no existe o fue movida a otra sección.
      </p>

      <Link 
        href="/"
        className="inline-flex items-center justify-center px-8 py-4 bg-primary hover:bg-primary-dark text-white font-bold rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(220,38,38,0.3)] hover:shadow-[0_0_30px_rgba(220,38,38,0.5)]"
      >
        Volver al Inicio
      </Link>
    </div>
  );
}
