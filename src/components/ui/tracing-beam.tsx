'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

import { cn } from '@/lib/utils';

export function TracingBeam({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 10%', 'end 60%'],
  });

  const beamHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const beamOpacity = useTransform(scrollYProgress, [0, 0.08, 1], [0, 1, 1]);

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <div className="bg-border/70 absolute top-0 left-4 h-full w-px" />
      <motion.div
        className="absolute top-0 left-4 w-px bg-gradient-to-b from-transparent via-foreground to-transparent"
        style={{ height: beamHeight, opacity: beamOpacity }}
      />
      <div className="relative ml-10">{children}</div>
    </div>
  );
}
