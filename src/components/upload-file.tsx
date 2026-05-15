"use client"

import React, { forwardRef, useImperativeHandle } from 'react';
import { twMerge } from 'tailwind-merge'
import dynamic from 'next/dynamic'
import { RiUpload2Line } from "react-icons/ri";
import Locale from "@/locales"

// 动态导入 DropZone 组件
const DropZone = dynamic(() => import('./drop-zone'), {
  ssr: false,
  loading: () => <div className="bg-primary opacity-60 rounded-2xl p-4 w-full h-48 flex items-center justify-center">
    <div className="text-white">Loading drop zone...</div>
  </div>
})

const ALLOWED_FILES = ['image/png', 'image/jpeg', 'image/webp'];

interface UplodFileProps {
  file: File | null
  setFile?: (file: File | null) => void
}

const UploadFile = forwardRef(({ file, setFile }: UplodFileProps, ref: any) => {
  const [dragging, setDragging] = React.useState(false)
  const handleDragging = React.useCallback((dragging: boolean) => {
    setDragging(dragging)
  }, [])
  const fileRef = React.useRef<HTMLInputElement | null>(null)

  // 选中
  const handleFileSelect = React.useCallback(async (files: FileList | Array<File>) => {
    const file = Array.from(files).filter((file) =>
      ALLOWED_FILES.includes(file.type)
    )[0]

    if (file) {
      // 检查文件大小，如果过大则压缩
      if (file.size > 10 * 1024 * 1024) { // 10MB
        // 显示提示信息
        alert('File size exceeds 10MB. The file will be compressed automatically.')
      }
      
      if (setFile) {
        setFile(file)
      }
    }

    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }, [setFile])


  return (
    <div ref={ref} onClick={() => fileRef.current?.click()} id="upload-file" className="bg-primary opacity-60 hover:opacity-40 overflow-hidden rounded-3xl p-4 w-full">
      <DropZone
        onDrop={(files: any) => handleFileSelect(files)}
        onDrag={handleDragging}
      >
        <div
          className='flex rounded-2xl flex-col items-center justify-center border-4 border-dashed border-gray-100 px-4 py-2 text-center sm:py-2 cursor-pointer'
        >
          <RiUpload2Line className='text-5xl text-bold text-white' style={{ color: 'white' }} />
          <p className="text-sm text-white mx-16 text-center font-bold opacity-100">
            {Locale.System.UploadFile}
          </p>
          <input
            type="file"
            ref={fileRef}
            className={twMerge(
              'absolute bottom-0 left-0 right-0 top-0',
              'hidden'
            )}
            accept={ALLOWED_FILES.join(',')}
            onChange={(ev) =>
              handleFileSelect(ev.currentTarget.files ?? [])
            }
          />
        </div>
      </DropZone>
    </div>
  )

});

UploadFile.displayName = 'UploadFile';

export default UploadFile;