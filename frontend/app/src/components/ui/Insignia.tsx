import React from 'react';
import { motion } from 'framer-motion';

interface PropiedadesInsignia {
  texto: string;
  retraso?: number;
}

export const Insignia: React.FC<PropiedadesInsignia> = ({ texto, retraso = 0 }) => {
  return (
    <motion.div 
       initial={{ opacity: 0, scale: 0.9 }}
       animate={{ opacity: 1, scale: 1 }}
       transition={{ delay: retraso }}
       className="flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full bg-white/40 dark:bg-white/5 border border-white/20 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.05)]"
    >
       <div className="w-1.5 h-1.5 rounded-full bg-hermosillo-orange shadow-[0_0_10px_#E65A28]"></div>
       <span className="text-hermosillo-darkBlue dark:text-zinc-300 font-mono text-[10px] tracking-[0.25em] uppercase font-semibold">
          {texto}
       </span>
    </motion.div>
  );
};
