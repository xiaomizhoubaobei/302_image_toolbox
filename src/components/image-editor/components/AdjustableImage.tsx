/**
 * @fileoverview 可调节图像组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了可调节图像组件，用于实时应用图像滤镜效果。
 *          该组件提供以下功能：
 *          - 在 canvas 上渲染图像并应用滤镜
 *          - 支持亮度、饱和度、色相、对比度调节
 *          - 实时响应滤镜参数变化
 *          - 支持跨域图片加载
 *
 *          组件特性：
 *          - 使用 canvas 2D API 绘制图像
 *          - 通过 CSS filter 属性应用滤镜效果
 *          - 使用 useLayoutEffect 确保同步更新
 *          - 隐藏原始图片元素，仅显示 canvas
 *
 *          滤镜参数：
 *          - brightness: 100% ± 100%（基于参数 -1 到 1）
 *          - contrast: 100% ± 100%（基于参数 -1 到 1）
 *          - saturate: 100% ± 100%（基于参数 -1 到 1）
 *          - hue-rotate: 0° ± 360°（基于参数 -1 到 1）
 *
 *          依赖关系：
 *          - 依赖 react-advanced-cropper 的 mergeRefs 工具
 *          - 使用 useLayoutEffect hook 进行布局同步
 *          - 导入 AdjustableImage.scss 样式文件
 */
import React, { forwardRef, useRef, CSSProperties, useLayoutEffect } from 'react';
import cn from 'classnames';
import { mergeRefs } from 'react-advanced-cropper';
import './AdjustableImage.scss';

/**
 * 可调节图像组件属性接口
 */
interface Props {
	/** 图像源 URL */
	src?: string;
	/** 自定义类名，用于样式定制 */
	className?: string;
	/** 跨域设置，支持 CORS */
	crossOrigin?: 'anonymous' | 'use-credentials' | boolean;
	/** 亮度调节值，范围 -1 到 1 */
	brightness?: number;
	/** 饱和度调节值，范围 -1 到 1 */
	saturation?: number;
	/** 色相调节值，范围 -1 到 1 */
	hue?: number;
	/** 对比度调节值，范围 -1 到 1 */
	contrast?: number;
	/** 自定义 CSS 样式 */
	style?: CSSProperties;
}

/**
 * 可调节图像组件
 * 在 canvas 上渲染图像并应用滤镜效果，支持实时调节
 * @param props - 组件属性对象
 * @param props.src - 可选的图像源 URL
 * @param props.className - 可选的自定义类名
 * @param props.crossOrigin - 可选的跨域设置
 * @param props.brightness - 可选的亮度调节值，默认 0
 * @param props.saturation - 可选的饱和度调节值，默认 0
 * @param props.hue - 可选的色相调节值，默认 0
 * @param props.contrast - 可选的对比度调节值，默认 0
 * @param props.style - 可选的自定义 CSS 样式
 * @param ref - canvas 元素的转发引用
 * @returns 返回包含 canvas 和隐藏图片元素的片段
 */
export const AdjustableImage = forwardRef<HTMLCanvasElement, Props>(
	({ src, className, crossOrigin, brightness = 0, saturation = 0, hue = 0, contrast = 0, style }: Props, ref) => {
		const imageRef = useRef<HTMLImageElement>(null);
		const canvasRef = useRef<HTMLCanvasElement>(null);

		/**
		 * 绘制图像到 canvas
		 * 应用当前的滤镜效果并将图像绘制到 canvas 上
		 */
		const drawImage = () => {
			const image = imageRef.current;
			const canvas = canvasRef.current;
			if (canvas && image && image.complete) {
				const ctx = canvas.getContext('2d');
				canvas.width = image.naturalWidth;
				canvas.height = image.naturalHeight;

				if (ctx) {
					ctx.filter = [
						`brightness(${100 + brightness * 100}%)`,
						`contrast(${100 + contrast * 100}%)`,
						`saturate(${100 + saturation * 100}%)`,
						`hue-rotate(${hue * 360}deg)`,
					].join(' ');

					ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
				}
			}
		};

		useLayoutEffect(() => {
			drawImage();
		}, [src, brightness, saturation, hue, contrast]);

		return (
			<>
				<canvas
					key={`${src}-canvas`}
					ref={mergeRefs([ref, canvasRef])}
					className={cn('adjustable-image-element', className)}
					style={style}
				/>
				{src ? (
					<img
						key={`${src}-img`}
						ref={imageRef}
						className={'adjustable-image-source'}
						src={src}
						crossOrigin={crossOrigin === true ? 'anonymous' : crossOrigin || undefined}
						onLoad={drawImage}
						alt=""
					/>
				) : null}
			</>
		);
	},
);

AdjustableImage.displayName = 'AdjustableImage';
