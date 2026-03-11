'use client';

import { useState, type FormEvent } from 'react';

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

const validationMessages = {
  es: {
    required: 'Completa los campos obligatorios para continuar.',
    invalidEmail: 'Introduce un e-mail valido (ejemplo: nombre@dominio.com).',
  },
  en: {
    required: 'Please complete all required fields to continue.',
    invalidEmail: 'Please enter a valid email (example: name@domain.com).',
  },
} as const;

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function ContactForm({ locale = 'es' }: { locale?: Locale }) {
  const dict = getDictionary(locale);
  const contactFormEndpoint = import.meta.env.PUBLIC_CONTACT_FORM_ENDPOINT?.trim();

  const services = servicesByLocale[locale];
  const accountStages = accountStagesByLocale[locale];
  const contentTimeOptions = contentTimeByLocale[locale];
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const selectedServices = formData.getAll('services').map(String);

    if (selectedServices.length === 0) {
      setStatus('error');
      setMessage(dict.contact.serviceRequired);
      return;
    }

    if (!contactFormEndpoint) {
      setStatus('error');
      setMessage(dict.contact.formEndpointMissing);
      return;
    }

    const name = String(formData.get('name') ?? '').trim();
    const email = String(formData.get('email') ?? '').trim().toLowerCase();
    const telegram = String(formData.get('telegram') ?? '').trim();
    const social = String(formData.get('social') ?? '').trim();
    const details = String(formData.get('details') ?? '').trim();
    const servicesText = selectedServices.join(', ');
    const accountStage = String(formData.get('account_stage') ?? '').trim();
    const contentTime = String(formData.get('content_time') ?? '').trim();

    if (!name || !email || !telegram || !social || !accountStage || !contentTime) {
      setStatus('error');
      setMessage(validationMessages[locale].required);
      return;
    }

    if (!emailRegex.test(email)) {
      setStatus('error');
      setMessage(validationMessages[locale].invalidEmail);
      return;
    }

    const payload = {
      name,
      email,
      telegram,
      social,
      // Use a flat string for maximum webhook compatibility.
      services: servicesText,
      servicesList: selectedServices,
      accountStage,
      contentTime,
      details,
      // Some providers (Formspree/webhooks) expect a "message" field.
      message:
        details ||
        [
          `Services: ${servicesText}`,
          `Account stage: ${accountStage}`,
          `Content time: ${contentTime}`,
        ].join('\n'),
      locale,
      submittedAt: new Date().toISOString(),
      source: typeof window !== 'undefined' ? window.location.href : '',
    };

    try {
      setStatus('submitting');
      setMessage(dict.contact.submitting);

      let response = await fetch(contactFormEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      // Some providers reject JSON payloads with 422/415 and require form encoding.
      if (!response.ok && (response.status === 422 || response.status === 415)) {
        const encodedPayload = new URLSearchParams();
        encodedPayload.set('name', payload.name);
        encodedPayload.set('email', payload.email);
        encodedPayload.set('telegram', payload.telegram);
        encodedPayload.set('social', payload.social);
        encodedPayload.set('services', payload.services);
        encodedPayload.set('accountStage', payload.accountStage);
        encodedPayload.set('contentTime', payload.contentTime);
        encodedPayload.set('details', payload.details);
        encodedPayload.set('message', payload.message);
        encodedPayload.set('locale', payload.locale);
        encodedPayload.set('submittedAt', payload.submittedAt);
        encodedPayload.set('source', payload.source);

        response = await fetch(contactFormEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            Accept: 'application/json',
          },
          body: encodedPayload.toString(),
        });
      }

      if (!response.ok) {
        const errorText = await response.text().catch(() => '');
        throw new Error(
          `Request failed with status ${response.status}${
            errorText ? `: ${errorText}` : ''
          }`,
        );
      }

      setStatus('success');
      setMessage(dict.contact.submitSuccess);
      form.reset();
    } catch (error) {
      console.error(error);
      setStatus('error');
      setMessage(dict.contact.submitError);
    }
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

        <form className="space-y-10" onSubmit={handleSubmit} noValidate>
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
            <Input
              type="text"
              name="name"
              placeholder={dict.contact.placeholders.name}
              required
            />

            <Input
              type="email"
              name="email"
              placeholder={dict.contact.placeholders.email}
              required
            />

            <Input
              type="text"
              name="telegram"
              placeholder={dict.contact.placeholders.telegram}
              required
            />

            <Input
              type="url"
              name="social"
              placeholder={dict.contact.placeholders.social}
              required
            />

            <Textarea
              name="details"
              placeholder={dict.contact.placeholders.details}
              className="resize-none"
            />

            <Button
              type="submit"
              size="lg"
              className="mt-6"
              disabled={status === 'submitting'}
            >
              {dict.contact.submit}
            </Button>
            <p
              className={`text-sm ${
                status === 'success'
                  ? 'text-green-600'
                  : status === 'error'
                    ? 'text-destructive'
                    : 'text-muted-foreground'
              }`}
            >
              {message}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
