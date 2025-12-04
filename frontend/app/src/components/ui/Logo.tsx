import React from 'react';
import logoSvg from '../../assets/logo/logo.svg';

interface PropiedadesLogo {
  claseTexto?: string;
  claseAcento?: string;
  onClick?: () => void;
}

export const Logo: React.FC<PropiedadesLogo> = ({ 
  claseTexto = "text-zinc-900 dark:text-white", 
  claseAcento = "text-[#E65A28]",
  onClick 
}) => {
  return (
    <div 
      className={`flex items-center gap-3 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <img src={logoSvg} alt="Hermosillo Logo" className="h-8 w-auto dark:brightness-110" />
      <div className="flex items-center gap-1">
        <span className={`text-xl md:text-2xl font-black tracking-tighter uppercase italic ${claseTexto}`} style={{ fontFamily: 'Inter, sans-serif' }}>
          SIM
        </span>
        <span className={`text-xl md:text-2xl font-black tracking-tighter uppercase italic ${claseAcento}`} style={{ fontFamily: 'Inter, sans-serif' }}>
          AUTOMATION
        </span>
      </div>
    </div>
  );
};
