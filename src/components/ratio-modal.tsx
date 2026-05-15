import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { twMerge } from 'tailwind-merge'
import Locale from "@/locales";

const SD_V2_RATIOS = [
  {
    name: '1:1',
    value: 1 / 1,
    size: '1024x1024'
  },
  {
    name: '1:2',
    value: 1 / 2,
    size: '1024x2048'
  },
  {
    name: '3:2',
    value: 3 / 2,
    size: '1536x1024',
  },

  {
    name: '3:4',
    value: 3 / 4,
    size: '1536x2048',
  },
  {
    name: '16:9',
    value: 16 / 9,
    size: '2048x1152',
  },
  {
    name: '9:16',
    value: 9 / 16,
    size: '1152x2048',
  },
]

interface PropsData {
  disabled: boolean
  ratio: any
  setRatio: (ratio: any) => void
  confirm: () => void
}

export function RatioModal({ disabled, ratio, setRatio, confirm }: PropsData) {
  const [ratios, setRatios] = React.useState(SD_V2_RATIOS)

  const handleChangeRatio = (ratio: any) => {
    setRatio(ratio)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={disabled} size={'sm'} type="submit" className={twMerge('px-6 text-sm')}>
          {Locale.Photo.RatioModel.Action}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {Locale.Photo.RatioModel.Title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {Locale.Photo.RatioModel.Desc}
          </AlertDialogDescription>
          <div className='w-full flex justify-between md:px-0'>
            {
              ratios.map((it, idx) =>
                <Button
                  variant={it.value === ratio.value ? 'default' : 'outline'}
                  size={'sm'}
                  key={idx}
                  onClick={() => handleChangeRatio(it)}
                >
                  {it.name}
                </Button>
              )
            }
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {Locale.Photo.RatioModel.No}
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => confirm()}>
            {Locale.Photo.RatioModel.Yes}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
