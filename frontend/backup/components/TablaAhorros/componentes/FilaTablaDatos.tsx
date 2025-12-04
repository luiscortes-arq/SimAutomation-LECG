import React from 'react';

interface PropiedadesFilaTablaDatos {
  titulo: string;
  subtitulo: string;
  valorActual: string | React.ReactNode;
  valorInversion: string | React.ReactNode;
  valorAuto: string | React.ReactNode;
}

export const FilaTablaDatos: React.FC<PropiedadesFilaTablaDatos> = ({
  titulo,
  subtitulo,
  valorActual,
  valorInversion,
  valorAuto
}) => {
  return (
    <div className="grid grid-cols-12 py-4 px-6 items-center hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors">
        <div className="col-span-4 flex flex-col">
            <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">{titulo}</span>
            <span className="text-[10px] text-zinc-400">{subtitulo}</span>
        </div>
        <div className="col-span-3 text-right font-mono text-xs text-zinc-600 dark:text-zinc-400">
            {valorActual}
        </div>
        <div className="col-span-2 text-right font-mono text-xs text-zinc-600 dark:text-zinc-400">
            {valorInversion}
        </div>
        <div className="col-span-3 text-right font-mono text-xs font-bold text-hermosillo-darkBlue dark:text-white">
            {valorAuto}
        </div>
    </div>
  );
};
