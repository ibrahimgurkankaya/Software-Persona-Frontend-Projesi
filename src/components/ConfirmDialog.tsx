import { useEffect, useRef, type ReactNode } from 'react';
import { TrashIcon } from './Icons';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: ReactNode;
  confirmLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Silme gibi geri alınamaz işlemlerden önce onay isteyen pencere */
export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Evet, sil',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);

  // Esc tuşu ile kapatma ve açılınca odağı "Vazgeç" butonuna verme
  useEffect(() => {
    if (!open) return;
    cancelRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onCancel();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4">
      <div
        className="animate-fade-in absolute inset-0 bg-stone-950/50 backdrop-blur-sm"
        onClick={onCancel}
        aria-hidden="true"
      />
      <div
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-title"
        aria-describedby="confirm-message"
        className="card animate-pop-in relative w-full max-w-md p-6 shadow-xl"
      >
        <div className="flex gap-4">
          <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
            <TrashIcon className="size-5" />
          </span>
          <div>
            <h2 id="confirm-title" className="text-lg font-semibold text-stone-900 dark:text-stone-50">
              {title}
            </h2>
            <div id="confirm-message" className="mt-1.5 text-sm text-stone-600 dark:text-stone-400">
              {message}
            </div>
          </div>
        </div>
        <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button ref={cancelRef} type="button" onClick={onCancel} className="btn btn-secondary">
            Vazgeç
          </button>
          <button type="button" onClick={onConfirm} className="btn btn-danger">
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
