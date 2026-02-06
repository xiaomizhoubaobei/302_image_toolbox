/**
 * @fileoverview 图像编辑器按钮组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了图像编辑器中的圆形按钮组件，用于工具栏操作。
 *          该组件提供以下功能：
 *          - 渲染圆形样式的按钮
 *          - 支持激活状态样式
 *          - 支持悬停和焦点状态
 *          - 响应式设计，在小屏幕上调整尺寸
 *
 *          组件特性：
 *          - 使用 Tailwind CSS 进行样式定制
 *          - 继承原生 button 元素的所有属性
 *          - 使用 classnames 工具进行类名合并
 *          - 支持自定义子元素内容
 *
 *          样式说明：
 *          - 默认尺寸：36px x 36px
 *          - 小屏幕尺寸：32px x 32px
 *          - 激活状态：显示主色调
 *          - 悬停状态：半透明背景
 *
 *          依赖关系：
 *          - 依赖 React 的 FC 类型
 *          - 导入 Button.scss 样式文件
 */
import React, { FC, ButtonHTMLAttributes } from 'react';
import cn from 'classnames';
import './Button.scss';

/**
 * 按钮组件属性接口
 * 继承原生 HTMLButtonElement 属性
 */
interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	/** 是否处于激活状态 */
	active?: boolean;
}

/**
 * 图像编辑器按钮组件
 * 渲染圆形样式的按钮，支持激活状态和交互效果
 * @param props - 组件属性对象
 * @param props.className - 可选的自定义类名
 * @param props.active - 可选的激活状态标志
 * @param props.children - 按钮子元素
 * @param props - 其他原生 button 元素属性
 * @returns 返回圆形样式的 button 元素
 */
export const Button: FC<Props> = ({ className, active, children, ...props }) => {
	return (
		<button className={cn('image-editor-button', active && 'image-editor-button--active !text-primary', className)} {...props}>
			{children}
		</button>
	);
};
