/**
 * @fileoverview Markdown 模态框组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了 Markdown 模态框组件，用于显示 Markdown 内容。
 *          该组件提供以下功能：
 *          - 显示 Markdown 内容对话框
 *          - 提供确认和取消按钮
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/alert-dialog 模块获取对话框组件
 *          - 依赖 @/components/ui/button 模块获取按钮组件
 *          - 依赖 @/components/md-content 模块获取 Markdown 内容组件
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
import MdContent from "./md-content"
import { FaBookReader } from "react-icons/fa";
import Locale from "@/locales";


interface PropsData {
  trigger: any
  content: string
  confirm: () => void
}

export function MdModal({ trigger, content, confirm }: PropsData) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild ref={trigger}>
        <Button disabled={!content} variant="default" size={"sm"} >
          <FaBookReader />
          <span className="px-1">{Locale.Photo.MdModel.Action}</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-[600px]">
        <AlertDialogHeader>
          <AlertDialogTitle>{Locale.Photo.MdModel.Title}</AlertDialogTitle>
          <AlertDialogDescription>
            {Locale.Photo.MdModel.Desc}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <MdContent content={content} />
        <AlertDialogFooter>
          <AlertDialogCancel>{Locale.Photo.MdModel.No}</AlertDialogCancel>
          <AlertDialogAction onClick={confirm}>{Locale.Photo.MdModel.Yes}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}