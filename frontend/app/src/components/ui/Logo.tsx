import React from 'react';
import logoSvg from '../../assets/logo/logo.svg';

interface PropiedadesLogo {
  claseTexto?: string;
  claseAcento?: string;
  onClick?: () => void;
}

export const Logo: React.FC<PropiedadesLogo> = ({ 
  onClick 
}) => {
  return (
    <div 
      className={`flex items-center ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <img src={logoSvg} alt="Logo" className="h-10 w-auto brightness-0 dark:brightness-110" />
    </div>
  );
};
