import React from 'react';
import { Activity } from 'lucide-react';

export const EncabezadoPanel: React.FC = () => {
  return (
    <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded">
            <Activity size={14} className="text-zinc-600 dark:text-zinc-400" />
        </div>
        <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
            Parámetros de Simulación
        </span>
    </div>
  );
};
