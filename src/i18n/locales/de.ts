export default {
  translation: {
    menu: {
      calibration: 'Kalibrierung',
      testing: 'Testen',
      history: 'Verlauf',
      advanced: 'Erweitert',
      shutdown: 'Ausschalten',
      reset: 'Zurücksetzen'
    },
    settings: {
      theme: 'Anwendungsthema',
      language: 'Anwendungssprache',
      deviceOptions: 'Geräteoptionen',
      connectivity: 'Konnektivität',
      themes: {
        light: 'HELL',
        dark: 'DUNKEL'
      }
    },
    notifications: {
      calibrationNeeded: 'Eine Kamerakalibrierung ist erforderlich.',
      trayOpen: 'Die Schublade ist offen. Bitte schließen Sie die Schublade, bevor Sie fortfahren.'
    },
    calibration: {
      instructions: {
        step1: '1. Legen Sie das Kalibrierpapier in die Schublade.',
        step2: '2. Schieben Sie die Schublade vollständig in das Gerät.',
        step3: '3. Drücken Sie "START" um die Gerätekalibrierung zu starten.'
      },
      buttons: {
        start: 'START',
        retry: 'WIEDERHOLEN',
        finish: 'BEENDEN'
      },
      inProgress: {
        message: 'Gerätekalibrierung läuft.',
        wait: 'Dies kann einige Minuten dauern.'
      },
      success: {
        message: 'Kalibrierung erfolgreich abgeschlossen.'
      },
      failure: {
        message: 'Kalibrierung war nicht erfolgreich.',
        instructions: 'Versuchen Sie, das Geräteinnere zu reinigen. Prüfen Sie, ob die Kameralinsen und UV-Lampen verschmutzt sind. Reinigen Sie die Schublade und das Kalibrierpapier. Versuchen Sie dann erneut zu kalibrieren. Wenn das Problem weiterhin besteht, kontaktieren Sie den Hersteller.'
      }
    },
    testing: {
      instructions: {
        step1: '1. Legen Sie die Probe in die Schublade',
        step2: '2. Schieben Sie die Schublade vollständig in das Gerät.',
        step3: '3. Drücken Sie "START" um den Probentest zu starten.'
      },
      buttons: {
        start: 'START',
        retry: 'WIEDERHOLEN',
        finish: 'BEENDEN'
      },
      inProgress: {
        message: 'Probentest läuft.',
        wait: 'Dies kann einige Minuten dauern.'
      },
      results: {
        title: 'Test abgeschlossen.',
        normal: 'Probe ist NORMAL!',
        suspicious: 'Probe ist VERDÄCHTIG!',
        positive: 'Probe ist POSITIV!'
      }
    },
    history: {
      headers: {
        date: 'Datum',
        id: 'ID',
        result: 'Ergebnis'
      },
      noData: 'Keine Daten zum Anzeigen'
    },
    advanced: {
      workingHours: 'Betriebsstunden',
      totalScans: 'Gesamtanzahl Scans',
      resultDistribution: 'Ergebnisverteilung',
      hours: 'Stunden',
      of: 'von',
      serviceNeeded: 'Gerätewartung erforderlich',
      results: {
        normal: 'Normal',
        suspicious: 'Verdächtig',
        positive: 'Positiv'
      }
    }
  }
};