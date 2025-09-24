'use client';
import { Input } from '@/components/ui/input';
import { useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createLoginSchema } from '../types/login-type';
import { Button } from '@/components/ui/button';

export const LoginVoucher = () => {
  const t = useTranslations('LoginPage');
  const router = useRouter();
  const searchParams = useSearchParams();
  const guid = searchParams?.get('guid') ?? '';
  const loginSchema = createLoginSchema(t);
  type FormData = z.infer<typeof loginSchema>;
  const {
    control,
    formState: { errors },
    handleSubmit: formSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      voucherId: '',
    },
  });

  const onSubmit = (data: FormData) => {
    router.push(`/main?guid=${guid}&voucher=${data.voucherId}`);
  };
  return (
    <form onSubmit={formSubmit(onSubmit)} className="space-y-5">
      <div className="space-y-2">
        <Controller
          name="voucherId"
          control={control}
          render={({ field }) => (
            <Input
              {...field}
              type="number"
              error={!!errors.voucherId}
              errorText={errors.voucherId?.message}
              label={t('voucher')}
            />
          )}
        />
      </div>
      <Button className=" bg-blue-500 w-full h-15" type="submit">
        <span className="font-bold text-xl">Giriş Yap</span>
      </Button>
    </form>
  );
};
