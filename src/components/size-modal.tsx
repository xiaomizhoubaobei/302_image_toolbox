/**
 * @fileoverview 尺寸模态框组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了尺寸模态框组件，用于输入自定义尺寸。
 *          该组件提供以下功能：
 *          - 显示尺寸输入对话框
 *          - 提供确认和取消按钮
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/alert-dialog 模块获取对话框组件
 *          - 依赖 @/components/ui/button 模块获取按钮组件
 *          - 依赖 @/components/ui/input 模块获取输入框组件
 *          - 依赖 @/locales 获取国际化文本
 */
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
import { twMerge } from 'tailwind-merge'
import Locale from "@/locales"

interface PropsData {
  confirm: (size: { width: number, height: number }) => void
}

export function SizeModal({ confirm }: PropsData) {
  const [size, setSize] = React.useState({ width: 1, height: 1 })

  const handleChangeWidth = ({ target }: any) => {
    setSize((size: any) => { return { ...size, width: target.value } });
  }

  const handleChangeHeight = ({ target }: any) => {
    setSize((size: any) => { return { ...size, height: target.value } });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size={'sm'} className={twMerge('border-primary rounded-none rounded-r-sm')}>
          {Locale.Photo.SizeModel.Action}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {Locale.Photo.SizeModel.Title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {Locale.Photo.SizeModel.Desc}
          </AlertDialogDescription>
          <div className='w-full flex justify-between space-x-2 md:px-0'>
            <Input
              min={1}
              value={size.width}
              type="number"
              placeholder={'X'}
              onChange={handleChangeWidth}
            />
            <span>:</span>
            <Input
              min={1}
              value={size.height}
              type="number"
              placeholder={'H'}
              onChange={handleChangeHeight}
            />
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            {Locale.Photo.SizeModel.No}
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => confirm(size)}>
            {Locale.Photo.SizeModel.Yes}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}