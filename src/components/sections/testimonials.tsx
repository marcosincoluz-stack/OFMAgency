import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Marquee } from '../magicui/marquee';

const testimonials = [
  {
    quote:
      "Hive gave us a logo that feels bold and confident. It's simple, memorable, and works perfectly across all our platforms",
    author: 'Robert Evans',
    role: 'Founder of BankPro',
    image: '/images/testimonials/robert-evans.webp',
  },
  {
    quote:
      "Hive took our rough ideas and turned them into a clean, timeless logo. The process was smooth, and the result is something we're proud to put everywhere.",
    author: 'Anna Peterson',
    role: 'Founder of Nextdock',
    image: '/images/testimonials/anna-peterson.webp',
  },
  {
    quote:
      'The team really listened to our story and captured it perfectly in the design. Our new identity feels professional and has already impressed our clients',
    author: 'David Kim',
    role: 'Director at Scalar',
    image: '/images/testimonials/david-kim.webp',
  },
  {
    quote:
      'We needed a rebrand that felt fresh but stayed true to our roots. Hive delivered exactly that — modern, simple, and versatile',
    author: 'Sofia Martinez',
    role: 'Marketing Lead at Neobase',
    image: '/images/testimonials/sofia-martinez.webp',
  },
  {
    quote:
      'Professional, fast, and creative. The new logo has already made a difference in how our customers see our brand',
    author: 'James Carter',
    role: 'CEO at Northwind Finance',
    image: '/images/testimonials/james-carter.webp',
  },
];

export const Testimonials = () => {
  return (
    <section className={cn('section-padding space-y-16 md:space-y-18')}>
      <h2 className="container text-4xl">Testimonials</h2>

      <Marquee pauseOnHover className="[--gap:1.25rem] md:[--gap:1.5rem]">
        {testimonials.map((testimonial, index) => (
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
                <p className="">{testimonial.author}</p>
                <p className="text-muted-foreground">{testimonial.role}</p>
              </div>
            </CardFooter>
          </Card>
        ))}
      </Marquee>
    </section>
  );
};
