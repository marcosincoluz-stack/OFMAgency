import type { Locale } from '@/lib/i18n';
import { getDictionary } from '@/lib/i18n-dictionary';

export const AboutIntro = ({ locale = 'es', description }: { locale?: Locale; description?: string }) => {
  const dict = getDictionary(locale);
  const aboutDescription = description ?? dict.home.aboutIntro;

  return (
    <section className="pb-12 pt-0 md:pb-16 md:pt-0 lg:pb-20 lg:pt-0 bigger-container space-y-16 md:space-y-18">
      <div className="container max-w-4xl">
        <p className="text-muted-foreground md:text-lg lg:text-xl">
          {aboutDescription}
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <img
          width={924}
          height={664}
          src="/images/homepage/about-team.webp"
          alt="Hive team members"
          className="size-full object-cover"
        />
        <img
          width={924}
          height={664}
          src="/images/homepage/about-award.webp"
          alt="Award badge"
          className="size-full object-cover dark:invert"
        />
      </div>
    </section>
  );
};
