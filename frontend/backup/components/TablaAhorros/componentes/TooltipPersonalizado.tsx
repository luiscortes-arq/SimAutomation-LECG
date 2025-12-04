import React from 'react';
import { SEMANA_INICIO_AUTO } from '../constantes';

interface PropiedadesTooltip {
  active?: boolean;
  payload?: any[];
  label?: string;
  type?: 'moneda' | 'numero';
  formatearMoneda?: (valor: number) => string;
}

export const TooltipPersonalizado: React.FC<PropiedadesTooltip> = ({ active, payload, label, type, formatearMoneda }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050505] border border-zinc-800 p-4 rounded-none shadow-[0_0_30px_rgba(0,0,0,0.5)] min-w-[180px]">
        <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>
          <div className="flex gap-1">
              <div className="w-1 h-1 rounded-full bg-hermosillo-gold animate-pulse"></div>
              <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
          </div>
        </div>
        
        <div className="space-y-2">
          {payload.map((entrada: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center gap-4">
                  <span className="text-[10px] uppercase text-zinc-400 font-bold flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: entrada.stroke || entrada.fill }}></div>
                      {entrada.name === 'costoAuto' ? 'Automatizado' : entrada.name === 'costoManual' ? 'Manual' : entrada.name === 'totalAuto' ? 'Velocidad Auto' : 'Velocidad Manual'}
                  </span>
                  <span className="text-xs font-mono font-bold text-white">
                      {type === 'moneda' && formatearMoneda ? formatearMoneda(entrada.value) : entrada.value}
                  </span>
              </div>
          ))}
        </div>
        
        {type === 'moneda' && payload[0].payload.semana <= SEMANA_INICIO_AUTO && (
             <div className="mt-3 py-1 px-2 bg-hermosillo-palm/10 border border-hermosillo-palm/20 text-[9px] text-hermosillo-palm text-center font-mono uppercase">
                 Fase de Implementación
             </div>
        )}
      </div>
    );
  }
  return null;
};

