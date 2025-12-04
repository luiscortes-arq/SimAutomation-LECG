import React from 'react';
import { Clock, Zap, TrendingUp } from 'lucide-react';
import { TarjetaKPI } from './TarjetaKPI';

interface PropiedadesTarjetasKPI {
  estadisticas: {
    semanasManual: number;
    semanasAuto: number;
    ahorrado: number;
  };
}

export const TarjetasKPI: React.FC<PropiedadesTarjetasKPI> = ({ estadisticas }) => {
  return (
    <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <TarjetaKPI
            titulo="Tiempo Manual"
            icono={Clock}
            valor={estadisticas.semanasManual}
            subtitulo="Semanas requeridas"
            colorIcono="text-zinc-500"
            colorBarra="bg-hermosillo-red opacity-50"
            claseBordeHover="hover:border-hermosillo-red/50"
        />

        <TarjetaKPI
            titulo="Tiempo Auto"
            icono={Zap}
            valor={estadisticas.semanasAuto}
            subtitulo="Semanas requeridas"
            colorIcono="text-hermosillo-palm"
            colorBarra="bg-hermosillo-palm"
            anchoBarra="33%"
            claseBordeHover="hover:border-hermosillo-palm/50"
        />

        {/* KPI 3 - Especial con gradiente, mantenemos custom por ahora o adaptamos */}
        <div className="bg-gradient-to-br from-hermosillo-gold to-orange-500 p-6 rounded-xl flex flex-col justify-between text-white shadow-lg relative overflow-hidden">
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
            <div className="flex justify-between items-start mb-2 relative z-10">
                <span className="text-[9px] uppercase font-bold text-white/80 tracking-widest">Ganancia Eficiencia</span>
                <TrendingUp size={14} className="text-white" />
            </div>
            <div className="relative z-10">
                <div className="text-3xl font-mono font-bold">
                    +{estadisticas.ahorrado}
                </div>
                <span className="text-[10px] text-white/70 uppercase">Semanas Ahorradas</span>
            </div>
            <div className="mt-4 flex items-center gap-2 relative z-10">
                 <div className="text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded text-white">300% ROI</div>
            </div>
        </div>
    </div>
  );
};
