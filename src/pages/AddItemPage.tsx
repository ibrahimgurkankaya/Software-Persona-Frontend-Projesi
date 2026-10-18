import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from '../components/Icons';
import ItemForm from '../components/ItemForm';
import PageHeader from '../components/PageHeader';
import { useItems } from '../context/ItemsContext';
import { useToast } from '../context/ToastContext';
import type { MediaItemInput } from '../interfaces';

/** EKLEME sayfası */
export default function AddItemPage() {
  const { addItem } = useItems();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (values: MediaItemInput) => {
    const newItem = addItem(values);
    showToast(`"${newItem.title}" listene eklendi.`);
    navigate('/');
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
        title="Yeni Kayıt Ekle"
        description="Rafına bir kitap, film ya da dizi ekle."
      />
      <ItemForm submitLabel="Listeye Ekle" onSubmit={handleSubmit} onCancel={() => navigate('/')} />
    </div>
  );
}
