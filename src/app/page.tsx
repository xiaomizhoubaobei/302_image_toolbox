'use client'
import React from "react"
import dynamic from 'next/dynamic'
import PhotoshowLand from "./_component/land"
import PageAuth from "./_component/auth"
import { useStore } from "@/stores";
import { Tool } from "@/types"
import Locale from '@/locales'
const tools = Locale.Photo.Tool.list

// 动态导入编辑组件以减少初始包大小
const PhotoshowEdit = dynamic(() => import('./_component/edit'), {
  ssr: false,
  loading: () => <div className="flex justify-center items-center h-screen">Loading editor...</div>
})

export default function PhotoshowPage() {
  const { token } = useStore();
  const [tool, setTool] = React.useState<Tool>(tools[0])
  const [file, setFile] = React.useState<File | null>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      document.title = Locale.Title;
    }
  }, []);

  return (
    <div id="photoshow-page" className="w-full p-4">
      {!token && (<PageAuth open={open} setOpen={setOpen} />)}
      {file
        ? <PhotoshowEdit tool={tool} setTool={setTool} file={file} setFile={setFile} />
        : <PhotoshowLand tool={tool} setTool={setTool} file={file} setFile={setFile} />
      }
    </div>
  )
}