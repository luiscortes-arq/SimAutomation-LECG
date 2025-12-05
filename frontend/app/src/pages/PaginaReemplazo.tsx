import React, { useState, useRef } from 'react';
import { IconDownload, IconFileJson, IconFileType, IconArrowDown, IconArrowLeft } from '../config/icons';
import { uploadFileDouble } from '../api/api';
import { texts } from '../config/texts';
import { Boton } from '../components/ui/general/Boton';

interface PropiedadesPaginaReemplazo {
  onBack: () => void;
}

export const PaginaReemplazo: React.FC<PropiedadesPaginaReemplazo> = ({ onBack }) => {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [outputFilename, setOutputFilename] = useState(texts.pages.replace.output.placeholder);
  
  const file1InputRef = useRef<HTMLInputElement>(null);
  const file2InputRef = useRef<HTMLInputElement>(null);

  const handleFile1Click = () => file1InputRef.current?.click();
  const handleFile2Click = () => file2InputRef.current?.click();

  const handleFile1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSize = 4.5 * 1024 * 1024; // 4.5MB en bytes
      const file2Size = file2?.size || 0;
      const totalSize = selectedFile.size + file2Size;
      
      if (totalSize > maxSize) {
        alert(texts.alerts.filesTooLarge);
        return;
      }
      
      setFile1(selectedFile);
    }
  };

  const handleFile2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const maxSize = 4.5 * 1024 * 1024;
      const file1Size = file1?.size || 0;
      const totalSize = selectedFile.size + file1Size;
      
      if (totalSize > maxSize) {
        alert(texts.alerts.filesTooLarge);
        return;
      }
      
      setFile2(selectedFile);
    }
  };

  const handleDownload = async () => {
    if (!file1 || !file2) {
      alert(texts.alerts.missingFiles);
      return;
    }

    // Double-check total file size
    const maxSize = 4.5 * 1024 * 1024;
    const totalSize = file1.size + file2.size;
    if (totalSize > maxSize) {
      alert(texts.alerts.filesTooLarge);
      return;
    }

    setIsProcessing(true);
    try {
      const filename = outputFilename.endsWith('.udatasmith') ? outputFilename : `${outputFilename}.udatasmith`;
      await uploadFileDouble(file1, file2, '/api/replace', filename);
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
      <div className="absolute inset-0 bg-[linear-gradient(45deg,#254467_1px,transparent_1px),linear-gradient(-45deg,#254467_1px,transparent_1px)] bg-[size:40px_40px] opacity-[0.05] dark:opacity-[0.1] pointer-events-none fixed"></div>
      <div className="absolute left-[-10%] bottom-[-10%] w-[800px] h-[800px] bg-hermosillo-mediumBlue/10 rounded-full blur-[150px] pointer-events-none fixed" />

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

            <h1 className="text-5xl md:text-8xl font-black mb-12 text-hermosillo-darkBlue dark:text-white tracking-tighter">
                {texts.pages.replace.title} <span className="text-hermosillo-mediumBlue">{texts.pages.replace.titleHighlight}</span>
            </h1>
            
            <div className="w-full max-w-4xl flex flex-col gap-8">
                
                {/* Inputs Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Input 1: Base File */}
                    <input 
                        type="file" 
                        ref={file1InputRef} 
                        onChange={handleFile1Change} 
                        className="hidden" 
                        accept=".udatasmith"
                    />
                    <button onClick={handleFile1Click} className={`group relative h-48 rounded-2xl border ${file1 ? 'border-hermosillo-mediumBlue bg-hermosillo-mediumBlue/10' : 'border-hermosillo-mediumBlue/30 bg-white/50 dark:bg-[#0a101a]/50'} hover:bg-hermosillo-mediumBlue/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-hermosillo-mediumBlue/10`}>
                        <div className="p-4 rounded-full bg-hermosillo-mediumBlue/10 border border-hermosillo-mediumBlue/30 group-hover:scale-110 transition-transform duration-300">
                            <IconFileType size={32} className="text-hermosillo-mediumBlue" />
                        </div>
                        <div>
                            <span className="block text-xl font-bold text-hermosillo-darkBlue dark:text-white mb-1">
                                {file1 ? file1.name : texts.pages.replace.cards.base.title}
                            </span>
                            <span className="text-xs text-hermosillo-stateBlue uppercase tracking-widest font-bold">{texts.pages.replace.cards.base.subtitle}</span>
                        </div>
                    </button>

                    {/* Input 2: New Standard */}
                    <input 
                        type="file" 
                        ref={file2InputRef} 
                        onChange={handleFile2Change} 
                        className="hidden" 
                        accept=".udatasmith"
                    />
                    <button onClick={handleFile2Click} className={`group relative h-48 rounded-2xl border ${file2 ? 'border-hermosillo-mediumBlue bg-hermosillo-mediumBlue/10' : 'border-hermosillo-mediumBlue/30 bg-white/50 dark:bg-[#0a101a]/50'} hover:bg-hermosillo-mediumBlue/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 backdrop-blur-sm cursor-pointer shadow-lg hover:shadow-hermosillo-mediumBlue/10`}>
                        <div className="p-4 rounded-full bg-hermosillo-mediumBlue/10 border border-hermosillo-mediumBlue/30 group-hover:scale-110 transition-transform duration-300">
                            <IconFileJson size={32} className="text-hermosillo-mediumBlue" />
                        </div>
                        <div>
                            <span className="block text-xl font-bold text-hermosillo-darkBlue dark:text-white mb-1">
                                {file2 ? file2.name : texts.pages.replace.cards.standard.title}
                            </span>
                            <span className="text-xs text-hermosillo-stateBlue uppercase tracking-widest font-bold">{texts.pages.replace.cards.standard.subtitle}</span>
                        </div>
                    </button>
                </div>

                {/* Connection Arrow */}
                <div className="flex justify-center text-hermosillo-mediumBlue/50">
                    <IconArrowDown size={32} className="animate-bounce" />
                </div>

                {/* Filename Input */}
                <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-hermosillo-darkBlue dark:text-white uppercase tracking-wider text-center">
                        {texts.pages.purge.output.label}
                    </label>
                    <input 
                        type="text" 
                        value={outputFilename}
                        onChange={(e) => setOutputFilename(e.target.value)}
                        placeholder={texts.pages.replace.output.placeholder}
                        className="px-4 py-3 rounded-xl border border-hermosillo-mediumBlue/30 bg-white/50 dark:bg-zinc-900/50 text-hermosillo-darkBlue dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-hermosillo-mediumBlue/50 font-mono backdrop-blur-sm text-center"
                    />
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 text-center">{texts.pages.purge.output.help}</span>
                </div>

                {/* Download Action */}
                <button 
                    onClick={handleDownload}
                    disabled={isProcessing}
                    className="group relative w-full h-32 rounded-2xl bg-gradient-to-r from-hermosillo-darkBlue to-hermosillo-mediumBlue hover:brightness-110 transition-all duration-300 flex items-center justify-center gap-6 shadow-xl shadow-hermosillo-mediumBlue/20 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                     <div className="p-4 rounded-full bg-white/10 group-hover:bg-white/20 transition-colors">
                        <IconDownload size={32} className="text-white" />
                     </div>
                     <div className="text-left">
                        <span className="block text-2xl font-bold text-white tracking-widest">
                            {isProcessing ? texts.pages.purge.output.action.processing : texts.pages.purge.output.action.default}
                        </span>
                        <span className="text-xs text-hermosillo-paleBlue uppercase font-bold">{texts.pages.replace.output.action.subtitle}</span>
                     </div>
                </button>

            </div>
        </div>
      </main>
    </div>
  );
};

