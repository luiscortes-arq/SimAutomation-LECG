import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { TarjetaVidrio } from '../../ui/TarjetaVidrio';

interface PropiedadesTarjetaKPI {
  titulo: string;
  icono: LucideIcon;
  valor: string | number;
  subtitulo: string;
  colorIcono?: string;
  colorBarra?: string;
  anchoBarra?: string; // Porcentaje como string, ej: "33%"
  claseBordeHover?: string;
}

export const TarjetaKPI: React.FC<PropiedadesTarjetaKPI> = ({
  titulo,
  icono: Icono,
  valor,
  subtitulo,
  colorIcono = "text-zinc-500",
  colorBarra = "bg-zinc-500",
  anchoBarra = "100%",
  claseBordeHover = ""
}) => {
  return (
    <TarjetaVidrio className={`p-6 flex flex-col justify-between transition-colors ${claseBordeHover}`}>
        <div className="flex justify-between items-start mb-2">
            <span className={`text-[9px] uppercase font-bold tracking-widest ${colorIcono.replace('text-', 'text-opacity-80 text-')}`}>{titulo}</span>
            <Icono size={14} className={colorIcono} />
        </div>
        <div>
            <div className="text-3xl font-mono font-bold text-zinc-700 dark:text-zinc-200">
                {valor}
            </div>
            <span className="text-[10px] text-zinc-400 uppercase">{subtitulo}</span>
        </div>
        <div className="mt-4 h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
            <div className={`h-full ${colorBarra}`} style={{ width: anchoBarra }}></div>
        </div>
    </TarjetaVidrio>
  );
};
