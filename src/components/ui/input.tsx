/**
 * @fileoverview 输入框组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了输入框组件，用于接收用户输入。
 *          该组件提供以下功能：
 *          - 支持所有原生 input 属性
 *          - 提供焦点可见性样式
 *          - 支持禁用状态
 *          - 支持文件输入样式
 *
 *          组件特性：
 *          - 使用 Tailwind CSS 进行样式定制
 *          - 支持占位符文本样式
 *          - 提供可访问性支持
 *
 *          依赖关系：
 *          - 依赖 @/lib/utils 的 cn 工具函数
 */
import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
