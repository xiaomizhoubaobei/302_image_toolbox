/**
 * @fileoverview 尺寸栏组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了尺寸栏组件，用于选择图片尺寸比例。
 *          该组件提供以下功能：
 *          - 显示尺寸比例选择按钮
 *          - 支持自定义尺寸
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/button 模块获取按钮组件
 *          - 依赖 @/components/size-modal 模块获取尺寸模态框组件
 */
import React from 'react'
import { Button } from './ui/button'
import { twMerge } from 'tailwind-merge'
import { SizeModal } from './size-modal'

interface PropsData {
  payload: any
  setPayload: (data: any) => void
}

const DEFAULT_RATIOS = [
  {
    name: '1:1',
    value: 1,
  },
  {
    name: '16:9',
    value: 16 / 9,
  },
  {
    name: '9:16',
    value: 9 / 16,
  },
]

function SizeBar({ payload, setPayload }: PropsData) {
  const [ratios, setRatios] = React.useState(DEFAULT_RATIOS)


  const handleAddRatio = (size: { width: number, height: number }) => {
    const item = {
      name: `${size.width}:${size.height}`,
      value: size.width / size.height
    }
    setRatios((ratios) => {return [...ratios, item]})
    setPayload((preData: any) => { return { ...preData, ratio: item.value, label: item.name } });
  }

  const handleChangeRatio = (ratio: number, name: string) => {
    if (ratio < 0) {
      return
    }
    setPayload((preData: any) => { return { ...preData, ratio, label: name } });
  }


  return (
    <div className='w-full flex flex-col space-y-2 justify-center items-center '>
      <div className="flex rounded-sm text-md">
        {
          ratios.map((it, idx) =>
            <Button
              className={twMerge('border-primary rounded-none border-r-0', idx === 0 && 'rounded-l-sm')}
              variant={it.value === payload.ratio ? 'default' : 'outline'}
              size={'sm'}
              key={idx}
              onClick={() => handleChangeRatio(it.value, it.name)}
            >
              {it.name}
            </Button>
          )
        }
        <SizeModal confirm={handleAddRatio} />

      </div>

    </div>
  )
}

export default SizeBar