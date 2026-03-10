'use client';

import { useMemo, useState } from 'react';

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
import { cn } from '@/lib/utils';

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

export function ContactForm({ locale = 'es' }: { locale?: Locale }) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStage, setSelectedStage] = useState<string>('');
  const dict = getDictionary(locale);

  const services = useMemo(() => servicesByLocale[locale], [locale]);
  const accountStages = useMemo(() => accountStagesByLocale[locale], [locale]);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const selectStage = (stage: string) => {
    setSelectedStage(stage);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted', { selectedServices, selectedStage });
  };

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

        <div className="flex flex-col gap-4">
          <Label className="text-base">{dict.contact.needsLabel}</Label>
          <div className="flex flex-wrap gap-3">
            {services.map((service) => (
              <Button
                key={service}
                variant="outline"
                type="button"
                onClick={() => toggleService(service)}
                className={cn(
                  'rounded-full transition-colors',
                  selectedServices.includes(service)
                    ? 'border-foreground'
                    : 'border-border hover:border-foreground/50',
                )}
              >
                {service}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <Label className="text-base">{dict.contact.stageLabel}</Label>
          <div className="flex flex-wrap gap-3">
            {accountStages.map((stage) => (
              <Button
                key={stage}
                variant="outline"
                type="button"
                onClick={() => selectStage(stage)}
                className={cn(
                  'rounded-full transition-colors',
                  selectedStage === stage
                    ? 'border-foreground'
                    : 'border-border hover:border-foreground/50',
                )}
              >
                {stage}
              </Button>
            ))}
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input type="text" placeholder={dict.contact.placeholders.name} required />

          <Input type="email" placeholder={dict.contact.placeholders.email} required />

          <Input type="text" placeholder={dict.contact.placeholders.telegram} required />

          <Input type="text" placeholder={dict.contact.placeholders.brand} />

          <Textarea
            placeholder={dict.contact.placeholders.details}
            className="resize-none"
            required
          />

          <Button type="submit" size="lg" className="mt-6">
            {dict.contact.submit}
          </Button>
        </form>
      </div>
    </section>
  );
}
