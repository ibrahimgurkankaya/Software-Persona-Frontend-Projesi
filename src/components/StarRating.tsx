import { StarIcon } from './Icons';

interface StarRatingProps {
  value: number;
  /** Verilirse yıldızlar tıklanabilir olur (form içinde) */
  onChange?: (value: number) => void;
  size?: 'sm' | 'md';
}

const STARS = [1, 2, 3, 4, 5];

export default function StarRating({ value, onChange, size = 'sm' }: StarRatingProps) {
  const iconClass = size === 'sm' ? 'size-4' : 'size-7';

  // Sadece gösterim (kart üzerinde)
  if (!onChange) {
    return (
      <div className="flex items-center gap-0.5" aria-label={value > 0 ? `${value} / 5 puan` : 'Puan verilmedi'}>
        {STARS.map((star) => (
          <StarIcon
            key={star}
            filled={star <= value}
            className={`${iconClass} ${star <= value ? 'text-amber-500' : 'text-stone-300 dark:text-stone-600'}`}
          />
        ))}
      </div>
    );
  }

  // Tıklanabilir (form içinde)
  return (
    <div className="flex items-center gap-1" role="radiogroup" aria-label="Puan">
      {STARS.map((star) => (
        <button
          key={star}
          type="button"
          role="radio"
          aria-checked={star === value}
          aria-label={`${star} yıldız`}
          onClick={() => onChange(star === value ? 0 : star)}
          className="rounded-md p-0.5 transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-amber-600"
        >
          <StarIcon
            filled={star <= value}
            className={`${iconClass} ${star <= value ? 'text-amber-500' : 'text-stone-300 dark:text-stone-600'}`}
          />
        </button>
      ))}
      <span className="ml-2 text-sm text-stone-500 dark:text-stone-400">
        {value > 0 ? `${value} / 5` : 'Puan yok'}
      </span>
    </div>
  );
}
