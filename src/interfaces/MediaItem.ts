/** Listeye eklenebilecek içerik türleri */
export type MediaType = 'kitap' | 'film' | 'dizi';

/** Bir içeriğin okuma/izleme durumu */
export type ItemStatus = 'planlandi' | 'devam' | 'tamamlandi';

/** Listede tutulan tek bir kayıt (kitap, film veya dizi) */
export interface MediaItem {
  id: string;
  title: string;
  /** Kitap için yazar, film/dizi için yönetmen veya yapımcı */
  creator: string;
  type: MediaType;
  status: ItemStatus;
  genre: string;
  /** 0 = henüz puanlanmadı, 1-5 arası yıldız */
  rating: number;
  notes: string;
  /** ISO tarih metni */
  createdAt: string;
  /** ISO tarih metni */
  updatedAt: string;
}

/** Ekle / Güncelle formundan gelen veri (id ve tarihler otomatik üretilir) */
export type MediaItemInput = Omit<MediaItem, 'id' | 'createdAt' | 'updatedAt'>;
