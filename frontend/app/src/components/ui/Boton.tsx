import React from 'react';

interface PropiedadesBoton extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variante?: 'primario' | 'secundario';
}

export const Boton: React.FC<PropiedadesBoton> = ({ 
  children, 
  variante = 'primario', 
  className = '', 
  ...props 
}) => {
  const estilosBase = "rounded-full px-6 py-2 font-medium transition-all duration-300 transform active:scale-95";
  const variantes = {
    primario: "bg-[#2997ff] text-white hover:bg-[#0077ED]",
    secundario: "bg-[#1d1d1f] text-[#2997ff] border border-[#2997ff] hover:bg-[#2997ff] hover:text-white"
  };

  return (
    <button 
      className={`${estilosBase} ${variantes[variante]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

