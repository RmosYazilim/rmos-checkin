/*
'use client';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLoginSchema } from '../types/login-type';

export const LoginSurname = () => {
  const t = useTranslations('LoginPage');
  const router = useRouter();
  const loginSchema = createLoginSchema(t);
  type FormData = z.infer<typeof loginSchema>;
  const {
    control,
    formState: { errors },
    handleSubmit: formSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      voucherId: '111',
      surname: '',
    },
  });

  const onSubmit = (data: FormData) => {
    // TODO: Handle form submission
  };
  return (
    <form onSubmit={formSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Controller
          name="surname"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="text"
              error={!!errors.surname}
              errorText={errors.surname?.message}
              label={t('surname')}
            />
          )}
        />
      </div>

      <div className="space-y-2">
        <Input type="date" label={t('entry-date')} />
      </div>
      <button
        type="submit"
        className="inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-4 py-2.5 text-sm font-medium text-white shadow hover:bg-black focus:outline-none focus:ring-2 focus:ring-gray-900/20"
      >
        Giriş Yap
      </button>
    </form>
  );
};
*/
