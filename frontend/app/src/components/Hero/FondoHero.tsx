import React from 'react';
import { motion } from 'framer-motion';

export const FondoHero: React.FC = () => {
  return (
    <>
      {/* 1. Superposición de Textura de Grano */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

      {/* 2. Cuadrícula Técnica */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 3. Iluminación */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2], 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-hermosillo-darkBlue/20 dark:bg-hermosillo-darkBlue/15 rounded-[100%] blur-[100px] pointer-events-none" 
      />

      <div className="absolute inset-0 bg-[radial-gradient(transparent_0%,var(--tw-gradient-stops))] from-transparent via-transparent to-white/90 dark:to-black/90 pointer-events-none" />
    </>
  );
};
