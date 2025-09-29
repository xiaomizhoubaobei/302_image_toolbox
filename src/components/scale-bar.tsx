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