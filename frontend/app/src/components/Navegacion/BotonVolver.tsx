import React from 'react';
import { ArrowLeft } from 'lucide-react';

interface PropiedadesBotonVolver {
  alNavegar: () => void;
}

export const BotonVolver: React.FC<PropiedadesBotonVolver> = ({ alNavegar }) => {
  return (
    <button 
        onClick={alNavegar}
        className="flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 transition-colors cursor-pointer"
    >
        <ArrowLeft size={14} className="text-zinc-900 dark:text-white" />
        <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase">Volver</span>
    </button>
  );
};
