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

  // 提供一个方法来从LocalStorage中删除值
  static removeItem(key: string): void {
      try {
          window.localStorage.removeItem(key);
      } catch (e) {
          console.error('Error removing data from localStorage', e);
      }
  }

  // 提供一个方法来清除LocalStorage
  static clear(): void {
      try {
          window.localStorage.clear();
      } catch (e) {
          console.error('Error clearing localStorage', e);
      }
  }
}