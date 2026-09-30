import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Ship,
  MapPin,
  Anchor,
  Package,
  Loader2,
  FileDown,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  Clock,
  AlertCircle,
  Container,
  Plane,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { supabase } from '@/lib/supabase';
import { generateQuote } from '@/lib/gemini';
import { useAuth } from '@/lib/auth';
import { useToast } from '@/components/Toast';
import { SEO } from '@/components/SEO';

interface QuoteForm {
  origin: string;
  destination: string;
  incoterm: string;
  volume: string;
}

type View = 'form' | 'loading' | 'result' | 'error';

const incoterms = ['EXW', 'FOB', 'CIF', 'CFR', 'DAP', 'DDP'];

export default function Cotizador() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [view, setView] = useState<View>('form');
  const [form, setForm] = useState<QuoteForm>({
    origin: '',
    destination: '',
    incoterm: 'FOB',
    volume: '',
  });
  const [errors, setErrors] = useState<Partial<QuoteForm>>({});
  const [quoteText, setQuoteText] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const validate = (): boolean => {
    const newErrors: Partial<QuoteForm> = {};
    if (!form.origin.trim()) newErrors.origin = 'Indica el puerto de origen';
    if (!form.destination.trim()) newErrors.destination = 'Indica el puerto de destino';
    if (!form.volume.trim() || parseFloat(form.volume) <= 0)
      newErrors.volume = 'Indica un volumen valido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setView('loading');
    setErrorMsg('');

    try {
      if (!user) {
        throw new Error('Debes iniciar sesion para usar el cotizador.');
      }

      const { data, error: dbError } = await supabase
        .from('empresas')
        .select('tarifario')
        .eq('user_id', user.id)
        .maybeSingle();

      if (dbError) throw new Error('Error al leer el tarifario desde la base de datos.');
      if (!data?.tarifario) {
        throw new Error('El tarifario esta vacio. Ve al panel de control y guarda tu tarifario antes de cotizar.');
      }

      const aiResponse = await generateQuote(
        data.tarifario,
        form.origin,
        form.destination,
        form.volume,
        form.incoterm,
      );

      setQuoteText(aiResponse);
      setView('result');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Ocurrio un error inesperado al generar la cotizacion.';
      setErrorMsg(message);
      setView('error');
    }
  };

  const handleReset = () => {
    setForm({ origin: '', destination: '', incoterm: 'FOB', volume: '' });
    setQuoteText('');
    setErrorMsg('');
    setView('form');
  };

  const quoteRef = `LQ-${Date.now().toString().slice(-6)}`;

  return (
    <>
      <SEO
        title="Cotizador Demo | LogiQuote"
        description="Prueba nuestro cotizador logístico con IA. Introduce origen, destino, volumen e Incoterm y recibe un presupuesto instantáneo."
      />

      <div className="min-h-screen bg-slate-50">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
            <Logo size="sm" />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
          </div>
        </header>

        <main className="mx-auto max-w-3xl px-6 py-12">
          {/* Form View */}
          {view === 'form' && (
            <div className="animate-fade-in-up">
              <div className="mb-12 text-center">
                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2 text-xs font-medium text-brand-700">
                  <Calculator className="h-3.5 w-3.5" />
                  Cotizacion instantanea con IA
                </div>
                <h1 className="text-4xl font-bold tracking-tight text-slate-900">
                  Calcula tu cotizacion
                </h1>
                <p className="mx-auto mt-4 max-w-xl text-slate-500 leading-relaxed">
                  Introduce los datos de tu mercancia y nuestra IA generara una cotizacion completa en segundos.
                </p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft-lg md:p-10"
              >
                <div className="grid gap-7 sm:grid-cols-2">
                  {/* Origin */}
                  <div>
                    <label className="mb-2.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <MapPin className="h-4 w-4 text-brand-600" />
                      Puerto de Origen
                    </label>
                    <input
                      type="text"
                      value={form.origin}
                      onChange={(e) => setForm({ ...form, origin: e.target.value })}
                      placeholder="Shanghai, China"
                      className={`input-glow w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 ${
                        errors.origin ? 'border-red-400' : 'border-slate-200'
                      }`}
                    />
                    {errors.origin && <p className="mt-2 text-xs text-red-500">{errors.origin}</p>}
                  </div>

                  {/* Destination */}
                  <div>
                    <label className="mb-2.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Anchor className="h-4 w-4 text-brand-600" />
                      Puerto de Destino
                    </label>
                    <input
                      type="text"
                      value={form.destination}
                      onChange={(e) => setForm({ ...form, destination: e.target.value })}
                      placeholder="Valencia, Espana"
                      className={`input-glow w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 ${
                        errors.destination ? 'border-red-400' : 'border-slate-200'
                      }`}
                    />
                    {errors.destination && (
                      <p className="mt-2 text-xs text-red-500">{errors.destination}</p>
                    )}
                  </div>

                  {/* Incoterm */}
                  <div className="sm:col-span-2">
                    <label className="mb-2.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Ship className="h-4 w-4 text-brand-600" />
                      Incoterm
                    </label>
                    <div className="grid grid-cols-3 gap-2.5 sm:grid-cols-6">
                      {incoterms.map((term) => (
                        <button
                          key={term}
                          type="button"
                          onClick={() => setForm({ ...form, incoterm: term })}
                          className={`rounded-xl border py-3 text-sm font-semibold transition-all duration-300 ${
                            form.incoterm === term
                              ? 'border-brand-500 bg-brand-50 text-brand-700 shadow-soft'
                              : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-700'
                          }`}
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Volume */}
                  <div className="sm:col-span-2">
                    <label className="mb-2.5 flex items-center gap-2 text-sm font-medium text-slate-700">
                      <Package className="h-4 w-4 text-brand-600" />
                      Volumen (CBM)
                    </label>
                    <input
                      type="number"
                      value={form.volume}
                      onChange={(e) => setForm({ ...form, volume: e.target.value })}
                      placeholder="500"
                      min="0"
                      className={`input-glow w-full rounded-xl border bg-white px-4 py-3.5 text-sm text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 ${
                        errors.volume ? 'border-red-400' : 'border-slate-200'
                      }`}
                    />
                    {errors.volume && <p className="mt-2 text-xs text-red-500">{errors.volume}</p>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="group btn-glow mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-brand-700"
                >
                  <Calculator className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  Calcular Cotizacion Inteligente
                </button>

                <div className="mt-6 flex items-center justify-center gap-6 text-xs text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Tarifas privadas protegidas
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    Respuesta en segundos
                  </span>
                </div>
              </form>
            </div>
          )}

          {/* Loading View */}
          {view === 'loading' && (
            <div className="animate-fade-in flex min-h-[60vh] flex-col items-center justify-center text-center">
              <div className="relative mb-10">
                <div className="absolute inset-0 animate-ping rounded-full bg-brand-200/30" />
                <div className="absolute inset-0 animate-pulse rounded-full bg-brand-100/20 blur-xl" />
                <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-brand-200 bg-brand-50">
                  <Loader2 className="h-10 w-10 animate-spin text-brand-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Analizando rutas y tarifas...</h2>
              <p className="mt-3 text-sm text-slate-500">
                La IA esta consultando el tarifario y calculando tu cotizacion personalizada.
              </p>

              <div className="mt-10 w-full max-w-sm flex flex-col gap-2.5 text-left">
                <LoadingStep label="Leyendo tarifario desde la base de datos" delay={0} />
                <LoadingStep label="Procesando datos con IA" delay={800} />
                <LoadingStep label="Calculando flete, aranceles y margenes" delay={1600} />
                <LoadingStep label="Estructurando el presupuesto final" delay={2500} />
              </div>
            </div>
          )}

          {/* Error View */}
          {view === 'error' && (
            <div className="animate-fade-in-up flex min-h-[60vh] flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-200 bg-red-50">
                <AlertCircle className="h-8 w-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">No se pudo generar la cotizacion</h2>
              <p className="mt-3 max-w-md text-sm text-slate-500">{errorMsg}</p>
              <button
                onClick={handleReset}
                className="mt-8 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 shadow-soft transition-all duration-300 hover:border-slate-300 hover:shadow-soft-lg"
              >
                <ArrowLeft className="h-5 w-5" />
                Volver al formulario
              </button>
            </div>
          )}

          {/* Result View */}
          {view === 'result' && (
            <div className="animate-fade-in-up">
              {/* Success banner */}
              <div className="mb-8 flex items-center gap-4 rounded-2xl border border-brand-200 bg-brand-50 p-5">
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-brand-100 ring-1 ring-brand-200">
                  <CheckCircle2 className="h-6 w-6 text-brand-600" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900">Cotizacion generada con exito</p>
                  <p className="text-sm text-slate-500">
                    Ref: <span className="font-mono text-brand-600">{quoteRef}</span> · Generada por IA · Valida por 15 dias
                  </p>
                </div>
              </div>

              {/* Quote document */}
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft-xl">
                {/* Document header */}
                <div className="flex items-start justify-between border-b border-slate-200 bg-slate-50/60 px-10 py-8">
                  <div>
                    <div className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Cotizacion de Importacion
                    </div>
                    <h2 className="text-2xl font-bold tracking-tight text-slate-900">TransitCargo SL</h2>
                    <p className="text-sm text-slate-500">Transitaria Internacional · CIF B12345678</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">Nº de referencia</p>
                    <p className="font-mono text-sm font-bold text-slate-900">{quoteRef}</p>
                    <p className="mt-3 text-xs text-slate-400">Fecha de emision</p>
                    <p className="text-sm text-slate-700">
                      {new Date().toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>

                {/* Route summary */}
                <div className="border-b border-slate-200 bg-slate-50/40 px-10 py-8">
                  <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                    <RouteInfo icon={MapPin} label="Origen" value={form.origin} />
                    <RouteInfo icon={Anchor} label="Destino" value={form.destination} />
                    <RouteInfo icon={Ship} label="Incoterm" value={form.incoterm} />
                    <RouteInfo icon={Package} label="Volumen" value={`${form.volume} CBM`} />
                  </div>

                  {/* Route visualization */}
                  <div className="mt-6 flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4">
                    <MapPin className="h-5 w-5 flex-shrink-0 text-brand-600" />
                    <span className="text-sm font-medium text-slate-700">{form.origin}</span>
                    <div className="flex flex-1 items-center gap-1.5 px-3">
                      <div className="h-px flex-1 bg-gradient-to-r from-brand-300 to-brand-500" />
                      <Container className="h-4 w-4 text-brand-500" />
                      <div className="h-px flex-1 bg-gradient-to-r from-brand-500 to-brand-300" />
                    </div>
                    <Anchor className="h-5 w-5 flex-shrink-0 text-brand-600" />
                    <span className="text-sm font-medium text-slate-700">{form.destination}</span>
                  </div>
                </div>

                {/* AI-generated content */}
                <div className="px-10 py-8">
                  <div className="mb-5 flex items-center gap-2">
                    <Calculator className="h-5 w-5 text-brand-600" />
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
                      Presupuesto generado por IA
                    </h3>
                  </div>
                  <div className="whitespace-pre-wrap text-sm leading-relaxed text-slate-700">
                    {quoteText}
                  </div>
                </div>

                {/* Document footer */}
                <div className="border-t border-slate-200 bg-slate-50/60 px-10 py-6">
                  <p className="text-xs leading-relaxed text-slate-400">
                    Esta cotizacion ha sido generada automaticamente por LogiQuote mediante IA
                    y es orientativa. Para confirmar la reserva, contacta con tu transitaria. Cotizacion valida
                    15 dias desde la fecha de emision.
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => showToast('Exportación PDF disponible próximamente', 'info')}
                  className="group btn-glow inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-7 py-4 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800"
                >
                  <FileDown className="h-5 w-5 transition-transform duration-300 group-hover:translate-y-0.5" />
                  Descargar PDF
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-4 text-sm font-semibold text-slate-700 shadow-soft transition-all duration-300 hover:border-slate-300 hover:shadow-soft-lg"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Nueva cotizacion
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

function LoadingStep({ label, delay }: { label: string; delay: number }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), delay);
    return () => clearTimeout(t);
  }, [delay]);

  return (
    <div className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all duration-500 ${
      done ? 'border-brand-200 bg-brand-50' : 'border-slate-200 bg-white'
    }`}>
      {done ? (
        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-brand-600" />
      ) : (
        <Loader2 className="h-4 w-4 flex-shrink-0 animate-spin text-slate-400" />
      )}
      <span className={`text-sm transition-colors duration-500 ${done ? 'text-slate-700' : 'text-slate-400'}`}>
        {label}
      </span>
    </div>
  );
}

function RouteInfo({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof MapPin;
  label: string;
  value: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-1.5 text-xs text-slate-400">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </div>
      <p className="truncate text-sm font-semibold text-slate-900">{value}</p>
    </div>
  );
}
