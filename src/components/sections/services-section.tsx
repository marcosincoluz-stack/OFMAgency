import { ServiceCard } from '@/components/sections/service-card';
import { Button } from '@/components/ui/button';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { localizeHref, type Locale } from '@/lib/i18n';
import type { ServiceFrontmatter } from '@/lib/types';
import {
  Clock3,
  MessageCircleMore,
  ShieldCheck,
  Target,
  TrendingUp,
  Workflow,
} from 'lucide-react';

interface ServicesProps {
  services: ServiceFrontmatter[];
  locale?: Locale;
}

const serviceCardCopyByLocale = {
  es: {
    'logo-design': {
      title: 'Captacion de trafico',
      description:
        'Traemos audiencia con intencion de compra para que los DMs no esten vacios.',
      tags: ['Traffic', 'Embudo', 'Prospectos calientes'],
    },
    'brand-identity': {
      title: 'Sistema de chatters 24/7',
      description:
        'Gestionamos conversaciones, seguimiento y cierres diarios sin romper tu tono.',
      tags: ['Chatters', 'DM Sales', 'Cierres diarios'],
    },
    rebranding: {
      title: 'Retencion y monetizacion',
      description:
        'Mejoramos pricing, upsells y recompra para estabilizar ingresos cada mes.',
      tags: ['Retencion', 'PPV', 'Ticket medio'],
    },
    'icon-design': {
      title: 'Privacidad y proteccion',
      description:
        'Blindamos operativa con geobloqueo, protocolos de seguridad y soporte DMCA.',
      tags: ['Privacidad', 'Seguridad', 'DMCA'],
    },
  },
  en: {
    'logo-design': {
      title: 'Traffic acquisition',
      description:
        'We bring buyer-intent traffic so your DMs are full of qualified leads.',
      tags: ['Traffic', 'Funnel', 'High-intent leads'],
    },
    'brand-identity': {
      title: '24/7 chatter system',
      description:
        'We handle conversations, follow-up, and daily closes while keeping your voice.',
      tags: ['Chatters', 'DM Sales', 'Daily closes'],
    },
    rebranding: {
      title: 'Retention and monetization',
      description:
        'We optimize pricing, upsells, and repeat purchase to stabilize monthly revenue.',
      tags: ['Retention', 'PPV', 'Average spend'],
    },
    'icon-design': {
      title: 'Privacy and protection',
      description:
        'We protect operations with geoblocking, security workflows, and DMCA support.',
      tags: ['Privacy', 'Security', 'DMCA'],
    },
  },
} as const;

const contentByLocale = {
  es: {
    kicker: 'Servicios Velour',
    title: 'Tu cuenta de OnlyFans puede vender mas sin complicarte.',
    subtitle:
      'Somos una agencia OnlyFans que lleva tu operacion diaria: captacion, chatters 24/7, ventas por DM, retencion y privacidad. Tu te centras en crear contenido; nosotros en que la cuenta facture.',
    primaryCta: 'Aplicar para representacion',
    secondaryCta: 'Hablar con el equipo',
    pillarsTitle: 'Que hacemos por ti en el dia a dia',
    pillars: [
      {
        title: 'Traemos trafico que si compra',
        description:
          'Atraemos audiencia con intencion real y priorizamos fans con mayor potencial de gasto.',
        icon: Target,
      },
      {
        title: 'DMs 24/7 con foco en cierres',
        description:
          'Nuestro equipo de chatters responde, hace seguimiento y cierra ventas todos los dias sin perder tu estilo.',
        icon: MessageCircleMore,
      },
      {
        title: 'Mas recompra y mejor ticket',
        description:
          'Ajustamos pricing, upsells y promos para que cada fan gaste mas y vuelva a comprar.',
        icon: TrendingUp,
      },
      {
        title: 'Privacidad y proteccion real',
        description:
          'Aplicamos geobloqueo, seguridad y respuesta DMCA para que operes con tranquilidad.',
        icon: ShieldCheck,
      },
    ],
    systemsTitle: 'Lo que montamos por detras',
    systems: [
      { label: 'SOPs claros de cierre y retencion', icon: Workflow },
      { label: 'Cobertura comercial 24/7', icon: Clock3 },
      { label: 'KPIs semanales faciles de leer', icon: TrendingUp },
      { label: 'Protocolos de privacidad y seguridad', icon: ShieldCheck },
    ],
    modulesTitle: 'Servicios que puedes activar',
    modulesDescription:
      'Puedes contratar gestion completa o modulos concretos. Todo esta pensado para subir conversion y mantener ingresos estables.',
    timelineTitle: 'Como arrancamos (primeros 30 dias)',
    timelineDescription:
      'Sin vueltas. Este es el plan base del primer mes para ordenar tu cuenta y empezar a escalar.',
    timeline: [
      {
        step: 'Semana 1',
        title: 'Puesta a punto de cuenta y oferta',
        description:
          'Revisamos tu cuenta, definimos el enfoque comercial y dejamos una oferta clara para vender mejor.',
        image: '/images/process/discovery.webp',
        imageAlt: 'Fase de diagnostico del servicio',
      },
      {
        step: 'Semana 2',
        title: 'Activacion de chatters y guiones',
        description:
          'Lanzamos el sistema de DMs con guiones de venta y seguimiento para empezar a cerrar desde ya.',
        image: '/images/process/research.webp',
        imageAlt: 'Fase de activacion de DMs',
      },
      {
        step: 'Semana 3',
        title: 'Ajustes con datos reales',
        description:
          'Optimizamos mensajes, precios y ofertas segun KPIs para subir conversion y ticket medio.',
        image: '/images/process/refinement.webp',
        imageAlt: 'Fase de optimizacion con datos',
      },
      {
        step: 'Semana 4',
        title: 'Escalado y control',
        description:
          'Consolidamos procesos, cobertura 24/7 y privacidad para mantener resultados estables.',
        image: '/images/process/delivery.webp',
        imageAlt: 'Fase de escalado y operacion',
      },
    ],
  },
  en: {
    kicker: 'Velour Services',
    title: 'Your OnlyFans account can sell more without burning you out.',
    subtitle:
      'We are an OnlyFans agency handling your daily operation: acquisition, 24/7 chatters, DM sales, retention, and privacy. You focus on content, we focus on revenue.',
    primaryCta: 'Apply for representation',
    secondaryCta: 'Talk to the team',
    pillarsTitle: 'What we handle for you every day',
    pillars: [
      {
        title: 'Traffic that is ready to buy',
        description:
          'We bring qualified traffic and prioritize fans with higher spending intent.',
        icon: Target,
      },
      {
        title: '24/7 DMs focused on closes',
        description:
          'Our chatter team replies, follows up, and closes daily sales while keeping your brand voice.',
        icon: MessageCircleMore,
      },
      {
        title: 'Higher spend and repeat purchases',
        description:
          'We optimize pricing, upsells, and offers so fans spend more and come back.',
        icon: TrendingUp,
      },
      {
        title: 'Real privacy and protection',
        description:
          'We deploy geoblocking, security workflows, and DMCA response to reduce operational risk.',
        icon: ShieldCheck,
      },
    ],
    systemsTitle: 'What we build behind the scenes',
    systems: [
      { label: 'Clear SOPs for closing and retention', icon: Workflow },
      { label: '24/7 commercial coverage', icon: Clock3 },
      { label: 'Weekly KPIs you can read fast', icon: TrendingUp },
      { label: 'Privacy and security protocols', icon: ShieldCheck },
    ],
    modulesTitle: 'Services you can activate',
    modulesDescription:
      'You can hire full account management or specific modules. Everything is designed to increase conversion and stabilize revenue.',
    timelineTitle: 'How we start (first 30 days)',
    timelineDescription:
      'No fluff. This is the core first-month plan to organize your account and start scaling.',
    timeline: [
      {
        step: 'Week 1',
        title: 'Account setup and offer baseline',
        description:
          'We review your account, define positioning, and lock a clear commercial offer.',
        image: '/images/process/discovery.webp',
        imageAlt: 'Service diagnostics phase',
      },
      {
        step: 'Week 2',
        title: 'Chatters and scripts go live',
        description:
          'We launch DM scripts, follow-up flows, and close routines to generate early wins.',
        image: '/images/process/research.webp',
        imageAlt: 'DM activation phase',
      },
      {
        step: 'Week 3',
        title: 'Optimization with real data',
        description:
          'We adjust messaging, pricing, and offers using KPIs to increase conversion and average spend.',
        image: '/images/process/refinement.webp',
        imageAlt: 'Data-driven optimization phase',
      },
      {
        step: 'Week 4',
        title: 'Scaling and control',
        description:
          'We consolidate SOPs, 24/7 coverage, and privacy so performance stays consistent.',
        image: '/images/process/delivery.webp',
        imageAlt: 'Scaling and operations phase',
      },
    ],
  },
} as const;

export const Services = ({ services, locale = 'es' }: ServicesProps) => {
  const copy = contentByLocale[locale];

  return (
    <section className="hero-padding container space-y-16 md:space-y-20 lg:space-y-24">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="space-y-6 lg:col-span-8">
          <p className="text-muted-foreground text-sm tracking-[0.18em] uppercase">
            {copy.kicker}
          </p>
          <h1 className="text-4xl leading-tight md:text-5xl">{copy.title}</h1>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            {copy.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a href={localizeHref(locale, '/contact')}>{copy.primaryCta}</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={localizeHref(locale, '/contact')}>{copy.secondaryCta}</a>
            </Button>
          </div>
        </div>
        <div className="bg-muted/35 grid gap-3 rounded-2xl border p-5 lg:col-span-4">
          <h2 className="text-lg font-semibold">{copy.systemsTitle}</h2>
          <ul className="space-y-3">
            {copy.systems.map((item) => {
              const Icon = item.icon;
              return (
                <li key={item.label} className="flex items-center gap-3">
                  <Icon className="text-muted-foreground size-4.5" />
                  <span className="text-sm">{item.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-3xl md:text-4xl">{copy.pillarsTitle}</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {copy.pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="bg-muted/30 space-y-3 rounded-2xl border p-5"
              >
                <div className="flex items-center gap-2">
                  <Icon className="text-muted-foreground size-5" />
                  <h3 className="text-lg font-semibold">{pillar.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {pillar.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <h2 className="text-3xl md:text-4xl">{copy.timelineTitle}</h2>
          <p className="text-muted-foreground max-w-3xl text-lg leading-relaxed">
            {copy.timelineDescription}
          </p>
        </div>
        <div className="bg-muted/15 rounded-3xl border p-4 md:p-6">
          <TracingBeam className="px-1 md:px-3">
            <div className="mx-auto max-w-2xl pt-2 antialiased">
              {copy.timeline.map((item) => (
                <article
                  key={item.title}
                  className="relative mb-12 last:mb-0"
                >
                  <span className="absolute -left-[2.55rem] top-1.5 flex size-4 items-center justify-center rounded-full border border-border bg-background">
                    <span className="bg-foreground/90 size-2 rounded-full" />
                  </span>

                  <h3 className="bg-foreground text-background mb-4 inline-flex w-fit rounded-full px-4 py-1 text-xs tracking-[0.14em] uppercase">
                    {item.step}
                  </h3>

                  <p className="mb-3 text-xl leading-tight md:text-2xl">
                    {item.title}
                  </p>

                  <div className="text-muted-foreground text-base leading-relaxed">
                    <p>{item.description}</p>
                  </div>
                </article>
              ))}
            </div>
          </TracingBeam>
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl">{copy.modulesTitle}</h2>
        <p className="text-muted-foreground max-w-3xl text-lg">
          {copy.modulesDescription}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
        {services.map((service) => {
          const cardCopy =
            serviceCardCopyByLocale[locale][
              service.slug as keyof (typeof serviceCardCopyByLocale)[typeof locale]
            ];

          return (
            <ServiceCard
              key={service.slug}
              slug={service.slug}
              title={cardCopy?.title ?? service.title}
              image={service.image}
              shortDescription={cardCopy?.description ?? service.shortDescription}
              tags={cardCopy?.tags ?? service.tags}
              locale={locale}
            />
          );
        })}
      </div>
    </section>
  );
};
