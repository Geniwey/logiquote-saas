import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Loader2, ArrowRight, ArrowLeft, User, ShieldCheck, Zap } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Logo } from '@/components/Logo';
import { SEO } from '@/components/SEO';

type Mode = 'signin' | 'signup';

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const navigate = useNavigate();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const isSignUp = mode === 'signup';

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

    navigate('/dashboard');
  };

  return (
    <>
      <SEO title={isSignUp ? 'Crear cuenta | LogiQuote' : 'Iniciar sesión | LogiQuote'} description="Accede a tu panel de control de LogiQuote." />

      <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-white px-4">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 bg-grid-fine opacity-40" />
        <div className="absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-200/25 to-indigo-200/10 blur-[140px]" />

        <Link
          to="/"
          className="absolute left-6 top-6 inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Volver al inicio
        </Link>

        <div className="relative w-full max-w-md">
          <div className="mb-8 text-center">
            <div className="mb-6 flex justify-center">
              <Logo size="lg" />
            </div>
            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 shadow-lg shadow-blue-600/20">
              <User className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              {isSignUp ? 'Crear cuenta gratis' : 'Iniciar sesión'}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {isSignUp
                ? 'Empieza a cotizar con IA en menos de un minuto.'
                : 'Bienvenido de nuevo. Accede a tu panel.'}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-xl shadow-slate-200/40 backdrop-blur-md">
            <form onSubmit={handleSubmit} className="space-y-5">
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

          <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5" />
              Datos cifrados
            </span>
            <span className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5" />
              Sin permanencia
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
