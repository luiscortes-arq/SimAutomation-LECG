import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import { COLORES } from '../constantes';
import { TooltipPersonalizado } from './TooltipPersonalizado';
import { BarraEstadoGrafico } from './BarraEstadoGrafico';

interface PropiedadesGraficoTiempos {
  datos: any[];
  objetivoSimulacion: number;
}

export const GraficoTiempos: React.FC<PropiedadesGraficoTiempos> = ({ datos, objetivoSimulacion }) => {
  return (
    <div className="relative group">
         <BarraEstadoGrafico 
            titulo="Análisis_Velocidad_V2" 
            etiquetaManual="Pendiente Manual" 
            etiquetaAuto="Velocidad Auto" 
         />

        <div className="w-full h-[400px] bg-white dark:bg-[#070707] rounded-xl border border-zinc-200 dark:border-white/10 pt-14 pb-4 px-4 shadow-xl relative">
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={datos} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={COLORES.cuadricula} opacity={0.1} vertical={false} />
                    <XAxis 
                        dataKey="semana" 
                        stroke={COLORES.texto} 
                        fontSize={10} 
                        axisLine={false} 
                        tickLine={false}
                        tickMargin={10}
                        fontFamily="monospace"
                    />
                    <YAxis 
                        stroke={COLORES.texto} 
                        fontSize={10} 
                        axisLine={false} 
                        tickLine={false}
                        fontFamily="monospace"
                    />
                    <Tooltip content={<TooltipPersonalizado />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                    
                    <ReferenceLine 
                        y={objetivoSimulacion} 
                        stroke={COLORES.oro} 
                        strokeDasharray="4 4" 
                        strokeWidth={1}
                        label={{ value: 'META OBJETIVO', position: 'insideTopRight', fill: COLORES.oro, fontSize: 9, fontFamily: 'monospace' }} 
                    />

                    <Line 
                        type="stepAfter" 
                        dataKey="totalManual" 
                        stroke={COLORES.manual} 
                        strokeWidth={2} 
                        dot={false}
                        strokeDasharray="4 4"
                    />
                    <Line 
                        type="monotone" 
                        dataKey="totalAuto" 
                        stroke={COLORES.auto} 
                        strokeWidth={3} 
                        dot={{ r: 0 }}
                        activeDot={{ r: 6, fill: COLORES.auto, stroke: '#fff', strokeWidth: 2 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    </div>
  );
};
