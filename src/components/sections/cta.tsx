import { Button } from '@/components/ui/button';
import { type Locale, localizeHref } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';
import { cn } from '@/lib/utils';

export const Cta = ({
  locale = 'es',
  title,
  buttonText,
}: {
  locale?: Locale;
  title?: string;
  buttonText?: string;
}) => {
  const dict = getDictionary(locale);
  const ctaTitle = title ?? dict.home.ctaTitle;
  const ctaButton = buttonText ?? dict.home.ctaButton;

  return (
    <section className={cn('section-padding container space-y-10')}>
      <h2 className="text-4xl">{ctaTitle}</h2>

      <Button
        variant="outline"
        size="lg"
        className="h-12 gap-4 ps-1 pe-4"
        asChild
      >
        <a href={localizeHref(locale, '/contact')}>
          <div className="flex items-center gap-1">
            <img
              src="/images/about/avatar-1.webp"
              alt=""
              width={38}
              height={38}
              className="object-cover"
            />
            <img
              src="/images/about/avatar-2.webp"
              alt=""
              width={38}
              height={38}
              className="object-cover"
            />
          </div>
          <span>{ctaButton}</span>
        </a>
      </Button>
    </section>
  );
};
