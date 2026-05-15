const zh = {
  Symbol: "zh",
  Title: 'AI图片工具箱 - 302.AI',
  Desc: 'The Photo Generation Tool Powered By 302.AI',
  System: {
    Title: '系统',
    Wait: '等待',
    Back: '返回',
    Download: '下载',
    DownloadImage: '下载图片',
    DownloadVideo: '下载视频',
    CopyText: '复制文本',
    WaitImage: '图片生成中，请耐心等待1-5分钟~',
    WaitVideo: '视频生成中，请耐心等待3-10分钟~',
    WaitText: '文字提取中，请耐心等待1-5分钟~',
    BackgroundPLaceholder: '请输入背景图描述',
    PromptPlaceholder: '请输入图片修改要求',
    UploadFaceImage: '传人脸图片',
    UploadNewImage: '上传新的图片',
    UploadStickImage: '上传贴图',
    CleanStickImage: '清空贴图',
    UploadFile: '点击或拖拽上传',
    SelectFilter: '选择滤镜',
    ContinueEdit: '继续编辑',
    ContinueRemove: '继续消除',
    ContinueExpand: '继续拓展',
    ContinueModify: '继续修改',
    Start: '开始',
    Save: '保存',
    Redo: '重做',
    Retry: '重试',
    Substract: '提取',
    Confirm: '确认',
    Cancel: '取消',
  },
  Error: {
    Title: '系统错误！',
    TokenMiss: (domain: string) => `该工具已禁用/删除, 更多信息请访问 ${domain}`, // -10001
    TokenInvalid: (domain: string) => `该工具已禁用/删除！更多信息请访问 ${domain}`, // -10002
    InternalError: (domain: string) => `内部错误，更多信息请访问 ${domain}`, // -10003
    AccountOut: (domain: string) => `账号欠费，更多信息请访问 ${domain}`, // -10004
    TokenExpired: (domain: string) => `验证码过期，更多信息请访问 ${domain}`, // -10005
    TotalOut: (domain: string) => `该工具总额度已用, 更多信息请访问 ${domain}`, // -10006
    TodayOut: (domain: string) => `该工具当日额度已用完，更多信息请访问 ${domain}`, // -10007
    HourOut: (domain: string) => `该免费工具在本小时的额度已达上限,请访问 ${domain} 生成属于自己的工具`, // -10012
    GenerateImageError: '图片生成错误，请尝试切换模型或修改提示词',
  },
  Auth: {
    Title: '授权',
    NeedCode: '缺少密匙',
    InputCode: '请在下方输入302.AI的官方API-KEY',
    PlaceHolder: 'sk-xxxxxxxxxxxxxxxxx',
    Submit: '保存',
  },
  Footer: {
    Title: '内容由AI生成，仅供参考',
  },
  Home: {
    Title: '主页',
  },
  About: {
    Title: '关于',
    Desc: 'AI图片工具箱',
    Loading: '加载中...',
    CreateInfo: (user: string) => `本工具由302.AI用户 ${user} 创建, 302.AI是一个AI生成和分享的平台，可以一键生成自己的AI工具`,
    TotalInfo: (all: number, use: number) => `本工具的总限额为 <${all}PTC>, 已经使用 <${use}PTC>`,
    DayInfo: (all: number, use: number) => `本工具的单日限额为 <${all}PTC>, 已经使用 <${use}PTC>`,
    RecordInfo: '本工具的生成记录均保存在本机，不会被上传，生成此工具的用户无法看到你的生成记录',
    MoreInfo: (domain: string) => `更多信息请访问： ${domain}`,
  },
  History: {
    Title: '历史记录',
    Empty: '暂无数据',
    Clear: '清空记录',
    ItemCount: (count: number) => `总共${count}条历史记录`,
  },
  Photo: {
    Title: 'AI图片工具箱',
    Landing: {
      Or: '或',
      NowSupport: '现已支持',
      InputLinkPlaceholder: '请输入链接地址，比如：https://302.ai',
      CreateImagePlaceholder: '请输入您想要生成的图片描述，直接生成',
      CreateImageAction: '生成',
    },
    Edit: {
    },
    Tool: {
      title: '现已支持',
      action: '试一试',
      list: [
        {
          id: 1,
          name: 'remove-bg',
          icon: 'remove-bg',
          title: '去除背景',
          desc: '精确提取图片中主体',
        },
        {
          id: 2,
          name: 'remove-obj',
          icon: 'remove-obj',
          title: '物体消除',
          desc: '擦掉您想要移除的区域',
        },
        {
          id: 3,
          name: 'replace-bg',
          icon: 'replace-bg',
          title: '背景替换',
          desc: '快速替换图片背景',
        },
        {
          id: 4,
          name: 'vectorize',
          icon: 'vectorize',
          title: '图片矢量化',
          desc: '将图片转化为可无限放大的矢量图',
        },
        {
          id: 5,
          name: 'upscale',
          icon: 'upscale',
          title: '图片放大',
          desc: '支持2x，4x，8x放大图片',
        },
        {
          id: 6,
          name: 'super-upscale',
          icon: 'super-upscale',
          title: '超级图片放大',
          desc: '对图片进行AI生成，添加原图没有的细节',
        },
        {
          id: 7,
          name: 'colorize',
          icon: 'colorize',
          title: '黑白上色',
          desc: '对黑白照片进行上色',
        },
        {
          id: 8,
          name: 'swap-face',
          icon: 'swap-face',
          title: 'AI换脸',
          desc: '更换图片人物的脸',
        },
        {
          id: 9,
          name: 'uncrop',
          icon: 'uncrop',
          title: '图片拓展',
          desc: '将图片的边界进行拓展',
        },
        {
          id: 10,
          name: 'inpaint-img',
          icon: 'inpaint-img',
          title: '图片修改',
          desc: '将图片的内容进行AI修改',
        },
        {
          id: 11,
          name: 'recreate-img',
          icon: 'recreate-img',
          title: '以图生图',
          desc: '以当前图片为基础，生成一张新的图片',
        },
        {
          id: 12,
          name: 'sketch-img',
          icon: 'sketch-img',
          title: '草稿生图',
          desc: '将一张手稿生成一个精美的图片',
        },
        {
          id: 13,
          name: 'crop-img',
          icon: 'crop-img',
          title: '图片裁剪',
          desc: '对图片进行精确裁剪',
        },
        {
          id: 14,
          name: 'filter-img',
          icon: 'filter-img',
          title: '图片调色',
          desc: '对图片进行色值调整',
        },
        {
          id: 15,
          name: 'read-text',
          icon: 'read-text',
          title: '文字提取',
          desc: '根据图片生成文字描述',
        },
        {

          id: 16,
          name: 'create-video',

          icon: 'create-video',
          title: '视频生成',
          desc: '根据图片内容生成视频',
        },
        {
          id: 17,
          name: 'character',
          icon: 'character',
          title: '人物滤镜',
          desc: '为图片增加风格滤镜',
        },
        {
          id: 18,
          name: 'stitching',
          icon: 'stitching',
          title: '图片拼接',
          desc: '将多张图片拼接成一张',
        },
        {
          id: 19,
          name: 'translate-text',
          icon: 'translate-text',
          title: '图片文字翻译',
          desc: '将图片中的文字进行翻译',
        },
        {
          id: 20,
          name: 'erase-text',
          icon: 'erase-text',
          title: '图片文字擦除',
          desc: '将图片中的文字擦除',
        },
      ]
    },
    Character: {
      Title: '选择滤镜:',
      Desc: '选择以下任意一个风格滤镜进行生成',
      List: [
        {
          label: '高级定制插图',
          value: 'Haute Couture Illustration',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c01.png'
        },
        {
          label: '超现实科幻插图',
          value: 'Surreal Sci-Fi Realism Illustration',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c02.png'
        },
        {
          label: '黑白木刻版画',
          value: 'Black and White Blockprint',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c03.png'
        },
        {
          label: '双子座漫画',
          value: 'Gemini Manga',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c04.png'
        },
        {
          label: '小微木刻版画',
          value: 'Little Tinies Blockprint',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c05.png'
        },
        {
          label: '波普艺术插图',
          value: 'Pop Art Illustration',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c06.png'
        },
        {
          label: '点插图',
          value: 'The Point Illustration',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c07.png'
        },
        {
          label: '柔焦3D',
          value: 'Soft Focus 3D',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c08.png'
        },
        {
          label: '绘画插图',
          value: 'Painted Illustration',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c09.png'
        },
        {
          label: '彩色漫画',
          value: 'Colorful Comicbook',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c10.png'
        },
        {
          label: '粗线条',
          value: 'Bold Lineart',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c11.png'
        },
        {
          label: '柔和动漫插图',
          value: 'Soft Anime Illustration',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c12.png'
        },
      ]
    },
    ImageModels: {
      Title: '',
      Desc: '',
      List: [
        {
          name: 'Flux-Dev',
          value: 'flux-dev',
        },
        {
          name: 'Flux-Pro',
          value: 'flux-pro',
        },
        {
          name: 'Flux-Schnell',
          value: 'flux-schnell',
        },
        {
          name: 'Flux-Realism',
          value: 'flux-realism',
        },
        {
          name: 'SD3',
          value: 'sd3',
        },
        {
          name: 'SDXL-Lightning',
          value: 'sdxl-lightning',
        },
        {
          name: 'Aura-Flow',
          value: 'aura-flow',
        },
        {
          name: 'Kolors',
          value: 'kolors',
        },
        {
          name: '艺术二维码',
          value: 'qr-code',
        },
      ],
    },
    VideoModels: {
      List: [
        {
          name: 'Kling',
          value: 'kling',
        },
        {
          name: 'Runway',
          value: 'runway',
        },
        {
          name: 'Luma',
          value: 'luma',
        },
        {
          name: '智谱',
          value: 'cog',
        },
      ]
    },
    VideoRatios: {
      List: [
        {
          name: '1:1',
          value: 1 / 1,
        },
        {
          name: '16:9',
          value: 16 / 9,
        },
        {
          name: '9:16',
          value: 9 / 16,
        },
        {
          name: '1280:768',
          value: 1280 / 768,
        },
        {
          name: '3:2',
          value: 3 / 2,
        },
        {
          name: '自定义',
          value: 0,
        },
      ],
    },
    LangSelecter: {
      Title: '选择语言',
      List: [
        {
          name: '自动',
          value: 'auto',
        },
        {
          name: '中文',
          value: 'zh',
        },
        {
          name: '英文',
          value: 'en',
        },
        {
          name: '日语',
          value: 'ja',
        },
        {
          name: '韩语',
          value: 'ko',
        },
        {
          name: '德语',
          value: 'de',
        },
        {
          name: '法语',
          value: 'fr',
        },
        {
          name: '阿拉伯语',
          value: 'ar',
        },
        {
          name: '西班牙语',
          value: 'es',
        },
        {
          name: '葡萄牙语',
          value: 'pt',
        },
        {
          name: '意大利语',
          value: 'it',
        },
        {
          name: '泰语',
          value: 'th',
        },
        {
          name: '越南语',
          value: 'vi',
        },
        {
          name: '印尼语',
          value: 'id',
        },
        {
          name: '马来语',
          value: 'ms',
        },
        {
          name: '菲律宾语',
          value: 'fil',
        },
        {
          name: '高棉语',
          value: 'km',
        },
        {
          name: '缅甸语',
          value: 'my',
        },
        {
          name: '老挝语',
          value: 'lo',
        },
        {
          name: '孟加拉语',
          value: 'bn',
        },
        {
          name: '印地语',
          value: 'hi',
        },
        {
          name: '乌尔都语',
          value: 'ur',
        },
        {
          name: '泰米尔语',
          value: 'ta',
        },
        {
          name: '泰卢固语',
          value: 'te',
        },
        {
          name: '尼泊尔语',
          value: 'ne',
        },
        {
          name: '僧伽罗语',
          value: 'si',
        },
        {
          name: '马拉地语',
          value: 'mr',
        }
      ]
    },
    LangProtect: {
      Translate: "不翻译商品上的文字",
      Erase: "不擦除商品上的文字",
    },
    BackModel: {
      Title: '是否退出？',
      Desc: '是否退出到上传界面',
      Action: '退出',
      Yes: '是',
      No: '否',
    },
    DescModel: {
      Title: '视频生成要求',
      Desc: '可输入对生成视频的具体描述，如果没有输入则会自动根据图片生成',
      Action: '开始',
      Placeholder: '输入视频要求',
      Yes: '确认',
      No: '取消',
    },
    MdModel: {
      Title: '文字提取结果',
      Desc: '以下是从图片中提取的文字内容展示',
      Action: '查看',
      Placeholder: '输入视频要求',
      Yes: '复制',
      No: '关闭',
    },
    RatioModel: {
      Title: '图片比例',
      Desc: '选择生成图片的宽高比例',
      Action: '生成',
      Placeholder: '输入视频要求',
      Yes: '确认',
      No: '取消',
    },
    SizeModel: {
      Title: '自定义画布比例',
      Desc: '请在下方输入宽高对应比例',
      Action: '自定义',
      Yes: '确认',
      No: '取消',
    },
  }
};

type DeepPartial<T> = T extends object
  ? {
    [P in keyof T]?: DeepPartial<T[P]>;
  }
  : T;

export type LocaleType = typeof zh;
export type PartialLocaleType = DeepPartial<typeof zh>;

export default zh;
