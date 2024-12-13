export default {
  translation: {
    menu: {
      calibration: 'Calibración',
      testing: 'Prueba',
      history: 'Historial',
      advanced: 'Avanzado',
      shutdown: 'Apagar',
      reset: 'Reiniciar'
    },
    settings: {
      theme: 'Tema de la aplicación',
      language: 'Idioma de la aplicación',
      deviceOptions: 'Opciones del dispositivo'
    },
    notifications: {
      calibrationNeeded: 'Se requiere calibración de la cámara antes de cada prueba.'
    },
    calibration: {
      instructions: {
        step1: '1. Coloque el papel de calibración en el cajón.',
        step2: '2. Inserte completamente el cajón en la máquina.',
        step3: '3. Presione "INICIAR" para comenzar la calibración.'
      },
      buttons: {
        start: 'INICIAR',
        retry: 'REPETIR',
        finish: 'FINALIZAR'
      },
      inProgress: {
        message: 'Calibración del dispositivo en progreso.',
        wait: 'Esto puede tomar varios minutos.'
      },
      success: {
        message: 'Calibración completada con éxito.'
      },
      failure: {
        message: 'La calibración no fue exitosa.',
        instructions: 'Intente limpiar el interior del dispositivo. Verifique si las lentes de la cámara y las lámparas UV están sucias. Limpie el cajón y el papel de calibración. Luego intente calibrar nuevamente. Si el problema persiste, contacte al fabricante.'
      }
    },
    testing: {
      instructions: {
        step1: '1. Coloque la muestra en el cajón',
        step2: '2. Inserte completamente el cajón en la máquina.',
        step3: '3. Presione "INICIAR" para comenzar la prueba.'
      },
      buttons: {
        start: 'INICIAR',
        retry: 'REPETIR',
        finish: 'FINALIZAR'
      },
      inProgress: {
        message: 'Prueba de muestra en progreso.',
        wait: 'Esto puede tomar varios minutos.'
      },
      results: {
        title: 'Prueba completada.',
        normal: '¡La muestra es NORMAL!',
        suspicious: '¡La muestra es SOSPECHOSA!',
        positive: '¡La muestra es POSITIVA!'
      }
    },
    history: {
      headers: {
        date: 'Fecha',
        id: 'ID',
        result: 'Resultado'
      },
      noData: 'No hay datos para mostrar'
    },
    advanced: {
      workingHours: 'Horas de trabajo',
      totalScans: 'Total de escaneos',
      resultDistribution: 'Distribución de resultados',
      hours: 'horas',
      of: 'de',
      serviceNeeded: 'Se requiere servicio del dispositivo',
      results: {
        normal: 'Normal',
        suspicious: 'Sospechoso',
        positive: 'Positivo'
      }
    }
  }
};