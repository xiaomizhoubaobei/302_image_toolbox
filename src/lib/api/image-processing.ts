/**
 * @fileoverview 图片处理模块
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供各种图片处理功能，包括去背景、上色、矢量化、放大、换脸、重绘、修补等
 */

import { Action } from "@/types";
import { Result } from "./image";
import ImageManager from "@/utils/Image";
import SystemManager from "@/utils/System";
import { getToken } from "./token";
import { updTask } from "./storage";
import { fetchTask, fetchCreativeUpscaleTask, fetchTranslateImageResult } from "./task";
import { aiTranslate } from "./text";
import { uploadImage, matchImageSize } from "./image";

/**
 * 将 base64 图片转换为文件并上传
 * @param base64Image - base64 编码的图片数据
 * @returns 上传后的图片 URL
 */
async function convertAndUploadBase64(base64Image: string): Promise<string> {
  const base64 = 'data:image/png;base64,' + base64Image;
  const file = await ImageManager.imageToFile(base64);
  return uploadImage(file as File);
}

/**
 * 处理 fetch 错误响应
 * @param res - fetch 响应对象
 * @throws 错误信息
 */
async function handleFetchError(res: Response): Promise<never> {
  throw await res.json();
}

/**
 * 处理异步任务结果
 * @param res - fetch 响应对象
 * @returns 任务结果
 */
async function handleAsyncTask(res: Response): Promise<any> {
  let result = await res.json();
  updTask(result);
  if (result.output) {
    return result;
  }
  return fetchTask(result.id);
}

/**
 * 处理 Canvas 转换和上传
 * @param src - 图片源地址
 * @param canvas - Canvas 对象
 * @returns 上传后的图片结果
 */
async function handleCanvasUpload(src: string, canvas: any): Promise<any> {
  if (!canvas) {
    return { output: src };
  }
  const local = canvas.toDataURL();
  const file = await ImageManager.imageToFile(local) as File;
  const online = await uploadImage(file);
  return { output: online };
}

/**
 * 根据操作类型处理图片
 * @param src - 图片源地址
 * @param action - 操作参数
 * @returns 处理后的图片结果
 */
export async function generateImage(src: string, action: Action): Promise<Result> {
  return new Promise(async (resolve, reject) => {
    let res = null
    let result = { imageSrc: '', videoSrc: '', textContent: '' }
    try {
      if (action.type === 'remove-bg') {
        const file = await ImageManager.imageToFile(src) as File
        res = await removeBackground(file)
      }
      if (action.type === 'remove-obj') {
        const file = await ImageManager.imageToFile(src) as File
        const mask = action.payload.mask
        res = await removeObject(file, mask)
      }
      if (action.type === 'colorize') {
        const file = await ImageManager.imageToFile(src) as File
        const url = await uploadImage(file)
        res = await colorizeImage(url)
      }
      if (action.type === 'vectorize') {
        const file = await ImageManager.imageToFile(src) as File
        res = await vectorizeImage(file)
      }
      if (action.type === 'upscale') {
        const scale = Number(action.payload.scale)
        const file = await ImageManager.imageToFile(src) as File
        res = await upscaleImage(file, scale)
      }
      if (action.type === 'super-upscale') {
        const file = await ImageManager.imageToFile(src) as File
        const blob = await ImageManager.compressImage(file, { maxSizeMB: 3 })

        const minFile = new File([blob], 'mini.png', {
          type: 'image/png',
        })
        let prompt = action.payload.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        res = await creativeUpscaleImage(minFile, prompt)
      }
      if (action.type === 'swap-face') {
        const file = await ImageManager.imageToFile(src) as File
        const mask = action.payload.mask
        res = await swapFaceV2(file, mask)
      }
      if (action.type === 'recreate-img') {
        const file = await ImageManager.imageToFile(src) as File
        let prompt = action.payload.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        res = await recreatImage(file, prompt)
      }
      if (action.type === 'inpaint-img') {
        const file = await ImageManager.imageToFile(src) as File
        const mask = action.payload.mask
        let prompt = action.payload.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        res = await inpaintImage(file, mask, prompt)
      }
      if (action.type === 'sketch-img') {
        const file = await ImageManager.imageToFile(src) as File
        let prompt = action.payload.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        res = await sketchImage(file, prompt)
      }
      if (action.type === 'replace-bg') {
        const file = await ImageManager.imageToFile(src) as File
        let prompt = action.payload.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        const light = 'None'
        res = await lightImage(file, prompt, light)
      }
      if (action.type === 'crop-img') {
        const canvas = action.payload.canvas
        res = await cropImage(src, canvas)
      }
      if (action.type === 'uncrop') {
        const position = action.payload.position
        const mask = action.payload.mask
        res = await uncropImage(mask, position)
      }
      if (action.type === 'filter-img') {
        const canvas = action.payload.canvas
        res = await filterImage(src, canvas)
      }
      if (action.type === 'character') {
        const local = action.payload.canvas ? action.payload.canvas.toDataURL() : src
        const file = await ImageManager.imageToFile(local) as File
        const online = await uploadImage(file)
        const character = action.payload.character
        res = await characterImage(online, character)
      }
      if (action.type === 'selfie') {
        const local = action.payload.canvas ? action.payload.canvas.toDataURL() : src
        const file = await ImageManager.imageToFile(local) as File
        let prompt = action.payload.prompt
        if (SystemManager.containsChinese(prompt)) {
          prompt = await aiTranslate(prompt)
        }
        res = await selfieImage(file, prompt)
      }
      if (action.type === 'stitching') {
        const mask = action.payload.mask
        res = await stitchingImage(src, mask)
      }
      if (action.type === 'translate-text') {
        const protectLang = action.payload.protectLang || false
        const srcLang = action.payload.srcLang || 'auto'
        const tgtLang = action.payload.tgtLang || 'en'
        const file = await ImageManager.imageToFile(src) as File
        const online = await uploadImage(file)
        res = await translateImageText(online, protectLang, srcLang, tgtLang)
      }
      if (action.type === 'erase-text') {
        const protectLang = action.payload.protectLang || false
        const srcLang = action.payload.srcLang || 'auto'
        const tgtLang = ''
        const file = await ImageManager.imageToFile(src) as File
        const online = await uploadImage(file)
        res = await translateImageText(online, protectLang, srcLang, tgtLang)
      }

      // match reseult
      if (res && res.output.startsWith('[')) {
        result.imageSrc = JSON.parse(res.output)[0]
      } else if (res) {
        result.imageSrc = res.output
      }

      //  to online
      if (!result.imageSrc.startsWith('http') || !result.imageSrc.includes('photoshow')) {
        const newFile = await ImageManager.imageToFile(result.imageSrc) as File
        result.imageSrc = await uploadImage(newFile)
      }

      // return result
      if (result.imageSrc) {
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
 * SD 去除背景
 * @param file - 图片文件
 * @returns 处理后的图片结果
 */
export async function removeBackground(file: File): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/sd/v2beta/stable-image/edit/remove-background`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      const data = await res.json()

      if (data.image) {
        const url = await convertAndUploadBase64(data.image);
        resolve({ output: url })
      } else {
        reject('Recreate image faild!')
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 去除物体
 * @param file - 图片文件
 * @param mask - 遮罩文件
 * @returns 处理后的图片结果
 */
export async function removeObject(file: File, mask: File): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('mask', mask);

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/sd/v2beta/stable-image/edit/erase`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      const data = await res.json()

      if (data.image) {
        const url = await convertAndUploadBase64(data.image);
        resolve({ output: url })
      } else {
        reject('Recreate image faild!')
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 黑白上色
 * @param url - 图片 URL
 * @returns 处理后的图片结果
 */
export async function colorizeImage(url: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('image', url);

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/submit/colorize`, {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      resolve(await handleAsyncTask(res))

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 矢量化图片
 * @param file - 图片文件
 * @returns 矢量化后的图片结果
 */
export async function vectorizeImage(file: File): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/vectorizer/api/v1/vectorize`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${getToken()}`,
        },
      })

      if (!res.ok) {
        await handleFetchError(res);
      }

      const svgText = await res.text();
      const svgBlob = new Blob([svgText], { type: "image/svg+xml" });
      const svgFile = new File([svgBlob], 'result.svg', { type: "image/svg+xml" });
      const url = await uploadImage(svgFile)
      resolve({ output: url })
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 放大图片
 * @param file - 图片文件
 * @param scale - 放大倍数
 * @returns 放大后的图片结果
 */
export async function upscaleImage(file: File, scale: Number): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const url = await uploadImage(file)
      if (scale === 0) {
        resolve({ output: url })
        return
      }

      const data = {
        "image": url,
        "scale": scale,
        "face_enhance": true,
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/submit/upscale`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      resolve(await handleAsyncTask(res))
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 创意放大图片
 * @param file - 图片文件
 * @param prompt - 提示词
 * @returns 放大后的图片结果
 */
export async function creativeUpscaleImage(file: File, prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('prompt', prompt);

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/sd/v2beta/stable-image/upscale/creative`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      const result = await res.json()
      updTask(result)
      const taskResult = await fetchCreativeUpscaleTask(result.id) as any
      if (taskResult.image) {
        const url = await convertAndUploadBase64(taskResult.image);
        resolve({ output: url })
      } else {
        reject('Creative upscale image faild!')
      }

    } catch (error) {
      reject(error)
    }
  })
}
/**
 * 换脸 V2
 * @param target - 目标图片
 * @param mask - 换脸图片
 * @returns 换脸后的图片结果
 */
export async function swapFaceV2(target: File, mask: File): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('base_image_url', target);
      formData.append('swap_image_url', mask);

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/submit/face-swap-v2`, {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      const result = await handleAsyncTask(res);
      if (result.image) {
        resolve({ output: result.image.url })
      } else {
        resolve(result)
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 以图生图
 * @param file - 图片文件
 * @param prompt - 提示词
 * @returns 生成的图片结果
 */
export async function recreatImage(file: File, prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('prompt', prompt);

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/sd/v2beta/stable-image/control/structure`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      const data = await res.json()
      if (data.image) {
        const url = await convertAndUploadBase64(data.image);
        resolve({ output: url })
      } else {
        reject('Recreate image faild!')
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 图片修改（修补）
 * @param file - 图片文件
 * @param mask - 遮罩文件
 * @param prompt - 提示词
 * @returns 修改后的图片结果
 */
export async function inpaintImage(file: File, mask: File, prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('mask', mask);
      formData.append('prompt', prompt);

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/sd/v2beta/stable-image/edit/inpaint`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      const data = await res.json()
      if (data.image) {
        const url = await convertAndUploadBase64(data.image);
        resolve({ output: url })
      } else {
        reject('Recreate image faild!')
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 素描转图片
 * @param file - 素描图片文件
 * @param prompt - 提示词
 * @returns 生成的图片结果
 */
export async function sketchImage(file: File, prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('prompt', prompt);

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/sd/v2beta/stable-image/control/sketch`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      const data = await res.json()

      if (data.image) {
        const url = await convertAndUploadBase64(data.image);
        resolve({ output: url })
      } else {
        reject('Recreate image faild!')
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 替换背景（光照调整）
 * @param file - 图片文件
 * @param prompt - 提示词
 * @param light - 光源设置
 * @returns 处理后的图片结果
 */
export async function lightImage(file: File, prompt: string, light: string,): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const img: any = await ImageManager.readImageSize(file)
      const { width, height } = matchImageSize(img.width, img.height)
      const formData = new FormData();
      formData.append('subject_image', file);
      formData.append('prompt', prompt);
      formData.append('width', width + '');
      formData.append('height', height + '');
      formData.append('light_source', light);

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/submit/relight`, {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      resolve(await handleAsyncTask(res))
    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 裁剪图片
 * @param src - 图片源地址
 * @param canvas - Canvas 对象
 * @returns 裁剪后的图片结果
 */
export async function cropImage(src: string, canvas: any): Promise<any> {
  return handleCanvasUpload(src, canvas);
}

/**
 * 外扩图片
 * @param file - 图片文件
 * @param position - 外扩位置参数
 * @returns 外扩后的图片结果
 */
export async function uncropImage(file: File, position: any): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append("left", position.left + '');
      formData.append("right", position.right + '');
      formData.append("up", position.up + '');
      formData.append("bottom", position.down + '');
      formData.append("down", position.down + '');


      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/sd/v2beta/stable-image/edit/outpaint`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      const data = await res.json()

      if (data.image) {
        const url = await convertAndUploadBase64(data.image);
        resolve({ output: url })
      } else {
        reject('Recreate image faild!')
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 应用滤镜
 * @param src - 图片源地址
 * @param canvas - Canvas 对象
 * @returns 应用滤镜后的图片结果
 */
export async function filterImage(src: string, canvas: any): Promise<any> {
  return handleCanvasUpload(src, canvas);
}

/**
 * 角色转换
 * @param src - 图片源地址
 * @param character - 角色描述
 * @returns 转换后的图片结果
 */
export async function characterImage(src: string, character: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const raw = JSON.stringify({
        "inputs": [
          src,
          character,
        ]
      });
      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/glifapi/cly8jkms00001nknu1ycwjjiz`, {
        method: 'POST',
        body: raw,
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      const data = await res.json()

      if (data.outputFull) {
        resolve({ output: data.outputFull.value })
      } else {
        reject('Image is NOT Surpport!')
      }

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 自拍生成
 * @param file - 人脸图片文件
 * @param prompt - 提示词
 * @returns 生成的自拍图片结果
 */
export async function selfieImage(file: File, prompt: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const formData = new FormData();
      formData.append('main_face_image', file);
      formData.append("prompt", prompt);

      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/submit/flux-selfie`, {
        method: 'POST',
        body: formData,
        headers: {
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      let result = await res.json();
      if (result.output) {
        resolve(result)
        return
      }

      updTask(result)
      result = await fetchTask(result.id)
      resolve(result)

    } catch (error) {
      reject(error)
    }
  })
}

/**
 * 图片拼接
 * @param src - 图片源地址
 * @param mask - 拼接后的图片地址
 * @returns 拼接后的图片结果
 */
export async function stitchingImage(src: string, mask: string): Promise<any> {
  return new Promise(async (resolve) => {
    if (!mask) {
      resolve({ output: src })
      return
    }
    const result = {
      output: mask
    }
    resolve(result)
  })
}

/**
 * 图片文字翻译
 * @param src - 图片 URL
 * @param protectLang - 是否保护特定语言
 * @param srcLang - 源语言
 * @param tgtLang - 目标语言
 * @returns 翻译后的图片结果
 */
export async function translateImageText(src: string, protectLang: boolean, srcLang: string, tgtLang: string): Promise<any> {
  return new Promise(async (resolve, reject) => {
    try {
      const raw = JSON.stringify({
        "srcLang": srcLang,
        "tgtLang": tgtLang,
        "synthesisOn": 1,
        "translateOn": tgtLang ? 1 : 0,
        "commodityFilterOn": protectLang ? 1 : 0,
        "downloadInfo": `{"url":"${src}"}`,
        "callback": ""
      });
      const res = await fetch(`${process.env.NEXT_PUBLIC_FETCH_API_URL}/302/image/translate`, {
        method: 'POST',
        body: raw,
        headers: {
          'Accept': 'application/json',
          "Authorization": `Bearer ${getToken()}`,
        },
      })
      if (!res.ok) {
        await handleFetchError(res);
      }

      const data = await res.json()

      updTask(data)
      if (data.msg === 'success') {
        const result = await fetchTranslateImageResult(data.body) as any
        if (tgtLang) {
          resolve({ output: result.output_url })
        } else {
          resolve({ output: result.inpaint_url })
        }
      } else {
        reject(JSON.stringify(data))
      }

    } catch (error) {
      reject(error)
    }
  })
}
