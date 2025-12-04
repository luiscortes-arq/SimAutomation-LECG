import React from 'react';
import { Moon, Sun } from 'lucide-react';

interface PropiedadesBotonTema {
  esModoOscuro: boolean;
  alternarTema: () => void;
}

export const BotonTema: React.FC<PropiedadesBotonTema> = ({ esModoOscuro, alternarTema }) => {
  return (
    <button 
        onClick={alternarTema}
        className="p-2 rounded-full bg-zinc-100 dark:bg-white/10 text-zinc-900 dark:text-white hover:scale-110 transition-transform cursor-pointer"
        aria-label="Alternar Tema"
    >
        {esModoOscuro ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};
