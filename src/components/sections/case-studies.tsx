import { CaseStudyCarousel } from '@/components/sections/case-study-carousel';
import type { Locale } from '@/lib/i18n';
import type { ProjectFrontmatter } from '@/lib/types';

interface CaseStudiesProps {
  projects: ProjectFrontmatter[];
  locale?: Locale;
}

export const CaseStudies = ({ projects, locale = 'es' }: CaseStudiesProps) => {
  const caseStudyProjects = projects;

  return (
    <section className="overflow-hidden">
      <CaseStudyCarousel
        project={caseStudyProjects[0]}
        useIcon={false}
        locale={locale}
      />
      <CaseStudyCarousel
        project={caseStudyProjects[1]}
        useIcon={true}
        hidePrevItem={true}
        locale={locale}
      />
      <CaseStudyCarousel
        project={caseStudyProjects[2]}
        useIcon={true}
        hidePrevItem={true}
        locale={locale}
      />
    </section>
  );
};
