import { useToast } from '../../context/ToastContext';
import { cn } from '../../lib/utils';
import { CheckCircle, AlertTriangle, X, Info } from 'lucide-react';

const toastIcons = {
  success: CheckCircle,
  error: AlertTriangle,
  info: Info,
  warning: AlertTriangle,
};

const toastColors = {
  success: 'border-l-green-500',
  error: 'border-l-red-500',
  info: 'border-l-blue-500',
  warning: 'border-l-yellow-500',
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 max-w-sm">
      {toasts.map((toast) => {
        const Icon = toastIcons[toast.type] || CheckCircle;
        return (
          <div
            key={toast.id}
            className={cn(
              'flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg border-l-4 animate-slide-in-right',
              'bg-white dark:bg-surface-dark-card border border-gray-200 dark:border-surface-dark-border',
              toastColors[toast.type]
            )}
            role="alert"
          >
            <Icon className={cn(
              'w-5 h-5 shrink-0',
              toast.type === 'success' && 'text-green-500',
              toast.type === 'error' && 'text-red-500',
              toast.type === 'info' && 'text-blue-500',
              toast.type === 'warning' && 'text-yellow-500',
            )} />
            <p className="text-sm text-gray-900 dark:text-white flex-1">{toast.message}</p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
