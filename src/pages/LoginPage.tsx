import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Loader2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { Logo } from '@/components/Logo';
import { SEO } from '@/components/SEO';
import { easeOut, staggerContainer, staggerItem } from '@/lib/animations';

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
    const { error } = isSignUp ? await signUp(email, password) : await signIn(email, password);
    setLoading(false);
    if (error) { setError(error); return; }
    navigate('/dashboard');
  };

  return (
    <>
      <SEO
        title={isSignUp ? 'Crear cuenta | LogiQuote' : 'Iniciar sesión | LogiQuote'}
        description="Accede a tu panel de control de LogiQuote."
      />

      <div className="min-h-screen bg-bone flex flex-col relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-signal/[0.05] blur-[140px]" />
          <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-white blur-[100px]" />
        </div>

        <div className="relative flex items-center justify-between px-6 py-4">
          <Logo />
          <Link to="/" className="btn-ghost"><ArrowLeft className="h-4 w-4" aria-hidden="true" /> Volver al inicio</Link>
        </div>

        <div className="relative flex-1 flex items-center justify-center px-4">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="w-full max-w-md"
          >
            <motion.div variants={staggerItem} className="mb-8">
              <h1 className="text-3xl font-display font-bold tracking-tighter text-ink">
                {isSignUp ? 'Crear cuenta gratis' : 'Iniciar sesión'}
              </h1>
              <p className="mt-2 text-sm text-ink-muted">
                {isSignUp ? 'Empieza a cotizar con IA en menos de un minuto.' : 'Bienvenido de nuevo. Accede a tu panel.'}
              </p>
            </motion.div>

            <motion.div
              variants={staggerItem}
              className="bg-white/70  border border-line p-8 "
              style={{ borderRadius: '16px' }}
            >
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="label-field">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" aria-hidden="true" />
                    <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" className="input-field pl-11" />
                  </div>
                </div>
                <div>
                  <label className="label-field">Contraseña</label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-ink-muted" aria-hidden="true" />
                    <input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Mínimo 6 caracteres" className="input-field pl-11" />
                  </div>
                </div>

                {error && <div className="border border-error bg-error/10 px-4 py-3 text-sm text-error" style={{ borderRadius: '6px' }}>{error}</div>}

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  disabled={loading}
                  aria-label={isSignUp ? 'Crear cuenta' : 'Iniciar sesión'}
                  className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Procesando...</> : <>{isSignUp ? 'Crear cuenta' : 'Acceder'} <ArrowRight className="h-4 w-4" aria-hidden="true" /></>}
                </motion.button>
              </form>

              <p className="mt-6 text-center text-sm text-ink-muted">
                {isSignUp ? '¿Ya tienes cuenta?' : '¿Aún no tienes cuenta?'}{' '}
                <button onClick={() => { setMode(isSignUp ? 'signin' : 'signup'); setError(null); }} className="font-semibold text-signal transition-colors hover:text-signal-light">
                  {isSignUp ? 'Iniciar sesión' : 'Crear cuenta gratis'}
                </button>
              </p>
            </motion.div>

            <motion.div variants={staggerItem} className="mt-6 flex items-center justify-center gap-6 text-xs text-ink-muted font-mono">
              <span>Datos cifrados</span>
              <span className="text-ink/10">·</span>
              <span>Sin permanencia</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
