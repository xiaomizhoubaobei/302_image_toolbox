import React from 'react'
import NextImage from 'next/image'
import { twMerge } from 'tailwind-merge'
import { Button } from '@/components/ui/button'
import ImageCompare from './image-compare'
import ImageCropper from './image-cropper'
import ScaleBar from './scale-bar'
import UploadBar from './upload-bar'
import PromptBar from './prompt-bar'
import RatioBar from './ratio-bar'
import SizeBar from './size-bar'
import LangSelecter from './lang-selecter'
import UploadImages from './upload-images'
import AlertBar from './alert-bar'
import { DescriptModal } from './descript-modal'
import { CharacterModal } from './character-modal'
import { ConfirmModal } from './confirm-modal'
import { updTask } from '@/lib/api'
import { Tool, Status } from '@/types'
import { PHOTO_DEFAULT_PAYLOAD } from '@/constants'
import ImageManager from '@/utils/Image'
import { ImageEditor } from './image-editor'
import ImageUncropper from './Image-uncropper'
import ZoomBox from './zoom-box'
import VideoPlayer from './video-player'
import { FaArrowRightLong } from "react-icons/fa6";
import { Checkbox } from './ui/checkbox'

import Locale from '@/locales'

// use dynamic import to fixed the canvas require error on next14
import dynamic from 'next/dynamic'
const ImageMask = dynamic(() => import('./Image-mask'), {
  ssr: false,
})
const ImageStitching = dynamic(() => import('./image-stitching'), {
  ssr: false,
})

interface PropsData {
  expand: boolean
  file: File | null
  tool: Tool
  readRef: any
  onGenerateImage: (src: string, action: any) => Promise<any>
  onGenerateVideo: (src: string, action: any) => Promise<any>
  onGenerateText: (src: string, action: any) => Promise<any>
  src: string
  setSrc: (src: string) => void
  status: string
  setStatus: (status: Status) => void
  result: string
  setResult: (result: string) => void
  videoSrc: string
  setVideoSrc: (vidoe: string) => void
  textContent: string
  setTextContent: (text: string) => void
}

function ImageTransfer({ expand, file, tool, readRef, onGenerateImage, onGenerateVideo, onGenerateText, src, setSrc, status, setStatus, result, setResult, videoSrc, setVideoSrc, textContent, setTextContent, }: PropsData) {
  const [maxWidth, setMaxWidth] = React.useState('900px')
  const [errorInfo, setErrorInfo] = React.useState<any>(null)
  const [payload, setPayload] = React.useState<any>(PHOTO_DEFAULT_PAYLOAD)
  const [originSrc, setOriginSrc] = React.useState('')
  const [media, setMedia] = React.useState('image')
  const [isReady, setIsReady] = React.useState(true)

  // 生成文字
  const handleReadText = async () => {
    try {
      // 清除结果
      setTextContent('')
      // 设置媒体
      setMedia('text')
      // 设置状态
      setStatus('Pending')
      const res = await onGenerateText(src, { type: tool.name, payload, })
      // 设置结果
      setTextContent(res.textContent)
      // 设置状态
      setStatus('Done')
      // trigger
      setTimeout(() => {
        readRef?.current.click()
      }, 50)
    } catch (error) {
      console.log('error::', error)
      setErrorInfo(error)
      setStatus('Error')
    }
  }

  // 生成视频
  const handleCreateVideo = async () => {
    try {
      // 清除结果
      setVideoSrc('')
      // 设置媒体
      setMedia('video')
      // 设置状态
      setStatus('Pending')
      // 设置图片
      let url = src
      if (payload.canvas) {
        if (payload.model === 'runway') {
          const newCanvas = await ImageManager.resetSizeCanvas(payload.canvas, { width: 1280, height: 768 }) as any
          url = newCanvas.toDataURL()
        } else {
          url = payload.canvas.toDataURL()
        }
      }
      const local = await ImageManager.localizeImage(url) as string
      setResult(local)
      const res = await onGenerateVideo(local, { type: tool.name, payload, })
      // 设置结果
      setVideoSrc(res.videoSrc)
      // 设置状态
      setStatus('Done')

    } catch (error) {
      setMedia('image')
      setResult('')
      setErrorInfo(error)
      setStatus('Error')
    }
  }

  // 重置视频
  const handleResetVideo = async () => {
    // 设置媒体
    setMedia('image')
    // 重置图片
    setResult('')
    // 重置视频
    setVideoSrc('')
    // 重置状态
    setStatus('Ready')
  }

  // 开始任务
  const handleStart = async () => {
    try {
      // 设置媒体
      setMedia('image')
      // 设置状态
      setStatus('Pending')
      const res = await onGenerateImage(src, { type: tool.name, payload, })
      // 载入图片
      const local = await ImageManager.localizeImage(res.imageSrc) as string
      // 缓存原图
      setOriginSrc(src)
      // 因为图片尺寸有变化
      if (['crop-img', 'uncrop', 'filter-img', 'character'].includes(tool.name)) {
        setSrc(local)
      }
      // 设置结果
      setResult(local)
      // 设置状态
      setStatus('Done')
    } catch (error) {
      setErrorInfo(error)
      setStatus('Error')
    }
  }

  // 重试任务
  const handleRestart = async () => {
    // 恢复原图
    if (originSrc) {
      setSrc(originSrc)
    }
    if (['crop-img', 'uncrop', 'filter-img', 'remove-obj', 'inpaint-img', 'character', 'stitching', 'swap-face', 'translate-text', 'erase-text'].includes(tool.name)) {
      setStatus('Ready')
      setResult('')
    } else {
      setResult('')
      handleStart()
    }
  }

  // 继续任务
  const handleContinue = async () => {
    // 设置媒体, 视频截图不保存result
    let isSaveResult = true
    if (media === 'video') {
      isSaveResult = false
      setResult('')
      setMedia('image')
    }
    // 清空视频
    setVideoSrc('')
    // 清空文字
    setTextContent('')
    // 重置图片
    if (result && isSaveResult) {
      setSrc(result)
    }
    setResult('')
    setStatus('Ready')
    setPayload(PHOTO_DEFAULT_PAYLOAD)
    // hook for payload
    if (tool.name === 'character') {
      setTimeout(() => {
        setPayload((preData: any) => { return { ...preData, ratio: 1 / 1, label: '1:1' } });
      }, 20)
    }
    updTask({})


  }

  // 重置状态
  const handleReset = async () => {
    setResult('')
    setVideoSrc('')
    setTextContent('')
    setStatus('Ready')
    setPayload(PHOTO_DEFAULT_PAYLOAD)
    // hook
    if (tool.name === 'character') {
      setTimeout(() => {
        setPayload((preData: any) => { return { ...preData, ratio: 1 / 1, label: '1:1' } });
      }, 30)
    }
    updTask({})
  }

  // 退出编辑
  const handleStop = async () => {
    updTask({})
    setStatus('Finish')
  }

  // 文件变化, 重置状态
  React.useEffect(() => {
    if (file) {
      handleReset()
    }
  }, [file])

  // 工具变化, 继续任务
  React.useEffect(() => {
    handleContinue()
  }, [tool])

  // 原图变化，重设容器尺寸
  React.useEffect(() => {
    const offset = expand ? 480 : 560 // 上下留白的边距
    const boxHeight = window.innerHeight - offset
    const img = new Image()
    img.src = src
    img.onload = () => {
      if (img.width && img.height) {
        let boxWidth = Math.floor(img.width / img.height * boxHeight)
        if (img.width < boxWidth) {
          boxWidth = img.width
        }
        setMaxWidth(boxWidth + 'px')
      }
    }
    img.onerror = () => {
      console.log('Load image error')
    }
  }, [src, tool.name, media, expand])

  // 结果图变化，重设容器尺寸
  React.useEffect(() => {
    if (!result) return
    // setMaxWidth('10px')
    const offset = expand ? 480 : 560 // 上下留白的边距
    const boxHeight = window.innerHeight - offset
    const img = new Image()
    img.src = result
    img.onload = () => {
      if (img.width && img.height) {
        let boxWidth = Math.floor(img.width / img.height * boxHeight)
        if (img.width < boxWidth) {
          boxWidth = img.width
        }
        setMaxWidth(boxWidth + 'px')
      }
    }
    img.onerror = () => {
      console.log('Load image error')
    }
  }, [result, expand])

  // 展示比例变化，重设容器尺寸
  React.useEffect(() => {
    if (!payload.ratio) return
    if (tool.name !== 'stitching') return
    // setMaxWidth('10px')
    // const offset = 480 // 上下留白的边距
    const offset = expand ? 480 : 560 // 上下留白的边距
    const boxHeight = window.innerHeight - offset
    let boxWidth = Math.floor(boxHeight * payload.ratio)
    setMaxWidth(boxWidth + 'px')
  }, [payload.ratio, tool.name, expand])

  // 参数变化，校验数据
  React.useEffect(() => {
    setIsReady(true)
    if (tool.name === 'remove-obj') {
      if (!payload.mask) {
        setIsReady(false)
      }
    }
    if (tool.name === 'replace-bg') {
      if (!payload.prompt) {
        setIsReady(false)
      }
    }
    if (tool.name === 'swap-face') {
      if (!payload.mask) {
        setIsReady(false)
      }
    }
    if (tool.name === 'uncrop') {
      if (!payload.mask) {
        setIsReady(false)
      }
    }
    if (tool.name === 'inpaint-img') {
      if (!payload.prompt) {
        setIsReady(false)
      }
      if (!payload.mask) {
        setIsReady(false)
      }
    }
    if (tool.name === 'recreate-img') {
      if (!payload.prompt) {
        setIsReady(false)
      }
    }
    if (tool.name === 'sketch-img') {
      if (!payload.prompt) {
        setIsReady(false)
      }
    }
    if (tool.name === 'super-upscale') {
      if (!payload.prompt) {
        setIsReady(false)
      }
    }
    if (tool.name === 'translate-text') {
      if (!payload.tgtLang) {
        setIsReady(false)
      }
    }
    // if (tool.name === 'create-video') {
    //   if (!payload.canvas) {
    //     setIsReady(false)
    //   }
    // }

  }, [tool, result, payload])

  return (
    <div id="image-transfer" className="w-full h-full space-y-4 flex flex-col">
      {/* 占位区 */}
      <div className="w-full">
        {status === 'Error' &&
          <AlertBar errInfo={errorInfo} />
        }
      </div>

      {/* 展示区 */}
      <div className="show w-full grow flex flex-col justify-center items-center space-y-4">
        {/* 错误信息 */}
        <div className="relative w-full flex-1 flex items-center justify-center">
          {/* 缩放容器 */}
          <ZoomBox move={!['crop-img', 'filter-img', 'character', 'stitching',].includes(tool.name)} tool={tool} result={result}>
            {/* 图片容器 */}
            <div
              className={twMerge("flex-1 w-full space-y-2 flex items-center justify-center",
                ['inpaint-img', 'remove-obj', 'uncrop',].includes(tool.name) ? 'pb-12 h-full' : ''
              )}
              style={{
                width: '200px',
                maxWidth:
                  ['remove-obj', 'inpaint-img', 'uncrop',]
                    .includes(tool.name) && !result ? '100%' : maxWidth
              }}
            >

              {/* 基础通用图片容器 */}
              {!['crop-img', 'uncrop', 'filter-img', 'remove-obj', 'inpaint-img', 'create-video', 'read-text', 'character', 'stitching'].includes(tool.name) &&
                <div className={twMerge("w-full relative ", media === 'image' ? 'mosaic-bg' : '')}>

                  {src && !result &&
                    <img alt="image" src={src}
                      className={twMerge('w-full h-auto m-auto')}
                    >
                    </img>
                  }
                  {src && result &&
                    <img alt="image" src={result}
                      className={twMerge('w-full h-auto m-auto opacity-0')}
                    >
                    </img>
                  }

                  {result &&
                    <div className='w-full absolute top-0 '>
                      <ImageCompare
                        beforeSrc={src}
                        afterSrc={result}
                        initPosition={30}
                      />
                    </div>
                  }

                  {status === 'Pending' &&
                    <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                    </div>
                  }
                </div>
              }

              {/* 高级定制图片容器1, 尺寸改变 */}
              {['crop-img', 'character'].includes(tool.name) &&
                <div className={twMerge("w-full h-full relative flex items-center justify-center")}>

                  {!result &&
                    <div className="flex w-full h-full flex-col">
                      <ImageCropper src={src} setSrc={setSrc} payload={payload} setPayload={setPayload} />
                    </div>
                  }

                  {result &&
                    <img width={200} height={200} alt="image" src={result} className={
                      twMerge('w-full h-auto m-auto')}
                    >
                    </img>
                  }

                  {status === 'Pending' &&
                    <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                    </div>
                  }

                </div>
              }


              {/* 高级定制图片容器2, 尺寸改变 */}
              {['uncrop'].includes(tool.name) &&
                <div className={twMerge("w-full h-full relative flex items-center justify-center",)}>
                  {!result &&
                    < ImageUncropper src={src} setSrc={setSrc} setPayload={setPayload} />
                  }

                  {result &&
                    <img alt="result image" src={result} className={
                      twMerge('w-full h-auto m-auto')}
                    >
                    </img>
                  }

                  {status === 'Pending' &&
                    <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                    </div>
                  }

                </div>
              }


              {/* 高级定制图片容器3, 尺寸改变 */}
              {['filter-img'].includes(tool.name) &&
                <div className={twMerge("w-full h-full relative flex items-center justify-center ")}>

                  {!result &&
                    <ImageEditor src={src} setSrc={setSrc} setPayload={setPayload} />
                  }

                  {result &&
                    <img width={200} height={200} alt="image" src={result} className={
                      twMerge('w-full h-auto m-auto')}
                    >
                    </img>
                  }

                  {status === 'Pending' &&
                    <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                    </div>
                  }

                </div>
              }

              {/* 高级定制图片容器4: 涂抹操作 */}
              {['remove-obj', 'inpaint-img'].includes(tool.name) &&
                <div className={twMerge("w-full h-full relative flex items-center justify-center")}>
                  {!result &&
                    <ImageMask maxWidth={maxWidth} src={src} setSrc={setSrc} setPayload={setPayload} />
                  }

                  {result &&
                    <ImageCompare
                      beforeSrc={src}
                      afterSrc={result}
                      initPosition={30}
                    />
                  }

                  {status === 'Pending' &&
                    <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                    </div>
                  }

                </div>
              }


              {/* 高级定制图片容器6, 生成视频 */}
              {['create-video'].includes(tool.name) &&
                <div className={twMerge("w-full h-full relative flex items-center justify-center ")}>


                  {media === 'image' &&
                    <ImageCropper src={src} setSrc={setSrc} payload={payload} setPayload={setPayload} />
                  }

                  {media === 'video' &&
                    <img alt="image" src={result}
                      className={twMerge('w-full h-auto m-auto', status !== 'Pending' ? 'opacity-0' : '')}
                    >
                    </img>
                  }

                  {videoSrc && media === 'video' &&
                    <div className='absolute top-0 left-0 w-full' style={{ background: 'rgb(245, 245, 245, 0.6)' }}>
                      <VideoPlayer
                        url={videoSrc}
                        width="100%"
                        height="100%"
                      />
                    </div>
                  }

                  {status === 'Pending' &&
                    <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                    </div>
                  }

                </div>
              }

              {/* 高级定制图片容器7, 读取文字 */}
              {['read-text'].includes(tool.name) &&
                <div className={twMerge("w-full h-full relative flex items-center justify-center")}>
                  {src &&
                    <img width={200} height={200} alt="image" src={src}
                      className={twMerge('w-full h-auto m-auto')}
                    >
                    </img>
                  }

                  {status === 'Pending' &&
                    <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                    </div>
                  }
                </div>
              }

              {/* 高级定制图片容器8, 尺寸改变 */}
              {['stitching'].includes(tool.name) &&
                <div className={twMerge("w-full h-full relative flex items-center justify-center ")}>

                  {!result &&
                    <ImageStitching src={src} setSrc={setSrc} payload={payload} setPayload={setPayload} />
                  }

                  {result &&
                    <img width={200} height={200} alt="image" src={result} className={
                      twMerge('w-full h-auto m-auto')}
                    >
                    </img>
                  }

                  {status === 'Pending' &&
                    <div className={twMerge('scan w-full absolute top-0 transition-all duration-200 pointer-events-none',)}>
                    </div>
                  }

                </div>
              }


            </div>
          </ZoomBox>


        </div>

        {/* 状态参数 */}
        <div className="w-full justify-center items-center">
          {status === 'Pending' &&
            <div className='text-center text-sm text-violet-500'>
              {media === 'image' &&
                <p>{Locale.System.WaitImage}</p>
              }
              {media === 'video' &&
                <p>{Locale.System.WaitVideo}</p>
              }
              {media === 'text' &&
                <p>{Locale.System.WaitText}</p>
              }
            </div>
          }

          {status !== 'Pending' &&
            <div className="w-full">
              {tool.name === 'upscale' &&
                <ScaleBar payload={payload} setPayload={setPayload} />
              }
              {tool.name === 'super-upscale' &&
                <div className="w-full flex flex-col space-y-2">
                  <PromptBar payload={payload} setPayload={setPayload} />
                </div>
              }
              {tool.name === 'swap-face' &&
                <UploadBar payload={payload} setPayload={setPayload} />
              }
              {tool.name === 'recreate-img' &&
                <PromptBar payload={payload} setPayload={setPayload} />
              }
              {tool.name === 'inpaint-img' &&
                <PromptBar payload={payload} setPayload={setPayload} />
              }
              {tool.name === 'sketch-img' &&
                <PromptBar payload={payload} setPayload={setPayload} />
              }
              {tool.name === 'replace-bg' &&
                <div className="w-full flex flex-col space-y-2">
                  <PromptBar
                    payload={payload}
                    setPayload={setPayload}
                    placeHolder={Locale.System.BackgroundPLaceholder}
                  />
                </div>
              }
              {tool.name === 'create-video' && !videoSrc &&
                <div className="w-full mt-2">
                  <RatioBar payload={payload} setPayload={setPayload} />
                </div>
              }
              {tool.name === 'stitching' && !result &&
                <div className="w-full flex flex-col space-y-2 items-center justify-center">
                  <SizeBar payload={payload} setPayload={setPayload} />
                  <UploadImages payload={payload} setPayload={setPayload} />
                </div>
              }
              {tool.name === 'translate-text' && !result &&
                <div className="w-full flex flex-col space-y-4 items-center justify-center">
                  <div className="w-full flex space-x-4 justify-center">
                    <LangSelecter title={Locale.Photo.LangSelecter.Title} langs={Locale.Photo.LangSelecter.List} lang={payload.srcLang} setLang={(lang) => setPayload((preData: any) => { return { ...preData, srcLang: lang } })} />
                    <FaArrowRightLong className='text-slate-400' />
                    <LangSelecter title={Locale.Photo.LangSelecter.Title} langs={Locale.Photo.LangSelecter.List.slice(1)} lang={payload.tgtLang} setLang={(lang) => setPayload((preData: any) => { return { ...preData, tgtLang: lang } })} />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="protect"
                      checked={payload.protectLang}
                      onCheckedChange={(value) => {
                        setPayload((preData: any) => { return { ...preData, protectLang: value } })
                      }}
                    />
                    <label
                      htmlFor="protect"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {Locale.Photo.LangProtect.Translate}
                    </label>
                  </div>

                </div>
              }
              {tool.name === 'erase-text' && !result &&
                <div className="w-full flex flex-col space-y-2 items-center justify-center">
                  <LangSelecter title={Locale.Photo.LangSelecter.Title} langs={Locale.Photo.LangSelecter.List} lang={payload.srcLang} setLang={(lang) => setPayload((preData: any) => { return { ...preData, srcLang: lang } })} />
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="protect"
                      checked={payload.protectLang}
                      onCheckedChange={(value) => {
                        setPayload((preData: any) => { return { ...preData, protectLang: value } })
                      }}
                    />
                    <label
                      htmlFor="protect"
                      className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {Locale.Photo.LangProtect.Erase}
                    </label>
                  </div>
                </div>
              }
            </div>
          }
        </div>

      </div>


      {/* 操作区 */}
      <div className="w-full h-12 md:hidden"></div>
      <div className={twMerge("action flex justify-between space-x-4 fixed left-0 bottom-12 w-full px-4 pt-2 bg-background/95 md:static md:p-0", expand && 'md:px-12')}>
        <ConfirmModal confirm={handleStop} />

        <div className="flex-1 flex items-center justify-center space-x-2">
          {tool.name === 'remove-obj' && result &&
            <Button variant="default" onClick={handleContinue}>{Locale.System.ContinueRemove}</Button>
          }
          {tool.name === 'uncrop' && result &&
            <Button variant="default" onClick={handleContinue}>{Locale.System.ContinueExpand}</Button>
          }
          {tool.name === 'inpaint-img' && result &&
            <Button variant="default" onClick={handleContinue}>{Locale.System.ContinueModify}</Button>
          }

        </div>

        {/* 图片 */}
        {!['read-text', 'create-video', 'character'].includes(tool.name) &&
          <div className="">
            {result || status === 'Error'
              ?
              <Button variant="default" onClick={handleRestart}>
                {['crop-img', 'uncrop', 'filter-img', 'remove-obj', 'inpaint-img', 'stitching', 'swap-face', 'translate-text', 'erase-text'].includes(tool.name) ? Locale.System.Redo : Locale.System.Retry}
              </Button>
              :
              <Button variant="default" disabled={status !== 'Ready' || !isReady || media === 'video'} onClick={handleStart}>
                {['crop-img', 'filter-img',].includes(tool.name) ? Locale.System.Save : Locale.System.Start}
              </Button>
            }
          </div>
        }

        {/* 视频 */}
        {['create-video',].includes(tool.name) &&
          <div className="">
            {videoSrc || status === 'Error'
              ?
              <Button variant="default" onClick={handleResetVideo}>
                {Locale.System.Redo}
              </Button>
              :
              <DescriptModal status={status} payload={payload} setPayload={setPayload} confirm={handleCreateVideo} />
            }
          </div>
        }

        {/* 文字 */}
        {['read-text',].includes(tool.name) &&
          <div className="">
            {textContent || status === 'Error'
              ?
              <Button variant="default" onClick={handleReadText}>
                {Locale.System.Retry}
              </Button>
              :
              <Button variant="default" disabled={status !== 'Ready' || !isReady} onClick={handleReadText}>
                {Locale.System.Substract}
              </Button>
            }
          </div>
        }

        {/* 滤镜 */}
        {['character',].includes(tool.name) &&
          <div className="">
            {result || status === 'Error'
              ?
              <Button variant="default" onClick={handleRestart}>
                {Locale.System.Redo}
              </Button>
              :
              <CharacterModal title={Locale.System.SelectFilter} status={status} payload={payload} setPayload={setPayload} confirm={handleStart} />
            }
          </div>
        }

      </div>
    </div >

  )
}

export default ImageTransfer