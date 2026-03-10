import {
  BrandIdentityIcon,
  DiamondShapesIcon,
  DropletIcon,
  LogoDesignIcon,
} from '@/components/icons/service-icons';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const services = [
  {
    slug: 'logo-design',
    icon: LogoDesignIcon,
    title: 'Logo Design',
    description:
      "We create logos that are simple, memorable, and versatile. Each design is crafted to reflect your brand's values and connect with your audience.",
  },
  {
    slug: 'brand-identity',
    icon: BrandIdentityIcon,
    title: 'Brand Identity',
    description:
      'A logo is just the beginning. We build complete brand identity systems — including colors, typography, and style guides — so your brand looks consistent everywhere.',
  },
  {
    slug: 'rebranding',
    icon: DropletIcon,
    title: 'Rebranding',
    description:
      "Is your current logo outdated? We help businesses refresh their look with a modern identity that stays true to their story while appealing to today's audience.",
  },
  {
    slug: 'icon-design',
    icon: DiamondShapesIcon,
    title: 'Icon Design',
    description:
      'We design custom icons and visual marks that work alongside your logo, making your brand easier to recognize across digital platforms, print, and everyday applications.',
  },
];

export const Services = () => {
  return (
    <section
      className={cn(
        'section-padding container',
        'grid gap-5 md:grid-cols-2 md:gap-x-6 md:gap-y-9',
      )}
    >
      {services.map((service, index) => {
        const Icon = service.icon;
        return (
          <Card key={index} className="bg-muted border-none">
            <CardHeader>
              <Icon className="size-9" />
            </CardHeader>

            <CardContent className="space-y-6">
              <CardTitle className="text-2xl">{service.title}</CardTitle>
              <CardDescription className="max-w-lg">
                {service.description}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <a href={`/services/${service.slug}`}>
                <Button variant="outline" size="lg">
                  Learn more
                </Button>
              </a>
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
};
