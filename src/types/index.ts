/**
 * @fileoverview TypeScript 类型定义文件
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供全局 TypeScript 类型定义，包括状态、工具、操作、历史记录等类型
 */

export type Status = 'Wait' | 'Ready' | 'Pending' | 'Done' | 'Finish' | 'Error'

export interface Tool {
  id: number
  name: string
  icon: string
  title: string
  desc: string
}

export interface Action {
  type: string
  payload: any
}

export interface History {
  id: number
  tool: Tool
  src: string
  action: any
  base64: string
  result: string
  video: string
  text: string
}