/**
 * @fileoverview 图片拼接组件
 * @author 祁筱欣
 * @date 2026-02-05
 * @since 2026-02-05
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了图片拼接功能，允许用户上传多张图片并按照指定比例进行拼接。
 *          该组件作为客户端组件运行，负责以下任务：
 *          - 接收用户上传的多张图片
 *          - 提供图片预览功能
 *          - 支持调整拼接比例
 *          - 生成拼接后的图片
 *
 *          工作流程：
 *          1. 用户上传图片文件
 *          2. 组件显示所有上传的图片预览
 *          3. 用户可以调整拼接参数（比例、方向等）
 *          4. 组件生成拼接后的图片
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/* 模块获取 UI 组件
 *          - 依赖 @/utils/Image 模块进行图片处理
 */
import React, { useState, useEffect, useRef } from 'react'

interface PropsData {
  src: string
  setSrc: (src: string) => void
  payload: any
  setPayload: (data: any) => void
}

const ImageStitching: React.FC<PropsData> = ({ src, setSrc, payload, setPayload }) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 初始化图片
  useEffect(() => {
    if (!src) return
    const img = new Image()
    img.src = src
    img.onload = () => setImage(img)
  }, [src])

  // 生成拼接图片
  useEffect(() => {
    if (!image || !canvasRef.current || !payload.images || payload.images.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // 根据上传的图片数量设置画布尺寸
    const images = payload.images as File[]

    // 假设横向拼接
    let totalWidth = 0
    let maxHeight = 0

    images.forEach((imgFile) => {
      const img = new Image()
      img.src = URL.createObjectURL(imgFile)
      totalWidth += img.width
      maxHeight = Math.max(maxHeight, img.height)
    })

    canvas.width = totalWidth
    canvas.height = maxHeight

    // 绘制拼接图片
    let currentX = 0
    images.forEach((imgFile) => {
      const img = new Image()
      img.src = URL.createObjectURL(imgFile)
      img.onload = () => {
        ctx.drawImage(img, currentX, 0, img.width, img.height)
        currentX += img.width
      }
    })

    // 将结果设置为当前源
    const resultSrc = canvas.toDataURL('image/png')
    setSrc(resultSrc)
    setPayload({ ...payload, canvas: canvas })
  }, [image, payload.images, payload.ratio, setSrc, setPayload])

  if (!image) return null

  return (
    <div className="w-full h-full flex items-center justify-center">
      <canvas ref={canvasRef} className="hidden" />
      <img
        alt="stitching preview"
        src={src}
        className="w-full h-auto"
      />
    </div>
  )
}

export default ImageStitching