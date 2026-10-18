import type { ReactNode } from 'react';
import { LogoIcon } from './Icons';

interface EmptyStateProps {
  title: string;
  description: string;
  children?: ReactNode;
}

/** Liste boşken veya arama sonucu bulunamadığında gösterilen alan */
export default function EmptyState({ title, description, children }: EmptyStateProps) {
  return (
    <div className="card flex flex-col items-center px-6 py-14 text-center">
      <span className="mb-4 flex size-14 items-center justify-center rounded-2xl bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-400">
        <LogoIcon className="size-7" />
      </span>
      <h2 className="font-display text-xl font-bold text-stone-900 dark:text-stone-50">{title}</h2>
      <p className="mt-2 max-w-sm text-sm text-stone-500 dark:text-stone-400">{description}</p>
      {children && <div className="mt-6 flex flex-wrap justify-center gap-3">{children}</div>}
    </div>
  );
}
