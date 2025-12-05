import React from 'react';
import { motion } from 'framer-motion';
import { animations } from '../../config/animations';
import { backgrounds } from '../../config/backgrounds';

export const FondoHero: React.FC = () => {
  return (
    <>
      {/* 1. Grain Texture Overlay */}
      <div className={`absolute inset-0 ${backgrounds.noise.style}`} style={{ backgroundImage: backgrounds.noise.url }}></div>

      {/* 2. Technical Grid */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{
          ...backgrounds.grid.technical,
          backgroundSize: '32px 32px'
        }} 
      />

      {/* 3. Lighting */}
      <motion.div 
        variants={animations.variants.breathing}
        animate="animate"
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-hermosillo-darkBlue/20 dark:bg-hermosillo-darkBlue/15 rounded-[100%] blur-[100px] pointer-events-none" 
      />

      <div className="absolute inset-0 bg-[radial-gradient(transparent_0%,var(--tw-gradient-stops))] from-transparent via-transparent to-white/90 dark:to-black/90 pointer-events-none" />
    </>
  );
};
