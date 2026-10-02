import { useState, type FormEvent, useEffect } from 'react';
import { X, Mail, Lock, Loader2, ArrowRight } from 'lucide-react';
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
    if (open) { setMode(initialMode); setError(null); setEmail(''); setPassword(''); }
  }, [open, initialMode]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open) return null;

  const isSignUp = mode === 'signup';
  const defaultTitle = isSignUp ? 'Crear cuenta gratis' : 'Iniciar sesión';
  const defaultSubtitle = isSignUp ? 'Empieza a cotizar con IA en menos de un minuto.' : 'Accede a tu panel.';

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = isSignUp ? await signUp(email, password) : await signIn(email, password);
    setLoading(false);
    if (error) { setError(error); return; }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-white border border-line p-8 animate-fade-up" style={{ borderRadius: '6px' }} onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-ink-muted transition-colors hover:bg-bone hover:text-ink" aria-label="Cerrar" style={{ borderRadius: '4px' }}>
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6">
          <h2 className="text-2xl font-display font-bold text-ink">{title ?? defaultTitle}</h2>
          <p className="mt-1.5 text-sm text-ink-muted">{subtitle ?? defaultSubtitle}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Email</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" className="input-field pl-11" />
            </div>
          </div>
          <div>
            <label className="label-field">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" />
              <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" className="input-field pl-11" />
            </div>
          </div>

          {error && <div className="border border-error bg-error-bg px-4 py-3 text-sm text-error" style={{ borderRadius: '4px' }}>{error}</div>}

          <button type="submit" disabled={loading} className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Procesando...</> : <>{isSignUp ? 'Crear cuenta' : 'Acceder'} <ArrowRight className="h-4 w-4" /></>}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-muted">
          {isSignUp ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
          <button onClick={() => { setMode(isSignUp ? 'signin' : 'signup'); setError(null); }} className="font-semibold text-signal transition-colors hover:text-signal-dark">
            {isSignUp ? 'Iniciar sesión' : 'Crear cuenta gratis'}
          </button>
        </p>
      </div>
    </div>
  );
}
