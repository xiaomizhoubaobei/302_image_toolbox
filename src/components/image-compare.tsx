import React, { useState, useEffect, useCallback } from 'react'
import {
  ReactCompareSliderImage,
  useReactCompareSliderContext,
  styleFitContainer,
} from 'react-compare-slider'
import { useReactCompareSlider } from 'react-compare-slider/hooks'
import {
  Provider,
  Root,
  Item,
  HandleRoot,
  Handle,
} from 'react-compare-slider/components'

interface Props {
  initPosition: number
  beforeSrc: string
  afterSrc: string
}

/** 子组件：在 Slider Provider 内部使用 context 来动画控制位置 */
const PositionAnimator: React.FC<{
  initPosition: number
  afterSrc: string
  onAnimEnd: () => void
}> = ({ initPosition, afterSrc, onAnimEnd }) => {
  const { setPosition } = useReactCompareSliderContext()

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
              onAnimEnd()
            }, 600)
          }, 600)
        }, 600)
      }
    }
  }, [initPosition, afterSrc, setPosition, onAnimEnd])

  return null
}

const ImageCompare: React.FC<Props> = ({
  beforeSrc,
  afterSrc,
  initPosition,
}) => {
  // 控制 transition：动画期间使用过渡效果，结束后移除
  const [transition, setTransition] = useState('.5s ease-in-out')

  const handleAnimEnd = useCallback(() => {
    setTransition('')
  }, [])

  const sliderProps = useReactCompareSlider({
    defaultPosition: 100,
    transition,
  })

  return (
    <div className="flex w-full flex-col items-center justify-center overflow-hidden">
      <Provider {...sliderProps}>
        <Root className="compare w-full" style={{ position: 'relative' }}>
          <Item item="itemOne">
            <div className="w-full mosaic-bg h-[100%]">
              <ReactCompareSliderImage
                srcSet={beforeSrc}
                src={beforeSrc}
                alt="Result image"
                style={styleFitContainer()}
              />
            </div>
          </Item>
          <Item item="itemTwo">
            <div className="w-full mosaic-bg h-[100%]">
              <ReactCompareSliderImage
                src={afterSrc}
                srcSet={afterSrc}
                alt="Origin image"
                style={styleFitContainer()}
              />
            </div>
          </Item>
          <HandleRoot>
            <Handle />
          </HandleRoot>
        </Root>
        <PositionAnimator
          initPosition={initPosition}
          afterSrc={afterSrc}
          onAnimEnd={handleAnimEnd}
        />
      </Provider>
    </div>
  )
}

export default ImageCompare
