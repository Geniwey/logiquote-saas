import { useState, type FormEvent, useEffect } from 'react';
import { X, Mail, Lock, Loader2, ArrowRight, User } from 'lucide-react';
import { useAuth } from '@/lib/auth';

type AuthMode = 'signin' | 'signup';

interface AuthModalProps {
  open: boolean;
  initialMode: AuthMode;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}

export function AuthModal({ open, initialMode, onClose, title, subtitle }: AuthModalProps) {
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      setMode(initialMode);
      setError(null);
      setEmail('');
      setPassword('');
    }
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const isSignUp = mode === 'signup';

  const defaultTitle = isSignUp ? 'Crear cuenta gratis' : 'Iniciar sesión';
  const defaultSubtitle = isSignUp
    ? 'Empieza a cotizar con IA en menos de un minuto.'
    : 'Bienvenido de nuevo. Accede a tu panel.';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = isSignUp
      ? await signUp(email, password)
      : await signIn(email, password);

    setLoading(false);

    if (error) {
      setError(error);
      return;
    }

    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

      <div
        className="relative w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 shadow-2xl animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          aria-label="Cerrar"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <div className="mb-7">
          <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/20">
            <User className="h-5.5 w-5.5 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900">
            {title ?? defaultTitle}
          </h2>
          <p className="mt-1.5 text-sm text-slate-500">
            {subtitle ?? defaultSubtitle}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@empresa.com"
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Mínimo 6 caracteres"
                className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition-all duration-200 placeholder:text-slate-400 focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
              />
            </div>
          </div>

          {error && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? (
              <>
                <Loader2 className="h-4.5 w-4.5 animate-spin" />
                Procesando...
              </>
            ) : (
              <>
                {isSignUp ? 'Crear cuenta' : 'Acceder'}
                <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-0.5" />
              </>
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-500">
          {isSignUp ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
          <button
            onClick={() => {
              setMode(isSignUp ? 'signin' : 'signup');
              setError(null);
            }}
            className="font-semibold text-blue-600 transition-colors hover:text-blue-700"
          >
            {isSignUp ? 'Iniciar sesión' : 'Crear cuenta gratis'}
          </button>
        </p>
      </div>
    </div>
  );
}
