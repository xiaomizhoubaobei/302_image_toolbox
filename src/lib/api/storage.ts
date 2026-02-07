/**
 * @fileoverview 存储管理模块
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供任务和历史记录的本地存储管理功能
 */

import StorageManager from "@/utils/Storage";
import { History } from "@/types";
import { TASK_KEY, HISTORY_KEY } from "@/constants";

/**
 * 获取当前任务信息
 * @returns 任务对象，如果不存在则返回空对象
 */
export const getTask = () => {
  return StorageManager.getItem(TASK_KEY) || {};
};

/**
 * 更新任务信息
 * @param value - 要存储的任务对象
 */
export const updTask = (value: any) => {
  StorageManager.setItem(TASK_KEY, value);
};

/**
 * 获取历史记录列表
 * @returns 历史记录数组，如果不存在则返回空数组
 */
export const getHistorys = () => {
  return  StorageManager.getItem(HISTORY_KEY) || [];
};

/**
 * 更新历史记录列表
 * @param value - 要存储的历史记录数组
 */
export const updHistorys = (value: History[]) => {
  StorageManager.setItem(HISTORY_KEY, value);
};