export const resume = {
  name: '谢小珊',
  nameEn: 'Sandy Xie',
  title: '高级 UX 设计师',
  headline: '专注智能硬件 用户体验设计',
  tagline: 'UX Designer · Smart Hardware · Drone Industry',
  contact: {
    phone: '13510104003',
    email: '25429157@qq.com',
    location: '深圳',
  },
  jobIntent: ['资深 / 高级 UX 设计师', '智能硬件 UX 设计师'],
  education: '本科',
  selfEvaluation: [
    '13 年经验，4 年无人机行业深耕',
    '端到端 UX 全流程闭环，擅长复杂场景交互',
    '与硬件、算法、嵌入式团队高效协作',
    '持续用户反馈迭代，多场景经验丰富',
  ],
  stats: [
    { value: '13年', label: '设计经验' },
    { value: '4年', label: '无人机行业' },
    { value: '3款', label: '核心产品' },
    { value: '全链路', label: 'UX 能力' },
  ],
  experience: [
    { period: '2012—2014', role: 'UI 设计师', company: '宝迪科技' },
    { period: '2014—2018', role: '高级游戏 UI 设计师', company: '腾讯科技（深圳）' },
    { period: '2020—2022', role: '高级 UI 设计师（骨干）', company: '道通科技' },
    { period: '2022—2026', role: '高级 UE 设计师（骨干）', company: '道通智能航空' },
  ],
  skills: {
    ux: ['用户研究', '竞品分析', '需求拆解', '信息架构', '交互设计', '可用性测试', '体验优化'],
    hardware: ['多旋翼无人机', '倾转旋翼', '航测软件', '机巢控制', '飞行安全', '多设备协同'],
    tools: ['Figma', 'Axure RP', 'PS / AI'],
  },
  projects: [
    {
      title: 'Autel Mapper（航拍 3D 重建软件）',
      description:
        'Autel Mapper 是一款先进的 PC 端建模软件，能够将无人机拍摄的照片转化为二维和三维模型。它结合传统算法和深度学习，提供高效、高精度的建模，适用于测绘、安防、巡检、交通和建筑等行业。',
      highlights:
        '亮点功能：质量重建、快速拼图、精细化巡检航线规划、分块建模、测量工具等',
      link: '/works/autel-mapper',
    },
    {
      title: 'Autel Enterprise（多旋翼无人机 App）',
      description:
        '支持多种任务规划模式：航点任务、矩形任务、多边形任务。还支持多机编队飞行、精准复拍、ADS-B 预警系统、OTA 固件升级等功能，与 Autel Mapper 联动实现建模流程。',
      highlights:
        '主要负责：多机/单机任务规划与控制、多机编队、精准复拍、ADS-B 预警、OTA 升级及与 Mapper 联动建模流程。',
      link: '/works/autel-enterprise',
    },
    {
      title: 'Autel Voyager（倾转旋翼无人机 App）',
      description:
        '主要负责飞行安全相关功能：可飞区管理、临时可飞区、UOM 实名认证，以及针对英国市场的 UTM 紧急指令收发。',
    },
    {
      title: '机巢 App',
      description:
        '机巢开部署引导、一键自检、控制台逻辑、网络设置与第三方云服务设置流程设计。',
    },
    {
      title: '道通线上软件商城',
      description:
        '完成企业版软件商城设计，包括商品浏览、订单支付、海内外开票、账号安全管理等全流程体验，实现软件产品线上闭环交易。',
    },
  ],
  avatar: '/resume/avatar.png',
}
