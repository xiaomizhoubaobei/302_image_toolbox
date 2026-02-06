/**
 * @fileoverview 侧边栏组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了侧边栏组件，用于显示工具菜单。
 *          该组件提供以下功能：
 *          - 显示工具列表
 *          - 支持工具选择
 *          - 支持文件上传
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/sheet 模块获取侧边栏组件
 *          - 依赖 @/components/ui/scroll-area 模块获取滚动区域组件
 *          - 依赖 @/components/tool-card 模块获取工具卡片组件
 *          - 依赖 @/components/upload-button 模块获取上传按钮组件
 *          - 依赖 @/types 获取类型定义
 *          - 依赖 @/locales 获取国际化文本
 */
import React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"
import ToolCard from '@/components/tool-card'
import UploadButton from '@/components/upload-button'
import { RiMenuUnfoldFill } from "react-icons/ri";
import Image from "next/image";
import { Tool, Status } from "@/types";
import { twMerge } from 'tailwind-merge'
import Locale from "@/locales"

interface PropsData {
  status: Status
  tools: Tool[]
  tool: Tool
  setTool: (tool: Tool) => void
  file: File | null
  setFile: (file: File | null) => void
}


export function SideSheet({ status, tools, tool, setTool, setFile }: PropsData) {
  const triggerRef = React.useRef<any>(null)

  const handleSelectTool = async (it: Tool) => {
    setTimeout(() => {
      setTimeout(() => {
        setTool(it)
        if (triggerRef?.current) {
          triggerRef?.current.click()
        }
      }, 30)
    }, 50)
  }

  return (
    <Sheet>
      <SheetTrigger asChild ref={triggerRef}>
        <div className="flex py-1 items-center cursor-pointer rounded-md hover:scale-110">
          <RiMenuUnfoldFill className="w-8 h-8 text-primary" />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="z-[999] px-0">
        <SheetHeader>
          <SheetTitle>
            <div className="w-full flex items-center justify-center space-x-2 py-2">
              <Image width={32} height={32} alt="logo" src="/favicon.webp"></Image>
              <p className='font-medium text-xl md:text-2xl'>{Locale.Photo.Title}</p>
            </div>
          </SheetTitle>
          <SheetDescription className="hidden"></SheetDescription>
        </SheetHeader>
        <div className="w-full h-full relative">

          <ScrollArea className="w-full h-full relative">
            <ul className="w-full space-y-4 p-4">
              {
                tools.map((it, idx) => (
                  <li key={idx} onClick={() => handleSelectTool(it)} className={status === 'Pending' ? 'pointer-events-none opacity-60 ' : ''}>
                    <ToolCard active={it.id === tool.id} icon={it.icon} title={it.title} desc={it.desc}></ToolCard>
                  </li>
                ))
              }
            </ul>
            <div className="w-fu h-24"></div>
          </ScrollArea>

          <div className="absolute left-0 bottom-2 h-24 p-4 w-full bg-background/95">
            <div className={twMerge('w-full', status === 'Pending' ? 'pointer-events-none opacity-60' : '')}>
              <UploadButton setFile={setFile} />
            </div>
          </div>
        </div>

      </SheetContent>
    </Sheet>
  )
}