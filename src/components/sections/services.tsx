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
import { type Locale, localizeHref } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import { cn } from '@/lib/utils';

const services = [
  {
    slug: 'logo-design',
    icon: LogoDesignIcon,
    title: {
      es: 'Estrategia de Ventas por DM',
      en: 'DM Sales Strategy',
    },
    description: {
      es: 'Diseñamos funnels conversacionales y secuencias de oferta que convierten chats en ingresos diarios.',
      en: 'We design conversational funnels and offer sequences that turn chats into daily revenue.',
    },
  },
  {
    slug: 'brand-identity',
    icon: BrandIdentityIcon,
    title: {
      es: 'Operación de Cuenta 24/7',
      en: '24/7 Account Operations',
    },
    description: {
      es: 'Gestionamos bandeja, retención y monetización continua para mantener tracción sin pausas.',
      en: 'We run inbox, retention and monetization workflows continuously to sustain traction.',
    },
  },
  {
    slug: 'rebranding',
    icon: DropletIcon,
    title: {
      es: 'Optimización de Monetización',
      en: 'Monetization Optimization',
    },
    description: {
      es: 'Ajustamos pricing, PPV y promociones para mejorar ARPU y LTV con decisiones basadas en datos.',
      en: 'We optimize pricing, PPV and promotions to improve ARPU and LTV with data-backed decisions.',
    },
  },
  {
    slug: 'icon-design',
    icon: DiamondShapesIcon,
    title: {
      es: 'Captación y Escalado',
      en: 'Acquisition & Scaling',
    },
    description: {
      es: 'Conectamos adquisición, contenido y cierre comercial para crecer de forma predecible y estable.',
      en: 'We align acquisition, content and closing to scale in a predictable, stable way.',
    },
  },
] as const;

export const Services = ({ locale = 'es' }: { locale?: Locale }) => {
  const dict = getDictionary(locale);

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
              <CardTitle className="text-2xl">{service.title[locale]}</CardTitle>
              <CardDescription className="max-w-lg">
                {service.description[locale]}
              </CardDescription>
            </CardContent>
            <CardFooter>
              <a href={localizeHref(locale, `/services/${service.slug}`)}>
                <Button variant="outline" size="lg">
                  {dict.common.learnMore}
                </Button>
              </a>
            </CardFooter>
          </Card>
        );
      })}
    </section>
  );
};
