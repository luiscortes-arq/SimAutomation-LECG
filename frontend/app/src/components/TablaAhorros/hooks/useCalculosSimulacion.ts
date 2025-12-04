import { useMemo } from 'react';
import { 
  SEMANAS, 
  COSTO_SEMANAL_MANUAL, 
  SEMANA_INICIO_AUTO, 
  INICIO_INVERSION, 
  ADICION_INVERSION, 
  FASE_TOTAL_INVERSION, 
  COSTO_SEMANAL_AUTO, 
  TASA_MANUAL, 
  TASA_AUTO 
} from '../constantes';

export const useCalculosSimulacion = (objetivoSimulacion: number) => {
  
  const datosCostos = useMemo(() => {
    const datosSemanales = [];
    for (let i = 0; i <= SEMANAS; i++) { 
      const semana = i;
      const costoManual = semana * COSTO_SEMANAL_MANUAL;
      let costoAuto = 0;

      if (semana <= SEMANA_INICIO_AUTO) {
        const progreso = semana / SEMANA_INICIO_AUTO;
        costoAuto = INICIO_INVERSION + (ADICION_INVERSION * progreso);
      } else {
        const semanasOperativas = semana - SEMANA_INICIO_AUTO;
        costoAuto = FASE_TOTAL_INVERSION + (semanasOperativas * COSTO_SEMANAL_AUTO);
      }

      datosSemanales.push({
        semana: semana,
        etiqueta: `S${semana}`,
        costoManual,
        costoAuto,
      });
    }
    return datosSemanales;
  }, []);

  const estadisticasProductividad = useMemo(() => {
    const semanasManual = Math.ceil(objetivoSimulacion / TASA_MANUAL);
    const semanasAuto = Math.ceil(objetivoSimulacion / TASA_AUTO);
    return { semanasManual, semanasAuto, ahorrado: semanasManual - semanasAuto };
  }, [objetivoSimulacion]);

  const datosProductividad = useMemo(() => {
    const maxSemanas = Math.max(estadisticasProductividad.semanasManual, estadisticasProductividad.semanasAuto) + 2;
    const datos = [];

    for (let s = 0; s <= maxSemanas; s++) {
        const totalManual = s * TASA_MANUAL;
        const totalAuto = s * TASA_AUTO;

        datos.push({
            semana: s,
            totalManual,
            totalAuto,
            objetivo: objetivoSimulacion
        });
    }
    return datos;
  }, [objetivoSimulacion, estadisticasProductividad]);

  const formatearMoneda = (valor: number) => {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(valor);
  };

  return {
    datosCostos,
    estadisticasProductividad,
    datosProductividad,
    formatearMoneda
  };
};
