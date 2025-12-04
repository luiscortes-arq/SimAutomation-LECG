import React from 'react';
import { Upload, Download, FileJson, FileType, ArrowDown } from 'lucide-react';

interface ReplacingPageProps {
  onBack: () => void;
}

export const ReplacingPage: React.FC<ReplacingPageProps> = ({ onBack }) => {
  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-white min-h-screen flex flex-col font-sans animate-in fade-in duration-500 pt-20">
      
      {/* --- PREMIUM BACKGROUND --- */}
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#254467_1px,transparent_1px),linear-gradient(-45deg,#254467_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05] dark:opacity-[0.1] pointer-events-none fixed"></div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[800px] h-[800px] bg-hermosillo-mediumBlue/10 rounded-full blur-[150px] pointer-events-none fixed" />

      {/* Content */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-6">
        <div className="text-center w-full max-w-5xl flex flex-col items-center">
            
            <div className="mb-8">
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-12 text-hermosillo-darkBlue dark:text-white tracking-tighter">
                NÚCLEO <span className="text-hermosillo-mediumBlue">REPLACE</span>
            </h1>
            
            <div className="w-full max-w-4xl flex flex-col gap-8">
                
                {/* Inputs Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input 1: Base File */}
                    <button className="group relative h-48 rounded-2xl border border-hermosillo-mediumBlue/30 bg-white/50 dark:bg-[#0a101a]/50 hover:bg-hermosillo-mediumBlue/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-hermosillo-mediumBlue/10">
                        <div className="p-4 rounded-full bg-hermosillo-mediumBlue/10 border border-hermosillo-mediumBlue/30 group-hover:scale-110 transition-transform duration-300">
                            <FileType size={32} className="text-hermosillo-mediumBlue" />
                        </div>
                        <div>
                            <span className="block text-xl font-bold text-hermosillo-darkBlue dark:text-white mb-1">ENTRADA 1</span>
                            <span className="text-xs text-hermosillo-stateBlue uppercase tracking-widest font-bold">Archivo Base</span>
                        </div>
                    </button>

                    {/* Input 2: New Standard */}
                    <button className="group relative h-48 rounded-2xl border border-hermosillo-mediumBlue/30 bg-white/50 dark:bg-[#0a101a]/50 hover:bg-hermosillo-mediumBlue/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-hermosillo-mediumBlue/10">
                        <div className="p-4 rounded-full bg-hermosillo-mediumBlue/10 border border-hermosillo-mediumBlue/30 group-hover:scale-110 transition-transform duration-300">
                            <FileJson size={32} className="text-hermosillo-mediumBlue" />
                        </div>
                        <div>
                            <span className="block text-xl font-bold text-hermosillo-darkBlue dark:text-white mb-1">ENTRADA 2</span>
                            <span className="text-xs text-hermosillo-stateBlue uppercase tracking-widest font-bold">Familia / Estándar</span>
                        </div>
                    </button>
                </div>

                {/* Connection Arrow */}
                <div className="flex justify-center text-hermosillo-mediumBlue/50">
                    <ArrowDown size={32} className="animate-bounce" />
                </div>

                {/* Download Action */}
                <button className="group relative w-full h-32 rounded-2xl bg-gradient-to-r from-hermosillo-darkBlue to-hermosillo-mediumBlue hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-6 shadow-xl shadow-hermosillo-mediumBlue/20 cursor-pointer">
                     <div className="p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                        <Download size={32} className="text-white" />
                     </div>
                     <div className="text-left">
                        <span className="block text-2xl font-bold text-white tracking-widest">DESCARGA</span>
                        <span className="text-xs text-hermosillo-paleBlue uppercase font-bold">Generar archivo actualizado</span>
                     </div>
                </button>

            </div>
        </div>
      </main>
    </div>
  );
};
