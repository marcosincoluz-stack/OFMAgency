'use client';

import { useCurrentTime } from '@/hooks/use-current-time';
import { CONTACT_EMAIL, NAV_ITEMS, SOCIAL_LINKS } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { AnimatedBackground } from '@/components/elements/animated-background';

const Footer = () => {
  const { currentTime, currentLocation } = useCurrentTime();

  return (
    <div className="section-padding pb-0!">
      <footer
        className={cn(
          'relative m-5 mt-0! overflow-hidden py-8 md:m-6',
          'bg-foreground text-background dark:bg-background dark:text-foreground dark:invert',
        )}
      >
        <AnimatedBackground
          className="absolute inset-0 h-full w-full object-cover"
          projectId="HqjIxarTUlfoLrOE0GeW"
        />

        <div className="bigger-container relative z-10 flex min-h-[min(90dvh,750px)] flex-col justify-between">
          <div className="flex items-center justify-center gap-6 md:justify-between">
            <nav className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="animated-underline"
                >
                  {item.label}
                </a>
              ))}
            </nav>

            <div className="hidden items-center gap-6 md:flex">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="animated-underline"
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>
          {/* uncomment if you just want text over the footer background/video */}
          {/* <span className="font-weight-display font-display text-center text-5xl md:text-6xl lg:text-7xl">
            Hive Studio
          </span> */}

          <div className="space-y-6">
            <div className="flex items-center justify-center gap-6 md:hidden">
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.icon}
                </a>
              ))}
            </div>
            <div className="flex flex-wrap items-center justify-center gap-6 md:justify-between">
              <a
                className="animated-underline"
                href={`mailto:${CONTACT_EMAIL}`}
              >
                {CONTACT_EMAIL}
              </a>
              <span className="">
                {currentTime} · {currentLocation}
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
