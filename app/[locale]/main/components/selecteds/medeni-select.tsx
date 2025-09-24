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

export function MedeniSelect({ value, onChange }: any) {
  const t = useTranslations('IndexPage');
  return (
    <>
      <Select value={value} onValueChange={onChange} label={t('medeni_select')}>
        <SelectTrigger className="border-2 border-gray-300 mt-1 rounded-lg text-start w-full !h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
          <SelectValue placeholder={t('medeni_select')} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>{t('medeni_select')}</SelectLabel>
            <SelectItem value="E">{t('married')}</SelectItem>
            <SelectItem value="B">{t('single')}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
