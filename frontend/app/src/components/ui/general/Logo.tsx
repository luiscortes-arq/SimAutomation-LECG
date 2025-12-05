import React from 'react';
import logoSvg from '../../../assets/logo/logo.svg';

interface PropiedadesLogo {
  claseTexto?: string;
  claseAcento?: string;
  onClick?: () => void;
  esModoOscuro?: boolean;
}

export const Logo: React.FC<PropiedadesLogo> = ({ 
  onClick,
  esModoOscuro = true
}) => {
  return (
    <div 
      className={`flex items-center ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <img 
        src={logoSvg} 
        alt="Logo" 
        className={`h-10 w-auto transition-all duration-300 ${
          esModoOscuro ? '' : 'invert hue-rotate-180'
        }`}
      />
    </div>
  );
};
