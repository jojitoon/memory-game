import * as React from 'react';
import classNames from './button.module.css';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'tertiary';
  full?: boolean;
  additionalClassNames?: string;
  isActive?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  full,
  isActive,
  onClick,
  variant = 'secondary',
  additionalClassNames = '',
}) => {
  return (
    <button
      onClick={onClick}
      className={`${classNames.button} ${
        isActive ? classNames.primary : classNames[variant]
      } ${full ? classNames.full : ''} ${additionalClassNames}`}>
      {children}
    </button>
  );
};
