import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="h-full flex flex-col justify-center items-center text-center px-4 relative overflow-hidden bg-zinc-50 dark:bg-[#050505] transition-colors duration-500">
      
      {/* --- ULTRA PREMIUM BACKGROUND --- */}
      
      {/* 1. Grain Texture Overlay (Subtle noise for realism) */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>

      {/* 2. Technical Grid - Finer and more subtle */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* 3. Lighting - Deep, rich ambient glows */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.2, 0.4, 0.2], 
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[80vw] h-[40vh] bg-hermosillo-darkBlue/20 dark:bg-hermosillo-darkBlue/15 rounded-[100%] blur-[100px] pointer-events-none" 
      />

      <div className="absolute inset-0 bg-[radial-gradient(transparent_0%,var(--tw-gradient-stops))] from-transparent via-transparent to-white/90 dark:to-black/90 pointer-events-none" />
      
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
                Core Innovation X VDC
             </span>
          </motion.div>
          
          {/* Main Title - Tight tracking & Metallic Gradient */}
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] text-hermosillo-darkBlue dark:text-white mb-8 drop-shadow-2xl">
            <span className="block text-zinc-300 dark:text-white/10 text-4xl md:text-7xl mb-2">SIM</span>
            <span className="block bg-clip-text text-transparent bg-gradient-to-b from-hermosillo-darkBlue via-hermosillo-mediumBlue to-hermosillo-stateBlue dark:from-white dark:via-zinc-200 dark:to-zinc-500">
              AUTOMATION
            </span>
          </h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 1 }}
            className="mb-12 relative"
          >
            <div className="h-px w-24 bg-gradient-to-r from-transparent via-hermosillo-orange to-transparent mx-auto mb-6 opacity-50"></div>
            <span className="relative text-lg md:text-2xl font-light tracking-[0.5em] text-hermosillo-steelBlue dark:text-hermosillo-paleBlue/80 uppercase">
              TWINMOTION
            </span>
          </motion.div>

          <p className="text-base md:text-xl text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed font-light">
            Automatización de alto rendimiento. <br/>
            <span className="text-hermosillo-orange font-medium">Velocidad</span> y <span className="text-hermosillo-orange font-medium">Precisión</span> absoluta.
          </p>
        </div>
      </motion.div>
      
      {/* Scroll Indicator - Minimalist */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-40 mix-blend-difference"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-500">Deslizar</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-zinc-500 to-transparent"></div>
      </motion.div>
    </section>
  );
};
