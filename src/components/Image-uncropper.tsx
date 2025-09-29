import React, { useState, useEffect, useRef } from 'react'
import { CropperRef, Cropper, ImageRestriction } from 'react-advanced-cropper'
import { twMerge } from 'tailwind-merge'
import 'react-advanced-cropper/dist/style.css'
import { Input } from "@/components/ui/input"

import { GoZoomIn } from "react-icons/go";
import { GoZoomOut } from "react-icons/go";
import { GrPowerReset } from "react-icons/gr";

export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = 'image/png' as 'image/jpeg' | 'image/png',
  quality?: number
): Promise<Blob | null> {
  return new Promise((res) => {
    canvas.toBlob((blob) => res(blob), type, quality)
  })
}

export function downloadImage(uri: string, name: string) {
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

type BoundingBox = {
  top: number
  left: number
  width: number
  height: number
}

type Params = {
  file: File
  left: string
  right: string
  up: string
  down: string
}

type Result = {
  base64: string
}

interface PropsData {
  src: string
  setSrc: (src: string) => void
  setPayload: (data: any) => void
}

const ImageUncropper: React.FC<PropsData> = ({ src, setSrc, setPayload }) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const cropperRef = useRef<CropperRef>(null)
  const [pixel, setPixel] = useState<BoundingBox | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [zoom, setZoom] = useState(0)

  // init
  useEffect(() => {
    if (!src) return
    const img = new Image()
    img.src = src
    img.onload = () => setImage(img)
  }, [src])

  if (!image) return null

  const onChange = (cropper: CropperRef) => {
    if (cropperRef.current) {
      const data = cropper.getCoordinates()
      setPixel(data)
    }
  }

  const onResetWidth = async (e: any) => {
    const currentWidth = e.target.value
    if (currentWidth !== '' && !/^[0-9]+$/.test(currentWidth)) {
      return
    }
    if (currentWidth > 5000) return
    const newPixel = JSON.parse(JSON.stringify(pixel))
    newPixel.width = currentWidth
    setPixel(newPixel)
    if (currentWidth < 100) return
    if (cropperRef.current) {
      cropperRef.current.setCoordinates(newPixel)
    }
    const position = getPosition(newPixel)
    const mask = await getMaskFile()
    setPayload((preData: any) => { return { ...preData, position, mask } });
  }

  const onResetHeight = async (e: any) => {
    const currentHeight = e.target.value
    if (currentHeight !== '' && !/^[0-9]+$/.test(currentHeight)) {
      return
    }
    if (currentHeight > 5000) return
    const newPixel = JSON.parse(JSON.stringify(pixel))
    newPixel.height = currentHeight
    setPixel(newPixel)
    if (currentHeight < 100) return
    if (cropperRef.current) {
      cropperRef.current.setCoordinates(newPixel)
    }
    const position = getPosition(newPixel)
    const mask = await getMaskFile()
    setPayload((preData: any) => { return { ...preData, position, mask } });
  }


  const getPosition = (pixel: any) => {
    let left = pixel.left
    let right = image.width - pixel.width - left
    let up = pixel.top
    let down = image.height - pixel.height - up

    const position = {
      left: left < 0 ? (left * -1) : 0,
      right: right < 0 ? (right * -1) : 0,
      up: up < 0 ? (up * -1) : 0,
      down: down < 0 ? (down * -1) : 0,
    }

    return position
    // setProcessing(true)
  }

  const resetSize = async (pixel: any, originCanvas: any) => {
    return new Promise((resolve) => {
      const position = getPosition(pixel)
      const { left, right, up, down } = position;

      const originUrl = originCanvas.toDataURL('image/png')
      const originImage = new Image()

      originImage.onload = () => {
        const newCanvas = document.createElement('canvas')
        const newContext = newCanvas.getContext('2d')
        if (newContext && originImage) {
          newCanvas.width = Number(originImage.width) - left - right
          newCanvas.height = Number(originImage.height) - up - down

          newContext.drawImage(
            originCanvas,
            left, // 开始裁切的 x 坐标
            up, // 开始裁切的 y 坐标
            newCanvas.width, // 裁切的宽度
            newCanvas.height, // 裁切的高度

            0, // 在目标 canvas 开始绘制的 x 坐标
            0, // 在目标 canvas 开始绘制的 y 坐标
            newCanvas.width, // 在目标 canvas 上绘制的宽度
            newCanvas.height // 在目标 canvas 上绘制的高度
          )
          // loadImage(newCanvas.toDataURL('image/png'))
          resolve(newCanvas)
        }
      }
      originImage.src = originUrl
    })
  }

  const getMaskFile = async () => {
    try {
      const current = cropperRef.current as HTMLCanvasElement | null
      if (current) {
        const maskCanvas = (await resetSize(pixel, cropperRef.current?.getCanvas())) as HTMLCanvasElement
        const maskBlob = await canvasToBlob(maskCanvas)
        if (!maskBlob) return null
        const maskFile = new File([maskBlob], 'mask.png', {
          type: 'image/png',
        })
        return maskFile
      }
    } catch (error) {
      return null
    }

  }

  const handleZoomIn = (event: any) => {
    event.stopPropagation()
    if (cropperRef.current) {
      cropperRef.current.zoomImage(1.2); // 放大
      setZoom(1.2)
      const data = cropperRef.current.getCoordinates()
      setPixel(data)
      handleActionDone(data)
    }
  };

  const handleZoomOut = (event: any) => {
    event.stopPropagation()
    if (cropperRef.current) {
      cropperRef.current.zoomImage(0.8); // 缩小
      setZoom(0.8)
      const data = cropperRef.current.getCoordinates()
      setPixel(data)
      handleActionDone(data)
    }
  };

  const handleReset = (event: any) => {
    event.stopPropagation()
    if (cropperRef.current) {
      cropperRef.current.reset(); // 重置
      setZoom(1)
      const data = cropperRef.current.getCoordinates()
      setPixel(data)
      handleActionDone(data)
    }
  };

  const handleActionDone = async (data?: any) => {
    const newPixel = data || pixel
    if (cropperRef.current) {
      const position = getPosition(newPixel)
      const mask = await getMaskFile()
      setPayload((preData: any) => { return { ...preData, position, mask } });
    }
  }



  return (
    <div
      ref={boxRef}
      className="image-cropper flex w-full h-full flex-col relative"

    >
      <div className="tools absolute right-0 top-0 z-20 p-2 flex justify-end space-x-2 bg-black/30">
        <div
          className=" cursor-pointer text-lg text-white hover:text-primary hover:scale-110"
          onClick={handleZoomIn}
        >
          <GoZoomIn />
        </div>
        <div
          className=" cursor-pointer text-lg text-white hover:text-primary hover:scale-110"
          onClick={handleZoomOut}
        >
          <GoZoomOut />
        </div>
        <div
          className=" cursor-pointer text-lg text-white hover:text-primary hover:scale-110"
          onClick={handleReset}
        >
          <GrPowerReset />
        </div>
      </div>

      <div className="tools flex w-full justify-center absolute top-[100%]">
        <div className="justiry-start flex w-full space-x-2 py-2 justify-center">
          <label className="input input-sm md:input-md input-bordered flex items-center">
            <Input
              value={pixel?.width || ''}
              type="number"
              className="w-[80px] h-8"
              placeholder="宽度" onChange={onResetWidth}
            />
          </label>
          <span className='flex items-center text-center text-slate-300 '>-</span>
          <label className=" input input-sm md:input-md input-bordered flex items-center">
            <Input
              value={pixel?.height || ''}
              type="number"
              className="w-[80px] h-8"
              placeholder="高度"
              onChange={onResetHeight}
            />
          </label>
        </div>
      </div>

      <div
        onMouseUp={() => handleActionDone()}
        onTouchEnd={() => handleActionDone()}
        className="show w-full h-full relative"
      >
        <div className='absolute top-0 left-0 w-full h-full flex justify-center items-center'>
          <Cropper
            className={twMerge(
              'mosaic-bg !text-primary w-full h-full'
            )}
            ref={cropperRef}
            src={src}
            onChange={onChange}
            imageRestriction={ImageRestriction.none}
            defaultVisibleArea={{
              left: -400,
              top: -400,
              width: image.width + 800,
              height: image.height + 800,
            }}
            defaultCoordinates={{
              left: 0,
              top: 0,
              width: image.width,
              height: image.height,
            }}
            stencilProps={{
              grid: true,
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default ImageUncropper
