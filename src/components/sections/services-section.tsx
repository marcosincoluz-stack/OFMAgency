import { ServiceCard } from '@/components/sections/service-card';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import type { ServiceFrontmatter } from '@/lib/types';

interface ServicesProps {
  services: ServiceFrontmatter[];
  locale?: Locale;
}

export const Services = ({ services, locale = 'es' }: ServicesProps) => {
  const dict = getDictionary(locale);

  return (
    <section className="hero-padding container space-y-18 md:space-y-20 lg:space-y-26">
      <div className="grid gap-10 md:grid-cols-2">
        <h1 className="text-4xl">{dict.servicesPage.heading}</h1>
        <p className="text-muted-foreground text-lg">
          {dict.servicesPage.description}
        </p>
      </div>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            slug={service.slug}
            title={service.title}
            image={service.image}
            shortDescription={service.shortDescription}
            tags={service.tags}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
};
