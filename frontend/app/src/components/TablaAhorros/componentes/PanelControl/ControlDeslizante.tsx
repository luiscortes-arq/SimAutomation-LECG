import React from 'react';
import { motion } from 'framer-motion';

interface PropiedadesControlDeslizante {
  valor: number;
  alCambiar: (nuevoValor: number) => void;
  min?: number;
  max?: number;
}

export const ControlDeslizante: React.FC<PropiedadesControlDeslizante> = ({ 
  valor, 
  alCambiar, 
  min = 5, 
  max = 100 
}) => {
  return (
    <div className="relative">
        <div className="flex justify-between text-[9px] font-mono text-zinc-500 mb-2 uppercase tracking-wider">
            <span>Min: {min}</span>
            <span>Max: {max}</span>
        </div>
        <div className="relative h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-2">
             <motion.div 
                className="absolute top-0 left-0 h-full bg-hermosillo-palm"
                initial={{ width: 0 }}
                animate={{ width: `${(valor / max) * 100}%` }}
             />
        </div>
        <input 
            type="range" 
            min={min} 
            max={max} 
            step="1"
            value={valor} 
            onChange={(e) => alCambiar(parseInt(e.target.value))}
            className="w-full h-8 absolute top-0 opacity-0 cursor-pointer"
        />
        <div className="text-[9px] text-zinc-400 text-center">Arrastra para simular carga</div>
    </div>
  );
};
