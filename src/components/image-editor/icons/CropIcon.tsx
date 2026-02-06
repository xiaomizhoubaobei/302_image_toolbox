/**
 * @fileoverview 裁剪图标组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了裁剪工具图标组件，用于图像编辑界面。
 *          该组件提供以下功能：
 *          - 渲染裁剪框架图标
 *          - 支持通过 className 属性自定义样式
 *          - 使用 SVG 路径绘制图标，尺寸为 24x24
 *
 *          图标设计：
 *          - 包含对角线裁剪框架
 *          - 四角带有锚点标记
 *          - 表示图像裁剪操作
 *          - 使用标准的 24x24 像素尺寸
 *
 *          依赖关系：
 *          - 依赖 React 的 FC 类型进行组件类型定义
 *          - 接收可选的 className 属性用于样式定制
 */
import React, { FC } from 'react';

/**
 * 裁剪图标组件属性接口
 */
interface Props {
	/** 自定义类名，用于样式定制 */
	className?: string;
}

/**
 * 裁剪图标组件
 * 渲染裁剪框架图标，用于表示图像裁剪操作
 * @param props - 组件属性对象
 * @param props.className - 可选的自定义类名
 * @returns 返回包含裁剪图标的 SVG 元素
 */
export const CropIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlSpace="preserve">
			<path d="M18.2 15.2h-1.5V7.3H8.8V5.8c0-.4-.3-.8-.8-.8s-.7.4-.7.8v1.5H5.8c-.4 0-.8.3-.8.8s.3.8.8.8h1.5v7.8h7.8v1.5c0 .4.3.8.8.8s.8-.3.8-.8v-1.5h1.5c.4 0 .8-.3.8-.8s-.4-.7-.8-.7zM8.8 8.8h6.3v6.3H8.8V8.8z" />
		</svg>
	);
};
