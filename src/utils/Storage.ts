/**
 * @fileoverview 本地存储工具类
 * @author 祁筱欣
 * @date 2026-02-07
 * @since 2026-02-07
 * @contact qixiaoxin @stu.sqxy.edu.cn
 * @LICENSE AGPL-3.0 license
 * @remark 本模块提供本地存储相关工具方法，包括存储、读取 LocalStorage
 */

export default class StorageManager {
  // 提供一个方法来将值存储到LocalStorage
  static setItem(key: string, value: any): void {
      try {
          window.localStorage.setItem(key, JSON.stringify(value));
      } catch (e) {
          console.error('Error saving to localStorage', e);
      }
  }

  // 提供一个方法来从LocalStorage中获取值
  static getItem(key: string): any {
      try {
          const storedValue = window.localStorage.getItem(key);
          return storedValue ? JSON.parse(storedValue) : undefined;
      } catch (e) {
          console.error('Error getting data from localStorage', e);
          return undefined;
      }
  }
}