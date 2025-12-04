import React from 'react';

interface PropiedadesEnlaceNavegacion {
  href: string;
  texto: string;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>) => void;
}

export const EnlaceNavegacion: React.FC<PropiedadesEnlaceNavegacion> = ({ href, texto, onClick }) => {
  return (
    <a 
        href={href} 
        onClick={onClick}
        className="text-xs font-bold text-zinc-500 dark:text-[#BFD1E5] hover:text-[#6C7D47] dark:hover:text-[#6C7D47] transition-colors uppercase tracking-wider cursor-pointer"
    >
        {texto}
    </a>
  );
};
