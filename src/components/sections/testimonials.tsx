import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import { cn } from '@/lib/utils';
import { Marquee } from '../magicui/marquee';

const testimonials = {
  es: [
    {
      quote:
        'En 8 semanas pasamos de responder sin sistema a cerrar ventas diarias por DM con procesos claros y medibles.',
      author: 'Lucia M.',
      role: 'Creadora | Espana',
      image: '/images/testimonials/robert-evans.webp',
    },
    {
      quote:
        'Lo mejor fue recuperar tiempo: el equipo de chatters opera 24/7 y yo solo me enfoco en contenido estrategico.',
      author: 'Valentina R.',
      role: 'Creadora | Mexico',
      image: '/images/testimonials/anna-peterson.webp',
    },
    {
      quote:
        'Con su framework de retencion y PPV dejamos de depender de picos. Ahora tenemos ingresos mucho mas predecibles.',
      author: 'Mia K.',
      role: 'Creadora | USA',
      image: '/images/testimonials/david-kim.webp',
    },
    {
      quote:
        'Venia de una agencia que prometia mucho y no ejecutaba. Aqui hay reportes, foco en conversion y mejora semanal real.',
      author: 'Sofia T.',
      role: 'Creadora | Argentina',
      image: '/images/testimonials/sofia-martinez.webp',
    },
    {
      quote:
        'Su garantia de privacidad nos dio tranquilidad total. Escalamos sin comprometer seguridad ni control de la cuenta.',
      author: 'Noa P.',
      role: 'Creator Manager | LATAM',
      image: '/images/testimonials/james-carter.webp',
    },
  ],
  en: [
    {
      quote:
        'In 8 weeks we moved from random replies to daily DM closes with clear and measurable sales systems.',
      author: 'Lucia M.',
      role: 'Creator | Spain',
      image: '/images/testimonials/robert-evans.webp',
    },
    {
      quote:
        'The biggest win was time freedom: their chatter team runs 24/7 while I focus only on strategic content.',
      author: 'Valentina R.',
      role: 'Creator | Mexico',
      image: '/images/testimonials/anna-peterson.webp',
    },
    {
      quote:
        'With their retention and PPV framework we stopped relying on spikes. Revenue is now far more predictable.',
      author: 'Mia K.',
      role: 'Creator | USA',
      image: '/images/testimonials/david-kim.webp',
    },
    {
      quote:
        'I came from an agency that overpromised and underdelivered. Here you get reporting, conversion focus and weekly execution.',
      author: 'Sofia T.',
      role: 'Creator | Argentina',
      image: '/images/testimonials/sofia-martinez.webp',
    },
    {
      quote:
        'Their privacy-first setup gave us total peace of mind. We scaled without compromising account security or control.',
      author: 'Noa P.',
      role: 'Creator Manager | LATAM',
      image: '/images/testimonials/james-carter.webp',
    },
  ],
} as const;

export const Testimonials = ({ locale = 'es' }: { locale?: Locale }) => {
  const dict = getDictionary(locale);

  return (
    <section className={cn('section-padding space-y-16 md:space-y-18')}>
      <h2 className="container text-4xl">{dict.serviceDetail.testimonials}</h2>

      <Marquee pauseOnHover className="[--gap:1.25rem] md:[--gap:1.5rem]">
        {testimonials[locale].map((testimonial, index) => (
          <Card
            key={index}
            className="group/card w-[310px] justify-between sm:w-[450px]"
          >
            <CardContent className="text-muted-foreground text-lg">
              {testimonial.quote}
            </CardContent>

            <CardFooter className="flex items-center gap-4">
              <img
                src={testimonial.image}
                alt={testimonial.author}
                width={48}
                height={48}
                className="object-cover grayscale transition-all duration-300 group-hover/card:grayscale-0"
                loading="lazy"
                decoding="async"
              />
              <div className="flex flex-col gap-0">
                <p>{testimonial.author}</p>
                <p className="text-muted-foreground">{testimonial.role}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </Marquee>
    </section>
  );
};
