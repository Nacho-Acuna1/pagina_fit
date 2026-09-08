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
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold mb-6 text-white tracking-tight">
            {TRAINER.title}
          </h2>
          <p className="text-lg sm:text-xl text-white/90 leading-relaxed mb-6 font-medium">
            {TRAINER.aboutIntro}
          </p>
          <p className="text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto">
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
              Mi Filosofía
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              No se trata solo de <span className="text-primary">entrenar</span>
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Creo firmemente que el cambio físico es solo la punta del iceberg. 
              Mi enfoque integra disciplina, mentalidad, nutrición y descanso para 
              crear una transformación que perdure en el tiempo.
            </p>
            <p className="text-text-muted leading-relaxed">
              Cada persona es un mundo diferente, y por eso cada plan que diseño 
              es único. No creo en las soluciones genéricas — creo en entender a 
              cada alumno y crear un camino que funcione para su vida real.
            </p>
          </SlideUp>
        </div>
      </section>
    </div>
  );
}
