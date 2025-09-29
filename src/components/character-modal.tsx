import React from 'react'
import Image from 'next/image'
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

import Locale from '@/locales'

interface PropsData {
  title: string
  status: string
  payload: any
  setPayload: (data: any) => void
  confirm: () => void
}

const characters = Locale.Photo.Character.List


export function CharacterModal({ title, status, payload, setPayload, confirm }: PropsData) {

  const handleChange = (target: any) => {
    setPayload((preData: any) => { return { ...preData, character: target.value } });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" disabled={status === 'Pending'}>{title}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='space-x-2'>
            <span>{Locale.Photo.Character.Title}</span>
            <span className='text-primary underline '>{`${characters.find(it => it.value === payload.character)?.label}`}</span>
          </AlertDialogTitle>
          <AlertDialogDescription>
            {Locale.Photo.Character.Desc}
          </AlertDialogDescription>
          <div className='w-full grid grid-cols-4 grid-rows-3 gap-4'>
            {
              characters.map((it, idx) => {
                return (
                  <div
                    key={idx}
                    onClick={() => handleChange(it)}
                    className={
                      twMerge(
                        'relative cursor-pointer text-white hover:opacity-100 hover:text-primary border-4 rounded-sm overflow-hidden ',
                        it.value === payload.character ? 'opacity-100 border-primary  text-primary' : 'opacity-100'
                      )
                    }
                  >
                    <Image
                      width={100}
                      height={100}
                      alt='character image' src={it.icon}
                      className={twMerge('w-full h-auto hover:scale-110', it.value === payload.character ? 'scale-110' : '')}
                    />
                    <div className="absolute w-full bottom-0 left-0 p-1 bg-black/80 text-center text-xs ">
                      {it.label}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{Locale.System.Cancel}</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>{Locale.System.Confirm}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
