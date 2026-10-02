import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Check,
  Calculator,
  FileText,
  Link2,
  TrendingUp,
  Minus,
  Plus,
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/lib/auth';
import { plans, faqs, useCases, siteConfig } from '@/lib/content';

const HERO_IMAGE = 'https://images.pexels.com/photos/24702864/pexels-photo-24702864.jpeg?auto=compress&cs=tinysrgb&w=1200';
const PROBLEM_IMAGE = 'https://images.pexels.com/photos/9716365/pexels-photo-9716365.jpeg?auto=compress&cs=tinysrgb&w=800';
const STEP2_IMAGE = 'https://images.pexels.com/photos/34024846/pexels-photo-34024846.jpeg?auto=compress&cs=tinysrgb&w=800';

const TARIFF_PREVIEW = [
  '# TARIFARIO BASE',
  '## Costes LCL — Origen Asia',
  '45€/CBM · Mínimo 35 CBM',
  '',
  '## Aranceles',
  'Despacho aduanero: 120€/op',
  'DUA: 35€',
  '',
  '## Margenes por Incoterm',
  'EXW +18% · FOB +15% · CIF +12%',
  '',
  '## Recargos',
  'THC 95€ · BAF 45€ · ISPS 12€',
].join('\n');

const trustBadges = [
  'Incoterms 2020',
  'Tarifas FCL / LCL / Aéreo',
  'Exportación a Excel y PDF',
  'RGPD',
  'Pagos con Stripe',
  'Alojamiento en la UE',
];

const problemStats = [
  { value: '42 min', label: 'Tiempo medio en cotizar a mano (Excel + correo)' },
  { value: '3-4', label: 'Archivos distintos por cotización (tarifario, cálculo, presupuesto)' },
  { value: '27%', label: 'Cotizaciones con errores de cálculo manual' },
];

const productBlocks = [
  {
    icon: Calculator,
    title: 'Calculadora de cotización con IA',
    desc: 'Introduce origen, destino, Incoterm y volumen. La IA lee tu tarifario y devuelve un presupuesto completo en segundos: flete, aranceles, recargos y margen.',
    metric: 'De 42 minutos a 45 segundos.',
    imageLeft: true,
  },
  {
    icon: FileText,
    title: 'Tarifario propio, privado y editable',
    desc: 'Sube tus costes base de LCL, aranceles y márgenes por Incoterm. Lo editas cuando quieras. Nadie más ve tus precios.',
    metric: 'Un tarifario. Todas tus cotizaciones consistentes.',
    imageLeft: false,
  },
  {
    icon: Link2,
    title: 'Enlace público de captación de leads',
    desc: 'Te damos una URL donde tus clientes entran y se auto-cotizan. Cada consulta captura su email. Tú solo cierras el trato.',
    metric: 'Leads entrando mientras duermes.',
    imageLeft: true,
  },
  {
    icon: TrendingUp,
    title: 'Panel de analítica y control',
    desc: 'Cotizaciones del mes, leads capturados, tasa de conversión. Todo en un panel claro con cifras en monoespaciado.',
    metric: 'Mide lo que importa, no lo que lucía.',
    imageLeft: false,
  },
];

export default function LandingPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
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

  const roiSavings = roiCotizaciones * roiMinutos * 12;
  const roiHours = Math.floor(roiSavings / 60);

  const heroStructured = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'LogiQuote',
    url: 'https://logiquote.app',
  };

  return (
    <>
      <SEO
        title="LogiQuote | Software de cotizaciones logísticas para transitarios"
        description="Calcula flete marítimo, aranceles y márgenes en minutos con IA. Software para transitarios y agentes de aduanas en España. Prueba gratis 14 días."
        canonical="https://logiquote.app/"
        structuredData={heroStructured}
      />

      <AuthModal
        open={authOpen}
        initialMode={authMode}
        onClose={() => setAuthOpen(false)}
        title={authMode === 'signup' ? 'Crear cuenta gratis para probar la demo' : 'Iniciar sesión'}
      />

      <div className="min-h-screen bg-bone">
        <Navbar />

        <main>
          {/* ─── Hero ─── */}
          <section className="relative border-b border-line">
            <div className="mx-auto max-w-9xl px-6 py-16 md:py-24">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                {/* Left */}
                <div className="lg:col-span-6">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-extrabold tracking-tight-hero text-ink leading-[1.05]">
                    Cotiza importaciones y exportaciones en minutos, no en horas.
                  </h1>
                  <p className="mt-6 text-lg text-ink-light leading-relaxed max-w-xl">
                    El software que lee tu tarifario y genera cotizaciones profesionales con IA.
                    Para transitarios y agentes de aduanas que no pueden esperar tres días para responder a un cliente.
                  </p>

                  <div className="mt-8 flex flex-col sm:flex-row gap-3">
                    <button onClick={handleDemoClick} className="btn-primary">
                      Probar gratis 14 días
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <Link to="/cotizador/demo" className="btn-secondary">
                      Ver una cotización de ejemplo
                    </Link>
                  </div>

                  <p className="mt-4 text-sm text-ink-muted font-mono">
                    Sin tarjeta · Cancela cuando quieras · Datos en la UE
                  </p>

                  {/* Microdatos */}
                  <div className="mt-10 grid grid-cols-3 gap-6 border-t border-line pt-8">
                    <div>
                      <p className="text-3xl font-mono font-semibold text-ink">45s</p>
                      <p className="text-xs text-ink-muted mt-1">Tiempo medio por cotización</p>
                    </div>
                    <div>
                      <p className="text-3xl font-mono font-semibold text-ink">11</p>
                      <p className="text-xs text-ink-muted mt-1">Incoterms 2020 soportados</p>
                    </div>
                    <div>
                      <p className="text-3xl font-mono font-semibold text-ink">FCL/LCL</p>
                      <p className="text-xs text-ink-muted mt-1">Marítimo y aéreo</p>
                    </div>
                  </div>
                </div>

                {/* Right - product mockup on photo */}
                <div className="lg:col-span-6">
                  <div className="relative">
                    <img
                      src={HERO_IMAGE}
                      alt="Buque portacontenedores descargando mercancía en el puerto de Hamburgo con grúas de carga"
                      width={1200}
                      height={800}
                      className="w-full h-[400px] lg:h-[520px] object-cover"
                      style={{ borderRadius: '6px' }}
                      loading="eager"
                    />
                    {/* Browser frame overlay */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white border border-line shadow-lg" style={{ borderRadius: '6px' }}>
                      <div className="flex items-center gap-2 border-b border-line px-4 py-2.5">
                        <div className="flex gap-1.5">
                          <div className="h-2.5 w-2.5 rounded-full bg-line-dark" />
                          <div className="h-2.5 w-2.5 rounded-full bg-line-dark" />
                          <div className="h-2.5 w-2.5 rounded-full bg-line-dark" />
                        </div>
                        <span className="text-xs font-mono text-ink-muted ml-2">logiquote.app/cotizador</span>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs font-mono text-ink-muted">REF: LQ-284901</span>
                          <span className="text-xs font-mono text-success">Cotización generada</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <p className="text-xs text-ink-muted">Ruta</p>
                            <p className="font-mono font-medium text-ink">Shanghai → Valencia</p>
                          </div>
                          <div>
                            <p className="text-xs text-ink-muted">Contenedor</p>
                            <p className="font-mono font-medium text-ink">40' HC · FOB</p>
                          </div>
                          <div>
                            <p className="text-xs text-ink-muted">Volumen</p>
                            <p className="font-mono font-medium text-ink">3,8 CBM</p>
                          </div>
                          <div>
                            <p className="text-xs text-ink-muted">Plazo de tránsito</p>
                            <p className="font-mono font-medium text-ink">28 días</p>
                          </div>
                        </div>
                        <div className="mt-3 pt-3 border-t border-line flex items-center justify-between">
                          <span className="text-sm font-medium text-ink">Total cotizado</span>
                          <span className="text-2xl font-mono font-bold text-signal">2.450 €</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Trust strip ─── */}
          <section className="border-b border-line bg-white">
            <div className="mx-auto max-w-9xl px-6 py-8">
              <p className="text-xs font-mono text-ink-muted mb-4 text-center">Compatible con</p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {trustBadges.map((badge) => (
                  <span key={badge} className="text-sm font-mono text-ink-light">{badge}</span>
                ))}
              </div>
            </div>
          </section>

          {/* ─── The Problem ─── */}
          <section className="border-b border-line">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                  <img
                    src={PROBLEM_IMAGE}
                    alt="Vista aérea de contenedores apilados en un terminal portuario logístico"
                    width={800}
                    height={600}
                    className="w-full h-[300px] lg:h-[420px] object-cover"
                    style={{ borderRadius: '6px' }}
                    loading="lazy"
                  />
                </div>
                <div className="lg:col-span-7 lg:pl-8">
                  <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">El problema</p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-ink leading-tight">
                    Un transitario pierde media hora en cada cotización.
                  </h2>
                  <p className="mt-6 text-lg text-ink-light leading-relaxed">
                    Abres el tarifario en PDF, buscas el coste base en Excel, calculas el flete a mano,
                    sumas aranceles, aplicas el margen según el Incoterm, redactas el correo, adjuntas el presupuesto.
                    Repites. Cada día. Cada consulta. Cada cliente que quiere saber «¿cuánto me costaría traer esto de China?».
                  </p>
                  <p className="mt-4 text-lg text-ink-light leading-relaxed">
                    Y mientras tanto, tu competencia ya respondió.
                  </p>

                  <div className="mt-10 space-y-6">
                    {problemStats.map((stat) => (
                      <div key={stat.label} className="flex items-baseline gap-6 border-t border-line pt-4">
                        <span className="text-4xl font-mono font-bold text-ink flex-shrink-0 w-28">{stat.value}</span>
                        <span className="text-sm text-ink-muted">{stat.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── How it works ─── */}
          <section id="como-funciona" className="border-b border-line bg-white">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="mb-16">
                <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Cómo funciona</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-ink">Tres pasos. Sin fricción.</h2>
              </div>

              <div className="space-y-16">
                {/* Step 1 */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5">
                    <span className="text-6xl font-mono font-bold text-line-dark block mb-4">01</span>
                    <h3 className="text-2xl font-display font-semibold text-ink mb-3">Subes tu tarifario base</h3>
                    <p className="text-ink-light leading-relaxed">
                      Introduces tus costes de LCL, FCL y aéreo. Aranceles por origen. Recargos portuarios (THC, BAF, ISPS).
                      Márgenes por Incoterm. Lo guardas una vez y la IA lo usa como referencia exclusiva para cada cotización.
                    </p>
                    <p className="mt-4 text-sm font-mono text-ink-muted">~10 minutos de configuración inicial.</p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="bg-ink rounded p-1" style={{ borderRadius: '6px' }}>
                      <div className="bg-navy-deep p-5 font-mono text-sm leading-relaxed overflow-x-auto scrollbar-thin" style={{ borderRadius: '4px' }}>
                        <pre className="text-white/80 whitespace-pre">{TARIFF_PREVIEW}</pre>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-7 lg:order-1 order-2">
                    <img
                      src={STEP2_IMAGE}
                      alt="Grúas de contenedores operando en el puerto de Bremerhaven"
                      width={800}
                      height={550}
                      className="w-full h-[280px] lg:h-[360px] object-cover"
                      style={{ borderRadius: '6px' }}
                      loading="lazy"
                    />
                  </div>
                  <div className="lg:col-span-5 lg:order-2 order-1">
                    <span className="text-6xl font-mono font-bold text-line-dark block mb-4">02</span>
                    <h3 className="text-2xl font-display font-semibold text-ink mb-3">La IA cotiza por ti</h3>
                    <p className="text-ink-light leading-relaxed">
                      Cuando un cliente entra a tu enlace público, introduce origen, destino, Incoterm y volumen.
                      La IA lee tu tarifario, calcula flete, aranceles, recargos y margen, y devuelve un presupuesto
                      profesional en segundos. 24/7, sin que tú estés delante.
                    </p>
                    <p className="mt-4 text-sm font-mono text-ink-muted">Tiempo de respuesta: 45 segundos de media.</p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                  <div className="lg:col-span-5">
                    <span className="text-6xl font-mono font-bold text-line-dark block mb-4">03</span>
                    <h3 className="text-2xl font-display font-semibold text-ink mb-3">Recibes leads automáticos</h3>
                    <p className="text-ink-light leading-relaxed">
                      Cada cotización generada desde tu enlace captura el email del cliente y los datos de la consulta.
                      Entras al panel, ves quién cotizó qué, y llamas para cerrar. Tú solo haces la parte que la IA no puede:
                      convencer al cliente.
                    </p>
                    <p className="mt-4 text-sm font-mono text-ink-muted">Email + datos de ruta capturados automáticamente.</p>
                  </div>
                  <div className="lg:col-span-7">
                    <div className="bg-white border border-line overflow-hidden" style={{ borderRadius: '6px' }}>
                      <div className="border-b border-line bg-bone px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-ink">Leads recientes</span>
                        <span className="text-xs font-mono text-ink-muted">Panel · Esta semana</span>
                      </div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-line text-xs text-ink-muted">
                            <th className="text-left px-5 py-2.5 font-medium">Email</th>
                            <th className="text-left px-3 py-2.5 font-medium">Ruta</th>
                            <th className="text-left px-3 py-2.5 font-medium">Vol.</th>
                            <th className="text-right px-5 py-2.5 font-medium">Total</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono text-ink">
                          <tr className="border-b border-line/60">
                            <td className="px-5 py-3 text-xs">m.torres@importsl.es</td>
                            <td className="px-3 py-3 text-xs">SHA → VLC</td>
                            <td className="px-3 py-3 text-xs">3,8 CBM</td>
                            <td className="px-5 py-3 text-right font-semibold text-signal">2.450€</td>
                          </tr>
                          <tr className="border-b border-line/60">
                            <td className="px-5 py-3 text-xs">compras@distribuidora.com</td>
                            <td className="px-3 py-3 text-xs">RTM → BCN</td>
                            <td className="px-3 py-3 text-xs">8 CBM</td>
                            <td className="px-5 py-3 text-right font-semibold text-signal">320€</td>
                          </tr>
                          <tr className="border-b border-line/60">
                            <td className="px-5 py-3 text-xs">j.ruiz@aduanas.es</td>
                            <td className="px-3 py-3 text-xs">NYC → BIO</td>
                            <td className="px-3 py-3 text-xs">15 CBM</td>
                            <td className="px-5 py-3 text-right font-semibold text-signal">975€</td>
                          </tr>
                          <tr>
                            <td className="px-5 py-3 text-xs">logistica@amarpe.com</td>
                            <td className="px-3 py-3 text-xs">HKG → VLC</td>
                            <td className="px-3 py-3 text-xs">12 CBM</td>
                            <td className="px-5 py-3 text-right font-semibold text-signal">640€</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Product detail ─── */}
          <section id="producto" className="border-b border-line">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="mb-16">
                <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Producto</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-ink">Todo en un panel. Nada en hojas sueltas.</h2>
              </div>

              <div className="space-y-20">
                {productBlocks.map((block) => (
                  <div key={block.title} className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Text */}
                    <div className={`lg:col-span-5 ${block.imageLeft ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <block.icon className="h-5 w-5 text-signal" />
                        <span className="text-xs font-mono text-ink-muted uppercase tracking-wider">{block.title}</span>
                      </div>
                      <h3 className="text-2xl font-display font-semibold text-ink mb-4">{block.title}</h3>
                      <p className="text-ink-light leading-relaxed text-lg">{block.desc}</p>
                      <p className="mt-6 text-sm font-mono text-signal bg-signal-bg px-4 py-3 inline-block" style={{ borderRadius: '4px' }}>
                        {block.metric}
                      </p>
                    </div>
                    {/* Visual placeholder */}
                    <div className={`lg:col-span-7 ${block.imageLeft ? 'lg:order-1' : ''}`}>
                      <ProductVisual index={productBlocks.indexOf(block)} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Live calculator ─── */}
          <section className="border-b border-line bg-navy text-white">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                  <p className="text-xs font-mono text-signal-light uppercase tracking-wider mb-4">Pruébalo ahora</p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                    Calcula una cotización de ejemplo.
                  </h2>
                  <p className="text-white/60 leading-relaxed">
                    Introduce los datos y verás cómo se genera un presupuesto en tiempo real.
                    Para usar tu propio tarifario, crea una cuenta gratis.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <LiveCalculator onCta={handleDemoClick} />
                </div>
              </div>
            </div>
          </section>

          {/* ─── Use cases ─── */}
          <section className="border-b border-line bg-white">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="mb-16">
                <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Casos de uso</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-ink">Diseñado para tres perfiles.</h2>
              </div>

              <div className="grid gap-px bg-line">
                {useCases.map((uc) => (
                  <div key={uc.profile} className="bg-white p-8 lg:p-10">
                    <h3 className="text-lg font-display font-semibold text-ink mb-3">{uc.profile}</h3>
                    <p className="text-sm text-ink-muted mb-2"><span className="font-medium text-ink-light">Antes:</span> {uc.pain}</p>
                    <p className="text-sm text-ink-muted mb-4"><span className="font-medium text-ink-light">Con LogiQuote:</span> {uc.benefit}</p>
                    <p className="text-sm font-mono text-signal border-l-2 border-signal pl-3">{uc.metric}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Social proof ─── */}
          <section className="border-b border-line">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-4">
                  <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Lo que dicen</p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-ink">Prueba social honesta.</h2>
                  <p className="mt-4 text-ink-muted text-sm leading-relaxed">
                    No publicamos testimonials falsos. Cuando tengamos clientes reales con casos verificados,
                    aparecerán aquí con su nombre, cargo y empresa.
                  </p>
                </div>
                <div className="lg:col-span-8">
                  <div className="border border-line bg-white p-8" style={{ borderRadius: '6px' }}>
                    <div className="flex items-start gap-1 text-signal mb-6">
                      {'★★★★★'.split('').map((s, i) => <span key={i} className="text-xl">{s}</span>)}
                    </div>
                    <blockquote className="text-xl font-display text-ink leading-relaxed mb-6">
                      «[REEMPLAZAR CON TESTIMONIO REAL] Redujimos el tiempo de respuesta de 2 días a 45 segundos.
                      El cliente entra, cotiza, y nosotros recibimos el lead. Así de simple.»
                    </blockquote>
                    <div className="flex items-center gap-4 pt-6 border-t border-line">
                      <div className="h-12 w-12 bg-bone-200 flex items-center justify-center font-mono font-bold text-ink-muted" style={{ borderRadius: '50%' }}>
                        ?
                      </div>
                      <div>
                        <p className="font-medium text-ink text-sm">[Nombre del cliente]</p>
                        <p className="text-sm text-ink-muted">[Cargo] · [Empresa transitaria]</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── Pricing ─── */}
          <section className="border-b border-line bg-white">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="mb-12 text-center">
                <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Precios</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-ink">Un precio claro. Sin trucos.</h2>
                <p className="mt-4 text-ink-muted">Todos los planes incluyen 14 días gratis. Sin tarjeta.</p>
              </div>

              {/* Billing toggle */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <span className={`text-sm font-medium ${!billingAnnual ? 'text-ink' : 'text-ink-muted'}`}>Mensual</span>
                <button
                  onClick={() => setBillingAnnual(!billingAnnual)}
                  className="relative h-6 w-11 bg-line rounded-full transition-colors duration-150"
                  aria-label="Cambiar facturación"
                >
                  <div className={`absolute top-0.5 h-5 w-5 bg-signal rounded-full transition-transform duration-150 ${billingAnnual ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
                <span className={`text-sm font-medium ${billingAnnual ? 'text-ink' : 'text-ink-muted'}`}>
                  Anual <span className="text-signal font-mono">-20%</span>
                </span>
              </div>

              {/* Plans */}
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {plans.map((plan) => (
                  <div
                    key={plan.name}
                    className={`border bg-white p-8 ${plan.highlighted ? 'border-signal border-2 relative' : 'border-line'}`}
                    style={{ borderRadius: '6px' }}
                  >
                    {plan.highlighted && (
                      <span className="absolute -top-3 left-8 bg-signal text-white text-xs font-semibold px-3 py-1" style={{ borderRadius: '4px' }}>
                        Plan recomendado
                      </span>
                    )}
                    <h3 className="text-lg font-display font-bold text-ink mb-2">{plan.name}</h3>
                    <p className="text-sm text-ink-muted mb-6 leading-relaxed">{plan.description}</p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-mono font-bold text-ink">{billingAnnual ? plan.priceAnnual : plan.priceMonthly}</span>
                      <span className="text-ink-muted">€/mes</span>
                    </div>
                    <Link
                      to={plan.name === 'Business' ? '/contacto' : '/login'}
                      className={`w-full ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} justify-center`}
                    >
                      {plan.cta}
                    </Link>
                    <ul className="mt-8 space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 text-sm text-ink-light">
                          <Check className="h-4 w-4 text-signal flex-shrink-0 mt-0.5" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {/* Pricing notes */}
              <div className="text-center space-y-2">
                <p className="text-sm text-ink-muted font-mono">
                  Precios en euros · IVA no incluido · Pagos procesados con Stripe
                </p>
                <p className="text-sm text-ink-muted">Cancela cuando quieras · Sin permanencia · Factura con tu CIF</p>
              </div>
            </div>
          </section>

          {/* ─── ROI Calculator ─── */}
          <section className="border-b border-line">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                  <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Calcula tu ahorro</p>
                  <h2 className="text-3xl md:text-4xl font-display font-bold text-ink mb-6">
                    ¿Cuánto tiempo pierdes cotizando a mano?
                  </h2>
                  <p className="text-ink-light leading-relaxed">
                    Ajusta los valores según tu volumen real. El cálculo es simple:
                    minutos por cotización × cotizaciones al mes × 12 meses.
                  </p>
                </div>
                <div className="lg:col-span-7">
                  <div className="border border-line bg-white p-8" style={{ borderRadius: '6px' }}>
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="label-field">Cotizaciones al mes</label>
                          <span className="text-2xl font-mono font-bold text-ink">{roiCotizaciones}</span>
                        </div>
                        <input
                          type="range"
                          min="10"
                          max="500"
                          step="10"
                          value={roiCotizaciones}
                          onChange={(e) => setRoiCotizaciones(Number(e.target.value))}
                          className="w-full accent-signal"
                        />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="label-field">Minutos por cotización (a mano)</label>
                          <span className="text-2xl font-mono font-bold text-ink">{roiMinutos}</span>
                        </div>
                        <input
                          type="range"
                          min="5"
                          max="120"
                          step="5"
                          value={roiMinutos}
                          onChange={(e) => setRoiMinutos(Number(e.target.value))}
                          className="w-full accent-signal"
                        />
                      </div>
                      <div className="border-t border-line pt-6">
                        <p className="text-sm text-ink-muted mb-2">Ahorro estimado anual con LogiQuote</p>
                        <p className="text-5xl font-mono font-bold text-signal">
                          {roiHours.toLocaleString('es-ES')} <span className="text-2xl text-ink-muted">horas/año</span>
                        </p>
                        <p className="text-sm text-ink-muted mt-2 font-mono">
                          ≈ {Math.floor(roiHours / 8).toLocaleString('es-ES')} jornadas laborales completas
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── FAQ ─── */}
          <section className="border-b border-line bg-white">
            <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
              <div className="mb-12 text-center">
                <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">FAQ</p>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-ink">Preguntas frecuentes</h2>
              </div>

              <div className="space-y-px bg-line">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-medium text-ink pr-4">{faq.q}</span>
                      {openFaq === i ? <Minus className="h-4 w-4 text-signal flex-shrink-0" /> : <Plus className="h-4 w-4 text-ink-muted flex-shrink-0" />}
                    </button>
                    {openFaq === i && (
                      <div className="px-6 pb-5 text-ink-light text-sm leading-relaxed animate-fade-in">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Final CTA ─── */}
          <section className="bg-navy relative overflow-hidden">
            <img
              src={HERO_IMAGE}
              alt="Terminal portuario con grúas y contenedores al atardecer"
              width={1200}
              height={600}
              className="absolute inset-0 w-full h-full object-cover opacity-20"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-navy/80" />
            <div className="relative mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="max-w-2xl">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight">
                  Deja de cotizar a mano. Empieza hoy.
                </h2>
                <p className="mt-6 text-lg text-white/60 leading-relaxed">
                  14 días gratis. Sin tarjeta. Subes tu tarifario y estás cotizando con IA en menos de 15 minutos.
                </p>
                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <button onClick={handleDemoClick} className="btn-primary">
                    Probar gratis 14 días
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <Link to="/demo" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/40">
                    Reservar demo guiada
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

/* ─── Product Visual ─── */
function ProductVisual({ index }: { index: number }) {
  if (index === 0) {
    // Calculator
    return (
      <div className="bg-white border border-line p-6" style={{ borderRadius: '6px' }}>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs font-mono text-ink-muted mb-1.5">Origen</p>
            <p className="font-mono font-medium text-ink border border-line px-3 py-2.5 text-sm" style={{ borderRadius: '4px' }}>Shanghai</p>
          </div>
          <div>
            <p className="text-xs font-mono text-ink-muted mb-1.5">Destino</p>
            <p className="font-mono font-medium text-ink border border-line px-3 py-2.5 text-sm" style={{ borderRadius: '4px' }}>Valencia</p>
          </div>
          <div>
            <p className="text-xs font-mono text-ink-muted mb-1.5">Incoterm</p>
            <p className="font-mono font-medium text-ink border border-line px-3 py-2.5 text-sm" style={{ borderRadius: '4px' }}>FOB</p>
          </div>
          <div>
            <p className="text-xs font-mono text-ink-muted mb-1.5">Volumen</p>
            <p className="font-mono font-medium text-ink border border-line px-3 py-2.5 text-sm" style={{ borderRadius: '4px' }}>3,8 CBM</p>
          </div>
        </div>
        <div className="border-t border-line pt-4 space-y-2 font-mono text-sm">
          <div className="flex justify-between"><span className="text-ink-muted">Flete LCL</span><span className="text-ink">1.710€</span></div>
          <div className="flex justify-between"><span className="text-ink-muted">THC + BAF + ISPS</span><span className="text-ink">152€</span></div>
          <div className="flex justify-between"><span className="text-ink-muted">Despacho aduanero</span><span className="text-ink">120€</span></div>
          <div className="flex justify-between"><span className="text-ink-muted">Margen FOB (+15%)</span><span className="text-ink">297€</span></div>
          <div className="flex justify-between font-bold text-base border-t border-line pt-2"><span className="text-ink">Total</span><span className="text-signal">2.450€</span></div>
        </div>
      </div>
    );
  }
  if (index === 1) {
    // Tariff editor
    return (
      <div className="bg-ink p-1" style={{ borderRadius: '6px' }}>
        <div className="bg-navy-deep p-5 font-mono text-sm overflow-x-auto scrollbar-thin" style={{ borderRadius: '4px' }}>
          <div className="text-white/40 mb-2">tarifario_base.md — editando</div>
          <pre className="text-white/80 whitespace-pre leading-relaxed">{`## Costes FCL
20' — 1.850€/contenedor
40' HC — 2.100€/contenedor

## Aranceles (origen China)
Despacho: 120€/operación
DUA: 35€
Almacén fiscal: 8€/día

## Márgenes
EXW: +18% · FOB: +15%
CIF: +12% · DDP: +8%`}</pre>
        </div>
      </div>
    );
  }
  if (index === 2) {
    // Public link
    return (
      <div className="bg-white border border-line p-6" style={{ borderRadius: '6px' }}>
        <p className="text-xs font-mono text-ink-muted mb-2">Tu enlace público</p>
        <div className="flex items-center gap-3 border border-line px-4 py-3 mb-4" style={{ borderRadius: '4px' }}>
          <Link2 className="h-4 w-4 text-signal flex-shrink-0" />
          <span className="font-mono text-sm text-signal flex-1 truncate">logiquote.app/tu-empresa</span>
        </div>
        <p className="text-xs font-mono text-ink-muted mb-3">Lo que ve tu cliente:</p>
        <div className="border border-line p-4 bg-bone" style={{ borderRadius: '4px' }}>
          <p className="font-display font-semibold text-ink mb-2">Cotiza tu importación</p>
          <p className="text-xs text-ink-muted mb-3">Introduce origen, destino y volumen. Recibirás un presupuesto al instante.</p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <span className="border border-line px-2 py-1.5 text-ink-muted" style={{ borderRadius: '4px' }}>Origen</span>
            <span className="border border-line px-2 py-1.5 text-ink-muted" style={{ borderRadius: '4px' }}>Destino</span>
          </div>
        </div>
      </div>
    );
  }
  // Analytics
  return (
    <div className="bg-white border border-line p-6" style={{ borderRadius: '6px' }}>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-line p-4" style={{ borderRadius: '4px' }}>
          <p className="text-xs text-ink-muted mb-1">Cotizaciones</p>
          <p className="text-2xl font-mono font-bold text-ink">127</p>
          <p className="text-xs text-success font-mono">+12%</p>
        </div>
        <div className="border border-line p-4" style={{ borderRadius: '4px' }}>
          <p className="text-xs text-ink-muted mb-1">Leads</p>
          <p className="text-2xl font-mono font-bold text-ink">43</p>
          <p className="text-xs text-success font-mono">+8%</p>
        </div>
        <div className="border border-line p-4" style={{ borderRadius: '4px' }}>
          <p className="text-xs text-ink-muted mb-1">Conversión</p>
          <p className="text-2xl font-mono font-bold text-ink">34%</p>
          <p className="text-xs text-success font-mono">+5%</p>
        </div>
      </div>
      <div className="space-y-2 font-mono text-sm">
        <div className="flex justify-between border-b border-line/60 pb-2"><span className="text-ink-muted">Shanghai → Valencia</span><span className="text-ink">38 cotizaciones</span></div>
        <div className="flex justify-between border-b border-line/60 pb-2"><span className="text-ink-muted">Rotterdam → Barcelona</span><span className="text-ink">22 cotizaciones</span></div>
        <div className="flex justify-between"><span className="text-ink-muted">Nueva York → Bilbao</span><span className="text-ink">14 cotizaciones</span></div>
      </div>
    </div>
  );
}

/* ─── Live Calculator ─── */
function LiveCalculator({ onCta }: { onCta: () => void }) {
  const [origin, setOrigin] = useState('Shanghai');
  const [dest, setDest] = useState('Valencia');
  const [incoterm, setIncoterm] = useState('FOB');
  const [volume, setVolume] = useState('3.8');
  const [result, setResult] = useState<number | null>(2450);

  const calc = () => {
    const vol = parseFloat(volume) || 0;
    const flete = vol * 450;
    const recargos = 152;
    const aduana = 120;
    const margins: Record<string, number> = { EXW: 0.18, FOB: 0.15, CIF: 0.12, DDP: 0.08 };
    const m = margins[incoterm] ?? 0.15;
    const total = Math.round((flete + recargos + aduana) * (1 + m));
    setResult(total);
  };

  return (
    <div className="bg-white text-ink p-8" style={{ borderRadius: '6px' }}>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label className="label-field">Origen</label>
          <input value={origin} onChange={(e) => setOrigin(e.target.value)} className="input-field" placeholder="Shanghai" />
        </div>
        <div>
          <label className="label-field">Destino</label>
          <input value={dest} onChange={(e) => setDest(e.target.value)} className="input-field" placeholder="Valencia" />
        </div>
        <div>
          <label className="label-field">Incoterm</label>
          <select value={incoterm} onChange={(e) => setIncoterm(e.target.value)} className="input-field">
            {['EXW', 'FOB', 'CIF', 'CFR', 'DAP', 'DDP'].map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
        <div>
          <label className="label-field">Volumen (CBM)</label>
          <input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} className="input-field" placeholder="3.8" />
        </div>
      </div>

      <button onClick={calc} className="btn-primary w-full mb-6">
        <Calculator className="h-4 w-4" />
        Calcular cotización
      </button>

      {result !== null && (
        <div className="border-t border-line pt-6 animate-fade-in">
          <div className="space-y-2 font-mono text-sm mb-4">
            <div className="flex justify-between"><span className="text-ink-muted">Flete LCL ({volume} CBM)</span><span className="text-ink">{(parseFloat(volume) * 450).toFixed(0)}€</span></div>
            <div className="flex justify-between"><span className="text-ink-muted">Recargos portuarios</span><span className="text-ink">152€</span></div>
            <div className="flex justify-between"><span className="text-ink-muted">Despacho aduanero</span><span className="text-ink">120€</span></div>
            <div className="flex justify-between font-bold text-base border-t border-line pt-2"><span className="text-ink">Total estimado</span><span className="text-signal">{result.toLocaleString('es-ES')}€</span></div>
          </div>
          <button onClick={onCta} className="btn-secondary w-full">
            Crea una cuenta para usar tu tarifario real
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  );
}
