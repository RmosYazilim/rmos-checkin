'use client';

import * as React from 'react';
import * as Popover from '@radix-ui/react-popover';
import { ChevronDownIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

type Option = { label: string; value: string };

type MultiSelectProps = {
  label?: string;
  containerClassName?: string;
  id?: string;
  placeholder?: string;
  options: Option[];
  value: string[];
  onChange: (values: string[]) => void;
  className?: string;
  disabled?: boolean;
};

export function MultiSelect({
  label,
  containerClassName,
  id,
  placeholder = 'Seçiniz',
  options,
  value,
  onChange,
  className,
  disabled,
}: MultiSelectProps) {
  const generatedId = React.useId();
  const selectId = id ?? generatedId;
  const [open, setOpen] = React.useState(false);

  const toggleValue = React.useCallback(
    (v: string) => {
      const exists = value.includes(v);
      const next = exists ? value.filter((x) => x !== v) : [...value, v];
      onChange(next);
    },
    [value, onChange]
  );

  const selectedLabels = React.useMemo(() => {
    if (!value?.length) return '';
    const map = new Map(options.map((o) => [o.value, o.label] as const));
    const labels = value
      .map((v) => map.get(v) ?? v)
      .filter(Boolean) as string[];
    if (labels.length <= 2) return labels.join(', ');
    return `${labels.slice(0, 2).join(', ')} +${labels.length - 2}`;
  }, [value, options]);

  return (
    <div className={cn('pt-2', containerClassName)}>
      {label ? (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}
      <Popover.Root open={open} onOpenChange={setOpen}>
        <Popover.Trigger asChild disabled={disabled} id={selectId}>
          <button
            type="button"
            className={cn(
              "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 h-9 w-full",
              className
            )}
          >
            <span className={cn(!value?.length && 'text-muted-foreground')}>
              {value?.length ? selectedLabels : placeholder}
            </span>
            <ChevronDownIcon className="size-4 opacity-50" />
          </button>
        </Popover.Trigger>
        <Popover.Portal>
          <Popover.Content
            sideOffset={6}
            align="start"
            className={cn(
              'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 relative z-50 max-h-60 min-w-[12rem] origin-[var(--radix-popover-content-transform-origin)] overflow-x-hidden overflow-y-auto rounded-md border shadow-md p-1'
            )}
          >
            <div className="flex flex-col gap-1">
              {options.map((opt) => {
                const checked = value.includes(opt.value);
                return (
                  <button
                    type="button"
                    key={opt.value}
                    onClick={() => toggleValue(opt.value)}
                    className={cn(
                      'hover:bg-accent hover:text-accent-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-2 text-sm outline-hidden select-none'
                    )}
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleValue(opt.value)}
                    />
                    <span className="truncate">{opt.label}</span>
                  </button>
                );
              })}
            </div>
          </Popover.Content>
        </Popover.Portal>
      </Popover.Root>
    </div>
  );
}
