import { ProjectCard } from '@/components/elements/project-card';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import type { ProjectFrontmatter } from '@/lib/types';

interface ServiceFeaturedWorkProps {
  items: ProjectFrontmatter[];
  locale?: Locale;
}

export const ServiceFeaturedWork = ({
  items,
  locale = 'es',
}: ServiceFeaturedWorkProps) => {
  if (items.length === 0) {
    return null;
  }

  const dict = getDictionary(locale);

  return (
    <section className="section-padding container space-y-16 md:space-y-18">
      <h2 className="text-4xl">{dict.serviceDetail.featuredWork}</h2>

      <div className="grid gap-x-6 gap-y-12 lg:grid-cols-3">
        {items.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            locale={locale}
            className="h-[290px]"
          />
        ))}
      </div>
    </section>
  );
};
