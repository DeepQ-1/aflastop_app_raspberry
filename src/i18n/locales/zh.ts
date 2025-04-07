export default {
  translation: {
    menu: {
      calibration: '校准',
      testing: '测试',
      history: '历史记录',
      advanced: '高级',
      shutdown: '关机',
      reset: '重置'
    },
    settings: {
      theme: '应用主题',
      language: '应用语言',
      deviceOptions: '设备选项',
      connectivity: '连接性',
      themes: {
        light: '明亮',
        dark: '暗黑'
      }
    },
    notifications: {
      calibrationNeeded: '需要进行相机校准。',
      trayOpen: '托盘已打开。请在继续之前关闭托盘。'
    },
    calibration: {
      instructions: {
        step1: '1. 将校准纸放入抽屉。',
        step2: '2. 将抽屉完全插入机器。',
        step3: '3. 按"开始"开始设备校准。'
      },
      buttons: {
        start: '开始',
        retry: '重试',
        finish: '完成'
      },
      inProgress: {
        message: '设备校准进行中。',
        wait: '这可能需要几分钟。'
      },
      success: {
        message: '校准成功完成。'
      },
      failure: {
        message: '校准未成功。',
        instructions: '尝试清洁设备内部。检查相机镜头和紫外线灯是否脏污。清洁抽屉和校准纸。然后重试校准。如果问题仍然存在，请联系制造商。'
      }
    },
    testing: {
      instructions: {
        step1: '1. 将样品放入抽屉',
        step2: '2. 将抽屉完全插入机器。',
        step3: '3. 按"开始"开始样品测试。'
      },
      buttons: {
        start: '开始',
        retry: '重试',
        finish: '完成'
      },
      inProgress: {
        message: '样品测试进行中。',
        wait: '这可能需要几分钟。'
      },
      results: {
        title: '测试完成。',
        normal: '样品正常！',
        suspicious: '样品可疑！',
        positive: '样品呈阳性！'
      }
    },
    history: {
      headers: {
        date: '日期',
        id: '编号',
        result: '结果'
      },
      noData: '没有可显示的数据'
    },
    advanced: {
      workingHours: '工作时间',
      totalScans: '总扫描次数',
      resultDistribution: '结果分布',
      hours: '小时',
      of: '/',
      serviceNeeded: '设备需要维护',
      results: {
        normal: '正常',
        suspicious: '可疑',
        positive: '阳性'
      }
    }
  }
};