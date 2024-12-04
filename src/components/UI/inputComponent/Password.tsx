import { SECONDARY_COLOR } from '@constants/styles';
import { SquareLock02Icon, SquareUnlock02Icon } from 'hugeicons-react';
import React, { useState } from 'react';

type PasswordInputProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> & {
  label?: string;
};

const PasswordInput: React.FC<PasswordInputProps> = ({ label, className = '', ...props }) => {
  const [inputType, setInputType] = useState('password');

  const handleTogglePassword = (): void => {
    setInputType((prevType) => (prevType === 'password' ? 'text' : 'password'));
  };

  return (
    <div className="flex flex-col">
      {label && <label className="mb-2 text-sm font-medium">{label}</label>}
      <div className="relative">
        <input
          className={`w-full rounded-lg border border-neutral bg-backgroundLight px-4 py-2 
            focus:outline-none focus:ring-1 focus:ring-primary-focus ${className}`}
          type={inputType}
          {...props}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2  -translate-y-1/2 text-gray-500"
          onClick={handleTogglePassword}
        >
          {inputType !== 'password'
            ? <SquareUnlock02Icon
              size={20}
              color={SECONDARY_COLOR} />
            : <SquareLock02Icon
              size={20}
              color={SECONDARY_COLOR}
            />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
