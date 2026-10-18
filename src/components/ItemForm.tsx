import { useState, type FormEvent } from 'react';
import type { MediaItemInput, MediaType } from '../interfaces';
import {
  CREATOR_LABELS,
  GENRE_SUGGESTIONS,
  MEDIA_TYPES,
  NOTES_MAX_LENGTH,
  STATUSES,
  TYPE_LABELS,
  getStatusLabel,
} from '../utils/constants';
import { TypeIcon } from './Icons';
import StarRating from './StarRating';

interface ItemFormProps {
  /** Güncelleme sayfasında mevcut kaydın değerleri gelir */
  initialValues?: MediaItemInput;
  submitLabel: string;
  onSubmit: (values: MediaItemInput) => void;
  onCancel: () => void;
}

type FormErrors = Partial<Record<'title' | 'creator', string>>;

const EMPTY_FORM: MediaItemInput = {
  title: '',
  creator: '',
  type: 'kitap',
  status: 'planlandi',
  genre: '',
  rating: 0,
  notes: '',
};

const CREATOR_PLACEHOLDERS: Record<MediaType, string> = {
  kitap: 'Örn: Sabahattin Ali',
  film: 'Örn: Nuri Bilge Ceylan',
  dizi: 'Örn: Vince Gilligan',
};

const TITLE_PLACEHOLDERS: Record<MediaType, string> = {
  kitap: 'Örn: Kürk Mantolu Madonna',
  film: 'Örn: Kış Uykusu',
  dizi: 'Örn: Breaking Bad',
};

function validate(values: MediaItemInput): FormErrors {
  const errors: FormErrors = {};
  if (values.title.trim().length < 2) {
    errors.title = 'Başlık en az 2 karakter olmalıdır.';
  }
  if (values.creator.trim().length === 0) {
    errors.creator = `${CREATOR_LABELS[values.type]} alanı boş bırakılamaz.`;
  }
  return errors;
}

/** EKLE ve GÜNCELLE sayfalarında ortak kullanılan form */
export default function ItemForm({ initialValues, submitLabel, onSubmit, onCancel }: ItemFormProps) {
  const [values, setValues] = useState<MediaItemInput>(initialValues ?? EMPTY_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  const setField = <K extends keyof MediaItemInput>(field: K, value: MediaItemInput[K]) => {
    const next = { ...values, [field]: value };
    setValues(next);
    // İlk gönderim denemesinden sonra hataları canlı güncelle
    if (submitted) setErrors(validate(next));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    const validationErrors = validate(values);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    onSubmit({
      ...values,
      title: values.title.trim(),
      creator: values.creator.trim(),
      genre: values.genre.trim(),
      notes: values.notes.trim(),
    });
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="card space-y-6 p-5 sm:p-8">
      {/* Tür seçimi */}
      <fieldset>
        <legend className="label">Tür</legend>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {MEDIA_TYPES.map((type) => {
            const active = values.type === type;
            return (
              <label
                key={type}
                className={
                  active
                    ? 'flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 border-amber-600 bg-amber-50 px-3 py-3 text-sm font-semibold text-amber-900 dark:border-amber-500 dark:bg-amber-500/10 dark:text-amber-200'
                    : 'flex cursor-pointer flex-col items-center gap-1.5 rounded-xl border-2 border-stone-200 px-3 py-3 text-sm font-medium text-stone-600 hover:border-stone-300 hover:bg-stone-50 dark:border-stone-700 dark:text-stone-300 dark:hover:border-stone-600 dark:hover:bg-stone-800'
                }
              >
                <input
                  type="radio"
                  name="type"
                  value={type}
                  checked={active}
                  onChange={() => setField('type', type)}
                  className="sr-only"
                />
                <TypeIcon type={type} className="size-6" />
                {TYPE_LABELS[type]}
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        {/* Başlık */}
        <div className="sm:col-span-2">
          <label htmlFor="title" className="label">
            Başlık <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            value={values.title}
            onChange={(e) => setField('title', e.target.value)}
            placeholder={TITLE_PLACEHOLDERS[values.type]}
            className={`input ${errors.title ? 'input-error' : ''}`}
            aria-invalid={Boolean(errors.title)}
            aria-describedby={errors.title ? 'title-error' : undefined}
            autoFocus
          />
          {errors.title && (
            <p id="title-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.title}
            </p>
          )}
        </div>

        {/* Yazar / Yönetmen */}
        <div>
          <label htmlFor="creator" className="label">
            {CREATOR_LABELS[values.type]} <span className="text-red-500">*</span>
          </label>
          <input
            id="creator"
            type="text"
            value={values.creator}
            onChange={(e) => setField('creator', e.target.value)}
            placeholder={CREATOR_PLACEHOLDERS[values.type]}
            className={`input ${errors.creator ? 'input-error' : ''}`}
            aria-invalid={Boolean(errors.creator)}
            aria-describedby={errors.creator ? 'creator-error' : undefined}
          />
          {errors.creator && (
            <p id="creator-error" className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {errors.creator}
            </p>
          )}
        </div>

        {/* Kategori / Tür */}
        <div>
          <label htmlFor="genre" className="label">
            Kategori
          </label>
          <input
            id="genre"
            type="text"
            list="genre-suggestions"
            value={values.genre}
            onChange={(e) => setField('genre', e.target.value)}
            placeholder="Örn: Roman, Bilim Kurgu"
            className="input"
          />
          <datalist id="genre-suggestions">
            {GENRE_SUGGESTIONS.map((genre) => (
              <option key={genre} value={genre} />
            ))}
          </datalist>
        </div>

        {/* Durum */}
        <div>
          <label htmlFor="status" className="label">
            Durum
          </label>
          <select
            id="status"
            value={values.status}
            onChange={(e) => setField('status', e.target.value as MediaItemInput['status'])}
            className="input"
          >
            {STATUSES.map((status) => (
              <option key={status} value={status}>
                {getStatusLabel(values.type, status)}
              </option>
            ))}
          </select>
        </div>

        {/* Puan */}
        <div>
          <span className="label">Puan</span>
          <div className="flex h-[42px] items-center">
            <StarRating value={values.rating} onChange={(rating) => setField('rating', rating)} size="md" />
          </div>
        </div>

        {/* Notlar */}
        <div className="sm:col-span-2">
          <label htmlFor="notes" className="label">
            Notlar
          </label>
          <textarea
            id="notes"
            rows={4}
            maxLength={NOTES_MAX_LENGTH}
            value={values.notes}
            onChange={(e) => setField('notes', e.target.value)}
            placeholder="Düşüncelerin, kaldığın sayfa/bölüm, kimin tavsiye ettiği..."
            className="input resize-y"
          />
          <p className="mt-1.5 text-right text-xs text-stone-400 tabular-nums">
            {values.notes.length} / {NOTES_MAX_LENGTH}
          </p>
        </div>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t border-stone-100 pt-6 sm:flex-row sm:justify-end dark:border-stone-800">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Vazgeç
        </button>
        <button type="submit" className="btn btn-primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
