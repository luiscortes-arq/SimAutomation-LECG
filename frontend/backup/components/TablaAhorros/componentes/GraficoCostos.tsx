import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { COLORES, SEMANA_INICIO_AUTO } from '../constantes';
import { TooltipPersonalizado } from './TooltipPersonalizado';
import { BarraEstadoGrafico } from './BarraEstadoGrafico';

interface PropiedadesGraficoCostos {
  datos: any[];
  formatearMoneda: (valor: number) => string;
}

export const GraficoCostos: React.FC<PropiedadesGraficoCostos> = ({ datos, formatearMoneda }) => {
  return (
    <div className="relative group">
        <BarraEstadoGrafico titulo="Vista_Proyección_01" />

        <div className="w-full h-[450px] bg-white dark:bg-[#070707] rounded-xl border border-zinc-200 dark:border-white/10 pt-14 pb-4 px-4 shadow-xl">
             <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={datos} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorCostoAuto" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORES.auto} stopOpacity={0.5}/>
                            <stop offset="95%" stopColor={COLORES.auto} stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorCostoManual" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={COLORES.manual} stopOpacity={0.1}/>
                            <stop offset="95%" stopColor={COLORES.manual} stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="2 4" stroke={COLORES.cuadricula} opacity={0.15} vertical={false} />
                    <XAxis dataKey="etiqueta" stroke={COLORES.texto} fontSize={10} tickLine={false} axisLine={false} dy={10} minTickGap={30} fontFamily="monospace" />
                    <YAxis stroke={COLORES.texto} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(valor) => `$${valor/1000}k`} fontFamily="monospace" />
                    <Tooltip content={<TooltipPersonalizado type="moneda" formatearMoneda={formatearMoneda} />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }} />
                    <Area type="monotone" dataKey="costoManual" stroke={COLORES.manual} strokeWidth={2} fill="url(#colorCostoManual)" />
                    <Area type="monotone" dataKey="costoAuto" stroke={COLORES.auto} strokeWidth={3} fill="url(#colorCostoAuto)" />
                    <ReferenceLine x={`S${SEMANA_INICIO_AUTO}`} stroke={COLORES.inversion} strokeDasharray="3 3" />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};
