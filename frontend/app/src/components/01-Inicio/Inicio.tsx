import React from 'react';
import { motion } from 'framer-motion';
import { texts } from '../../config/texts';

import { TituloHero } from './InicioTitulo';
import { FondoHero } from './InicioFondo';
import { IndicadorDesplazamiento } from './IndicadorDesplazamiento';

export const Inicio: React.FC = () => {
  const t = texts.home.hero;

  return (
    <section className="h-full flex flex-col justify-center items-center text-center px-4 relative overflow-hidden bg-zinc-50 dark:bg-ui-backgroundDark transition-colors duration-500">
      
      {/* --- BACKGROUND --- */}
      <FondoHero />
      
      {/* --- CONTENT --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 max-w-7xl w-full"
      >
        <div className="flex flex-col items-center">
          
          {/* Badge - Glass effect */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.9 }}
             animate={{ opacity: 1, scale: 1 }}
             transition={{ delay: 0.2 }}
             className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.05)]"
          >
             <div className="w-1.5 h-1.5 rounded-full bg-hermosillo-orange shadow-[0_0_10px_#E65A28]"></div>
             <span className="text-hermosillo-darkBlue dark:text-zinc-300 font-mono text-[10px] tracking-[0.25em] uppercase font-semibold">
                {t.badge}
             </span>
          </motion.div>
          
          <TituloHero />

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mb-12 relative"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-hermosillo-orange to-transparent mx-auto mb-6 opacity-50"></div>
            <span className="relative text-lg md:text-2xl font-light tracking-[0.5em] text-hermosillo-steelBlue dark:text-hermosillo-paleBlue/80 uppercase">
              {t.subtitle}
            </span>
          </motion.div>

          <p className="text-base md:text-xl text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
            {t.description}
          </p>
        </div>
      </motion.div>

      <IndicadorDesplazamiento />
    </section>
  );
};
