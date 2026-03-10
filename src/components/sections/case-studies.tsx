import { CaseStudyCarousel } from '@/components/sections/case-study-carousel';
import type { ProjectFrontmatter } from '@/lib/types';

interface CaseStudiesProps {
  projects: ProjectFrontmatter[];
}

export const CaseStudies = ({ projects }: CaseStudiesProps) => {
  const caseStudyProjects = projects;

  return (
    <section className="overflow-hidden">
      <CaseStudyCarousel project={caseStudyProjects[0]} useIcon={false} />
      <CaseStudyCarousel
        project={caseStudyProjects[1]}
        useIcon={true}
        hidePrevItem={true}
      />
      <CaseStudyCarousel
        project={caseStudyProjects[2]}
        useIcon={true}
        hidePrevItem={true}
      />
    </section>
  );
};
