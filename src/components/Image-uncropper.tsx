/**
 * @fileoverview 图片外扩组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了图片外扩组件，用于扩展图片边界。
 *          该组件提供以下功能：
 *          - 支持图片外扩
 *          - 支持尺寸调整
 *          - 支持缩放操作
 *          - 生成遮罩文件
 *
 *          依赖关系：
 *          - 依赖 react-advanced-cropper 模块进行图片裁剪
 *          - 依赖 @/components/ui/input 模块获取输入框组件
 */
import React, { useState, useEffect, useRef } from 'react'
import { CropperRef, Cropper, ImageRestriction } from 'react-advanced-cropper'
import { twMerge } from 'tailwind-merge'
import 'react-advanced-cropper/dist/style.css'
import { Input } from "@/components/ui/input"

import { GoZoomIn } from "react-icons/go";
import { GoZoomOut } from "react-icons/go";
import { GrPowerReset } from "react-icons/gr";
import ImageManager from "@/utils/Image"

type BoundingBox = {
  top: number
  left: number
  width: number
  height: number
}

interface PropsData {
  src: string
  setPayload: (data: any) => void
}

const ImageUncropper: React.FC<PropsData> = ({ src, setPayload }) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const cropperRef = useRef<CropperRef>(null)
  const [pixel, setPixel] = useState<BoundingBox | null>(null)
  const [image, setImage] = useState<HTMLImageElement | null>(null)

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
    const positionVal = getPosition(newPixel)
    const maskVal = await getMaskFile()
    setPayload((preData: any) => { return { ...preData, position: positionVal, mask: maskVal } });
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
    const positionVal = getPosition(newPixel)
    const maskVal = await getMaskFile()
    setPayload((preData: any) => { return { ...preData, position: positionVal, mask: maskVal } });
  }


  const getPosition = (pixel: any) => {
    let left = pixel.left
    let right = image.width - pixel.width - left
    let up = pixel.top
    let down = image.height - pixel.height - up

    return  {
      left: left < 0 ? (left * -1) : 0,
      right: right < 0 ? (right * -1) : 0,
      up: up < 0 ? (up * -1) : 0,
      down: down < 0 ? (down * -1) : 0,
    }
    // setProcessing(true)
  }

  const resetSize = async (pixel: any, originCanvas: any) => {
    return new Promise((resolve) => {
      const positionVal = getPosition(pixel)
      const { left, right, up, down } = positionVal;

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
        const maskBlob = await ImageManager.canvasToBlob(maskCanvas)
        if (!maskBlob) return null
        return new File([maskBlob], 'mask.png', {
          type: 'image/png',
        })
      }
    } catch (error) {
      return null
    }

  }

  const handleZoomIn = (event: any) => {
    event.stopPropagation()
    if (cropperRef.current) {
      cropperRef.current.zoomImage(1.2); // 放大
      const data = cropperRef.current.getCoordinates()
      setPixel(data)
      void handleActionDone(data)
    }
  };

  const handleZoomOut = (event: any) => {
    event.stopPropagation()
    if (cropperRef.current) {
      cropperRef.current.zoomImage(0.8); // 缩小
      const data = cropperRef.current.getCoordinates()
      setPixel(data)
      void handleActionDone(data)
    }
  };

  const handleReset = (event: any) => {
    event.stopPropagation()
    if (cropperRef.current) {
      cropperRef.current.reset(); // 重置
      const data = cropperRef.current.getCoordinates()
      setPixel(data)
      void handleActionDone(data)
    }
  };

  const handleActionDone = async (data?: any) => {
    const newPixel = data || pixel
    if (cropperRef.current) {
      const positionVal = getPosition(newPixel)
      const maskVal = await getMaskFile()
      setPayload((preData: any) => { return { ...preData, position: positionVal, mask: maskVal } });
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
        onMouseUp={() => void handleActionDone()}
        onTouchEnd={() => void handleActionDone()}
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