import { FadeIn } from '@/components/motion/FadeIn';
import type { Transformation } from '@/lib/constants';

interface TransformationCardProps {
  transformation: Transformation;
  index: number;
}

export function TransformationCard({ transformation, index }: TransformationCardProps) {
  return (
    <FadeIn delay={index * 0.15} className="group">
      <div className="bg-dark-card rounded-xl overflow-hidden border border-neutral/30 hover:border-primary/50 transition-colors">
        {/* Before/After images */}
        <div className="grid grid-cols-2 gap-px bg-neutral/30">
          <div className="relative aspect-[3/4] bg-neutral/20 group-hover:brightness-110 transition-all">
            <img 
              src={transformation.imageBefore} 
              alt={`Antes de ${transformation.name}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-sm text-white/90 text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
              Antes
            </div>
          </div>
          <div className="relative aspect-[3/4] bg-neutral/20 group-hover:brightness-110 transition-all">
            <img 
              src={transformation.imageAfter} 
              alt={`Después de ${transformation.name}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2 right-2 bg-primary/80 backdrop-blur-sm text-white text-[10px] uppercase font-bold tracking-wider px-2 py-1 rounded">
              Después
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-text">{transformation.name}</h3>
            <span className="text-xs text-primary font-medium bg-primary/10 px-2 py-1 rounded-full">
              {transformation.duration}
            </span>
          </div>
          <p className="text-sm text-text-muted leading-relaxed">
            {transformation.description}
          </p>
        </div>
      </div>
    </FadeIn>
  );
}
