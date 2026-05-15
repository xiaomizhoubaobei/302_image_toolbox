import { LocaleType } from "./index";

const ja: LocaleType = {
  Symbol: "ja",
  Title: 'AI画像ツールボックス - 302.AI',
  Desc: 'The Photo Generation Tool Powered By 302.AI',
  System: {
    Title: 'システム',
    Wait: '待機中',
    Back: '戻る',
    Download: 'ダウンロード',
    DownloadImage: '画像をダウンロード',
    DownloadVideo: 'ビデオをダウンロード',
    CopyText: 'テキストをコピー',
    WaitImage: '画像生成中です。1～5分ほどお待ちください。',
    WaitVideo: 'ビデオ生成中です。3～10分ほどお待ちください。',
    WaitText: 'テキスト抽出中です。1～5分ほどお待ちください。',
    BackgroundPLaceholder: '背景画像の説明を入力してください',
    PromptPlaceholder: '画像変更の要求を入力してください',
    UploadFaceImage: '顔画像をアップロード',
    UploadNewImage: '新しい画像をアップロード',
    UploadStickImage: '貼り付け画像をアップロード',
    CleanStickImage: '貼り付け画像をクリア',
    UploadFile: 'クリックまたはドラッグしてアップロード',
    SelectFilter: 'フィルターを選択',
    ContinueEdit: '編集を続ける',
    ContinueRemove: '消去を続ける',
    ContinueExpand: '拡張を続ける',
    ContinueModify: '修正を続ける',
    Start: '開始',
    Save: '保存',
    Redo: 'やり直し',
    Retry: '再試行',
    Substract: '抽出',
    Confirm: '確認',
    Cancel: 'キャンセル',
  },
  Error: {
    Title: 'エラー',
    TokenMiss: (domain: string) => `このツールは無効化/削除されました。詳細は ${domain} をご覧ください。`,
    TokenInvalid: (domain: string) => `このツールは無効化/削除されました。詳細は ${domain} をご覧ください。`,
    InternalError: (domain: string) => `内部エラーが発生しました。詳細は ${domain} をご覧ください。`,
    AccountOut: (domain: string) => `アカウントの料金が不足しています。詳細は ${domain} をご覧ください。`,
    TokenExpired: (domain: string) => `認証コードが期限切れです。詳細は ${domain} をご覧ください。`,
    TotalOut: (domain: string) => `ツールの総容量が使い果たされました。詳細は ${domain} をご覧ください。`,
    TodayOut: (domain: string) => `ツールの今日の容量が使い果たされました。詳細は ${domain} をご覧ください。`,
    HourOut: (domain: string) => `この無料ツールは今時間の上限に達しました。 ${domain} を訪問して自分のツールを作成してください`, // -10012
    GenerateImageError: '画像生成エラーが発生しました。モデルを変更するか、プロンプトを修正して再試行してください。',
  },
  Auth: {
    Title: '認証',
    NeedCode: '鍵が不足しています',
    InputCode: '以下に302.AIの公式API-KEYを入力してください',
    PlaceHolder: 'sk-xxxxxxxxxxxxxxxxx',
    Submit: '保存',
  },
  Footer: {
    Title: '内容はAI生成によるものであり、参考用です。',
  },
  Home: {
    Title: 'ホーム',
  },
  About: {
    Title: '約',
    Desc: 'AI画像ツールボックス',
    Loading: '読み込み中...',
    CreateInfo: (user: string) => `このツールは302.AIユーザー ${user} によって作成されました。302.AIはAI生成と共有のプラットフォームで、簡単に自分のAIツールを作成できます。`,
    TotalInfo: (all: number, use: number) => `ツールの総限度は <${all}PTC> で、すでに <${use}PTC> 使用されています。`,
    DayInfo: (all: number, use: number) => `ツールの日次限度は <${all}PTC> で、すでに <${use}PTC> 使用されています。`,
    RecordInfo: 'ツールの生成記録はすべて本機に保存され、アップロードされることはありません。このツールの作成者はあなたの生成記録を閲覧できません。',
    MoreInfo: (domain: string) => `詳細は： ${domain} をご覧ください。`,
  },
  History: {
    Title: '履歴',
    Empty: 'データがありません',
    Clear: '履歴を削除',
    ItemCount: (count: number) => `合計 ${count} 件の履歴があります。`,
  },
  Photo: {
    Title: 'AI画像ツールボックス',
    Landing: {
      Or: 'または',
      NowSupport: '現在サポート中',
      InputLinkPlaceholder: 'リンクアドレスを入力してください。例：https://302.ai',
      CreateImagePlaceholder: '生成したい画像の説明を入力し、直接生成します',
      CreateImageAction: '生成',
    },
    Edit: {
    },
    Tool: {
      title: '現在サポート中',
      action: '試してみる',
      list: [
        {
          id: 1,
          name: 'remove-bg',
          icon: 'remove-bg',
          title: '背景除去',
          desc: '画像中の主体を正確に抽出します。',
        },
        {
          id: 2,
          name: 'remove-obj',
          icon: 'remove-obj',
          title: '物体消去',
          desc: '削除したい領域を消去します。',
        },
        {
          id: 3,
          name: 'replace-bg',
          icon: 'replace-bg',
          title: '背景置換',
          desc: '画像の背景を迅速に置換します。',
        },
        {
          id: 4,
          name: 'vectorize',
          icon: 'vectorize',
          title: '画像のベクター化',
          desc: '画像を無限拡大可能なベクター画像に変換。',
        },
        {
          id: 5,
          name: 'upscale',
          icon: 'upscale',
          title: '画像拡大',
          desc: '画像を2x、4x、8xに拡大できます。',
        },
        {
          id: 6,
          name: 'super-upscale',
          icon: 'super-upscale',
          title: 'スーパー画像拡大',
          desc: '生成で元の画像になかったディテールを追加。',
        },
        {
          id: 7,
          name: 'colorize',
          icon: 'colorize',
          title: '白黒着色',
          desc: '白黒写真に色を追加します。',
        },
        {
          id: 8,
          name: 'swap-face',
          icon: 'swap-face',
          title: 'AIフェイススワップ',
          desc: '画像内の人物の顔を交換します。',
        },
        {
          id: 9,
          name: 'uncrop',
          icon: 'uncrop',
          title: '画像拡張',
          desc: '画像の境界を広げます。',
        },
        {
          id: 10,
          name: 'inpaint-img',
          icon: 'inpaint-img',
          title: '画像修正',
          desc: '画像の内容をAIで修正します。',
        },
        {
          id: 11,
          name: 'recreate-img',
          icon: 'recreate-img',
          title: '画像生成から画像',
          desc: '現在の画像を基に新しい画像を生成します。',
        },
        {
          id: 12,
          name: 'sketch-img',
          icon: 'sketch-img',
          title: 'スケッチ生成',
          desc: 'スケッチを美しい画像に変換します。',
        },
        {
          id: 13,
          name: 'crop-img',
          icon: 'crop-img',
          title: '画像切り抜き',
          desc: '画像を正確に切り抜きます。',
        },
        {
          id: 14,
          name: 'filter-img',
          icon: 'filter-img',
          title: '画像調色',
          desc: '画像の色調を調整します。',
        },
        {
          id: 15,
          name: 'read-text',
          icon: 'read-text',
          title: '文字抽出',
          desc: '画像からテキストを抽出します。',
        },
        {

          id: 16,
          name: 'create-video',

          icon: 'create-video',
          title: 'ビデオ生成',
          desc: '画像の内容に基づいてビデオを生成します。',
        },
        {
          id: 17,
          name: 'character',
          icon: 'character',
          title: '人物フィルター',
          desc: '画像にスタイルフィルターを追加します。',
        },
        {
          id: 18,
          name: 'stitching',
          icon: 'stitching',
          title: '画像合成',
          desc: '複数の画像を一つに結合します。',
        },
        {
          id: 19,
          name: 'translate-text',
          icon: 'translate-text',
          title: 'Translate Text in Image',
          desc: 'Translate the text in the image',
        },
        {
          id: 20,
          name: 'erase-text',
          icon: 'erase-text',
          title: 'Erase Text in Image',
          desc: 'Erase the text in the image',
        },
      ]
    },
    Character: {
      Title: 'フィルターを選択:',
      Desc: '以下のスタイルフィルターのいずれかを選択して生成します。',
      List: [
        {
          label: 'オートクチュールイラスト',
          value: 'Haute Couture Illustration',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c01.png'
        },
        {
          label: 'シュールSFリアリズムイラスト',
          value: 'Surreal Sci-Fi Realism Illustration',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c02.png'
        },
        {
          label: '白黒ブロック印刷',
          value: 'Black and White Blockprint',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c03.png'
        },
        {
          label: 'ジェミニメ編集',
          value: 'Gemini Manga',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c04.png'
        },
        {
          label: 'リトルティニーズブロック印刷',
          value: 'Little Tinies Blockprint',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c05.png'
        },
        {
          label: 'ポップアートイラスト',
          value: 'Pop Art Illustration',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c06.png'
        },
        {
          label: 'ポイントイラスト',
          value: 'The Point Illustration',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c07.png'
        },
        {
          label: 'ソフトフォーカス3D',
          value: 'Soft Focus 3D',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c08.png'
        },
        {
          label: 'ペイントイラスト',
          value: 'Painted Illustration',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c09.png'
        },
        {
          label: 'カラフルコミック',
          value: 'Colorful Comicbook',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c10.png'
        },
        {
          label: 'ボールドラインアート',
          value: 'Bold Lineart',
          icon: 'https://img.mizhoubaobei.top/302AI/302_image_toolbox/images/c11.png'
        },
        {
          label: 'ソフトアニメイラスト',
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
          name: 'アートQRコード',
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
          name: 'カスタム',
          value: 0,
        },
      ],
    },
    LangSelecter: {
      Title: '言語を選択',
      List: [
        {
          name: '自動',
          value: 'auto',
        },
        {
          name: '中国語',
          value: 'zh',
        },
        {
          name: '英語',
          value: 'en',
        },
        {
          name: '日本語',
          value: 'ja',
        },
        {
          name: '韓国語',
          value: 'ko',
        },
        {
          name: 'ドイツ語',
          value: 'de',
        },
        {
          name: 'フランス語',
          value: 'fr',
        },
        {
          name: 'アラビア語',
          value: 'ar',
        },
        {
          name: 'スペイン語',
          value: 'es',
        },
        {
          name: 'ポルトガル語',
          value: 'pt',
        },
        {
          name: 'イタリア語',
          value: 'it',
        },
        {
          name: 'タイ語',
          value: 'th',
        },
        {
          name: 'ベトナム語',
          value: 'vi',
        },
        {
          name: 'インドネシア語',
          value: 'id',
        },
        {
          name: 'マレー語',
          value: 'ms',
        },
        {
          name: 'フィリピン語',
          value: 'fil',
        },
        {
          name: 'クメール語',
          value: 'km',
        },
        {
          name: 'ビルマ語',
          value: 'my',
        },
        {
          name: 'ラオス語',
          value: 'lo',
        },
        {
          name: 'ベンガル語',
          value: 'bn',
        },
        {
          name: 'ヒンディー語',
          value: 'hi',
        },
        {
          name: 'ウルドゥー語',
          value: 'ur',
        },
        {
          name: 'タミル語',
          value: 'ta',
        },
        {
          name: 'テルグ語',
          value: 'te',
        },
        {
          name: 'ネパール語',
          value: 'ne',
        },
        {
          name: 'シンハラ語',
          value: 'si',
        },
        {
          name: 'マラーティー語',
          value: 'mr',
        }
      ]
    },
    LangProtect: {
      Translate: "商品上の文字を翻訳しない",
      Erase: "商品上の文字を消去しない",
    },
    BackModel: {
      Title: '終了しますか？',
      Desc: 'アップロード画面に戻りますか？',
      Action: '終了',
      Yes: 'はい',
      No: 'いいえ',
    },
    DescModel: {
      Title: 'ビデオ生成要件',
      Desc: '生成するビデオの具体的な説明を入力できます。入力がなければ画像に基づいて自動生成されます。',
      Action: '開始',
      Placeholder: 'ビデオの要件を入力',
      Yes: '確認',
      No: 'キャンセル',
    },
    MdModel: {
      Title: 'テキスト抽出結果',
      Desc: '以下は画像から抽出されたテキスト内容です。',
      Action: '表示',
      Placeholder: 'ビデオの要件を入力',
      Yes: 'コピー',
      No: '閉じる',
    },
    RatioModel: {
      Title: '画像比率',
      Desc: '生成する画像のアスペクト比を選択します。',
      Action: '生成',
      Placeholder: 'ビデオの要件を入力',
      Yes: '確認',
      No: 'キャンセル',
    },
    SizeModel: {
      Title: 'カスタムキャンバスの比率',
      Desc: '以下に縦横の比率を入力してください。',
      Action: 'カスタム',
      Yes: '確認',
      No: 'キャンセル',
    },
  }
};

export default ja;
