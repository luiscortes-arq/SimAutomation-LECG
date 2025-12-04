import React from 'react';
import { motion } from 'framer-motion';
import { FondoHero } from './FondoHero';
import { TituloHero } from './TituloHero';
import { IndicadorDesplazamiento } from './IndicadorDesplazamiento';
import { Insignia } from '../ui/Insignia';
import datos from './datos.json';
import './estilos.css';

export const Hero: React.FC = () => {
  return (
    <section className="hero-seccion">
      <FondoHero />
      
      {/* --- CONTENIDO --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 max-w-7xl w-full"
      >
        <div className="flex flex-col items-center">
          <Insignia texto={datos.insignia} retraso={0.2} />
          <TituloHero />
        </div>
      </motion.div>
      
      <IndicadorDesplazamiento />
    </section>
  );
};
