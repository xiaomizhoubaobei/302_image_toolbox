/**
 * @fileoverview 历史记录模态框组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了历史记录模态框组件，用于显示历史操作记录。
 *          该组件提供以下功能：
 *          - 显示历史记录对话框
 *          - 加载历史记录内容
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/dialog 模块获取对话框组件
 *          - 依赖 @/components/history-content 模块获取历史记录内容
 *          - 依赖 @/types 获取类型定义
 *          - 依赖 @/locales 获取国际化文本
 */
"use client";

import * as React from "react";
import { MdHistory } from "react-icons/md";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HistoryContent } from "./history-content";
import { Tool } from '@/types'
import Locale from "@/locales"

interface PropsData {
  setTool: (tool: Tool) => void
  setFile: (file: File | null) => void
}

export function HistoryModal({ setTool, setFile }: PropsData) {
  const triggerRef = React.useRef(null)
  return (
    <Dialog>
      <DialogTrigger ref={triggerRef}>
        <MdHistory className="text-slate-500 h-[1.6rem] w-[1.6rem] rotate-0 scale-100 hover:text-primary hover:scale-110 " />
      </DialogTrigger>
      <DialogContent className="max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {Locale.History.Title}
          </DialogTitle>
          <DialogDescription className="hidden">
          </DialogDescription>
        </DialogHeader>
        <HistoryContent triggerRef={triggerRef} setTool={setTool} setFile={setFile} />
      </DialogContent>
    </Dialog>
  );
}