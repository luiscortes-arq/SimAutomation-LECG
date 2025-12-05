import React from 'react';
import { motion } from 'framer-motion';
import { animations } from '../../config/animations';

interface PropiedadesBarraAnimada {
  id: number;
  ancho: string;
  color: string;
  indice: number;
}

export const BarraAnimada: React.FC<PropiedadesBarraAnimada> = ({ ancho, color, indice }) => {
  return (
    <motion.div
        className={`h-5 rounded-sm ${color} ${ancho} shadow-lg shadow-black/5`}
        variants={animations.variants.slideInLeft}
        initial="initial"
        whileInView="whileInView"
        transition={{ 
          ...animations.transition.expo,
          delay: indice * 0.1 
        }}
    />
  );
};
