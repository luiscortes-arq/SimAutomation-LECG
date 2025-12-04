import React from 'react';
import { EncabezadoPanel } from './PanelControl/EncabezadoPanel';
import { EtiquetaValor } from './PanelControl/EtiquetaValor';
import { ControlDeslizante } from './PanelControl/ControlDeslizante';

interface PropiedadesPanelControl {
  objetivoSimulacion: number;
  setObjetivoSimulacion: (valor: number) => void;
}

export const PanelControl: React.FC<PropiedadesPanelControl> = ({ objetivoSimulacion, setObjetivoSimulacion }) => {
  return (
    <div className="lg:col-span-4 bg-white dark:bg-[#070707] border border-zinc-200 dark:border-white/10 p-6 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between">
        <div>
            <EncabezadoPanel />
            <EtiquetaValor valor={objetivoSimulacion} />
        </div>
        <ControlDeslizante 
            valor={objetivoSimulacion} 
            alCambiar={setObjetivoSimulacion} 
        />
    </div>
  );
};
