import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import { Process } from './process';

const processStepsByLocale = {
  es: [
    {
      title: 'Diagnostico',
      description:
        'Definimos objetivos, posicionamiento y fuentes de ingresos para construir un plan operativo realista.',
      image: '/images/process/discovery.webp',
    },
    {
      title: 'Estrategia',
      description:
        'Diseñamos estructura de oferta, pricing y guiones de venta para elevar conversion y ticket medio.',
      image: '/images/process/research.webp',
    },
    {
      title: 'Implementacion',
      description:
        'Activamos chatters, automatizaciones y protocolos diarios para operar la cuenta sin fricciones.',
      image: '/images/process/concept.webp',
    },
    {
      title: 'Optimizacion',
      description:
        'Iteramos mensajes, contenido y promociones con datos semanales para mejorar resultados continuos.',
      image: '/images/process/refinement.webp',
    },
    {
      title: 'Escalado',
      description:
        'Consolidamos sistemas para sostener crecimiento y rentabilidad a largo plazo.',
      image: '/images/process/delivery.webp',
    },
  ],
  en: [
    {
      title: 'Discovery',
      description:
        'We align goals, positioning and revenue targets to build a realistic execution plan.',
      image: '/images/process/discovery.webp',
    },
    {
      title: 'Strategy',
      description:
        'We design offer architecture, pricing and sales scripts to increase conversion and average spend.',
      image: '/images/process/research.webp',
    },
    {
      title: 'Implementation',
      description:
        'We activate chatters, automation and daily SOPs to run account operations without friction.',
      image: '/images/process/concept.webp',
    },
    {
      title: 'Optimization',
      description:
        'We iterate messaging, content and promotions weekly using performance data.',
      image: '/images/process/refinement.webp',
    },
    {
      title: 'Scaling',
      description:
        'We harden systems to sustain long-term growth and profitability.',
      image: '/images/process/delivery.webp',
    },
  ],
} as const;

export const OurProcess = ({ locale = 'es' }: { locale?: Locale }) => {
  const dict = getDictionary(locale);
  return (
    <Process
      title={dict.serviceDetail.ourProcess}
      steps={processStepsByLocale[locale]}
    />
  );
};
