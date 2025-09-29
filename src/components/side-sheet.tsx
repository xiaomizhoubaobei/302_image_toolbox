import React from "react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
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


export function SideSheet({ status, tools, tool, setTool, file, setFile }: PropsData) {
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
          {/* <Image width={32} height={32} alt="logo" src="/logo.png"></Image> */}
          <RiMenuUnfoldFill className="w-8 h-8 text-primary" />
        </div>
      </SheetTrigger>
      <SheetContent side={"left"} className="z-[999] px-0">
        <SheetHeader>
          <SheetTitle>
            <div className="w-full flex items-center justify-center space-x-2 py-2">
              <Image width={32} height={32} alt="logo" src="/logo.png"></Image>
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
