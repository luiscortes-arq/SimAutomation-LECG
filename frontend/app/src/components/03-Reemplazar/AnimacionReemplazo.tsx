import React from 'react';
import { motion } from 'framer-motion';
import { TarjetaFlotante } from './TarjetaFlotante';
import { BarraProgreso } from './BarraProgreso';
import datos from './datos.json';
import './estilos.css';

export const AnimacionReemplazo: React.FC = () => {
  return (
    <div className="reemplazo-animacion-contenedor">
        <TarjetaFlotante>
            <div className="reemplazo-tarjeta-header">
                <div className="reemplazo-id-contenedor">
                        <div className="reemplazo-punto-pulso"></div>
                        <span className="reemplazo-id-texto">{datos.animacion.id}</span>
                </div>
                <div className="reemplazo-etiqueta-modo">{datos.animacion.modo}</div>
            </div>
            
            <div className="space-y-8 relative">
                    {/* Línea de conexión */}
                    <div className="reemplazo-linea-conexion"></div>

                <div className="reemplazo-item-activo">
                    <span className="reemplazo-texto-legacy">{datos.animacion.legacy}</span>
                    <motion.div 
                        className="w-6 h-6 rounded-full bg-white dark:bg-black border border-hermosillo-mediumBlue flex items-center justify-center shadow-lg z-20"
                        animate={{ boxShadow: ["0 0 0px rgba(63,97,131,0)", "0 0 20px rgba(63,97,131,0.5)", "0 0 0px rgba(63,97,131,0)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <div className="w-1.5 h-1.5 bg-hermosillo-mediumBlue rounded-full"></div>
                    </motion.div>
                    <span className="reemplazo-texto-core">{datos.animacion.core}</span>
                </div>
                    <div className="reemplazo-item-inactivo">
                    <span className="reemplazo-texto-mono">{datos.animacion.structOld}</span>
                    <div className="reemplazo-punto-conector"></div>
                    <span className="reemplazo-texto-mono">{datos.animacion.structNew}</span>
                </div>
                    <div className="reemplazo-item-oculto">
                    <span className="reemplazo-texto-mono">{datos.animacion.cad}</span>
                    <div className="reemplazo-punto-conector"></div>
                    <span className="reemplazo-texto-mono">{datos.animacion.bim}</span>
                </div>
            </div>

            <BarraProgreso />
        </TarjetaFlotante>
    </div>
  );
};
