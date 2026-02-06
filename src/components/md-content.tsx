/**
 * @fileoverview Markdown 内容组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了 Markdown 内容组件，用于渲染 Markdown 内容。
 *          该组件提供以下功能：
 *          - 显示 Markdown 内容
 *          - 支持滚动
 *
 *          依赖关系：
 *          - 依赖 react-markdown 模块进行 Markdown 渲染
 */
import React from 'react'
import Markdown from 'react-markdown'


interface PropsData {
  content: any
}

function MdContent({ content }: PropsData) {

  return (
    <div className='w-full overflow-scroll '>
      <Markdown>{content}</Markdown>
    </div>
  )
}

export default MdContent