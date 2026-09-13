import { SlideUp } from '@/components/motion/SlideUp';
import { AutoExpand } from '@/components/about/AutoExpand';
import { Timeline } from '@/components/about/Timeline';
import { StatCard } from '@/components/about/StatCard';
import { TRAINER, STATS, TIMELINE_EVENTS } from '@/lib/constants';

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

      {/* Timeline */}
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center mb-16">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Trayectoria
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold">
              Mi <span className="text-primary">Recorrido</span> Profesional
            </h2>
          </SlideUp>

          <Timeline events={TIMELINE_EVENTS} />
        </div>
      </section>

      {/* Certifications / Philosophy */}
      <section className="py-16 sm:py-20 bg-dark-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SlideUp className="text-center max-w-3xl mx-auto">
            <p className="text-primary font-semibold text-sm uppercase tracking-widest mb-3">
              Mi Historia de Vida
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              No se trata solo de <span className="text-primary">entrenar</span>
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Desde los 15, transformé por completo mi físico y mi forma de entender el entrenamiento.
              Pasé de ser un chico que simplemente quería cambiar su cuerpo a descubrir una pasión que terminaría convirtiéndose en mi profesión.
              Durante estos años entrené, experimenté, cometí errores y aprendí qué es lo que realmente funciona. Después de dedicarme a trabajos como cocinero, bachero, entre otros, entendí que quería dedicar mi vida a algo que realmente me apasionara.
              Con esfuerzo y sacrificio, logré reunir el dinero necesario para capacitarme en Nutrición Deportiva y Entrenamiento Personal certificado.
            </p>
            <p className="text-text-muted leading-relaxed">
              Hoy, después de 6 años de entrenamiento, todo lo que aprendí a través de mi propia experiencia, mi formación y el trabajo con otras personas se convirtió en un método para ayudar a otros a transformar su físico. No se trata solamente de entrenar. Se trata de tener un plan, aprender a alimentarte y entender qué estás haciendo para conseguir resultados
            </p>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
