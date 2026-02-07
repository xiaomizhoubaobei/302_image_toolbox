/**
 * @fileoverview 图片处理工具类
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供图片处理相关工具方法，包括图片压缩、格式转换、尺寸读取、下载等功能
 */

// import { saveAs } from 'file-saver';
interface CompressOptions {
  maxSizeMB: number; // 最大图片大小，单位为MB
  mimeType?: string; // 输出图片的MIME类型，例如 'image/jpeg'
  quality?: number; // 压缩质量，0到1之间的小数
}

export default class ImageManager {
  // 压缩数据
  static compressImageBlob = (blob: Blob, maxSizeMB: number, mimeType: string, quality: number): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');

          if (!ctx) {
            return reject(new Error('Failed to get 2D context'));
          }

          let width = img.width;
          let height = img.height;

          while ((width * height * 4) / (1024 * 1024) > maxSizeMB) {
            width /= 1.1;
            height /= 1.1;
            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);
          }

          canvas.toBlob((compressedBlob) => {
            if (compressedBlob) {
              resolve(compressedBlob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          }, mimeType, quality);
        };

        img.onerror = reject;
        img.src = String(reader.result);
      };

      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  // 压缩图片
  static compressImage = (file: File, options: CompressOptions): Promise<Blob> => {
    const { maxSizeMB, mimeType = 'image/jpeg', quality = 0.8 } = options;

    return new Promise((resolve, reject) => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event) => {
        img.src = (event.target?.result as string) || '';
      };

      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return reject(new Error('Failed to get 2D context'));
        }

        let width = img.width;
        let height = img.height;

        // 调整图片尺寸，以确保符合最大大小
        while ((width * height * 4) / (1024 * 1024) > maxSizeMB) {
          width /= 1.1;
          height /= 1.1;
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            // 再次调整质量，确保符合最大大小
            if (blob.size > maxSizeMB * 1024 * 1024) {
              return this.compressImageBlob(blob, maxSizeMB, mimeType, quality).then(resolve, reject);
            }
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        }, mimeType, quality);
      };

      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };


  // 下载图片为文件
  static imageToFile = async (url: string) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        return null
      }
      const blob = await res.blob();
      // 创建一个File对象
      let fileName = 'file.jpg'
      if (url.includes('.svg')) {
        fileName = 'file.svg'
      }
       return  new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error('Error transferring image:', error);
      return null
    }
  }


  // 读取文件为图片
  static fielToImage = async (file: File) => {
    return new Promise((resolve, reject) => {
      try {
        const url = URL.createObjectURL(file)
        resolve(url)
      } catch (error) {
        reject('File to image error')
      }
    })
  }

  // 读取file为base64
  static fileToBase64 = async (file: any) => {
    return new Promise((resolve, reject) => {
      try {
        const reader = new FileReader();
        reader.onload = function (event) {
          const result = event?.target?.result;
          resolve(result)
        };
        reader.readAsDataURL(file);
      } catch (error) {
        reject('file to base64 error')
      }
    })
  }

  // 下载图片为本地Base64
  static imageToBase64 = async (url: string) => {
    try {
      if (url.includes('base64')) {
        return url
      }
      const file = await this.imageToFile(url)
      return  await this.fileToBase64(file)
    } catch (error) {
      console.error('Error transferring image:', error);
      return null
    }
  }

  // 转换图片格式 
  static pngToJpg = async (url: string) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(image, 0, 0);
        const jpegData = canvas.toDataURL('image/jpeg');
        resolve(jpegData);
      };
      image.onerror = reject;
    });
  }

  // 转换文件格式
  static pngFileToJpgFile = async (file: File) => {
    return new Promise(async (resolve, reject) => {
      try {
        const url = URL.createObjectURL(file)
        const jpg = await ImageManager.pngToJpg(url) as string
        const result = await ImageManager.imageToFile(jpg)
        resolve(result)
      } catch (error) {
        reject('png file to jpg file error')
      }
    })
  }

  // 读取图片宽高
  static readImageSize = async (file: File) => {
    return new Promise((resolve, reject) => {
      try {
        const url = URL.createObjectURL(file)
        const img = new Image()
        img.src = url
        img.onload = () => {
          if (img.width && img.height) {
            resolve({ width: img.width, height: img.height })
          }
        }
        img.onerror = () => {
          reject('Load image error')
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  // 本地化图片地址
  static localizeImage = async (url: string) => {
    try {
      const file = await ImageManager.imageToFile(url)
      return  URL.createObjectURL(file as File);
    } catch (error) {
      return null
    }
  }

  static resetSizeCanvas = async (originCanvas: any, size: { width: number, height: number }) => {
    return new Promise((resolve) => {
      const originUrl = originCanvas.toDataURL('image/png')
      const originImage = new Image()
      originImage.onload = () => {
        const newCanvas = document.createElement('canvas')
        const newContext = newCanvas.getContext('2d')
        if (newContext && originImage) {
          newCanvas.width = size.width
          newCanvas.height = size.height
          newContext.drawImage(
            originImage,
            0,
            0,
            newCanvas.width,
            newCanvas.height
          )
          resolve(newCanvas)
        }
      }
      originImage.src = originUrl
    })
  }

  // 加载图片
  static loadImage = async (src: string) => {
    const img = new Image()
    img.src = src
  }

  // Canvas 转 Blob
  static canvasToBlob(
    canvas: HTMLCanvasElement,
    type: 'image/jpeg' | 'image/png' = 'image/png',
    quality?: number
  ): Promise<Blob | null> {
    return new Promise((res) => {
      canvas.toBlob((blob) => res(blob), type, quality)
    })
  }

  // 下载图片
  static downloadImage(uri: string, name: string) {
    const link = document.createElement('a')
    link.href = uri
    link.download = name

    link.dispatchEvent(
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
        view: window,
      })
    )

    setTimeout(() => {
      link.remove()
    }, 100)
  }

  /**
   * 计算图片容器的最大宽度
   * @param src 图片地址
   * @param expand 是否展开状态
   * @param verticalOffset 垂直偏移量（上下留白的边距），默认展开时480，收起时560
   * @returns Promise<string> 最大宽度的像素字符串（如 "900px"）
   */
  static calculateContainerWidth(src: string, expand: boolean, verticalOffset?: { expand: number, collapse: number }): Promise<string> {
    return new Promise((resolve) => {
      const offset = expand ? (verticalOffset?.expand ?? 480) : (verticalOffset?.collapse ?? 560)
      const boxHeight = window.innerHeight - offset
      const img = new Image()
      img.src = src
      img.onload = () => {
        if (img.width && img.height) {
          let boxWidth = Math.floor(img.width / img.height * boxHeight)
          if (img.width < boxWidth) {
            boxWidth = img.width
          }
          resolve(boxWidth + 'px')
        } else {
          resolve('900px')
        }
      }
      img.onerror = () => {
        console.log('Load image error')
        resolve('900px')
      }
    })
  }

}
