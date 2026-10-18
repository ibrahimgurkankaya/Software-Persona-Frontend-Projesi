import { Link, useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { ArrowLeftIcon } from '../components/Icons';
import ItemForm from '../components/ItemForm';
import PageHeader from '../components/PageHeader';
import { useItems } from '../context/ItemsContext';
import { useToast } from '../context/ToastContext';
import type { MediaItemInput } from '../interfaces';
import { formatDate } from '../utils/helpers';

/** GÜNCELLEME sayfası */
export default function EditItemPage() {
  const { id } = useParams<{ id: string }>();
  const { getItem, updateItem } = useItems();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const item = id ? getItem(id) : undefined;

  if (!item) {
    return (
      <EmptyState
        title="Kayıt bulunamadı"
        description="Düzenlemek istediğin kayıt silinmiş ya da hiç var olmamış olabilir."
      >
        <Link to="/" className="btn btn-primary">
          Listeye dön
        </Link>
      </EmptyState>
    );
  }

  const handleSubmit = (values: MediaItemInput) => {
    updateItem(item.id, values);
    showToast(`"${values.title}" güncellendi.`);
    navigate('/');
  };

  // Formun beklediği alanları mevcut kayıttan ayıkla
  const initialValues: MediaItemInput = {
    title: item.title,
    creator: item.creator,
    type: item.type,
    status: item.status,
    genre: item.genre,
    rating: item.rating,
    notes: item.notes,
  };

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-stone-500 hover:text-stone-900 dark:text-stone-400 dark:hover:text-stone-100"
      >
        <ArrowLeftIcon className="size-4" />
        Listeye dön
      </Link>
      <PageHeader
        title="Kaydı Düzenle"
        description={`Eklenme: ${formatDate(item.createdAt)} · Son güncelleme: ${formatDate(item.updatedAt)}`}
      />
      <ItemForm
        key={item.id}
        initialValues={initialValues}
        submitLabel="Değişiklikleri Kaydet"
        onSubmit={handleSubmit}
        onCancel={() => navigate('/')}
      />
    </div>
  );
}
