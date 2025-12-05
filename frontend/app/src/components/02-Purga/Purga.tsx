import React from 'react';
import { motion } from 'framer-motion';
import { Boton } from '../ui/general/Boton';
import { texts } from '../../config/texts';
import { IconArrowRight } from '../../config/icons';
import { backgrounds } from '../../config/backgrounds';

interface CaracteristicaOrdenamientoProps {
  alNavegar: () => void;
}

export const CaracteristicaOrdenamiento: React.FC<CaracteristicaOrdenamientoProps> = ({ alNavegar }) => {
  const t = texts.home.features.purge;
  // Palette: Palm #6C7D47
  const items = [
    { id: 1, w: 'w-3/4', color: 'bg-hermosillo-palm' }, 
    { id: 2, w: 'w-1/2', color: 'bg-hermosillo-palm/80' }, 
    { id: 3, w: 'w-full', color: 'bg-hermosillo-palm' }, 
    { id: 4, w: 'w-1/4', color: 'bg-hermosillo-palm/60' }, 
    { id: 5, w: 'w-2/3', color: 'bg-hermosillo-palm' }, 
  ];

  return (
    <section className="h-full w-full bg-white dark:bg-[#080a08] flex items-center justify-center relative overflow-hidden transition-colors duration-500">
      
      {/* --- PREMIUM BACKGROUND --- */}
      <div className={`absolute inset-0 ${backgrounds.noise.style}`} style={{ backgroundImage: backgrounds.noise.url }}></div>
      <div 
        className={`absolute inset-0 h-full w-full ${backgrounds.grid.dots.className}`} 
        style={{ 
          backgroundImage: backgrounds.grid.dots.backgroundImage,
          backgroundSize: backgrounds.grid.dots.backgroundSize,
          maskImage: backgrounds.grid.dots.maskImage
        }}
      ></div>
      
      {/* Ambient Glow */}
      <div className="absolute right-[-10%] top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hermosillo-palm/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Text Content */}
        <div className="order-2 md:order-1 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
          >
             <div className="mb-6 flex items-center gap-3">
             </div>

            <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] text-hermosillo-palm tracking-tight">
              {t.title}
            </h2>
            
            <p className="text-lg md:text-xl text-hermosillo-gray dark:text-zinc-400 leading-relaxed max-w-md mb-10 font-light">
              {t.description}
            </p>
            
            <div onClick={alNavegar}>
              <Boton className="!bg-hermosillo-palm !hover:bg-[#5a6b3d] text-white border-none flex items-center gap-3 px-8 py-4 rounded-full group cursor-pointer shadow-glow-palm transition-all hover:scale-105">
                <span className="text-xs font-bold tracking-widest">{t.action}</span>
                <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Boton>
            </div>
          </motion.div>
        </div>

        {/* Visual Animation */}
        <div className="order-1 md:order-2 flex justify-center items-center h-[50vh] relative">
           <div className="w-full max-w-sm space-y-5 relative z-10 p-8">
             {items.map((item, index) => (
               <motion.div
                 key={item.id}
                 className={`h-5 rounded-sm ${item.color} ${item.w} shadow-lg shadow-black/5`}
                 initial={{ x: -50, opacity: 0 }}
                 whileInView={{ x: 0, opacity: 1 }}
                 transition={{ 
                   duration: 0.8, 
                   delay: index * 0.1,
                   ease: [0.22, 1, 0.36, 1]
                 }}
               />
             ))}
             
             {/* Scanner Line */}
             <motion.div
                className="absolute top-0 left-[-10%] w-[120%] h-[1px] bg-white shadow-[0_0_20px_#fff] z-20 opacity-50"
                animate={{ top: ['10%', '90%', '10%'] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
             />
           </div>
           
           {/* Glass Card Background */}
           <div className="absolute inset-0 border border-white/20 dark:border-white/5 rounded-[2rem] bg-gradient-to-br from-zinc-100/50 to-white/10 dark:from-white/5 dark:to-transparent backdrop-blur-2xl -skew-y-3 transform scale-95 shadow-2xl"></div>
        </div>
      </div>
    </section>
  );
};
