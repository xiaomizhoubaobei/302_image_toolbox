/**
 * @fileoverview 图像编辑器主组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了图像编辑器主组件，提供完整的图像编辑功能。
 *          该组件提供以下功能：
 *          - 图像裁剪功能
 *          - 图像滤镜调节（亮度、饱和度、色相、对比度）
 *          - 图像上传和下载
 *          - 实时预览编辑效果
 *          - 重置所有编辑效果
 *
 *          组件特性：
 *          - 使用 react-advanced-cropper 实现裁剪功能
 *          - 支持多种编辑模式切换
 *          - 实时应用滤镜效果
 *          - 响应式设计
 *          - 支持触摸和鼠标交互
 *
 *          编辑模式：
 *          - crop: 裁剪模式
 *          - saturation: 饱和度调节模式
 *          - brightness: 亮度调节模式
 *          - contrast: 对比度调节模式
 *          - hue: 色调调节模式
 *
 *          依赖关系：
 *          - 依赖 react-advanced-cropper 裁剪库
 *          - 依赖 AdjustableCropperBackground 组件
 *          - 依赖 AdjustablePreviewBackground 组件
 *          - 依赖 Navigation 导航栏组件
 *          - 依赖 Slider 滑块组件
 *          - 依赖 context-filter-polyfill（Safari 浏览器兼容）
 */
import React, { useState, useRef, useEffect } from "react";
import cn from "classnames";
import {
  Cropper,
  CropperRef
} from "react-advanced-cropper";
import { Navigation } from "./components/Navigation";
import { Slider } from "./components/Slider";
import AdjustableCropperBackground from "./components/AdjustableCropperBackground";
import "react-advanced-cropper/dist/style.css";
import "./styles.scss";

/**
 * 图像编辑器组件属性接口
 */
interface PropsData {
  /** 图像源 URL */
  src: string
  /** 设置图像源回调函数 */
  setSrc: (src: string) => void
  /** 设置编辑结果数据回调函数 */
  setPayload: (data: any) => void
}

/**
 * 图像调整参数类型定义
 */
type Adjustments = {
  [key: string]: number;
  /** 亮度调节值，范围 -1 到 1 */
  brightness: number;
  /** 色相调节值，范围 -1 到 1 */
  hue: number;
  /** 饱和度调节值，范围 -1 到 1 */
  saturation: number;
  /** 对比度调节值，范围 -1 到 1 */
  contrast: number;
};

// The polyfill for Safari browser. The dynamic require is needed to work with SSR
if (typeof window !== 'undefined') {
  require('context-filter-polyfill');
}

/**
 * 图像编辑器主组件
 * 提供完整的图像编辑功能，包括裁剪和滤镜调节
 * @param props - 组件属性对象
 * @param props.src - 图像源 URL
 * @param props.setSrc - 设置图像源回调函数
 * @param props.setPayload - 设置编辑结果数据回调函数
 * @returns 返回图像编辑器 UI
 */
export const ImageEditor: React.FC<PropsData> = ({ src, setSrc, setPayload }) => {
  /** 裁剪器引用 */
  const cropperRef = useRef<CropperRef>(null);
  /** 图像对象状态 */
  const [image, setImage] = React.useState<any>(null)
  /** 当前编辑模式 */
  const [mode, setMode] = useState("saturation");
  /** 图像尺寸状态 */
  const [size, setSize] = useState({ width: 100, height: 100 })
  /** 图像调整参数状态 */
  const [adjustments, setAdjustments] = useState<Adjustments>({
    brightness: 0,
    hue: 0,
    saturation: 0,
    contrast: 0
  });

  /**
   * 处理滑块值变化
   * 根据当前模式更新对应的调整参数
   * @param value - 滑块的新值，范围 -1 到 1
   */
  const onChangeValue = (value: number) => {
    if (mode in adjustments) {
      setAdjustments((previousValue) => ({
        ...previousValue,
        [mode]: value
      }));
    }
  };

  /**
   * 重置所有编辑效果
   * 将模式重置为饱和度调节，所有调整参数重置为 0
   */
  const onReset = () => {
    setMode("saturation")
    setAdjustments({
      brightness: 0,
      hue: 0,
      saturation: 0,
      contrast: 0
    });
  };

  /**
   * 处理图像上传
   * 重置当前编辑，切换到裁剪模式，并设置新的图像源
   * @param blob - 上传的图像 blob URL
   */
  const onUpload = (blob: string) => {
    onReset();
    setMode("crop");
    setSrc(blob);
  };

  /**
   * 处理图像下载
   * 在新标签页中打开裁剪后的图像
   */
  const onDownload = () => {
    if (cropperRef.current) {
      const newTab = window.open();
      if (newTab) {
        newTab.document.body.innerHTML = `<img src="${cropperRef.current
          .getCanvas()
          ?.toDataURL()}" alt="编辑后的图像"/>`;
      }
    }
  };

  /**
   * 判断裁剪器是否启用
   */
  const cropperEnabled = mode === "crop";

  /**
   * 处理操作完成
   * 将裁剪器的 canvas 保存到 payload 中
   */
  const handleActionDone = () => {
    if (cropperRef.current) {
      setPayload((preData: any) => { return { ...preData, canvas: cropperRef.current!.getCanvas() } });
    }
  }

  /**
   * 图像源变化时的副作用
   * 加载新图像并更新图像尺寸
   */
  useEffect(() => {
    onReset()
    const img = new Image()
    img.src = src
    img.onload = () => {
      setTimeout(() => {
        setImage(img)
      }, 200)
      setSize({ width: img.width, height: img.height })
    }
    img.onerror = () => {
      console.log('Load image error')
    }
  }, [src])


  // 图像未加载完成时显示原图
  if (!image) return <img src={src} className='w-full h-auto' alt="加载中..."></img>


  return (
    <div
      className=" w-full relative !bg-red"
      onMouseUp={() => handleActionDone()}
      onTouchEnd={() => handleActionDone()}
    >

      <Cropper
        className=""
        style={{ background: 'none', border: 'none' }}
        src={src}
        ref={cropperRef}
        stencilProps={{
          movable: cropperEnabled,
          resizable: cropperEnabled,
          lines: cropperEnabled,
          handlers: cropperEnabled,
          overlayClassName: cn(
            "image-editor__cropper-overlay",
            !cropperEnabled && "image-editor__cropper-overlay--faded"
          )
        }}
        backgroundWrapperProps={{
          scaleImage: cropperEnabled,
          moveImage: cropperEnabled
        }}
        backgroundComponent={AdjustableCropperBackground}
        backgroundProps={adjustments}
        // onUpdate={onUpdate}
        defaultCoordinates={{
          top: 0,
          left: 0,
          width: size.width,
          height: size.height,
        }}
      />

      <div className="action absolute left-0 bottom-0 w-full bg-black/80 p-4 pb-2">
        {mode && (
          <div className="w-full flex justify-center">
            <Slider
              value={adjustments[mode]}
              onChange={onChangeValue}
            />
          </div>
        )}

        <Navigation
          className="w-full"
          mode={mode}
          onChange={setMode}
          onUpload={onUpload}
          onDownload={onDownload}
          onReset={onReset}
        />
      </div>



    </div>
  );
};

