import React from 'react';
import { IconMoon, IconSun } from '../../../config/icons';
import { Boton } from '../general/Boton';

interface PropiedadesBotonTema {
  esModoOscuro: boolean;
  alternarTema: () => void;
}

export const BotonTema: React.FC<PropiedadesBotonTema> = ({ esModoOscuro, alternarTema }) => {
  return (
    <Boton 
        onClick={alternarTema}
        variante="ghost"
        tamano="icon"
        className="text-zinc-900 dark:text-white hover:scale-110 transition-transform"
        aria-label="Alternar Tema"
    >
        {esModoOscuro ? <IconSun size={18} /> : <IconMoon size={18} />}
    </Boton>
  );
};
