import React from 'react';

interface PropiedadesEtiquetaValor {
  valor: number;
}

export const EtiquetaValor: React.FC<PropiedadesEtiquetaValor> = ({ valor }) => {
  return (
    <div className="mb-6">
        <label className="text-xs text-zinc-400 mb-1 block">Volumen Objetivo (Proyectos/Mes)</label>
        <div className="text-5xl font-mono font-bold text-zinc-900 dark:text-white tracking-tighter">
            {valor}
        </div>
    </div>
  );
};
