import React, { useState, useRef } from 'react';
import { IconUpload, IconDownload, IconArrowLeft } from '../config/icons';
import { uploadFileSingle } from '../api/api';
import { texts } from '../config/texts';
import { Boton } from '../components/ui/general/Boton';

interface PropiedadesPaginaPurgado {
  onBack: () => void;
}

export const PaginaPurgado: React.FC<PropiedadesPaginaPurgado> = ({ onBack }) => {
  const [file, setFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputFilename, setOutputFilename] = useState(texts.pages.purge.output.placeholder);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileClick = () => fileInputRef.current?.click();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSize = 4.5 * 1024 * 1024; // 4.5MB en bytes
      
      if (selectedFile.size > maxSize) {
        alert(texts.alerts.filesTooLarge); // Using general alert for simplicity or added specific if needed
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleDownload = async () => {
    if (!file) {
      alert(texts.alerts.missingFiles);
      return;
    }

    // Double-check file size before uploading
    const maxSize = 4.5 * 1024 * 1024;
    if (file.size > maxSize) {
      alert(texts.alerts.filesTooLarge);
      return;
    }

    setIsProcessing(true);
    try {
      const filename = outputFilename.endsWith('.udatasmith') ? outputFilename : `${outputFilename}.udatasmith`;
      await uploadFileSingle(file, '/api/purge', filename);
    } catch (error) {
      console.error(error);
      const errorMessage = (error as Error).message;
      if (errorMessage.includes('413') || errorMessage.includes('too large')) {
        alert(texts.alerts.filesTooLarge);
      } else {
        alert('Error al procesar: ' + errorMessage);
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-white min-h-screen flex flex-col font-sans animate-in fade-in duration-500 pt-20">
      
      {/* --- PREMIUM BACKGROUND --- */}
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#6C7D47_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_100%,transparent_100%)] opacity-[0.15] dark:opacity-[0.1] pointer-events-none fixed"></div>
      <div className="absolute right-[-10%] top-[-10%] w-[600px] h-[600px] bg-hermosillo-palm/10 rounded-full blur-[120px] pointer-events-none fixed" />

      {/* Back Button */}
      <div className="absolute top-6 left-6 z-50">
          <Boton 
            onClick={onBack} 
            variante="ghost"
            tamano="icon"
            className="bg-white/10 hover:bg-white/20"
          >
              <IconArrowLeft size={24} className="text-hermosillo-darkBlue dark:text-white" />
          </Boton>
      </div>

      {/* Content */}
      <main className="flex-grow flex items-center justify-center relative z-10 px-6">
        <div className="text-center w-full max-w-5xl flex flex-col items-center">
            
            <div className="mb-8">
            </div>

            <h1 className="text-5xl md:text-8xl font-black mb-16 text-hermosillo-palm dark:text-hermosillo-palm tracking-tighter">
                {texts.pages.purge.title}
            </h1>
            
            <div className="flex flex-col md:flex-row gap-8 w-full max-w-3xl justify-center items-center">
                {/* Input Button */}
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    className="hidden" 
                    accept=".udatasmith"
                />
                <button onClick={handleFileClick} className={`group relative w-full md:w-1/2 h-64 rounded-3xl border ${file ? 'border-hermosillo-palm bg-hermosillo-palm/10' : 'border-hermosillo-palm/30 bg-white/50 dark:bg-zinc-900/50'} hover:bg-hermosillo-palm/5 transition-all duration-300 flex flex-col items-center justify-center gap-6 overflow-hidden backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-hermosillo-palm/10`}>
                    <div className="absolute inset-0 bg-hermosillo-palm/0 group-hover:bg-hermosillo-palm/5 transition-colors duration-500"></div>
                    <div className="p-6 rounded-full bg-hermosillo-palm/10 border border-hermosillo-palm/30 group-hover:scale-110 transition-transform duration-300">
                        <IconUpload size={48} className="text-hermosillo-palm" />
                    </div>
                    <div className="text-center relative z-10">
                        <span className="block text-2xl font-bold text-hermosillo-darkBlue dark:text-white mb-1 tracking-wider">
                            {file ? file.name : texts.pages.purge.cards.input.title}
                        </span>
                        <span className="text-xs text-hermosillo-palm uppercase tracking-widest font-bold">{texts.pages.purge.cards.input.subtitle}</span>
                    </div>
                </button>

                {/* Arrow Visual (Mobile: Down, Desktop: Right) */}
                <div className="hidden md:block text-hermosillo-palm/30">
                    <IconArrowLeft size={32} className="rotate-180" />
                </div>
                <div className="block md:hidden text-hermosillo-palm/30">
                    <IconArrowLeft size={32} className="-rotate-90" />
                </div>

                {/* Filename Input */}
                <div className="w-full md:w-1/2 flex flex-col gap-3">
                    <label className="text-sm font-bold text-hermosillo-darkBlue dark:text-white uppercase tracking-wider">
                        {texts.pages.purge.output.label}
                    </label>
                    <input 
                        type="text" 
                        value={outputFilename}
                        onChange={(e) => setOutputFilename(e.target.value)}
                        placeholder={texts.pages.purge.output.placeholder}
                        className="px-4 py-3 rounded-xl border border-hermosillo-palm/30 bg-white/50 dark:bg-zinc-900/50 text-hermosillo-darkBlue dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-hermosillo-palm/50 font-mono backdrop-blur-sm"
                    />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">{texts.pages.purge.output.help}</span>
                </div>

                {/* Download Button */}
                <button 
                    onClick={handleDownload}
                    disabled={isProcessing}
                    className="group relative w-full md:w-1/2 h-64 rounded-3xl border border-transparent bg-hermosillo-palm hover:bg-[#5a6b3d] transition-all duration-300 flex flex-col items-center justify-center gap-6 shadow-xl shadow-hermosillo-palm/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <div className="p-6 rounded-full bg-black/10 group-hover:scale-110 transition-transform duration-300">
                        <IconDownload size={48} className="text-white" />
                    </div>
                    <div className="text-center relative z-10">
                        <span className="block text-2xl font-bold text-white mb-1 tracking-wider">
                            {isProcessing ? texts.pages.purge.output.action.processing : texts.pages.purge.output.action.default}
                        </span>
                        <span className="text-xs text-white/80 uppercase tracking-widest font-bold">{texts.pages.purge.output.action.subtitle}</span>
                    </div>
                </button>
            </div>
        </div>
      </main>
    </div>
  );
};
