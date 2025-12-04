import React from 'react';
import { ContenidoOrdenamiento } from './ContenidoOrdenamiento';
import { AnimacionOrdenamiento } from './AnimacionOrdenamiento';
import './estilos.css';

interface PropiedadesCaracteristicaOrdenamiento {
  alNavegar: () => void;
}

export const CaracteristicaOrdenamiento: React.FC<PropiedadesCaracteristicaOrdenamiento> = ({ alNavegar }) => {
  return (
    <section className="ordenamiento-seccion">
      
      {/* --- FONDO PREMIUM --- */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#6C7D47_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_100%,transparent_100%)] opacity-[0.1] dark:opacity-[0.08] pointer-events-none"></div>
      
      {/* Resplandor Ambiental */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hermosillo-palm/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="ordenamiento-contenedor">
        <ContenidoOrdenamiento alNavegar={alNavegar} />
        <AnimacionOrdenamiento />
      </div>
    </section>
  );
};
