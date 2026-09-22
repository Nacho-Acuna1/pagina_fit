import { SlideUp } from '@/components/motion/SlideUp';
import { AutoExpand } from '@/components/about/AutoExpand';
import { Timeline } from '@/components/about/Timeline';
import { StatCard } from '@/components/about/StatCard';
import { BeforeAfterCompare } from '@/components/about/BeforeAfterCompare';
import { TRAINER, STATS, TIMELINE_EVENTS } from '@/lib/constants';
import Image from 'next/image';

export default function SobreMiPage() {
  return (
    <div className="pb-20">
      {/* AutoExpand Hero Section */}
      <AutoExpand
        src="/videos/sobre-mi.mp4"
        mediaType="video"
        title={TRAINER.name}
      >
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold uppercase mb-6 text-white tracking-tight">
            {TRAINER.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-6 font-light">
            {TRAINER.aboutIntro}
          </p>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto font-light">
            {TRAINER.aboutPhilosophy}
          </p>
        </div>
      </AutoExpand>

      {/* Stats */}
      <section className="py-16 bg-dark-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Mi Transformación — Before/After */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-12">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Mi Transformación
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              De donde <span className="text-primary">empecé</span> a donde estoy
            </h2>
            <p className="text-text-muted max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Más de 6 años de entrenamiento constante. Deslizá la barra para ver el progreso.
            </p>
          </SlideUp>

          <BeforeAfterCompare
            beforeImage="/images/progreso1.jpg"
            afterImage="/images/progreso4.JPG"
            beforeLabel="2019"
            afterLabel="2025"
          />
        </div>
      </section>

      {/* Recorrido Profesional — Timeline con certificados */}
      <section className="py-20 sm:py-28 bg-dark-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Trayectoria
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Mi <span className="text-primary">Recorrido</span> Profesional
            </h2>
            <p className="text-text-muted max-w-xl mx-auto text-sm sm:text-base leading-relaxed">
              Tocá en cada certificación para ver el diploma correspondiente.
            </p>
          </SlideUp>

          <Timeline events={TIMELINE_EVENTS} />
        </div>
      </section>

      {/* Mi Historia de Vida */}
      <section className="py-20 sm:py-28 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            {/* Texto */}
            <SlideUp className="order-2 lg:order-1 text-center lg:text-left">
              <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
                Mi Historia de Vida
              </p>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                No se trata solo de <span className="text-primary">entrenar</span>
              </h2>
              <div className="space-y-4 text-text-muted leading-relaxed text-sm sm:text-base">
                <p>
                  Desde los 15, transformé por completo mi físico y mi forma de entender el entrenamiento.
                  Pasé de ser un chico que simplemente quería cambiar su cuerpo a descubrir una pasión que terminaría convirtiéndose en mi profesión.
                </p>
                <p>
                  Durante estos años entrené, experimenté, cometí errores y aprendí qué es lo que realmente funciona. Después de dedicarme a trabajos como cocinero, bachero, entre otros, entendí que quería dedicar mi vida a algo que realmente me apasionara.
                </p>
                <p>
                  Con esfuerzo y sacrificio, logré reunir el dinero necesario para capacitarme en Nutrición Deportiva y Entrenamiento Personal certificado.
                </p>
                <p>
                  Hoy, después de 6 años de entrenamiento, todo lo que aprendí a través de mi propia experiencia, mi formación y el trabajo con otras personas se convirtió en un método para ayudar a otros a transformar su físico. No se trata solamente de entrenar. Se trata de tener un plan, aprender a alimentarte y entender qué estás haciendo para conseguir resultados.
                </p>
              </div>
            </SlideUp>

            {/* Collage de Imágenes */}
            <SlideUp className="order-1 lg:order-2">
              <div className="relative flex items-center justify-center gap-4 sm:gap-6 w-full max-w-lg mx-auto lg:max-w-none">
                {/* Imagen izquierda (más baja) */}
                <div className="w-1/2 pt-12 sm:pt-16">
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-neutral/20 shadow-2xl">
                    <Image
                      src="/images/progreso2.jpg"
                      alt="Entrenamiento y progreso"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>
                {/* Imagen derecha (más alta) */}
                <div className="w-1/2 pb-12 sm:pb-16">
                  <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-neutral/20 shadow-2xl">
                    <Image
                      src="/images/progreso5.JPG"
                      alt="Estado físico actual"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                </div>
                
                {/* Acento decorativo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-primary/20 rounded-full blur-3xl -z-10" />
              </div>
            </SlideUp>
          </div>
        </div>
      </section>
    </div>
  );
}
