/**
 * @fileoverview 应用常量定义
 * @author 祁筱欣
 * @date 2026-02-06
 * @since 2026-02-06
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块定义了应用的全局常量，包括：
 *          - 本地存储键名（TASK_KEY, HISTORY_KEY）
 *          - 图片处理默认配置（PHOTO_DEFAULT_PAYLOAD）
 *
 *          常量使用说明：
 *          - TASK_KEY: 任务数据的本地存储键名
 *          - HISTORY_KEY: 历史记录的本地存储键名
 *          - PHOTO_DEFAULT_PAYLOAD: 图片处理工具的默认参数配置
 *
 *          注意：
 *          - 认证相关数据使用 Zustand store 管理，无需手动指定 localStorage 键名
 */
export const TASK_KEY = 'TASK_KEY'
export const HISTORY_KEY = 'HISTORY_KEY'

export const PHOTO_DEFAULT_PAYLOAD = {
  scale: '2',
  prompt: '',
  mask: null,
  light: 'None',
  canvas: null,
  position: {
    left: 0,
    right: 0,
    up: 0,
    down: 0,
  },
  descript: '',
  model: 'luma',
  ratio: 0,
  label: '1:1',
  character: 'Haute Couture Illustration',
  images: [],
  srcLang: 'auto',
  tgtLang: '',
  protectLang: false,
}