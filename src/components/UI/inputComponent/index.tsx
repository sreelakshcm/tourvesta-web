import React, { forwardRef } from 'react';

type InputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'value'> & {
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
  value?: string | number | readonly string[] | null;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label, prefix, suffix, className = '', value = '', ...props 
  }, ref) => (
    <div className="flex flex-col">
      {label && <label className="mb-2 text-sm font-medium">{label}</label>}
      <div className="relative">
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            {prefix}
          </span>
        )}
        <input
          ref={ref}
          className={`w-full ${prefix ? 'pl-10' : ''} ${
            suffix ? 'pr-10' : ''
          } ${className}`}
          value={value || ''}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            {suffix}
          </span>
        )}
      </div>
    </div>
  ),
);

export default Input;
