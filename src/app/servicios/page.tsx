import { SlideUp } from '@/components/motion/SlideUp';
import { PricingCard } from '@/components/services/PricingCard';
import { PRICING_PLANS } from '@/lib/constants';
import MaskedHeading from '@/components/ui/MaskedHeading';

export default function ServiciosPage() {
  return (
    <div className="pt-24 pb-20">
      {/* Header Customizado */}
      <section className="relative w-full pt-32 pb-32 mb-10 overflow-hidden flex flex-col items-center justify-center min-h-[60vh] sm:min-h-[70vh]">
        {/* Imagen de fondo que se difumina hacia abajo */}
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: "url('/images/portada-servicios.jpg')",
            backgroundSize: 'cover',
            backgroundPosition: 'center 20%',
            opacity: 0.6,
            maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)'
          }}
        />

        {/* Rectángulo Gris Horizontal */}
        <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 h-40 sm:h-56 bg-neutral-900/60 backdrop-blur-md border-y border-white/10 z-10 shadow-2xl" />

        {/* Contenido (Texto animado en el medio) */}
        <div className="relative z-20 w-full max-w-7xl mx-auto px-4 text-center mt-8">
          <SlideUp>
            <p className="text-primary font-bold text-sm sm:text-base uppercase tracking-widest mb-4 drop-shadow-md">
              Planes de Entrenamiento
            </p>
            <div className="relative w-full flex items-center justify-center mb-6">
              <MaskedHeading 
                text="Elige tu plan" 
                src="/images/portada-servicios.jpg" 
                tag="h1" 
                className="text-white text-6xl sm:text-7xl md:text-8xl lg:text-9xl w-full font-black drop-shadow-2xl"
                fillScale={1.25}
                parallax={26}
                reveal="rise"
                trigger="view"
                align="center"
              />
            </div>
            <p className="text-gray-200 text-base sm:text-lg max-w-2xl mx-auto drop-shadow-lg font-medium">
              Cada plan está diseñado para adaptarse a tus objetivos y estilo de vida.
              Sin importar cuál elijas, tendrás mi acompañamiento profesional en cada paso.
            </p>
          </SlideUp>
        </div>
      </section>

      {/* Pricing Grid */}
      <section className="pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
            {PRICING_PLANS.map((plan, index) => (
              <PricingCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
