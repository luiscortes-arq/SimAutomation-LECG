import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DollarSign, Timer } from 'lucide-react';
import { useCalculosSimulacion } from './hooks/useCalculosSimulacion';
import { GraficoCostos } from './componentes/GraficoCostos';
import { TablaDatos } from './componentes/TablaDatos';
import { PanelControl } from './componentes/PanelControl';
import { TarjetasKPI } from './componentes/TarjetasKPI';
import { GraficoTiempos } from './componentes/GraficoTiempos';
import datos from './datos.json';
import './estilos.css';

export const TablaAhorros: React.FC = () => {
  const [pestanaActiva, setPestanaActiva] = useState<'costos' | 'tiempos'>('costos');
  const [objetivoSimulacion, setObjetivoSimulacion] = useState(24);
  
  const { 
    datosCostos, 
    estadisticasProductividad, 
    datosProductividad, 
    formatearMoneda 
  } = useCalculosSimulacion(objetivoSimulacion);

  return (
    <section className="tabla-ahorros-seccion">
      
      {/* --- FONDO ULTRA PREMIUM --- */}
      <div className="tabla-ahorros-fondo"></div>

      <div className="tabla-ahorros-contenido">
        
        {/* --- ENCABEZADO --- */}
        <div className="tabla-ahorros-encabezado">
            <div className="tabla-ahorros-titulo-contenedor">
                <div className="flex items-center gap-2 mb-2">
                </div>
                <h2 className="tabla-ahorros-titulo">
                    {datos.tituloPrincipal} <span className="tabla-ahorros-titulo-destacado">{datos.tituloDestacado}</span>
                </h2>
            </div>

            <div className="tabla-ahorros-controles">
                <div className="tabla-ahorros-grupo-botones">
                    <button
                        onClick={() => setPestanaActiva('costos')}
                        className={`tabla-ahorros-boton ${
                            pestanaActiva === 'costos' 
                            ? 'tabla-ahorros-boton-activo' 
                            : 'tabla-ahorros-boton-inactivo'
                        }`}
                    >
                        <DollarSign size={12} />
                        {datos.pestanas.costos}
                        {pestanaActiva === 'costos' && (
                            <motion.div
                                layoutId="fondo-pestana"
                                className="absolute inset-0 bg-hermosillo-darkBlue rounded-full -z-10 shadow-lg"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>

                    <button
                        onClick={() => setPestanaActiva('tiempos')}
                        className={`tabla-ahorros-boton ${
                            pestanaActiva === 'tiempos' 
                            ? 'tabla-ahorros-boton-activo' 
                            : 'tabla-ahorros-boton-inactivo'
                        }`}
                    >
                        <Timer size={12} />
                        {datos.pestanas.tiempos}
                        {pestanaActiva === 'tiempos' && (
                            <motion.div
                                layoutId="fondo-pestana"
                                className="absolute inset-0 bg-hermosillo-palm rounded-full -z-10 shadow-lg"
                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                            />
                        )}
                    </button>
                </div>
            </div>
        </div>

        <div className="tabla-ahorros-separador"></div>

        <AnimatePresence mode="wait">
            {pestanaActiva === 'costos' ? (
                <motion.div
                    key="costos"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full space-y-8"
                >
                    <GraficoCostos datos={datosCostos} formatearMoneda={formatearMoneda} />
                    <TablaDatos formatearMoneda={formatearMoneda} />
                </motion.div>
            ) : (
                <motion.div
                    key="tiempos"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="w-full space-y-6"
                >
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        <PanelControl objetivoSimulacion={objetivoSimulacion} setObjetivoSimulacion={setObjetivoSimulacion} />
                        <TarjetasKPI estadisticas={estadisticasProductividad} />
                    </div>
                    <GraficoTiempos datos={datosProductividad} objetivoSimulacion={objetivoSimulacion} />
                </motion.div>
            )}
        </AnimatePresence>
      </div>
    </section>
  );
};
