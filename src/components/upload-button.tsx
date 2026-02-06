/**
 * @fileoverview 上传按钮组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了上传按钮组件，用于上传新图片。
 *          该组件提供以下功能：
 *          - 显示上传按钮
 *          - 支持文件选择
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/button 模块获取按钮组件
 *          - 依赖 @/locales 获取国际化文本
 */
import React from 'react'
import { Button } from './ui/button'
import { RiUpload2Fill } from "react-icons/ri";
import Locale from "@/locales"

const ALLOWED_FILES = ['image/png', 'image/jpeg', 'image/webp'];

interface UplodaButtonProps {
  setFile: (file: File | null) => void
}

function UploadButton({ setFile }: UplodaButtonProps) {
  const fileRef = React.useRef<HTMLInputElement | null>(null)

  // 选中
  const handleFileSelect = React.useCallback(async (files: FileList | Array<File>) => {
    const file = Array.from(files).filter((file) =>
      ALLOWED_FILES.includes(file.type)
    )[0]

    if (file) {
      // setResult && setResult('')
      setTimeout(() => {
        setFile(file)
      }, 30)
    }

    if (fileRef.current) {
      fileRef.current.value = ''
    }
  }, [])


  return (
    <div className='w-full flex justify-center'>
      <Button className='w-full' onClick={() => fileRef.current?.click()}>
        <RiUpload2Fill />
        {Locale.System.UploadNewImage}
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

export default UploadButton