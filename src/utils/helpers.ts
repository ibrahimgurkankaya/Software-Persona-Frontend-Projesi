import type { ItemFilters, MediaItem } from '../interfaces';

/** Benzersiz kimlik üretir (destekleniyorsa crypto.randomUUID kullanır) */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/** ISO tarihini "17 Ekim 2026" biçiminde gösterir */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('tr-TR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

/**
 * Aramayı kolaylaştırmak için metni sadeleştirir:
 * küçük harfe çevirir ve Türkçe karakterleri İngilizce karşılığına indirger.
 * Böylece "kurk mantolu" araması "Kürk Mantolu Madonna"yı,
 * "interstellar" araması da "Interstellar"ı bulur.
 */
export function normalize(text: string): string {
  return text
    .trim()
    .toLocaleLowerCase('tr')
    .replace(/ı/g, 'i')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
}

/** Listeyi arama, tür ve durum filtresine göre süzer ve sıralar */
export function filterAndSortItems(items: MediaItem[], filters: ItemFilters): MediaItem[] {
  const query = normalize(filters.search);

  const filtered = items.filter((item) => {
    const matchesType = filters.type === 'hepsi' || item.type === filters.type;
    const matchesStatus = filters.status === 'hepsi' || item.status === filters.status;
    const matchesSearch =
      query === '' ||
      [item.title, item.creator, item.genre, item.notes].some((field) =>
        normalize(field).includes(query),
      );
    return matchesType && matchesStatus && matchesSearch;
  });

  return filtered.sort((a, b) => {
    switch (filters.sortBy) {
      case 'eski':
        return a.createdAt.localeCompare(b.createdAt);
      case 'baslik':
        return a.title.localeCompare(b.title, 'tr');
      case 'puan':
        return b.rating - a.rating || a.title.localeCompare(b.title, 'tr');
      case 'yeni':
      default:
        return b.createdAt.localeCompare(a.createdAt);
    }
  });
}
