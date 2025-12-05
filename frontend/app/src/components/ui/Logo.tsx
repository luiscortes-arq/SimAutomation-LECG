import React from 'react';
import logoSvg from '../../assets/logo/logo.svg';
import logoLightSvg from '../../assets/logo/logo-light.svg';

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
        src={esModoOscuro ? logoSvg : logoLightSvg} 
        alt="Logo" 
        className="h-10 w-auto" 
      />
    </div>
  );
};
