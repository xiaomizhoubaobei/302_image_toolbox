/**
 * @fileoverview 可调节裁剪器背景组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了可调节裁剪器背景组件，用于图像编辑界面的裁剪功能。
 *          该组件提供以下功能：
 *          - 在裁剪器中渲染可调节的图像背景
 *          - 支持亮度、饱和度、色相、对比度调节
 *          - 与 react-advanced-cropper 裁剪器集成
 *          - 支持跨域图片加载
 *
 *          组件特性：
 *          - 使用 forwardRef 转发 canvas 引用
 *          - 实时应用图像滤镜效果
 *          - 响应裁剪器状态变化
 *          - 支持平滑过渡动画
 *
 *          依赖关系：
 *          - 依赖 react-advanced-cropper 获取裁剪器状态
 *          - 依赖 advanced-cropper 计算背景样式
 *          - 依赖 AdjustableImage 组件渲染可调节图像
 */
import React, { forwardRef } from "react";
import {
  CropperTransitions,
  CropperImage,
  CropperState
} from "react-advanced-cropper";
import { getBackgroundStyle } from "advanced-cropper";
import { AdjustableImage } from "./AdjustableImage";

/**
 * 裁剪器引用接口
 * 定义了从裁剪器获取状态的方法
 */
interface DesiredCropperRef {
  /** 获取当前裁剪器状态 */
  getState: () => CropperState;
  /** 获取裁剪器过渡动画状态 */
  getTransitions: () => CropperTransitions;
  /** 获取裁剪器中的图像信息 */
  getImage: () => CropperImage;
}

/**
 * 可调节裁剪器背景组件属性接口
 */
interface Props {
  /** 自定义类名，用于样式定制 */
  className?: string;
  /** 裁剪器引用对象 */
  cropper: DesiredCropperRef;
  /** 跨域设置，支持 CORS */
  crossOrigin?: "anonymous" | "use-credentials" | boolean;
  /** 亮度调节值，范围 -1 到 1 */
  brightness?: number;
  /** 饱和度调节值，范围 -1 到 1 */
  saturation?: number;
  /** 色相调节值，范围 -1 到 1 */
  hue?: number;
  /** 对比度调节值，范围 -1 到 1 */
  contrast?: number;
}

/**
 * 可调节裁剪器背景组件
 * 在裁剪器中渲染可调节的图像背景，支持各种滤镜效果
 * @param props - 组件属性对象
 * @param props.className - 可选的自定义类名
 * @param props.cropper - 裁剪器引用对象
 * @param props.crossOrigin - 可选的跨域设置
 * @param props.brightness - 可选的亮度调节值，默认 0
 * @param props.saturation - 可选的饱和度调节值，默认 0
 * @param props.hue - 可选的色相调节值，默认 0
 * @param props.contrast - 可选的对比度调节值，默认 0
 * @param ref - canvas 元素的转发引用
 * @returns 返回包含可调节图像背景的 AdjustableImage 组件
 */
const AdjustableCropperBackground = forwardRef<HTMLCanvasElement, Props>(
  (
    {
      className,
      cropper,
      crossOrigin,
      brightness = 0,
      saturation = 0,
      hue = 0,
      contrast = 0
    }: Props,
    ref
  ) => {
    const state = cropper.getState();
    const transitions = cropper.getTransitions();
    const image = cropper.getImage();

    const style =
      image && state ? getBackgroundStyle(image, state, transitions) : {};

    return (
      <AdjustableImage
        src={image?.src}
        crossOrigin={crossOrigin}
        brightness={brightness}
        saturation={saturation}
        hue={hue}
        contrast={contrast}
        ref={ref}
        className={className}
        style={style}
      />
    );
  }
);

AdjustableCropperBackground.displayName = 'AdjustableCropperBackground';

export default AdjustableCropperBackground
