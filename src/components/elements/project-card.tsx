import { useState } from 'react';
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
import { getDictionary } from '@/lib/i18n-dictionary';
import { localizeHref, type Locale } from '@/lib/i18n';
import type { EnrichedProject, ProjectFrontmatter } from '@/lib/types';
import { cn } from '@/lib/utils';

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

interface ProjectCardProps {
  project: EnrichedProject | ProjectFrontmatter;
  showName?: boolean;
  className?: string;
  locale?: Locale;
  href?: string;
  priority?: boolean;
}

export function ProjectCard({
  project,
  showName = true,
  className,
  locale = 'es',
  href,
  priority = false,
}: ProjectCardProps) {
  const [logoImageError, setLogoImageError] = useState(false);
  const {
    images,
    name,
    slug,
    logoImage,
    forceWhiteLogo,
    logoClassName,
    imageClassName,
    hideLogoOverlay,
  } = project;

  const LogoComponent =
    'Logo' in project
      ? project.Logo
      : logoMap[project.logo as keyof typeof logoMap] || Logo1;

  const primaryImage = images[0];
  const hasCustomLogoImage = Boolean(logoImage) && !logoImageError;
  const dict = getDictionary(locale);

  return (
    <a
      href={href ?? localizeHref(locale, `/projects/${slug}`)}
      className={cn('group flex flex-col items-start gap-4')}
    >
      <div className={cn('relative h-full w-full overflow-hidden', className)}>
        <img
          src={primaryImage.src}
          alt={primaryImage.alt}
          className={cn(
            'size-full object-cover transition-all duration-500 ease-out will-change-transform group-hover:scale-110',
            imageClassName,
            !hideLogoOverlay && 'group-hover:blur-[5px]',
          )}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
        />
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/3" />
        {!hideLogoOverlay && (
          <div className="absolute inset-0 flex items-center justify-center transition-all delay-50 duration-1000 ease-out group-hover:scale-80">
            {hasCustomLogoImage ? (
              forceWhiteLogo ? (
                <div
                  aria-label={name || 'Project'}
                  className={cn(
                    'h-24 w-56 max-w-[80%] bg-white',
                    logoClassName,
                  )}
                  style={{
                    WebkitMaskImage: `url(${logoImage})`,
                    maskImage: `url(${logoImage})`,
                    WebkitMaskRepeat: 'no-repeat',
                    maskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'center',
                    maskPosition: 'center',
                    WebkitMaskSize: 'contain',
                    maskSize: 'contain',
                  }}
                />
              ) : (
                <img
                  src={logoImage}
                  alt={name || 'Project'}
                  className={cn('h-24 w-auto object-contain', logoClassName)}
                  loading="lazy"
                  decoding="async"
                  onError={() => setLogoImageError(true)}
                />
              )
            ) : (
              <LogoComponent
                className={cn('flex h-24 text-white', logoClassName)}
                wordmarkClassName="hidden"
                aria-label={dict.common.view}
              />
            )}
          </div>
        )}
      </div>
      {showName && <h3 className="text-lg">{name || 'Project'}</h3>}
    </a>
  );
}
