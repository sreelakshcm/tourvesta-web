/* eslint-disable max-len */
import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'filled' | 'outline' | 'link'; // Type of button
  color?: 'primary' | 'secondary'; // Color theme
};

const ButtonComponent: React.FC<ButtonProps> = ({
  variant = 'filled',
  color = 'primary',
  className = '',
  children,
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded-md focus:outline-none';
  const filledStyles = `transition-all bg-${color} text-white font-bold hover:bg-${color}-hover active:bg-${color}-active focus:ring-${color}-focus focus:ring-opacity-50`;
  const outlineStyles = `transition-all border border-${color} text-${color} hover:text-${color}-hover hover:border-${color}-hover active:text-${color}-active active:border-${color}-active focus:ring-${color}-focus`;
  const linkStyles = `pl-1 text-${color} hover:text-${color}-hover focus:outline-none`;

  const buttonStyles =
    variant === 'filled'
      ? filledStyles
      : variant === 'outline'
        ? outlineStyles
        : linkStyles;

  return (
    <button className={`${baseStyles} ${buttonStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default ButtonComponent;
