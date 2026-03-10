'use client';

import { ProjectCard } from '@/components/elements/project-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import type { ProjectFrontmatter } from '@/lib/types';

interface ProjectsGridProps {
  projects: ProjectFrontmatter[];
  locale?: Locale;
}

export const ProjectsGrid = ({ projects, locale = 'es' }: ProjectsGridProps) => {
  const dict = getDictionary(locale);
  const categories = [
    { value: 'all', label: dict.projectsPage.categories.all },
    {
      value: 'logo-design',
      label: dict.projectsPage.categories['logo-design'],
    },
    {
      value: 'brand-identity',
      label: dict.projectsPage.categories['brand-identity'],
    },
    {
      value: 'icon-design',
      label: dict.projectsPage.categories['icon-design'],
    },
  ] as const;

  return (
    <div className="hero-padding container flex flex-col gap-10">
      <h1 className="text-4xl">{dict.projectsPage.heading}</h1>

      <Tabs defaultValue="all" className="w-full">
        <ScrollArea className="pb-2" orientation="horizontal">
          <TabsList>
            {categories.map((category) => (
              <TabsTrigger key={category.value} value={category.value}>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>

        {categories.map((category) => {
          const filteredProjects =
            category.value === 'all'
              ? projects
              : projects.filter((project) => project.category === category.value);

          return (
            <TabsContent key={category.value} value={category.value}>
              <div className="grid gap-x-6 gap-y-12 pt-12 lg:min-h-[966px] lg:grid-cols-3">
                {filteredProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    locale={locale}
                    className="h-[290px]"
                  />
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
};
