import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { CaracteristicaReemplazo } from '../components/CaracteristicaReemplazo';
import { CaracteristicaOrdenamiento } from '../components/CaracteristicaOrdenamiento';
import { BarraNavegacion } from '../components/Navegacion/BarraNavegacion';
import { PieDePagina } from '../components/PieDePagina';
import { DemostracionAntesDespues } from '../components/DemostracionAntesDespues';
// import { TablaAhorros } from '../components/TablaAhorros'; // Assuming it exists, uncomment if needed

interface HomePageProps {
  esModoOscuro: boolean;
  alternarTema: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ esModoOscuro, alternarTema }) => {
  const navigate = useNavigate();

  const handleNavigate = (vista: 'home' | 'sorting' | 'replacing') => {
    if (vista === 'sorting') navigate('/purge');
    if (vista === 'replacing') navigate('/replace');
    if (vista === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white dark:bg-black text-zinc-900 dark:text-white min-h-screen font-sans">
      <BarraNavegacion 
        esModoOscuro={esModoOscuro} 
        alternarTema={alternarTema} 
        vistaActual="home"
        alNavegar={handleNavigate}
      />
      
      <div id="home">
        <Hero />
      </div>

      <div id="replacing">
        <CaracteristicaReemplazo alNavegar={() => navigate('/replace')} />
      </div>

      <div id="sorting">
        <CaracteristicaOrdenamiento alNavegar={() => navigate('/purge')} />
      </div>

      <div id="demo">
        <DemostracionAntesDespues />
      </div>

      {/* <div id="savings">
        <TablaAhorros />
      </div> */}

      <PieDePagina />
    </div>
  );
};
