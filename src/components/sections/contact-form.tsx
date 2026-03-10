'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

const services = ['Logo Design', 'Brand Identity', 'Rebranding', 'Icon Design'];

const budgetRanges = ['$10k – $20k', '$20k – $50k', '$50k – $100k', '$100k <'];

export function ContactForm() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedBudget, setSelectedBudget] = useState<string>('');

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service],
    );
  };

  const selectBudget = (budget: string) => {
    setSelectedBudget(budget);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Form submission logic can be added here
    console.log('Form submitted', { selectedServices, selectedBudget });
  };

  return (
    <section className="hero-padding container grid gap-12 md:grid-cols-2">
      <h1 className="text-4xl">Work with Hive</h1>

      <div className="space-y-10">
        {/* How can we help? */}
        <div className="flex flex-col gap-4">
          <Label className="text-base">How can we help?</Label>
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

        {/* Budget Range */}
        <div className="flex flex-col gap-4">
          <Label className="text-base">What&apos;s your budget range?</Label>
          <div className="flex flex-wrap gap-3">
            {budgetRanges.map((budget) => (
              <Button
                key={budget}
                variant="outline"
                type="button"
                onClick={() => selectBudget(budget)}
                className={cn(
                  'rounded-full transition-colors',
                  selectedBudget === budget
                    ? 'border-foreground'
                    : 'border-border hover:border-foreground/50',
                )}
              >
                {budget}
              </Button>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input type="text" placeholder="Your name" required />

          <Input type="email" placeholder="Your E-Mail" required />

          <Input type="text" placeholder="Your company's name" />

          <Textarea
            placeholder="Let us know more about the project..."
            className="resize-none"
            required
          />

          <Button type="submit" size="lg" className="mt-6">
            Kick things off
          </Button>
        </form>
      </div>
    </section>
  );
}
