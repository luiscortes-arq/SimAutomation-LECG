import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IconRefreshCw, IconLayoutGrid, IconReplace, IconCheck } from '../../config/icons';
import { texts } from '../../config/texts';
import { theme } from '../../config/theme';
import { animations } from '../../config/animations';
import { Boton } from '../ui/general/Boton';

interface GridItem {
  id: string;
  color: string;
  code: string;
  prefix: string;
}

// Updated to match the specific Hermosillo Palette
// Updated to match the specific Hermosillo Palette
const PALETTE_CONFIG = [
  { hex: theme.colors.hermosillo.gold, prefix: 'GLD' }, // Goldenrod PMS 7409C
  { hex: theme.colors.hermosillo.palm, prefix: 'PLM' }, // Palm PMS 7490
  { hex: theme.colors.hermosillo.wine, prefix: 'WIN' }, // Wine PMS 525
  { hex: theme.colors.hermosillo.taupe, prefix: 'TAU' }, // Taupe PMS 438
  { hex: theme.colors.hermosillo.seaweed, prefix: 'SEA' }, // Seaweed PMS 5473C
  { hex: theme.colors.hermosillo.red, prefix: 'RED' }, // Warm Red PMS 711
];

export const DemostracionAntesDespues: React.FC = () => {
  const [gridItems, setGridItems] = useState<GridItem[]>([]);
  const [isReplaced, setIsReplaced] = useState(false);

  // Generate the full set of 48 items (8 per color)
  const generateBaseItems = () => {
    let items: GridItem[] = [];
    PALETTE_CONFIG.forEach(config => {
      for (let i = 1; i <= 8; i++) {
        // Pads number with 0 (e.g., 01, 02)
        const num = i.toString().padStart(2, '0');
        const code = `${config.prefix}-${num}`;
        items.push({
          id: code, // Unique ID used for key and layoutId
          color: config.hex,
          code: code,
          prefix: config.prefix
        });
      }
    });
    return items;
  };

  // MASTER RESET: Randomize & Reset State
  const handleCurrentProcess = () => {
    const items = generateBaseItems();
    // Fisher-Yates shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    setGridItems(items);
    setIsReplaced(false); // Reset to rectangles/raw data
  };

  // Sort Logic: Vertical Stripes
  const sortGrid = () => {
    const items = generateBaseItems(); // Get fresh sorted base items
    
    // Group items by prefix for easier access
    const groups: { [key: string]: GridItem[] } = {};
    PALETTE_CONFIG.forEach(p => groups[p.prefix] = []);
    
    items.forEach(item => {
        if(groups[item.prefix]) {
            groups[item.prefix].push(item);
        }
    });

    // Ensure groups are sorted by code (01 to 08)
    Object.keys(groups).forEach(key => {
        groups[key].sort((a, b) => a.code.localeCompare(b.code));
    });

    const sortedGrid: GridItem[] = [];
    
    // We have 48 slots in a 6-column grid.
    for (let i = 0; i < 48; i++) {
       const colIndex = i % 6; // 0 to 5
       const prefix = PALETTE_CONFIG[colIndex].prefix;
       
       // Take the next item from the specific color group
       const item = groups[prefix].shift();
       if (item) {
           sortedGrid.push(item);
       }
    }
    
    setGridItems(sortedGrid);
  };

  const toggleReplace = () => {
    setIsReplaced(prev => !prev);
  };

  // Initial load
  useEffect(() => {
    handleCurrentProcess();
  }, []);

  return (
    <section className="h-full w-full bg-zinc-100 dark:bg-[#09090b] flex flex-col items-center justify-center px-6 relative transition-colors duration-1000 overflow-hidden">
      
      {/* --- BACKGROUND: SPOTLIGHT EFFECT --- */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8),transparent_70%)] dark:bg-[radial-gradient(circle_at_center,rgba(30,30,35,1),transparent_80%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none mix-blend-overlay"></div>
      
      <motion.div 
        className="text-center mb-10 relative z-20"
        initial="initial"
        whileInView="animate"
        variants={animations.variants.fadeInUp}
        transition={animations.transition.expo}
      >
         <h2 className="text-4xl md:text-7xl font-black mb-4 text-hermosillo-darkBlue dark:text-white tracking-tighter drop-shadow-lg">
           {texts.demo.title} <span className="text-hermosillo-gold">{texts.demo.titleHighlight}</span>
         </h2>
         <p className="text-hermosillo-gray dark:text-zinc-400 text-sm md:text-lg max-w-lg mx-auto font-light tracking-wide">
            {texts.demo.subtitle}
         </p>
      </motion.div>

      {/* Control Bar - Premium Floating Glass */}
      <motion.div 
        className="flex gap-2 sm:gap-4 justify-center items-center flex-wrap relative z-30 mb-8 p-2 rounded-full bg-white/50 dark:bg-zinc-900/50 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
        initial="initial"
        whileInView="animate"
        variants={animations.variants.scaleUpSmall}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <Boton 
            onClick={handleCurrentProcess}
            variante="ghost"
            className="text-xs font-bold uppercase tracking-wider group"
        >
            <IconRefreshCw size={14} className="group-hover:rotate-180 transition-transform duration-700 ease-in-out" />
            <span className="hidden sm:inline">{texts.demo.actions.reset}</span>
        </Boton>
        
        <div className="w-px h-6 bg-zinc-300 dark:bg-white/10" />

        <Boton 
            onClick={sortGrid}
            variante="primary"
            className="bg-hermosillo-darkBlue hover:bg-hermosillo-mediumBlue text-xs font-bold uppercase tracking-wider shadow-md shadow-hermosillo-darkBlue/20"
        >
            <IconLayoutGrid size={14} />
            <span>{texts.demo.actions.sort}</span>
        </Boton>

        <Boton 
            onClick={toggleReplace}
            variante={isReplaced ? 'success' : 'outline'}
            className={`text-xs font-bold uppercase tracking-wider shadow-md transition-all duration-500 ${
              !isReplaced ? 'bg-zinc-100 border-zinc-200 text-hermosillo-gray hover:bg-zinc-200 dark:bg-black/50 dark:border-white/10 dark:text-white' : 'shadow-hermosillo-palm/30'
            }`}
        >
            {isReplaced ? <IconCheck size={14} /> : <IconReplace size={14} />}
            <span>
              {texts.demo.actions.replace}
            </span>
        </Boton>
      </motion.div>

      {/* PREMIUM GRID CONTAINER - Frosted Glass Box with Rim Light */}
      <div className="relative w-full max-w-5xl aspect-[16/10] md:aspect-[21/9] rounded-[2.5rem] p-[2px] bg-gradient-to-b from-white/60 to-transparent dark:from-white/10 dark:to-transparent shadow-2xl z-10">
        
        {/* Inner Frame */}
        <div className="relative w-full h-full rounded-[2.4rem] overflow-hidden bg-zinc-100 dark:bg-[#030303] shadow-inner">
           
           {/* Technical Background Grid Pattern INSIDE container */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
           
           {/* Content Wrapper */}
           <div className="absolute inset-0 flex items-center justify-center p-6 md:p-12">
              <div className="w-full h-full grid grid-cols-6 gap-3 sm:gap-4">
                  {gridItems.map((item, i) => {
                    const col = i % 6;
                    const row = Math.floor(i / 6);
                    const waveDelay = (col + row) * 0.05; 

                    return (
                        <div 
                            key={item.id} 
                            className="flex items-center justify-center relative"
                            style={{ perspective: '1000px' }} 
                        >
                            <motion.div 
                                layout 
                                layoutId={item.id}
                                initial={false}
                                animate={{ 
                                    rotateX: isReplaced ? 180 : 0, 
                                    rotateZ: isReplaced ? 0 : 0,
                                    borderRadius: isReplaced ? "99px" : "6px",
                                    scale: isReplaced ? 0.75 : 1,
                                    backgroundColor: isReplaced ? item.color : `${item.color}`, 
                                    borderColor: 'transparent',
                                }}
                                whileHover={{ 
                                    scale: isReplaced ? 0.9 : 1.1,
                                    zIndex: 100,
                                    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.3)",
                                    transition: { duration: 0.2, ease: "easeOut" }
                                }}
                                whileTap={{ 
                                    scale: isReplaced ? 0.85 : 0.95,
                                    transition: { duration: 0.1 }
                                }}
                                transition={{ 
                                    type: "spring",
                                    stiffness: 35,
                                    damping: 15,
                                    mass: 1.2,
                                    delay: waveDelay 
                                }}
                                className="w-full h-full flex items-center justify-center relative cursor-pointer group shadow-sm ring-1 ring-white/10 dark:ring-white/5"
                                style={{
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                            {/* Inner Content with Backface Visibility */}
                            <div 
                                className="flex items-center justify-center w-full h-full absolute inset-0 backface-hidden"
                                style={{ 
                                    backfaceVisibility: 'visible',
                                    transform: isReplaced ? 'rotateX(180deg)' : 'none'
                                }} 
                            >
                                {isReplaced ? (
                                // Replaced State
                                <div className="flex flex-col items-center justify-center">
                                    <span 
                                        className="text-[8px] sm:text-[10px] font-mono font-bold tracking-tight text-white/90"
                                    >
                                        {item.code}
                                    </span>
                                </div>
                                ) : (
                                // Raw State
                                <div className="relative w-full h-full flex items-center justify-center">
                                    {/* Hover content: Code Reveal */}
                                    <div className="flex flex-col items-center justify-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                        <span className="text-[10px] font-mono font-bold text-white tracking-widest drop-shadow-md">
                                            {item.prefix}
                                        </span>
                                    </div>
                                </div>
                                )}
                            </div>
                            
                            {/* Premium Gloss Reflection */}
                            {!isReplaced && (
                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none" />
                            )}
                            </motion.div>
                        </div>
                    );
                  })}
              </div>
           </div>
           
           {/* Reflection Overlay on Glass Container */}
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-[2.4rem] z-30 mix-blend-overlay" />
        </div>
      </div>
    </section>
  );
};
