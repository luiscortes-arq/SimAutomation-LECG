import React from 'react';
import { motion } from 'framer-motion';
import { Boton } from '../ui/general/Boton';
import { texts } from '../../config/texts';
import { IconArrowRight } from '../../config/icons';
import { animations } from '../../config/animations';

interface CaracteristicaReemplazoProps {
  alNavegar: () => void;
}

export const CaracteristicaReemplazo: React.FC<CaracteristicaReemplazoProps> = ({ alNavegar }) => {
  const t = texts.home.features.replace;

  return (
    <section className="h-full w-full bg-zinc-50 dark:bg-[#02050a] flex items-center justify-center relative overflow-hidden transition-colors duration-500">
       
       {/* --- PREMIUM BACKGROUND --- */}
       <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>
       <div className="absolute inset-0 bg-[linear-gradient(45deg,#254467_1px,transparent_1px),linear-gradient(-45deg,#254467_1px,transparent_1px)] bg-[size:48px_48px] opacity-[0.03] dark:opacity-[0.05] pointer-events-none"></div>

       {/* Ambient Blue Glow - Bottom Left */}
       <div className="absolute left-[-20%] bottom-[-20%] w-[1000px] h-[1000px] bg-hermosillo-mediumBlue/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-center relative z-10">
        
        {/* Visual Animation (Left) */}
        <div className="order-1 flex justify-center items-center h-[50vh] relative perspective-[2000px]">
            <div className="relative w-full max-w-md transform transition-all duration-500 hover:scale-[1.02]">
                {/* Floating cards effect */}
                <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-hermosillo-darkBlue to-hermosillo-mediumBlue rounded-2xl transform rotate-[-3deg] opacity-10 dark:opacity-20 blur-xl"
                    variants={animations.variants.float}
                    initial="initial"
                    animate="animate"
                    transition={animations.transition.float}
                />
                <div className="relative bg-white/60 dark:bg-[#0a0f16]/60 backdrop-blur-3xl rounded-2xl p-10 border border-white/40 dark:border-white/5 shadow-2xl">
                    <div className="flex justify-between items-center mb-10 border-b border-zinc-200 dark:border-white/5 pb-6">
                        <div className="flex items-center gap-2">
                             <div className="w-2 h-2 rounded-full bg-hermosillo-mediumBlue animate-pulse"></div>
                             <span className="text-hermosillo-mediumBlue font-mono text-[10px] font-bold tracking-widest uppercase">{t.visuals.id}</span>
                        </div>
                        <div className="px-3 py-1 bg-hermosillo-darkBlue/10 dark:bg-white/5 border border-hermosillo-darkBlue/20 dark:border-white/10 rounded-full text-[9px] text-hermosillo-darkBlue dark:text-white font-mono tracking-wider">{t.visuals.autoMode}</div>
                    </div>
                    
                    <div className="space-y-8 relative">
                         {/* Connecting Line */}
                         <div className="absolute left-[35%] top-2 bottom-2 w-px bg-zinc-200 dark:bg-white/5"></div>

                        <div className="flex items-center justify-between group relative z-10">
                            <span className="text-zinc-400 font-mono text-xs line-through decoration-hermosillo-red/50">{t.visuals.legacy}</span>
                            <motion.div 
                                className="w-6 h-6 rounded-full bg-white dark:bg-black border border-hermosillo-mediumBlue flex items-center justify-center shadow-lg z-20"
                                variants={animations.variants.pulseRing}
                                animate="animate"
                                transition={animations.transition.pulse}
                            >
                                <div className="w-1.5 h-1.5 bg-hermosillo-mediumBlue rounded-full"></div>
                            </motion.div>
                            <span className="text-hermosillo-darkBlue dark:text-hermosillo-stateBlue font-mono text-sm font-bold tracking-wide">{t.visuals.core}</span>
                        </div>
                         <div className="flex items-center justify-between opacity-50 relative z-10">
                            <span className="text-zinc-500 font-mono text-xs">{t.visuals.structOld}</span>
                            <div className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full z-20"></div>
                            <span className="text-zinc-500 font-mono text-xs">{t.visuals.structNew}</span>
                        </div>
                         <div className="flex items-center justify-between opacity-30 relative z-10">
                            <span className="text-zinc-500 font-mono text-xs">{t.visuals.cadImport}</span>
                            <div className="w-1.5 h-1.5 bg-zinc-300 dark:bg-zinc-700 rounded-full z-20"></div>
                            <span className="text-zinc-500 font-mono text-xs">{t.visuals.bimNative}</span>
                        </div>
                    </div>

                    <div className="mt-10">
                        <div className="h-0.5 w-full bg-zinc-100 dark:bg-white/5 overflow-hidden rounded-full">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-hermosillo-darkBlue to-hermosillo-mediumBlue"
                                animate={{ width: ["0%", "100%"] }}
                                transition={animations.transition.progress}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* Text Content (Right) */}
        <div className="order-2">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 1 }}
          >
             <div className="mb-6 flex items-center gap-3">
             </div>

            <h2 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] text-hermosillo-mediumBlue tracking-tight">
              {t.title}
            </h2>
            
            <p className="text-lg md:text-xl text-hermosillo-gray dark:text-zinc-400 leading-relaxed max-w-md mb-10 font-light">
              {t.description}
            </p>

            <div onClick={alNavegar}>
              <Boton className="!bg-hermosillo-mediumBlue !hover:bg-hermosillo-darkBlue text-white border-none flex items-center gap-3 px-8 py-4 rounded-full group cursor-pointer shadow-[0_10px_30px_-10px_rgba(63,97,131,0.5)] transition-all hover:scale-105">
                <span className="text-xs font-bold tracking-widest">{t.action}</span>
                <IconArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Boton>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};
