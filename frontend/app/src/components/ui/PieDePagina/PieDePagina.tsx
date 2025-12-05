import React from 'react';
import { Logo } from '../general/Logo';
import { texts } from '../../../config/texts';

export const PieDePagina: React.FC = () => {
  return (
    <footer className="w-full bg-zinc-50 dark:bg-black border-t border-zinc-200 dark:border-zinc-800 py-8 transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Marca - Minimalista */}
        <div className="flex items-center gap-3">
           <Logo claseTexto="text-sm font-black text-zinc-900 dark:text-white" claseAcento="text-sm font-black text-zinc-900 dark:text-white" />
        </div>

        {/* Copyright - Limpio */}
        <div className="text-[10px] font-mono text-zinc-400 dark:text-zinc-600 tracking-wider">
           © {new Date().getFullYear()} {texts.general.appName}
        </div>

      </div>
    </footer>
  );
};
