import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: ToastType = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  const icons = {
    success: <CheckCircle2 className="h-5 w-5 text-success" />,
    error: <AlertCircle className="h-5 w-5 text-error" />,
    info: <Info className="h-5 w-5 text-signal" />,
  };

  const borderColors = {
    success: 'border-success',
    error: 'border-error',
    info: 'border-signal',
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`animate-fade-up flex items-center gap-3 border-l-2 ${borderColors[toast.type]} bg-white border border-line px-4 py-3.5 shadow-lg min-w-[320px]`}
            style={{ borderRadius: '6px' }}
          >
            <div className="flex-shrink-0">
              {icons[toast.type]}
            </div>
            <p className="flex-1 text-sm font-medium text-ink">{toast.message}</p>
            <button
              onClick={() => dismiss(toast.id)}
              className="flex-shrink-0 text-ink-muted transition-colors duration-150 hover:text-ink"
              aria-label="Cerrar notificación"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
