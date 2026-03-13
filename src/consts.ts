// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = 'Velour - Agencia OnlyFans';
export const SITE_DESCRIPTION =
  'Velour es una agencia OnlyFans especializada en crecimiento, monetizacion y operaciones 24/7.';

export const SITE_METADATA = {
  title: {
    default: SITE_TITLE,
    template: '%s | Velour',
  },
  description: SITE_DESCRIPTION,
  keywords: [
    'Velour',
    'Agencia OnlyFans',
    'OnlyFans management',
    'OFM',
    'OnlyFans growth',
    'Monetizacion OnlyFans',
    'Chatters 24/7',
  ],
  authors: [{ name: 'Velour Agency' }],
  creator: 'Velour Agency',
  publisher: 'Velour Agency',
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
    siteName: 'Velour',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Velour - Agencia OnlyFans',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ['/images/og-image.jpg'],
    creator: '@velouragency',
  },
};
