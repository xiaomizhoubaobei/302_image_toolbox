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
      setPayload((preData: any) => { return { ...preData, ratio: 1 / 1, label: '1:1' } });
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
          ratios.slice(0, 3).map((it, idx) =>
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
          ratios.slice(3, 4).map((it, idx) =>
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
          ratios.slice(4, 5).map((it, idx) =>
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
          ratios.slice(5, 6).map((it, idx) =>
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