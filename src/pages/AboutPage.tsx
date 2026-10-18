import { useCallback, useState } from 'react';
import ConfirmDialog from '../components/ConfirmDialog';
import { PencilIcon, PlusIcon, RefreshIcon, SearchIcon, TrashIcon } from '../components/Icons';
import PageHeader from '../components/PageHeader';
import { useItems } from '../context/ItemsContext';
import { useToast } from '../context/ToastContext';

const CRUD_FEATURES = [
  {
    icon: PlusIcon,
    title: 'Ekle (Create)',
    text: '"Yeni Ekle" sayfasındaki form ile kitap, film veya dizi eklenir. Başlık ve yazar/yönetmen alanları doğrulanır.',
  },
  {
    icon: SearchIcon,
    title: 'Listele (Read)',
    text: 'Ana sayfada tüm kayıtlar kartlar halinde listelenir; arama, tür/durum filtresi ve sıralama yapılabilir.',
  },
  {
    icon: PencilIcon,
    title: 'Güncelle (Update)',
    text: '"Düzenle" ile kaydın tüm bilgileri değiştirilir. Karttaki durum rozetine tıklayarak durum hızlıca güncellenir.',
  },
  {
    icon: TrashIcon,
    title: 'Sil (Delete)',
    text: '"Sil" butonu onay penceresi açar; onaylanınca kayıt listeden kalıcı olarak kaldırılır.',
  },
];

const TECHNOLOGIES = [
  { name: 'React 19', desc: 'Bileşen tabanlı arayüz kütüphanesi' },
  { name: 'TypeScript', desc: 'Tip güvenliği için (Interfaces klasörü)' },
  { name: 'Vite', desc: 'Hızlı geliştirme sunucusu ve derleme aracı' },
  { name: 'Tailwind CSS 4', desc: 'Utility-first CSS çatısı' },
  { name: 'React Router', desc: 'Sayfalar arası yönlendirme' },
  { name: 'LocalStorage', desc: 'Verilerin tarayıcıda kalıcı saklanması' },
];

/** HAKKINDA sayfası: proje bilgisi ve veri yönetimi */
export default function AboutPage() {
  const { items, resetToSamples, clearAll } = useItems();
  const { showToast } = useToast();
  const [confirmClear, setConfirmClear] = useState(false);

  const handleReset = () => {
    resetToSamples();
    showToast('Örnek veriler yüklendi.');
  };

  const handleClear = () => {
    clearAll();
    setConfirmClear(false);
    showToast('Tüm kayıtlar silindi.', 'danger');
  };

  const handleCancel = useCallback(() => setConfirmClear(false), []);

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <PageHeader
        title="Hakkında"
        description="Rafım, okuduğun kitapları ve izlediğin film/dizileri takip etmeni sağlayan bir React uygulamasıdır."
      />

      <section className="card p-6">
        <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-50">
          CRUD işlemleri
        </h2>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Uygulama, TODO uygulaması mantığındaki dört temel işlemi içerir.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {CRUD_FEATURES.map(({ icon: Icon, title, text }) => (
            <div key={title} className="flex gap-3 rounded-xl bg-stone-50 p-4 dark:bg-stone-800/50">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300">
                <Icon className="size-4" />
              </span>
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">{title}</h3>
                <p className="mt-1 text-sm text-stone-600 dark:text-stone-400">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-50">
          Kullanılan teknolojiler
        </h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {TECHNOLOGIES.map((tech) => (
            <li key={tech.name} className="rounded-xl border border-stone-200 p-4 dark:border-stone-700">
              <p className="font-semibold text-stone-900 dark:text-stone-100">{tech.name}</p>
              <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">{tech.desc}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="card p-6">
        <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-50">Veri yönetimi</h2>
        <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">
          Şu anda rafında <strong className="text-stone-800 dark:text-stone-200">{items.length}</strong> kayıt
          var. Veriler yalnızca bu tarayıcının LocalStorage alanında tutulur.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            <RefreshIcon className="size-4" />
            Örnek verileri yükle
          </button>
          <button
            type="button"
            onClick={() => setConfirmClear(true)}
            disabled={items.length === 0}
            className="btn btn-danger"
          >
            <TrashIcon className="size-4" />
            Tüm kayıtları sil
          </button>
        </div>
      </section>

      <ConfirmDialog
        open={confirmClear}
        title="Tüm kayıtları sil"
        message={`Rafındaki ${items.length} kaydın tamamı silinecek. Bu işlem geri alınamaz.`}
        confirmLabel="Hepsini sil"
        onConfirm={handleClear}
        onCancel={handleCancel}
      />
    </div>
  );
}
