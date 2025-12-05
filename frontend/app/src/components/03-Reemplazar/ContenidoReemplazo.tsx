import React from 'react';
import { motion } from 'framer-motion';
import { IconArrowRight } from '../../config/icons';
import { animations } from '../../config/animations';
import { Boton } from '../ui/general/Boton';
import datos from './datos.json';
import './estilos.css';

interface PropiedadesContenidoReemplazo {
  alNavegar: () => void;
}

export const ContenidoReemplazo: React.FC<PropiedadesContenidoReemplazo> = ({ alNavegar }) => {
  return (
    <div className="reemplazo-contenido-wrapper">
      <motion.div
        variants={animations.variants.fadeInRight}
        initial="initial"
        whileInView="animate"
        viewport={{ once: false }}
        transition={animations.transition.default}
      >
         <div className="mb-6 flex items-center gap-3">
         </div>

        <h2 className="reemplazo-titulo">
          {datos.titulo}
        </h2>
        
        <p className="reemplazo-descripcion">
          <span className="reemplazo-resalte">{datos.descripcion.resalte}</span> {datos.descripcion.texto}
        </p>

        <div onClick={alNavegar}>
          <Boton className="reemplazo-boton">
            <span className="reemplazo-boton-texto">{datos.boton}</span>
            <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Boton>
        </div>
      </motion.div>
    </div>
  );
};
