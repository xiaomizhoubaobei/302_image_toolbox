/**
 * @fileoverview 应用根布局组件
 * @author 祁筱欣
 * @date 2026-02-05
 * @since 2026-02-05
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了应用程序的根布局，定义了页面的整体结构和全局组件。
 *          该组件作为 Next.js 的根布局，负责以下任务：
 *          - 设置 HTML 文档的基本结构（html、body 标签）
 *          - 集成全局样式文件（globals.css）
 *          - 渲染全局导航栏（Navbar）
 *          - 渲染全局页脚（Footer）
 *          - 提供主内容区域的容器
 *          - 设置 HTML 语言属性和防警告属性
 *
 *          布局结构：
 *          - html: 根元素，设置语言为英语
 *          - body: 包含根布局容器
 *          - root-layout: 最小高度为屏幕高度，使用 flex 布局
 *          - layout-main: 主内容区域，占据剩余空间
 *
 *          依赖关系：
 *          - 依赖 @/components/nav 获取导航栏组件
 *          - 依赖 @/components/footer 获取页脚组件
 *          - 引入 ./globals.css 全局样式
 *          - 作为 Next.js App Router 的根布局文件
 */
import { Navbar } from "@/components/nav";
import { Footer } from "@/components/footer";
import "./globals.css";

/**
 * 应用根布局组件
 * 定义应用程序的整体页面结构，包含导航栏、主内容区域和页脚
 * @param children - 子组件内容
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <div id="root-layout" className="min-h-screen flex flex-col">
          <Navbar />
          <div id="layout-main" className="flex grow py-12">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
