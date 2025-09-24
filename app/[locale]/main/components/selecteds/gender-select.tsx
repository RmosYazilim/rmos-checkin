import * as React from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useTranslations } from 'next-intl';

export function GenderSelect({ value, onChange }: any) {
  const t = useTranslations('IndexPage');
  return (
    <>
      <Select value={value} onValueChange={onChange} label={t('gender_select')}>
        <SelectTrigger className="border-2 border-gray-300 mt-1 rounded-lg text-start w-full !h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
          <SelectValue placeholder={t('gender_select')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('gender_select')}</SelectLabel>
            <SelectItem value="E">{t('man')}</SelectItem>
            <SelectItem value="K">{t('woman')}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
