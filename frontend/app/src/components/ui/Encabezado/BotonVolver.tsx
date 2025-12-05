import React from 'react';
import { IconArrowLeft } from '../../../config/icons';
import { Boton } from '../general/Boton';
import { texts } from '../../../config/texts';

interface PropiedadesBotonVolver {
  alNavegar: () => void;
}

export const BotonVolver: React.FC<PropiedadesBotonVolver> = ({ alNavegar }) => {
  return (
    <Boton 
        onClick={alNavegar}
        variante="ghost"
        className="px-3 py-1 flex items-center gap-2"
    >
        <IconArrowLeft size={14} className="text-zinc-900 dark:text-white" />
        <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase">{texts.navigation.back}</span>
    </Boton>
  );
};
