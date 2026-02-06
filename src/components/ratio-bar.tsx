/**
 * @fileoverview 比例栏组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了比例栏组件，用于选择视频比例和模型。
 *          该组件提供以下功能：
 *          - 显示模型选择按钮
 *          - 显示比例选择按钮
 *          - 根据模型自动选择比例
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/button 模块获取按钮组件
 *          - 依赖 @/locales 获取模型列表、比例列表和国际化文本
 */
import React from 'react'
import { Button } from './ui/button'
import { twMerge } from 'tailwind-merge'
import Locale from "@/locales";

interface PropsData {
  payload: any
  setPayload: (data: any) => void
}

const models = Locale.Photo.VideoModels.List

const ratios = Locale.Photo.VideoRatios.List

function RatioBar({ payload, setPayload }: PropsData) {

  const handleChangeModel = (model: string) => {
    setPayload((preData: any) => { return { ...preData, model } });
  }

  const handleChangeRatio = (ratio: number, name: string) => {
    setPayload((preData: any) => { return { ...preData, ratio, label: name } });
  }

  React.useEffect(() => {
    if (payload.model === 'luma') {
      setPayload((preData: any) => { return { ...preData, ratio: 0, label: '' } });
    }
    else if (payload.model === 'cog') {
      setPayload((preData: any) => { return { ...preData, ratio: 3 / 2, label: '3:2' } });
    }
    else if (payload.model === 'runway') {
      setPayload((preData: any) => { return { ...preData, ratio: 1280 / 768, label: '1280:768' } });
    } else {
      setPayload((preData: any) => { return { ...preData, ratio: 1, label: '1:1' } });
    }

  }, [payload.model])

  return (
    <div className='w-full flex flex-col space-y-2 justify-center items-center '>
      <div className="flex rounded-sm text-md">
        {
          models.map((it, idx) =>
            <Button
              className={twMerge('border-primary rounded-none', idx === 0 && 'rounded-l-sm', idx === models.length - 1 && 'rounded-r-sm', idx > 0 && 'border-l-0')}
              variant={it.value === payload.model ? 'default' : 'outline'}
              size={'sm'}
              key={idx}
              onClick={() => handleChangeModel(it.value)}
            >
              {it.name}
            </Button>
          )
        }

      </div>

      <div className="flex space-x-2 text-md">
        {payload.model === 'kling' &&
          ratios.slice(0, 3).map((it) =>
            <Button
              variant={it.value === payload.ratio ? 'default' : 'outline'}
              size={'sm'}
              key={it.name}
              onClick={() => handleChangeRatio(it.value, it.name)}
            >
              {it.name}
            </Button>
          )
        }
        {payload.model === 'runway' &&
          ratios.slice(3, 4).map((it) =>
            <Button
              variant={it.value === payload.ratio ? 'default' : 'outline'}
              size={'sm'}
              key={it.name}
              onClick={() => handleChangeRatio(it.value, it.name)}
            >
              {it.name}
            </Button>
          )
        }
        {(payload.model === 'cog') &&
          ratios.slice(4, 5).map((it) =>
            <Button
              variant={it.value === payload.ratio ? 'default' : 'outline'}
              size={'sm'}
              key={it.name}
              onClick={() => handleChangeRatio(it.value, it.name)}
            >
              {it.name}
            </Button>
          )
        }
        {(payload.model === 'luma') &&
          ratios.slice(5, 6).map((it) =>
            <Button
              variant={it.value === payload.ratio ? 'default' : 'outline'}
              size={'sm'}
              key={it.name}
              onClick={() => handleChangeRatio(it.value, it.name)}
            >
              {it.name}
            </Button>
          )
        }

      </div>
    </div>
  )
}

export default RatioBar