import React from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, LayoutGrid, Replace, Check } from 'lucide-react';
import datos from '../datos.json';
import '../estilos.css';

interface PropiedadesBarraControl {
  manejarProcesoActual: () => void;
  ordenarCuadricula: () => void;
  alternarReemplazo: () => void;
  estaReemplazado: boolean;
}

export const BarraControl: React.FC<PropiedadesBarraControl> = ({ 
  manejarProcesoActual, 
  ordenarCuadricula, 
  alternarReemplazo, 
  estaReemplazado 
}) => {
  return (
    <motion.div 
        className="demo-barra-control"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <button 
            type="button"
            onClick={manejarProcesoActual}
            className="demo-boton-reset"
        >
            <RefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
            <span className="hidden sm:inline">{datos.controles.reset}</span>
        </button>
        
        <div className="demo-separador" />

        <button 
            type="button"
            onClick={ordenarCuadricula}
            className="demo-boton-ordenar"
        >
            <LayoutGrid size={14} />
            <span className="demo-texto-boton">{datos.controles.ordenar}</span>
        </button>

        <button 
            type="button"
            onClick={alternarReemplazo}
            className={`demo-boton-replace-base ${
              estaReemplazado 
                ? 'demo-boton-replace-activo' 
                : 'demo-boton-replace-inactivo'
            }`}
        >
            {estaReemplazado ? <Check size={14} /> : <Replace size={14} />}
            <span className="demo-texto-boton">
              {datos.controles.replace}
            </span>
        </button>
      </motion.div>
  );
};
