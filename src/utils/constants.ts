import type { ItemStatus, MediaType } from '../interfaces';

/** LocalStorage anahtarları */
export const STORAGE_KEY = 'rafim-items';
export const THEME_KEY = 'rafim-theme';

export const MEDIA_TYPES: MediaType[] = ['kitap', 'film', 'dizi'];
export const STATUSES: ItemStatus[] = ['planlandi', 'devam', 'tamamlandi'];

export const TYPE_LABELS: Record<MediaType, string> = {
  kitap: 'Kitap',
  film: 'Film',
  dizi: 'Dizi',
};

/** Türüne göre "yazar / yönetmen" alanının etiketi */
export const CREATOR_LABELS: Record<MediaType, string> = {
  kitap: 'Yazar',
  film: 'Yönetmen',
  dizi: 'Yaratıcı / Yönetmen',
};

/** Filtrelerde kullanılan genel durum adları */
export const STATUS_LABELS: Record<ItemStatus, string> = {
  planlandi: 'Planlandı',
  devam: 'Devam ediyor',
  tamamlandi: 'Tamamlandı',
};

/** Türüne göre daha doğal durum adları (Okunacak / İzleniyor ...) */
const STATUS_LABELS_BY_TYPE: Record<MediaType, Record<ItemStatus, string>> = {
  kitap: { planlandi: 'Okunacak', devam: 'Okunuyor', tamamlandi: 'Okundu' },
  film: { planlandi: 'İzlenecek', devam: 'İzleniyor', tamamlandi: 'İzlendi' },
  dizi: { planlandi: 'İzlenecek', devam: 'İzleniyor', tamamlandi: 'İzlendi' },
};

export function getStatusLabel(type: MediaType, status: ItemStatus): string {
  return STATUS_LABELS_BY_TYPE[type][status];
}

/** Durum döngüsü: Planlandı → Devam ediyor → Tamamlandı → Planlandı */
export function getNextStatus(status: ItemStatus): ItemStatus {
  const index = STATUSES.indexOf(status);
  return STATUSES[(index + 1) % STATUSES.length];
}

/** Tür rozetleri ve kapak renkleri (Tailwind sınıfları) */
export const TYPE_STYLES: Record<MediaType, { badge: string; cover: string }> = {
  kitap: {
    badge: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
    cover: 'from-amber-400 to-orange-600',
  },
  film: {
    badge: 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
    cover: 'from-rose-400 to-fuchsia-600',
  },
  dizi: {
    badge: 'bg-sky-100 text-sky-800 dark:bg-sky-500/15 dark:text-sky-300',
    cover: 'from-sky-400 to-indigo-600',
  },
};

/** Durum rozetlerinin renkleri (Tailwind sınıfları) */
export const STATUS_STYLES: Record<ItemStatus, string> = {
  planlandi:
    'bg-stone-100 text-stone-700 ring-stone-300 dark:bg-stone-800 dark:text-stone-300 dark:ring-stone-600',
  devam: 'bg-blue-50 text-blue-700 ring-blue-200 dark:bg-blue-500/15 dark:text-blue-300 dark:ring-blue-500/40',
  tamamlandi:
    'bg-emerald-50 text-emerald-700 ring-emerald-200 dark:bg-emerald-500/15 dark:text-emerald-300 dark:ring-emerald-500/40',
};

/** Tür alanı için öneriler (datalist) */
export const GENRE_SUGGESTIONS = [
  'Roman',
  'Bilim Kurgu',
  'Fantastik',
  'Dram',
  'Komedi',
  'Gerilim',
  'Polisiye',
  'Korku',
  'Romantik',
  'Macera',
  'Tarih',
  'Biyografi',
  'Felsefe',
  'Kişisel Gelişim',
  'Belgesel',
  'Animasyon',
];

export const NOTES_MAX_LENGTH = 500;
