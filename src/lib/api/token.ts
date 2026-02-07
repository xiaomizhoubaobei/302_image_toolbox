/**
 * @fileoverview Token 管理模块
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供 API 认证令牌的获取功能
 */

import { useStore } from "@/stores";

/**
 * 获取当前用户的认证令牌
 * @returns 用户认证令牌
 */
export const getToken = () => {
  return useStore.getState().token;
};