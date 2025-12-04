import React from 'react';
import { motion } from 'framer-motion';

interface PropiedadesBarraAnimada {
  id: number;
  ancho: string;
  color: string;
  indice: number;
}

export const BarraAnimada: React.FC<PropiedadesBarraAnimada> = ({ id, ancho, color, indice }) => {
  return (
    <motion.div
        className={`h-5 rounded-sm ${color} ${ancho} shadow-lg shadow-black/5`}
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ 
        duration: 0.8, 
        delay: indice * 0.1,
        ease: [0.22, 1, 0.36, 1]
        }}
    />
  );
};
