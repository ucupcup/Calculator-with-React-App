import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
  type?: 'digit' | 'operation' | 'zero';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = 'digit' }) => {
  const className = `button ${type}`;
  return (
    <button className={className} onClick={onClick}>
      {label}
    </button>
  );
};

export default Button;
