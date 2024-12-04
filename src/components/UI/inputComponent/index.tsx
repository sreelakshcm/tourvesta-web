import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  prefix?: React.ReactNode;
  suffix?: React.ReactNode;
};

const Input: React.FC<InputProps> = ({
  label, prefix, suffix, className = '', ...props
}) => (
  <div className="flex flex-col">
    {label && <label className="mb-2 text-sm font-medium">{label}</label>}
    <div className="relative">
      {prefix && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {prefix}
        </span>
      )}
      <input
        className={`w-full ${prefix ? 'pl-10' : ''} ${suffix ? 'pr-10' : ''} ${className}`}
        {...props}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {suffix}
        </span>
      )}
    </div>
  </div>
);

export default Input;
