/**
 * @fileoverview 对比度图标组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了对比度调节图标组件，用于图像编辑界面。
 *          该组件提供以下功能：
 *          - 渲染月亮形状的对比度图标
 *          - 支持通过 className 属性自定义样式
 *          - 使用 SVG 路径绘制图标，尺寸为 24x24
 *
 *          图标设计：
 *          - 圆形分为明暗两部分
 *          - 表示亮度和对比度的调节
 *          - 使用标准的 24x24 像素尺寸
 *
 *          依赖关系：
 *          - 依赖 React 的 FC 类型进行组件类型定义
 *          - 接收可选的 className 属性用于样式定制
 */
import React, { FC } from 'react';

/**
 * 对比度图标组件属性接口
 */
interface Props {
	/** 自定义类名，用于样式定制 */
	className?: string;
}

/**
 * 对比度图标组件
 * 渲染月亮形状的对比度图标，用于表示图像对比度调节操作
 * @param props - 组件属性对象
 * @param props.className - 可选的自定义类名
 * @returns 返回包含对比度图标的 SVG 元素
 */
export const ContrastIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlSpace="preserve">
			<path d="M12 4.4c-4.2 0-7.6 3.4-7.6 7.6s3.4 7.6 7.6 7.6 7.6-3.4 7.6-7.6-3.4-7.6-7.6-7.6zM5.9 12c0-3.3 2.7-6.1 6.1-6.1V18c-3.3.1-6.1-2.7-6.1-6z" />
		</svg>
	);
};
