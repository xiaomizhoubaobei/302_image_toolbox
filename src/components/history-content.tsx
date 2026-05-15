"use client";

import * as React from "react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area"
import { getHistorys, updHistorys } from "@/lib/api";
import { Button } from "./ui/button";
import ImageManager from "@/utils/Image";
import SystemManager from "@/utils/System";

import { MdOutlineCleaningServices } from "react-icons/md";

import { RiDownload2Fill } from "react-icons/ri";
import { PiMagicWandLight } from "react-icons/pi";
import { FaRegCopy } from "react-icons/fa";


import { Tool, History } from '@/types'
import Locale from "@/locales"

interface PropsData {
  setTool: (tool: Tool) => void
  setFile: (file: File | null) => void
  triggerRef: any
}

export function HistoryContent({ setTool, setFile, triggerRef }: PropsData) {
  const historys = getHistorys().reverse().filter((it: History) => it.result)
  const [showList, setShowList] = React.useState(historys)

  if (!historys.length) return Locale.History.Empty;

  const handleCleanUp = () => {
    updHistorys([])
    setShowList([])
  }

  const handleEdit = async (it: History) => {
    const file = await ImageManager.imageToFile(it.result)
    setTimeout(() => {
      setFile(file)
      setTimeout(() => {
        setTool(it.tool)
        if (triggerRef?.current) {
          triggerRef?.current.click()
        }
      }, 30)
    }, 50)
  }

  return (
    <div className="w-full">
      <div className="flex justify-between items-center">
        <div className="left flex-1 text-slate-500 text-sm">
          {Locale.History.ItemCount(showList.length)}
        </div>
        <div className="width">
          <Button size={'sm'} onClick={() => handleCleanUp()}>
            <MdOutlineCleaningServices />
            {Locale.History.Clear}
          </Button>
        </div>
      </div>

      <ScrollArea className="h-[300px] w-full rounded-md border p-4 mt-2">
        <ul className="text-sm space-y-4">
          {
            showList.map((it: any, idx: number) => {
              return <li key={idx}>
                <div className="w-full flex flex-col  items-center p-2 bg-slate-200 rounded-md space-y-1">
                  <div className="w-full flex space-x-2">
                    <div className="rounded-sm overflow-hidden w-[80px]">
                      <Image width={80} height={50} style={{ width: '100%', height: 'auto' }} alt={"result image"} src={it.result} className="rounded-sm " />
                      {/* <img src={it.result} style={{ width: '100%', height: 'auto' }} alt="" /> */}
                    </div>
                    <div className="flex-1 flex flex-col justify-between space-y-1 ">
                      <div className="font-medium text-primary text-base">{it.tool.title}</div>
                      <div className="text-sm text-slate-500">{SystemManager.formatTimestamp(it.id)}</div>
                    </div>
                    <div className="flex flex-col space-y-2 ">
                      <Button size={"sm"} onClick={() => handleEdit(it)}>
                        <PiMagicWandLight />
                        {Locale.System.ContinueEdit}
                      </Button>

                      {it.result && !it.video && !it.text &&
                        <Button size={"sm"} onClick={() => SystemManager.downloadImage(it.result)}>
                          <RiDownload2Fill />
                          {Locale.System.DownloadImage}
                        </Button>
                      }

                      {it.video &&
                        <Button size={"sm"} onClick={() => SystemManager.downloadVideo(it.video)}>
                          <RiDownload2Fill />
                          {Locale.System.DownloadVideo}
                        </Button>
                      }

                      {it.text &&
                        <Button size={"sm"} onClick={() => SystemManager.copyToClipboard(it.text)}>
                          <FaRegCopy />
                          {Locale.System.CopyText}
                        </Button>
                      }

                    </div>

                  </div>
                  {it.action.payload.prompt &&
                    <div className="w-full text-xs text-slate-400">{it.action.payload.prompt}</div>
                  }
                </div>
              </li>
            })
          }
        </ul>
      </ScrollArea>
    </div>


  );
}
