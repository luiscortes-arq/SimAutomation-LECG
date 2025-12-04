import React from 'react';
import { ArrowRight, FileJson, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-white min-h-screen flex flex-col font-sans animate-in fade-in duration-500 pt-20">
      
      {/* --- PREMIUM BACKGROUND --- */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none fixed"></div>
      <div className="absolute left-0 right-0 top-[-10%] h-[500px] bg-hermosillo-mediumBlue/5 rounded-full blur-[150px] pointer-events-none fixed" />

      {/* Content */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-6">
        <div className="text-center w-full max-w-5xl flex flex-col items-center">
            
            <h1 className="text-5xl md:text-7xl font-black mb-6 text-hermosillo-darkBlue dark:text-white tracking-tighter">
                SIM<span className="text-hermosillo-mediumBlue">AUTOMATION</span>
            </h1>
            <p className="text-xl text-zinc-500 dark:text-zinc-400 mb-16 max-w-2xl">
                Selecciona una herramienta para comenzar el procesamiento de archivos.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
                
                {/* Card 1: Replace */}
                <button 
                    onClick={() => navigate('/replace')}
                    className="group relative h-80 rounded-3xl border border-hermosillo-mediumBlue/20 bg-white/50 dark:bg-[#0a101a]/50 hover:bg-hermosillo-mediumBlue/5 transition-all duration-300 flex flex-col items-center justify-center gap-6 backdrop-blur-sm cursor-pointer shadow-xl hover:shadow-hermosillo-mediumBlue/10 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-hermosillo-mediumBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="p-6 rounded-full bg-hermosillo-mediumBlue/10 border border-hermosillo-mediumBlue/20 group-hover:scale-110 transition-transform duration-300 relative z-10">
                        <FileJson size={48} className="text-hermosillo-mediumBlue" />
                    </div>
                    <div className="text-center relative z-10">
                        <span className="block text-3xl font-bold text-hermosillo-darkBlue dark:text-white mb-2">REPLACE</span>
                        <span className="text-sm text-hermosillo-stateBlue uppercase tracking-widest font-bold">Estandarización de Familias</span>
                    </div>
                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <ArrowRight size={24} className="text-hermosillo-mediumBlue" />
                    </div>
                </button>

                {/* Card 2: Purge (Sort) */}
                <button 
                    onClick={() => navigate('/purge')}
                    className="group relative h-80 rounded-3xl border border-hermosillo-palm/20 bg-white/50 dark:bg-[#0a101a]/50 hover:bg-hermosillo-palm/5 transition-all duration-300 flex flex-col items-center justify-center gap-6 backdrop-blur-sm cursor-pointer shadow-xl hover:shadow-hermosillo-palm/10 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-br from-hermosillo-palm/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div className="p-6 rounded-full bg-hermosillo-palm/10 border border-hermosillo-palm/20 group-hover:scale-110 transition-transform duration-300 relative z-10">
                        <Trash2 size={48} className="text-hermosillo-palm" />
                    </div>
                    <div className="text-center relative z-10">
                        <span className="block text-3xl font-bold text-hermosillo-darkBlue dark:text-white mb-2">PURGE</span>
                        <span className="text-sm text-hermosillo-palm uppercase tracking-widest font-bold">Limpieza y Orden</span>
                    </div>
                    <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0">
                        <ArrowRight size={24} className="text-hermosillo-palm" />
                    </div>
                </button>

            </div>
        </div>
      </main>
    </div>
  );
};
