export const texts = {
  general: {
    appName: 'SIM AUTOMATION',
    appNameShort: 'SIM',
    developedBy: 'Core Innovation X VDC',
  },
  formatting: {
    locale: 'es-MX',
    currency: 'MXN',
  },
  navigation: {
    home: 'Inicio',
    purge: 'Purge',
    replace: 'Replace',
    demo: 'Demo',
    savings: 'Ahorros',
    back: 'Volver',
  },
  home: {
    hero: {
      badge: 'Core Innovation X VDC',
      subtitle: 'TWINMOTION',
      description: 'Automatización de alto rendimiento. Velocidad y Precisión absoluta.',
    },
    features: {
      purge: {
        title: 'PURGE',
        description: 'Lectura limpia, estandarizada y precisa para Twinmotion.',
        action: 'EXPLORAR',
      },
      replace: {
        title: 'REPLACE',
        description: 'Conexión inteligente de elementos de Twinmotion.',
        action: 'EJECUTAR',
        visuals: {
          id: 'ID: HM_2024_X',
          autoMode: 'AUTO_MODE',
          legacy: 'Legacy_V1',
          core: 'VDC_Core_V2',
          structOld: 'Struct_Old',
          structNew: 'Struct_New',
          cadImport: 'CAD_Import',
          bimNative: 'BIM_Native'
        }
      }
    }
  },
  purge: {
    title: 'PURGE',
    input: {
      label: 'ENTRADA',
      sublabel: 'Cargar Archivo .UDATASMITH',
    },
    output: {
      label: 'Nombre del archivo de salida',
      placeholder: 'purgado',
      helper: 'Se agregará .udatasmith automáticamente',
    },
    action: {
      process: 'DESCARGA',
      processing: 'PROCESANDO...',
      sublabel: 'Obtener Optimizado',
    },
    errors: {
      fileTooLarge: 'El archivo es demasiado grande. El límite es 4.5MB.',
      noFile: 'Por favor selecciona un archivo.',
    }
  },
  replace: {
    title: 'NÚCLEO REPLACE',
    input1: {
      label: 'ENTRADA 1',
      sublabel: 'Archivo Base',
    },
    input2: {
      label: 'ENTRADA 2',
      sublabel: 'Familia / Estándar',
    },
    output: {
      label: 'Nombre del archivo de salida',
      placeholder: 'reemplazado',
      helper: 'Se agregará .udatasmith automáticamente',
    },
    action: {
      process: 'DESCARGA',
      processing: 'PROCESANDO...',
      sublabel: 'Generar archivo actualizado',
    },
    errors: {
      filesTooLarge: 'Los archivos combinados son demasiado grandes. El límite total es 4.5MB.',
      missingFiles: 'Por favor selecciona ambos archivos.',
    }
  },
  savings: {
    title: 'ANÁLISIS DE',
    titleHighlight: 'VALOR',
    tabs: {
      cost: 'COSTOS',
      time: 'TIEMPOS',
    },
    charts: {
      projection: 'Vista_Proyección_01',
      manual: 'Manual',
      auto: 'Auto',
      velocity: 'Análisis_Velocidad_V2',
      pendingManual: 'Pendiente Manual',
      velocityAuto: 'Velocidad Auto',
      target: 'META OBJETIVO',
      min: 'Min',
      max: 'Max',
      weekPrefix: 'S',
    },
    table: {
      component: 'Componente',
      current: 'Actual',
      investment: 'Inversión',
      auto: 'Auto',
      rows: {
        hr: {
          title: 'Recursos Humanos',
          subtitle: 'Personal asignado',
          manual: '1 Persona',
          invest: '2 Personas',
          auto: '1 Persona',
        },
        opCost: {
          title: 'Costo Operativo',
          subtitle: 'Semanal',
        },
        total: 'Total Proyecto',
      }
    },
    kpi: {
      simulationParams: 'Parámetros de Simulación',
      targetVolume: 'Volumen Objetivo (Proyectos/Mes)',
      dragToSimulate: 'Arrastra para simular carga',
      manualTime: 'Tiempo Manual',
      autoTime: 'Tiempo Auto',
      efficiencyGain: 'Ganancia Eficiencia',
      weeksRequired: 'Semanas requeridas',
      weeksSaved: 'Semanas Ahorradas',
      roi: '300% ROI',
    },
    tooltips: {
      implementationPhase: 'Fase de Implementación',
      automated: 'Automatizado',
      manual: 'Manual',
      velocityAuto: 'Velocidad Auto',
      velocityManual: 'Velocidad Manual',
    }
  },
  demo: {
    title: 'ESTRUCTURA',
    titleHighlight: 'OPTIMIZADA',
    subtitle: 'Visualización | Purge | Replace',
    actions: {
      reset: 'Reset',
      sort: 'Ordenar',
      replace: 'Replace',
    }
  },
  pages: {
    purge: {
      title: 'PURGE',
      cards: {
        input: {
          title: 'ENTRADA',
          subtitle: 'Cargar Archivo .UDATASMITH',
        }
      },
      output: {
        label: 'Nombre del archivo de salida',
        placeholder: 'purgado',
        help: 'Se agregará .udatasmith automáticamente',
        action: {
          processing: 'PROCESANDO...',
          default: 'DESCARGA',
          subtitle: 'Obtener Optimizado',
        }
      }
    },
    replace: {
      title: 'NÚCLEO',
      titleHighlight: 'REPLACE',
      cards: {
        base: {
          title: 'ENTRADA 1',
          subtitle: 'Archivo Base',
        },
        standard: {
          title: 'ENTRADA 2',
          subtitle: 'Familia / Estándar',
        }
      },
      output: {
        placeholder: 'reemplazado',
        action: {
          subtitle: 'Generar archivo actualizado',
        }
      }
    }
  },
  alerts: {
    filesTooLarge: 'El archivo es demasiado grande (límite 4.5MB). Por favor usa un archivo más pequeño.',
    missingFiles: 'Por favor selecciona los archivos requeridos.',
    genericError: 'Error al procesar la solicitud.',
  }
};
