'use client';
import { usePathname, useRouter } from '@/lib/i18n/navigation';
import { useSearchParams } from 'next/navigation';
import Flag from 'react-country-icons';
import { Button } from '../ui/button';

const availableLocales = ['tr', 'en', 'de', 'ru', 'sa'] as const;
type AvailableLocale = (typeof availableLocales)[number];

export const SelectLanguage = ({ locale }: { locale: string }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleLanguageChange = (newLocale: AvailableLocale) => {
    if (newLocale === locale) return;
    const queryString = searchParams.toString();
    const href = queryString ? `${pathname}?${queryString}` : pathname;
    router.replace(href, { locale: newLocale });
  };

  const localeToCountry: Record<
    AvailableLocale,
    'TR' | 'GB' | 'DE' | 'RU' | 'SA'
  > = {
    tr: 'TR',
    en: 'GB',
    de: 'DE',
    ru: 'RU',
    sa: 'SA',
  };

  const renderFlag = (code: AvailableLocale) => {
    const country = localeToCountry[code];
    return <Flag size={30} country={country} />;
  };

  return (
    <div className="flex mt-2 items-center gap-2">
      {availableLocales.map((code) => (
        <Button
          key={code}
          className={code === locale ? 'bg-gray-400' : 'bg-gray-100'}
          onClick={() => handleLanguageChange(code)}
        >
          {renderFlag(code)}
        </Button>
      ))}
    </div>
  );
};
