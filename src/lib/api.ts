/**
 * @fileoverview API 模块统一导出
 * @author 祁筱欣
 * @date 2026-02-05
 * @since 2026-02-05
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本文件为向后兼容而保留，重新导出所有 API 模块
 *          实际功能已拆分到以下子模块：
 *          - @/lib/api/token: Token 管理模块
 *          - @/lib/api/storage: 存储管理模块
 *          - @/lib/api/text: 文本处理模块
 *          - @/lib/api/image: 图片基础功能模块
 *          - @/lib/api/text-to-image: 文本生成图片模块
 *          - @/lib/api/image-processing: 图片处理模块
 *          - @/lib/api/video: 视频生成模块
 *          - @/lib/api/task: 任务轮询模块
 *
 *          建议直接从 @/lib/api/index 导入，而不是从此文件导入
 */

// 从子模块导出所有内容
export * from './api/token';
export * from './api/storage';
export * from './api/text';
export * from './api/image';
export * from './api/text-to-image';
export * from './api/image-processing';
export * from './api/video';
export * from './api/task';