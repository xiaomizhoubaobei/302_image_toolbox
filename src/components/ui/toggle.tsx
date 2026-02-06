/**
 * @fileoverview 切换按钮组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了切换按钮组件，用于在两种状态之间切换。
 *          该组件提供以下功能：
 *          - 支持开/关两种状态
 *          - 提供多种样式变体
 *          - 支持多种尺寸
 *          - 支持禁用状态
 *
 *          组件特性：
 *          - 基于 Radix UI Toggle 构建
 *          - 使用 class-variance-authority 管理样式
 *          - 使用 Tailwind CSS 进行样式定制
 *          - 支持键盘导航
 *
 *          样式变体：
 *          - default: 默认样式
 *          - outline: 轮廓样式
 *
 *          尺寸选项：
 *          - default: 默认尺寸
 *          - sm: 小尺寸
 *          - lg: 大尺寸
 *
 *          依赖关系：
 *          - 依赖 @radix-ui/react-toggle
 *          - 依赖 class-variance-authority
 *          - 依赖 @/lib/utils 的 cn 工具函数
 */
"use client"

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * 切换按钮的样式变体定义
 * 使用 class-variance-authority (cva) 创建可组合的样式变体
 *
 * @returns {VariantProps<typeof toggleVariants> & { className?: string }} 返回样式类名函数，支持以下变体：
 *   - variant: 样式变体（default/outline）
 *   - size: 尺寸变体（default/sm/lg）
 *   - className: 自定义类名
 *
 * @example
 * // 使用默认样式
 * toggleVariants({ variant: "default", size: "default" })
 *
 * // 使用轮廓样式和大尺寸
 * toggleVariants({ variant: "outline", size: "lg" })
 */
const toggleVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-muted hover:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-accent data-[state=on]:text-accent-foreground",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline:
          "border border-input bg-transparent shadow-sm hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        default: "h-9 px-3",
        sm: "h-8 px-2",
        lg: "h-10 px-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * 切换按钮组件
 * 基于Radix UI Toggle构建的可切换状态按钮组件
 *
 * @component
 * @example
 * // 基本用法
 * <Toggle pressed={isPressed} onPressedChange={setIsPressed}>
 *   切换
 * </Toggle>
 *
 * @example
 * // 使用不同样式和尺寸
 * <Toggle variant="outline" size="lg">
 *   大尺寸轮廓按钮
 * </Toggle>
 *
 * @param {React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> & VariantProps<typeof toggleVariants>} props - 组件属性
 *   - className: 自定义类名
 *   - variant: 样式变体（default/outline）
 *   - size: 尺寸变体（default/sm/lg）
 *   - pressed: 是否处于按下状态
 *   - onPressedChange: 按下状态改变时的回调函数
 *   - disabled: 是否禁用
 * @param {React.Ref<React.ComponentRef<typeof TogglePrimitive.Root>>} ref - 转发引用
 * @returns {JSX.Element} 渲染切换按钮组件
 */
const Toggle = React.forwardRef<
  React.ComponentRef<typeof TogglePrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TogglePrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, ...props }, ref) => (
  <TogglePrimitive.Root
    ref={ref}
    className={cn(toggleVariants({ variant, size, className }))}
    {...props}
  />
))

Toggle.displayName = TogglePrimitive.Root.displayName

export { Toggle, toggleVariants }
