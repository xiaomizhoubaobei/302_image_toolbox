import React from 'react'
import { Button } from './ui/button'
import { RiUpload2Fill } from "react-icons/ri";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Locale from "@/locales"

const ALLOWED_FILES = ['image/png', 'image/jpeg', 'image/webp'];

interface PropsData {
  payload: any
  setPayload: (data: any) => void
}

function UploadImages({ payload, setPayload }: PropsData) {
  const fileRef = React.useRef<HTMLInputElement | null>(null)

  // 选中
  const handleFileSelect = React.useCallback(async (files: FileList | Array<File>) => {
    const file = Array.from(files).filter((file) =>
      ALLOWED_FILES.includes(file.type)
    )[0]

    if (file) {
      const src = URL.createObjectURL(file)
      const img = new Image()
      img.onload = () => {
        if (img) {
          const newImages = [...payload.images, img]
          setPayload((preData: any) => { return { ...preData, images: newImages } });
        }
      }
      img.src = src
    }

    if (fileRef.current) {
      fileRef.current.value = ''
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payload.images])


  return (
    <div className='w-full flex justify-center space-x-4 items-center'>
      <Button size={'sm'} onClick={() => fileRef.current?.click()} disabled={payload.images.length >= 5}>
        <RiUpload2Fill />
        {Locale.System.UploadStickImage}
      </Button>

      <span className='text-slate-400'>{payload.images.length} / 5</span>

      <Button size={'sm'}
        className='bg-red-500 hover:bg-red-600'
        onClick={() => setPayload((preData: any) => { return { ...preData, images: [] } })}
        disabled={payload.images.length <= 0}
      >
        <MdOutlineDeleteOutline />
        {Locale.System.CleanStickImage}
      </Button>

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

export default UploadImages