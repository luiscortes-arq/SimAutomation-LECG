import React from 'react';
import { motion } from 'framer-motion';

export const LineaEscaner: React.FC = () => {
  return (
    <motion.div
        className="absolute top-0 left-[-10%] w-[120%] h-[1px] bg-white shadow-[0_0_20px_#fff] z-20 opacity-50"
        animate={{ top: ['10%', '90%', '10%'] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
    />
  );
};
