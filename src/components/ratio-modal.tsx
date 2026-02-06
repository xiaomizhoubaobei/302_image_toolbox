/**
 * @fileoverview 比例模态框组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了比例模态框组件，用于选择图片比例。
 *          该组件提供以下功能：
 *          - 显示比例选择对话框
 *          - 提供确认和取消按钮
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/alert-dialog 模块获取对话框组件
 *          - 依赖 @/components/ui/button 模块获取按钮组件
 *          - 依赖 @/components/ui/input 模块获取输入框组件
 *          - 依赖 @/locales 获取国际化文本
 */
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
    value: 1,
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
              SD_V2_RATIOS.map((it, idx) =>
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