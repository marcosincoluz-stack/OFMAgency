'use client';

import { ProjectCard } from '@/components/elements/project-card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ProjectFrontmatter } from '@/lib/types';

interface ProjectsGridProps {
  projects: ProjectFrontmatter[];
}

const categories = [
  { value: 'all', label: 'All' },
  { value: 'logo-design', label: 'Logo Design' },
  { value: 'brand-identity', label: 'Brand Identity' },
  { value: 'icon-design', label: 'Icon Design' },
];

export const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  return (
    <div className="hero-padding container flex flex-col gap-10">
      <h1 className="text-4xl">Projects</h1>

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
