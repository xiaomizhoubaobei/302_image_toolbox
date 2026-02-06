/**
 * @fileoverview 页脚组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了页脚组件，用于显示页面底部信息。
 *          该组件提供以下功能：
 *          - 显示网站链接
 *          - 显示版权信息
 *          - 支持国际化
 *
 *          依赖关系：
 *          - 依赖 @/stores 获取全局状态
 *          - 依赖 @/locales 获取国际化文本
 */
"use client";

import React from "react";
import Image from "next/image";
import { useStore } from "@/stores";
import Locale from "@/locales"

export function Footer() {
  const [isClient, setIsClient] = React.useState(false)
  const { domain } = useStore();

  React.useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) return null

  return (
    <footer className="w-full flex fixed bottom-0 right-0 p-1 z-20 bg-background/95">
      <div className="flex flex-col items-center justify-center p-0 w-full">
        <div className="flex z-50">
          <a href={domain} target="_blank" className="flex p-1 space-x-2" style={{ textDecoration: "none" }}>
            <div className="title text-xs text-[#666]">
              Powered By
            </div>
            <div className="banner flex items-center">
              <Image width={50} height={14} src="/favicon.webp" alt="302.AI" />
            </div>
          </a>
        </div>
        <div className="flex justify-center text-center text-xs text-gray-400 ">
          {Locale.Footer.Title}
        </div>
      </div>
    </footer>
  );
}