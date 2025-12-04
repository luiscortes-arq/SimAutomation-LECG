import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Boton } from '../ui/Boton';
import datos from './datos.json';
import './estilos.css';

interface PropiedadesContenidoOrdenamiento {
  alNavegar: () => void;
}

export const ContenidoOrdenamiento: React.FC<PropiedadesContenidoOrdenamiento> = ({ alNavegar }) => {
  return (
    <div className="ordenamiento-contenido-wrapper">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 1 }}
      >
         <div className="mb-6 flex items-center gap-3">
         </div>

        <h2 className="ordenamiento-titulo">
          {datos.titulo}
        </h2>
        
        <p className="ordenamiento-descripcion">
          <span className="ordenamiento-resalte">{datos.descripcion.resalte}</span>{datos.descripcion.texto}
        </p>
        
        <div onClick={alNavegar}>
          <Boton className="ordenamiento-boton">
            <span className="ordenamiento-boton-texto">{datos.boton}</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Boton>
        </div>
      </motion.div>
    </div>
  );
};
