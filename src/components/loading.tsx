/**
 * @fileoverview 加载组件
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块实现了加载组件，用于显示加载动画。
 *          该组件提供以下功能：
 *          - 显示加载动画效果
 *
 *          依赖关系：
 *          - 无外部依赖
 */
export default function Loading() {
	return (
		<div id="loading" className="flex-1 flex justify-center items-center">
			<div className="loading-dots">
				<div className="dot"></div>
				<div className="dot"></div>
				<div className="dot"></div>
			</div>
		</div>
	);
}