import createMiddleware from 'next-intl/middleware';
import { routing } from './lib/i18n/routing';

export default createMiddleware({
  locales: routing.locales,
  defaultLocale: routing.defaultLocale,
  localeDetection: true,
});

export const config = {
  // Exclude Next internals, files with extensions, and API routes from i18n middleware
  matcher: ['/((?!api|_next|.*\\..*).*)'],
};
