/**
 * @fileoverview 视频生成模块
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供从图片生成视频的功能，支持多个视频生成模型
 *          支持的模型：Luma、Kling、Runway、Runway Turbo、CogVideoX
 */

import { Action } from "@/types";
import { Result } from "./image";
import ImageManager from "@/utils/Image";
import SystemManager from "@/utils/System";
import { getToken } from "./token";
import { updTask } from "./storage";
import { fetchLumaTask, fetchKlingTask, fetchRunwayTask, fetchCogTask } from "./task";
import { aiTranslate, aiImageToText, CREATE_VIDEO_PROMPT } from "./text";
import { uploadImage } from "./image";

/**
 * 处理 fetch 请求错误
 * @param res - fetch 响应对象
 * @throws 错误信息
 */
async function handleFetchError(res: Response): Promise<never> {
  throw await res.json();
}

/**
 * 上传图片并返回 URL
 * @param src - 图片源地址
 * @returns 图片 URL
 */
async function uploadSrcImage(src: string): Promise<string> {
  const file = await ImageManager.imageToFile(src) as File
  return uploadImage(file)
}

/**
 * 处理视频生成提示词（支持自动生成和翻译）
 * @param prompt - 原始提示词
 * @param url - 图片 URL（用于自动生成提示词）
 * @returns 处理后的提示词
 */
async function processVideoPrompt(prompt: string | undefined, url: string): Promise<string> {
  if (!prompt) {
    prompt = await aiImageToText(url, CREATE_VIDEO_PROMPT)
  }
  if (prompt && SystemManager.containsChinese(prompt)) {
    prompt = await aiTranslate(prompt)
  }
  return prompt || ''
}

/**
 * 根据图片生成视频
 * @param src - 图片源地址
 * @param action - 操作参数，包含模型类型、提示词等
 * @returns 生成的视频结果
 */
export async function generateVideo(src: string, action: Action): Promise<Result> {
  return new Promise(async (resolve, reject) => {
    let res = null
    let result = { imageSrc: '', videoSrc: '', textContent: '' }
    try {

      // Luma
      if (action.payload.model === 'luma') {
        const url = await uploadSrcImage(src)
        result.imageSrc = url
        const prompt = await processVideoPrompt(action.payload.prompt, url)
        res = await getLumaVideo(url, prompt)
      }

      // Kling
      if (action.payload.model === 'kling') {
        result.imageSrc = await uploadSrcImage(src)
        const ratio = action.payload.label || ''
        const file = await ImageManager.imageToFile(src) as File
        res = await getKlingVideo(file, ratio, action.payload.prompt || '')
      }

      // Runway
      if (action.payload.model === 'runway') {
        result.imageSrc = await uploadSrcImage(src)
        const file = await ImageManager.imageToFile(src) as File
        let prompt = action.payload.prompt
        if (prompt && SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        res = await getRunwayTurboVideo(file, prompt || '')
      }

      // Cog
      if (action.payload.model === 'cog') {
        const url = await uploadSrcImage(src)
        result.imageSrc = url
        const prompt = await processVideoPrompt(action.payload.prompt, url)
        res = await getCogVideo(url, prompt)
      }

      result.videoSrc = res?.output || ''

      if (result.videoSrc) {
        resolve(result)
      } else {
        reject('Create image error!')
      }
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 使用 Luma AI 生成视频
 * @param url - 图片 URL
 * @param prompt - 视频生成提示词
 * @returns 生成的视频结果
 */
export async function getLumaVideo(url: string, prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any

      const formData = new FormData();
      formData.append('user_prompt', prompt);
      formData.append('image_url', url);

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/luma/submit`, {
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
      updTask(result)
      if (result.video) {
        resolve({ output: result.video })
        return
      }
      result = await fetchLumaTask(result.id)
      resolve({ output: result.video })

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 使用 Kling AI 生成视频
 * @param file - 图片文件
 * @param ratio - 视频比例
 * @param prompt - 视频生成提示词
 * @returns 生成的视频结果
 */
export async function getKlingVideo(file: File, ratio: string, prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any

      const formdata = new FormData();
      formdata.append("input_image", file);
      formdata.append("prompt", prompt);
      formdata.append("negative_prompt", "");
      formdata.append("cfg", "0.5");
      formdata.append("aspect_ratio", ratio);
      formdata.append("camera_type", "zoom");
      formdata.append("camera_value", "-5");


      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/klingai/m2v_img2video`, {
        method: 'POST',
        body: formdata,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res)
      }

      result = await res.json()
      updTask(result.data.task)
      const video = result.data.works[0]?.resource.resource
      if (video) {
        resolve({ output: video })
        return
      }
      result = await fetchKlingTask(result.data.task.id)
      resolve(result)

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 使用 Runway Turbo 生成视频
 * @param file - 图片文件
 * @param prompt - 视频生成提示词
 * @returns 生成的视频结果
 */
export async function getRunwayTurboVideo(file: File, prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any

      const formdata = new FormData();
      formdata.append("init_image", file);
      formdata.append("text_prompt", prompt);
      formdata.append("seconds", "10");
      formdata.append("seed", "");


      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/runway_turbo/submit`, {
        method: 'POST',
        body: formdata,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res)
      }

      result = await res.json()
      updTask(result.task)
      const video = result.task.artifacts[0]?.url
      if (video) {
        resolve({ output: video })
        return
      }
      result = await fetchRunwayTask(result.task.id)
      resolve(result)

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 使用 CogVideoX 生成视频
 * @param url - 图片 URL
 * @param prompt - 视频生成提示词
 * @returns 生成的视频结果
 */
export async function getCogVideo(url: string, prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      let result: any
      const raw = JSON.stringify({
        model: 'cogvideox',
        prompt: prompt,
        image_url: url,

      })

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/zhipu/api/paas/v4/videos/generations`, {
        method: 'POST',
        body: raw,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
          "Content-Type": "application/json;charset:utf-8;",
        },
      })
      if (!res.ok) {
        await handleFetchError(res)
      }

      result = await res.json()
      updTask(result)
      if (result.task_status === 'SUCCESS') {
        resolve({ output: result.video_result[0].url })
        return
      }
      result = await fetchCogTask(result.id)
      resolve(result)

    } catch (error) {
      reject(error)
    }
  })
}