export default {
  translation: {
    menu: {
      calibration: 'Calibrazione',
      testing: 'Test',
      history: 'Cronologia',
      advanced: 'Avanzato',
      shutdown: 'Spegni',
      reset: 'Ripristina'
    },
    settings: {
      theme: 'Tema dell\'applicazione',
      language: 'Lingua dell\'applicazione',
      deviceOptions: 'Opzioni dispositivo'
    },
    notifications: {
      calibrationNeeded: 'È necessaria la calibrazione della fotocamera prima di ogni test.'
    },
    calibration: {
      instructions: {
        step1: '1. Posizionare la carta di calibrazione nel cassetto.',
        step2: '2. Inserire completamente il cassetto nella macchina.',
        step3: '3. Premere "AVVIA" per iniziare la calibrazione.'
      },
      buttons: {
        start: 'AVVIA',
        retry: 'RIPROVA',
        finish: 'FINE'
      },
      inProgress: {
        message: 'Calibrazione del dispositivo in corso.',
        wait: 'Potrebbe richiedere alcuni minuti.'
      },
      success: {
        message: 'Calibrazione completata con successo.'
      },
      failure: {
        message: 'La calibrazione non è riuscita.',
        instructions: 'Provare a pulire l\'interno del dispositivo. Controllare se le lenti della fotocamera e le lampade UV sono sporche. Pulire il cassetto e la carta di calibrazione. Quindi riprovare la calibrazione. Se il problema persiste, contattare il produttore.'
      }
    },
    testing: {
      instructions: {
        step1: '1. Posizionare il campione nel cassetto',
        step2: '2. Inserire completamente il cassetto nella macchina.',
        step3: '3. Premere "AVVIA" per iniziare il test del campione.'
      },
      buttons: {
        start: 'AVVIA',
        retry: 'RIPROVA',
        finish: 'FINE'
      },
      inProgress: {
        message: 'Test del campione in corso.',
        wait: 'Potrebbe richiedere alcuni minuti.'
      },
      results: {
        title: 'Test completato.',
        normal: 'Il campione è NORMALE!',
        suspicious: 'Il campione è SOSPETTO!',
        positive: 'Il campione è POSITIVO!'
      }
    },
    history: {
      headers: {
        date: 'Data',
        id: 'ID',
        result: 'Risultato'
      },
      noData: 'Nessun dato da visualizzare'
    },
    advanced: {
      workingHours: 'Ore di lavoro',
      totalScans: 'Scansioni totali',
      resultDistribution: 'Distribuzione risultati',
      hours: 'ore',
      of: 'di',
      serviceNeeded: 'Necessaria manutenzione del dispositivo',
      results: {
        normal: 'Normale',
        suspicious: 'Sospetto',
        positive: 'Positivo'
      }
    }
  }
};