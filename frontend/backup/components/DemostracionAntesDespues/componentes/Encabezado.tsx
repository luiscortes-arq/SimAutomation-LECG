import React from 'react';
import { motion } from 'framer-motion';
import datos from '../datos.json';
import '../estilos.css';

export const Encabezado: React.FC = () => {
  return (
    <motion.div 
        className="demo-encabezado-contenedor"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
         <h2 className="demo-titulo">
           {datos.encabezado.titulo} <span className="demo-titulo-resalte">{datos.encabezado.resalte}</span>
         </h2>
         <p className="demo-subtitulo">
            {datos.encabezado.subtitulo}
         </p>
      </motion.div>
  );
};
