/**
 * @fileoverview 重置图标组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了重置操作图标组件，用于图像编辑界面。
 *          该组件提供以下功能：
 *          - 渲染循环箭头的重置图标
 *          - 支持通过 className 属性自定义样式
 *          - 使用 SVG 路径绘制图标，尺寸为 24x24
 *
 *          图标设计：
 *          - 逆时针循环箭头表示恢复操作
 *          - 表示撤销或重置到初始状态
 *          - 用于清除所有图像编辑效果
 *          - 使用标准的 24x24 像素尺寸
 *
 *          依赖关系：
 *          - 依赖 React 的 FC 类型进行组件类型定义
 *          - 接收可选的 className 属性用于样式定制
 */
import React, { FC } from 'react';

/**
 * 重置图标组件属性接口
 */
interface Props {
	/** 自定义类名，用于样式定制 */
	className?: string;
}

/**
 * 重置图标组件
 * 渲染循环箭头的重置图标，用于表示撤销或重置到初始状态的操作
 * @param props - 组件属性对象
 * @param props.className - 可选的自定义类名
 * @returns 返回包含重置图标的 SVG 元素
 */
export const ResetIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlSpace="preserve">
			<path d="M21.2 9c-.3-.2-.8-.1-1 .2l-.8 1.3c-.7-3.4-3.8-6-7.4-6-4.2 0-7.6 3.4-7.6 7.6s3.4 7.6 7.6 7.6c2.3 0 4.5-1.1 6-2.9.3-.3.2-.8-.1-1.1-.3-.3-.8-.2-1.1.1-1.2 1.5-2.9 2.3-4.8 2.3-3.3 0-6.1-2.7-6.1-6.1S8.7 5.9 12 5.9c2.9 0 5.4 2.1 5.9 4.9l-1.3-.8c-.4-.2-.8-.1-1 .3-.2.4-.1.8.3 1l2.9 1.6c.1.1.2.1.4.1.3 0 .5-.1.6-.4l1.7-2.8c.2-.1.1-.6-.3-.8z" />
		</svg>
	);
};
