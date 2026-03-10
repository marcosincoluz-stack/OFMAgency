import { ServiceCard } from '@/components/sections/service-card';
import type { ServiceFrontmatter } from '@/lib/types';

interface ServicesProps {
  services: ServiceFrontmatter[];
}

export const Services = ({ services }: ServicesProps) => {
  return (
    <section className="hero-padding container space-y-18 md:space-y-20 lg:space-y-26">
      <div className="grid gap-10 md:grid-cols-2">
        <h1 className="text-4xl">Services</h1>
        <p className="text-muted-foreground text-lg">
          At Hive, we focus on building strong visual identities that make
          brands instantly recognizable. From the first sketch to a full
          identity system, we design logos and brand assets that are simple,
          memorable, and built to last.
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
          />
        ))}
      </div>
    </section>
  );
};
