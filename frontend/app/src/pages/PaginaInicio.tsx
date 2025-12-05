import React from 'react';
import { Inicio } from '../components/01-Inicio/Inicio';
import { CaracteristicaOrdenamiento } from '../components/02-Purga/Purga';
import { CaracteristicaReemplazo } from '../components/03-Reemplazar/Reemplazar';
import { DemostracionAntesDespues } from '../components/04-Demo/Demo';
import { TablaAhorros } from '../components/05-Ahorros/Ahorros';
import { PieDePagina } from '../components/ui/PieDePagina/PieDePagina';

interface PaginaInicioProps {
  alNavegar: (view: 'home' | 'sorting' | 'replacing') => void;
}

export const PaginaInicio: React.FC<PaginaInicioProps> = ({ alNavegar }) => {
  return (
    <div className="h-full w-full snap-y snap-mandatory overflow-y-scroll overflow-x-hidden scroll-smooth">
      <div id="home" className="snap-start h-screen w-full relative">
        <Inicio />
      </div>
      
      <div id="sorting" className="snap-start h-screen w-full relative">
          <CaracteristicaOrdenamiento alNavegar={() => alNavegar('sorting')} />
      </div>
      
      <div id="replacing" className="snap-start h-screen w-full relative">
          <CaracteristicaReemplazo alNavegar={() => alNavegar('replacing')} />
      </div>

      <div id="demo" className="snap-start h-screen w-full relative">
          <DemostracionAntesDespues />
      </div>

      <div id="savings" className="snap-start h-screen w-full relative">
          <TablaAhorros />
      </div>

      <div className="snap-start relative">
        <PieDePagina />
      </div>
    </div>
  );
};
