import React from 'react';
import { Upload, Download, ArrowLeft } from 'lucide-react';

interface SortingPageProps {
  onBack: () => void;
}

export const SortingPage: React.FC<SortingPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-white min-h-screen flex flex-col font-sans animate-in fade-in duration-500 pt-20">
      
      {/* --- PREMIUM BACKGROUND --- */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#6C7D47_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_100%,transparent_100%)] opacity-[0.15] dark:opacity-[0.1] pointer-events-none fixed"></div>
      <div className="absolute right-[-10%] top-[-10%] w-[600px] h-[600px] bg-hermosillo-palm/10 rounded-full blur-[120px] pointer-events-none fixed" />

      {/* Content */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-6">
        <div className="text-center w-full max-w-5xl flex flex-col items-center">
            
            <div className="mb-8">
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-16 text-hermosillo-darkBlue dark:text-white tracking-tighter">
                HERRAMIENTA DE <span className="text-hermosillo-palm">ORDEN</span>
            </h1>
            
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center items-center">
                {/* Input Button */}
                <button className="group relative w-full md:w-1/2 h-64 rounded-3xl border border-hermosillo-palm/30 bg-white/50 dark:bg-zinc-900/50 hover:bg-hermosillo-palm/5 transition-all duration-300 flex flex-col items-center justify-center gap-6 overflow-hidden backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-hermosillo-palm/10">
                    <div className="absolute inset-0 bg-hermosillo-palm/0 group-hover:bg-hermosillo-palm/5 transition-colors duration-500"></div>
                    <div className="p-6 rounded-full bg-hermosillo-palm/10 border border-hermosillo-palm/30 group-hover:scale-110 transition-transform duration-300">
                        <Upload size={48} className="text-hermosillo-palm" />
                    </div>
                    <div className="text-center relative z-10">
                        <span className="block text-2xl font-bold text-hermosillo-darkBlue dark:text-white mb-1 tracking-wider">ENTRADA</span>
                        <span className="text-xs text-hermosillo-palm uppercase tracking-widest font-bold">Cargar Archivo .RVT / .IFC</span>
                    </div>
                </button>

                {/* Arrow Visual (Mobile: Down, Desktop: Right) */}
                <div className="hidden md:block text-hermosillo-palm/30">
                    <ArrowLeft size={32} className="rotate-180" />
                </div>
                <div className="block md:hidden text-hermosillo-palm/30">
                    <ArrowLeft size={32} className="-rotate-90" />
                </div>

                {/* Download Button */}
                <button className="group relative w-full md:w-1/2 h-64 rounded-3xl border border-transparent bg-hermosillo-palm hover:bg-[#5a6b3d] transition-all duration-300 flex flex-col items-center justify-center gap-6 shadow-xl shadow-hermosillo-palm/20 cursor-pointer">
                    <div className="p-6 rounded-full bg-black/10 group-hover:scale-110 transition-transform duration-300">
                        <Download size={48} className="text-white" />
                    </div>
                    <div className="text-center relative z-10">
                        <span className="block text-2xl font-bold text-white mb-1 tracking-wider">DESCARGA</span>
                        <span className="text-xs text-white/80 uppercase tracking-widest font-bold">Obtener Optimizado</span>
                    </div>
                </button>
            </div>
        </div>
      </main>
    </div>
  );
};
