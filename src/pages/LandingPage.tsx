import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Check,
  Calculator,
  FileText,
  Link2,
  TrendingUp,
  Minus,
  Plus,
  Sparkles,
  ShieldCheck,
  Clock,
  Globe,
  Zap,
  Users,
  Ship,
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/lib/auth';
import { plans, faqs, useCases } from '@/lib/content';
import {
  easeOut,
  staggerContainer,
  staggerItem,
  whileHoverCard,
} from '@/lib/animations';

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

const heroStats = [
  { value: '45s', label: 'Tiempo medio por cotización' },
  { value: '11', label: 'Incoterms 2020 soportados' },
  { value: 'FCL/LCL', label: 'Marítimo y aéreo' },
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

const TARIFF_PREVIEW = [
  '# TARIFARIO BASE',
  '## Costes LCL — Origen Asia',
  '45€/CBM · Mínimo 35 CBM',
  '',
  '## Aranceles',
  'Despacho aduanero: 120€/op',
  'DUA: 35€',
  '',
  '## Márgenes por Incoterm',
  'EXW +18% · FOB +15% · CIF +12%',
  '',
  '## Recargos',
  'THC 95€ · BAF 45€ · ISPS 12€',
].join('\n');

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
          <section className="relative border-b border-line overflow-hidden">
            {/* Mesh gradient background */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              <div className="absolute -top-48 -right-48 h-[600px] w-[600px] rounded-full bg-signal/8 blur-[120px]" />
              <div className="absolute top-40 -left-48 h-[400px] w-[400px] rounded-full bg-indigo-400/6 blur-[100px]" />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[300px] w-[800px] rounded-full bg-slate-300/8 blur-[120px]" />
            </div>

            <div className="relative mx-auto max-w-9xl px-6 py-24 md:py-32">
              <div className="grid lg:grid-cols-12 gap-16 items-center">
                {/* Left — copy */}
                <div className="lg:col-span-6">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={staggerItem} className="mb-6">
                      <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 backdrop-blur-sm px-3.5 py-1.5 text-xs font-medium text-slate-600">
                        <Sparkles className="h-3.5 w-3.5 text-signal" />
                        Cotizaciones logísticas con IA
                      </span>
                    </motion.div>

                    <motion.h1
                      variants={staggerItem}
                      className="text-4xl md:text-5xl lg:text-[3.75rem] font-display font-semibold tracking-tighter text-ink leading-[1.05]"
                    >
                      Cotiza importaciones en minutos, no en horas.
                    </motion.h1>

                    <motion.p
                      variants={staggerItem}
                      className="mt-6 text-lg text-slate-500 leading-relaxed max-w-xl"
                    >
                      El software que lee tu tarifario y genera cotizaciones profesionales con IA.
                      Para transitarios y agentes de aduanas que no pueden esperar tres días para responder a un cliente.
                    </motion.p>

                    <motion.div
                      variants={staggerItem}
                      className="mt-8 flex flex-col sm:flex-row gap-3"
                    >
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ duration: 0.2, ease: easeOut }}
                        onClick={handleDemoClick}
                        className="btn-primary"
                      >
                        Probar gratis 14 días
                        <ArrowRight className="h-4 w-4" />
                      </motion.button>
                      <Link to="/cotizador/demo" className="btn-secondary">
                        Ver una cotización de ejemplo
                      </Link>
                    </motion.div>

                    <motion.p
                      variants={staggerItem}
                      className="mt-4 text-sm text-slate-400 font-mono"
                    >
                      Sin tarjeta · Cancela cuando quieras · Datos en la UE
                    </motion.p>

                    {/* Stats */}
                    <motion.div
                      variants={staggerItem}
                      className="mt-12 grid grid-cols-3 gap-6 border-t border-slate-200 pt-8"
                    >
                      {heroStats.map((stat) => (
                        <div key={stat.label}>
                          <p className="text-3xl font-mono font-semibold text-slate-900">{stat.value}</p>
                          <p className="text-xs text-slate-400 mt-1">{stat.label}</p>
                        </div>
                      ))}
                    </motion.div>
                  </motion.div>
                </div>

                {/* Right — pure-code UI mockup with glassmorphism */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.3, ease: easeOut }}
                  className="lg:col-span-6"
                >
                  <HeroMockup />
                </motion.div>
              </div>
            </div>
          </section>

          {/* ─── Trust strip ─── */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-9xl px-6 py-8">
              <p className="text-xs font-mono text-slate-400 mb-4 text-center">Compatible con</p>
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {trustBadges.map((badge) => (
                  <span key={badge} className="text-sm font-mono text-slate-500">{badge}</span>
                ))}
              </div>
            </div>
          </section>

          {/* ─── The Problem ─── */}
          <section className="border-b border-slate-200">
            <div className="mx-auto max-w-9xl px-6 py-24 md:py-32">
              <div className="grid lg:grid-cols-12 gap-16">
                {/* Code-based visual replacing stock photo */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className="lg:col-span-5"
                >
                  <motion.div variants={staggerItem}>
                    <ProblemVisual />
                  </motion.div>
                </motion.div>
                <div className="lg:col-span-7 lg:pl-8">
                  <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                  >
                    <motion.p variants={staggerItem} className="text-xs font-mono text-signal uppercase tracking-wider mb-4">El problema</motion.p>
                    <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-display font-semibold tracking-tighter text-slate-900 leading-tight">
                      Un transitario pierde media hora en cada cotización.
                    </motion.h2>
                    <motion.p variants={staggerItem} className="mt-6 text-lg text-slate-500 leading-relaxed">
                      Abres el tarifario en PDF, buscas el coste base en Excel, calculas el flete a mano,
                      sumas aranceles, aplicas el margen según el Incoterm, redactas el correo, adjuntas el presupuesto.
                      Repites. Cada día. Cada consulta.
                    </motion.p>
                    <motion.p variants={staggerItem} className="mt-4 text-lg text-slate-500 leading-relaxed">
                      Y mientras tanto, tu competencia ya respondió.
                    </motion.p>

                    <div className="mt-10 space-y-6">
                      {problemStats.map((stat) => (
                        <motion.div
                          key={stat.label}
                          variants={staggerItem}
                          className="flex items-baseline gap-6 border-t border-slate-200 pt-4"
                        >
                          <span className="text-4xl font-mono font-bold text-slate-900 flex-shrink-0 w-28">{stat.value}</span>
                          <span className="text-sm text-slate-400">{stat.label}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </section>

          {/* ─── How it works ─── */}
          <section id="como-funciona" className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-9xl px-6 py-24 md:py-32">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mb-20"
              >
                <motion.p variants={staggerItem} className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Cómo funciona</motion.p>
                <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-display font-semibold tracking-tighter text-slate-900">Tres pasos. Sin fricción.</motion.h2>
              </motion.div>

              <div className="space-y-24">
                {/* Step 1 */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className="grid lg:grid-cols-12 gap-16 items-center"
                >
                  <motion.div variants={staggerItem} className="lg:col-span-5">
                    <span className="text-6xl font-mono font-bold text-slate-200 block mb-4">01</span>
                    <h3 className="text-2xl font-display font-semibold tracking-tight text-slate-900 mb-3">Subes tu tarifario base</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Introduces tus costes de LCL, FCL y aéreo. Aranceles por origen. Recargos portuarios (THC, BAF, ISPS).
                      Márgenes por Incoterm. Lo guardas una vez y la IA lo usa como referencia exclusiva para cada cotización.
                    </p>
                    <p className="mt-4 text-sm font-mono text-slate-400">~10 minutos de configuración inicial.</p>
                  </motion.div>
                  <motion.div variants={staggerItem} className="lg:col-span-7">
                    <div className="bg-slate-900 p-1.5" style={{ borderRadius: '10px' }}>
                      <div className="bg-slate-950 p-5 font-mono text-sm leading-relaxed overflow-x-auto scrollbar-thin" style={{ borderRadius: '8px' }}>
                        <div className="flex items-center gap-2 mb-3 text-slate-500 text-xs">
                          <div className="flex gap-1.5">
                            <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                            <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                            <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
                          </div>
                          <span className="ml-2">tarifario_base.md</span>
                        </div>
                        <pre className="text-slate-300 whitespace-pre">{TARIFF_PREVIEW}</pre>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Step 2 */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className="grid lg:grid-cols-12 gap-16 items-center"
                >
                  <motion.div variants={staggerItem} className="lg:col-span-7 lg:order-1 order-2">
                    <Step2Mockup />
                  </motion.div>
                  <motion.div variants={staggerItem} className="lg:col-span-5 lg:order-2 order-1">
                    <span className="text-6xl font-mono font-bold text-slate-200 block mb-4">02</span>
                    <h3 className="text-2xl font-display font-semibold tracking-tight text-slate-900 mb-3">La IA cotiza por ti</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Cuando un cliente entra a tu enlace público, introduce origen, destino, Incoterm y volumen.
                      La IA lee tu tarifario, calcula flete, aranceles, recargos y margen, y devuelve un presupuesto
                      profesional en segundos. 24/7, sin que tú estés delante.
                    </p>
                    <p className="mt-4 text-sm font-mono text-slate-400">Tiempo de respuesta: 45 segundos de media.</p>
                  </motion.div>
                </motion.div>

                {/* Step 3 */}
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className="grid lg:grid-cols-12 gap-16 items-center"
                >
                  <motion.div variants={staggerItem} className="lg:col-span-5">
                    <span className="text-6xl font-mono font-bold text-slate-200 block mb-4">03</span>
                    <h3 className="text-2xl font-display font-semibold tracking-tight text-slate-900 mb-3">Recibes leads automáticos</h3>
                    <p className="text-slate-500 leading-relaxed">
                      Cada cotización generada desde tu enlace captura el email del cliente y los datos de la consulta.
                      Entras al panel, ves quién cotizó qué, y llamas para cerrar. Tú solo haces la parte que la IA no puede:
                      convencer al cliente.
                    </p>
                    <p className="mt-4 text-sm font-mono text-slate-400">Email + datos de ruta capturados automáticamente.</p>
                  </motion.div>
                  <motion.div variants={staggerItem} className="lg:col-span-7">
                    <div className="bg-white border border-slate-200 overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)]" style={{ borderRadius: '10px' }}>
                      <div className="border-b border-slate-200 bg-slate-50/80 px-5 py-3 flex items-center justify-between">
                        <span className="text-sm font-medium text-slate-900">Leads recientes</span>
                        <span className="text-xs font-mono text-slate-400">Panel · Esta semana</span>
                      </div>
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 text-xs text-slate-400">
                            <th className="text-left px-5 py-2.5 font-medium">Email</th>
                            <th className="text-left px-3 py-2.5 font-medium">Ruta</th>
                            <th className="text-left px-3 py-2.5 font-medium">Vol.</th>
                            <th className="text-right px-5 py-2.5 font-medium">Total</th>
                          </tr>
                        </thead>
                        <tbody className="font-mono text-slate-700">
                          <tr className="border-b border-slate-100"><td className="px-5 py-3 text-xs">m.torres@importsl.es</td><td className="px-3 py-3 text-xs">SHA → VLC</td><td className="px-3 py-3 text-xs">3,8 CBM</td><td className="px-5 py-3 text-right font-semibold text-signal">2.450€</td></tr>
                          <tr className="border-b border-slate-100"><td className="px-5 py-3 text-xs">compras@distribuidora.com</td><td className="px-3 py-3 text-xs">RTM → BCN</td><td className="px-3 py-3 text-xs">8 CBM</td><td className="px-5 py-3 text-right font-semibold text-signal">320€</td></tr>
                          <tr className="border-b border-slate-100"><td className="px-5 py-3 text-xs">j.ruiz@aduanas.es</td><td className="px-3 py-3 text-xs">NYC → BIO</td><td className="px-3 py-3 text-xs">15 CBM</td><td className="px-5 py-3 text-right font-semibold text-signal">975€</td></tr>
                          <tr><td className="px-5 py-3 text-xs">logistica@amarpe.com</td><td className="px-3 py-3 text-xs">HKG → VLC</td><td className="px-3 py-3 text-xs">12 CBM</td><td className="px-5 py-3 text-right font-semibold text-signal">640€</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ─── Product detail ─── */}
          <section id="producto" className="border-b border-slate-200">
            <div className="mx-auto max-w-9xl px-6 py-24 md:py-32">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mb-20"
              >
                <motion.p variants={staggerItem} className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Producto</motion.p>
                <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-display font-semibold tracking-tighter text-slate-900">Todo en un panel. Nada en hojas sueltas.</motion.h2>
              </motion.div>

              <div className="space-y-28">
                {productBlocks.map((block) => (
                  <motion.div
                    key={block.title}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid lg:grid-cols-12 gap-16 items-center"
                  >
                    <motion.div variants={staggerItem} className={`lg:col-span-5 ${block.imageLeft ? 'lg:order-2' : ''}`}>
                      <div className="flex items-center gap-3 mb-4">
                        <block.icon className="h-5 w-5 text-signal" />
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{block.title}</span>
                      </div>
                      <h3 className="text-2xl font-display font-semibold tracking-tight text-slate-900 mb-4">{block.title}</h3>
                      <p className="text-slate-500 leading-relaxed text-lg">{block.desc}</p>
                      <p className="mt-6 text-sm font-mono text-signal bg-signal-bg px-4 py-3 inline-block" style={{ borderRadius: '6px' }}>
                        {block.metric}
                      </p>
                    </motion.div>
                    <motion.div variants={staggerItem} className={`lg:col-span-7 ${block.imageLeft ? 'lg:order-1' : ''}`}>
                      <ProductVisual index={productBlocks.indexOf(block)} />
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Live calculator ─── */}
          <section className="border-b border-slate-200 bg-slate-900 text-white relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute top-0 right-0 h-[400px] w-[400px] rounded-full bg-signal/15 blur-[120px]" />
              <div className="absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[100px]" />
            </div>
            <div className="relative mx-auto max-w-9xl px-6 py-24 md:py-32">
              <div className="grid lg:grid-cols-12 gap-16">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className="lg:col-span-5"
                >
                  <motion.p variants={staggerItem} className="text-xs font-mono text-signal-light uppercase tracking-wider mb-4">Pruébalo ahora</motion.p>
                  <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-display font-semibold tracking-tighter text-white mb-6">
                    Calcula una cotización de ejemplo.
                  </motion.h2>
                  <motion.p variants={staggerItem} className="text-slate-400 leading-relaxed">
                    Introduce los datos y verás cómo se genera un presupuesto en tiempo real.
                    Para usar tu propio tarifario, crea una cuenta gratis.
                  </motion.p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="lg:col-span-7"
                >
                  <LiveCalculator onCta={handleDemoClick} />
                </motion.div>
              </div>
            </div>
          </section>

          {/* ─── Use cases ─── */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-9xl px-6 py-24 md:py-32">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mb-16"
              >
                <motion.p variants={staggerItem} className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Casos de uso</motion.p>
                <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-display font-semibold tracking-tighter text-slate-900">Diseñado para tres perfiles.</motion.h2>
              </motion.div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid gap-px bg-slate-200"
              >
                {useCases.map((uc) => (
                  <motion.div
                    key={uc.profile}
                    variants={staggerItem}
                    whileHover={whileHoverCard}
                    className="bg-white p-8 lg:p-10 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                  >
                    <h3 className="text-lg font-display font-semibold tracking-tight text-slate-900 mb-3">{uc.profile}</h3>
                    <p className="text-sm text-slate-400 mb-2"><span className="font-medium text-slate-600">Antes:</span> {uc.pain}</p>
                    <p className="text-sm text-slate-400 mb-4"><span className="font-medium text-slate-600">Con LogiQuote:</span> {uc.benefit}</p>
                    <p className="text-sm font-mono text-signal border-l-2 border-signal pl-3">{uc.metric}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* ─── Pricing ─── */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-9xl px-6 py-24 md:py-32">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mb-12 text-center"
              >
                <motion.p variants={staggerItem} className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Precios</motion.p>
                <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-display font-semibold tracking-tighter text-slate-900">Un precio claro. Sin trucos.</motion.h2>
                <motion.p variants={staggerItem} className="mt-4 text-slate-400">Todos los planes incluyen 14 días gratis. Sin tarjeta.</motion.p>
              </motion.div>

              {/* Billing toggle */}
              <div className="flex items-center justify-center gap-4 mb-12">
                <span className={`text-sm font-medium transition-colors duration-200 ${!billingAnnual ? 'text-slate-900' : 'text-slate-400'}`}>Mensual</span>
                <motion.button
                  onClick={() => setBillingAnnual(!billingAnnual)}
                  className="relative h-6 w-11 bg-slate-200 rounded-full transition-colors duration-200"
                  aria-label="Cambiar facturación"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ x: billingAnnual ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="absolute top-0.5 h-5 w-5 bg-signal rounded-full shadow-sm"
                  />
                </motion.button>
                <span className={`text-sm font-medium transition-colors duration-200 ${billingAnnual ? 'text-slate-900' : 'text-slate-400'}`}>
                  Anual <span className="text-signal font-mono">-20%</span>
                </span>
              </div>

              {/* Plans */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid md:grid-cols-3 gap-6 mb-16"
              >
                {plans.map((plan) => (
                  <motion.div
                    key={plan.name}
                    variants={staggerItem}
                    whileHover={{ y: -6, transition: { duration: 0.3, ease: easeOut } }}
                    className={`relative bg-white p-8 border transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] ${
                      plan.highlighted ? 'border-signal border-2' : 'border-slate-200'
                    }`}
                    style={{ borderRadius: '10px' }}
                  >
                    {plan.highlighted && (
                      <span className="absolute -top-3 left-8 bg-signal text-white text-xs font-semibold px-3 py-1" style={{ borderRadius: '6px' }}>
                        Plan recomendado
                      </span>
                    )}
                    <h3 className="text-lg font-display font-bold text-slate-900 mb-2">{plan.name}</h3>
                    <p className="text-sm text-slate-400 mb-6 leading-relaxed">{plan.description}</p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-mono font-bold text-slate-900">{billingAnnual ? plan.priceAnnual : plan.priceMonthly}</span>
                      <span className="text-slate-400">€/mes</span>
                    </div>
                    <Link
                      to={plan.name === 'Business' ? '/contacto' : '/login'}
                      className={`w-full ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} justify-center`}
                    >
                      {plan.cta}
                    </Link>
                    <ul className="mt-8 space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 text-sm text-slate-600">
                          <Check className="h-4 w-4 text-signal flex-shrink-0 mt-0.5" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>

              <div className="text-center space-y-2">
                <p className="text-sm text-slate-400 font-mono">
                  Precios en euros · IVA no incluido · Pagos procesados con Stripe
                </p>
                <p className="text-sm text-slate-400">Cancela cuando quieras · Sin permanencia · Factura con tu CIF</p>
              </div>
            </div>
          </section>

          {/* ─── ROI Calculator ─── */}
          <section className="border-b border-slate-200">
            <div className="mx-auto max-w-9xl px-6 py-24 md:py-32">
              <div className="grid lg:grid-cols-12 gap-16">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: '-80px' }}
                  className="lg:col-span-5"
                >
                  <motion.p variants={staggerItem} className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Calcula tu ahorro</motion.p>
                  <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-display font-semibold tracking-tighter text-slate-900 mb-6">
                    ¿Cuánto tiempo pierdes cotizando a mano?
                  </motion.h2>
                  <motion.p variants={staggerItem} className="text-slate-500 leading-relaxed">
                    Ajusta los valores según tu volumen real. El cálculo es simple:
                    minutos por cotización × cotizaciones al mes × 12 meses.
                  </motion.p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, ease: easeOut }}
                  className="lg:col-span-7"
                >
                  <div className="bg-white border border-slate-200 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" style={{ borderRadius: '10px' }}>
                    <div className="space-y-8">
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="label-field">Cotizaciones al mes</label>
                          <span className="text-2xl font-mono font-bold text-slate-900">{roiCotizaciones}</span>
                        </div>
                        <input type="range" min="10" max="500" step="10" value={roiCotizaciones} onChange={(e) => setRoiCotizaciones(Number(e.target.value))} className="w-full accent-signal" />
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className="label-field">Minutos por cotización (a mano)</label>
                          <span className="text-2xl font-mono font-bold text-slate-900">{roiMinutos}</span>
                        </div>
                        <input type="range" min="5" max="120" step="5" value={roiMinutos} onChange={(e) => setRoiMinutos(Number(e.target.value))} className="w-full accent-signal" />
                      </div>
                      <div className="border-t border-slate-200 pt-6">
                        <p className="text-sm text-slate-400 mb-2">Ahorro estimado anual con LogiQuote</p>
                        <p className="text-5xl font-mono font-bold text-signal">
                          {roiHours.toLocaleString('es-ES')} <span className="text-2xl text-slate-400">horas/año</span>
                        </p>
                        <p className="text-sm text-slate-400 mt-2 font-mono">
                          ≈ {Math.floor(roiHours / 8).toLocaleString('es-ES')} jornadas laborales completas
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* ─── FAQ ─── */}
          <section className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-3xl px-6 py-24 md:py-32">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mb-12 text-center"
              >
                <motion.p variants={staggerItem} className="text-xs font-mono text-signal uppercase tracking-wider mb-4">FAQ</motion.p>
                <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-display font-semibold tracking-tighter text-slate-900">Preguntas frecuentes</motion.h2>
              </motion.div>

              <div className="space-y-px bg-slate-200">
                {faqs.map((faq, i) => (
                  <div key={i} className="bg-white">
                    <button
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                      aria-expanded={openFaq === i}
                    >
                      <span className="font-medium text-slate-900 pr-4">{faq.q}</span>
                      {openFaq === i ? <Minus className="h-4 w-4 text-signal flex-shrink-0" /> : <Plus className="h-4 w-4 text-slate-400 flex-shrink-0" />}
                    </button>
                    <AnimatePresence initial={false}>
                      {openFaq === i && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: easeOut }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 pb-5 text-slate-500 text-sm leading-relaxed">{faq.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Final CTA ─── */}
          <section className="bg-slate-900 relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-signal/15 blur-[120px]" />
              <div className="absolute top-0 right-0 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[100px]" />
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="relative mx-auto max-w-9xl px-6 py-24 md:py-32"
            >
              <motion.h2 variants={staggerItem} className="text-3xl md:text-5xl font-display font-semibold tracking-tighter text-white leading-tight max-w-2xl">
                Deja de cotizar a mano. Empieza hoy.
              </motion.h2>
              <motion.p variants={staggerItem} className="mt-6 text-lg text-slate-400 leading-relaxed max-w-2xl">
                14 días gratis. Sin tarjeta. Subes tu tarifario y estás cotizando con IA en menos de 15 minutos.
              </motion.p>
              <motion.div variants={staggerItem} className="mt-8 flex flex-col sm:flex-row gap-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: easeOut }}
                  onClick={handleDemoClick}
                  className="btn-primary"
                >
                  Probar gratis 14 días
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
                <Link to="/demo" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/40">
                  Reservar demo guiada
                </Link>
              </motion.div>
            </motion.div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}

/* ─── Hero Mockup — pure code, glassmorphism ─── */
function HeroMockup() {
  return (
    <div className="relative">
      {/* Main card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: easeOut }}
        className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.06)] overflow-hidden"
        style={{ borderRadius: '12px' }}
      >
        {/* Browser top bar */}
        <div className="flex items-center gap-2 border-b border-slate-200/60 px-4 py-3 bg-white/50">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          </div>
          <span className="text-xs font-mono text-slate-400 ml-2">logiquote.app/cotizador</span>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center bg-signal/10 rounded-md">
                <Ship className="h-3.5 w-3.5 text-signal" />
              </div>
              <span className="text-sm font-semibold text-slate-900">Cotización LQ-284901</span>
            </div>
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Generada
            </span>
          </div>

          {/* Route inputs */}
          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="border border-slate-200 rounded-lg p-3 bg-white/60">
              <p className="text-[10px] font-mono text-slate-400 mb-1">ORIGEN</p>
              <p className="text-sm font-mono font-semibold text-slate-900">Shanghai</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white/60">
              <p className="text-[10px] font-mono text-slate-400 mb-1">DESTINO</p>
              <p className="text-sm font-mono font-semibold text-slate-900">Valencia</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white/60">
              <p className="text-[10px] font-mono text-slate-400 mb-1">INCOTERM</p>
              <p className="text-sm font-mono font-semibold text-slate-900">FOB</p>
            </div>
            <div className="border border-slate-200 rounded-lg p-3 bg-white/60">
              <p className="text-[10px] font-mono text-slate-400 mb-1">VOLUMEN</p>
              <p className="text-sm font-mono font-semibold text-slate-900">3,8 CBM</p>
            </div>
          </div>

          {/* Cost breakdown */}
          <div className="space-y-2.5 font-mono text-sm border-t border-slate-200 pt-4">
            <div className="flex justify-between"><span className="text-slate-400">Flete LCL</span><span className="text-slate-700">1.710€</span></div>
            <div className="flex justify-between"><span className="text-slate-400">THC + BAF + ISPS</span><span className="text-slate-700">152€</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Despacho aduanero</span><span className="text-slate-700">120€</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Margen FOB (+15%)</span><span className="text-slate-700">297€</span></div>
            <div className="flex justify-between font-bold text-base border-t border-slate-200 pt-2.5">
              <span className="text-slate-900">Total</span>
              <span className="text-signal">2.450€</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Floating lead notification — staggered entrance */}
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.9, ease: easeOut }}
        className="absolute -bottom-4 -left-4 bg-white/80 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-4"
        style={{ borderRadius: '10px' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center bg-signal/10 rounded-lg">
            <Users className="h-4 w-4 text-signal" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-900">Nuevo lead capturado</p>
            <p className="text-[11px] font-mono text-slate-400">m.torres@importsl.es</p>
          </div>
        </div>
      </motion.div>

      {/* Floating AI badge */}
      <motion.div
        initial={{ opacity: 0, y: -10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.1, ease: easeOut }}
        className="absolute -top-3 -right-3 bg-signal text-white px-3 py-1.5 shadow-[0_4px_16px_rgb(79_70_229_0.3)]"
        style={{ borderRadius: '8px' }}
      >
        <span className="flex items-center gap-1.5 text-xs font-semibold">
          <Sparkles className="h-3 w-3" />
          IA
        </span>
      </motion.div>
    </div>
  );
}

/* ─── Problem Visual — pure code, no stock photo ─── */
function ProblemVisual() {
  return (
    <div className="bg-slate-900 p-1.5" style={{ borderRadius: '10px' }}>
      <div className="bg-slate-950 p-5 font-mono text-sm leading-relaxed overflow-x-auto scrollbar-thin" style={{ borderRadius: '8px' }}>
        <div className="flex items-center gap-2 mb-4 text-slate-500 text-xs">
          <div className="flex gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
            <div className="h-2.5 w-2.5 rounded-full bg-slate-700" />
          </div>
          <span className="ml-2">cotizacion_manual.xlsx</span>
        </div>
        <div className="text-slate-300 whitespace-pre">{`A          B         C        D       E
1  Origen    Destino  Flete   Arancel Margen
2  Shanghai  Valencia ???      ???     ???
3  Rotterdam Barcelona ???      ???     ???
4  Nueva York Bilbao  ???      ???     ???

# ¿Flete LCL o FCL?
# ¿Incluye THC + BAF?
# ¿Margen FOB o CIF?
# ¿Quién calcula el arancel?
# → 42 minutos después...`}</div>
      </div>
    </div>
  );
}

/* ─── Step 2 Mockup — pure code ─── */
function Step2Mockup() {
  return (
    <div className="bg-white/70 backdrop-blur-xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-6" style={{ borderRadius: '10px' }}>
      <div className="flex items-center gap-2 mb-5">
        <div className="flex h-7 w-7 items-center justify-center bg-signal/10 rounded-md">
          <Sparkles className="h-3.5 w-3.5 text-signal" />
        </div>
        <span className="text-sm font-semibold text-slate-900">IA generando cotización...</span>
      </div>

      <div className="space-y-3">
        {[
          { label: 'Leyendo tarifario base', done: true },
          { label: 'Calculando flete LCL (3,8 CBM)', done: true },
          { label: 'Aplicando recargos portuarios', done: true },
          { label: 'Calculando margen FOB (+15%)', done: false },
        ].map((step, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className={`flex h-5 w-5 items-center justify-center rounded-md ${step.done ? 'bg-emerald-50' : 'bg-slate-100'}`}>
              {step.done ? <Check className="h-3 w-3 text-emerald-600" /> : <Clock className="h-3 w-3 text-slate-400" />}
            </div>
            <span className={`text-sm font-mono ${step.done ? 'text-slate-700' : 'text-slate-400'}`}>{step.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
        <span className="text-sm text-slate-400 font-mono">Tiempo total</span>
        <span className="text-2xl font-mono font-bold text-signal">45s</span>
      </div>
    </div>
  );
}

/* ─── Product Visual — pure code mockups ─── */
function ProductVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        style={{ borderRadius: '10px' }}
      >
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs font-mono text-slate-400 mb-1.5">Origen</p>
            <p className="font-mono font-medium text-slate-900 border border-slate-200 px-3 py-2.5 text-sm bg-white/50" style={{ borderRadius: '6px' }}>Shanghai</p>
          </div>
          <div>
            <p className="text-xs font-mono text-slate-400 mb-1.5">Destino</p>
            <p className="font-mono font-medium text-slate-900 border border-slate-200 px-3 py-2.5 text-sm bg-white/50" style={{ borderRadius: '6px' }}>Valencia</p>
          </div>
          <div>
            <p className="text-xs font-mono text-slate-400 mb-1.5">Incoterm</p>
            <p className="font-mono font-medium text-slate-900 border border-slate-200 px-3 py-2.5 text-sm bg-white/50" style={{ borderRadius: '6px' }}>FOB</p>
          </div>
          <div>
            <p className="text-xs font-mono text-slate-400 mb-1.5">Volumen</p>
            <p className="font-mono font-medium text-slate-900 border border-slate-200 px-3 py-2.5 text-sm bg-white/50" style={{ borderRadius: '6px' }}>3,8 CBM</p>
          </div>
        </div>
        <div className="border-t border-slate-200 pt-4 space-y-2 font-mono text-sm">
          <div className="flex justify-between"><span className="text-slate-400">Flete LCL</span><span className="text-slate-700">1.710€</span></div>
          <div className="flex justify-between"><span className="text-slate-400">THC + BAF + ISPS</span><span className="text-slate-700">152€</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Despacho aduanero</span><span className="text-slate-700">120€</span></div>
          <div className="flex justify-between"><span className="text-slate-400">Margen FOB (+15%)</span><span className="text-slate-700">297€</span></div>
          <div className="flex justify-between font-bold text-base border-t border-slate-200 pt-2"><span className="text-slate-900">Total</span><span className="text-signal">2.450€</span></div>
        </div>
      </motion.div>
    );
  }
  if (index === 1) {
    return (
      <div className="bg-slate-900 p-1.5" style={{ borderRadius: '10px' }}>
        <div className="bg-slate-950 p-5 font-mono text-sm overflow-x-auto scrollbar-thin" style={{ borderRadius: '8px' }}>
          <div className="text-slate-500 mb-2">tarifario_base.md — editando</div>
          <pre className="text-slate-300 whitespace-pre leading-relaxed">{`## Costes FCL
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
    return (
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.3, ease: easeOut }}
        className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
        style={{ borderRadius: '10px' }}
      >
        <p className="text-xs font-mono text-slate-400 mb-2">Tu enlace público</p>
        <div className="flex items-center gap-3 border border-slate-200 px-4 py-3 mb-4 bg-white/50" style={{ borderRadius: '6px' }}>
          <Link2 className="h-4 w-4 text-signal flex-shrink-0" />
          <span className="font-mono text-sm text-signal flex-1 truncate">logiquote.app/tu-empresa</span>
        </div>
        <p className="text-xs font-mono text-slate-400 mb-3">Lo que ve tu cliente:</p>
        <div className="border border-slate-200 p-4 bg-slate-50/80" style={{ borderRadius: '6px' }}>
          <p className="font-display font-semibold text-slate-900 mb-2">Cotiza tu importación</p>
          <p className="text-xs text-slate-400 mb-3">Introduce origen, destino y volumen. Recibirás un presupuesto al instante.</p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <span className="border border-slate-200 px-2 py-1.5 text-slate-400 bg-white/50" style={{ borderRadius: '6px' }}>Origen</span>
            <span className="border border-slate-200 px-2 py-1.5 text-slate-400 bg-white/50" style={{ borderRadius: '6px' }}>Destino</span>
          </div>
        </div>
      </motion.div>
    );
  }
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: easeOut }}
      className="bg-white/70 backdrop-blur-xl border border-slate-200/60 p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
      style={{ borderRadius: '10px' }}
    >
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="border border-slate-200 p-4 bg-white/50" style={{ borderRadius: '6px' }}>
          <p className="text-xs text-slate-400 mb-1">Cotizaciones</p>
          <p className="text-2xl font-mono font-bold text-slate-900">127</p>
          <p className="text-xs text-emerald-600 font-mono">+12%</p>
        </div>
        <div className="border border-slate-200 p-4 bg-white/50" style={{ borderRadius: '6px' }}>
          <p className="text-xs text-slate-400 mb-1">Leads</p>
          <p className="text-2xl font-mono font-bold text-slate-900">43</p>
          <p className="text-xs text-emerald-600 font-mono">+8%</p>
        </div>
        <div className="border border-slate-200 p-4 bg-white/50" style={{ borderRadius: '6px' }}>
          <p className="text-xs text-slate-400 mb-1">Conversión</p>
          <p className="text-2xl font-mono font-bold text-slate-900">34%</p>
          <p className="text-xs text-emerald-600 font-mono">+5%</p>
        </div>
      </div>
      <div className="space-y-2 font-mono text-sm">
        <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400">Shanghai → Valencia</span><span className="text-slate-700">38 cotizaciones</span></div>
        <div className="flex justify-between border-b border-slate-100 pb-2"><span className="text-slate-400">Rotterdam → Barcelona</span><span className="text-slate-700">22 cotizaciones</span></div>
        <div className="flex justify-between"><span className="text-slate-400">Nueva York → Bilbao</span><span className="text-slate-700">14 cotizaciones</span></div>
      </div>
    </motion.div>
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
    <div className="bg-white text-slate-900 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.08)]" style={{ borderRadius: '10px' }}>
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

      <motion.button
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        transition={{ duration: 0.2, ease: easeOut }}
        onClick={calc}
        className="btn-primary w-full mb-6"
      >
        <Calculator className="h-4 w-4" />
        Calcular cotización
      </motion.button>

      {result !== null && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.4, ease: easeOut }}
          className="border-t border-slate-200 pt-6 overflow-hidden"
        >
          <div className="space-y-2 font-mono text-sm mb-4">
            <div className="flex justify-between"><span className="text-slate-400">Flete LCL ({volume} CBM)</span><span className="text-slate-700">{(parseFloat(volume) * 450).toFixed(0)}€</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Recargos portuarios</span><span className="text-slate-700">152€</span></div>
            <div className="flex justify-between"><span className="text-slate-400">Despacho aduanero</span><span className="text-slate-700">120€</span></div>
            <div className="flex justify-between font-bold text-base border-t border-slate-200 pt-2"><span className="text-slate-900">Total estimado</span><span className="text-signal">{result.toLocaleString('es-ES')}€</span></div>
          </div>
          <button onClick={onCta} className="btn-secondary w-full">
            Crea una cuenta para usar tu tarifario real
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </div>
  );
}
