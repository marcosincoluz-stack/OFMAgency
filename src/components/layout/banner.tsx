'use client';

import { X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const Banner = ({ url = 'https://shadcnblocks.com' }: { url?: string }) => {
  return (
    <div className="bg-primary relative">
      <div className="container flex items-center justify-between gap-4 py-3 pr-12">
        <div className="flex flex-1 items-center justify-center gap-3 sm:gap-4">
          <span className="text-primary-foreground text-center text-sm font-medium">
            Purchase this theme on{' '}
            <span className="font-semibold">shadcnblocks.com</span>
          </span>
          <Button size="sm" variant="secondary" asChild>
            <a href={url} target="_blank">
              Get Template
            </a>
          </Button>
        </div>
        <span
          className={cn(
            'absolute top-1/2 right-4 -translate-y-1/2 rounded-sm p-1.5',
            'text-primary-foreground/70',
          )}
          aria-hidden="true"
        >
          <X className="size-3.5" />
        </span>
      </div>
    </div>
  );
};

export default Banner;
