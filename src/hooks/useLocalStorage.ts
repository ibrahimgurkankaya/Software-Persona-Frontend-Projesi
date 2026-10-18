import { useEffect, useState } from 'react';

/**
 * useState gibi çalışır, ancak değeri tarayıcının LocalStorage alanında saklar.
 * Sayfa yenilendiğinde veri kaybolmaz.
 */
export function useLocalStorage<T>(key: string, initialValue: T | (() => T)) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = window.localStorage.getItem(key);
      if (saved !== null) {
        return JSON.parse(saved) as T;
      }
    } catch (error) {
      console.warn(`LocalStorage okunamadı (${key}):`, error);
    }
    return typeof initialValue === 'function' ? (initialValue as () => T)() : initialValue;
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn(`LocalStorage'a yazılamadı (${key}):`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
