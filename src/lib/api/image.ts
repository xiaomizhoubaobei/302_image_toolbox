/**
 * @fileoverview 图片处理基础模块
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供图片上传和图片尺寸匹配等基础功能
 */

/**
 * 上传图片到服务器
 * @param file - 要上传的图片文件
 * @returns 上传后的图片 URL
 */
export async function uploadImage(file: File) {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('prefix', 'photoshow');

    const response = await fetch(`${process.env.NEXT_PUBLIC_UPLOAD_API_URL}`, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    return data.data.url;
  } catch (error) {
    console.error('图片传输错误:', error);
  }
}

/**
 * 匹配图片尺寸到最接近的标准尺寸
 * @param inputWidth - 输入宽度
 * @param inputHeight - 输入高度
 * @returns 匹配后的宽高对象
 */
export function matchImageSize(inputWidth: number, inputHeight: number) {
  let isSwitch = false
  let width: number
  let height: number
  if (inputWidth > inputHeight) {
    width = Math.floor(inputWidth)
    height = Math.floor(inputHeight)
  } else {
    isSwitch = true
    width = Math.floor(inputHeight)
    height = Math.floor(inputWidth)
  }
  const ratio = width / height;

  const sizes = [256, 320, 384, 448, 512, 576, 640, 704, 768, 832, 896, 960, 1024];

  let newWidth = sizes[0];
  let newHeight: number;

  if (width > sizes[sizes.length - 1]) {
    newWidth = sizes[sizes.length - 1]
  } else {
    for (let i = 0; i < sizes.length; i++) {
      if (sizes[i] >= width) {
        newWidth = sizes[i];
        break;
      }
    }
  }

  newHeight = Math.floor(newWidth / ratio);

  for (let i = 0; i < sizes.length; i++) {
    if (sizes[i] >= newHeight) {
      newHeight = sizes[i];
      break;
    }
  }

  if (isSwitch) {
    // 当原始输入需要交换时，交换返回的宽高值
    return { width: newHeight as any, height: newWidth as any };
  }
  return { width: newWidth, height: newHeight };
}

/**
 * 图片处理结果接口
 * @property imageSrc - 处理后的图片 URL
 * @property videoSrc - 生成的视频 URL
 * @property textContent - 识别或提取的文字内容
 */
export interface Result {
  imageSrc: string
  videoSrc: string
  textContent: string
}