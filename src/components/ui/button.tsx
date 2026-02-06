/**
 * @fileoverview 按钮组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了按钮组件，提供多种样式和尺寸的按钮。
 *          该组件提供以下功能：
 *          - 支持多种样式变体（默认、破坏性、轮廓、次要、幽灵、链接）
 *          - 支持多种尺寸（默认、小、大、图标）
 *          - 支持作为子元素渲染
 *          - 提供焦点可见性和禁用状态
 *
 *          组件特性：
 *          - 使用 class-variance-authority 管理样式变体
 *          - 使用 Radix UI Slot 实现作为子元素渲染
 *          - 支持所有原生 button 属性
 *          - 提供可访问性支持
 *
 *          样式变体：
 *          - default: 默认样式
 *          - destructive: 破坏性样式（红色）
 *          - outline: 轮廓样式
 *          - secondary: 次要样式
 *          - ghost: 幽灵样式
 *          - link: 链接样式
 *
 *          依赖关系：
 *          - 依赖 @radix-ui/react-slot
 *          - 依赖 class-variance-authority
 *          - 依赖 @/lib/utils 的 cn 工具函数
 */
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
