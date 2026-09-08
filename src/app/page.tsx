import { HeroSection } from '@/components/home/HeroSection';
import { TransformationsGrid } from '@/components/home/TransformationsGrid';
import { TestimonialCard } from '@/components/home/TestimonialCard';
import { SlideUp } from '@/components/motion/SlideUp';
import { HeroCanvas } from '@/components/webgl/HeroCanvas';
import { TESTIMONIALS } from '@/lib/constants';
import { Carousel } from '@/components/ui/Carousel';
import Link from 'next/link';

export default function HomePage() {
  return (
    <>
      {/* Fondo WebGL global fijo para toda la página de inicio */}
      <HeroCanvas />

      <main className="relative z-10">
        <HeroSection />

        <div className="bg-dark/80 backdrop-blur-sm">
          {/* Resultados Section */}
          <section className="py-20 sm:py-32">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SlideUp className="text-center mb-16">
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                  Resultados Reales
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Transformaciones que <span className="text-primary">Inspiran</span>
                </h2>
                <p className="text-text-muted text-base sm:text-lg max-w-2xl mx-auto">
                  Estos son los resultados de aplicar una metodología basada en ciencia, sin excusas y con 100% de compromiso.
                </p>
              </SlideUp>

              <TransformationsGrid />
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 sm:py-32 border-t border-neutral/30">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <SlideUp className="text-center mb-16">
                <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                  Reseñas
                </p>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
                  Lo que dicen mis <span className="text-primary">Alumnos</span>
                </h2>
              </SlideUp>

              <Carousel autoPlayInterval={6000}>
                {TESTIMONIALS.map((testimonial, index) => (
                  <TestimonialCard key={testimonial.name} testimonial={testimonial} index={index} />
                ))}
              </Carousel>

              <SlideUp delay={0.3} className="mt-16 flex justify-center">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 text-center max-w-xl backdrop-blur-md">
                  <h3 className="text-xl font-bold mb-2">¿Eres alumno actual?</h3>
                  <p className="text-white/60 mb-6 text-sm">Tu testimonio es mi mayor motivación y ayuda a que más personas decidan cambiar su vida.</p>
                  <Link 
                    href="#" 
                    className="inline-block bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary-dark transition-colors shadow-[0_0_15px_rgba(220,38,38,0.3)] hover:scale-105"
                  >
                    Dejar mi Reseña
                  </Link>
                </div>
              </SlideUp>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
