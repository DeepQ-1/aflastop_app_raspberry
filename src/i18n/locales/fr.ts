export default {
  translation: {
    menu: {
      calibration: 'Calibrage',
      testing: 'Test',
      history: 'Historique',
      advanced: 'Avancé',
      shutdown: 'Éteindre',
      reset: 'Réinitialiser'
    },
    settings: {
      theme: 'Thème de l\'application',
      language: 'Langue de l\'application',
      deviceOptions: 'Options de l\'appareil',
      connectivity: 'Connectivité',
      themes: {
        light: 'CLAIR',
        dark: 'SOMBRE'
      }
    },
    notifications: {
      calibrationNeeded: 'Un calibrage de la caméra est nécessaire.',
      trayOpen: 'Le tiroir est ouvert. Veuillez fermer le tiroir avant de continuer.'
    },
    calibration: {
      instructions: {
        step1: '1. Placez le papier de calibrage dans le tiroir.',
        step2: '2. Insérez complètement le tiroir dans l\'appareil.',
        step3: '3. Appuyez sur "DÉMARRER" pour commencer le calibrage.'
      },
      buttons: {
        start: 'DÉMARRER',
        retry: 'RÉESSAYER',
        finish: 'TERMINER'
      },
      inProgress: {
        message: 'Calibrage de l\'appareil en cours.',
        wait: 'Cela peut prendre plusieurs minutes.'
      },
      success: {
        message: 'Calibrage terminé avec succès.'
      },
      failure: {
        message: 'Le calibrage a échoué.',
        instructions: 'Essayez de nettoyer l\'intérieur de l\'appareil. Vérifiez si les lentilles de la caméra et les lampes UV sont sales. Nettoyez le tiroir et le papier de calibrage. Puis essayez de calibrer à nouveau. Si le problème persiste, contactez le fabricant.'
      }
    },
    testing: {
      instructions: {
        step1: '1. Placez l\'échantillon dans le tiroir',
        step2: '2. Insérez complètement le tiroir dans l\'appareil.',
        step3: '3. Appuyez sur "DÉMARRER" pour commencer le test.'
      },
      buttons: {
        start: 'DÉMARRER',
        retry: 'RÉESSAYER',
        finish: 'TERMINER'
      },
      inProgress: {
        message: 'Test de l\'échantillon en cours.',
        wait: 'Cela peut prendre plusieurs minutes.'
      },
      results: {
        title: 'Test terminé.',
        normal: 'L\'échantillon est NORMAL !',
        suspicious: 'L\'échantillon est SUSPECT !',
        positive: 'L\'échantillon est POSITIF !'
      }
    },
    history: {
      headers: {
        date: 'Date',
        id: 'ID',
        result: 'Résultat'
      },
      noData: 'Aucune donnée à afficher'
    },
    advanced: {
      workingHours: 'Heures de fonctionnement',
      totalScans: 'Total des analyses',
      resultDistribution: 'Distribution des résultats',
      hours: 'heures',
      of: 'sur',
      serviceNeeded: 'Entretien de l\'appareil nécessaire',
      results: {
        normal: 'Normal',
        suspicious: 'Suspect',
        positive: 'Positif'
      }
    }
  }
};