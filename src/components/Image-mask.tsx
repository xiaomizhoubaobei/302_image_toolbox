import React, { useState, useRef, useEffect } from 'react'
import { Stage, Layer, Line } from 'react-konva'
import Konva from 'konva'
import { twMerge } from 'tailwind-merge'
import { Slider } from "@/components/ui/slider"
import { LiaUndoAltSolid } from "react-icons/lia";
import ZoomBox from './zoom-box'



export function canvasToBlob(
  canvas: HTMLCanvasElement,
  type = 'image/png' as 'image/jpeg' | 'image/png',
  quality?: number
): Promise<Blob | null> {
  return new Promise((res) => {
    canvas.toBlob((blob) => res(blob), type, quality)
  })
}

export function downloadImage(uri: string, name: string) {
  const link = document.createElement('a')
  link.href = uri
  link.download = name

  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
    })
  )

  setTimeout(() => {
    link.remove()
  }, 100)
}

type Result = {
  base64: string
}

type Line = { tool: string; brush: number; points: number[] }

interface PropsData {
  maxWidth: string
  src: string
  setSrc: (src: string) => void
  setPayload: (data: any) => void
}

const ImageMask: React.FC<PropsData> = ({ maxWidth, src, setSrc, setPayload }) => {
  const [image, setImage] = useState<HTMLImageElement | null>(null)
  const [tool, setTool] = useState<'move' | 'pen' | 'eraser'>('pen')
  const [brushSize, setBrushSize] = useState(30)
  const [lines, setLines] = useState<Line[]>([])
  const [history, setHistory] = useState<Line[][]>([[]])
  const [historyIndex, setHistoryIndex] = useState(0)
  const stageRef = useRef(null)
  const isDrawing = useRef(false)
  // mask
  const maskRef = useRef<HTMLDivElement>(null)


  const resetColor = (currentSage: any) => {
    if (currentSage) {
      const canvas = currentSage.getStage().toCanvas()
      const context = canvas.getContext('2d')
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < imageData.data.length; i += 4) {
        // 当 alpha 通道为 0（完全透明）时，改变颜色为黑色
        if (imageData.data[i + 3] == 0) {
          imageData.data[i] = 0 // red
          imageData.data[i + 1] = 0 // green
          imageData.data[i + 2] = 0 // blue
          imageData.data[i + 3] = 255 // alpha
        } else {
          imageData.data[i] = 255 // red
          imageData.data[i + 1] = 255 // green
          imageData.data[i + 2] = 255 // blue
          imageData.data[i + 3] = 255 // alpha
        }
      }
      // 如果你修改了 imageData，你可以用 putImageData 方法将其回放到 canvas
      context.putImageData(imageData, 0, 0)
      return canvas
    }
  }

  const resetSize = async (originCanvas: any) => {
    return new Promise((resolve) => {
      const originUrl = originCanvas.toDataURL('image/png')
      const originImage = new Image()
      originImage.onload = () => {
        const newCanvas = document.createElement('canvas')
        const newContext = newCanvas.getContext('2d')
        if (newContext && image) {
          newCanvas.width = image.width
          newCanvas.height = image.height
          newContext.drawImage(
            originImage,
            0,
            0,
            newCanvas.width,
            newCanvas.height
          )
          resolve(newCanvas)
        }
      }
      originImage.src = originUrl
    })
  }

  const getMaskFile = async () => {
    const current = stageRef.current as HTMLCanvasElement | null
    if (current) {
      const maskCanvas = (await resetSize(resetColor(stageRef.current))) as HTMLCanvasElement
      const maskBlob = await canvasToBlob(maskCanvas)
      if (!maskBlob) return null
      const maskFile = new File([maskBlob], 'mask.png', {
        type: 'image/png',
      })
      return maskFile
    }
  }



  const handleMouseDown = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    if (tool == 'move') return
    isDrawing.current = true
    const pos = e.target.getStage()?.getPointerPosition()
    if (pos) {
      setLines([...lines, { tool, brush: brushSize, points: [pos.x, pos.y] }])
    }
  }

  const handleMouseMove = (
    e: Konva.KonvaEventObject<MouseEvent | TouchEvent>
  ) => {
    if (tool == 'move') return
    if (!isDrawing.current) {
      return
    }
    const pos = e.target.getStage()?.getPointerPosition()
    if (pos) {
      let newLines = [...lines]
      let line = newLines[newLines.length - 1]
      line.points = line.points.concat([pos.x, pos.y])
      line.brush = brushSize
      setLines(newLines)
      e.evt.preventDefault()
    }
  }

  const handleMouseUp = async () => {
    if (tool == 'move') return
    isDrawing.current = false
    setHistory([...history.slice(0, historyIndex + 1), lines])
    setHistoryIndex(historyIndex + 1)
    // action
    const maskFile = await getMaskFile()
    setPayload((preData: any) => { return { ...preData, mask: maskFile } });
  }

  const undo = () => {
    if (historyIndex === 0) return
    setLines(history[historyIndex - 1])
    setHistoryIndex(historyIndex - 1)
  }

  const redo = () => {
    if (historyIndex === history.length - 1) return
    setLines(history[historyIndex + 1])
    setHistoryIndex(historyIndex + 1)
  }

  const clear = () => {
    setLines([])
    setHistory([[]])
    setHistoryIndex(0)
    setTool('pen')
    setPayload((preData: any) => { return { ...preData, mask: null } });
  }

  const brush = (value: any) => {
    if (value) {
      setBrushSize(value[0])
    }
  }

  const onReset = () => {
    setSrc('')
  }

  const onGenerate = async () => {
    if (!src) return
    const mask = await getMaskFile()
    if (!mask) return
  }

  // init
  useEffect(() => {
    if (!src) return
    setSrc(src)
    const img = new Image()
    img.src = src
    img.onload = () => setImage(img)
  }, [])

  // reset
  useEffect(() => {
    clear()
  }, [src])

  return (
    <div className="image-mask w-full h-full relative">

      <div className="tools flex w-full justify-between absolute top-[100%]">
        <div className="flex w-full justify-start space-x-1 py-2">

          <div className='p-2  cursor-pointer bg-slate-200 font-bold rounded-full hover:text-white hover:bg-violet-500' onClick={clear}>
            <LiaUndoAltSolid className='size-lg font-bold' />
          </div>
        </div>
        <div className="flex items-center">
          <Slider className='w-40 p-2' value={[brushSize]} defaultValue={[10]} max={100} step={1} onValueChange={brush} />
        </div>
      </div>

      <ZoomBox move={false}>
        <div ref={maskRef} className="w-full relative" style={{ maxWidth: maxWidth }}>
          <img className="w-full h-auto " src={src} alt="Mask Background" />
          <div className='absolute top-0 left-0 w-full h-full'>
            <Stage
              width={maskRef.current?.offsetWidth}
              height={maskRef.current?.offsetHeight}
              // pc
              onMouseDown={handleMouseDown}
              onMousemove={handleMouseMove}
              onMouseup={handleMouseUp}
              // mobile
              onTouchStart={handleMouseDown}
              onTouchMove={handleMouseMove}
              onTouchEnd={handleMouseUp}
              ref={stageRef}
            >
              <Layer>
                {lines.map((line, i) => (
                  <Line
                    key={i}
                    points={line.points}
                    stroke={
                      line.tool === 'pen'
                        ? 'rgba(122,222,122,0.5)'
                        : 'white'
                    }
                    strokeWidth={line.brush}
                    tension={0.5}
                    lineCap="round"
                    globalCompositeOperation={
                      line.tool === 'pen'
                        ? 'source-over'
                        : 'destination-out'
                    }
                  />
                ))}
              </Layer>
            </Stage>
          </div>


        </div>
      </ZoomBox>

    </div>
  )
}

export default ImageMask;
