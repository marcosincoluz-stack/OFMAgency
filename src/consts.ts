// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Hive - Modern Astro Template';
export const SITE_DESCRIPTION =
  'A modern, fully featured Astro template built with Shadcn/UI, Tailwind & MDX.';

export const SITE_METADATA = {
  title: {
    default: SITE_TITLE,
    template: '%s | Hive',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Astro',
    'Astro Template',
    'Astro Theme',
    'Shadcn Template',
    'Template',
    'Shadcn/UI Template',
  ],
  authors: [{ name: 'Shadcnblocks.com' }],
  creator: 'Shadcnblocks.com',
  publisher: 'Shadcnblocks.com',
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: '/favicon/favicon.ico', sizes: '48x48' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    shortcut: [{ url: '/favicon/favicon.ico' }],
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    siteName: 'Hive',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hive - Modern Astro Template',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/og-image.jpg'],
    creator: '@shadcnblocks',
  },
};
