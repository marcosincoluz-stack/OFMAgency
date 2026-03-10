'use client';

import type { ReactNode } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Bell,
  CreditCard,
  DollarSign,
  FileText,
  Globe,
  MessageCircle,
  Share2,
  Shield,
  Wallet,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { AnimatedList } from '@/components/magicui/animated-list';
import { CommentReplyCard } from '@/components/sections/comment-reply-card';
import { Globe3D } from '@/components/ui/3d-globe';
import type { Locale, Market } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';

type BentoFeature = {
  Icon: LucideIcon;
  name: string;
  description: string;
  href: string;
  cta: string;
  className?: string;
  overlayClassName?: string;
  hideMeta?: boolean;
  hideIcon?: boolean;
  titleIcon?: LucideIcon;
  background: ReactNode;
};

type BentoGridProps = {
  children: ReactNode;
  className?: string;
};

type BentoCardProps = BentoFeature;

type FeatureCopy = {
  name: string;
  description: string;
};

type BentoMarketConfig = {
  showSaveFiles: boolean;
  showNotifications: boolean;
  showIntegrations: boolean;
  showGlobe: boolean;
  saveFiles: FeatureCopy;
  notifications: FeatureCopy;
  integrations: FeatureCopy;
  globe: FeatureCopy;
};

const bentoConfig: Record<Locale, Record<Market, BentoMarketConfig>> = {
  es: {
    es: {
      showSaveFiles: true,
      showNotifications: true,
      showIntegrations: true,
      showGlobe: true,
      saveFiles: {
        name: 'Equipo de Chatters 24/7',
        description: 'Cerramos ventas en tus DMs mientras tu descansas.',
      },
      notifications: {
        name: 'Ingresos Predecibles',
        description: 'Despierta cada mañana viendo como tu cuenta bancaria ha crecido.',
      },
      integrations: {
        name: 'Blindaje de Privacidad',
        description: 'Geobloqueo estricto y eliminacion de contenido filtrado (DMCA) 24/7.',
      },
      globe: {
        name: 'Audiencia Global',
        description: 'Atraemos a los fans que mas pagan a nivel mundial.',
      },
    },
    latam: {
      showSaveFiles: true,
      showNotifications: true,
      showIntegrations: true,
      showGlobe: true,
      saveFiles: {
        name: 'Equipo de Chatters 24/7',
        description: 'Cerramos ventas por DM sin que tengas que estar conectada todo el dia.',
      },
      notifications: {
        name: 'Ingresos Predecibles',
        description: 'Levántate y revisa una facturacion en crecimiento cada mañana.',
      },
      integrations: {
        name: 'Blindaje de Privacidad',
        description: 'Geobloqueo y gestion DMCA 24/7 para proteger tu contenido.',
      },
      globe: {
        name: 'Audiencia Global',
        description: 'Escalamos tu marca en mercados premium de mayor ticket.',
      },
    },
    global: {
      showSaveFiles: true,
      showNotifications: true,
      showIntegrations: true,
      showGlobe: true,
      saveFiles: {
        name: 'Equipo de Chatters 24/7',
        description: 'Cerramos ventas en tus DMs mientras tu descansas.',
      },
      notifications: {
        name: 'Ingresos Predecibles',
        description: 'Despierta cada mañana viendo como tu cuenta bancaria ha crecido.',
      },
      integrations: {
        name: 'Blindaje de Privacidad',
        description: 'Geobloqueo estricto y eliminacion de contenido filtrado (DMCA) 24/7.',
      },
      globe: {
        name: 'Audiencia Global',
        description: 'Atraemos a los fans que mas pagan a nivel mundial.',
      },
    },
  },
  en: {
    es: {
      showSaveFiles: true,
      showNotifications: true,
      showIntegrations: true,
      showGlobe: true,
      saveFiles: {
        name: '24/7 Chatter Team',
        description: 'We close sales in your DMs while you rest.',
      },
      notifications: {
        name: 'Predictable Revenue',
        description: 'Wake up each morning and see your bank balance grow.',
      },
      integrations: {
        name: 'Privacy Shield',
        description: 'Strict geoblocking and 24/7 leaked content removal (DMCA).',
      },
      globe: {
        name: 'Global Audience',
        description: 'We attract the highest-paying fans worldwide.',
      },
    },
    latam: {
      showSaveFiles: true,
      showNotifications: true,
      showIntegrations: true,
      showGlobe: true,
      saveFiles: {
        name: '24/7 Chatter Team',
        description: 'We run DM sales around the clock so you can focus on content.',
      },
      notifications: {
        name: 'Predictable Revenue',
        description: 'Start every day with recurring income and stronger retention.',
      },
      integrations: {
        name: 'Privacy Shield',
        description: 'Geoblocking plus 24/7 DMCA workflows to protect your assets.',
      },
      globe: {
        name: 'Global Audience',
        description: 'We scale your brand into premium international markets.',
      },
    },
    global: {
      showSaveFiles: true,
      showNotifications: true,
      showIntegrations: true,
      showGlobe: true,
      saveFiles: {
        name: '24/7 Chatter Team',
        description: 'We close sales in your DMs while you rest.',
      },
      notifications: {
        name: 'Predictable Revenue',
        description: 'Wake up each morning and see your bank balance grow.',
      },
      integrations: {
        name: 'Privacy Shield',
        description: 'Strict geoblocking and 24/7 leaked content removal (DMCA).',
      },
      globe: {
        name: 'Global Audience',
        description: 'We attract the highest-paying fans worldwide.',
      },
    },
  },
};

const sampleMarkers = [
  { lat: 41.8781, lng: -87.6298, src: 'https://assets.aceternity.com/avatars/1.webp', label: 'Chicago' },
  { lat: 32.7767, lng: -96.797, src: 'https://assets.aceternity.com/avatars/2.webp', label: 'Dallas' },
  { lat: 29.7604, lng: -95.3698, src: 'https://assets.aceternity.com/avatars/3.webp', label: 'Houston' },
  { lat: 39.7392, lng: -104.9903, src: 'https://assets.aceternity.com/avatars/4.webp', label: 'Denver' },
  { lat: 39.0997, lng: -94.5786, src: 'https://assets.aceternity.com/avatars/5.webp', label: 'Kansas City' },
  { lat: 38.627, lng: -90.1994, src: 'https://assets.aceternity.com/avatars/6.webp', label: 'St. Louis' },
  { lat: 44.9778, lng: -93.265, src: 'https://assets.aceternity.com/avatars/7.webp', label: 'Minneapolis' },
  { lat: 40.4168, lng: -3.7038, src: 'https://assets.aceternity.com/avatars/8.webp', label: 'Madrid' },
  { lat: 41.3851, lng: 2.1734, src: 'https://assets.aceternity.com/avatars/9.webp', label: 'Barcelona' },
  { lat: 48.8566, lng: 2.3522, src: 'https://assets.aceternity.com/avatars/10.webp', label: 'Paris' },
  { lat: 52.52, lng: 13.405, src: 'https://assets.aceternity.com/avatars/11.webp', label: 'Berlin' },
  { lat: 41.9028, lng: 12.4964, src: 'https://assets.aceternity.com/avatars/12.webp', label: 'Rome' },
  { lat: 51.5074, lng: -0.1278, src: 'https://assets.aceternity.com/avatars/13.webp', label: 'London' },
  { lat: 55.7558, lng: 37.6173, src: 'https://assets.aceternity.com/avatars/6.webp', label: 'Moscow' },
  { lat: 4.711, lng: -74.0721, src: 'https://assets.aceternity.com/avatars/3.webp', label: 'Bogota' },
  { lat: -23.5505, lng: -46.6333, src: 'https://assets.aceternity.com/avatars/9.webp', label: 'Sao Paulo' },
  { lat: -34.6037, lng: -58.3816, src: 'https://assets.aceternity.com/avatars/12.webp', label: 'Buenos Aires' },
];

export function BentoDemo({ locale = 'es', market = 'global' }: { locale?: Locale; market?: Market }) {
  const dict = getDictionary(locale);
  const localeConfig = bentoConfig[locale] ?? bentoConfig.es;
  const activeConfig = localeConfig[market] ?? localeConfig.global;

  const features: BentoFeature[] = [];

  if (activeConfig.showSaveFiles) {
    features.push({
      Icon: FileText,
      name: activeConfig.saveFiles.name,
      description: activeConfig.saveFiles.description,
      href: '#',
      cta: dict.common.learnMore,
      className: 'col-span-3 lg:col-span-1',
      hideIcon: true,
      titleIcon: MessageCircle,
      background: (
        <div className="absolute inset-0 flex items-start justify-center p-4 pt-2 sm:pt-4">
          <CommentReplyCard
            initialComments={[
              {
                avatarColor: '#e8824b',
                id: 1,
                text: [
                  locale === 'es'
                    ? '¡Envíalo ya! Acabo de dejarte un Tip de $50 💸 Sabes que nunca te digo que no. Hablamos más tarde ❤️'
                    : 'Send it now! I just left you a $50 tip 💸 You know I never say no. Talk later ❤️',
                ],
                time: locale === 'es' ? 'hace 2 minutos' : '2 minutes ago',
                user: 'Mike',
              },
            ]}
          />
        </div>
      ),
    });
  }

  if (activeConfig.showNotifications) {
    features.push({
      Icon: Bell,
      name: activeConfig.notifications.name,
      description: activeConfig.notifications.description,
      href: '#',
      cta: dict.common.learnMore,
      className: 'col-span-3 lg:col-span-2',
      background: (
        <AnimatedListPreview
          locale={locale}
          className="absolute top-4 right-2 h-[300px] w-full scale-[0.82] border-none [mask-image:linear-gradient(to_top,transparent_10%,#000_100%)] transition-all duration-300 ease-out group-hover:scale-[0.94]"
        />
      ),
    });
  }

  if (activeConfig.showIntegrations) {
    features.push({
      Icon: Share2,
      name: activeConfig.integrations.name,
      description: activeConfig.integrations.description,
      href: '#',
      cta: dict.common.learnMore,
      className: 'col-span-3 lg:col-span-2',
      hideIcon: true,
      background: <IntegrationSecurityPreview className="absolute inset-0" />,
    });
  }

  if (activeConfig.showGlobe) {
    features.push({
      Icon: Globe,
      name: activeConfig.globe.name,
      description: activeConfig.globe.description,
      href: '#',
      cta: dict.common.learnMore,
      className: 'col-span-3 lg:col-span-1',
      hideMeta: true,
      overlayClassName:
        'pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-background/5 to-transparent',
      background: (
        <Globe3DPreview
          locale={locale}
          title={activeConfig.globe.name}
          description={activeConfig.globe.description}
          className="absolute inset-0 transition-all duration-300 ease-out group-hover:scale-[1.02]"
        />
      ),
    });
  }

  return (
    <section className="container pt-1 pb-20 md:pt-2">
      <BentoGrid>
        {features.map((feature, idx) => (
          <BentoCard key={idx} {...feature} />
        ))}
      </BentoGrid>
    </section>
  );
}

function BentoGrid({ children, className }: BentoGridProps) {
  return <div className={cn('grid auto-rows-[22rem] grid-cols-1 gap-4 lg:grid-cols-3', className)}>{children}</div>;
}

function BentoCard({
  Icon,
  name,
  description,
  href,
  cta,
  className,
  overlayClassName,
  hideMeta,
  hideIcon,
  titleIcon: TitleIcon,
  background,
}: BentoCardProps) {
  return (
    <article
      className={cn(
        'group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm',
        className,
      )}
    >
      <div className="pointer-events-none absolute inset-0">{background}</div>
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/20',
          overlayClassName,
        )}
      />
      {!hideMeta && (
        <div className="relative z-10 mt-auto">
          {!hideIcon && <Icon className="mb-3 size-5 text-muted-foreground" />}
          <h3 className="flex items-center gap-2 text-lg font-semibold text-foreground">
            {TitleIcon && <TitleIcon className="size-4.5 text-muted-foreground" />}
            <span>{name}</span>
          </h3>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">{description}</p>
          <a href={href} className="mt-4 inline-flex text-sm font-medium text-primary transition-opacity hover:opacity-80">
            {cta}
          </a>
        </div>
      )}
    </article>
  );
}

function AnimatedListPreview({ className, locale = 'es' }: { className?: string; locale?: Locale }) {
  interface Item {
    name: string;
    description: string;
    icon: LucideIcon;
    colorFrom: string;
    colorTo: string;
    time: string;
  }

  let notifications: Item[] =
    locale === 'es'
      ? [
          {
            name: '+$46.00 Propina privada',
            description: 'Chat premium · Fan verificado',
            time: 'hace 38s',
            icon: DollarSign,
            colorFrom: '#33D6FF',
            colorTo: '#00A9FF',
          },
          {
            name: '+$19.99 Renovacion mensual',
            description: 'Suscripcion activa · Cobro automatico',
            time: 'hace 2 min',
            icon: CreditCard,
            colorFrom: '#5AE0FF',
            colorTo: '#21B8FF',
          },
          {
            name: '+$120.00 Compra PPV',
            description: 'Contenido exclusivo · Pago confirmado',
            time: 'hace 5 min',
            icon: Wallet,
            colorFrom: '#36CCFF',
            colorTo: '#0EA5E9',
          },
          {
            name: '+$8.50 Desbloqueo extra',
            description: 'Mensaje directo · Entrega instantanea',
            time: 'hace 7 min',
            icon: DollarSign,
            colorFrom: '#7BE7FF',
            colorTo: '#22B6FF',
          },
        ]
      : [
          {
            name: '+$46.00 Private tip',
            description: 'Premium chat · Verified fan',
            time: '38s ago',
            icon: DollarSign,
            colorFrom: '#33D6FF',
            colorTo: '#00A9FF',
          },
          {
            name: '+$19.99 Monthly renewal',
            description: 'Active subscription · Auto charge',
            time: '2m ago',
            icon: CreditCard,
            colorFrom: '#5AE0FF',
            colorTo: '#21B8FF',
          },
          {
            name: '+$120.00 PPV purchase',
            description: 'Exclusive content · Payment confirmed',
            time: '5m ago',
            icon: Wallet,
            colorFrom: '#36CCFF',
            colorTo: '#0EA5E9',
          },
          {
            name: '+$8.50 Extra unlock',
            description: 'Direct message · Instant delivery',
            time: '7m ago',
            icon: DollarSign,
            colorFrom: '#7BE7FF',
            colorTo: '#22B6FF',
          },
        ];

  notifications = Array.from({ length: 10 }, () => notifications).flat();

  const Notification = ({ name, description, icon: Icon, colorFrom, colorTo, time }: Item) => {
    return (
      <figure
        className={cn(
          'relative mx-auto min-h-fit w-full max-w-[430px] cursor-pointer overflow-hidden rounded-2xl p-[1.05rem]',
          'transition-all duration-200 ease-in-out hover:scale-[103%]',
          'border border-[#d7efff] bg-white [box-shadow:0_0_0_1px_rgba(14,165,233,.04),0_8px_20px_rgba(14,165,233,.12)]',
          'transform-gpu dark:border-cyan-300/25 dark:bg-[#0f1826] dark:[box-shadow:0_-20px_80px_-20px_#22d3ee20_inset]',
        )}
      >
        <div className="flex flex-row items-center gap-3">
          <div
            className="relative flex size-12 items-center justify-center rounded-full shadow-[0_0_0_1px_rgba(255,255,255,0.34)_inset,0_8px_22px_rgba(0,169,255,0.35)]"
            style={{
              backgroundImage: `linear-gradient(180deg, ${colorFrom} 0%, ${colorTo} 100%)`,
            }}
          >
            <Icon className="size-5 text-white" />
            <span className="absolute -right-0.5 -top-0.5 size-2 rounded-full bg-white/95" />
          </div>
          <div className="flex flex-col overflow-hidden">
            <figcaption className="flex flex-row items-center text-lg font-semibold whitespace-pre text-slate-900 dark:text-white">
              <span className="text-sm sm:text-lg">{name}</span>
              <span className="mx-1">·</span>
              <span className="text-xs text-sky-700/70 dark:text-cyan-200/70">{time}</span>
            </figcaption>
            <p className="text-sm font-normal text-slate-500 dark:text-white/60">{description}</p>
          </div>
        </div>
      </figure>
    );
  };

  return (
    <div className={cn('overflow-hidden p-2', className)}>
      <div className={cn('relative flex h-[500px] w-full flex-col overflow-hidden p-2')}>
        <AnimatedList direction="down" maxItems={5} delay={1700}>
          {notifications.map((item, idx) => (
            <Notification {...item} key={idx} />
          ))}
        </AnimatedList>
        <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t" />
      </div>
    </div>
  );
}

function Globe3DPreview({
  className,
  locale = 'es',
  title,
  description,
}: {
  className?: string;
  locale?: Locale;
  title: string;
  description: string;
}) {
  return (
    <div
      className={cn(
        'relative h-[400px] w-full max-w-lg overflow-hidden rounded-xl bg-white p-10 shadow-sm ring-1 shadow-black/10 ring-black/10 dark:bg-neutral-900',
        className,
      )}
    >
      <h2 className="mb-4 text-2xl font-bold text-neutral-900 dark:text-white">
        {title}
      </h2>
      <p className="max-w-lg text-balance text-neutral-600 dark:text-neutral-400">
        {description}
      </p>
      <Globe3D
        className="absolute -bottom-96 -left-0 h-[700px]"
        markers={sampleMarkers}
        config={{
          atmosphereColor: '#4da6ff',
          atmosphereIntensity: 20,
          bumpScale: 5,
          autoRotateSpeed: 0.3,
          initialRotation: { x: 0, y: -0.7 },
        }}
        onMarkerClick={(marker) => {
          console.log(locale === 'es' ? 'Click marcador:' : 'Clicked marker:', marker.label);
        }}
        onMarkerHover={(marker) => {
          if (marker) {
            console.log(locale === 'es' ? 'Hover marcador:' : 'Hovering:', marker.label);
          }
        }}
      />
    </div>
  );
}

function IntegrationSecurityPreview({ className }: { className?: string }) {
  return (
    <div className={cn('relative flex items-center justify-center', className)}>
      <Shield className="size-56 text-slate-300/80 dark:text-slate-600/55" strokeWidth={1.35} />
    </div>
  );
}
