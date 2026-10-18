import type { ItemFilters, MediaType, SortOption } from '../interfaces';
import { MEDIA_TYPES, STATUSES, STATUS_LABELS, TYPE_LABELS } from '../utils/constants';
import { SearchIcon, XIcon } from './Icons';

interface FilterBarProps {
  filters: ItemFilters;
  onChange: (filters: ItemFilters) => void;
  onReset: () => void;
  isFiltered: boolean;
}

const SORT_LABELS: Record<SortOption, string> = {
  yeni: 'En yeni',
  eski: 'En eski',
  baslik: 'Başlık (A-Z)',
  puan: 'Puan (yüksek)',
};

const TYPE_TABS: (MediaType | 'hepsi')[] = ['hepsi', ...MEDIA_TYPES];

/** Arama kutusu, tür sekmeleri, durum ve sıralama seçimi */
export default function FilterBar({ filters, onChange, onReset, isFiltered }: FilterBarProps) {
  const update = (changes: Partial<ItemFilters>) => onChange({ ...filters, ...changes });

  return (
    <div className="card space-y-4 p-4">
      <div className="flex flex-col gap-3 md:flex-row">
        <label className="relative flex-1">
          <span className="sr-only">Ara</span>
          <SearchIcon className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-stone-400" />
          <input
            type="search"
            value={filters.search}
            onChange={(e) => update({ search: e.target.value })}
            placeholder="Başlık, yazar, tür veya notlarda ara..."
            className="input pl-10"
          />
        </label>

        <div className="grid grid-cols-2 gap-3 md:flex">
          <label>
            <span className="sr-only">Durum</span>
            <select
              value={filters.status}
              onChange={(e) => update({ status: e.target.value as ItemFilters['status'] })}
              className="input md:w-44"
            >
              <option value="hepsi">Tüm durumlar</option>
              {STATUSES.map((status) => (
                <option key={status} value={status}>
                  {STATUS_LABELS[status]}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Sırala</span>
            <select
              value={filters.sortBy}
              onChange={(e) => update({ sortBy: e.target.value as SortOption })}
              className="input md:w-40"
            >
              {(Object.keys(SORT_LABELS) as SortOption[]).map((option) => (
                <option key={option} value={option}>
                  {SORT_LABELS[option]}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Türe göre filtrele">
          {TYPE_TABS.map((type) => {
            const active = filters.type === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => update({ type })}
                aria-pressed={active}
                className={
                  active
                    ? 'rounded-full bg-stone-900 px-3.5 py-1.5 text-sm font-semibold text-white dark:bg-stone-100 dark:text-stone-900'
                    : 'rounded-full bg-stone-100 px-3.5 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-200 dark:bg-stone-800 dark:text-stone-300 dark:hover:bg-stone-700'
                }
              >
                {type === 'hepsi' ? 'Hepsi' : TYPE_LABELS[type]}
              </button>
            );
          })}
        </div>

        {isFiltered && (
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-sm font-medium text-amber-800 hover:underline dark:text-amber-400"
          >
            <XIcon className="size-4" />
            Filtreleri temizle
          </button>
        )}
      </div>
    </div>
  );
}
