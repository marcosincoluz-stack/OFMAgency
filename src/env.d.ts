/// <reference path="../.astro/types.d.ts" />

type Locale = import('@/lib/i18n').Locale;
type Market = import('@/lib/i18n').Market;

declare namespace App {
  interface Locals {
    locale: Locale;
    market: Market;
  }
}
