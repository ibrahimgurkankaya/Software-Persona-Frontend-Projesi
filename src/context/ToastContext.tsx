import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckIcon, TrashIcon, XIcon } from '../components/Icons';

type ToastVariant = 'success' | 'danger';

interface Toast {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  showToast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

/** Ekle / güncelle / sil işlemlerinden sonra kısa bilgilendirme mesajları gösterir */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: number) => {
    setToasts((current) => current.filter((toast) => toast.id !== id));
  }, []);

  const showToast = useCallback(
    (message: string, variant: ToastVariant = 'success') => {
      const id = Date.now() + Math.random();
      setToasts((current) => [...current, { id, message, variant }]);
      window.setTimeout(() => removeToast(id), 3000);
    },
    [removeToast],
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div
        aria-live="polite"
        className="pointer-events-none fixed inset-x-4 bottom-4 z-50 flex flex-col items-center gap-2 sm:inset-x-auto sm:right-6 sm:bottom-6 sm:items-end"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="animate-toast-in pointer-events-auto flex w-full max-w-sm items-center gap-3 rounded-xl border border-stone-200 bg-white px-4 py-3 text-sm shadow-lg dark:border-stone-700 dark:bg-stone-900"
          >
            <span
              className={
                toast.variant === 'success'
                  ? 'flex size-7 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300'
                  : 'flex size-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300'
              }
            >
              {toast.variant === 'success' ? (
                <CheckIcon className="size-4" />
              ) : (
                <TrashIcon className="size-4" />
              )}
            </span>
            <p className="flex-1 text-stone-700 dark:text-stone-200">{toast.message}</p>
            <button
              type="button"
              onClick={() => removeToast(toast.id)}
              className="rounded-md p-1 text-stone-400 hover:bg-stone-100 hover:text-stone-600 dark:hover:bg-stone-800 dark:hover:text-stone-200"
              aria-label="Bildirimi kapat"
            >
              <XIcon className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast, ToastProvider içinde kullanılmalıdır.');
  }
  return context;
}
