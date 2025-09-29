'use client'
import React from "react"
import PhotoshowLand from "./_component/land"
import PhotoshowEdit from "./_component/edit"
import PageAuth from "./_component/auth"
import { useStore } from "@/stores";
import { Tool } from "@/types"
import Locale from '@/locales'
const tools = Locale.Photo.Tool.list

export default function PhotoshowPage() {
  const { token } = useStore();
  const [tool, setTool] = React.useState<Tool>(tools[0])
  const [file, setFile] = React.useState<File | null>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (window) {
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