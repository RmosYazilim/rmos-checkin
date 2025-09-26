import z from 'zod';

type TranslationFunction = (key: string) => string;

export const createUserSchema = (t: TranslationFunction) => {
  return z.object({
    Durum: z.string().default('WAIT'),
    Rezid: z.number(),
    Masterid: z.number(),
    Odano: z.string().nullable(),
    Adi: z.string().nonempty(t('validation.min')),
    Soyadi: z.string().nonempty(t('validation.min')),
    Ulke: z.string().nonempty(t('validation.min')),
    Online_10: z.number(),
    Anaadi: z.string().nonempty(t('validation.min')),
    Babaadi: z.string().nonempty(t('validation.min')),
    Kimlikid: z.number().refine((val) => !!val, {
      message: t('validation.min'),
    }),
    Dogumtarihi: z.string().nonempty(t('validation.min')),
    Cinsiyet: z.string().nullable(),
    Telefon: z.string().nullable(),
    Mail: z.string().nullable(),
    Belgeno: z.string().nullable(),
    Tcno: z.string().nonempty(t('validation.min')),
    Uyruk: z.string().nullable(),
    Belgeturu: z.string().nullable(),
    Medenidurum: z.string().nullable(),
    Allerjankodu: z
      .union([z.array(z.string()), z.string(), z.null()])
      .transform((v) => {
        if (v === null || v === undefined) return null;
        if (Array.isArray(v)) return v.filter(Boolean);
        if (typeof v === 'string')
          return v
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        return null;
      }),
    Engellikodu: z
      .union([z.array(z.string()), z.string(), z.null()])
      .transform((v) => {
        if (v === null || v === undefined) return null;
        if (Array.isArray(v)) return v.filter(Boolean);
        if (typeof v === 'string')
          return v
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        return null;
      }),
    Email: z.string().nullable(),
    Adres: z.string().nullable(),
    imza: z.string().nonempty(t('validation.min')),
  });
};

export interface UserRes {
  Durum: string;
  Rezid: number;
  Masterid: number;
  Odano: string | null;
  Adi: string;
  Soyadi: string;
  Ulke: string;
  Online_10: number;
  Anaadi: string | null;
  Babaadi: string | null;
  Kimlikid: number;
  Dogumtarihi: string;
  Cinsiyet: string | null;
  Telefon: string | null;
  Mail: string | null;
  Belgeno: string | null;
  Tcno: string | null;
  Uyruk: string | null;
  Belgeturu: string | null;
  Medenidurum: string | null;
  Allerjankodu: string[] | null;
  Engellikodu: string[] | null;
  Email: string | null;
  Adres: string | null;
  imza: string | null;
}
