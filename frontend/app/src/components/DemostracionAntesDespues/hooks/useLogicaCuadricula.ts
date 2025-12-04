import { useState, useEffect } from 'react';
import { CONFIG_PALETA } from '../constantes';

export interface ItemCuadricula {
  id: string;
  color: string;
  codigo: string;
  prefijo: string;
}

export const useLogicaCuadricula = () => {
  const [itemsCuadricula, setItemsCuadricula] = useState<ItemCuadricula[]>([]);
  const [estaReemplazado, setEstaReemplazado] = useState(false);

  // Generar el conjunto completo de 48 items (8 por color)
  const generarItemsBase = () => {
    let items: ItemCuadricula[] = [];
    CONFIG_PALETA.forEach(config => {
      for (let i = 1; i <= 8; i++) {
        // Rellena el número con 0 (e.g., 01, 02)
        const num = i.toString().padStart(2, '0');
        const codigo = `${config.prefijo}-${num}`;
        items.push({
          id: codigo, // ID único usado para key y layoutId
          color: config.hex,
          codigo: codigo,
          prefijo: config.prefijo
        });
      }
    });
    return items;
  };

  // RESET MAESTRO: Aleatorizar y Reiniciar Estado
  const manejarProcesoActual = () => {
    const items = generarItemsBase();
    // Fisher-Yates shuffle
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [items[i], items[j]] = [items[j], items[i]];
    }
    setItemsCuadricula(items);
    setEstaReemplazado(false); // Reiniciar a rectángulos/datos crudos
  };

  // Lógica de Ordenamiento: Rayas Verticales
  const ordenarCuadricula = () => {
    const items = generarItemsBase(); // Obtener items base frescos ordenados
    
    // Agrupar items por prefijo para acceso más fácil
    const grupos: { [key: string]: ItemCuadricula[] } = {};
    CONFIG_PALETA.forEach(p => grupos[p.prefijo] = []);
    
    items.forEach(item => {
        if(grupos[item.prefijo]) {
            grupos[item.prefijo].push(item);
        }
    });

    // Asegurar que los grupos estén ordenados por código (01 a 08)
    Object.keys(grupos).forEach(key => {
        grupos[key].sort((a, b) => a.codigo.localeCompare(b.codigo));
    });

    const cuadriculaOrdenada: ItemCuadricula[] = [];
    
    // Tenemos 48 espacios en una cuadrícula de 6 columnas.
    for (let i = 0; i < 48; i++) {
       const indiceCol = i % 6; // 0 a 5
       const prefijo = CONFIG_PALETA[indiceCol].prefijo;
       
       // Tomar el siguiente item del grupo de color específico
       const item = grupos[prefijo].shift();
       if (item) {
           cuadriculaOrdenada.push(item);
       }
    }
    
    setItemsCuadricula(cuadriculaOrdenada);
  };

  const alternarReemplazo = () => {
    setEstaReemplazado(prev => !prev);
  };

  // Carga inicial
  useEffect(() => {
    manejarProcesoActual();
  }, []);

  return {
    itemsCuadricula,
    estaReemplazado,
    manejarProcesoActual,
    ordenarCuadricula,
    alternarReemplazo
  };
};
