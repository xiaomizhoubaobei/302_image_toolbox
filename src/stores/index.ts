/**
 * @fileoverview 状态管理入口文件
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块使用 Zustand 提供全局状态管理，整合所有状态切片
 */

import { create } from "zustand";
import { createConfigSlice, ConfigStore } from "./slices/configSlice";

// type StoreState = ChatStore & ConfigStore;
type StoreState = ConfigStore;

export const useStore = create<StoreState>()(
  (...a) => ({
    ...createConfigSlice(...a),
  }),
);

