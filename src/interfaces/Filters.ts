import type { ItemStatus, MediaType } from './MediaItem';

/** Listeleme sayfasındaki sıralama seçenekleri */
export type SortOption = 'yeni' | 'eski' | 'baslik' | 'puan';

/** Listeleme sayfasındaki arama ve filtre durumu */
export interface ItemFilters {
  search: string;
  type: MediaType | 'hepsi';
  status: ItemStatus | 'hepsi';
  sortBy: SortOption;
}
