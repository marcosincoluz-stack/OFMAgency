'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  CONTACT_TELEGRAM_HANDLE,
  CONTACT_TELEGRAM_URL,
} from '@/lib/constants';
import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';

const servicesByLocale = {
  es: [
    'Gestion de DMs y chatters',
    'Estrategia de monetizacion',
    'Captacion de trafico',
    'Optimizacion de perfiles y ofertas',
    'Lanzamiento desde cero',
    'Escalado de cuenta activa',
  ],
  en: [
    'DM management and chatters',
    'Monetization strategy',
    'Traffic acquisition',
    'Profile and offer optimization',
    'Launch from scratch',
    'Active account scaling',
  ],
} as const;

const accountStagesByLocale = {
  es: [
    'Aun no he lanzado mi cuenta',
    '0€ - 5.000€/mes',
    '5.000€ - 20.000€/mes',
    '20.000€+/mes',
  ],
  en: [
    'I have not launched my account yet',
    '€0 - €5,000/month',
    '€5,000 - €20,000/month',
    '€20,000+/month',
  ],
} as const;

const contentTimeByLocale = {
  es: [
    'Menos de 1 hora',
    '1 a 3 horas',
    'Mas de 3 horas',
  ],
  en: [
    'Less than 1 hour',
    '1 to 3 hours',
    'More than 3 hours',
  ],
} as const;

export function ContactForm({ locale = 'es' }: { locale?: Locale }) {
  const dict = getDictionary(locale);

  const services = servicesByLocale[locale];
  const accountStages = accountStagesByLocale[locale];
  const contentTimeOptions = contentTimeByLocale[locale];

  return (
    <section className="hero-padding container grid gap-12 md:grid-cols-2">
      <div className="space-y-4">
        <h1 className="text-4xl">{dict.contact.title}</h1>
        <p className="text-muted-foreground">{dict.contact.subtitle}</p>
      </div>

      <div className="space-y-10">
        <div className="space-y-4 rounded-sm border p-5">
          <Label className="text-base">{dict.contact.directContactTitle}</Label>
          <p className="text-muted-foreground text-sm">
            {dict.contact.directContactDesc}
          </p>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <a href={CONTACT_TELEGRAM_URL} target="_blank" rel="noopener noreferrer">
              {dict.contact.openTelegram} ({CONTACT_TELEGRAM_HANDLE})
            </a>
          </Button>
        </div>

        <form className="space-y-10">
          <div className="flex flex-col gap-4">
          <Label className="text-base">{dict.contact.needsLabel}</Label>
          <div className="flex flex-wrap gap-3">
            {services.map((service) => (
              <label
                key={service}
                className="cursor-pointer"
              >
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  className="peer sr-only"
                />
                <span className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/50 peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background">
                  {service}
                </span>
              </label>
            ))}
          </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-base">{dict.contact.stageLabel}</Label>
            <div className="flex flex-wrap gap-3">
              {accountStages.map((stage, idx) => (
                <label key={stage} className="cursor-pointer">
                  <input
                    type="radio"
                    name="account_stage"
                    value={stage}
                    className="peer sr-only"
                    required={idx === 0}
                  />
                  <span className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/50 peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background">
                    {stage}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Label className="text-base">{dict.contact.timeLabel}</Label>
            <div className="flex flex-wrap gap-3">
              {contentTimeOptions.map((time, idx) => (
                <label key={time} className="cursor-pointer">
                  <input
                    type="radio"
                    name="content_time"
                    value={time}
                    className="peer sr-only"
                    required={idx === 0}
                  />
                  <span className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-4 py-2 text-sm font-medium text-foreground transition-colors hover:border-foreground/50 peer-checked:border-foreground peer-checked:bg-foreground peer-checked:text-background">
                    {time}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Input type="text" placeholder={dict.contact.placeholders.name} required />

            <Input type="email" placeholder={dict.contact.placeholders.email} required />

            <Input type="text" placeholder={dict.contact.placeholders.telegram} required />

            <Input type="url" placeholder={dict.contact.placeholders.social} required />

            <Textarea placeholder={dict.contact.placeholders.details} className="resize-none" />

            <Button type="submit" size="lg" className="mt-6">
              {dict.contact.submit}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
