import { Button } from '@/components/ui/button';
import { localizeHref, type Locale } from '@/lib/i18n';
import { cn } from '@/lib/utils';

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCopy = {
  kicker: string;
  title: string;
  description: string;
  primaryCta: string;
  secondaryCta: string;
  items: FaqItem[];
};

const FAQ_COPY: Record<Locale, FaqCopy> = {
  es: {
    kicker: 'FAQ',
    title: 'Dudas que resolvemos antes de empezar',
    description:
      'Estas son las preguntas que casi todas las modelos nos hacen antes de trabajar con nosotros. Preferimos dejarlo claro desde el principio.',
    primaryCta: 'Hablar con el equipo',
    secondaryCta: 'Ver pagina FAQ',
    items: [
      {
        question: 'Cual es mi rol y que tengo que hacer exactamente?',
        answer:
          'Tu foco es crear contenido. Nosotros llevamos estrategia, operativa diaria de DMs, seguimiento de ventas, optimizacion y escalado. Te pedimos claridad, constancia y comunicacion; del resto nos ocupamos nosotros.',
      },
      {
        question: 'En que plataformas y redes sociales me vais a promocionar?',
        answer:
          'Trabajamos la captacion en canales donde ya hay demanda real para tu perfil: OnlyFans, Instagram, TikTok, Reddit, X y otras fuentes de trafico segun mercado. No usamos una plantilla fija; adaptamos el mix por objetivo y riesgo.',
      },
      {
        question: 'Como funcionan los pagos y la transparencia financiera?',
        answer:
          'Todo se define por contrato y con seguimiento claro. Tendras visibilidad del rendimiento, del reparto acordado y de como evoluciona la cuenta. Nuestro sistema esta pensado para que sepas que entra, de donde viene y que se esta mejorando.',
      },
      {
        question: 'Que porcentaje (split) me llevo y por que?',
        answer:
          'El split depende del nivel de operativa que asumimos y de la etapa en la que esta tu cuenta. Cuanto mayor es nuestra carga de trabajo (chat, ventas, procesos, equipo y escalado), mayor es nuestra parte. Lo dejamos cerrado antes de empezar, sin letras pequenas.',
      },
      {
        question: 'Que tipo de contenido promocional publicais? SFW o NSFW?',
        answer:
          'Priorizamos promocion SFW para crecer de forma sostenible y proteger tu marca. El enfoque final se adapta a tu nivel de comodidad, a tu mercado y a la estrategia definida. Tu privacidad y limites siempre van por delante.',
      },
    ],
  },
  en: {
    kicker: 'FAQ',
    title: 'Questions we answer before we start',
    description:
      'These are the questions most creators ask before joining us. We prefer to set expectations clearly from day one.',
    primaryCta: 'Talk with the team',
    secondaryCta: 'View FAQ page',
    items: [
      {
        question: 'What is my role and what do I need to do exactly?',
        answer:
          'Your main role is to create content. We handle strategy, daily DM operations, sales follow-up, optimization, and scaling. We ask for consistency and clear communication while we run the system.',
      },
      {
        question: 'Which platforms and social channels will you use to promote me?',
        answer:
          'We use the channels where demand already exists for your profile: OnlyFans, Instagram, TikTok, Reddit, X, and additional traffic sources by market. We do not use a one-size-fits-all setup.',
      },
      {
        question: 'How do payments and financial transparency work?',
        answer:
          'Everything is defined in the agreement and tracked clearly. You get visibility over performance, the agreed split, and account progress. The goal is simple: you always understand what is coming in and what is being improved.',
      },
      {
        question: 'What split do I get and why?',
        answer:
          'Your split depends on the level of operations we take on and your current account stage. The more execution we run (chat, sales, process, team, scaling), the larger our operational share. We define this before launch with full clarity.',
      },
      {
        question: 'What type of promotional content do you publish: SFW or NSFW?',
        answer:
          'We prioritize SFW promotion for long-term growth and stronger brand safety. The final setup depends on your comfort level, your market, and strategy. Your limits and privacy always come first.',
      },
    ],
  },
};

export const FaqSection = ({
  locale = 'es',
  className,
  showPageLink = true,
}: {
  locale?: Locale;
  className?: string;
  showPageLink?: boolean;
}) => {
  const copy = FAQ_COPY[locale] ?? FAQ_COPY.es;

  return (
    <section className={cn('section-padding container', className)}>
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:gap-14">
        <div className="space-y-5">
          <p className="text-muted-foreground text-xs font-medium tracking-[0.24em] uppercase">
            {copy.kicker}
          </p>
          <h2 className="text-4xl leading-tight">{copy.title}</h2>
          <p className="text-muted-foreground text-lg">{copy.description}</p>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button asChild>
              <a href={localizeHref(locale, '/contact')}>{copy.primaryCta}</a>
            </Button>
            {showPageLink && (
              <Button variant="outline" asChild>
                <a href={localizeHref(locale, '/faq')}>{copy.secondaryCta}</a>
              </Button>
            )}
          </div>
        </div>

        <div className="rounded-sm border border-border/60">
          {copy.items.map((item, index) => (
            <details
              key={item.question}
              className={cn(
                'group border-border/60 px-5 py-4 md:px-6',
                index !== copy.items.length - 1 && 'border-b',
              )}
            >
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg leading-snug">
                <span>{item.question}</span>
                <span className="text-muted-foreground transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-muted-foreground mt-3 pr-6 leading-relaxed">{item.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
