export default {
  translation: {
    menu: {
      calibration: 'Kalibracija',
      testing: 'Testiranje',
      history: 'Povijest',
      advanced: 'Napredno',
      shutdown: 'Ugasi',
      reset: 'Resetiraj'
    },
    settings: {
      theme: 'Tema aplikacije',
      language: 'Jezik aplikacije',
      deviceOptions: 'Opcije uređaja'
    },
    notifications: {
      calibrationNeeded: 'Prije svakog testiranja potrebno je pokrenuti kalibraciju kamere.'
    },
    calibration: {
      instructions: {
        step1: '1. Postavite kalibracijski papir u ladicu.',
        step2: '2. Umetnite ladicu do kraja u stroj.',
        step3: '3. Pritisnite "ZAPOČNI" za pokretanje kalibracije uređaja.'
      },
      buttons: {
        start: 'ZAPOČNI',
        retry: 'PONOVI',
        finish: 'ZAVRŠI'
      },
      inProgress: {
        message: 'Kalibracija uređaja u tijeku.',
        wait: 'Ovo može potrajati nekoliko minuta.'
      },
      success: {
        message: 'Kalibracija uspješno završena.'
      },
      failure: {
        message: 'Kalibracija nažalost nije izvršena uspješno.',
        instructions: 'Pokušajte očistiti unutrašnjost uređaja. Provjerite jesu li leće kamera i UV lampi zaprijane. Očistite ladicu i kalibracijski papir. Zatim pokušajte ponovno kalibrirati uređaj. Ako se problem i dalje javlja kontaktirajte proizvođača.'
      }
    },
    testing: {
      instructions: {
        step1: '1. Postavite uzorak u ladicu',
        step2: '2. Umetnite ladicu do kraja u stroj.',
        step3: '3. Pritisnite "ZAPOČNI" za pokretanje testiranja uzorka.'
      },
      buttons: {
        start: 'ZAPOČNI',
        retry: 'PONOVI',
        finish: 'ZAVRŠI'
      },
      inProgress: {
        message: 'Testiranje uzorka u tijeku.',
        wait: 'Ovo može potrajati nekoliko minuta.'
      },
      results: {
        title: 'Testiranje je završeno.',
        normal: 'Uzorak je UREDAN!',
        suspicious: 'Uzorak je SUMNJIV!',
        positive: 'Uzorak je POZITIVAN!'
      }
    },
    history: {
      headers: {
        date: 'Datum',
        id: 'ID',
        result: 'Rezultat'
      },
      noData: 'Nema podataka za prikaz'
    },
    advanced: {
      workingHours: 'Radni sati',
      totalScans: 'Ukupno skeniranja',
      resultDistribution: 'Distribucija rezultata',
      hours: 'sati',
      of: 'od',
      serviceNeeded: 'Potreban je servis uređaja',
      results: {
        normal: 'Uredan',
        suspicious: 'Sumnjiv',
        positive: 'Pozitivan'
      }
    }
  }
};