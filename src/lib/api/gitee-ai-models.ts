/**
 * @fileoverview Gitee AI 模型管理类
 * @author 祁筱欣
 * @date 2026-02-08
 * @since 2026-02-08
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了 Gitee AI 模型列表的管理类，提供模型的获取、缓存、过滤等功能
 */

import { GiteeAIModel, GiteeAIModelsResponse } from './gitee-ai'

/**
 * Gitee AI 模型类型枚举
 */
export enum ModelType {
  TextGeneration = 'text-generation',
  ImageGeneration = 'image-generation',
  ImageEdit = 'image-edit',
  VideoGeneration = 'video-generation',
  AudioTTS = 'audio-tts',
  AudioASR = 'audio-asr',
  Embedding = 'embedding',
  Reranker = 'reranker',
  Vision = 'vision',
  OCR = 'ocr',
  ThreeD = '3d',
  Classifier = 'classifier',
  Search = 'search',
  Workflow = 'workflow',
  Unknown = 'unknown',
}

/**
 * 模型信息接口
 */
export interface ModelInfo {
  id: string
  name: string
  type: ModelType
  owner?: string
  created: number
}

/**
 * 推荐的文生图模型配置
 */
export interface RecommendedTextToImageModel {
  name: string
  value: string
  description?: string
}

/**
 * Gitee AI 模型管理类
 * 提供模型列表的获取、缓存、过滤等功能
 */
export class GiteeAIModelsManager {
  private static instance: GiteeAIModelsManager
  private models: GiteeAIModel[] = []
  private lastFetchTime: number = 0
  private cacheDuration: number = 30 * 60 * 1000 // 30分钟缓存
  private baseUrl: string
  private token: string

  private constructor(baseUrl?: string, token?: string) {
    this.baseUrl = baseUrl || 'https://ai.gitee.com'
    this.token = token || ''
  }

  /**
   * 获取单例实例
   */
  public static getInstance(baseUrl?: string, token?: string): GiteeAIModelsManager {
    if (!GiteeAIModelsManager.instance) {
      GiteeAIModelsManager.instance = new GiteeAIModelsManager(baseUrl, token)
    }
    return GiteeAIModelsManager.instance
  }

  /**
   * 获取所有模型（带缓存）
   */
  public async fetchModels(forceRefresh: boolean = false): Promise<GiteeAIModel[]> {
    const now = Date.now()
    
    // 如果缓存未过期且不强制刷新，返回缓存
    if (!forceRefresh && this.models.length > 0 && (now - this.lastFetchTime) < this.cacheDuration) {
      return this.models
    }

    // 从 localStorage 获取最新的 token
    let currentToken = this.token;
    if (typeof window !== 'undefined') {
      const store = window.localStorage.getItem('config-store');
      if (store) {
        try {
          const config = JSON.parse(store);
          currentToken = config.state?.giteeToken || this.token;
        } catch (e) {
          // 使用默认值
        }
      }
    }
    // 如果 localStorage 中没有，尝试从环境变量获取
    if (!currentToken) {
      currentToken = process.env.NEXT_PUBLIC_GITEE_AI_API_KEY || '';
    }

    // 获取最新模型列表
    const response = await fetch(`${this.baseUrl}/v1/models`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${currentToken}`,
      },
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch models: ${response.statusText}`)
    }

    const result: GiteeAIModelsResponse = await response.json()
    this.models = result.data || []
    this.lastFetchTime = now

    return this.models
  }

  /**
   * 根据类型过滤模型
   */
  public filterModelsByType(models: GiteeAIModel[], type: ModelType): GiteeAIModel[] {
    return models.filter(model => this.identifyModelType(model) === type)
  }

  /**
   * 识别单个模型的类型
   */
  public identifyModelType(model: GiteeAIModel): ModelType {
    const id = model.id.toLowerCase()
    const ownedBy = model.owned_by?.toLowerCase() || ''

    // 图片生成
    if (id.includes('flux') || id.includes('kolors') || id.includes('sd') || 
        id.includes('stable-diffusion') || id.includes('glm-image') || id.includes('qwen-image') ||
        id.includes('z-image') || id.includes('cogview') || id.includes('cogvideox') ||
        ownedBy.includes('black-forest-labs') || ownedBy.includes('tongyi-mai')) {
      return ModelType.ImageGeneration
    }

    // 图片编辑
    if (id.includes('rmbg') || id.includes('remove') || id.includes('erase') ||
        id.includes('edit') || id.includes('inpaint') || id.includes('uncrop') ||
        id.includes('crop') || id.includes('upscale') || id.includes('enhance') ||
        id.includes('restore') || id.includes('filter') || id.includes('colorize') ||
        id.includes('vectorize') || id.includes('real-esrgan')) {
      return ModelType.ImageEdit
    }

    // 视频生成
    if (id.includes('video') || id.includes('wan') || id.includes('cogvideox') ||
        id.includes('hunyuanvideo') || id.includes('luma') || id.includes('kling') ||
        id.includes('runway') || id.includes('stepvideo')) {
      return ModelType.VideoGeneration
    }

    // 语音合成
    if (id.includes('tts') || id.includes('voice') || id.includes('cosyvoice') ||
        id.includes('megasynth') || id.includes('megatts') || id.includes('indextts') ||
        id.includes('fish-speech') || id.includes('vibevoice')) {
      return ModelType.AudioTTS
    }

    // 语音识别
    if (id.includes('asr') || id.includes('whisper') || id.includes('sensevoice') ||
        id.includes('funasr') || id.includes('recognize') || id.includes('speech')) {
      return ModelType.AudioASR
    }

    // 向量嵌入
    if (id.includes('embedding') || id.includes('bge') || id.includes('jina') ||
        id.includes('nomic') || id.includes('clip') || id.includes('vit') ||
        id.includes('all-mpnet') || id.includes('e5')) {
      return ModelType.Embedding
    }

    // 重排序
    if (id.includes('reranker') || id.includes('rank') || id.includes('retrieval')) {
      return ModelType.Reranker
    }

    // 视觉理解
    if (id.includes('vl') || id.includes('vision') || id.includes('internvl') ||
        id.includes('qwen-vl') || id.includes('glm-v') || id.includes('multimodal')) {
      return ModelType.Vision
    }

    // 文字识别
    if (id.includes('ocr') || id.includes('deepseek-ocr') || id.includes('paddleocr') ||
        id.includes('got-ocr') || id.includes('hunyuanocr') || id.includes('text-recognition')) {
      return ModelType.OCR
    }

    // 3D 生成
    if (id.includes('3d') || id.includes('hunyuan3d') || id.includes('step1x-3d') ||
        id.includes('shap-e') || id.includes('mesh')) {
      return ModelType.ThreeD
    }

    // 分类模型
    if (id.includes('classifier') || id.includes('classify') || id.includes('nsfw') ||
        id.includes('yolo') || id.includes('detect') || id.includes('segment')) {
      return ModelType.Classifier
    }

    // 搜索模型
    if (id.includes('search')) {
      return ModelType.Search
    }

    // 工作流
    if (id.includes('comfyui') || id.includes('workflow') || id.includes('pipeline')) {
      return ModelType.Workflow
    }

    return ModelType.Unknown
  }

  /**
   * 格式化为 UI 选项
   */
  public formatModelsAsOptions(models: GiteeAIModel[]): Array<{ name: string, value: string }> {
    return models.map(model => ({
      name: model.id,
      value: model.id,
    }))
  }

  /**
   * 获取模型分类统计
   */
  public getModelTypeStats(models: GiteeAIModel[]): Record<ModelType, number> {
    const stats: Record<ModelType, number> = {} as any
    
    models.forEach(model => {
      const type = this.identifyModelType(model)
      stats[type] = (stats[type] || 0) + 1
    })

    return stats
  }

  /**
   * 按拥有者分组
   */
  public groupModelsByOwner(models: GiteeAIModel[]): Record<string, GiteeAIModel[]> {
    const grouped: Record<string, GiteeAIModel[]> = {}
    
    models.forEach(model => {
      const owner = model.owned_by || 'Unknown'
      if (!grouped[owner]) {
        grouped[owner] = []
      }
      grouped[owner].push(model)
    })

    return grouped
  }

  /**
   * 搜索模型
   */
  public searchModels(models: GiteeAIModel[], query: string): GiteeAIModel[] {
    const lowerQuery = query.toLowerCase()
    return models.filter(model => 
      model.id.toLowerCase().includes(lowerQuery) ||
      (model.owned_by && model.owned_by.toLowerCase().includes(lowerQuery))
    )
  }

  /**
   * 获取热门模型（按创建时间排序）
   */
  public getTopModels(models: GiteeAIModel[], limit: number = 10): GiteeAIModel[] {
    return [...models]
      .sort((a, b) => b.created - a.created)
      .slice(0, limit)
  }

  /**
   * 获取所有可用的模型类型
   */
  public getAvailableModelTypes(models: GiteeAIModel[]): ModelType[] {
    const types = new Set<ModelType>()
    
    models.forEach(model => {
      types.add(this.identifyModelType(model))
    })

    return Array.from(types)
  }

  /**
   * 获取模型类型的显示名称（中文）
   */
  public getModelTypeDisplayName(type: ModelType): string {
    const names: Record<ModelType, string> = {
      [ModelType.TextGeneration]: '文本生成',
      [ModelType.ImageGeneration]: '图片生成',
      [ModelType.ImageEdit]: '图片编辑',
      [ModelType.VideoGeneration]: '视频生成',
      [ModelType.AudioTTS]: '语音合成',
      [ModelType.AudioASR]: '语音识别',
      [ModelType.Embedding]: '向量嵌入',
      [ModelType.Reranker]: '重排序',
      [ModelType.Vision]: '视觉理解',
      [ModelType.OCR]: '文字识别',
      [ModelType.ThreeD]: '3D 生成',
      [ModelType.Classifier]: '分类模型',
      [ModelType.Search]: '搜索模型',
      [ModelType.Workflow]: '工作流',
      [ModelType.Unknown]: '未知类型',
    }

    return names[type] || type
  }

  /**
   * 获取推荐的文生图模型列表
   */
  public getRecommendedTextToImageModels(): RecommendedTextToImageModel[] {
    return [
      { name: 'Kolors', value: 'Kolors', description: '可灵文生图，高质量图像生成' },
      { name: 'FLUX.2-dev', value: 'FLUX.2-dev', description: 'Flux 开发版，优秀的图像生成能力' },
      { name: 'FLUX.2-klein-4B', value: 'FLUX.2-klein-4B', description: 'Flux Klein 4B，轻量级模型' },
      { name: 'FLUX.2-klein-9B', value: 'FLUX.2-klein-9B', description: 'Flux Klein 9B，平衡性能与质量' },
      { name: 'Z-Image', value: 'Z-Image', description: '通义万相图像生成' },
      { name: 'GLM-Image', value: 'GLM-Image', description: '智谱 GLM 图像生成' },
      { name: 'Qwen-Image', value: 'Qwen-Image', description: 'Qwen 图像生成模型' },
      { name: 'Qwen-Image-Layered', value: 'Qwen-Image-Layered', description: 'Qwen 分层图像生成' },
      { name: 'CogView4_6B', value: 'CogView4_6B', description: '智谱 CogView 4.6B' },
      { name: 'stable-diffusion-3.5-large', value: 'stable-diffusion-3.5-large', description: 'SD 3.5 大模型' },
    ]
  }

  /**
   * 清除缓存
   */
  public clearCache(): void {
    this.models = []
    this.lastFetchTime = 0
  }

  /**
   * 设置缓存持续时间（毫秒）
   */
  public setCacheDuration(duration: number): void {
    this.cacheDuration = duration
  }

  /**
   * 获取缓存的模型列表
   */
  public getCachedModels(): GiteeAIModel[] {
    return this.models
  }

  /**
   * 获取最后获取时间
   */
  public getLastFetchTime(): number {
    return this.lastFetchTime
  }
}

/**
 * 导出默认实例
 */
export const giteeAIModelsManager = GiteeAIModelsManager.getInstance()
