import { Link } from 'react-router-dom';
import type { MediaItem } from '../interfaces';
import {
  CREATOR_LABELS,
  STATUS_STYLES,
  TYPE_LABELS,
  TYPE_STYLES,
  getNextStatus,
  getStatusLabel,
} from '../utils/constants';
import { formatDate } from '../utils/helpers';
import { PencilIcon, TrashIcon, TypeIcon } from './Icons';
import StarRating from './StarRating';

interface ItemCardProps {
  item: MediaItem;
  onDelete: (item: MediaItem) => void;
  onStatusChange: (item: MediaItem) => void;
}

/** Listeleme sayfasında her kaydı gösteren kart */
export default function ItemCard({ item, onDelete, onStatusChange }: ItemCardProps) {
  const typeStyle = TYPE_STYLES[item.type];
  const nextStatusLabel = getStatusLabel(item.type, getNextStatus(item.status));

  return (
    <article className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-md">
      {/* Kapak alanı */}
      <div className={`relative flex h-24 items-end bg-gradient-to-br p-4 ${typeStyle.cover}`}>
        <TypeIcon type={item.type} className="absolute top-4 right-4 size-14 text-white/25" />
        <span className="font-display text-4xl leading-none font-bold text-white/90 drop-shadow-sm">
          {item.title.charAt(0).toLocaleUpperCase('tr')}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex flex-wrap items-center gap-1.5">
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-semibold ${typeStyle.badge}`}
          >
            <TypeIcon type={item.type} className="size-3.5" />
            {TYPE_LABELS[item.type]}
          </span>
          {item.genre && (
            <span className="rounded-md bg-stone-100 px-2 py-0.5 text-xs font-medium text-stone-600 dark:bg-stone-800 dark:text-stone-400">
              {item.genre}
            </span>
          )}
        </div>

        <div>
          <h3 className="font-display text-lg leading-snug font-bold text-stone-900 dark:text-stone-50">
            {item.title}
          </h3>
          {item.creator && (
            <p className="mt-0.5 text-sm text-stone-500 dark:text-stone-400">
              <span className="sr-only">{CREATOR_LABELS[item.type]}: </span>
              {item.creator}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => onStatusChange(item)}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold ring-1 transition hover:brightness-95 ring-inset ${STATUS_STYLES[item.status]}`}
            title={`Durumu değiştir → ${nextStatusLabel}`}
          >
            {getStatusLabel(item.type, item.status)}
          </button>
          <StarRating value={item.rating} />
        </div>

        {item.notes && (
          <p className="line-clamp-2 text-sm text-stone-600 dark:text-stone-400">{item.notes}</p>
        )}

        <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-3 dark:border-stone-800">
          <time dateTime={item.createdAt} className="text-xs text-stone-400 dark:text-stone-500">
            {formatDate(item.createdAt)}
          </time>
          <div className="flex items-center gap-1">
            <Link
              to={`/duzenle/${item.id}`}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-stone-600 hover:bg-stone-100 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-stone-100"
              aria-label={`${item.title} kaydını düzenle`}
            >
              <PencilIcon className="size-4" />
              Düzenle
            </Link>
            <button
              type="button"
              onClick={() => onDelete(item)}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-500/10"
              aria-label={`${item.title} kaydını sil`}
            >
              <TrashIcon className="size-4" />
              Sil
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
