'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useToastNotif } from '@/components/toaster/use-toast';
import { useCustomers } from '../../main/store/usecustomers';
import { useGetToken } from '../../query/get-token';
import { responseType } from '../types/response-type';
export const getCustomers = () => {
  const router = useRouter();
  const { setCustomers } = useCustomers();
  const { data } = useGetToken();
  const searchParams = useSearchParams();
  const guid = searchParams?.get('guid') ?? '';
  const voucher = searchParams?.get('voucher') ?? '';
  const hasRequiredInfo = Boolean(data?.token && guid && voucher);
  const { showErrorToast } = useToastNotif();
  const mutation = useMutation({
    mutationFn: async () => {
      if (!hasRequiredInfo) {
        throw new Error('Gerekli bilgiler eksik');
      }
      const response = await axios.post(
        `https://frontapi.rmosweb.com/api/Procedure/StpWPrevil_Bul`,
        {
          db_Id: 0,
          xtip: 1,
          arama_10: 1,
          voucher: voucher,
          guid: guid,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.token}`,
          },
        }
      );
      return response.data as responseType;
    },
    onSuccess: (data: responseType) => {
      if (!data?.isSucceded) {
        if (data?.message) {
          router.push(`/login?guid=${guid}`);
          showErrorToast({ message: '' });
        } else {
          router.push(`/login?guid=${guid}`);
          showErrorToast({ message: '' });
        }
      } else {
        setCustomers(data.value);
        router.push(`/main?guid=${guid}&voucher=${voucher}`);
      }
    },
    onError: () => {
      router.push(`/login?guid=${guid}`);
      showErrorToast({ message: '' });
    },
  });

  return {
    click: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    canSubmit: hasRequiredInfo,
  };
};
