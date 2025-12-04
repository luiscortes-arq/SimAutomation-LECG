import React from 'react';
import { motion } from 'framer-motion';

interface PropiedadesTarjetaFlotante {
  children: React.ReactNode;
}

export const TarjetaFlotante: React.FC<PropiedadesTarjetaFlotante> = ({ children }) => {
  return (
    <div className="relative w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
        {/* Efecto de tarjetas flotantes */}
        <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-hermosillo-darkBlue to-hermosillo-mediumBlue rounded-2xl transform rotate-[-3deg] opacity-10 dark:opacity-20 blur-xl"
            initial={{ rotate: -3 }}
            animate={{ rotate: -2 }}
            transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
        />
        <div className="relative bg-white/60 dark:bg-[#0a0f16]/60 backdrop-blur-3xl rounded-2xl p-10 border border-white/40 dark:border-white/5 shadow-2xl">
            {children}
        </div>
    </div>
  );
};
