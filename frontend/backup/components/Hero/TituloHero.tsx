import React from 'react';
import { motion } from 'framer-motion';
import datos from './datos.json';
import './estilos.css';

export const TituloHero: React.FC = () => {
  return (
    <>
      <h1 className="hero-titulo-contenedor">
        <span className="hero-titulo-prefijo">{datos.titulo.prefijo}</span>
        <span className="hero-titulo-principal">
          {datos.titulo.principal}
        </span>
      </h1>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="hero-subtitulo-contenedor"
      >
        <div className="hero-separador"></div>
        <span className="hero-subtitulo-texto">
          {datos.subtitulo}
        </span>
      </motion.div>

      <p className="hero-descripcion">
        {datos.descripcion.inicio} <br/>
        <span className="hero-resalte">{datos.descripcion.resalte1}</span> {datos.descripcion.conector} <span className="hero-resalte">{datos.descripcion.resalte2}</span> {datos.descripcion.fin}
      </p>
    </>
  );
};
