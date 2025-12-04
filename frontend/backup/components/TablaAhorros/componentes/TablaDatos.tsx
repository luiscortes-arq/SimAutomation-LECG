import React from 'react';
import { TrendingUp } from 'lucide-react';
import { COSTO_SEMANAL_MANUAL, COSTO_SEMANAL_AUTO, COSTO_ANUAL_MANUAL, FASE_TOTAL_INVERSION, TOTAL_ANUAL_AUTO } from '../constantes';
import { FilaTablaDatos } from './FilaTablaDatos';
import { TarjetaVidrio } from '../../ui/TarjetaVidrio';

interface PropiedadesTablaDatos {
  formatearMoneda: (valor: number) => string;
}

export const TablaDatos: React.FC<PropiedadesTablaDatos> = ({ formatearMoneda }) => {
  return (
    <div className="grid grid-cols-1 gap-4">
        <TarjetaVidrio className="overflow-hidden shadow-sm">
             {/* Encabezado */}
             <div className="grid grid-cols-12 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50 py-3 px-6">
                 <div className="col-span-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Componente</div>
                 <div className="col-span-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Actual</div>
                 <div className="col-span-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">Inversión</div>
                 <div className="col-span-3 text-[10px] font-bold text-hermosillo-darkBlue dark:text-hermosillo-stateBlue uppercase tracking-widest text-right">Auto</div>
             </div>
             
             {/* Filas */}
             <div className="divide-y divide-zinc-100 dark:divide-white/5">
                 <FilaTablaDatos 
                    titulo="Recursos Humanos"
                    subtitulo="Personal asignado"
                    valorActual="1 Persona"
                    valorInversion="2 Personas"
                    valorAuto="1 Persona"
                 />

                 <FilaTablaDatos 
                    titulo="Costo Operativo"
                    subtitulo="Semanal"
                    valorActual={<span className="text-sm text-hermosillo-red/80">{formatearMoneda(COSTO_SEMANAL_MANUAL)}</span>}
                    valorInversion="-"
                    valorAuto={
                        <div className="inline-block bg-hermosillo-darkBlue/10 dark:bg-hermosillo-stateBlue/10 px-2 py-1 rounded text-hermosillo-darkBlue dark:text-hermosillo-stateBlue font-mono text-sm font-bold border border-hermosillo-darkBlue/20">
                           {formatearMoneda(COSTO_SEMANAL_AUTO)}
                        </div>
                    }
                 />

                 {/* Fila Total - Mantenemos estructura especial */}
                 <div className="grid grid-cols-12 py-5 px-6 items-center bg-zinc-50 dark:bg-white/[0.03]">
                     <div className="col-span-4">
                         <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white flex items-center gap-2">
                             Total Proyecto <TrendingUp size={14} className="text-hermosillo-gold"/>
                         </span>
                     </div>
                     <div className="col-span-3 text-right">
                         <span className="block font-mono text-base text-zinc-500 line-through decoration-hermosillo-red/50 decoration-2">{formatearMoneda(COSTO_ANUAL_MANUAL)}</span>
                     </div>
                     <div className="col-span-2 text-right">
                         <span className="block font-mono text-xs text-hermosillo-palm">{formatearMoneda(FASE_TOTAL_INVERSION)}</span>
                     </div>
                     <div className="col-span-3 text-right">
                         <span className="block font-mono text-xl font-bold text-hermosillo-darkBlue dark:text-white">{formatearMoneda(TOTAL_ANUAL_AUTO)}</span>
                     </div>
                 </div>
             </div>
        </TarjetaVidrio>
    </div>
  );
};
