/**
 * @fileoverview 色相图标组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了色相调节图标组件，用于图像编辑界面。
 *          该组件提供以下功能：
 *          - 渲染圆形色相环图标
 *          - 支持通过 className 属性自定义样式
 *          - 使用 SVG 路径绘制图标，尺寸为 24x24
 *
 *          图标设计：
 *          - 圆形环状结构表示色相环
 *          - 中心圆点表示色相选择
 *          - 表示图像色相/颜色调节
 *          - 使用标准的 24x24 像素尺寸
 *
 *          依赖关系：
 *          - 依赖 React 的 FC 类型进行组件类型定义
 *          - 接收可选的 className 属性用于样式定制
 */
import React, { FC } from 'react';

/**
 * 色相图标组件属性接口
 */
interface Props {
	/** 自定义类名，用于样式定制 */
	className?: string;
}

/**
 * 色相图标组件
 * 渲染圆形色相环图标，用于表示图像色相/颜色调节操作
 * @param props - 组件属性对象
 * @param props.className - 可选的自定义类名
 * @returns 返回包含色相图标的 SVG 元素
 */
export const HueIcon: FC<Props> = ({ className }) => {
	return (
		<svg className={className} xmlns="http://www.w3.org/2000/svg" width="24" height="24" xmlSpace="preserve">
			<path d="M12 19.6c-4.2 0-7.6-3.4-7.6-7.6S7.8 4.4 12 4.4s7.6 3.4 7.6 7.6-3.4 7.6-7.6 7.6zm0-13.7c-3.3 0-6.1 2.7-6.1 6.1s2.7 6.1 6.1 6.1 6.1-2.7 6.1-6.1-2.8-6.1-6.1-6.1z" />
			<path d="M12 15.3c-1.8 0-3.3-1.5-3.3-3.3 0-1.8 1.5-3.3 3.3-3.3 1.8 0 3.3 1.5 3.3 3.3 0 1.8-1.5 3.3-3.3 3.3zm0-5.1c-1 0-1.8.8-1.8 1.8s.8 1.8 1.8 1.8 1.8-.8 1.8-1.8-.8-1.8-1.8-1.8z" />
		</svg>
	);
};
