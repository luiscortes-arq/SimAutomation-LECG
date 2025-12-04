import React from 'react';

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
      className={`flex items-center gap-1 ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <span className={`text-xl md:text-2xl font-black tracking-tighter uppercase italic ${claseTexto}`} style={{ fontFamily: 'Inter, sans-serif' }}>
        SIM
      </span>
      <span className={`text-xl md:text-2xl font-black tracking-tighter uppercase italic ${claseAcento}`} style={{ fontFamily: 'Inter, sans-serif' }}>
        AUTOMATION
      </span>
    </div>
  );
};
