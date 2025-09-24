import * as React from 'react';

import { cn } from '@/lib/utils';

type InputProps = {
  label?: string;
  containerClassName?: string;
  error?: boolean;
  errorText?: string;
  disabled?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({
  className,
  containerClassName,
  label,
  type,
  id,
  error,
  errorText,
  disabled,
  value,
  ...props
}: InputProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;

  return (
    <div className={cn('pt-2', containerClassName)}>
      {label ? (
        <label
          htmlFor={inputId}
          className="block text-md font-medium text-gray-700"
        >
          {label}
        </label>
      ) : null}

      <input
        type={type}
        disabled={disabled}
        id={inputId}
        data-slot="input"
        value={value}
        className={cn(
          'border-2 border-gray-300 rounded-lg text-start w-full px-2 h-12 border-gray-300 focus:border-blue-500 mt-1 focus:ring-blue-500',
          className,
          error ? 'bg-red-100 border-red-500' : ''
        )}
        {...props}
      />
      {error && errorText && <p className="text-red-500">{errorText}</p>}
    </div>
  );
}

export { Input };
