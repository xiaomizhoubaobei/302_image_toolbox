/**
 * @fileoverview 工具卡片组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了工具卡片组件，用于显示工具信息。
 *          该组件提供以下功能：
 *          - 显示工具图标、标题和描述
 *          - 支持选中状态
 *
 *          依赖关系：
 *          - 依赖 @/components/ui/card 模块获取卡片组件
 *          - 依赖 @/components/my-icon 模块获取图标组件
 */
import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { ToolIcon } from './my-icon';

import { twMerge } from 'tailwind-merge';

interface PropsData {
  icon: string
  title: string
  desc: string
  active?: boolean
}

function ToolCard({ icon, title, desc, active }: PropsData) {

  return (
    <Card className={twMerge(
      'overflow-hidden',
      'cursor-pointer text-slate-600 hover:border-violet-500 hover:text-violet-500 h-full',
      active ? 'bg-violet-500 text-white hover:text-white' : ''
    )}>
      <CardHeader className='p-2'>
        <div className="w-full flex space-x-2 items-start">
          <div className='mt-1'>
            <ToolIcon icon={icon} />
          </div>
          <div className="flex-1">
            <CardTitle className='text-xs sm:text-sm font-medium'>{title}</CardTitle>
            <div className="text-xs opacity-50">{desc}</div>
          </div>
        </div>
      </CardHeader>
    </Card>
  )
}

export default ToolCard