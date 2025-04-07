export default {
  translation: {
    menu: {
      calibration: 'Calibration',
      testing: 'Testing',
      history: 'History',
      advanced: 'Advanced',
      shutdown: 'Shutdown',
      reset: 'Reset'
    },
    settings: {
      theme: 'Application Theme',
      language: 'Application Language',
      deviceOptions: 'Device Options',
      connectivity: 'Connectivity',
      themes: {
        light: 'LIGHT',
        dark: 'DARK'
      }
    },
    notifications: {
      calibrationNeeded: 'Camera calibration is required.',
      trayOpen: 'Tray is open. Please close the tray before continuing.'
    },
    calibration: {
      instructions: {
        step1: '1. Place calibration paper in the drawer.',
        step2: '2. Insert the drawer fully into the machine.',
        step3: '3. Press "START" to begin device calibration.'
      },
      buttons: {
        start: 'START',
        retry: 'RETRY',
        finish: 'FINISH'
      },
      inProgress: {
        message: 'Device calibration in progress.',
        wait: 'This may take several minutes.'
      },
      success: {
        message: 'Calibration completed successfully.'
      },
      failure: {
        message: 'Calibration was not successful.',
        instructions: 'Try cleaning the inside of the device. Check if the camera lenses and UV lamps are dirty. Clean the drawer and calibration paper. Then try calibrating again. If the problem persists, contact the manufacturer.'
      }
    },
    testing: {
      instructions: {
        step1: '1. Place the sample in the drawer',
        step2: '2. Insert the drawer fully into the machine.',
        step3: '3. Press "START" to begin sample testing.'
      },
      buttons: {
        start: 'START',
        retry: 'RETRY',
        finish: 'FINISH'
      },
      inProgress: {
        message: 'Sample testing in progress.',
        wait: 'This may take several minutes.'
      },
      results: {
        title: 'Testing completed.',
        normal: 'Sample is NORMAL!',
        suspicious: 'Sample is SUSPICIOUS!',
        positive: 'Sample is POSITIVE!'
      }
    },
    history: {
      headers: {
        date: 'Date',
        id: 'ID',
        result: 'Result'
      },
      noData: 'No data to display'
    },
    advanced: {
      workingHours: 'Working Hours',
      totalScans: 'Total Scans',
      resultDistribution: 'Result Distribution',
      hours: 'hours',
      of: 'of',
      serviceNeeded: 'Device service is required',
      results: {
        normal: 'Normal',
        suspicious: 'Suspicious',
        positive: 'Positive'
      }
    }
  }
};