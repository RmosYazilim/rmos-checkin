import z from 'zod';

type TranslationFunction = (key: string) => string;

export const createLoginSchema = (t: TranslationFunction) => {
  return z.object({
    voucherId: z.string().min(3, t('validation.min')),
  });
};
