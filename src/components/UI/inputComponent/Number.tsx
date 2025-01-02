import React from 'react';

type NumberInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
    label?: string;
};

const NumberInput: React.FC<NumberInputProps> = ({ label, className = '', ...props }) => (
  <div className="flex flex-col">
    {label && <label className="mb-2 text-sm font-medium">{label}</label>}
    <input
      className={`w-full rounded-md border bg-backgroundLight px-4 py-2 
        focus:outline-none focus:ring-1 focus:ring-primary-focus ${className}`}
      type="number"
      {...props}
    />
  </div>
);

export default NumberInput;
