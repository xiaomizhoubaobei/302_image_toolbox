/**
 * @fileoverview 描述输入模态框组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了描述输入模态框组件，用于输入描述文本。
 *          该组件提供以下功能：
 *          - 显示输入对话框
 *          - 提供文本输入框
 *          - 支持自定义占位符
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