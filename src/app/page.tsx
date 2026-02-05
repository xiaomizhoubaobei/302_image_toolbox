/**
 * @fileoverview 应用主页面组件
 * @author 祁筱欣
 * @date 2026-02-05
 * @since 2026-02-05
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了应用程序的主页面，负责路由控制和页面状态管理。
 *          该组件作为客户端组件运行，负责以下任务：
 *          - 管理用户认证状态（API 令牌）
 *          - 控制着陆页和编辑页的切换
 *          - 管理当前选中的工具
 *          - 管理上传的文件状态
 *          - 设置页面标题
 *          - 根据文件状态显示不同的页面组件
 *
 *          页面状态：
 *          - 未认证：显示认证对话框
 *          - 无文件：显示着陆页（PhotoshowLand）
 *          - 有文件：显示编辑页（PhotoshowEdit）
 *
 *          依赖关系：
 *          - 依赖 ./_component/land 获取着陆页组件
 *          - 依赖 ./_component/edit 获取编辑页组件
 *          - 依赖 ./_component/auth 获取认证组件
 *          - 依赖 @/stores 获取状态管理
 *          - 依赖 @/types 获取类型定义
 *          - 依赖 @/locales 获取国际化文本
 */
'use client'
import React from "react"
import PhotoshowLand from "./_component/land"
import PhotoshowEdit from "./_component/edit"
import PageAuth from "./_component/auth"
import { useStore } from "@/stores";
import { Tool } from "@/types"
import Locale from '@/locales'
const tools = Locale.Photo.Tool.list

/**
 * 应用主页面组件
 * 管理页面状态、认证流程和页面切换
 */
export default function PhotoshowPage() {
  const { token } = useStore();
  const [tool, setTool] = React.useState<Tool>(tools[0])
  const [file, setFile] = React.useState<File | null>(null)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (window) {
      document.title = Locale.Title;
    }
  }, []);

  return (
    <div id="photoshow-page" className="w-full p-4">
      {!token && (<PageAuth open={open} setOpen={setOpen} />)}
      {file
        ? <PhotoshowEdit tool={tool} setTool={setTool} file={file} setFile={setFile} />
        : <PhotoshowLand tool={tool} setTool={setTool} file={file} setFile={setFile} />
      }
    </div>
  )
}