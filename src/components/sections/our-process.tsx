import type { Locale } from '@/lib/i18n';
import { Process } from './process';

const processStepsByLocale = {
  es: [
    {
      title: '1) Diagnostico en 48h',
      description:
        'Analizamos tu punto de partida: si empiezas de cero, si tu cuenta esta estancada o si tus ingresos son inestables.',
      image: '/images/process/discovery.webp',
    },
    {
      title: '2) Plan de accion',
      description:
        'Definimos un plan claro y facil de seguir: que hacer cada semana, que publicar y que priorizar.',
      image: '/images/process/research.webp',
    },
    {
      title: '3) Operativa 24/7',
      description:
        'Organizamos la gestion de DMs con respuestas claras, seguimiento y ritmo diario para mejorar conversion.',
      image: '/images/process/concept.webp',
    },
    {
      title: '4) Optimizacion semanal',
      description:
        'Revisamos resultados cada semana y ajustamos lo necesario para mantener el crecimiento.',
      image: '/images/process/refinement.webp',
    },
    {
      title: '5) Escalado estable',
      description:
        'Cuando el sistema funciona, lo escalamos para que crezcas con mas estabilidad y menos friccion.',
      image: '/images/process/delivery.webp',
    },
  ],
  en: [
    {
      title: '1) 48h Diagnosis',
      description:
        'We map your real stage: new account, stuck account, or unstable revenue. We identify time, sales, and conversion bottlenecks.',
      image: '/images/process/discovery.webp',
    },
    {
      title: '2) Anti-chaos plan',
      description:
        'You get a simple execution plan: what to post, what to sell in DMs, and what to prioritize every week.',
      image: '/images/process/research.webp',
    },
    {
      title: '3) 24/7 Operations',
      description:
        'We set scripts, follow-ups, and response flow so conversations do not die and sales stay consistent.',
      image: '/images/process/concept.webp',
    },
    {
      title: '4) Weekly optimization',
      description:
        'We review core metrics and adjust only what impacts revenue. Fast, clear, no fluff.',
      image: '/images/process/refinement.webp',
    },
    {
      title: '5) Stable scaling',
      description:
        'You move from random spikes to a repeatable system with more predictability and less daily stress.',
      image: '/images/process/delivery.webp',
    },
  ],
} as const;

export const OurProcess = ({ locale = 'es' }: { locale?: Locale }) => {
  return (
    <Process
      title={locale === 'es' ? 'Como trabajamos contigo' : 'How we work with you'}
      steps={processStepsByLocale[locale]}
    />
  );
};
