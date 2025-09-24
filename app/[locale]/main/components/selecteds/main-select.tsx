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
import { MultiSelect } from '@/components/ui/multi-select';
import { GetDatas } from './query/get-datas';

export function MainSelect({
  sinif,
  onChange,
  value,
  multiple = false,
  label = '',
  placeholder,
}: any) {
  const { data, click } = GetDatas({ sinif: sinif });
  React.useEffect(() => {
    click();
  }, []);
  return (
    <>
      {multiple ? (
        <MultiSelect
          label={label}
          className="border-2 border-gray-300 rounded-lg mt-1 text-start w-full px-2 h-12 border-gray-300 focus:border-blue-500  focus:ring-blue-500"
          options={(data?.value ?? []).map((x: any) => ({
            value: String(x.Kod),
            label: x.Ad,
          }))}
          value={Array.isArray(value) ? value : value ? [String(value)] : []}
          onChange={onChange}
          placeholder={placeholder}
        />
      ) : (
        <Select label={label} value={value} onValueChange={onChange}>
          <SelectTrigger className="border-2 border-gray-300 mt-1 rounded-lg text-start w-full px-2 !h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>{label}</SelectLabel>
              {data &&
                data.value &&
                data?.value.map((item) => (
                  <SelectItem key={item.Kod} value={String(item.Kod)}>
                    {item.Ad}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      )}{' '}
    </>
  );
}
