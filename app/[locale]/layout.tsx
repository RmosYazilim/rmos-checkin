import { setRequestLocale, getMessages } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/lib/i18n/routing';
import LanguageSwitcher from '@/components/language-switcher/language-switcher';
import './globals.css';
import QueryProvider from '@/providers/query-provider';
import { Toaster } from 'sonner';
import { Suspense } from 'react';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html>
      <body>
        <QueryProvider>
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen bg-gray-50">
              <header className="bg-white shadow-sm border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-start items-center h-16">
                    <div className="flex gap-2 items-center"></div>
                    <Suspense fallback={null}>
                      <LanguageSwitcher />
                    </Suspense>
                  </div>
                </div>
              </header>
              <main>{children}</main>
            </div>
            <Toaster />
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
