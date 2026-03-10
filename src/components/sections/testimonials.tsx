import { Card, CardContent, CardFooter } from '@/components/ui/card';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import { cn } from '@/lib/utils';
import { Marquee } from '../magicui/marquee';

const testimonials = {
  es: [
    {
      quote:
        'Velour transformo nuestra operacion de DMs y elevamos ingresos en semanas sin perder identidad de marca.',
      author: 'Robert Evans',
      role: 'Founder of BankPro',
      image: '/images/testimonials/robert-evans.webp',
    },
    {
      quote:
        'Pasamos de respuestas improvisadas a un sistema comercial consistente que convierte todos los dias.',
      author: 'Anna Peterson',
      role: 'Founder of Nextdock',
      image: '/images/testimonials/anna-peterson.webp',
    },
    {
      quote:
        'La estructura de ventas por chat y el seguimiento de retencion marcaron un antes y un despues.',
      author: 'David Kim',
      role: 'Director at Scalar',
      image: '/images/testimonials/david-kim.webp',
    },
    {
      quote:
        'Operacion impecable, reportes claros y mejoras continuas. Se nota el enfoque en performance real.',
      author: 'Sofia Martinez',
      role: 'Marketing Lead at Neobase',
      image: '/images/testimonials/sofia-martinez.webp',
    },
    {
      quote:
        'Equipo rapido y preciso. Ahora tenemos crecimiento estable y control sobre la monetizacion.',
      author: 'James Carter',
      role: 'CEO at Northwind Finance',
      image: '/images/testimonials/james-carter.webp',
    },
  ],
  en: [
    {
      quote:
        'Velour transformed our DM operation and we lifted revenue in weeks without losing brand tone.',
      author: 'Robert Evans',
      role: 'Founder of BankPro',
      image: '/images/testimonials/robert-evans.webp',
    },
    {
      quote:
        'We moved from improvised replies to a consistent sales system that converts every day.',
      author: 'Anna Peterson',
      role: 'Founder of Nextdock',
      image: '/images/testimonials/anna-peterson.webp',
    },
    {
      quote:
        'The chat sales framework and retention workflow made a measurable impact quickly.',
      author: 'David Kim',
      role: 'Director at Scalar',
      image: '/images/testimonials/david-kim.webp',
    },
    {
      quote:
        'Flawless execution, clear reporting, and constant iteration focused on performance.',
      author: 'Sofia Martinez',
      role: 'Marketing Lead at Neobase',
      image: '/images/testimonials/sofia-martinez.webp',
    },
    {
      quote:
        'Fast, precise team. We now have stable growth and better monetization control.',
      author: 'James Carter',
      role: 'CEO at Northwind Finance',
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
