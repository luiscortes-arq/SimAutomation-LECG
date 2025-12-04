import React from 'react';
import { BarraAnimada } from './BarraAnimada';
import { LineaEscaner } from './LineaEscaner';

export const AnimacionOrdenamiento: React.FC = () => {
  // Paleta: Palma #6C7D47
  const items = [
    { id: 1, w: 'w-3/4', color: 'bg-hermosillo-palm' }, 
    { id: 2, w: 'w-1/2', color: 'bg-hermosillo-palm/80' }, 
    { id: 3, w: 'w-full', color: 'bg-hermosillo-palm' }, 
    { id: 4, w: 'w-1/4', color: 'bg-hermosillo-palm/60' }, 
    { id: 5, w: 'w-2/3', color: 'bg-hermosillo-palm' }, 
  ];

  return (
    <div className="order-1 md:order-2 flex justify-center items-center h-[50vh] relative">
       <div className="w-full max-w-sm space-y-5 relative z-10 p-8">
         {items.map((item, index) => (
           <BarraAnimada 
             key={item.id}
             id={item.id}
             ancho={item.w}
             color={item.color}
             indice={index}
           />
         ))}
         
         <LineaEscaner />
       </div>
       
       {/* Fondo de Tarjeta de Vidrio */}
       <div className="absolute inset-0 border border-white/20 dark:border-white/5 rounded-[2rem] bg-gradient-to-br from-zinc-100/50 to-white/10 dark:from-white/5 dark:to-transparent backdrop-blur-2xl -skew-y-3 transform scale-95 shadow-2xl"></div>
    </div>
  );
};
