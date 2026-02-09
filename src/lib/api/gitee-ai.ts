/**
 * @fileoverview Gitee AI 模力方舟 API 模块
 * @author 祁筱欣
 * @date 2026-02-08
 * @since 2026-02-08
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供 Gitee AI 模力方舟的核心 API 功能
 *          参考文档：https://ai.gitee.com/docs/openapi/v1
 *
 *          支持的功能：
 *          - 文生图 (POST /v1/images/generations)
 *          - 模型列表类型定义
 */

/**
 * 模型信息接口
 * @property id - 模型唯一标识符
 * @property object - 对象类型，通常为 "model"
 * @property created - 创建时间戳
 * @property owned_by - 模型拥有者
 */
export interface GiteeAIModel {
  id: string
  object: string
  created: number
  owned_by: string
}

/**
 * 模型列表响应接口
 * @property object - 对象类型，通常为 "list"
 * @property data - 模型列表数组
 */
export interface GiteeAIModelsResponse {
  object: string
  data: GiteeAIModel[]
}

/**
 * 文生图请求参数接口
 * @property prompt - 图片生成提示词
 * @property model - 模型名称
 * @property size - 图片尺寸（默认 "1024x1024"）
 * @property num_inference_steps - 推理步数（默认 25）
 * @property guidance_scale - 引导比例（默认 7.5）
 * @property negative_prompt - 负面提示词（可选）
 */
export interface GenerateImageAction {
  prompt: string
  model: string
  size?: string
  num_inference_steps?: number
  guidance_scale?: number
  negative_prompt?: string
}

/**
 * 处理 fetch 请求错误
 * @param res - fetch 响应对象
 * @throws 错误信息
 */
async function handleFetchError(res: Response): Promise<never> {
  throw await res.json();
}

/**
 * 使用 Gitee AI 生成图片（文生图）
 * @param action - 文生图请求参数
 * @param baseUrl - Gitee AI API 基础 URL（可选，默认为 https://ai.gitee.com）
 * @param token - Gitee AI API Token（可选，从环境变量获取）
 * @returns base64 编码的图片 data URL
 * 
 * @example
 * ```typescript
 * const imageUrl = await generateImageWithGiteeAI({
 *   prompt: '一只白色的暹罗猫',
 *   model: 'Kolors',
 *   size: '1024x1024',
 *   num_inference_steps: 25,
 *   guidance_scale: 7.5,
 * })
 * // imageUrl 格式: "data:image/png;base64,..."
 * ```
 */
export async function generateImageWithGiteeAI(
  action: GenerateImageAction,
  baseUrl: string = 'https://ai.gitee.com',
  token?: string
): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiKey = token || process.env.NEXT_PUBLIC_GITEE_AI_API_KEY || ''

      if (!apiKey) {
        throw new Error('Gitee AI API Key is required')
      }

      const requestBody = {
        prompt: action.prompt,
        model: action.model,
        size: action.size || '1024x1024',
        response_format: 'b64_json',
        num_inference_steps: action.num_inference_steps || 25,
        guidance_scale: action.guidance_scale || 7.5,
        ...(action.negative_prompt && { negative_prompt: action.negative_prompt }),
      }

      const response = await fetch(`${baseUrl}/v1/images/generations`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
          'X-Failover-Enabled': 'true',
        },
        body: JSON.stringify(requestBody),
      })

      if (!response.ok) {
        await handleFetchError(response)
      }

      const result = await response.json()

      if (result.data && result.data[0] && result.data[0].b64_json) {
        // 将 base64 数据转换为 data URL
        const dataUrl = `data:image/png;base64,${result.data[0].b64_json}`
        resolve(dataUrl)
      } else {
        reject(new Error('Invalid response format'))
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 获取 Gitee AI 模型列表（简化版，建议使用 GiteeAIModelsManager）
 * @param baseUrl - Gitee AI API 基础 URL（可选，默认为 https://ai.gitee.com）
 * @param token - Gitee AI API Token（可选，从环境变量获取）
 * @returns 模型列表响应
 * @deprecated 建议使用 GiteeAIModelsManager.getInstance().fetchModels()
 */
export async function getGiteeAIModels(
  baseUrl: string = 'https://ai.gitee.com',
  token?: string
): Promise<GiteeAIModelsResponse> {
  return new Promise(async (resolve, reject) => {
    try {
      const apiKey = token || process.env.NEXT_PUBLIC_GITEE_AI_API_KEY || ''

      const response = await fetch(`${baseUrl}/v1/models`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
        },
      })

      if (!response.ok) {
        await handleFetchError(response)
      }

      const result = await response.json()
      resolve(result)
    } catch (error) {
      reject(error)
    }
  })
}
