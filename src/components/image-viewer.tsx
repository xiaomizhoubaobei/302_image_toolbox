/**
 * @fileoverview 图片查看器组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了图片查看器组件，用于全屏查看图片。
 *          该组件提供以下功能：
 *          - 显示全屏图片
 *          - 支持关闭操作
 *
 *          依赖关系：
 *          - 无外部依赖
 */
interface PropsData {
  src: string
  setSrc: (src: string) => void
}

export function ImageViewer({ src, setSrc }: PropsData) {
  void src
  return (
    <div
      className="fixed top-0 left-0 w-screen h-screen overflow-hidden bg-white/90 flex flex-col justify-center items-center"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="show">
        <img style={{ maxWidth: '100%', height: 'auto' }} src={src} alt="" />
      </div>
      <div className="action" onClick={() => setSrc('')}>close</div>
    </div>
  );
}