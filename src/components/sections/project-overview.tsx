import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import type { ProjectFrontmatter } from '@/lib/types';

interface ProjectOverviewProps {
  title?: string;
  description?: string;
  project: ProjectFrontmatter;
  locale?: Locale;
}

const getCategoryName = (category: string, locale: Locale) => {
  const categoryMap: Record<Locale, Record<string, string>> = {
    es: {
      'logo-design': 'Estrategia de Marca',
      'brand-identity': 'Identidad de Marca',
      'icon-design': 'Sistemas Visuales',
    },
    en: {
      'logo-design': 'Brand Strategy',
      'brand-identity': 'Brand Identity',
      'icon-design': 'Visual Systems',
    },
  };
  return categoryMap[locale][category] || category;
};

export function ProjectOverview({
  title,
  description,
  project,
  locale = 'es',
}: ProjectOverviewProps) {
  const dict = getDictionary(locale);
  const labels = dict.serviceDetail.overviewLabels;

  return (
    <section className="section-padding container">
      <div className="grid gap-10 md:grid-cols-2">
        <h2 className="text-4xl">{title ?? dict.serviceDetail.projectOverview}</h2>
        {description && (
          <p className="text-muted-foreground text-lg">{description}</p>
        )}
      </div>

      <div className="mt-10 grid justify-between gap-6 sm:mt-20 sm:grid-cols-4 lg:mt-26 xl:mt-36">
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-lg">{labels.client}</p>
          <p className="text-lg">{project.name}</p>
        </div>

        {project.date && (
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-lg">{labels.date}</p>
            <p className="text-lg">{project.date}</p>
          </div>
        )}

        {project.industry && (
          <div className="flex flex-col gap-2">
            <p className="text-muted-foreground text-lg">{labels.industry}</p>
            <p className="text-lg">{project.industry}</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground text-lg">{labels.services}</p>
          <p className="text-lg">{getCategoryName(project.category, locale)}</p>
        </div>
      </div>
    </section>
  );
}
