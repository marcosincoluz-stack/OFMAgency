import { Check } from 'lucide-react';

import { Marquee } from '../magicui/marquee';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import { cn } from '@/lib/utils';

const testimonials = {
  es: [
    {
      quote:
        'Antes contestaba como podia y al final del dia no sabia ni que habia vendido. En unas semanas ya teniamos orden y cierres casi cada dia por DM.',
      author: 'Lucia M.',
      username: 'lucia_m',
      role: 'Creadora | Espana',
      image: '/images/testimonials/perfil1.webp',
      proofImage: '/images/testimonials/proof1.webp',
    },
    {
      quote:
        'Para mi lo mejor fue volver a tener tiempo. Ellos llevan los chats todo el dia y yo por fin me centro en grabar sin estar pegada al movil.',
      author: 'Valentina R.',
      username: 'valentina_r',
      role: 'Creadora | Mexico',
      image: '/images/testimonials/perfil2.webp',
      proofImage: '/images/testimonials/proof2.webp',
    },
    {
      quote:
        'Yo vivia de semanas buenas y semanas flojas. Con los cambios en retencion y PPV ahora entra dinero mas estable y ya no voy con esa ansiedad.',
      author: 'Mia K.',
      username: 'mia_k',
      role: 'Creadora | USA',
      image: '/images/testimonials/perfil3.webp',
      proofImage: '/images/testimonials/proof3.webp',
    },
    {
      quote:
        'Venia quemada de otra agencia porque prometian todo y luego nada. Aqui cada semana vemos numeros, que funciono y que se toca. Cero humo.',
      author: 'Sofia T.',
      username: 'sofia_t',
      role: 'Creadora | Argentina',
      image: '/images/testimonials/perfil4.webp',
      proofImage: '/images/testimonials/proof4.webp',
    },
    {
      quote:
        'Mi miedo era que me reconocieran en mi ciudad. Me explicaron el plan de privacidad paso a paso y pude crecer tranquila sin perder el control de mi cuenta.',
      author: 'Noa P.',
      username: 'noa_p',
      role: 'Creator Manager | LATAM',
      image: '/images/testimonials/perfil5.webp',
      proofImage: '/images/testimonials/proof5.webp',
    },
  ],
  en: [
    {
      quote:
        'I used to reply however I could and by night I still did not know what actually sold. A few weeks in, things were organized and we were closing in DMs almost daily.',
      author: 'Lucia M.',
      username: 'lucia_m',
      role: 'Creator | Spain',
      image: '/images/testimonials/perfil1.webp',
      proofImage: '/images/testimonials/proof1.webp',
    },
    {
      quote:
        'The best part for me was getting my time back. They handle chats all day and I can finally focus on filming instead of being glued to my phone.',
      author: 'Valentina R.',
      username: 'valentina_r',
      role: 'Creator | Mexico',
      image: '/images/testimonials/perfil2.webp',
      proofImage: '/images/testimonials/proof2.webp',
    },
    {
      quote:
        'I used to have one good week and two slow ones. After the retention and PPV changes, income became much steadier and the stress dropped a lot.',
      author: 'Mia K.',
      username: 'mia_k',
      role: 'Creator | USA',
      image: '/images/testimonials/perfil3.webp',
      proofImage: '/images/testimonials/proof3.webp',
    },
    {
      quote:
        'I came in burned out from another agency that promised everything and delivered little. Here we review numbers weekly, keep what works, and fix what does not. No fluff.',
      author: 'Sofia T.',
      username: 'sofia_t',
      role: 'Creator | Argentina',
      image: '/images/testimonials/perfil4.webp',
      proofImage: '/images/testimonials/proof4.webp',
    },
    {
      quote:
        'My main fear was getting recognized in my city. They walked me through the privacy setup step by step, and I could scale without losing control of my account.',
      author: 'Noa P.',
      username: 'noa_p',
      role: 'Creator Manager | LATAM',
      image: '/images/testimonials/perfil5.webp',
      proofImage: '/images/testimonials/proof5.webp',
    },
  ],
} as const;

export const Testimonials = ({
  locale = 'es',
  title,
}: {
  locale?: Locale;
  title?: string;
}) => {
  const dict = getDictionary(locale);
  const items = testimonials[locale];

  return (
    <section className={cn('section-padding space-y-16 md:space-y-18')}>
      <h2 className="container text-4xl">
        {title ?? dict.serviceDetail.testimonials}
      </h2>

      <Marquee pauseOnHover className="[--gap:0.75rem] md:[--gap:1.5rem]">
        {items.map((testimonial, index) => (
          <Card
            key={index}
            className="group/card w-[220px] justify-between gap-4 py-5 sm:w-[280px] md:w-[430px] md:gap-8 md:py-10"
          >
            <CardContent className="space-y-3 px-4 sm:px-5 md:space-y-4 md:px-10">
              <div className="space-y-2">
                <div className="relative flex h-40 w-full items-center justify-center sm:h-48 md:h-72">
                  <img
                    src={testimonial.proofImage}
                    alt={locale === 'es' ? 'Prueba enviada por cliente' : 'Client-shared proof'}
                    className="h-full w-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </div>
              <p className="text-muted-foreground text-sm md:text-lg">
                {testimonial.quote}
              </p>
            </CardContent>

            <CardFooter className="flex items-center gap-3 px-4 sm:px-5 md:gap-4 md:px-10">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                width={48}
                height={48}
                className="size-12 shrink-0 rounded-full object-cover"
                loading="lazy"
                decoding="async"
              />
              <div className="flex flex-col gap-0 leading-tight">
                <p className="flex items-center gap-1 text-sm md:text-base">
                  {testimonial.author}
                  <span className="inline-flex size-4 items-center justify-center rounded-full bg-[#1d9bf0]">
                    <Check className="size-2.5 text-white" strokeWidth={3} />
                  </span>
                </p>
                <p className="text-muted-foreground text-xs md:text-sm">{testimonial.role}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </Marquee>
    </section>
  );
};
