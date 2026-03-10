const aboutDescription =
  'Somos Velour® la agencia de representación exclusiva que lleva tu carrera al 1% de los creadores..';

export const AboutIntro = () => {
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
