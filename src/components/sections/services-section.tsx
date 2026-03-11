import { ServiceCard } from '@/components/sections/service-card';
import { Button } from '@/components/ui/button';
import { localizeHref, type Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
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

const contentByLocale = {
  es: {
    kicker: 'Servicios Velour',
    title: 'Operamos tu cuenta como un negocio de alto rendimiento.',
    subtitle:
      'No vendemos humo ni promesas vacias. Construimos una operacion real: captacion, conversion en DMs, retencion y blindaje de privacidad para escalar ingresos de forma sostenible.',
    primaryCta: 'Aplicar para representacion',
    secondaryCta: 'Hablar con el equipo',
    pillarsTitle: 'Que hace Velour exactamente',
    pillars: [
      {
        title: 'Captacion con intencion de compra',
        description:
          'Atraemos trafico cualificado y segmentamos por temperatura para priorizar fans con mayor potencial de gasto.',
        icon: Target,
      },
      {
        title: 'Operacion de DMs 24/7',
        description:
          'Nuestro equipo de chatters ejecuta guiones de venta, seguimiento y cierres diarios sin romper tu tono de marca.',
        icon: MessageCircleMore,
      },
      {
        title: 'Retencion y monetizacion continua',
        description:
          'Optimizamos pricing, upsells y recompra para elevar ARPU, LTV y estabilidad mensual.',
        icon: TrendingUp,
      },
      {
        title: 'Privacidad y proteccion',
        description:
          'Aplicamos geobloqueo, protocolos de seguridad y respuesta DMCA para reducir riesgo operativo.',
        icon: ShieldCheck,
      },
    ],
    systemsTitle: 'Infraestructura operativa',
    systems: [
      { label: 'SOPs de cierre y retencion', icon: Workflow },
      { label: 'Cobertura comercial 24/7', icon: Clock3 },
      { label: 'KPIs semanales y control de rendimiento', icon: TrendingUp },
      { label: 'Protocolos de privacidad y seguridad', icon: ShieldCheck },
    ],
    modulesTitle: 'Modulos de ejecucion',
    modulesDescription:
      'Cada modulo cubre una parte critica del sistema comercial y se integra en una sola operacion.',
  },
  en: {
    kicker: 'Velour Services',
    title: 'We run your account like a high-performance business.',
    subtitle:
      'No hype and no empty promises. We build a real operation: acquisition, DM conversion, retention, and privacy protection to scale revenue sustainably.',
    primaryCta: 'Apply for representation',
    secondaryCta: 'Talk to the team',
    pillarsTitle: 'What Velour actually does',
    pillars: [
      {
        title: 'Acquisition with buying intent',
        description:
          'We attract qualified traffic and segment by intent so your team focuses on fans with higher spending potential.',
        icon: Target,
      },
      {
        title: '24/7 DM operations',
        description:
          'Our chatter team executes sales scripts, follow-up, and daily closes while preserving your brand voice.',
        icon: MessageCircleMore,
      },
      {
        title: 'Retention and continuous monetization',
        description:
          'We optimize pricing, upsells, and repeat purchase to improve ARPU, LTV, and monthly consistency.',
        icon: TrendingUp,
      },
      {
        title: 'Privacy and protection',
        description:
          'We deploy geoblocking, security protocols, and DMCA response workflows to reduce operational risk.',
        icon: ShieldCheck,
      },
    ],
    systemsTitle: 'Operational infrastructure',
    systems: [
      { label: 'Closing and retention SOPs', icon: Workflow },
      { label: '24/7 commercial coverage', icon: Clock3 },
      { label: 'Weekly KPIs and performance control', icon: TrendingUp },
      { label: 'Privacy and security protocols', icon: ShieldCheck },
    ],
    modulesTitle: 'Execution modules',
    modulesDescription:
      'Each module covers a critical part of the commercial system and integrates into one operation.',
  },
} as const;

export const Services = ({ services, locale = 'es' }: ServicesProps) => {
  const dict = getDictionary(locale);
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

      <div className="space-y-3">
        <h2 className="text-3xl md:text-4xl">{copy.modulesTitle}</h2>
        <p className="text-muted-foreground max-w-3xl text-lg">
          {copy.modulesDescription}
        </p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-8 lg:gap-y-12">
        {services.map((service) => (
          <ServiceCard
            key={service.slug}
            slug={service.slug}
            title={service.title}
            image={service.image}
            shortDescription={service.shortDescription}
            tags={service.tags}
            locale={locale}
          />
        ))}
      </div>
    </section>
  );
};
