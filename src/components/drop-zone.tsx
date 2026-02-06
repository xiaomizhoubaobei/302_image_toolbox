/**
 * @fileoverview 拖放区域组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了拖放区域组件，用于处理文件拖放操作。
 *          该组件提供以下功能：
 *          - 监听文件拖放事件
 *          - 处理文件放置
 *          - 提供拖放状态回调
 *
 *          依赖关系：
 *          - 依赖 React hooks 进行状态管理
 */
"use client"

import { useEffect } from 'react'

interface Props {
  children: React.ReactNode
  onDrop: (files: FileList) => void
  onDrag?: (dragging: boolean) => void
}

export default function DropZone({ children, onDrop, onDrag }: Props) {
  useEffect(() => {
    function handleDrop(e: DragEvent) {
      e.preventDefault()
      if (e.dataTransfer) onDrop(e.dataTransfer.files)
      onDrag?.(false)
    }

    function handleDragover(e: DragEvent) {
      e.preventDefault()
      onDrag?.(true)
    }

    function handleDragleave(e: DragEvent) {
      e.preventDefault()
      onDrag?.(false)
    }

    window.addEventListener('drop', handleDrop)
    window.addEventListener('dragover', handleDragover)
    window.addEventListener('dragleave', handleDragleave)
    return () => {
      window.removeEventListener('drop', handleDrop)
      window.removeEventListener('dragover', handleDragover)
      window.removeEventListener('dragleave', handleDragleave)
    }
  }, [onDrop, onDrag])
  return <>{children}</>
}