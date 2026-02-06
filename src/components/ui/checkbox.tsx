/**
 * @fileoverview 复选框组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了复选框组件，用于多选操作。
 *          该组件提供以下功能：
 *          - 支持选中/未选中两种状态
 *          - 显示选中指示图标
 *          - 支持禁用状态
 *          - 提供焦点可见性
 *
 *          组件特性：
 *          - 基于 Radix UI Checkbox 构建
 *          - 使用 CheckIcon 显示选中状态
 *          - 使用 Tailwind CSS 进行样式定制
 *          - 支持键盘导航
 *
 *          依赖关系：
 *          - 依赖 @radix-ui/react-checkbox
 *          - 依赖 @radix-ui/react-icons 的 CheckIcon
 *          - 依赖 @/lib/utils 的 cn 工具函数
 */
"use client"

import * as React from "react"
import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import { CheckIcon } from "@radix-ui/react-icons"

import { cn } from "@/lib/utils"

const Checkbox = React.forwardRef<
  React.ComponentRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>(({ className, ...props }, ref) => (
  <CheckboxPrimitive.Root
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator
      className={cn("flex items-center justify-center text-current")}
    >
      <CheckIcon className="h-4 w-4" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
))
Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
