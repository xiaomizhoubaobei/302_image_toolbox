/**
 * @fileoverview 图片对比组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了图片对比组件，用于并排对比两张图片。
 *          该组件提供以下功能：
 *          - 显示两张图片的对比
 *          - 支持滑动对比
 *          - 支持动画过渡效果
 *
 *          依赖关系：
 *          - 依赖 react-compare-slider 模块进行图片对比
 */
import React, { useState, useEffect } from 'react'
import {
  ReactCompareSlider,
  ReactCompareSliderImage,
} from 'react-compare-slider'

interface Props {
  initPosition: number
  beforeSrc: string
  afterSrc: string
}

const ImageCompare: React.FC<Props> = ({
  beforeSrc,
  afterSrc,
  initPosition,
}) => {
  // 定义state来存储底部距离
  const [transition, setTransition] = useState('.5s ease-in-out')
  const [position, setPosition] = useState(100)

  useEffect(() => {
    const img = new Image()
    img.src = afterSrc
    img.onload = () => {
      if (img.width && img.height) {
        setPosition(10)
        setTimeout(() => {
          setPosition(80)
          setTimeout(() => {
            setPosition(initPosition)
            setTimeout(() => {
              setTransition('')
            }, 600)
          }, 600)
        }, 600)
      }
    }
  }, [initPosition, afterSrc])

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden">
      <ReactCompareSlider
        className="compare w-full"
        position={position}
        transition={transition}
        itemOne={
          <div className="w-full mosaic-bg h-[100%]">
            <ReactCompareSliderImage
              srcSet={beforeSrc}
              src={beforeSrc}
              alt="Result image"
            />
          </div>
        }
        itemTwo={
          <div className="w-full mosaic-bg h-[100%]">
            <ReactCompareSliderImage
              src={afterSrc}
              srcSet={afterSrc}
              alt="Origin image"
            />
          </div>
        }
      />
    </div>
  )
}

export default ImageCompare