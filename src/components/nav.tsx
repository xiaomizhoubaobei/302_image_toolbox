/**
 * @fileoverview 导航栏组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了导航栏组件，用于显示页面导航。
 *          该组件提供以下功能：
 *          - 显示固定导航栏
 *          - 支持路由导航
 *
 *          依赖关系：
 *          - 依赖 next/navigation 模块进行路由导航
 */
"use client";

import { useRouter } from "next/navigation";


export function Navbar() {
  const router = useRouter();

  return (
    <header className="w-full h-12 flex fixed bg-background/95 z-20 justify-between items-center px-2 py-1 shadow-sm md:shadow-none md:py-1">
      <div className="flex items-center gap-4 p-2">
      </div>
    </header>
  );
}