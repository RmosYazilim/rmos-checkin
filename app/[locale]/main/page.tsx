import { setRequestLocale } from 'next-intl/server';
import { Suspense, use } from 'react';
import MainContainer from './main-container';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function LoginPage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainContainer />
    </Suspense>
  );
}
