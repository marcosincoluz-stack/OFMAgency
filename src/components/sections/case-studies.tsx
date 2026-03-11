import { CaseStudyCarousel } from '@/components/sections/case-study-carousel';
import type { Locale } from '@/lib/i18n';
import type { ProjectFrontmatter } from '@/lib/types';

interface CaseStudiesProps {
  projects: ProjectFrontmatter[];
  locale?: Locale;
}

export const CaseStudies = ({ projects, locale = 'es' }: CaseStudiesProps) => {
  const caseStudyProjects = projects;
  if (!caseStudyProjects[0] || !caseStudyProjects[1]) return null;

  const firstCarouselProject = {
    ...caseStudyProjects[0],
    images: caseStudyProjects[0].images.filter((image) => {
      const title = image.title ?? '';
      const isRepositionBySrc = image.src.includes('/images/projects/project-1/2.webp');
      const isRepositionByTitle = /reposicionamiento|repositioning/i.test(title);
      const isDmSystemBySrc = image.src.includes('/images/projects/project-1/3.webp');
      const isDmSystemByTitle = /sistema de dms|dm sales system/i.test(title);
      const isResultsBySrc = image.src.includes(
        '/images/projects/project-1/audiencialeal.webp',
      );
      const isResultsByTitle = /resultado|outcome/i.test(title);

      return (
        !isRepositionBySrc &&
        !isRepositionByTitle &&
        !isDmSystemBySrc &&
        !isDmSystemByTitle &&
        !isResultsBySrc &&
        !isResultsByTitle
      );
    }),
  };
  const secondCarouselProject = {
    ...caseStudyProjects[1],
    images: caseStudyProjects[1].images.filter((image) => {
      const title = image.title ?? '';
      const isTopGlobalBySrc = /\/images\/projects\/project-1\/new[-.]one\.webp$/i.test(
        image.src,
      );
      const isTopGlobalByTitle = /top global|global benchmark/i.test(title);
      const isDmSystemBySrc = image.src.includes('/images/projects/project-1/3.webp');
      const isDmSystemByTitle = /sistema de dms|dm sales system/i.test(title);
      const isOperation247BySrc = image.src.includes('/images/projects/project-1/4.webp');
      const isOperation247ByTitle = /operaci[oó]n 24\/7|24\/7 operation/i.test(title);
      return (
        !isTopGlobalBySrc &&
        !isTopGlobalByTitle &&
        !isDmSystemBySrc &&
        !isDmSystemByTitle &&
        !isOperation247BySrc &&
        !isOperation247ByTitle
      );
    }),
  };

  const firstImages = firstCarouselProject.images;
  const secondImages = secondCarouselProject.images;
  const mergedImages = [...firstImages, ...secondImages];

  if (mergedImages.length === 0) return null;

  const secondCarouselStartIndex = firstImages.length;
  const slideOverrides: Record<
    number,
    { useIcon?: boolean; hidePrevItem?: boolean; shiftIphoneLeft?: boolean }
  > = {};

  secondImages.forEach((_, offset) => {
    slideOverrides[secondCarouselStartIndex + offset] = {
      useIcon: true,
      hidePrevItem: true,
      shiftIphoneLeft: true,
    };
  });

  const mergedCarouselProject = {
    ...firstCarouselProject,
    images: mergedImages,
  };

  return (
    <section className="overflow-hidden">
      <CaseStudyCarousel
        project={mergedCarouselProject}
        useIcon={false}
        initialSlide={0}
        locale={locale}
        slideOverrides={slideOverrides}
      />
    </section>
  );
};
