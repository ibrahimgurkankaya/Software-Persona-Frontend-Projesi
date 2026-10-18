import { useCallback, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmDialog from '../components/ConfirmDialog';
import EmptyState from '../components/EmptyState';
import FilterBar from '../components/FilterBar';
import { PlusIcon, RefreshIcon } from '../components/Icons';
import ItemCard from '../components/ItemCard';
import PageHeader from '../components/PageHeader';
import StatsBar from '../components/StatsBar';
import { useItems } from '../context/ItemsContext';
import { useToast } from '../context/ToastContext';
import type { ItemFilters, MediaItem } from '../interfaces';
import { getNextStatus, getStatusLabel } from '../utils/constants';
import { filterAndSortItems } from '../utils/helpers';

const DEFAULT_FILTERS: ItemFilters = {
  search: '',
  type: 'hepsi',
  status: 'hepsi',
  sortBy: 'yeni',
};

/** LİSTELEME sayfası */
export default function HomePage() {
  const { items, deleteItem, changeStatus, resetToSamples } = useItems();
  const { showToast } = useToast();
  const [filters, setFilters] = useState<ItemFilters>(DEFAULT_FILTERS);
  const [itemToDelete, setItemToDelete] = useState<MediaItem | null>(null);

  const visibleItems = useMemo(() => filterAndSortItems(items, filters), [items, filters]);

  const isFiltered =
    filters.search !== '' || filters.type !== 'hepsi' || filters.status !== 'hepsi';

  const handleStatusChange = (item: MediaItem) => {
    const next = getNextStatus(item.status);
    changeStatus(item.id, next);
    showToast(`"${item.title}" → ${getStatusLabel(item.type, next)}`);
  };

  const handleConfirmDelete = () => {
    if (!itemToDelete) return;
    deleteItem(itemToDelete.id);
    showToast(`"${itemToDelete.title}" listeden silindi.`, 'danger');
    setItemToDelete(null);
  };

  const handleCancelDelete = useCallback(() => setItemToDelete(null), []);

  return (
    <>
      <PageHeader
        title="Listem"
        description="Okuduğun kitapları, izlediğin film ve dizileri tek bir rafta topla."
        action={
          <Link to="/ekle" className="btn btn-primary self-start sm:self-auto">
            <PlusIcon className="size-4" />
            Yeni Kayıt Ekle
          </Link>
        }
      />

      {items.length === 0 ? (
        <EmptyState
          title="Rafın henüz boş"
          description="İlk kitabını, filmini ya da diziyi ekleyerek başla. İstersen örnek verilerle uygulamayı deneyebilirsin."
        >
          <Link to="/ekle" className="btn btn-primary">
            <PlusIcon className="size-4" />
            İlk kaydı ekle
          </Link>
          <button type="button" onClick={resetToSamples} className="btn btn-secondary">
            <RefreshIcon className="size-4" />
            Örnek verileri yükle
          </button>
        </EmptyState>
      ) : (
        <div className="space-y-6">
          <StatsBar items={items} />

          <FilterBar
            filters={filters}
            onChange={setFilters}
            onReset={() => setFilters(DEFAULT_FILTERS)}
            isFiltered={isFiltered}
          />

          <p className="text-sm text-stone-500 dark:text-stone-400" aria-live="polite">
            {isFiltered
              ? `${items.length} kayıttan ${visibleItems.length} tanesi gösteriliyor`
              : `${items.length} kayıt listeleniyor`}
          </p>

          {visibleItems.length === 0 ? (
            <EmptyState
              title="Sonuç bulunamadı"
              description="Aramana veya seçtiğin filtrelere uyan bir kayıt yok."
            >
              <button
                type="button"
                onClick={() => setFilters(DEFAULT_FILTERS)}
                className="btn btn-secondary"
              >
                Filtreleri temizle
              </button>
            </EmptyState>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {visibleItems.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  onDelete={setItemToDelete}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      )}

      <ConfirmDialog
        open={itemToDelete !== null}
        title="Kaydı sil"
        message={
          <>
            <strong className="text-stone-900 dark:text-stone-100">"{itemToDelete?.title}"</strong>{' '}
            listenden kalıcı olarak silinecek. Bu işlem geri alınamaz.
          </>
        }
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </>
  );
}
