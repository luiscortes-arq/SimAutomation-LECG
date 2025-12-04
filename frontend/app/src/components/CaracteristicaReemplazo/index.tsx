import React from 'react';
import { AnimacionReemplazo } from './AnimacionReemplazo';
import { ContenidoReemplazo } from './ContenidoReemplazo';
import './estilos.css';

interface PropiedadesCaracteristicaReemplazo {
  alNavegar: () => void;
}

export const CaracteristicaReemplazo: React.FC<PropiedadesCaracteristicaReemplazo> = ({ alNavegar }) => {
  return (
    <section className="reemplazo-seccion">
       
       {/* --- FONDO PREMIUM --- */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>
       <div className="absolute inset-0 bg-[linear-gradient(45deg,#254467_1px,transparent_1px),linear-gradient(-45deg,#254467_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

       {/* Resplandor Ambiental Azul - Abajo Izquierda */}
       <div className="absolute left-[-20%] bottom-[-20%] w-[1000px] h-[1000px] bg-hermosillo-mediumBlue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="reemplazo-contenedor">
        <AnimacionReemplazo />
        <ContenidoReemplazo alNavegar={alNavegar} />
      </div>
    </section>
  );
};
