/**
 * @fileoverview 工具函数模块
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供通用工具函数，主要包括 Tailwind CSS 类名合并功能
 */

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * 合并 Tailwind CSS 类名
 * 使用 clsx 和 tailwind-merge 组合来智能合并类名，避免冲突
 * @param inputs - 类名数组，可以是字符串、对象或数组
 * @returns 合并后的类名字符串
 * @example
 * cn('px-2', 'py-1', { 'bg-red-500': true })
 * cn('px-2', 'px-4') // 返回 'px-4'（后面的会覆盖前面的）
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
