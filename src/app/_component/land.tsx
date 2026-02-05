/**
 * @fileoverview 图片工具箱着陆页组件
 * @author 祁筱欣
 * @date 2026-02-05
 * @since 2026-02-05
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了图片工具箱的着陆页，提供工具展示、图片上传和 AI 生成图片功能。
 *          该组件作为客户端组件运行，负责以下任务：
 *          - 展示所有可用的图片处理工具
 *          - 提供用户上传图片的入口
 *          - 支持 AI 文生图功能，可根据提示词生成图片
 *          - 提供语言切换和历史记录访问功能
 *          - 支持模型选择和比例设置
 *
 *          工作流程：
 *          1. 用户浏览工具列表选择需要的工具
 *          2. 用户可以上传图片或使用 AI 生成图片
 *          3. AI 生成功能支持选择模型、设置比例和输入提示词
 *          4. 生成或上传的图片会传递给编辑页面
 *
 *          依赖关系：
 *          - 依赖 @/components/* 模块获取 UI 组件
 *          - 依赖 @/lib/api 模块进行 API 调用
 *          - 依赖 @/utils/Image 模块进行图片处理
 *          - 依赖 @/locales 模块获取国际化文本
 */
'use client'
import React from 'react'
import Image from 'next/image'
import UploadFile from '@/components/upload-file'
import ToolCard from '@/components/tool-card'
import { HistoryModal } from "@/components/history-modal";
import { LangMenu } from '@/components/lang-menu';
import { RatioModal } from '@/components/ratio-modal'
import { ModelSelecter } from '@/components/model-selecter'
import { Tool } from '@/types'
import Locale from '@/locales'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import Loading from '@/components/loading'
import { textToImage } from '@/lib/api'
import ImageManager from '@/utils/Image'

const tools = Locale.Photo.Tool.list

interface PropsData {
  tool: Tool
  setTool: (tool: Tool) => void
  file: File | null
  setFile: (file: File | null) => void
}

/**
 * 图片工具箱着陆页主组件
 * 提供工具展示、图片上传和 AI 生成图片功能
 * @param props - 组件属性
 * @param props.setTool - 设置工具的回调函数
 * @param props.file - 当前上传的文件
 * @param props.setFile - 设置文件的回调函数
 */
function PhotoshowLand({ setTool, file, setFile }: PropsData) {
  const [isClient, setIsClient] = React.useState(false)
  const uploadRef = React.useRef<HTMLDivElement | undefined>(undefined)
  const [loading, setLoading] = React.useState(false)
  const [message, setMessage] = React.useState('')
  const [model, setModel] = React.useState({
    name: 'FLux-Dev',
    value: 'flux-dev'
  })
  const [ratio, setRatio] = React.useState({
    name: '1:1',
    value: 1,
    size: '1024x1024'
  },)
  const [prompt, setPrompt] = React.useState('')
  const [link, setLink] = React.useState('')

  /**
 * 处理工具选择
 * 选中工具后触发文件上传对话框
 * @param it - 选中的工具对象
 */
const handleSeletTool = (it: Tool) => {
    setTool(it)
    uploadRef?.current?.click()
  }

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  /**
 * 处理提示词输入变化
 * 更新图片生成提示词状态
 * @param target - 输入事件目标对象
 */
const handlePromptChange = ({ target }: any) => {
    setPrompt(target.value)
  }

  /**
 * 处理链接输入变化
 * 更新 QR 码生成链接状态
 * @param target - 输入事件目标对象
 */
const handleLinkChange = ({ target }: any) => {
    setLink(target.value)
  }

  /**
 * 处理 AI 图片生成
 * 调用 API 根据提示词生成图片，并转换为文件
 */
const handleOngenerateImage = async () => {
    try {
      setMessage('')
      setLoading(true)
      const res = await textToImage({ model, ratio, prompt, link })
      const file = await ImageManager.imageToFile(res.imageSrc)
      setFile(file)
    } catch (error) {
      setMessage(`* ${Locale.Error.GenerateImageError}`)
    } finally {
      setLoading(false)
    }
  }
  if (!isClient) return null

  return (
    <div id="photoshow-land" className='max-w-screen-sm mx-auto'>
      <section className="title flex justify-center py-8 mt-8">
        <div className='flex items-center space-x-2'>
          <Image src="/favicon.webp" alt="logo" width={50} height={50}></Image>
          <h2 className='font-medium text-2xl md:text-4xl'>{Locale.Photo.Title}</h2>
        </div>
      </section>

      <section className="upload w-full mt-8">
        <UploadFile ref={uploadRef} file={file} setFile={setFile} />
        <div className="w-full text-sm text-center text-slate-500 mt-4">{Locale.Photo.Landing.Or}</div>
        <div className="flex w-full items-center mt-4 flex-wrap space-y-2 md:flex-nowrap md:space-y-0 md:space-x-2">
          <Input onChange={handlePromptChange} className=' bg-white text-slate-600 text-sm' type="email" placeholder={Locale.Photo.Landing.CreateImagePlaceholder} />
          <div className="flex items-center md:w-full justify-between md:space-x-2 flex-1">
            <ModelSelecter model={model} setModel={setModel} />
            {['aura-flow', 'qr-code',].includes(model.value)
              ? <Button onClick={handleOngenerateImage} disabled={(model.value === 'aura-flow' && !prompt) || (model.value === 'qr-code' && !link)} size={'sm'} type="submit" className={'px-6 text-sm'}>{Locale.Photo.Landing.CreateImageAction}</Button>
              : <RatioModal ratio={ratio} setRatio={setRatio} confirm={() => handleOngenerateImage()} disabled={!prompt} />
            }
          </div>
        </div>
        {prompt && message &&
          <div className="w-full p-2 text-sm text-red-500 text-center">{message}</div>
        }
        {model.value === 'qr-code' &&
          <div className="w-full mt-4 bg-white">
            <Input onChange={handleLinkChange} className=' bg-white text-slate-600 text-sm' placeholder={Locale.Photo.Landing.InputLinkPlaceholder} />
          </div>
        }
      </section>

      <section className="example mt-8">
        <div className="w-full text-sm text-center text-slate-500">{Locale.Photo.Landing.NowSupport}</div>
        <ul className="w-full mt-4 grid grid-cols-2 gap-x-4 gap-y-2 sm:gap-x-8 sm:gap-y-4">
          {
            tools.map((it, idx) =>
              <li
                className='min-h-16'
                key={idx} onClick={() => handleSeletTool(it)}>
                <ToolCard icon={it.icon} title={it.title} desc={it.desc} />
              </li>
            )
          }
        </ul>
      </section>

      <section className='fixed top-3 right-3 z-50 space-x-2 flex items-center'>
        <LangMenu />
        <HistoryModal setTool={setTool} setFile={setFile} />
      </section>

      {loading &&
        <section className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/75 z-50'>
          <Loading />
        </section>
      }
    </div>
  )
}

export default PhotoshowLand