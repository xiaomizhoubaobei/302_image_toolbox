/**
 * @fileoverview 提示词栏组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了提示词栏组件，用于输入提示词。
 *          该组件提供以下功能：
 *          - 显示输入框
 *          - 支持自定义占位符
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/input 模块获取输入框组件
 *          - 依赖 @/locales 获取国际化文本
 */
import React from 'react'
import { Input } from "@/components/ui/input"
import Locale from "@/locales";

interface PromptBarProps {
  payload: any
  setPayload: (data: any) => void
  placeHolder?: string
}

function PromptBar({ payload, setPayload, placeHolder }: PromptBarProps) {

  const handleInputChange = ({ target }: any) => {
    setPayload((preData: any) => { return { ...preData, prompt: target.value } });
  }

  return (
    <div className='w-full flex justify-center px-1 md:px-0'>
      <Input
        value={payload.prompt}
        type="text"
        placeholder={placeHolder ? placeHolder : Locale.System.PromptPlaceholder}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default PromptBar