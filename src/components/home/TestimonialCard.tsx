import { FadeIn } from '@/components/motion/FadeIn';
import type { Testimonial } from '@/lib/constants';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index: number;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-lg transition-colors ${
            i < rating 
              ? 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.6)]' 
              : 'text-neutral/40'
          }`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function TestimonialCard({ testimonial, index }: TestimonialCardProps) {
  return (
    <FadeIn delay={index * 0.15}>
      <div className="bg-dark-card rounded-xl p-6 border border-neutral/30 hover:border-primary/30 transition-colors h-full flex flex-col">
        <StarRating rating={testimonial.rating} />

        <blockquote className="mt-4 flex-1">
          <p className="text-text-muted text-sm leading-relaxed italic">
            &ldquo;{testimonial.text}&rdquo;
          </p>
        </blockquote>

        <div className="mt-5 flex items-center gap-3">
          {/* Avatar */}
          {testimonial.avatar ? (
            <img 
              src={testimonial.avatar} 
              alt={`Avatar de ${testimonial.name}`} 
              className="w-10 h-10 rounded-full object-cover shrink-0" 
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm shrink-0">
              {testimonial.name.charAt(0)}
            </div>
          )}
          <p className="text-sm font-medium text-text">{testimonial.name}</p>
        </div>
      </div>
    </FadeIn>
  );
}
