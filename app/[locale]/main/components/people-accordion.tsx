'use client';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GenderSelect } from './selecteds/gender-select';
import { Input } from '@/components/ui/input';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import { useTranslations } from 'next-intl';
import { createUserSchema, UserRes } from '../types/user-type';
import { User } from 'lucide-react';
import { MainSelect } from './selecteds/main-select';
import { MedeniSelect } from './selecteds/medeni-select';
import { useCustomers } from '../store/usecustomers';
import { UpdateCustomer } from '../query/update-customer';
import { useSearchParams } from 'next/navigation';
import { useToastNotif } from '@/components/toaster/use-toast';
import { getCustomers } from '../query/get-customers';

export const PeopleAccordion = ({ user }: { user: UserRes }) => {
  const { setUpdateCustomer } = useCustomers();
  const { click, isLoading } = UpdateCustomer();
  const [canvasReady, setCanvasReady] = useState(false);
  const { showErrorToast } = useToastNotif();
  const searchParams = useSearchParams();
  const guid = searchParams?.get('guid') ?? '';
  const voucher = searchParams?.get('voucher') ?? '';
  const sigCanvasRef = useRef<SignatureCanvas>(null);
  const t = useTranslations('IndexPage');
  const userSchema = createUserSchema(t);
  type FormData = z.input<typeof userSchema>;
  // Burada, Adi, Soyadi, Ulke, Anaadi, Babaadi, Kimlikid, Dogumtarihi, Tcno ve imza alanları boş DEĞİLSE true döndür, boşsa false döndür.
  const allFilledExceptRoom = [
    'Adi',
    'Soyadi',
    'Ulke',
    'Anaadi',
    'Babaadi',
    'Kimlikid',
    'Dogumtarihi',
    'Tcno',
    'imza',
  ].every((key) => {
    const value = (user as any)?.[key];
    if (typeof value === 'string') {
      return value.trim() !== '';
    }
    if (typeof value === 'number') {
      return value !== null && value !== undefined && value !== 0;
    }
    return value !== null && value !== undefined;
  });
  const {
    control,
    formState: { errors },
    handleSubmit: handleFormSubmit,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(userSchema),
    defaultValues: user as unknown as FormData,
  });

  const onSubmit = (data: FormData) => {
    const toCommaString = (v: unknown) =>
      Array.isArray(v) ? v.join(',') : (v as any);
    const jsonData = {
      ...data,
      Allerjankodu: toCommaString((data as any).Allerjankodu),
      Engellikodu: toCommaString((data as any).Engellikodu),
      imza: data.imza ?? '',
      Durum: 'CHEKIN',
      voucher: voucher,
      xtip: 2,
      arama_10: 1,
      guid: guid,
      Mail: data.Mail,
      Kimlikid: user.Kimlikid, // Eksik olan zorunlu alan eklendi
    };
    setUpdateCustomer(jsonData as UserRes);
    click();
  };

  useEffect(() => {
    if (sigCanvasRef.current) {
      if (user.imza) {
        sigCanvasRef.current.fromDataURL(user.imza);
      } else {
        sigCanvasRef.current.clear();
      }
    }
  }, [canvasReady]);

  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
        </div>
      ) : (
        <Accordion
          className="bg-white/80 m-3 backdrop-blur-sm border border-gray-200/50 rounded-2xl shadow-xl shadow-blue-100/50 overflow-hidden"
          type="single"
          collapsible
        >
          <AccordionItem
            value="item-1"
            className={`${allFilledExceptRoom ? 'border-green-500' : 'border-red-600'} border-l-8 border-r-8`}
          >
            <AccordionTrigger className="flex   text-lg justify-start items-center text-start px-6 py-4 ">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full text-white">
                  <User size={20} />
                </div>
                <span className="font-semibold text-gray-800 ">
                  {user.Adi} {user.Soyadi}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-6">
              <form
                onSubmit={handleFormSubmit(onSubmit, (formErrors) => {
                  showErrorToast({ message: '' });
                  console.log(formErrors);
                })}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  <Controller
                    name="Adi"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        label={t('name')}
                        placeholder={t('name')}
                        error={!!errors.Adi}
                        errorText={errors.Adi?.message}
                      />
                    )}
                  />
                  <Controller
                    name="Soyadi"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        label={t('surname')}
                        placeholder={t('surname')}
                        error={!!errors.Soyadi}
                        errorText={errors.Soyadi?.message}
                      />
                    )}
                  />

                  <Controller
                    name="Tcno"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        label={t('tc_or_password')}
                        placeholder={t('tc_or_password')}
                        error={!!errors.Tcno}
                        type="text"
                        errorText={errors.Tcno?.message}
                      />
                    )}
                  />
                  <Controller
                    name="Telefon"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        label={t('phone')}
                        placeholder={t('phone')}
                        error={!!errors.Telefon}
                        errorText={errors.Telefon?.message}
                        id="phone"
                        type="tel"
                      />
                    )}
                  />
                  <Controller
                    name="Anaadi"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        label={t('mother_name')}
                        placeholder={t('mother_name')}
                        error={!!errors.Anaadi}
                        errorText={errors.Anaadi?.message}
                        id="mother_name"
                        type="text"
                      />
                    )}
                  />
                  <Controller
                    name="Babaadi"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        label={t('father_name')}
                        placeholder={t('father_name')}
                        error={!!errors.Babaadi}
                        errorText={errors.Babaadi?.message}
                        id="father_name"
                        type="text"
                      />
                    )}
                  />
                  <Controller
                    name="Dogumtarihi"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={
                          field.value
                            ? typeof field.value === 'string'
                              ? field.value.split('T')[0]
                              : (() => {
                                  const d = new Date(field.value as any);
                                  const year = d.getFullYear();
                                  const month = String(
                                    d.getMonth() + 1
                                  ).padStart(2, '0');
                                  const day = String(d.getDate()).padStart(
                                    2,
                                    '0'
                                  );
                                  return `${year}-${month}-${day}`;
                                })()
                            : ''
                        }
                        label={t('birthday_date')}
                        placeholder={t('birthday_date')}
                        error={!!errors.Dogumtarihi}
                        errorText={errors.Dogumtarihi?.message}
                        id="birthday_date"
                        type="date"
                      />
                    )}
                  />
                  <Controller
                    name="Mail"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        label={t('mail_address')}
                        placeholder={t('mail_address')}
                        error={!!errors.Mail}
                        errorText={errors.Mail?.message}
                        id="mail_address"
                        type="text"
                      />
                    )}
                  />
                  <Controller
                    name="Adres"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        label={t('id_adress')}
                        placeholder={t('id_adress')}
                        error={!!errors.Mail}
                        errorText={errors.Mail?.message}
                        id="adresss"
                        type="text"
                      />
                    )}
                  />
                  <Controller
                    name="Belgeno"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        value={field.value ?? ''}
                        label={t('id_no')}
                        placeholder={t('id_no')}
                        error={!!errors.Belgeno}
                        errorText={errors.Belgeno?.message}
                        id="id_no"
                        type="text"
                      />
                    )}
                  />
                  <Controller
                    name="Uyruk"
                    control={control}
                    render={({ field }) => (
                      <MainSelect
                        label={t('id_country')}
                        placeholder={t('id_country')}
                        sinif="04"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="Belgeturu"
                    control={control}
                    render={({ field }) => (
                      <MainSelect
                        label={t('id_type')}
                        placeholder={t('id_type')}
                        sinif="80"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="Cinsiyet"
                    control={control}
                    render={({ field }) => (
                      <GenderSelect
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="Medenidurum"
                    control={control}
                    render={({ field }) => (
                      <MedeniSelect
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="Allerjankodu"
                    control={control}
                    render={({ field }) => (
                      <MainSelect
                        label={t('id_allergen')}
                        placeholder={t('id_allergen')}
                        sinif="113"
                        multiple
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <Controller
                    name="Engellikodu"
                    control={control}
                    render={({ field }) => (
                      <MainSelect
                        multiple
                        label={t('id_engelli')}
                        placeholder={t('id_engelli')}
                        sinif="114"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  {/*  
              <Controller
                name="Kimlik_Tel"
                control={control}
                render={({ field }) => (
                  <Textarea
                    label={t('extra_descrip')}
                    placeholder={t('extra_descrip')}
                    containerClassName="h-full"
                    className=" border-gray-300 focus:border-blue-500 mt-1 focus:ring-blue-500"
                  />
                )}
              />
               */}
                  <div className=" flex flex-col mt-2 items-center justify-start">
                    <label className="block text-sm font-medium text-gray-700">
                      {t('signature')}
                    </label>
                    <div
                      className={`w-full mt-1 h-full flex ${errors.imza ? 'bg-red-100 border-2 border-red-300' : ''}`}
                    >
                      <Controller
                        name="imza"
                        control={control}
                        render={({ field }) => (
                          <SignatureCanvas
                            ref={(ref) => {
                              sigCanvasRef.current = ref;
                              if (ref && !canvasReady) setCanvasReady(true);
                            }}
                            onEnd={() =>
                              field.onChange(
                                sigCanvasRef.current?.isEmpty()
                                  ? ''
                                  : sigCanvasRef.current?.toDataURL('image/png')
                              )
                            }
                            canvasProps={{
                              className:
                                'sigCanvas mb-3 border border-gray-300 rounded-lg  w-full h-full h-auto',
                            }}
                          />
                        )}
                      />
                    </div>
                    {errors.imza && (
                      <span className="mt-1 text-red-500">
                        {errors.imza?.message}
                      </span>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        if (sigCanvasRef.current) {
                          sigCanvasRef.current.clear();
                        }
                        // Form alanını da temizle
                        setValue('imza' as keyof FormData, '' as any, {
                          shouldDirty: true,
                          shouldTouch: true,
                          shouldValidate: true,
                        });
                      }}
                      className="mt-1 px-2 py-1 text-xs bg-gray-200 rounded hover:bg-gray-300"
                    >
                      {t('clean')}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full  h-16 mt-5"
                  variant="outline"
                >
                  {t('save')}
                </Button>
              </form>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </>
  );
};
