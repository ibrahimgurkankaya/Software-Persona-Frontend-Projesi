import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
}

/** Sayfaların üstündeki başlık alanı */
export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl dark:text-stone-50">
          {title}
        </h1>
        {description && <p className="mt-2 text-stone-500 dark:text-stone-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}
