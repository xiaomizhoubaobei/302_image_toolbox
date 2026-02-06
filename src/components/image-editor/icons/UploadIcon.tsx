/**
 * @fileoverview 上传图标组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了上传操作图标组件，用于图像编辑界面。
 *          该组件提供以下功能：
 *          - 渲染向上箭头的上传图标
 *          - 支持通过 className 属性自定义样式
 *          - 使用 SVG 路径绘制图标，尺寸为 24x24
 *
 *          图标设计：
 *          - 包含向上箭头表示上传方向
 *          - 底部有托盘形状表示发送位置
 *          - 表示文件或图片上传操作
 *          - 使用标准的 24x24 像素尺寸
 *
 *          依赖关系：
 *          - 依赖 React 的 FC 类型进行组件类型定义
 *          - 接收可选的 className 属性用于样式定制
 */
import React, { FC } from 'react';

/**
 * 上传图标组件属性接口
 */
interface Props {
	/** 自定义类名，用于样式定制 */
	className?: string;
}

/**
 * 上传图标组件
 * 渲染向上箭头的上传图标，用于表示文件或图片上传操作
 * @param props - 组件属性对象
 * @param props.className - 可选的自定义类名
 * @returns 返回包含上传图标的 SVG 元素
 */
export const UploadIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlSpace="preserve">
			<path d="M17.2 12.1c-.4 0-.8.3-.8.8v2.8c0 .6-.4 1-1 1H8.6c-.6 0-1-.4-1-1v-2.8c0-.4-.3-.8-.8-.8s-.8.3-.8.8v2.8c0 1.4 1.1 2.5 2.5 2.5h6.8c1.4 0 2.5-1.1 2.5-2.5v-2.8c.1-.5-.2-.8-.6-.8z" />
			<path d="m10.1 9.4 1.1-1.1V14c0 .4.3.8.8.8s.8-.3.8-.8V8.4l1.1 1c.1.1.3.2.5.2s.4-.1.5-.2c.3-.3.3-.8 0-1.1L12.5 6c-.3-.3-.8-.3-1 0L9.1 8.3c-.3.3-.3.8 0 1.1.3.3.7.3 1 0z" />
		</svg>
	);
};
