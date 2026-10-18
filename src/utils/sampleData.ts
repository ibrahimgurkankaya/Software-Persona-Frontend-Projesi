import type { MediaItem, MediaItemInput } from '../interfaces';
import { generateId } from './helpers';

/** Uygulama ilk açıldığında liste boş görünmesin diye örnek kayıtlar */
const SAMPLE_ITEMS: MediaItemInput[] = [
  {
    title: 'Kürk Mantolu Madonna',
    creator: 'Sabahattin Ali',
    type: 'kitap',
    status: 'tamamlandi',
    genre: 'Roman',
    rating: 5,
    notes: 'Raif Efendi ile Maria Puder’in hikâyesi. Kesinlikle tekrar okunmalı.',
  },
  {
    title: 'Interstellar',
    creator: 'Christopher Nolan',
    type: 'film',
    status: 'tamamlandi',
    genre: 'Bilim Kurgu',
    rating: 5,
    notes: 'Hans Zimmer’ın müzikleri muhteşem. Kara delik sahneleri unutulmaz.',
  },
  {
    title: 'Suç ve Ceza',
    creator: 'Fyodor Dostoyevski',
    type: 'kitap',
    status: 'devam',
    genre: 'Roman',
    rating: 0,
    notes: 'Şu an üçüncü bölümdeyim.',
  },
  {
    title: 'Breaking Bad',
    creator: 'Vince Gilligan',
    type: 'dizi',
    status: 'devam',
    genre: 'Dram',
    rating: 4,
    notes: '3. sezondayım.',
  },
  {
    title: 'Sapiens',
    creator: 'Yuval Noah Harari',
    type: 'kitap',
    status: 'tamamlandi',
    genre: 'Tarih',
    rating: 4,
    notes: 'İnsanlık tarihine farklı bir bakış.',
  },
  {
    title: 'Babam ve Oğlum',
    creator: 'Çağan Irmak',
    type: 'film',
    status: 'planlandi',
    genre: 'Dram',
    rating: 0,
    notes: 'Mendiller hazır olsun.',
  },
  {
    title: 'Dune',
    creator: 'Frank Herbert',
    type: 'kitap',
    status: 'planlandi',
    genre: 'Bilim Kurgu',
    rating: 0,
    notes: '',
  },
  {
    title: 'Dark',
    creator: 'Baran bo Odar',
    type: 'dizi',
    status: 'planlandi',
    genre: 'Bilim Kurgu',
    rating: 0,
    notes: 'Arkadaşlarım çok tavsiye etti.',
  },
];

/** Örnek kayıtları id ve tarih ekleyerek oluşturur (her biri bir gün arayla eklenmiş gibi) */
export function createSampleItems(): MediaItem[] {
  const now = Date.now();
  const oneDay = 24 * 60 * 60 * 1000;

  return SAMPLE_ITEMS.map((item, index) => {
    const date = new Date(now - (SAMPLE_ITEMS.length - index) * oneDay).toISOString();
    return { ...item, id: generateId(), createdAt: date, updatedAt: date };
  });
}
