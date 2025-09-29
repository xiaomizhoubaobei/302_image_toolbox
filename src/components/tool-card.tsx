import React from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
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