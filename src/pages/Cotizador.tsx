import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Ship, MapPin, Anchor, Package, Loader2, FileDown, ArrowLeft,
  CheckCircle2, ShieldCheck, Clock, AlertCircle, Container, Calculator,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { supabase } from '@/lib/supabase';
import { generateQuote } from '@/lib/gemini';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/Toast';
import { SEO } from '@/components/SEO';
import { easeOut, staggerContainer, staggerItem } from '@/lib/animations';

interface QuoteForm { origin: string; destination: string; incoterm: string; volume: string; }
type View = 'form' | 'loading' | 'result' | 'error';
const incoterms = ['EXW', 'FOB', 'CIF', 'CFR', 'DAP', 'DDP'];

export default function Cotizador() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [view, setView] = useState<View>('form');
  const [form, setForm] = useState<QuoteForm>({ origin: '', destination: '', incoterm: 'FOB', volume: '' });
  const [errors, setErrors] = useState<Partial<QuoteForm>>({});
  const [quoteText, setQuoteText] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const validate = (): boolean => {
    const e: Partial<QuoteForm> = {};
    if (!form.origin.trim()) e.origin = 'Indica el puerto de origen';
    if (!form.destination.trim()) e.destination = 'Indica el puerto de destino';
    if (!form.volume.trim() || parseFloat(form.volume) <= 0) e.volume = 'Indica un volumen válido';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setView('loading');
    setErrorMsg('');
    try {
      if (!user) throw new Error('Debes iniciar sesión para usar el cotizador.');
      const { data, error: dbError } = await supabase.from('empresas').select('tarifario').eq('user_id', user.id).maybeSingle();
      if (dbError) throw new Error('Error al leer el tarifario desde la base de datos.');
      if (!data?.tarifario) throw new Error('El tarifario está vacío. Ve al panel de control y guarda tu tarifario antes de cotizar.');
      const aiResponse = await generateQuote(data.tarifario, form.origin, form.destination, form.volume, form.incoterm);
      setQuoteText(aiResponse);
      setView('result');
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : 'Ocurrió un error inesperado al generar la cotización.');
      setView('error');
    }
  };

  const handleReset = () => {
    setForm({ origin: '', destination: '', incoterm: 'FOB', volume: '' });
    setQuoteText(''); setErrorMsg(''); setView('form');
  };

  const quoteRef = `LQ-${Date.now().toString().slice(-6)}`;

  return (
    <>
      <SEO title="Cotizador | LogiQuote" description="Calcula cotizaciones logísticas con IA. Introduce origen, destino, Incoterm y volumen." />
      <div className="min-h-screen bg-bone">
        <header className="border-b border-line bg-white/80 backdrop-blur-xl">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Logo size="sm" />
            <Link to="/dashboard" className="btn-ghost"><ArrowLeft className="h-4 w-4" /> Volver al panel</Link>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-12">
          <AnimatePresence mode="wait">
            {view === 'form' && (
              <motion.div
                key="form"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -10 }}
                className="animate-fade-up"
              >
                <motion.div variants={staggerItem} className="mb-12">
                  <p className="text-xs font-mono text-signal uppercase tracking-wider mb-3">Cotizador con IA</p>
                  <h1 className="text-4xl font-display font-bold tracking-tighter text-ink">Calcula tu cotización</h1>
                  <p className="mt-4 max-w-xl text-ink-muted leading-relaxed">
                    Introduce los datos de tu mercancía. La IA leerá tu tarifario y generará un presupuesto completo en segundos.
                  </p>
                </motion.div>

                <motion.form
                  variants={staggerItem}
                  onSubmit={handleSubmit}
                  className="bg-white border border-line p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                  style={{ borderRadius: '8px' }}
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="label-field">Puerto de origen</label>
                      <input type="text" value={form.origin} onChange={(e) => setForm({ ...form, origin: e.target.value })} placeholder="Shanghai" className={`input-field ${errors.origin ? 'border-error' : ''}`} />
                      {errors.origin && <p className="mt-1.5 text-xs text-error">{errors.origin}</p>}
                    </div>
                    <div>
                      <label className="label-field">Puerto de destino</label>
                      <input type="text" value={form.destination} onChange={(e) => setForm({ ...form, destination: e.target.value })} placeholder="Valencia" className={`input-field ${errors.destination ? 'border-error' : ''}`} />
                      {errors.destination && <p className="mt-1.5 text-xs text-error">{errors.destination}</p>}
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label-field">Incoterm</label>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                        {incoterms.map((term) => (
                          <motion.button
                            key={term}
                            type="button"
                            whileTap={{ scale: 0.96 }}
                            onClick={() => setForm({ ...form, incoterm: term })}
                            className={`py-2.5 text-sm font-mono font-semibold transition-all duration-200 border ${form.incoterm === term ? 'border-signal bg-signal-bg text-signal' : 'border-line bg-white text-ink-muted hover:border-line-dark hover:text-ink'}`}
                            style={{ borderRadius: '6px' }}
                          >
                            {term}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="label-field">Volumen (CBM)</label>
                      <input type="number" value={form.volume} onChange={(e) => setForm({ ...form, volume: e.target.value })} placeholder="3.8" min="0" className={`input-field ${errors.volume ? 'border-error' : ''}`} />
                      {errors.volume && <p className="mt-1.5 text-xs text-error">{errors.volume}</p>}
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    transition={{ duration: 0.2, ease: easeOut }}
                    className="btn-primary w-full mt-8 py-4"
                  >
                    <Calculator className="h-5 w-5" /> Calcular cotización
                  </motion.button>

                  <div className="mt-6 flex items-center justify-center gap-6 text-xs text-ink-muted font-mono">
                    <span className="flex items-center gap-1.5"><ShieldCheck className="h-3.5 w-3.5" /> Tarifas privadas</span>
                    <span className="flex items-center gap-1.5"><Clock className="h-3.5 w-3.5" /> Respuesta en segundos</span>
                  </div>
                </motion.form>
              </motion.div>
            )}

            {view === 'loading' && (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[60vh] flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.4, ease: easeOut }}
                  className="flex h-16 w-16 items-center justify-center border border-line bg-white mb-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                  style={{ borderRadius: '8px' }}
                >
                  <Loader2 className="h-6 w-6 animate-spin text-signal" />
                </motion.div>
                <h2 className="text-2xl font-display font-bold tracking-tight text-ink">Analizando rutas y tarifas...</h2>
                <p className="mt-3 text-sm text-ink-muted">La IA está consultando tu tarifario y calculando la cotización.</p>
                <div className="mt-10 w-full max-w-sm flex flex-col gap-2 text-left">
                  <LoadingStep label="Leyendo tarifario desde la base de datos" delay={0} />
                  <LoadingStep label="Procesando datos con IA" delay={800} />
                  <LoadingStep label="Calculando flete, aranceles y márgenes" delay={1600} />
                  <LoadingStep label="Estructurando el presupuesto final" delay={2500} />
                </div>
              </motion.div>
            )}

            {view === 'error' && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex min-h-[60vh] flex-col items-center justify-center text-center"
              >
                <div className="flex h-14 w-14 items-center justify-center border border-error bg-error-bg mb-6" style={{ borderRadius: '8px' }}>
                  <AlertCircle className="h-6 w-6 text-error" />
                </div>
                <h2 className="text-2xl font-display font-bold tracking-tight text-ink">No se pudo generar la cotización</h2>
                <p className="mt-3 max-w-md text-sm text-ink-muted">{errorMsg}</p>
                <button onClick={handleReset} className="btn-secondary mt-8"><ArrowLeft className="h-4 w-4" /> Volver al formulario</button>
              </motion.div>
            )}

            {view === 'result' && (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="animate-fade-up"
              >
                <div className="mb-8 flex items-center gap-4 border border-success bg-success-bg p-5" style={{ borderRadius: '8px' }}>
                  <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-success" />
                  <div>
                    <p className="font-semibold text-ink">Cotización generada</p>
                    <p className="text-sm text-ink-muted font-mono">Ref: {quoteRef} · Generada por IA · Válida 15 días</p>
                  </div>
                </div>

                <div className="bg-white border border-line overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]" style={{ borderRadius: '8px' }}>
                  <div className="flex items-start justify-between border-b border-line bg-bone/50 px-10 py-8">
                    <div>
                      <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-2">Cotización de importación</p>
                      <h2 className="text-2xl font-display font-bold tracking-tight text-ink">Tu Empresa SL</h2>
                      <p className="text-sm text-ink-muted">Transitaria Internacional</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-ink-muted">Nº referencia</p>
                      <p className="font-mono text-sm font-bold text-ink">{quoteRef}</p>
                      <p className="mt-3 text-xs text-ink-muted">Fecha emisión</p>
                      <p className="text-sm text-ink font-mono">{new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>

                  <div className="border-b border-line bg-bone/30 px-10 py-8">
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                      <RouteInfo icon={MapPin} label="Origen" value={form.origin} />
                      <RouteInfo icon={Anchor} label="Destino" value={form.destination} />
                      <RouteInfo icon={Ship} label="Incoterm" value={form.incoterm} />
                      <RouteInfo icon={Package} label="Volumen" value={`${form.volume} CBM`} />
                    </div>
                    <div className="mt-6 flex items-center gap-3 border border-line bg-white px-5 py-4" style={{ borderRadius: '6px' }}>
                      <MapPin className="h-4 w-4 flex-shrink-0 text-signal" />
                      <span className="text-sm font-mono font-medium text-ink">{form.origin}</span>
                      <div className="flex flex-1 items-center gap-1.5 px-3"><div className="h-px flex-1 bg-line" /><Container className="h-4 w-4 text-ink-muted" /><div className="h-px flex-1 bg-line" /></div>
                      <Anchor className="h-4 w-4 flex-shrink-0 text-signal" />
                      <span className="text-sm font-mono font-medium text-ink">{form.destination}</span>
                    </div>
                  </div>

                  <div className="px-10 py-8">
                    <div className="mb-5 flex items-center gap-2">
                      <Calculator className="h-4 w-4 text-signal" />
                      <h3 className="text-xs font-mono text-ink-muted uppercase tracking-wider">Presupuesto generado por IA</h3>
                    </div>
                    <div className="whitespace-pre-wrap text-sm leading-relaxed text-ink-muted font-mono">{quoteText}</div>
                  </div>

                  <div className="border-t border-line bg-bone/30 px-10 py-6">
                    <p className="text-xs leading-relaxed text-ink-muted">
                      Esta cotización ha sido generada automáticamente por LogiQuote mediante IA y es orientativa.
                      Para confirmar la reserva, contacta con tu transitaria. Cotización válida 15 días desde la fecha de emisión.
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                  <button onClick={() => showToast('Exportación PDF disponible próximamente', 'info')} className="btn-primary py-4">
                    <FileDown className="h-4 w-4" /> Descargar PDF
                  </button>
                  <button onClick={handleReset} className="btn-secondary py-4"><ArrowLeft className="h-4 w-4" /> Nueva cotización</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </>
  );
}

function LoadingStep({ label, delay }: { label: string; delay: number }) {
  const [done, setDone] = useState(false);
  useEffect(() => { const t = setTimeout(() => setDone(true), delay); return () => clearTimeout(t); }, [delay]);
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      className={`flex items-center gap-3 border px-4 py-3 transition-all duration-300 ${done ? 'border-success bg-success-bg' : 'border-line bg-white'}`}
      style={{ borderRadius: '6px' }}
    >
      {done ? <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-success" /> : <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin text-ink-muted" />}
      <span className={`text-sm font-mono transition-colors duration-300 ${done ? 'text-ink' : 'text-ink-muted'}`}>{label}</span>
    </motion.div>
  );
}

function RouteInfo({ icon: Icon, label, value }: { icon: typeof MapPin; label: string; value: string }) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-xs text-ink-muted font-mono"><Icon className="h-3.5 w-3.5" /> {label}</div>
      <p className="truncate text-sm font-mono font-semibold text-ink">{value}</p>
    </div>
  );
}
