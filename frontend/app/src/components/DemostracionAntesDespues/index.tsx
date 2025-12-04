import React from 'react';
import { useLogicaCuadricula } from './hooks/useLogicaCuadricula';
import { Encabezado } from './componentes/Encabezado';
import { BarraControl } from './componentes/BarraControl';
import { CuadriculaItems } from './componentes/CuadriculaItems';
import './estilos.css';

export const DemostracionAntesDespues: React.FC = () => {
  const { 
    itemsCuadricula, 
    estaReemplazado, 
    manejarProcesoActual, 
    ordenarCuadricula, 
    alternarReemplazo 
  } = useLogicaCuadricula();

  return (
    <section className="demo-seccion">
      
      {/* --- FONDO: EFECTO REFLECTOR --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(30,30,35,1),transparent_80%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>
      
      <Encabezado />

      {/* Barra de Control - Vidrio Flotante Premium */}
      <BarraControl 
        manejarProcesoActual={manejarProcesoActual}
        ordenarCuadricula={ordenarCuadricula}
        alternarReemplazo={alternarReemplazo}
        estaReemplazado={estaReemplazado}
      />

      {/* CONTENEDOR DE CUADRÍCULA PREMIUM */}
      <CuadriculaItems itemsCuadricula={itemsCuadricula} estaReemplazado={estaReemplazado} />
    </section>
  );
};
