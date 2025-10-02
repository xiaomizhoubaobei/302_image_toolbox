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

          // 更高效的尺寸调整算法
          const targetSize = maxSizeMB * 1024 * 1024;
          let currentSize = (width * height * 4) / (1024 * 1024);
          
          while (currentSize > maxSizeMB) {
            width = Math.floor(width * 0.9);
            height = Math.floor(height * 0.9);
            currentSize = (width * height * 4) / (1024 * 1024);
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          canvas.toBlob((compressedBlob) => {
            if (compressedBlob) {
              resolve(compressedBlob);
            } else {
              reject(new Error('Failed to compress image'));
            }
          }, mimeType, quality);
        };

        img.onerror = reject;
        // 添加错误处理
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

        // 更高效的尺寸调整算法
        const targetSize = maxSizeMB * 1024 * 1024;
        let currentSize = (width * height * 4) / (1024 * 1024);
        
        while (currentSize > maxSizeMB) {
          width = Math.floor(width * 0.9);
          height = Math.floor(height * 0.9);
          currentSize = (width * height * 4) / (1024 * 1024);
        }

        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);

        canvas.toBlob((blob) => {
          if (blob) {
            // 再次调整质量，确保符合最大大小
            if (blob.size > targetSize) {
              return this.compressImageBlob(blob, maxSizeMB, mimeType, quality).then(resolve, reject);
            }
            resolve(blob);
          } else {
            reject(new Error('Failed to compress image'));
          }
        }, mimeType, quality);
      };

      img.onerror = reject;
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };


  // 下载图片为文件
  static imageToFile = async (url: string) => {
    try {
      // 添加缓存检查
      if (!url || url === '') {
        throw new Error('Invalid URL');
      }
      
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Get origin image error: ${res.statusText}`);
      }
      const blob = await res.blob();
      // 创建一个File对象
      let fileName = 'file.jpg'
      if (url.includes('.svg')) {
        fileName = 'file.svg'
      }
      const file = new File([blob], fileName, { type: blob.type });
      return file;
    } catch (error) {
      // console.error('Error transferring image:', error);
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
      const base64 = await this.fileToBase64(file)
      return base64
    } catch (error) {
      // console.error('Error transferring image:', error);
      return null
    }
  }

  // 转换图片格式 
  static pngToJpg = async (url: string) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous'; // 添加跨域支持
      image.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = image.width;
        canvas.height = image.height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(image, 0, 0);
          const jpegData = canvas.toDataURL('image/jpeg', 0.9); // 设置质量为0.9
          resolve(jpegData);
        } else {
          reject(new Error('Failed to get canvas context'));
        }
      };
      image.onerror = reject;
      image.src = url;
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
      const src = URL.createObjectURL(file as File);
      return src
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
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = 'anonymous'; // 添加跨域支持
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  }

}