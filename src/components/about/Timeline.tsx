'use client';

import { motion } from 'motion/react';
import type { TimelineEvent } from '@/lib/constants';

interface TimelineProps {
  events: TimelineEvent[];
}

export function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-neutral/50 sm:-translate-x-px" />

      <div className="space-y-12">
        {events.map((event, index) => (
          <motion.div
            key={event.year}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            className={`relative flex flex-col sm:flex-row items-start gap-6 sm:gap-0 ${
              index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
            }`}
          >
            {/* Dot */}
            <div className="absolute left-4 sm:left-1/2 w-3 h-3 bg-primary rounded-full -translate-x-1.5 mt-1.5 ring-4 ring-dark z-10" />

            {/* Content */}
            <div
              className={`ml-10 sm:ml-0 sm:w-1/2 ${
                index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'
              }`}
            >
              <span className="text-primary font-bold text-sm">{event.year}</span>
              <h3 className="text-lg font-semibold text-text mt-1">{event.title}</h3>
              <p className="text-text-muted text-sm mt-2 leading-relaxed">
                {event.description}
              </p>
            </div>

            {/* Spacer for alternating side */}
            <div className="hidden sm:block sm:w-1/2" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
