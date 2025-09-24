'use client';
import { useTranslations } from 'next-intl';
import { LoginMenubar } from './components/login-menubar';
import Image from 'next/image';
import img from '../assets/main.png';
import { Suspense } from 'react';
export const LoginContainer = () => {
  const t = useTranslations('LoginPage');

  return (
    <Suspense fallback={<div>🌸 Loading...</div>}>
      <div className="min-h-screen flex items-center justify-center">
        <div className="container  m-2 justify-center items-center">
          <div className="text-center mb-12">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full blur-lg opacity-20 scale-110"></div>
              <Image
                src={img}
                width={120}
                height={120}
                alt="Logo"
                className="relative mx-auto mb-6 drop-shadow-lg"
              />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-4">
              {t('title')}
            </h1>
          </div>
          <div className="bg-white justify-center shadow-sm border border-gray-200 rounded-xl  p-6 md:p-8 w-full ">
            <LoginMenubar />
          </div>
        </div>
      </div>
    </Suspense>
  );
};
