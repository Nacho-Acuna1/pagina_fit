import { SlideUp } from '@/components/motion/SlideUp';
import { PricingCard } from '@/components/services/PricingCard';
import { PRICING_PLANS, SITE_CONFIG } from '@/lib/constants';
import MaskedHeading from '@/components/ui/MaskedHeading';
import { ContactForm } from '@/components/services/ContactForm';
import { CheckoutButton } from '@/components/services/CheckoutButton';

export default function ServiciosPage() {
  const mainPlans = PRICING_PLANS.slice(0, 2);
  const customPlan = PRICING_PLANS[2];

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

      {/* Main Pricing Grid (First 2 Plans) */}
      <section className="pb-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-start">
            {mainPlans.map((plan, index) => (
              <PricingCard key={plan.id} plan={plan} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Custom Economic Plan (3rd Plan Isolated) */}
      <section className="pb-20">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <SlideUp delay={0.2}>
            <div className="relative bg-dark-card/50 backdrop-blur-xl border border-neutral/40 rounded-3xl p-8 sm:p-12 overflow-hidden flex flex-col md:flex-row items-center gap-10 md:gap-16 group hover:border-primary/40 transition-colors shadow-2xl">
              
              {/* Background ambient light */}
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
              
              {/* Left Column (Info) */}
              <div className="flex-1 w-full text-center md:text-left z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs sm:text-sm font-bold uppercase tracking-wider mb-6">
                  El más accesible y adaptable
                </div>
                <h3 className="text-3xl sm:text-4xl font-bold text-white mb-4">{customPlan.name}</h3>
                <div className="flex items-baseline justify-center md:justify-start gap-3 mb-6">
                  <span className="text-4xl sm:text-5xl font-black text-white">{customPlan.price}</span>
                  <span className="text-text-muted font-medium uppercase text-sm tracking-wider">{customPlan.duration}</span>
                </div>
                <p className="text-text-muted text-lg mb-8 leading-relaxed max-w-md mx-auto md:mx-0">
                  {customPlan.description}
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
                  <CheckoutButton productId="digital" label="Comprar Ahora" className="bg-primary hover:bg-primary-dark shadow-[0_0_20px_rgba(220,38,38,0.3)]" />
                </div>
              </div>

              {/* Right Column (Features) */}
              <div className="flex-1 w-full relative z-10 bg-dark/40 rounded-2xl p-6 sm:p-8 border border-white/5">
                <ul className="space-y-6">
                  {customPlan.detailedFeatures?.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-4">
                      <svg className="w-6 h-6 text-primary shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      <div className="flex flex-col">
                        <span className="text-white font-bold text-lg mb-1">{feature.title}</span>
                        <span className="text-white/70 font-medium leading-relaxed">{feature.text}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </SlideUp>
        </div>
      </section>

      {/* Formulario de Consultas General */}
      <section className="py-20 bg-dark-card border-t border-neutral/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
