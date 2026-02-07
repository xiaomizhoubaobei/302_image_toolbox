/**
 * @fileoverview 文本生成图片模块
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供多种 AI 模型的文本生成图片功能
 *          支持的模型：SD3、Flux、Kolors、SDXL-Lightning、Aura-Flow、QR-Code
 */

import SystemManager from "@/utils/System";
import { getToken } from "./token";
import { aiTranslate } from "./text";

/**
 * 处理 fetch 请求错误
 * @param res - fetch 响应对象
 * @throws 错误信息
 */
async function handleFetchError(res: Response): Promise<never> {
  throw await res.json();
}

/**
 * 文本生成图片的请求参数接口
 * @property prompt - 图片生成提示词
 * @property link - 二维码目标链接（仅用于 QR-Code 模型）
 * @property model - 使用的 AI 模型配置
 * @property ratio - 图片尺寸/比例配置
 */
export interface TextToImageAction {
  prompt: string
  link: string
  model: any,
  ratio: any
}

/**
 * 文本生成图片的返回结果接口
 * @property imageSrc - 生成的图片 URL
 */
export interface TextToImageResult {
  imageSrc: string
}

/**
 * 文本生成图片主函数
 * 根据指定的模型调用相应的图片生成函数
 * @param action - 文本生成图片的请求参数
 * @returns 生成的图片结果
 */
export async function textToImage(action: TextToImageAction): Promise<TextToImageResult> {
  return new Promise(async (resolve, reject) => {
    try {
      let res = null
      let result = { imageSrc: '' }
      if (action.model.value === 'sd3') {
        let prompt = action.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        const size = action.ratio.size
        res = await sd3V2CreateImage(prompt, size)
      }
      // flux
      if (action.model.value.includes('flux')) {
        let prompt = action.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        const size = {
          width: Number(action.ratio.size.split('x')[0]),
          height: Number(action.ratio.size.split('x')[1]),
        }
        res = await fluxCreateImage(action.model.value, prompt, size)
      }
      // kolors
      if (action.model.value === 'kolors') {
        let prompt = action.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        const size = {
          width: Number(action.ratio.size.split('x')[0]),
          height: Number(action.ratio.size.split('x')[1]),
        }
        res = await kolorsCreateImage(prompt, size)
      }
      // sdxl
      if (action.model.value === 'sdxl-lightning') {
        let prompt = action.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        const size = {
          width: Number(action.ratio.size.split('x')[0]),
          height: Number(action.ratio.size.split('x')[1]),
        }
        res = await sdxlCreateImage(prompt, size)
      }
      // aura-flow
      if (action.model.value === 'aura-flow') {
        let prompt = action.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        res = await auraCreateImage(prompt)
      }
      // qr-code
      if (action.model.value === 'qr-code') {
        const link = action.link
        let prompt = action.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        res = await qrcodeCreateImage(prompt, link)
      }

      if (res && res.output) {
        result.imageSrc = res.output
        resolve(result)
      } else {
        reject('Create Image Error!')
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * SD3 V2 文本生成图片
 * @param prompt - 图片生成提示词
 * @param size - 图片尺寸
 * @returns 生成的图片结果
 */
export async function sd3V2CreateImage(prompt: string, size: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result

      const raw = JSON.stringify({
        "prompt": prompt,
        "image_size": size,
        "batch_size": 1,
        "num_inference_steps": 20,
        "guidance_scale": 7.5
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/submit/stable-diffusion-3-v2`, {
        method: 'POST',
        body: raw,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res)
      }

      result = await res.json()
      if (result.images) {
        result.output = result.images[0].url
        resolve(result)
        return
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Flux 文本生成图片
 * @param name - 模型名称
 * @param prompt - 图片生成提示词
 * @param size - 图片尺寸
 * @returns 生成的图片结果
 */
export async function fluxCreateImage(name: string, prompt: string, size: { width: number, height: number }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result

      const raw = JSON.stringify({
        "prompt": prompt,
        "image_size": size,
        "num_inference_steps": 12,
        "guidance_scale": 3.5
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/submit/${name}`, {
        method: 'POST',
        body: raw,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res)
      }

      result = await res.json()
      if (result.images) {
        result.output = result.images[0].url
        resolve(result)
        return
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Kolors 文本生成图片
 * @param prompt - 图片生成提示词
 * @param size - 图片尺寸
 * @returns 生成的图片结果
 */
export async function kolorsCreateImage(prompt: string, size: { width: number, height: number }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result

      const raw = JSON.stringify({
        "prompt": prompt,
        "image_size": size,
        "num_inference_steps": 12,
        "guidance_scale": 3.5
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/submit/kolors`, {
        method: 'POST',
        body: raw,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res)
      }

      result = await res.json()
      if (result.images) {
        result.output = result.images[0].url
        resolve(result)
        return
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * SDXL Lightning 文本生成图片
 * @param prompt - 图片生成提示词
 * @param size - 图片尺寸
 * @returns 生成的图片结果
 */
export async function sdxlCreateImage(prompt: string, size: { width: number, height: number }): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result

      const raw = JSON.stringify({
        "prompt": prompt,
        "image_size": size,
        "embeddings": [],
        "format": 'jpeg'
      });

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/submit/sdxl-lightning-v2`, {
        method: 'POST',
        body: raw,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res)
      }

      result = await res.json()
      if (result.images) {
        result.output = result.images[0].url
        resolve(result)
        return
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * Aura Flow 文本生成图片
 * @param prompt - 图片生成提示词
 * @returns 生成的图片结果
 */
export async function auraCreateImage(prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result
      const formData = new FormData();
      formData.append('prompt', prompt)

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/submit/aura-flow`, {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res)
      }

      result = await res.json()
      if (result.images) {
        result.output = result.images[0].url
        resolve(result)
        return
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 二维码生成图片
 * @param prompt - 图片生成提示词
 * @param link - 二维码目标链接
 * @returns 生成的图片结果
 */
export async function qrcodeCreateImage(prompt: string, link: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result
      const formData = new FormData();
      formData.append('url', link)
      formData.append('prompt', prompt)
      formData.append('qr_conditioning_scale', '1.5')

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/submit/qrcode-gen`, {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res)
      }

      result = await res.json()
      if (result.output) {
        result.output = JSON.parse(result.output)[0]
        resolve(result)
        return
      } else {
        reject('Miss output')
      }

    } catch (error) {
      reject(error)
    }
  })
}