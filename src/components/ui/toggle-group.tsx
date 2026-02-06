/**
 * @fileoverview 切换按钮组组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了切换按钮组组件，用于在一组选项中单选或多选。
 *          该组件提供以下功能：
 *          - 支持单选或多选模式
 *          - 提供统一的样式和尺寸
 *          - 支持自定义样式变体
 *          - 与 Toggle 组件集成
 *
 *          组件特性：
 *          - 基于 Radix UI ToggleGroup 构建
 *          - 使用 Context API 传递样式配置
 *          - 支持键盘导航
 *          - 提供可访问性支持
 *
 *          导出组件：
 *          - ToggleGroup: 切换按钮组容器
 *          - ToggleGroupItem: 切换按钮组项
 *
 *          依赖关系：
 *          - 依赖 @radix-ui/react-toggle-group
 *          - 依赖 class-variance-authority
 *          - 依赖 @/lib/utils 的 cn 工具函数
 *          - 依赖 toggle 组件的 toggleVariants
 */
"use client"

import * as React from "react"
import * as ToggleGroupPrimitive from "@radix-ui/react-toggle-group"
import { type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { toggleVariants } from "@/components/ui/toggle"

/**
 * 切换按钮组上下文
 * 用于在切换按钮组中传递样式配置
 */
const ToggleGroupContext = React.createContext<
  VariantProps<typeof toggleVariants>
>({
  size: "default",
  variant: "default",
})

/**
 * 切换按钮组组件
 * 用于在一组选项中单选或多选
 * @param className - 可选的自定义类名
 * @param variant - 可选的样式变体
 * @param size - 可选的尺寸
 * @param children - 子组件
 * @param ref - 组件引用
 */
const ToggleGroup = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Root> &
    VariantProps<typeof toggleVariants>
>(({ className, variant, size, children, ...props }, ref) => (
  <ToggleGroupPrimitive.Root
    ref={ref}
    className={cn("flex items-center justify-center gap-1", className)}
    {...props}
  >
    <ToggleGroupContext.Provider value={{ variant, size }}>
      {children}
    </ToggleGroupContext.Provider>
  </ToggleGroupPrimitive.Root>
))

ToggleGroup.displayName = ToggleGroupPrimitive.Root.displayName

/**
 * 切换按钮组项组件
 * 切换按钮组中的单个选项
 * @param className - 可选的自定义类名
 * @param variant - 可选的样式变体（会覆盖父组件的设置）
 * @param size - 可选的尺寸（会覆盖父组件的设置）
 * @param children - 子组件
 * @param ref - 组件引用
 */
const ToggleGroupItem = React.forwardRef<
  React.ComponentRef<typeof ToggleGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof ToggleGroupPrimitive.Item> &
    VariantProps<typeof toggleVariants>
>(({ className, children, variant, size, ...props }, ref) => {
  const context = React.useContext(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      ref={ref}
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
})

ToggleGroupItem.displayName = ToggleGroupPrimitive.Item.displayName

export { ToggleGroup, ToggleGroupItem }
