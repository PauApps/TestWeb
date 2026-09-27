import { useState, useEffect, useCallback } from 'react';

export function useMockStore<T extends { id: string | number }>(
  storageKey: string,
  initialData: T[]
) {
  const [data, setData] = useState<T[]>(() => {
    try {
      const saved = localStorage.getItem(`mock_store_${storageKey}`);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Error reading from localStorage', e);
    }
    return initialData;
  });

  useEffect(() => {
    try {
      localStorage.setItem(`mock_store_${storageKey}`, JSON.stringify(data));
    } catch (e) {
      console.warn('Error writing to localStorage', e);
    }
  }, [storageKey, data]);

  const add = useCallback((item: Omit<T, 'id'> & { id?: string | number }) => {
    const newItem = {
      ...item,
      id: item.id || `item_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    } as T;
    setData((prev) => [newItem, ...prev]);
    return newItem;
  }, []);

  const update = useCallback((id: string | number, updates: Partial<T>) => {
    setData((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
  }, []);

  const remove = useCallback((id: string | number) => {
    setData((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const reset = useCallback(() => {
    setData(initialData);
    try {
      localStorage.removeItem(`mock_store_${storageKey}`);
    } catch (e) {
      console.warn('Error resetting localStorage', e);
    }
  }, [initialData, storageKey]);

  return {
    items: data,
    add,
    update,
    remove,
    reset,
    setItems: setData,
  };
}
