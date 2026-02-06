/**
 * @fileoverview 标签组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了标签组件，用于为表单元素提供描述性标签。
 *          该组件提供以下功能：
 *          - 与表单元素关联
 *          - 支持禁用状态
 *          - 提供可访问性支持
 *          - 自动处理 peer 状态样式
 *
 *          组件特性：
 *          - 基于 Radix UI Label 构建
 *          - 使用 class-variance-authority 管理样式
 *          - 支持 HTML 标准属性
 *
 *          依赖关系：
 *          - 依赖 @radix-ui/react-label
 *          - 依赖 class-variance-authority
 *          - 依赖 @/lib/utils 的 cn 工具函数
 */
"use client"

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> &
    VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants(), className)}
    {...props}
  />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
