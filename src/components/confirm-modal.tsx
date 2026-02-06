/**
 * @fileoverview 确认模态框组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了确认模态框组件，用于确认用户的操作。
 *          该组件提供以下功能：
 *          - 显示确认对话框
 *          - 提供确认和取消按钮
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/alert-dialog 模块获取对话框组件
 *          - 依赖 @/components/ui/button 模块获取按钮组件
 *          - 依赖 @/locales 获取国际化文本
 */
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
  confirm: () => void
}

export function ConfirmModal({confirm}: PropsData) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="border-primary text-primary">{Locale.Photo.BackModel.Action}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{Locale.Photo.BackModel.Title}</AlertDialogTitle>
          <AlertDialogDescription>
            {Locale.Photo.BackModel.Desc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{Locale.Photo.BackModel.No}</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>{Locale.Photo.BackModel.Yes}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}