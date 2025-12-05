export const COLORES = {
  manual: '#C42021',   // Rojo Cálido (Proceso Actual)
  inversion: '#6C7D47', // Palma (Inversión)
  auto: '#254467',     // Azul Oscuro (Operaciones Automatizadas)
  texto: '#67727A',     // Gris
  cuadricula: '#333333',
  oro: '#EFB628',
  cyan: '#06b6d4'      // Resalte tecnológico
};

export const SEMANAS = 52;
export const COSTO_SEMANAL_MANUAL = 8640; 
export const COSTO_SEMANAL_AUTO = 2880;   

export const INICIO_INVERSION = 34560;
export const ADICION_INVERSION = 138240;
export const FASE_TOTAL_INVERSION = INICIO_INVERSION + ADICION_INVERSION; 

export const SEMANA_INICIO_AUTO = 8; 

// Tasas de Rendimiento (Simulaciones por semana)
export const TASA_MANUAL = 1;
export const TASA_AUTO = 3;

export const COSTO_ANUAL_MANUAL = COSTO_SEMANAL_MANUAL * SEMANAS; 
export const TOTAL_ANUAL_AUTO = FASE_TOTAL_INVERSION + ((SEMANAS - SEMANA_INICIO_AUTO) * COSTO_SEMANAL_AUTO);
