import React from 'react';
import { motion } from 'framer-motion';

export const BarraProgreso: React.FC = () => {
  return (
    <div className="mt-10">
        <div className="h-0.5 w-full bg-zinc-100 dark:bg-white/5 overflow-hidden rounded-full">
            <motion.div 
                className="h-full bg-gradient-to-r from-hermosillo-darkBlue to-hermosillo-mediumBlue"
                animate={{ width: ["0%", "100%"] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    </div>
  );
};
