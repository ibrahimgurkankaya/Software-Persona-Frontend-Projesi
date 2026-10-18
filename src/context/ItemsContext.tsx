import { createContext, useContext, type ReactNode } from 'react';
import type { ItemStatus, MediaItem, MediaItemInput } from '../interfaces';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { STORAGE_KEY } from '../utils/constants';
import { generateId } from '../utils/helpers';
import { createSampleItems } from '../utils/sampleData';

interface ItemsContextValue {
  items: MediaItem[];
  /** EKLE */
  addItem: (input: MediaItemInput) => MediaItem;
  /** LİSTELE (tek kayıt) */
  getItem: (id: string) => MediaItem | undefined;
  /** GÜNCELLE */
  updateItem: (id: string, input: MediaItemInput) => void;
  /** GÜNCELLE (sadece durum) */
  changeStatus: (id: string, status: ItemStatus) => void;
  /** SİL */
  deleteItem: (id: string) => void;
  resetToSamples: () => void;
  clearAll: () => void;
}

const ItemsContext = createContext<ItemsContextValue | null>(null);

/** Tüm CRUD işlemlerini yöneten ve verileri LocalStorage'da tutan sağlayıcı */
export function ItemsProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<MediaItem[]>(STORAGE_KEY, createSampleItems);

  const addItem = (input: MediaItemInput): MediaItem => {
    const now = new Date().toISOString();
    const newItem: MediaItem = { ...input, id: generateId(), createdAt: now, updatedAt: now };
    setItems((current) => [newItem, ...current]);
    return newItem;
  };

  const getItem = (id: string) => items.find((item) => item.id === id);

  const updateItem = (id: string, input: MediaItemInput) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, ...input, updatedAt: new Date().toISOString() } : item,
      ),
    );
  };

  const changeStatus = (id: string, status: ItemStatus) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, status, updatedAt: new Date().toISOString() } : item,
      ),
    );
  };

  const deleteItem = (id: string) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  const resetToSamples = () => setItems(createSampleItems());

  const clearAll = () => setItems([]);

  return (
    <ItemsContext.Provider
      value={{ items, addItem, getItem, updateItem, changeStatus, deleteItem, resetToSamples, clearAll }}
    >
      {children}
    </ItemsContext.Provider>
  );
}

/** Bileşenlerden CRUD işlemlerine erişmek için kullanılan hook */
export function useItems(): ItemsContextValue {
  const context = useContext(ItemsContext);
  if (!context) {
    throw new Error('useItems, ItemsProvider içinde kullanılmalıdır.');
  }
  return context;
}
