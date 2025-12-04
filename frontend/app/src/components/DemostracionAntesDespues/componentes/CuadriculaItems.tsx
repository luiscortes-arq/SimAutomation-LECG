import React from 'react';
import type { ItemCuadricula as TipoItemCuadricula } from '../hooks/useLogicaCuadricula';
import { ItemCuadricula } from './ItemCuadricula';

interface PropiedadesCuadriculaItems {
  itemsCuadricula: TipoItemCuadricula[];
  estaReemplazado: boolean;
}

export const CuadriculaItems: React.FC<PropiedadesCuadriculaItems> = ({ itemsCuadricula, estaReemplazado }) => {
  return (
    <div className="relative w-full max-w-5xl aspect-[16/10] md:aspect-[21/9] rounded-[2.5rem] p-[2px] bg-gradient-to-b from-white/60 to-transparent dark:from-white/10 dark:to-transparent shadow-2xl z-10">
        
        {/* Marco Interno */}
        <div className="relative w-full h-full rounded-[2.4rem] overflow-hidden bg-zinc-100 dark:bg-[#030303] shadow-inner">
           
           {/* Patrón de Cuadrícula Técnica DENTRO del contenedor */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
           
           {/* Envoltorio de Contenido */}
           <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
              <div className="w-full h-full grid grid-cols-6 gap-3 sm:gap-4">
                  {itemsCuadricula.map((item, i) => {
                    const col = i % 6;
                    const fila = Math.floor(i / 6);
                    const retrasoOla = (col + fila) * 0.05; 

                    return (
                        <ItemCuadricula 
                            key={item.id}
                            item={item}
                            estaReemplazado={estaReemplazado}
                            retrasoOla={retrasoOla}
                        />
                    );
                  })}
              </div>
           </div>
           
           {/* Superposición de Reflejo en Contenedor de Vidrio */}
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[2.4rem] z-30 mix-blend-overlay" />
        </div>
      </div>
  );
};
