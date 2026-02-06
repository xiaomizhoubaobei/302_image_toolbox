/**
 * @fileoverview 滑块组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了滑块组件，用于选择范围内的数值。
 *          该组件提供以下功能：
 *          - 支持单值和多值滑块
 *          - 提供拖动交互
 *          - 支持触摸操作
 *          - 显示滑块轨道和滑块手柄
 *
 *          组件特性：
 *          - 基于 Radix UI Slider 构建
 *          - 使用 Tailwind CSS 进行样式定制
 *          - 支持禁用状态
 *          - 提供焦点可见性
 *
 *          依赖关系：
 *          - 依赖 @radix-ui/react-slider
 *          - 依赖 @/lib/utils 的 cn 工具函数
 */
"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"

import { cn } from "@/lib/utils"

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
      <SliderPrimitive.Range className="absolute h-full bg-primary" />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
  </SliderPrimitive.Root>
))
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
