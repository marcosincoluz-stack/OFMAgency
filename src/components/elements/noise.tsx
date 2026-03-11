import React from 'react';

import { cn } from '@/lib/utils';

const Noise = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'pointer-events-none absolute inset-0 opacity-[0.02]',
        'bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.85)_1px,transparent_0)] [background-size:3px_3px]',
        className,
      )}
    />
  );
};

export default Noise;
