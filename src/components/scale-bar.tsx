/**
 * @fileoverview 缩放栏组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了缩放栏组件，用于选择图片缩放倍数。
 *          该组件提供以下功能：
 *          - 显示缩放倍数选择按钮
 *          - 支持多种缩放倍数（2x、4x、8x）
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/button 模块获取按钮组件
 */
import React from 'react'
import { Button } from './ui/button'

interface PropsData {
  payload: any
  setPayload: (data: any) => void
}

const scales = ['2', '4', '8']

function ScaleBar({ payload, setPayload }: PropsData) {

  const handleChangeScale = (scale: string) => {
    setPayload((preData: any) => { return { ...preData, scale } });
  }

  return (
    <div className='w-full flex justify-center space-x-2 text-md'>
      {
        scales.map((it, idx) =>
          <Button
            variant={it === payload.scale ? 'default' : 'outline'}
            size={'sm'}
            key={idx}
            onClick={() => handleChangeScale(it)}
          >
            x{it}
          </Button>
        )
      }
    </div>
  )
}

export default ScaleBar