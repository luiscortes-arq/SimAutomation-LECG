import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Boton } from '../ui/general/Boton';
import { texts } from '../../config/texts';
import { theme } from '../../config/theme';
import { backgrounds } from '../../config/backgrounds';
import { animations } from '../../config/animations';
import { constants } from '../../config/constants';
import { 
  IconClock, 
  IconZap, 
  IconTrendingUp, 
  IconDollarSign, 
  IconTimer, 
  IconActivity
} from '../../config/icons';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';

export const TablaAhorros: React.FC = () => {
  // State for Tabs: 'cost' or 'time'
  const [activeTab, setActiveTab] = useState<'cost' | 'time'>('cost');

  // Hermosillo Palette Config
  // Hermosillo Palette Config
  const COLORS = {
    manual: theme.colors.hermosillo.red,
    invest: theme.colors.hermosillo.palm,
    auto: theme.colors.hermosillo.darkBlue,
    text: theme.colors.hermosillo.gray,
    grid: theme.charts.grid,
    gold: theme.colors.hermosillo.gold,
    cyan: theme.colors.hermosillo.cyan
  };

  // --- STATE FOR PRODUCTIVITY SIMULATOR ---
  const [simTarget, setSimTarget] = useState(24);

  // --- CONSTANTS ---
  // --- CONSTANTS ---
  const { 
    weeks: WEEKS, 
    manualWeeklyCost: MANUAL_WEEKLY_COST, 
    autoWeeklyCost: AUTO_WEEKLY_COST,
    investmentStart: INVESTMENT_START,
    investmentAddition: INVESTMENT_ADDITION,
    autoStartWeek: AUTO_START_WEEK,
    rateManual: RATE_MANUAL,
    rateAuto: RATE_AUTO
  } = constants.savings;

  const INVESTMENT_TOTAL_PHASE = INVESTMENT_START + INVESTMENT_ADDITION;

  // --- COST CALCULATIONS ---
  const MANUAL_ANNUAL_COST = MANUAL_WEEKLY_COST * WEEKS; 
  const AUTO_ANNUAL_TOTAL = INVESTMENT_TOTAL_PHASE + ((WEEKS - AUTO_START_WEEK) * AUTO_WEEKLY_COST);

  const costData = useMemo(() => {
    const weeklyData = [];
    for (let i = 0; i <= WEEKS; i++) { 
      const week = i;
      const costManual = week * MANUAL_WEEKLY_COST;
      let costAuto = 0;

      if (week <= AUTO_START_WEEK) {
        const progress = week / AUTO_START_WEEK;
        costAuto = INVESTMENT_START + (INVESTMENT_ADDITION * progress);
      } else {
        const operationalWeeks = week - AUTO_START_WEEK;
        costAuto = INVESTMENT_TOTAL_PHASE + (operationalWeeks * AUTO_WEEKLY_COST);
      }

      weeklyData.push({
        week: week,
        label: `${texts.savings.charts.weekPrefix}${week}`, 
        costManual,
        costAuto,
      });
    }
    return weeklyData;
  }, []);

  // --- PRODUCTIVITY CALCULATIONS ---
  const productivityStats = useMemo(() => {
    const weeksManual = Math.ceil(simTarget / RATE_MANUAL);
    const weeksAuto = Math.ceil(simTarget / RATE_AUTO);
    return { weeksManual, weeksAuto, saved: weeksManual - weeksAuto };
  }, [simTarget]);

  const productivityData = useMemo(() => {
    const maxWeeks = Math.max(productivityStats.weeksManual, productivityStats.weeksAuto) + 2;
    const data = [];

    for (let w = 0; w <= maxWeeks; w++) {
        const manualTotal = w * RATE_MANUAL;
        const autoTotal = w * RATE_AUTO;

        data.push({
            week: w,
            manualTotal,
            autoTotal,
            target: simTarget
        });
    }
    return data;
  }, [simTarget, productivityStats]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(texts.formatting.locale, { style: 'currency', currency: texts.formatting.currency, maximumFractionDigits: 0 }).format(value);
  };

  const CustomTooltip = ({ active, payload, label, type }: any) => {
    if (active && payload && payload.length) {
      return (
        <div 
          className="border border-ui-surfaceDark bg-ui-tooltipDark p-4 rounded-none min-w-[180px] shadow-tooltip"
        >
          <div className="flex justify-between items-center mb-3 border-b border-zinc-800 pb-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{label}</span>
            <div className="flex gap-1">
                <div className="w-1 h-1 rounded-full bg-hermosillo-gold animate-pulse"></div>
                <div className="w-1 h-1 rounded-full bg-zinc-700"></div>
            </div>
          </div>
          
          <div className="space-y-2">
            {payload.map((entry: any, idx: number) => (
                <div key={idx} className="flex justify-between items-center gap-4">
                    <span className="text-[10px] uppercase text-zinc-400 font-bold flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: entry.stroke || entry.fill }}></div>
                        {entry.name === 'costAuto' ? texts.savings.tooltips.automated : entry.name === 'costManual' ? texts.savings.tooltips.manual : entry.name === 'autoTotal' ? texts.savings.tooltips.velocityAuto : texts.savings.tooltips.velocityManual}
                    </span>
                    <span className="text-xs font-mono font-bold text-white">
                        {type === 'currency' ? formatCurrency(entry.value) : entry.value}
                    </span>
                </div>
            ))}
          </div>
          
          {type === 'currency' && payload[0].payload.week <= AUTO_START_WEEK && (
               <div className="mt-3 py-1 px-2 bg-hermosillo-palm/10 border border-hermosillo-palm/20 text-[9px] text-hermosillo-palm text-center font-mono uppercase">
                   {texts.savings.tooltips.implementationPhase}
               </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <section className="h-full w-full bg-zinc-50 dark:bg-ui-backgroundDark flex flex-col items-center justify-start py-8 relative overflow-y-auto transition-colors duration-500 scroll-smooth">
      
      {/* --- ULTRA PREMIUM BACKGROUND --- */}
      <div 
        className={`absolute inset-0 pointer-events-none ${backgrounds.grid.ultraPremium.className}`} 
        style={{ 
          backgroundImage: backgrounds.grid.ultraPremium.backgroundImage,
          backgroundSize: backgrounds.grid.ultraPremium.backgroundSize
        }} 
      />

      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col gap-8 pb-24 relative z-10">
        
        {/* --- HEADER --- */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end w-full relative">
            <div className="text-left mb-6 md:mb-0 max-w-xl z-10">
                <div className="flex items-center gap-2 mb-2">
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-hermosillo-darkBlue dark:text-white tracking-tighter mb-2">
                    {texts.savings.title} <span className="text-hermosillo-red">{texts.savings.titleHighlight}</span>
                </h2>
            </div>

            <div className="flex justify-start md:justify-end w-full md:w-auto">
                <div className="bg-white/90 dark:bg-ui-surfaceDark/90 backdrop-blur-xl border border-zinc-200 dark:border-charts-grid p-1 rounded-full flex gap-1 shadow-lg">
                    <div onClick={() => setActiveTab('cost')}>
                        <Boton
                            variante="ghost"
                            className={`relative z-10 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-2 cursor-pointer border-none bg-transparent hover:bg-transparent ${
                                activeTab === 'cost' 
                                ? 'text-white' 
                                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                            }`}
                        >
                            <IconDollarSign size={12} />
                            {texts.savings.tabs.cost}
                            {activeTab === 'cost' && (
                                <motion.div
                                    layoutId="tab-bg"
                                    className="absolute inset-0 bg-hermosillo-darkBlue rounded-full -z-10 shadow-lg"
                                    transition={animations.transition.springSubtle}
                                />
                            )}
                        </Boton>
                    </div>

                    <div onClick={() => setActiveTab('time')}>
                        <Boton
                            variante="ghost"
                            className={`relative z-10 px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-[0.15em] transition-all duration-300 flex items-center gap-2 cursor-pointer border-none bg-transparent hover:bg-transparent ${
                                activeTab === 'time' 
                                ? 'text-white' 
                                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                            }`}
                        >
                            <IconTimer size={12} />
                            {texts.savings.tabs.time}
                            {activeTab === 'time' && (
                                <motion.div
                                    layoutId="tab-bg"
                                    className="absolute inset-0 bg-hermosillo-palm rounded-full -z-10 shadow-lg"
                                    transition={animations.transition.springSubtle}
                                />
                            )}
                        </Boton>
                    </div>
                </div>
            </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-white/10 to-transparent my-2"></div>

        <AnimatePresence mode="wait">
            {activeTab === 'cost' ? (
                <motion.div
                    key="cost"
                    variants={animations.variants.fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={animations.transition.default}
                    className="w-full space-y-8"
                >
                    {/* --- CHART SECTION (HUD STYLE) --- */}
                    <div className="relative group">
                        {/* Status Bar */}
                        <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 dark:bg-white/5 border-b border-zinc-200 dark:border-white/5 flex justify-between items-center px-4 z-20 rounded-t-xl">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{texts.savings.charts.projection}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-hermosillo-red"></div>
                                    <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{texts.savings.charts.manual}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-hermosillo-darkBlue shadow-chart"></div>
                                    <span className="text-[9px] font-bold text-hermosillo-darkBlue dark:text-white uppercase tracking-wider">{texts.savings.charts.auto}</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[450px] bg-white dark:bg-ui-cardDark rounded-xl border border-zinc-200 dark:border-white/10 pt-14 pb-4 px-4 shadow-xl">
                             <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={costData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorCostAuto" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={COLORS.auto} stopOpacity={0.5}/>
                                            <stop offset="95%" stopColor={COLORS.auto} stopOpacity={0}/>
                                        </linearGradient>
                                        <linearGradient id="colorCostManual" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor={COLORS.manual} stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor={COLORS.manual} stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="2 4" stroke={COLORS.grid} opacity={0.15} vertical={false} />
                                    <XAxis dataKey="label" stroke={COLORS.text} fontSize={10} tickLine={false} axisLine={false} dy={10} minTickGap={30} fontFamily="monospace" />
                                    <YAxis stroke={COLORS.text} fontSize={10} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value/1000}k`} fontFamily="monospace" />
                                    <Tooltip content={<CustomTooltip type="currency" />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeWidth: 1 }} />
                                    <Area type="monotone" dataKey="costManual" stroke={COLORS.manual} strokeWidth={2} fill="url(#colorCostManual)" />
                                    <Area type="monotone" dataKey="costAuto" stroke={COLORS.auto} strokeWidth={3} fill="url(#colorCostAuto)" />
                                    <ReferenceLine x={`S${AUTO_START_WEEK}`} stroke={COLORS.invest} strokeDasharray="3 3" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* --- TABLE SECTION (DATA CARDS) --- */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="bg-white dark:bg-ui-cardDark rounded-xl border border-zinc-200 dark:border-white/10 overflow-hidden shadow-sm">
                             {/* Header */}
                             <div className="grid grid-cols-12 border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/50 py-3 px-6">
                                 <div className="col-span-4 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{texts.savings.table.component}</div>
                                 <div className="col-span-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">{texts.savings.table.current}</div>
                                 <div className="col-span-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-right">{texts.savings.table.investment}</div>
                                 <div className="col-span-3 text-[10px] font-bold text-hermosillo-darkBlue dark:text-hermosillo-stateBlue uppercase tracking-widest text-right">{texts.savings.table.auto}</div>
                             </div>
                             
                             {/* Rows */}
                             <div className="divide-y divide-zinc-100 dark:divide-white/5">
                                 {/* Row 1 */}
                                 <div className="grid grid-cols-12 py-4 px-6 items-center hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                     <div className="col-span-4 flex flex-col">
                                         <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">{texts.savings.table.rows.hr.title}</span>
                                         <span className="text-[10px] text-zinc-400">{texts.savings.table.rows.hr.subtitle}</span>
                                     </div>
                                     <div className="col-span-3 text-right font-mono text-xs text-zinc-600 dark:text-zinc-400">{texts.savings.table.rows.hr.manual}</div>
                                     <div className="col-span-2 text-right font-mono text-xs text-zinc-600 dark:text-zinc-400">{texts.savings.table.rows.hr.invest}</div>
                                     <div className="col-span-3 text-right font-mono text-xs font-bold text-hermosillo-darkBlue dark:text-white">{texts.savings.table.rows.hr.auto}</div>
                                 </div>

                                 {/* Row 2 */}
                                 <div className="grid grid-cols-12 py-4 px-6 items-center hover:bg-zinc-50/50 dark:hover:bg-white/[0.02] transition-colors">
                                     <div className="col-span-4 flex flex-col">
                                         <span className="text-sm font-bold text-zinc-700 dark:text-zinc-200">{texts.savings.table.rows.opCost.title}</span>
                                         <span className="text-[10px] text-zinc-400">{texts.savings.table.rows.opCost.subtitle}</span>
                                     </div>
                                     <div className="col-span-3 text-right font-mono text-sm text-hermosillo-red/80">{formatCurrency(MANUAL_WEEKLY_COST)}</div>
                                     <div className="col-span-2 text-right font-mono text-xs text-zinc-500">-</div>
                                     <div className="col-span-3 text-right">
                                         <div className="inline-block bg-hermosillo-darkBlue/10 dark:bg-hermosillo-stateBlue/10 px-2 py-1 rounded text-hermosillo-darkBlue dark:text-hermosillo-stateBlue font-mono text-sm font-bold border border-hermosillo-darkBlue/20">
                                            {formatCurrency(AUTO_WEEKLY_COST)}
                                         </div>
                                     </div>
                                 </div>

                                 {/* Total Row */}
                                 <div className="grid grid-cols-12 py-5 px-6 items-center bg-zinc-50 dark:bg-white/[0.03]">
                                     <div className="col-span-4">
                                         <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white flex items-center gap-2">
                                             {texts.savings.table.rows.total} <IconTrendingUp size={14} className="text-hermosillo-gold"/>
                                         </span>
                                     </div>
                                     <div className="col-span-3 text-right">
                                         <span className="block font-mono text-base text-zinc-500 line-through decoration-hermosillo-red/50 decoration-2">{formatCurrency(MANUAL_ANNUAL_COST)}</span>
                                     </div>
                                     <div className="col-span-2 text-right">
                                         <span className="block font-mono text-xs text-hermosillo-palm">{formatCurrency(INVESTMENT_TOTAL_PHASE)}</span>
                                     </div>
                                     <div className="col-span-3 text-right">
                                         <span className="block font-mono text-xl font-bold text-hermosillo-darkBlue dark:text-white">{formatCurrency(AUTO_ANNUAL_TOTAL)}</span>
                                     </div>
                                 </div>
                             </div>
                        </div>
                    </div>
                </motion.div>
            ) : (
                <motion.div
                    key="time"
                    variants={animations.variants.fadeInUp}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={animations.transition.default}
                    className="w-full space-y-6"
                >
                    {/* --- GRID LAYOUT: CONTROLS & KPIs --- */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        
                        {/* 1. Control Panel (Left) */}
                        <div className="lg:col-span-4 bg-white dark:bg-ui-cardDark border border-zinc-200 dark:border-white/10 p-6 rounded-xl shadow-lg relative overflow-hidden flex flex-col justify-between">
                            {/* Header */}
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded">
                                        <IconActivity size={14} className="text-zinc-600 dark:text-zinc-400" />
                                    </div>
                                    <span className="text-[10px] font-bold uppercase text-zinc-500 tracking-widest">
                                        {texts.savings.kpi.simulationParams}
                                    </span>
                                </div>
                                <div className="mb-6">
                                    <label className="text-xs text-zinc-400 mb-1 block">{texts.savings.kpi.targetVolume}</label>
                                    <div className="text-5xl font-mono font-bold text-zinc-900 dark:text-white tracking-tighter">
                                        {simTarget}
                                    </div>
                                </div>
                            </div>

                            {/* Slider */}
                            <div className="relative">
                                <div className="flex justify-between text-[9px] font-mono text-zinc-500 mb-2 uppercase tracking-wider">
                                    <span>{texts.savings.charts.min}: 5</span>
                                    <span>{texts.savings.charts.max}: 100</span>
                                </div>
                                <div className="relative h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden mb-2">
                                     <motion.div 
                                        className="absolute top-0 left-0 h-full bg-hermosillo-palm"
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(simTarget / 100) * 100}%` }}
                                     />
                                </div>
                                <input 
                                    type="range" 
                                    min="5" 
                                    max="100" 
                                    step="1"
                                    value={simTarget} 
                                    onChange={(e) => setSimTarget(parseInt(e.target.value))}
                                    className="w-full h-8 absolute top-0 opacity-0 cursor-pointer"
                                />
                                <div className="text-[9px] text-zinc-400 text-center">{texts.savings.kpi.dragToSimulate}</div>
                            </div>
                        </div>

                        {/* 2. KPI Cards (Right) */}
                        <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* KPI 1 */}
                            <div className="bg-white dark:bg-ui-cardDark border border-zinc-200 dark:border-white/10 p-6 rounded-xl flex flex-col justify-between hover:border-hermosillo-red/50 transition-colors">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[9px] uppercase font-bold text-zinc-400 tracking-widest">{texts.savings.kpi.manualTime}</span>
                                    <IconClock size={14} className="text-zinc-500" />
                                </div>
                                <div>
                                    <div className="text-3xl font-mono font-bold text-zinc-700 dark:text-zinc-200">
                                        {productivityStats.weeksManual}
                                    </div>
                                    <span className="text-[10px] text-zinc-400 uppercase">{texts.savings.kpi.weeksRequired}</span>
                                </div>
                                <div className="mt-4 h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-hermosillo-red w-full opacity-50"></div>
                                </div>
                            </div>

                            {/* KPI 2 */}
                            <div className="bg-white dark:bg-ui-cardDark border border-zinc-200 dark:border-white/10 p-6 rounded-xl flex flex-col justify-between hover:border-hermosillo-palm/50 transition-colors relative overflow-hidden">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[9px] uppercase font-bold text-hermosillo-palm tracking-widest">{texts.savings.kpi.autoTime}</span>
                                    <IconZap size={14} className="text-hermosillo-palm" />
                                </div>
                                <div>
                                    <div className="text-3xl font-mono font-bold text-zinc-900 dark:text-white">
                                        {productivityStats.weeksAuto}
                                    </div>
                                    <span className="text-[10px] text-zinc-400 uppercase">{texts.savings.kpi.weeksRequired}</span>
                                </div>
                                <div className="mt-4 h-1 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-hermosillo-palm w-[33%]"></div>
                                </div>
                            </div>

                            {/* KPI 3 */}
                            <div className="bg-gradient-to-br from-hermosillo-gold to-orange-500 p-6 rounded-xl flex flex-col justify-between text-white shadow-lg relative overflow-hidden">
                                <div className="absolute -right-4 -top-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
                                <div className="flex justify-between items-start mb-2 relative z-10">
                                    <span className="text-[9px] uppercase font-bold text-white/80 tracking-widest">{texts.savings.kpi.efficiencyGain}</span>
                                    <IconTrendingUp size={14} className="text-white" />
                                </div>
                                <div className="relative z-10">
                                    <div className="text-3xl font-mono font-bold">
                                        +{productivityStats.saved}
                                    </div>
                                    <span className="text-[10px] text-white/70 uppercase">{texts.savings.kpi.weeksSaved}</span>
                                </div>
                                <div className="mt-4 flex items-center gap-2 relative z-10">
                                     <div className="text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded text-white">{texts.savings.kpi.roi}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* --- CHART SECTION (HUD STYLE) --- */}
                    <div className="relative group">
                         {/* Status Bar */}
                         <div className="absolute top-0 left-0 right-0 h-10 bg-white/5 dark:bg-white/5 border-b border-zinc-200 dark:border-white/5 flex justify-between items-center px-4 z-20 rounded-t-xl">
                            <div className="flex items-center gap-3">
                                <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 uppercase tracking-widest">{texts.savings.charts.velocity}</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-sm bg-hermosillo-red"></div>
                                    <span className="text-[9px] font-bold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">{texts.savings.charts.pendingManual}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-hermosillo-auto"></div>
                                    <span className="text-[9px] font-bold text-hermosillo-darkBlue dark:text-white uppercase tracking-wider">{texts.savings.charts.velocityAuto}</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-[400px] bg-white dark:bg-ui-cardDark rounded-xl border border-zinc-200 dark:border-white/10 pt-14 pb-4 px-4 shadow-xl relative">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={productivityData} margin={{ top: 20, right: 30, left: 10, bottom: 10 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke={COLORS.grid} opacity={0.1} vertical={false} />
                                    <XAxis 
                                        dataKey="week" 
                                        stroke={COLORS.text} 
                                        fontSize={10} 
                                        axisLine={false} 
                                        tickLine={false}
                                        tickMargin={10}
                                        fontFamily="monospace"
                                    />
                                    <YAxis 
                                        stroke={COLORS.text} 
                                        fontSize={10} 
                                        axisLine={false} 
                                        tickLine={false}
                                        fontFamily="monospace"
                                    />
                                    <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.1)', strokeWidth: 1 }} />
                                    
                                    <ReferenceLine 
                                        y={simTarget} 
                                        stroke={COLORS.gold} 
                                        strokeDasharray="4 4" 
                                        strokeWidth={1}
                                        label={{ value: texts.savings.charts.target, position: 'insideTopRight', fill: COLORS.gold, fontSize: 9, fontFamily: 'monospace' }} 
                                    />

                                    <Line 
                                        type="stepAfter" 
                                        dataKey="manualTotal" 
                                        stroke={COLORS.manual} 
                                        strokeWidth={2} 
                                        dot={false}
                                        strokeDasharray="4 4"
                                    />
                                    <Line 
                                        type="monotone" 
                                        dataKey="autoTotal" 
                                        stroke={COLORS.auto} 
                                        strokeWidth={3} 
                                        dot={{ r: 0 }}
                                        activeDot={{ r: 6, fill: COLORS.auto, stroke: theme.charts.activeDotStroke, strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
};
