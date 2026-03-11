import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface IphoneProps {
  className?: string;
  children?: ReactNode;
}

export function Iphone({ className, children }: IphoneProps) {
  return (
    <div
      className={cn(
        'relative mx-auto aspect-[300/620] w-[300px] rounded-[3rem] bg-black p-[12px]',
        className,
      )}
      aria-hidden="true"
    >
      <div className="absolute left-1/2 top-[12px] h-[24px] w-[140px] -translate-x-1/2 rounded-b-2xl bg-black" />
      <div className="absolute -left-[2px] top-[130px] h-[52px] w-[3px] rounded-l-lg bg-zinc-700/80" />
      <div className="absolute -left-[2px] top-[194px] h-[52px] w-[3px] rounded-l-lg bg-zinc-700/80" />
      <div className="absolute -right-[2px] top-[166px] h-[78px] w-[3px] rounded-r-lg bg-zinc-700/80" />

      <div className="relative h-full w-full overflow-hidden rounded-[2.35rem] border border-white/10 bg-zinc-950">
        {children}
      </div>
    </div>
  );
}
