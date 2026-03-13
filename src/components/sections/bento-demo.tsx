'use client';

import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react';

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

import { AnimatedList } from '@/components/magicui/animated-list';
import { CommentReplyCard } from '@/components/sections/comment-reply-card';
import type { Locale, Market } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import { cn } from '@/lib/utils';

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

const LazyWorldMap = lazy(async () => {
  const module = await import('@/components/ui/world-map');
  return { default: module.default };
});

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
        description:
          'Si te preocupa que te reconozcan en tu ciudad o pais, aplicamos geobloqueo por zonas, protocolos de identidad y retirada DMCA 24/7.',
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
        description:
          'Si te da miedo exponerte en tu ciudad o pais, activamos geobloqueo local, proteccion de identidad y respuesta DMCA 24/7.',
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
        description:
          'Si te preocupa aparecer en tu ciudad o pais, trabajamos con geobloqueo por zonas, protocolos de identidad y retirada DMCA 24/7.',
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
      background: <WorldMapPreview className="absolute inset-0" />,
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
            <span>{name || 'Feature'}</span>
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

function WorldMapPreview({ className }: { className?: string }) {
  const previewRef = useRef<HTMLDivElement | null>(null);
  const [shouldLoadMap, setShouldLoadMap] = useState(false);
  const [allowMotion, setAllowMotion] = useState(true);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setAllowMotion(!mediaQuery.matches);

    update();
    mediaQuery.addEventListener?.('change', update);
    return () => mediaQuery.removeEventListener?.('change', update);
  }, []);

  useEffect(() => {
    if (shouldLoadMap) return;
    const target = previewRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoadMap(true);
          observer.disconnect();
        }
      },
      { rootMargin: '220px 0px' },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [shouldLoadMap]);

  const dots = [
    {
      start: { lat: 64.2008, lng: -149.4937 },
      end: { lat: 34.0522, lng: -118.2437 },
    },
    {
      start: { lat: 64.2008, lng: -149.4937 },
      end: { lat: -15.7975, lng: -47.8919 },
    },
    {
      start: { lat: -15.7975, lng: -47.8919 },
      end: { lat: 38.7223, lng: -9.1393 },
    },
    {
      start: { lat: 51.5074, lng: -0.1278 },
      end: { lat: 28.6139, lng: 77.209 },
    },
    {
      start: { lat: 28.6139, lng: 77.209 },
      end: { lat: 43.1332, lng: 131.9113 },
    },
    {
      start: { lat: 28.6139, lng: 77.209 },
      end: { lat: -1.2921, lng: 36.8219 },
    },
  ];

  return (
    <div ref={previewRef} className={cn('relative h-full w-full overflow-hidden p-2 pt-2', className)}>
      {shouldLoadMap ? (
        <Suspense
          fallback={
            <div className="mx-auto h-[78%] w-[112%] -translate-x-[6%] rounded-xl bg-muted/20 [mask-image:linear-gradient(to_bottom,#000_0%,#000_92%,transparent_100%)]" />
          }
        >
          <LazyWorldMap
            dots={dots}
            animate={allowMotion}
            className="mx-auto h-[78%] w-[112%] -translate-x-[6%] [mask-image:linear-gradient(to_bottom,#000_0%,#000_92%,transparent_100%)] transition-transform duration-300 ease-out group-hover:scale-[1.02]"
          />
        </Suspense>
      ) : (
        <div className="mx-auto h-[78%] w-[112%] -translate-x-[6%] rounded-xl bg-muted/20 [mask-image:linear-gradient(to_bottom,#000_0%,#000_92%,transparent_100%)]" />
      )}
      <div className="from-background pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t" />
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
