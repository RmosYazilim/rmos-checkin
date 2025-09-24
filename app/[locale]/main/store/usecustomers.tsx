'use client';
import { create } from 'zustand';
import { UserRes } from '@/app/[locale]/main/types/user-type';

interface CustomerProps {
  customers: UserRes[];
  setCustomers: (customers: UserRes[]) => void;
  updateCustomer: UserRes;
  setUpdateCustomer: (updateCustomer: UserRes) => void;
}

export const useCustomers = create<CustomerProps>((set) => ({
  customers: [],
  setCustomers: (customers) => set({ customers }),
  updateCustomer: {} as UserRes,
  setUpdateCustomer: (updateCustomer) => set({ updateCustomer }),
}));
