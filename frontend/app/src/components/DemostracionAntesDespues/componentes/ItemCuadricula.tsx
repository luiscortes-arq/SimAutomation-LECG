import React from 'react';
import { motion } from 'framer-motion';
import type { ItemCuadricula as TipoItemCuadricula } from '../hooks/useLogicaCuadricula';

interface PropiedadesItemCuadricula {
  item: TipoItemCuadricula;
  estaReemplazado: boolean;
  retrasoOla: number;
}

export const ItemCuadricula: React.FC<PropiedadesItemCuadricula> = ({ item, estaReemplazado, retrasoOla }) => {
  return (
    <div 
        className="flex items-center justify-center relative"
        style={{ perspective: '1000px' }} 
    >
        <motion.div 
            layout 
            layoutId={item.id}
            initial={false}
            animate={{ 
                rotateX: estaReemplazado ? 180 : 0, 
                rotateZ: estaReemplazado ? 0 : 0,
                borderRadius: estaReemplazado ? "99px" : "6px",
                scale: estaReemplazado ? 0.75 : 1,
                backgroundColor: estaReemplazado ? item.color : `${item.color}`, 
                borderColor: 'transparent',
            }}
            whileHover={{ 
                scale: estaReemplazado ? 0.9 : 1.1,
                zIndex: 100,
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
                transition: { duration: 0.2, ease: "easeOut" }
            }}
            whileTap={{ 
                scale: estaReemplazado ? 0.85 : 0.95,
                transition: { duration: 0.1 }
            }}
            transition={{ 
                type: "spring",
                stiffness: 35,
                damping: 15,
                mass: 1.2,
                delay: retrasoOla 
            }}
            className="w-full h-full flex items-center justify-center relative cursor-pointer group shadow-sm ring-1 ring-white/10 dark:ring-white/5"
            style={{
                transformStyle: 'preserve-3d',
            }}
        >
        {/* Contenido Interno con Visibilidad Trasera */}
        <div 
            className="flex items-center justify-center w-full h-full absolute inset-0 backface-hidden"
            style={{ 
                backfaceVisibility: 'visible',
                transform: estaReemplazado ? 'rotateX(180deg)' : 'none'
            }} 
        >
            {estaReemplazado ? (
            // Estado Reemplazado
            <div className="flex flex-col items-center justify-center">
                <span 
                    className="text-[8px] sm:text-[10px] font-mono font-bold tracking-tight text-white/90"
                >
                    {item.codigo}
                </span>
            </div>
            ) : (
            // Estado Crudo
            <div className="relative w-full h-full flex items-center justify-center">
                {/* Contenido Hover: Revelar Código */}
                <div className="flex flex-col items-center justify-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                    <span className="text-[10px] font-mono font-bold text-white tracking-widest drop-shadow-md">
                        {item.prefijo}
                    </span>
                </div>
            </div>
            )}
        </div>
        
        {/* Reflejo de Brillo Premium */}
        {!estaReemplazado && (
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
        )}
        </motion.div>
    </div>
  );
};
