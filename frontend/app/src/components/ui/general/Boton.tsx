import React from 'react';
import { buttons } from '../../../config/buttons';

interface PropiedadesBoton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: keyof typeof buttons.variants;
  tamano?: keyof typeof buttons.sizes;
}

export const Boton: React.FC<PropiedadesBoton> = ({ 
  children, 
  variante = 'primary', 
  tamano = 'md',
  className = '', 
  ...props 
}) => {
  const estilosBase = buttons.base;
  const estiloVariante = buttons.variants[variante] || buttons.variants.primary;
  const estiloTamano = buttons.sizes[tamano] || buttons.sizes.md;

  return (
    <button 
      className={`${estilosBase} ${estiloVariante} ${estiloTamano} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
