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
    value: 1 / 1,
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