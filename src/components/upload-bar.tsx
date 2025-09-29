import React from 'react'
import { Button } from './ui/button'
import { RiUpload2Fill } from "react-icons/ri";
import { IoIosLink } from "react-icons/io";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Locale from "@/locales"

const ALLOWED_FILES = ['image/png', 'image/jpeg', 'image/webp'];

interface UplodaBarProps {
  payload: any
  setPayload: (data: any) => void
}

function UploadBar({ payload, setPayload }: UplodaBarProps) {
  const fileRef = React.useRef<HTMLInputElement | null>(null)

  // 选中
  const handleFileSelect = React.useCallback(async (files: FileList | Array<File>) => {
    const file = Array.from(files).filter((file) =>
      ALLOWED_FILES.includes(file.type)
    )[0]

    if (file) {
      setPayload((preData: any) => { return { ...preData, mask: file } });
    }

    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }, [])


  return (
    <div className='w-full flex justify-center'>
      {
        !payload.mask ?
          <Button size={'sm'} onClick={() => fileRef.current?.click()}>
            <RiUpload2Fill />
            {Locale.System.UploadFaceImage}
          </Button>
          :
          <div className="w-full p-2 bg-violet-200 rounded-full flex justify-between items-center overflow-hidden">
            <div className='flex-1 px-1 flex items-center space-x-2'>
              <IoIosLink className='text-lg' />
              <p className='flex-1 text-slate-500 text-sm overflow-hidden'>{payload.mask.name}</p>
            </div>
            <div className='px-1' onClick={() => setPayload((preData: any) => { return { ...preData, mask: null } })}>
              <MdOutlineDeleteOutline className='text-xl text-red-500 cursor-pointer' />
            </div>
          </div>

      }

      <input
        className='hidden'
        type="file"
        ref={fileRef}
        accept={ALLOWED_FILES.join(',')}
        onChange={(ev) =>
          handleFileSelect(ev.currentTarget.files ?? [])
        }
      />
    </div>
  )
}

export default UploadBar