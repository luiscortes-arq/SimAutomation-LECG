import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

interface CaracteristicaOrdenamientoProps {
  alNavegar: () => void;
}

export const CaracteristicaOrdenamiento: React.FC<CaracteristicaOrdenamientoProps> = ({ alNavegar }) => {
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
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#6C7D47_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_100%,transparent_100%)] opacity-[0.1] dark:opacity-[0.08] pointer-events-none"></div>
      
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
              PURGE
            </h2>
            
            <p className="text-lg md:text-xl text-hermosillo-gray dark:text-zinc-400 leading-relaxed max-w-md mb-10 font-light">
              <span className="text-hermosillo-palm font-medium">Lectura limpia</span>, estandarizada y precisa para Twinmotion.
            </p>
            
            <div onClick={alNavegar}>
              <Button className="!bg-hermosillo-palm !hover:bg-[#5a6b3d] text-white border-none flex items-center gap-3 px-8 py-4 rounded-full group cursor-pointer shadow-[0_10px_30px_-10px_rgba(108,125,71,0.5)] transition-all hover:scale-105">
                <span className="text-xs font-bold tracking-widest">EXPLORAR</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Button>
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
