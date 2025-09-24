import { useLocale } from 'next-intl';
import { SelectLanguage } from './select-language';

export default function LanguageSwitcher() {
  const locale = useLocale();

  return <SelectLanguage locale={locale} />;
}
