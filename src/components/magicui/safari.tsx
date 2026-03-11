import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface SafariProps {
  className?: string;
  url: string;
  imageSrc?: string;
  imageClassName?: string;
  viewportClassName?: string;
  children?: ReactNode;
}

export function Safari({
  className,
  url,
  imageSrc,
  imageClassName,
  viewportClassName,
  children,
}: SafariProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full overflow-hidden rounded-2xl border border-white/10 bg-zinc-950',
        className,
      )}
      aria-label={`Browser preview ${url}`}
    >
      <div className="flex items-center gap-2 border-b border-white/10 bg-zinc-900/90 px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
        <span className="h-2.5 w-2.5 rounded-full bg-zinc-600" />
        <div className="ml-3 flex-1 rounded-md border border-white/10 bg-zinc-800 px-3 py-1 text-center text-xs text-zinc-300">
          {url}
        </div>
      </div>

      <div className={cn('relative aspect-[16/10] w-full bg-zinc-950', viewportClassName)}>
        {imageSrc ? (
          <img
            src={imageSrc}
            alt=""
            aria-hidden="true"
            className={cn('size-full object-cover', imageClassName)}
            loading="lazy"
            decoding="async"
          />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
