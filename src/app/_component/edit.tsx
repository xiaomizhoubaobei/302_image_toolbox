"use client"
import React, { useState } from 'react'
import Image from 'next/image'
import Loading from '@/components/loading'
import { Button } from '@/components/ui/button'
import { ScrollArea } from "@/components/ui/scroll-area"
import ToolCard from '@/components/tool-card'
import ImageTransfer from '@/components/image-transfer'
import UploadButton from '@/components/upload-button'
import { HistoryModal } from "@/components/history-modal";
import { SideSheet } from '@/components/side-sheet'
import { ToolIcon } from '@/components/my-icon'
import { Tool, Status, History } from '@/types'
import Locale from '@/locales'
import { twMerge } from 'tailwind-merge'
import { RiDownload2Fill } from "react-icons/ri";
import { BiCollapse } from "react-icons/bi";
import { BiExpand } from "react-icons/bi";
import { generateImage, generateVideo, generateText, getHistorys, updHistorys } from '@/lib/api'
import SystemManager from '@/utils/System'
import ImageManager from '@/utils/Image'
import { MdModal } from '@/components/md-modal'

const tools = Locale.Photo.Tool.list

interface PropsData {
  tool: Tool
  setTool: (tool: Tool) => void
  file: File | null
  setFile: (file: File | null) => void
}

function PhotoshowEdit({ tool, setTool, file, setFile }: PropsData) {
  const [status, setStatus] = useState<Status>('Ready')
  const [src, setSrc] = useState('')
  const [result, setResult] = useState('')
  const [videoSrc, setVideoSrc] = React.useState('')
  const [textContent, setTextContent] = React.useState('')
  const [expand, setExpand] = React.useState(false)
  const readRef = React.useRef(null)

  React.useEffect(() => {
    const setMinSrc = async () => {
      if (file) {
        const blob = await ImageManager.compressImage(file, { maxSizeMB: 5 })
        const minFile = new File([blob], 'mini.png', {
          type: 'image/png',
        })
        const url = URL.createObjectURL(minFile)
        setSrc(url)
      }
    }
    setMinSrc()
  }, [file])

  React.useEffect(() => {
    if (status === 'Finish') {
      setFile(null)
    }
  }, [status, setFile])

  // Create Image
  const handleOngenerateImage = async (src: string, action: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await generateImage(src, action)
        action.payload.canvas = null
        action.payload.mask = null
        const actionData = JSON.parse(JSON.stringify(action))
        actionData.payload.images = []
        const historys = getHistorys() as History[]
        const history: History = {
          id: Date.now(),
          tool: tool,
          src: '',
          action: actionData,
          result: res.imageSrc,
          base64: '',
          video: '',
          text: '',
        }
        updHistorys([...historys, history])
        resolve(res)
      } catch (error) {
        console.log('error::', error)
        reject(error)
      }
    })
  }

  // Create Video
  const handleOngenerateVideo = async (src: string, action: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await generateVideo(src, action)
        action.payload.canvas = null
        action.payload.mask = null
        const historys = getHistorys() as History[]
        const history: History = {
          id: Date.now(),
          tool: tool,
          src: '',
          action,
          result: res.imageSrc,
          base64: '',
          video: res.videoSrc,
          text: '',
        }
        updHistorys([...historys, history])
        resolve(res)
      } catch (error) {
        console.log('error::', error)
        reject(error)
      }
    })
  }

  // Read Text
  const handleOngenerateText = async (src: string, action: any) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await generateText(src, action)
        const historys = getHistorys() as History[]
        const history: History = {
          id: Date.now(),
          tool: tool,
          src: '',
          action,
          result: res.imageSrc,
          base64: '',
          video: '',
          text: res.textContent,
        }
        updHistorys([...historys, history])
        resolve(res)
      } catch (error) {
        console.log('error::', error)
        reject(error)
      }
    })
  }

  if (!src) return <div className="w-full h-full flex items-center"><Loading /></div>
  return (
    <div id="photosho-edit" className={
      twMerge(
        'w-full h-full relative flex overflow-hidden',
        !expand
          ? 'max-w-screen-xl mx-auto md:border md:shadow-lg md:rounded-xl'
          : 'fixed left-0 top-0 w-full h-full z-50'
      )
    }
    >
      <div className="md:hidden fixed top-2 left-4 z-50">
        <div className="flex items-center">
          <SideSheet status={status} tools={tools} tool={tool} setTool={setTool} file={file} setFile={setFile} />
        </div>
      </div>

      <div className="hidden md:block left w-[310px] h-full shadow-2xl">
        <div className="sider-bar w-[310px] h-full p-4 bg-white flex flex-col">
          <div className="w-full flex items-center justify-center space-x-2 py-2">
            <Image width={32} height={32} alt="logo" src="/logo.png"></Image>
            <p className='font-medium text-xl md:text-2xl'>{Locale.Photo.Title}</p>
          </div>
          <div className="grow relative mt-2">
            <div className="absolute top-0 left-0 w-full h-full">
              <ScrollArea className="w-full h-full">
                <ul className="w-full space-y-4 ">
                  {
                    tools.map((it, idx) => (
                      <li key={idx} onClick={() => setTool(it)} className={status === 'Pending' ? 'pointer-events-none opacity-60 ' : ''}>
                        <ToolCard active={it.id === tool.id} icon={it.icon} title={it.title} desc={it.desc}></ToolCard>
                      </li>
                    ))
                  }
                </ul>
              </ScrollArea>
            </div>
          </div>
          <div className={twMerge('w-full pt-4 bg-white', status === 'Pending' ? 'pointer-events-none opacity-60' : '')}>
            <UploadButton setFile={setFile} />
          </div>
        </div>
      </div>

      <div className="right flex-1 h-full md:px-12 md:py-4 flex flex-col space-y-4 bg-background">
        <div className="w-full flex justify-between items-center">
          <div className="block md:hidden info text-md text-primary">
            <div className="w-full flex space-x-2 items-center justify-start border-b-2 border-slate-200 ">
              <span className='py-1'>
                <ToolIcon icon={tool.icon} />
              </span>
              <span className='font-medium '>{tool.title}</span>
            </div>
          </div>
          <div className="hidden md:block info text-md text-primary">
            <span className='font-medium'>{`${Locale.Photo.Title} > `}</span>
            <span className='italic'>{tool.title}</span>
          </div>
          <div className="flex space-x-4 items-center">
            {!['read-text', 'create-video'].includes(tool.name) &&
              <Button disabled={!result && !src} variant="default" size={"sm"} onClick={() => SystemManager.downloadImage(result || src)}>
                <RiDownload2Fill />
                <span>{Locale.System.Download}</span>
              </Button>
            }
            {['create-video'].includes(tool.name) &&
              <Button disabled={!videoSrc} variant="default" size={"sm"} onClick={() => SystemManager.downloadVideo(videoSrc)}>
                <RiDownload2Fill />
                <span>{Locale.System.Download}</span>
              </Button>
            }
            {['read-text'].includes(tool.name) &&
              <MdModal trigger={readRef} content={textContent} confirm={() => SystemManager.copyToClipboard(textContent)} />
            }

            <div className="fixed top-3 right-3 z-[50] md:static">
              <div className="flex items-center space-x-2">
                <HistoryModal setTool={setTool} setFile={setFile} />
              </div>
            </div>

            <div className="absolute right-4 hidden md:block">
              {!expand
                ?
                <div className='text-xl text-slate-500 cursor-pointer opacity-60 hover:opacity-100 hover:text-primary hover:scale-110'>
                  <BiExpand onClick={() => setExpand(true)} />
                </div>
                :
                <div className='text-xl text-slate-500 cursor-pointer opacity-60 hover:opacity-100 hover:text-primary hover:scale-80'>
                  <BiCollapse onClick={() => setExpand(false)} />
                </div>
              }
            </div>

          </div>
        </div>

        <div className="w-full grow flex items-center">
          {
            src &&
            <ImageTransfer
              expand={expand}
              file={file}
              tool={tool}
              readRef={readRef}
              onGenerateImage={handleOngenerateImage}
              onGenerateVideo={handleOngenerateVideo}
              onGenerateText={handleOngenerateText}
              src={src}
              setSrc={setSrc}
              status={status}
              setStatus={setStatus}
              result={result}
              setResult={setResult}
              videoSrc={videoSrc}
              setVideoSrc={setVideoSrc}
              textContent={textContent}
              setTextContent={setTextContent}
            />
          }
        </div>
      </div>

    </div>
  )
}

export default PhotoshowEdit