import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "rounded-full px-6 py-2 font-medium transition-all duration-300 transform active:scale-95";
  const variants = {
    primary: "bg-[#2997ff] text-white hover:bg-[#0077ED]",
    secondary: "bg-[#1d1d1f] text-[#2997ff] border border-[#2997ff] hover:bg-[#2997ff] hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
