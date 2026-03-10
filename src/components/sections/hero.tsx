import { AnimatedBackground } from '@/components/elements/animated-background';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { ProjectFrontmatter } from '@/lib/types';
import { cn } from '@/lib/utils';
import { ProjectCard } from '../elements/project-card';

interface HeroProps {
  projects: ProjectFrontmatter[];
}

export function Hero({ projects }: HeroProps) {
  const heroProjects = projects.map((project, index) => {
    if (index !== 0 || project.images.length === 0) return project;

    return {
      ...project,
      images: [
        { ...project.images[0], src: '/images/homepage/hero/new1.webp' },
        ...project.images.slice(1),
      ],
    };
  });

  const heroImageMoodClass =
    '[&_img]:saturate-[.55] [&_img]:brightness-[.78] [&_img]:contrast-110';

  return (
    <div className="section-padding pt-0!">
      <section
        className={cn(
          'max relative m-5 mb-0! flex min-h-[min(100dvh,702px)] flex-col items-center justify-center overflow-hidden p-5 md:m-6 md:min-h-[min(100dvh,1032px)] md:p-6',
          'bg-foreground text-background',
        )}
      >
        {/* Background Pattern */}
        <AnimatedBackground
          className="absolute inset-0 h-full w-full object-cover opacity-50 dark:opacity-100 dark:invert"
          projectId="0LAbEmh570lz56FzSfFp"
        />

        {/* Main Content */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-center py-10 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-9xl">We are Velour®</h1>
        </div>

        {/* Project Cards - Desktop Grid (1920px+) */}
        <div className="hidden gap-6 p-6 [@media(min-width:1920px)]:grid [@media(min-width:1920px)]:grid-cols-4">
          {heroProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              showName={false}
              className={cn('h-[290px] w-[438px]', heroImageMoodClass)}
            />
          ))}
        </div>

        {/* Project Cards - Carousel (<1920px) */}
        <Carousel
          opts={{
            align: 'start',
          }}
          className="flex w-full cursor-grab justify-center [@media(min-width:1920px)]:hidden"
        >
          <CarouselContent className="">
            {heroProjects.map((project) => (
              <CarouselItem
                key={project.id}
                className="basis-[1/4] pl-5 first:pl-0 md:pl-6"
              >
                <ProjectCard
                  project={project}
                  showName={false}
                  className={cn(
                    'h-[292px] w-[397px] md:h-[290px] md:w-[438px]',
                    heroImageMoodClass,
                  )}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
    </div>
  );
}
