import {
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
} from '@/components/icons/logos';
import type { ProjectFrontmatter } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Marquee } from '@/components/magicui/marquee';

// Logo mapping
const logoMap = {
  Logo1,
  Logo2,
  Logo3,
  Logo4,
  Logo5,
  Logo6,
  Logo7,
  Logo8,
  Logo9,
};

interface LogosProps {
  projects: ProjectFrontmatter[];
}

export const Logos = ({ projects }: LogosProps) => {
  const logoProjects = projects;

  const logos = logoProjects.map((project, index) => ({
    component: logoMap[project.logo as keyof typeof logoMap],
    href: project.url,
    label: project.name,
    logoOnly: index % 2 === 0, // Alternate: even indices show logo only, odd show logo + wordmark
  }));
  return (
    <section className="section-padding mask-r-from-40% mask-r-to-100% mask-l-from-40% mask-l-to-100%">
      <Marquee pauseOnHover className="[--duration:20s] [--gap:14rem]">
        {logos.map(({ component: LogoComp, href, label, logoOnly }, idx) => (
          <a
            key={idx}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex items-center opacity-50 transition-opacity duration-300 hover:opacity-100"
          >
            <LogoComp
              className={cn('h-10')}
              wordmarkClassName={logoOnly ? 'hidden' : ''}
            />
          </a>
        ))}
      </Marquee>
    </section>
  );
};
