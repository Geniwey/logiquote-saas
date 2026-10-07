import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/lib/auth';
import { plans, faqs } from '@/lib/content';
import { easeOut, staggerContainer, staggerItem } from '@/lib/animations';

const heroImage = 'https://images.pexels.com/photos/4570835/pexels-photo-4570835.jpeg?auto=compress&cs=tinysrgb&w=1800';

const trustBadges = ['Incoterms 2020', 'Tarifas FCL / LCL / Aéreo', 'Exportación PDF', 'RGPD', 'Pagos con Stripe', 'Datos en la UE'];
const problemStats = [
  { value: '42 min', label: 'Tiempo medio en cotizar a mano' },
  { value: '3–4', label: 'Archivos distintos por cotización' },
  { value: '27%', label: 'Cotizaciones con errores manuales' },
];
const heroStats = [
  { value: '45s', label: 'Tiempo medio por cotización' },
  { value: '11', label: 'Incoterms soportados' },
  { value: 'FCL/LCL', label: 'Marítimo y aéreo' },
];
const tariffPreview = ['# TARIFARIO BASE', '## Costes LCL — Origen Asia', '45€/CBM · Mínimo 35 CBM', '', '## Aranceles', 'Despacho aduanero: 120€/op', 'DUA: 35€', '', '## Márgenes por Incoterm', 'EXW +18% · FOB +15% · CIF +12%', '', '## Recargos', 'THC 95€ · BAF 45€ · ISPS 12€'].join('\n');

export default function LandingPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [billingAnnual, setBillingAnnual] = useState(false);
  const [roiCotizaciones, setRoiCotizaciones] = useState(120);
  const [roiMinutos, setRoiMinutos] = useState(40);

  const handleDemoClick = () => {
    if (session) navigate('/cotizador/demo');
    else {
      setAuthMode('signup');
      setAuthOpen(true);
    }
  };

  const roiHours = Math.floor((roiCotizaciones * roiMinutos * 12) / 60);
  const heroStructured = { '@context': 'https://schema.org', '@type': 'WebSite', name: 'LogiQuote', url: 'https://logiquote.app' };
  const reveal = reduceMotion ? undefined : staggerContainer;
  const item = reduceMotion ? undefined : staggerItem;

  return (
    <>
      <SEO title="LogiQuote | Cotizaciones logísticas para transitarios" description="Calcula fletes, aranceles y márgenes en segundos. Software para transitarios y agentes de aduanas." canonical="https://logiquote.app/" structuredData={heroStructured} />
      <AuthModal open={authOpen} initialMode={authMode} onClose={() => setAuthOpen(false)} title={authMode === 'signup' ? 'Crear cuenta gratis para probar la demo' : 'Iniciar sesión'} />

      <div className="min-h-screen bg-bone">
        <Navbar />
        <main>
          <section className="relative overflow-hidden bg-navy min-h-[calc(100dvh-64px)]">
            <img src={heroImage} alt="Vista aérea de una terminal de contenedores" className="absolute inset-0 h-full w-full object-cover grayscale opacity-35" />
            <div className="absolute inset-0 bg-navy/75" />
            <div className="relative mx-auto grid max-w-7xl items-start gap-12 px-6 py-16 md:py-24 lg:grid-cols-12 lg:gap-10 lg:py-28">
              <motion.div initial="hidden" animate="visible" variants={reveal} className="lg:col-span-6 lg:pt-4">
                <motion.p variants={item} className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-blue-200">Cotizaciones logísticas para transitarios</motion.p>
                <motion.h1 variants={item} className="max-w-2xl text-5xl font-display font-semibold leading-[0.96] tracking-[-0.055em] text-white md:text-7xl">
                  Cotiza fletes en 30 segundos. Sin Excel.
                </motion.h1>
                <motion.p variants={item} className="mt-7 max-w-xl text-base leading-relaxed text-slate-200 md:text-lg">
                  El software que convierte tu tarifario privado en presupuestos profesionales para tus clientes, sin repetir cálculos ni buscar datos en cinco archivos.
                </motion.p>
                <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <button onClick={handleDemoClick} className="btn-primary">Probar gratis 14 días</button>
                  <Link to="/cotizador/demo" className="btn-hero-secondary">Ver una cotización de ejemplo</Link>
                </motion.div>
                <motion.p variants={item} className="mt-4 font-mono text-xs text-slate-300">Sin tarjeta · Cancela cuando quieras · Datos en la UE</motion.p>
                <motion.div variants={item} className="mt-14 grid max-w-xl grid-cols-3 border-t border-white/20 pt-6">
                  {heroStats.map((stat) => <div key={stat.label} className="pr-4"><p className="font-mono text-2xl font-semibold tabular-nums text-white md:text-3xl">{stat.value}</p><p className="mt-1 text-xs leading-tight text-slate-300">{stat.label}</p></div>)}
                </motion.div>
              </motion.div>

              <motion.div initial={{ opacity: 0, transform: reduceMotion ? 'none' : 'translateY(28px)' }} animate={{ opacity: 1, transform: 'translateY(0)' }} transition={{ duration: 0.4, ease: easeOut, delay: reduceMotion ? 0 : 0.18 }} className="lg:col-span-6 lg:pt-0">
                <QuotePanel />
              </motion.div>
            </div>
          </section>

          <section className="border-b border-line bg-white" aria-label="Compatibilidades">
            <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-6 py-7"><span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Compatible con</span>{trustBadges.map((badge) => <span key={badge} className="font-mono text-xs text-ink-muted">{badge}</span>)}</div>
          </section>

          <section className="bg-bone-200" aria-label="El problema">
            <div className="mx-auto grid max-w-7xl gap-16 px-6 py-32 lg:grid-cols-12">
              <motion.div variants={reveal} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-80px' }} className="lg:col-span-6">
                <motion.p variants={item} className="eyebrow mb-5">El problema</motion.p>
                <motion.h2 variants={item} className="max-w-xl text-4xl font-display font-semibold leading-[1.02] tracking-[-0.045em] text-ink md:text-5xl">Cada cotización manual te cuesta tiempo que no vuelve.</motion.h2>
                <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">Abres el tarifario, buscas el coste base, calculas el flete, sumas aranceles, aplicas el margen y redactas el correo. Repites. Cada día.</motion.p>
              </motion.div>
              <div className="lg:col-span-6 lg:pt-12">{problemStats.map((stat, index) => <motion.div key={stat.label} initial={{ opacity: 0, transform: 'translateY(14px)' }} whileInView={{ opacity: 1, transform: 'translateY(0)' }} viewport={{ once: true }} transition={{ duration: 0.4, ease: easeOut, delay: index * 0.07 }} className="flex items-baseline gap-6 border-t border-line py-7 last:border-b"><span className="w-32 shrink-0 font-mono text-4xl font-semibold tabular-nums text-ink">{stat.value}</span><span className="text-sm text-ink-muted">{stat.label}</span></motion.div>)}</div>
            </div>
          </section>

          <section id="como-funciona" className="bg-navy text-bone" aria-label="Cómo funciona">
            <div className="mx-auto max-w-7xl px-6 py-32">
              <div className="mb-20 max-w-2xl"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-blue-200">Cómo funciona</p><h2 className="text-4xl font-display font-semibold leading-[1.02] tracking-[-0.045em] text-white md:text-6xl">Tres pasos. Un flujo que tu equipo entiende.</h2></div>
              <div className="grid gap-16 lg:grid-cols-3">
                <ProcessStep number="01" title="Subes tu tarifario" copy="Costes FCL, LCL, aéreo, aranceles, recargos y márgenes. Todo queda en un único documento privado." code={tariffPreview} />
                <ProcessStep number="02" title="Tu cliente introduce la ruta" copy="Origen, destino, Incoterm y volumen. El formulario público está listo para compartir." code="ORIGEN       Shanghai\nDESTINO      Valencia\nINCOTERM     FOB\nVOLUMEN      3,8 CBM\n\nCALCULAR COTIZACIÓN" />
                <ProcessStep number="03" title="Recibes un presupuesto claro" copy="Flete, recargos, despacho y margen quedan organizados en un documento que puedes enviar." code="FLETE LCL        1.710€\nTHC + BAF + ISPS    152€\nDESPACHO            120€\nMARGEN FOB          297€\n────────────────────\nTOTAL             2.450€" />
              </div>
            </div>
          </section>

          <section className="bg-white" aria-label="Calculadora de ahorro">
            <div className="mx-auto grid max-w-7xl gap-16 px-6 py-32 lg:grid-cols-12 lg:items-start"><div className="lg:col-span-5"><p className="eyebrow mb-5">Pruébalo ahora</p><h2 className="max-w-lg text-4xl font-display font-semibold leading-[1.02] tracking-[-0.045em] text-ink md:text-5xl">Calcula una cotización de ejemplo.</h2><p className="mt-6 max-w-md text-lg leading-relaxed text-ink-muted">Introduce los datos y comprueba cómo se genera un presupuesto en tiempo real.</p></div><LiveCalculator onCta={handleDemoClick} /></div>
          </section>

          <section className="bg-bone-200" aria-label="Precios">
            <div className="mx-auto max-w-7xl px-6 py-32"><div className="mb-16 max-w-2xl"><p className="eyebrow mb-5">Precios</p><h2 className="text-4xl font-display font-semibold leading-[1.02] tracking-[-0.045em] text-ink md:text-6xl">Un precio claro. Sin trucos.</h2><p className="mt-5 text-lg text-ink-muted">Todos los planes incluyen 14 días gratis. Sin tarjeta.</p></div><div className="grid gap-0 border-y border-line md:grid-cols-3">{plans.map((plan) => <div key={plan.name} className={`border-b border-line p-8 md:border-b-0 md:border-r last:border-r-0 ${plan.highlighted ? 'bg-white' : ''}`}><p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">{plan.name}</p><p className="mt-6 font-mono text-5xl font-semibold tabular-nums text-ink">{billingAnnual ? plan.priceAnnual : plan.priceMonthly}<span className="text-base font-normal text-ink-muted"> €/mes</span></p><p className="mt-4 min-h-12 text-sm leading-relaxed text-ink-muted">{plan.description}</p><button onClick={() => { if (plan.name === 'Business') navigate('/contacto'); else if (!session) navigate('/login'); else setAuthOpen(true); }} className={`mt-8 w-full ${plan.highlighted ? 'btn-primary' : 'btn-secondary'}`}>{plan.cta}</button><ul className="mt-8 space-y-3">{plan.features.slice(0, 4).map((feature) => <li key={feature} className="border-t border-line-light pt-3 text-sm text-ink-muted">{feature}</li>)}</ul></div>)}</div><button onClick={() => setBillingAnnual((value) => !value)} className="mt-8 font-mono text-xs text-signal underline underline-offset-4">{billingAnnual ? 'Ver precio mensual' : 'Ver precio anual · ahorra 20%'}</button></div>
          </section>

          <section className="bg-navy text-white" aria-label="Preguntas frecuentes"><div className="mx-auto max-w-3xl px-6 py-32"><p className="mb-5 font-mono text-[10px] uppercase tracking-[0.18em] text-blue-200">FAQ</p><h2 className="mb-12 text-4xl font-display font-semibold leading-[1.02] tracking-[-0.045em] text-white md:text-6xl">Preguntas frecuentes.</h2><div className="border-t border-white/20">{faqs.slice(0, 5).map((faq, index) => <div key={faq.q} className="border-b border-white/20"><button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="flex w-full items-center justify-between py-6 text-left text-lg font-medium text-white"><span>{faq.q}</span><span className="font-mono text-blue-200">{openFaq === index ? '−' : '+'}</span></button><AnimatePresence initial={false}>{openFaq === index && <motion.div initial={{ opacity: 0, transform: 'translateY(-6px)' }} animate={{ opacity: 1, transform: 'translateY(0)' }} exit={{ opacity: 0, transform: 'translateY(-6px)' }} transition={{ duration: 0.2, ease: easeOut }} className="overflow-hidden pb-6 text-sm leading-relaxed text-slate-300">{faq.a}</motion.div>}</AnimatePresence></div>)}</div></div></section>

          <section className="bg-bone" aria-label="Llamada a la acción"><div className="mx-auto max-w-7xl px-6 py-32"><p className="eyebrow mb-5">Empieza hoy</p><h2 className="max-w-3xl text-5xl font-display font-semibold leading-[0.98] tracking-[-0.055em] text-ink md:text-7xl">Deja de cotizar a mano.</h2><p className="mt-7 max-w-xl text-lg leading-relaxed text-ink-muted">Sube tu tarifario y responde a tus clientes con un presupuesto claro en menos de un minuto.</p><button onClick={handleDemoClick} className="btn-primary mt-9">Probar gratis 14 días</button></div></section>
        </main>
        <Footer />
      </div>
    </>
  );
}

function QuotePanel() {
  return <div className="relative mx-auto max-w-xl border border-white/20 bg-white p-2 shadow-2xl"><div className="border border-line bg-white p-5 md:p-7"><div className="flex items-center justify-between border-b border-line pb-5"><div><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Cotización de importación</p><p className="mt-2 text-lg font-semibold text-ink">LQ-284901</p></div><span className="bg-emerald-50 px-2 py-1 font-mono text-[10px] text-emerald-700">GENERADA</span></div><div className="grid grid-cols-2 gap-3 py-6"><QuoteField label="ORIGEN" value="Shanghai" /><QuoteField label="DESTINO" value="Valencia" /><QuoteField label="INCOTERM" value="FOB" /><QuoteField label="VOLUMEN" value="3,8 CBM" /></div><div className="space-y-3 border-t border-line pt-5 font-mono text-xs"><QuoteLine label="Flete LCL" value="1.710€" /><QuoteLine label="THC + BAF + ISPS" value="152€" /><QuoteLine label="Despacho aduanero" value="120€" /><QuoteLine label="Margen FOB (+15%)" value="297€" /><QuoteLine label="TOTAL" value="2.450€" strong /></div></div><div className="absolute -bottom-5 left-8 border border-line bg-white px-4 py-3 shadow-lg"><p className="text-xs font-semibold text-ink">Nuevo lead capturado</p><p className="mt-1 font-mono text-[10px] text-ink-muted">m.torres@importsl.es</p></div></div>;
}

function QuoteField({ label, value }: { label: string; value: string }) { return <div className="border border-line bg-bone px-3 py-3"><p className="font-mono text-[9px] tracking-[0.14em] text-ink-muted">{label}</p><p className="mt-2 font-mono text-sm font-semibold text-ink">{value}</p></div>; }
function QuoteLine({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) { return <div className={`flex justify-between ${strong ? 'border-t border-line pt-4 text-base font-semibold' : ''}`}><span className={strong ? 'text-ink' : 'text-ink-muted'}>{label}</span><span className={strong ? 'text-signal' : 'text-ink'}>{value}</span></div>; }
function ProcessStep({ number, title, copy, code }: { number: string; title: string; copy: string; code: string }) { return <div><p className="font-mono text-6xl font-semibold tracking-[-0.08em] text-blue-200/60">{number}</p><h3 className="mt-5 text-2xl font-semibold tracking-tight text-white">{title}</h3><p className="mt-4 min-h-20 text-sm leading-relaxed text-slate-300">{copy}</p><pre className="mt-8 min-h-56 whitespace-pre-wrap border-t border-white/20 pt-5 font-mono text-xs leading-7 text-slate-300">{code}</pre></div>; }
function LiveCalculator({ onCta }: { onCta: () => void }) { const [origin, setOrigin] = useState('Shanghai'); const [destination, setDestination] = useState('Valencia'); const [incoterm, setIncoterm] = useState('FOB'); const [volume, setVolume] = useState('3.8'); const [result, setResult] = useState(2450); const calculate = () => { const amount = Math.max(0, Number(volume) || 0); const margin = incoterm === 'EXW' ? 1.18 : incoterm === 'DDP' ? 1.08 : incoterm === 'CIF' ? 1.12 : 1.15; setResult(Math.round((amount * 450 + 272) * margin)); }; return <div className="lg:col-span-7 border border-line bg-bone-200 p-7 md:p-9"><div className="grid gap-5 sm:grid-cols-2"><label className="label-field">Puerto de origen<input value={origin} onChange={(event) => setOrigin(event.target.value)} className="input-field mt-2" /></label><label className="label-field">Puerto de destino<input value={destination} onChange={(event) => setDestination(event.target.value)} className="input-field mt-2" /></label><label className="label-field">Incoterm<select value={incoterm} onChange={(event) => setIncoterm(event.target.value)} className="input-field mt-2">{['EXW', 'FOB', 'CIF', 'CFR', 'DAP', 'DDP'].map((term) => <option key={term}>{term}</option>)}</select></label><label className="label-field">Volumen (CBM)<input type="number" min="0" value={volume} onChange={(event) => setVolume(event.target.value)} className="input-field mt-2" /></label></div><button onClick={calculate} className="btn-primary mt-7 w-full">Calcular cotización</button><div className="mt-8 border-t border-line pt-6"><p className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-muted">Total estimado</p><p className="mt-2 font-mono text-5xl font-semibold tabular-nums text-ink">{result.toLocaleString('es-ES')}€</p><p className="mt-2 font-mono text-xs text-ink-muted">{origin} → {destination} · {volume} CBM · {incoterm}</p><button onClick={onCta} className="btn-secondary mt-6 w-full">Crea una cuenta para usar tu tarifario real</button></div></div>; }
