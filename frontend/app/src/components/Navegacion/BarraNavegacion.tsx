import React, { useState, useEffect, useRef } from 'react';
import { Home } from 'lucide-react';
import { Logo } from '../ui/Logo';
import { EnlaceNavegacion } from './EnlaceNavegacion';
import { BotonTema } from './BotonTema';
import { BotonVolver } from './BotonVolver';

interface PropiedadesBarraNavegacion {
  esModoOscuro: boolean;
  alternarTema: () => void;
  vistaActual: 'home' | 'sorting' | 'replacing';
  alNavegar: (vista: 'home' | 'sorting' | 'replacing') => void;
}

export const BarraNavegacion: React.FC<PropiedadesBarraNavegacion> = ({ 
  esModoOscuro, 
  alternarTema, 
  vistaActual,
  alNavegar 
}) => {
  const [estaOculto, setEstaOculto] = useState(false);
  const referenciaTemporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  const iniciarTemporizadorOcultar = () => {
    if (referenciaTemporizador.current) clearTimeout(referenciaTemporizador.current);
    referenciaTemporizador.current = setTimeout(() => {
      setEstaOculto(true);
    }, 2000);
  };

  const mostrarBarraNavegacion = () => {
    setEstaOculto(false);
    if (referenciaTemporizador.current) clearTimeout(referenciaTemporizador.current);
  };

  useEffect(() => {
    // Iniciar temporizador al montar
    iniciarTemporizadorOcultar();
    return () => {
      if (referenciaTemporizador.current) clearTimeout(referenciaTemporizador.current);
    };
  }, []);
  
  const manejarDesplazamiento = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (vistaActual !== 'home') {
      alNavegar('home');
      // Dar tiempo para cambiar de vista antes de desplazarse
      setTimeout(() => {
        const elemento = document.getElementById(id);
        if (elemento) elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      const elemento = document.getElementById(id);
      if (elemento) elemento.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <div 
        className={`fixed top-0 left-0 w-full h-24 z-[60] bg-transparent ${estaOculto ? 'pointer-events-auto' : 'pointer-events-none'}`}
        onMouseEnter={mostrarBarraNavegacion}
      />

      <nav 
        onMouseEnter={mostrarBarraNavegacion}
        onMouseLeave={iniciarTemporizadorOcultar}
        className={`fixed top-0 z-50 w-full bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 transition-transform duration-500 ease-in-out ${estaOculto ? '-translate-y-full' : 'translate-y-0'}`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Sección Logo */}
          <div className="flex items-center gap-6">
             <Logo onClick={() => alNavegar('home')} />
          </div>

          <div className="flex items-center gap-8">
            {/* Enlaces de Navegación - Siempre Visibles */}
            <div className="hidden sm:flex items-center gap-8">
              <EnlaceNavegacion href="#sorting" texto="Purge" onClick={(e) => manejarDesplazamiento(e, 'sorting')} />
              {vistaActual === 'home' ? (
                 <a 
                   href="#home" 
                   onClick={(e) => manejarDesplazamiento(e, 'home')}
                   className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10 transition-colors cursor-pointer" 
                   aria-label="Inicio"
                 >
                   <Home size={18} className="text-zinc-900 dark:text-zinc-400" />
                 </a>
              ) : (
                 <BotonVolver alNavegar={() => alNavegar('home')} />
              )}
              <EnlaceNavegacion href="#replacing" texto="Replace" onClick={(e) => manejarDesplazamiento(e, 'replacing')} />
              <EnlaceNavegacion href="#demo" texto="Demo" onClick={(e) => manejarDesplazamiento(e, 'demo')} />
              <EnlaceNavegacion href="#savings" texto="Ahorros" onClick={(e) => manejarDesplazamiento(e, 'savings')} />
            </div>

            {/* Alternar Tema - Siempre Visible */}
            <BotonTema esModoOscuro={esModoOscuro} alternarTema={alternarTema} />
          </div>
        </div>
      </nav>
    </>
  );
};
