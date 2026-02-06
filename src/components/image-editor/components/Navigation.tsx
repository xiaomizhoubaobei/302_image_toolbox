/**
 * @fileoverview 图像编辑器导航栏组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了图像编辑器的导航栏组件，用于切换编辑模式。
 *          该组件提供以下功能：
 *          - 提供图像滤镜调节按钮（饱和度、亮度、对比度、色调）
 *          - 支持重置所有编辑效果
 *          - 支持图片上传和下载功能
 *          - 支持裁剪功能
 *          - 响应式布局设计
 *
 *          编辑模式：
 *          - saturation: 饱和度调节模式
 *          - brightness: 亮度调节模式
 *          - contrast: 对比度调节模式
 *          - hue: 色调调节模式
 *          - crop: 裁剪模式
 *
 *          组件特性：
 *          - 使用图标按钮提供直观的操作界面
 *          - 当前激活模式高亮显示
 *          - 使用 file input 实现图片上传
 *          - 使用 URL.createObjectURL 处理上传的文件
 *
 *          依赖关系：
 *          - 依赖自定义图标组件（CropIcon、HueIcon 等）
 *          - 依赖 Button 组件作为按钮容器
 *          - 导入 Navigation.scss 样式文件
 */
import React, { ChangeEvent, FC, useRef } from "react";
import cn from "classnames";
import { CropIcon } from "../icons/CropIcon";
import { HueIcon } from "../icons/HueIcon";
import { SaturationIcon } from "../icons/SaturationIcon";
import { ContrastIcon } from "../icons/ContrastIcon";
import { BrightnessIcon } from "../icons/BrightnessIcon";
import { UploadIcon } from "../icons/UploadIcon";
import { DownloadIcon } from "../icons/DownloadIcon";
import { ResetIcon } from "../icons/ResetIcon";
import { Button } from "./Button";
import "./Navigation.scss";

/**
 * 导航栏组件属性接口
 */
interface Props {
  /** 自定义类名，用于样式定制 */
  className?: string;
  /** 当前编辑模式 */
  mode?: string;
  /** 模式切换回调函数 */
  onChange?: (mode: string) => void;
  /** 下载回调函数 */
  onDownload?: () => void;
  /** 上传回调函数，接收图片 blob URL */
  onUpload?: (blob: string) => void;
  /** 重置回调函数 */
  onReset?: () => void;
}

/**
 * 图像编辑器导航栏组件
 * 提供图像编辑工具栏，包含各种编辑模式和操作按钮
 * @param props - 组件属性对象
 * @param props.className - 可选的自定义类名
 * @param props.mode - 可选的当前编辑模式
 * @param props.onChange - 可选的模式切换回调函数
 * @param props.onUpload - 可选的上传回调函数
 * @param props.onDownload - 可选的下载回调函数
 * @param props.onReset - 可选的重置回调函数
 * @returns 返回导航栏 UI
 */
export const Navigation: FC<Props> = ({
  className,
  onChange,
  onUpload,
  onDownload,
  onReset,
  mode
}) => {
  /**
   * 设置编辑模式
   * @param mode - 要切换到的编辑模式
   * @returns 返回事件处理函数
   */
  const setMode = (mode: string) => () => {
    onChange?.(mode);
  };

  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * 触发上传按钮点击
   * 通过编程方式触发隐藏的文件选择输入框
   */
  const onUploadButtonClick = () => {
    inputRef.current?.click();
  };

  /**
   * 加载上传的图像
   * @param event - 文件选择事件
   */
  const onLoadImage = (event: ChangeEvent<HTMLInputElement>) => {
    // 对 DOM 输入元素的引用
    const { files } = event.target;

    // 在尝试读取之前确保有文件
    if (files && files[0]) {
      if (onUpload) {
        onUpload(URL.createObjectURL(files[0]));
      }
    }
    // 清除事件目标值，以便可以上传同一张图片
    event.target.value = "";
  };

  return (
    <div className={cn("image-editor-navigation flex justify-center", className)}>
      <Button
        className={"image-editor-navigation__button"}
        onClick={onUploadButtonClick}
      >
        <UploadIcon />
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={onLoadImage}
          className="image-editor-navigation__upload-input"
        />
      </Button>
      <div className="image-editor-navigation__buttons !text-white">
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "crop"}
          onClick={setMode("crop")}
        >
          <CropIcon />
        </Button>
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "saturation"}
          onClick={setMode("saturation")}
          title="鲜艳度"
        >
          <SaturationIcon />
        </Button>
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "brightness"}
          onClick={setMode("brightness")}
          title="亮度"
        >
          <BrightnessIcon />
        </Button>
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "contrast"}
          onClick={setMode("contrast")}
          title="对比度"
        >
          <ContrastIcon />
        </Button>
        <Button
          className={"image-editor-navigation__button"}
          active={mode === "hue"}
          onClick={setMode("hue")}
          title="色调"
        >
          <HueIcon />
        </Button>
      </div>
      <Button
        className={"image-editor-navigation__button"}
        onClick={onDownload}
      >
        <DownloadIcon />
      </Button>
      <Button
        className={"image-editor-navigation__button"}
        onClick={onReset}
        title="重置"
      >
        <ResetIcon />
      </Button>
    </div>
  );
};
