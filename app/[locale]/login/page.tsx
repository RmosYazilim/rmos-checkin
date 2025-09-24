import { setRequestLocale } from 'next-intl/server';
import { use } from 'react';
import { LoginContainer } from './login-container';

type Props = {
  params: Promise<{ locale: string }>;
};
export default function LoginPage({ params }: Props) {
  const { locale } = use(params);

  setRequestLocale(locale);

  return <LoginContainer />;
}
