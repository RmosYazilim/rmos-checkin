'use client';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useGetToken } from '@/app/[locale]/query/get-token';
import { DataResponseType } from '@/app/[locale]/main/types/data-response-type';

export const GetDatas = ({ sinif }: any) => {
  const searchParams = useSearchParams();
  const guid = searchParams?.get('guid') ?? '';
  const { data } = useGetToken();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.post(
        `https://frontapi.rmosweb.com/api/Kodlar/Getir_KodCheckIn`,
        {
          Guid: guid,
          Sinif: sinif,
          Kod: 'string',
          Tip: 6,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data?.token}`,
          },
        }
      );
      return response.data as DataResponseType;
    },
  });

  return {
    data: mutation.data,
    click: mutation.mutate,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
  };
};
