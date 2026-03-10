'use client';

import { ArrowLeft, ArrowRight } from 'lucide-react';
import React from 'react';

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
import { Button } from '@/components/ui/button';
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import { cn } from '@/lib/utils';
import type { ProjectFrontmatter } from '@/lib/types';

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

export function CaseStudyCarousel({
  project,
  useIcon,
  hidePrevItem,
  locale = 'es',
}: {
  project: ProjectFrontmatter;
  useIcon: boolean;
  hidePrevItem?: boolean;
  locale?: Locale;
}) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [isMoving, setIsMoving] = React.useState(false);
  const dict = getDictionary(locale);

  const ProjectLogo = logoMap[project.logo as keyof typeof logoMap] || Logo1;

  const scrollPrev = () => api?.scrollPrev();
  const scrollNext = () => api?.scrollNext();
  const scrollTo = (index: number) => api?.scrollTo(index);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    const onScroll = () => {
      setIsMoving(true);
    };

    const onSettle = () => {
      setIsMoving(false);
    };

    onSelect();
    api.on('select', onSelect);
    api.on('scroll', onScroll);
    api.on('settle', onSettle);

    return () => {
      api.off('select', onSelect);
      api.off('scroll', onScroll);
      api.off('settle', onSettle);
    };
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      opts={{
        align: 'center',
        loop: true,
      }}
      className="section-padding w-full select-none"
    >
      <CarouselContent
        className={cn('relative ml-0! cursor-grab', isMoving ? 'z-10' : '')}
      >
        {project.images.map((image, index) => {
          const nextIndex = (current + 1) % project.images.length;
          const prevIndex =
            (current - 1 + project.images.length) % project.images.length;
          const isReversed = index === nextIndex;
          const slideTitle = image.title || project.title;
          const slideDescription = image.description || project.description;
          const isNoCropImage = image.src.includes('new.one.webp');

          return (
            <CarouselItem
              key={index}
              className="3xl:basis-[80%] 5xl:basis-[65%] 4xl:basis-[78%] justify-start pl-0! 2xl:basis-[86%]"
            >
              <div
                className={cn(
                  'container flex flex-col gap-16 transition-all duration-300',
                  isReversed ? 'md:flex-row-reverse' : 'md:flex-row',
                  prevIndex === index && hidePrevItem ? '2xl:opacity-0' : '',
                )}
              >
                <div className="flex-1">
                  <div className="space-y-10 sm:max-w-md">
                    <h2 className="text-4xl leading-tight">{slideTitle}</h2>
                    <p className="text-muted-foreground leading-relaxed">
                      {slideDescription}
                    </p>
                  </div>
                </div>
                <div className="relative aspect-square h-[335px] flex-1 overflow-hidden md:h-[500px] 2xl:h-[608px]">
                  {isNoCropImage && (
                    <img
                      src={image.src}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 size-full scale-110 object-cover blur-2xl opacity-45"
                      sizes="(max-width: 1024px) 100vw, 608px"
                    />
                  )}
                  <img
                    src={image.src}
                    alt={image.alt}
                    className={cn(
                      'relative z-10 size-full',
                      isNoCropImage ? 'object-contain' : 'object-cover',
                    )}
                    sizes="(max-width: 1024px) 100vw, 608px"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    {useIcon ? (
                      <ProjectLogo
                        className="flex h-24 text-white"
                        wordmarkClassName="hidden"
                      />
                    ) : (
                      <h3 className="font-instrument-serif text-7xl text-white md:text-8xl 2xl:text-9xl">
                        {project.name}
                      </h3>
                    )}
                  </div>
                </div>
              </div>
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <div className="relative container flex translate-y-6 items-center gap-12 md:-translate-y-full">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={scrollPrev}
            aria-label={dict.common.previousSlide}
          >
            <ArrowLeft className="size-4" />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full"
            onClick={scrollNext}
            aria-label={dict.common.nextSlide}
          >
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          {project.images.map((_, idx) => (
            <button
              key={idx}
              onClick={() => scrollTo(idx)}
              aria-label={`${dict.common.goToSlide} ${idx + 1}`}
              className={cn(
                'relative cursor-pointer after:absolute after:-inset-2 after:content-[""]',
                'h-[6px] w-8 rounded-full transition-all',
                idx === current
                  ? 'bg-foreground'
                  : 'bg-muted hover:bg-muted-foreground/50',
              )}
            />
          ))}
        </div>
      </div>
    </Carousel>
  );
}
