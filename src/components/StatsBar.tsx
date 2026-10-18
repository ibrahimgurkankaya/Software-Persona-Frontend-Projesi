import type { MediaItem } from '../interfaces';
import { BookIcon, CheckIcon, FilmIcon, LogoIcon } from './Icons';

/** Listenin özet istatistikleri ve tamamlanma oranı */
export default function StatsBar({ items }: { items: MediaItem[] }) {
  const total = items.length;
  const books = items.filter((item) => item.type === 'kitap').length;
  const screen = total - books;
  const completed = items.filter((item) => item.status === 'tamamlandi').length;
  const inProgress = items.filter((item) => item.status === 'devam').length;
  const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

  const stats = [
    { label: 'Toplam kayıt', value: total, icon: LogoIcon, color: 'bg-stone-900 text-white dark:bg-stone-100 dark:text-stone-900' },
    { label: 'Kitap', value: books, icon: BookIcon, color: 'bg-amber-100 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300' },
    { label: 'Film & Dizi', value: screen, icon: FilmIcon, color: 'bg-rose-100 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300' },
    { label: 'Tamamlanan', value: completed, icon: CheckIcon, color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300' },
  ];

  return (
    <section aria-label="İstatistikler" className="space-y-3">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="card flex items-center gap-3 p-4">
            <span className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
              <Icon className="size-5" />
            </span>
            <div>
              <p className="text-2xl font-bold text-stone-900 tabular-nums dark:text-stone-50">{value}</p>
              <p className="text-xs font-medium text-stone-500 dark:text-stone-400">{label}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="card p-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-stone-700 dark:text-stone-300">
            Tamamlanma oranı
            {inProgress > 0 && (
              <span className="ml-2 font-normal text-stone-500 dark:text-stone-400">
                · {inProgress} kayıt devam ediyor
              </span>
            )}
          </span>
          <span className="font-semibold text-emerald-700 tabular-nums dark:text-emerald-400">%{percent}</span>
        </div>
        <div
          className="h-2.5 overflow-hidden rounded-full bg-stone-100 dark:bg-stone-800"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Tamamlanma oranı"
        >
          <div
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-600 transition-[width] duration-500"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </section>
  );
}
