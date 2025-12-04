import React from 'react';
import { motion } from 'framer-motion';
import datos from './datos.json';
import './estilos.css';

export const IndicadorDesplazamiento: React.FC = () => {
  return (
    <motion.div 
        className="hero-scroll-contenedor"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="hero-scroll-texto">{datos.indicadorScroll}</span>
        <div className="hero-scroll-linea"></div>
    </motion.div>
  );
};
