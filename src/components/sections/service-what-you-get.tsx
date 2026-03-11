import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import { cn } from '@/lib/utils';

interface WhatYouGetItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  image?: string;
}

interface ServiceWhatYouGetProps {
  items: WhatYouGetItem[];
  locale?: Locale;
}

export const ServiceWhatYouGet = ({
  items,
  locale = 'es',
}: ServiceWhatYouGetProps) => {
  const dict = getDictionary(locale);

  return (
    <section
      className={cn('section-padding container space-y-16 md:space-y-18')}
    >
      <h2 className="text-4xl">{dict.serviceDetail.whatYouGet}</h2>

      <div className="grid gap-x-6 gap-y-12 lg:grid-cols-3">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col items-start gap-5">
            {item.image && (
              <div className="relative h-[392px] w-full shrink-0 overflow-hidden">
                <img
                  alt={item.title}
                  className="size-full object-cover"
                  src={item.image}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
            )}
            <div className="flex w-full shrink-0 flex-col items-start gap-2">
              <h3 className="text-lg">{item.title || 'Feature'}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
