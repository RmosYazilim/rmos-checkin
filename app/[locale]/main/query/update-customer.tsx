'use client';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useToastNotif } from '@/components/toaster/use-toast';
import { useGetToken } from '../../query/get-token';
import { getCustomers } from './get-customers';
import { useCustomers } from '../store/usecustomers';
import { responseType } from '../types/response-type';
import { ConfettiSideCannons } from '../components/confetti';
export const UpdateCustomer = () => {
  const { updateCustomer } = useCustomers();
  const { data } = useGetToken();
  const { click } = getCustomers();
  const { showErrorToast, showSuccessToast } = useToastNotif();
  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `https://frontapi.rmosweb.com/api/Procedure/StpWPrevil_Bul`,
        updateCustomer,
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
          showErrorToast({ message: data?.message });
        } else {
          showErrorToast({ message: data?.message });
        }
      } else {
        ConfettiSideCannons();
        showSuccessToast({ message: '' });
        click();
      }
    },
    onError: () => {
      showErrorToast({ message: '' });
    },
  });

  return {
    click: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};
