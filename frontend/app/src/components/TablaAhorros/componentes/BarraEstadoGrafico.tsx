import React from 'react';

interface PropiedadesBarraEstadoGrafico {
  titulo: string;
  etiquetaManual?: string;
  etiquetaAuto?: string;
}

export const BarraEstadoGrafico: React.FC<PropiedadesBarraEstadoGrafico> = ({ 
  titulo, 
  etiquetaManual = "Manual", 
  etiquetaAuto = "Auto" 
}) => {
  return (
    <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 dark:bg-white/5 border-b border-zinc-200 dark:border-white/5 flex justify-between items-center px-4 z-20 rounded-t-xl">
        <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{titulo}</span>
        </div>
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-hermosillo-red"></div>
                <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{etiquetaManual}</span>
            </div>
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-hermosillo-darkBlue shadow-[0_0_8px_#254467]"></div>
                <span className="text-[9px] font-bold text-hermosillo-darkBlue dark:text-white uppercase tracking-wider">{etiquetaAuto}</span>
            </div>
        </div>
    </div>
  );
};
