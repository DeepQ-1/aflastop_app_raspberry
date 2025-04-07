export default {
  translation: {
    menu: {
      calibration: 'Kalibráció',
      testing: 'Tesztelés',
      history: 'Előzmények',
      advanced: 'Haladó',
      shutdown: 'Kikapcsolás',
      reset: 'Visszaállítás'
    },
    settings: {
      theme: 'Alkalmazás témája',
      language: 'Alkalmazás nyelve',
      deviceOptions: 'Készülék beállításai',
      connectivity: 'Kapcsolódási lehetőségek',
      themes: {
        light: 'VILÁGOS',
        dark: 'SÖTÉT'
      }
    },
    notifications: {
      calibrationNeeded: 'Kamera kalibrálás szükséges.',
      trayOpen: 'A fiók nyitva van. Kérjük, zárja be a fiókot a folytatás előtt.'
    },
    calibration: {
      instructions: {
        step1: '1. Helyezze a kalibrációs papírt a fiókba.',
        step2: '2. Tolja be teljesen a fiókot a gépbe.',
        step3: '3. Nyomja meg az "INDÍTÁS" gombot a kalibráció elindításához.'
      },
      buttons: {
        start: 'INDÍTÁS',
        retry: 'ÚJRA',
        finish: 'BEFEJEZÉS'
      },
      inProgress: {
        message: 'Eszköz kalibrálása folyamatban.',
        wait: 'Ez néhány percet vehet igénybe.'
      },
      success: {
        message: 'A kalibráció sikeresen befejeződött.'
      },
      failure: {
        message: 'A kalibráció nem sikerült.',
        instructions: 'Próbálja meg megtisztítani az eszköz belsejét. Ellenőrizze, hogy a kamera lencsék és UV lámpák tiszták-e. Tisztítsa meg a fiókot és a kalibrációs papírt. Ezután próbálja meg újra a kalibrálást. Ha a probléma továbbra is fennáll, vegye fel a kapcsolatot a gyártóval.'
      }
    },
    testing: {
      instructions: {
        step1: '1. Helyezze a mintát a fiókba',
        step2: '2. Tolja be teljesen a fiókot a gépbe.',
        step3: '3. Nyomja meg az "INDÍTÁS" gombot a minta tesztelésének elindításához.'
      },
      buttons: {
        start: 'INDÍTÁS',
        retry: 'ÚJRA',
        finish: 'BEFEJEZÉS'
      },
      inProgress: {
        message: 'Minta tesztelése folyamatban.',
        wait: 'Ez néhány percet vehet igénybe.'
      },
      results: {
        title: 'A teszt befejeződött.',
        normal: 'A minta NORMÁLIS!',
        suspicious: 'A minta GYANÚS!',
        positive: 'A minta POZITÍV!'
      }
    },
    history: {
      headers: {
        date: 'Dátum',
        id: 'ID',
        result: 'Eredmény'
      },
      noData: 'Nincs megjeleníthető adat'
    },
    advanced: {
      workingHours: 'Munkaórák',
      totalScans: 'Összes vizsgálat',
      resultDistribution: 'Eredmények eloszlása',
      hours: 'óra',
      of: '/',
      serviceNeeded: 'Eszköz szervizelése szükséges',
      results: {
        normal: 'Normális',
        suspicious: 'Gyanús',
        positive: 'Pozitív'
      }
    }
  }
};