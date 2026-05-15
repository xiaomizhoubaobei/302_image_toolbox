import React from 'react'
import { Input } from "@/components/ui/input"
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

import Locale from "@/locales"

interface PropsData {
  status: string
  payload: any
  setPayload: (data: any) => void
  placeHolder?: string
  confirm: () => void
}

export function DescriptModal({ status, payload, setPayload, placeHolder, confirm }: PropsData) {

  const handleInputChange = ({ target }: any) => {
    setPayload((preData: any) => { return { ...preData, prompt: target.value } });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="default" disabled={status === 'Pending'}>{Locale.Photo.DescModel.Action}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{Locale.Photo.DescModel.Title}</AlertDialogTitle>
          <AlertDialogDescription>
            {Locale.Photo.DescModel.Desc}
          </AlertDialogDescription>
          <div className='w-full flex justify-center px-1 md:px-0'>
            <Input
              value={payload.prompt}
              type="text"
              placeholder={placeHolder ? placeHolder : Locale.Photo.DescModel.Placeholder}
              onChange={handleInputChange}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{Locale.Photo.DescModel.No}</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>{Locale.Photo.DescModel.Yes}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
