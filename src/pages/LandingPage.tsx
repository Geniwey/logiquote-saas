import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Ship,
  Plane,
  Container,
  Anchor,
  FileText,
  ShieldCheck,
  Clock,
  Zap,
  Check,
  TrendingUp,
  Users,
  Building2,
  Calculator,
  MapPin,
  DollarSign,
  Sparkles,
  Globe,
  ChevronRight,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { AuthModal } from '@/components/AuthModal';
import { useAuth } from '@/lib/auth';

const features = [
  {
    icon: Calculator,
    title: 'Cero errores manuales',
    description: 'Elimina los errores de cálculo en fletes, aranceles y márgenes. La IA aplica tu tarifario con precisión matemática, operación tras operación.',
  },
  {
    icon: Clock,
    title: 'Respuestas instantáneas',
    description: 'Tus clientes reciben una cotización profesional en segundos, 24/7, sin esperar a que tu equipo esté disponible. Cada minuto cuenta.',
  },
  {
    icon: FileText,
    title: 'Integración con tus tarifas',
    description: 'Sube tu tarifario base una sola vez. La IA lo usa como referencia exclusiva para cada cotización, manteniendo tus márgenes siempre intactos.',
  },
];

const companyLogos = [
  { icon: Ship, name: 'OceanFreight' },
  { icon: Container, name: 'CargoLink' },
  { icon: Anchor, name: 'MaritimePro' },
  { icon: Plane, name: 'AeroTransit' },
  { icon: Building2, name: 'GlobalLogistics' },
];

const pricingFeatures = [
  'Tarifario ilimitado de rutas e Incoterms',
  'Enlace público personalizado para clientes',
  'Cotizaciones automáticas con IA 24/7',
  'Captura automática de leads y contactos',
  'Descarga de cotizaciones en PDF profesional',
  'Soporte prioritario por email',
];

export default function LandingPage() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signup');

  const handleDemoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (session) {
      navigate('/cotizador/demo');
    } else {
      setAuthMode('signup');
      setAuthOpen(true);
    }
  };

  const handleSignInClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (session) {
      navigate('/dashboard');
    } else {
      setAuthMode('signin');
      setAuthOpen(true);
    }
  };

  return (
    <>
      <SEO
        title="LogiQuote | Software de Cotizaciones Logísticas con IA"
        description="Plataforma B2B para transitarios y agentes de aduanas. Automatiza tus presupuestos de importación y exportación basándote en tu propio tarifario."
      />

      <AuthModal
        open={authOpen}
        initialMode={authMode}
        onClose={() => setAuthOpen(false)}
        title={authMode === 'signup' ? 'Crear cuenta gratis para probar la demo' : 'Iniciar sesión'}
        subtitle={authMode === 'signup' ? 'Regístrate gratis y prueba el cotizador con IA al instante.' : 'Accede a tu panel de control.'}
      />

      <div className="min-h-screen bg-white">
        {/* ─── Header ─── */}
        <header className="sticky top-0 z-50 border-b border-slate-200/60 bg-white/70 backdrop-blur-xl transition-all duration-300">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3.5">
            <Logo />
            <nav className="hidden items-center gap-1 md:flex" aria-label="Navegación principal">
              {[
                { href: '#how-it-works', label: 'Cómo funciona' },
                { href: '#benefits', label: 'Beneficios' },
                { href: '#pricing', label: 'Precios' },
              ].map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100/70 hover:text-slate-900"
                >
                  {item.label}
                </a>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <button
                onClick={handleSignInClick}
                className="hidden rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900 sm:inline-block"
              >
                {session ? 'Mi panel' : 'Iniciar sesión'}
              </button>
              <button
                onClick={handleDemoClick}
                className="group inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-slate-800 hover:shadow-md"
              >
                Probar demo
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </header>

        <main>
          {/* ─── Hero ─── */}
          <section className="relative overflow-hidden pt-20 pb-0 md:pt-28">
            {/* Background layers */}
            <div className="absolute inset-0 mesh-gradient" />
            <div className="absolute inset-0 bg-grid-fine opacity-60" />
            <div className="absolute left-1/2 top-[-100px] h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-200/30 to-indigo-200/10 blur-[140px]" />
            <div
              className="absolute left-1/2 top-[200px] h-[300px] w-[400px] -translate-x-1/2 rounded-full bg-indigo-200/20 blur-[120px]"
            />

            <div className="relative mx-auto max-w-4xl px-6 text-center">
              {/* Announcement pill */}
              <button
                onClick={handleDemoClick}
                className="group mb-8 inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/60 py-1.5 pl-1.5 pr-4 text-xs font-medium text-slate-600 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-slate-300 hover:shadow-md animate-fade-in-down"
              >
                <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 px-2.5 py-0.5 text-[11px] font-bold text-white">
                  <Sparkles className="h-3 w-3" />
                  Nuevo
                </span>
                Inteligencia Artificial para transitarias
                <ChevronRight className="h-3.5 w-3.5 text-slate-400 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>

              {/* Headline */}
              <h1 className="text-balance text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl md:text-7xl animate-fade-in-up">
                Cotizaciones logísticas
                <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 bg-clip-text text-transparent">
                  en segundos, no en horas
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-slate-500 text-balance animate-fade-in-up md:text-xl">
                La plataforma B2B para transitarios y agentes de aduanas. Sube tu tarifario y deja
                que la IA genere presupuestos profesionales de importación y exportación, 24/7.
              </p>

              {/* CTAs */}
              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row animate-fade-in-up">
                <button
                  onClick={handleDemoClick}
                  className="group btn-magnetic inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-blue-600/25"
                >
                  Probar Cotizador Demo
                  <ArrowRight className="h-4.5 w-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
                <a
                  href="#pricing"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-7 py-3.5 text-base font-semibold text-slate-700 shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md"
                >
                  Ver Planes
                </a>
              </div>
            </div>

            {/* ─── Hero Product Mockup ─── */}
            <div className="relative mx-auto mt-16 max-w-5xl px-6">
              <div className="absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
              <HeroDashboardMockup />
            </div>
          </section>

          {/* ─── Trust / Social Proof ─── */}
          <section className="relative border-y border-slate-200/60 bg-slate-50/50 py-14">
            <div className="mx-auto max-w-5xl px-6">
              <p className="mb-9 text-center text-xs font-semibold uppercase tracking-widest text-slate-400">
                Empresas que confían en nosotros
              </p>
              <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 md:gap-x-16">
                {companyLogos.map((company) => (
                  <div
                    key={company.name}
                    className="flex items-center gap-2 text-slate-400 grayscale transition-all duration-300 hover:text-slate-600 hover:grayscale-0"
                  >
                    <company.icon className="h-5 w-5" />
                    <span className="text-base font-semibold tracking-tight">{company.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Benefits / Features ─── */}
          <section id="benefits" className="relative py-24 md:py-32">
            <div className="absolute inset-0 bg-grid-fine opacity-40" />
            <div className="absolute left-1/4 top-1/4 h-[300px] w-[400px] rounded-full bg-blue-100/30 blur-[120px]" />
            <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[400px] rounded-full bg-indigo-100/20 blur-[120px]" />

            <div className="relative mx-auto max-w-5xl px-6">
              <div className="mb-16 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
                  Beneficios
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
                  Todo lo que tu transitaria necesita
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">
                  Tres ventajas que transforman tu departamento comercial.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {features.map((feature, idx) => (
                  <article
                    key={feature.title}
                    className="group relative rounded-2xl border border-slate-200/80 bg-white/80 p-8 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40 animate-fade-in-up"
                    style={{ animationDelay: `${idx * 100}ms` }}
                  >
                    <div className="mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-3.5 ring-1 ring-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:ring-blue-200">
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="mb-3 text-xl font-semibold text-slate-900">{feature.title}</h3>
                    <p className="text-sm leading-relaxed text-slate-500">{feature.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ─── How it works ─── */}
          <section id="how-it-works" className="relative py-24 md:py-32 bg-slate-50/50 border-y border-slate-200/60">
            <div className="mx-auto max-w-5xl px-6">
              <div className="mb-16 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
                  Proceso
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Cómo funciona</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">Tres pasos. Cero fricción. Tu transitaria automatizada.</p>
              </div>

              <div className="relative grid gap-6 md:grid-cols-3">
                <div className="absolute left-[16%] right-[16%] top-10 hidden h-px bg-gradient-to-r from-blue-200 via-indigo-200 to-blue-200 md:block" />

                {[
                  { icon: FileText, title: 'Sube tu tarifario', description: 'Introduce tus costes base de LCL, aduanas y márgenes por Incoterm. Sin hojas de cálculo complicadas.' },
                  { icon: Zap, title: 'La IA cotiza por ti', description: 'Cuando un cliente entra a tu enlace público, la IA calcula el flete y los aranceles al instante.' },
                  { icon: Users, title: 'Recibe leads automáticos', description: 'Cada cotización generada captura el contacto del cliente. Tú solo cierras el trato.' },
                ].map((step, idx) => (
                  <article
                    key={step.title}
                    className="group relative rounded-2xl border border-slate-200/80 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-100/40"
                  >
                    <div className="absolute top-5 right-6 text-7xl font-black leading-none text-slate-100 select-none transition-colors duration-300 group-hover:text-blue-50">
                      0{idx + 1}
                    </div>
                    <div className="relative mb-6 inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 p-3.5 ring-1 ring-blue-100 transition-all duration-300 group-hover:scale-110 group-hover:ring-blue-200">
                      <step.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="relative mb-3 text-xl font-semibold text-slate-900">{step.title}</h3>
                    <p className="relative text-sm leading-relaxed text-slate-500">{step.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* ─── Pricing ─── */}
          <section id="pricing" className="relative py-24 md:py-32">
            <div className="absolute inset-0 mesh-gradient" />
            <div className="absolute left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-b from-blue-200/20 to-indigo-200/10 blur-[150px]" />

            <div className="relative mx-auto max-w-3xl px-6">
              <div className="mb-16 text-center">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-500 shadow-sm">
                  Precios
                </div>
                <h2 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">Precio simple y transparente</h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-slate-500">Un plan. Todo incluido. Sin sorpresas.</p>
              </div>

              <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 p-10 shadow-2xl shadow-blue-100/30 backdrop-blur-md md:p-14 gradient-border">
                <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-gradient-to-br from-blue-100/40 to-indigo-100/20 blur-[100px]" />

                <div className="relative">
                  <div className="mb-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-50 to-indigo-50 px-3.5 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-200">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Plan Pro
                  </div>

                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl font-bold tracking-tight text-slate-900">49€</span>
                    <span className="text-lg text-slate-400">/mes</span>
                  </div>

                  <p className="mt-4 text-sm text-slate-500">
                    Facturación mensual. Cancela cuando quieras. Sin permanencia.
                  </p>

                  <ul className="mt-10 space-y-4">
                    {pricingFeatures.map((feat) => (
                      <li key={feat} className="flex items-center gap-3.5">
                        <div className="flex-shrink-0 rounded-full bg-gradient-to-br from-blue-50 to-indigo-50 p-1 ring-1 ring-blue-200">
                          <Check className="h-4 w-4 text-blue-600" />
                        </div>
                        <span className="text-sm text-slate-700">{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={session ? '/dashboard' : '/login'}
                    className="group btn-magnetic mt-12 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25"
                  >
                    Suscribirse por 49€/mes
                    <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
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

/* ─── Hero Dashboard Mockup Component ─── */
function HeroDashboardMockup() {
  const tariffRows = [
    { route: 'Shanghai → Valencia', incoterm: 'CIF', volume: '12 CBM', cost: '640€', margin: '+15%' },
    { route: 'Rotterdam → Barcelona', incoterm: 'FOB', volume: '8 CBM', cost: '320€', margin: '+18%' },
    { route: 'Nueva York → Bilbao', incoterm: 'EXW', volume: '15 CBM', cost: '975€', margin: '+12%' },
  ];

  return (
    <div className="animate-fade-in-up rounded-2xl border border-slate-200/80 bg-white/80 shadow-2xl shadow-slate-300/30 backdrop-blur-md" style={{ animationDelay: '200ms' }}>
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-slate-200/60 px-5 py-3">
        <div className="flex gap-2">
          <div className="h-3 w-3 rounded-full bg-red-400/70" />
          <div className="h-3 w-3 rounded-full bg-amber-400/70" />
          <div className="h-3 w-3 rounded-full bg-green-400/70" />
        </div>
        <div className="mx-auto flex items-center gap-2 rounded-lg bg-slate-100/80 px-3 py-1 text-xs text-slate-400">
          <Globe className="h-3 w-3" />
          logiquote.app/dashboard
        </div>
      </div>

      {/* Dashboard content */}
      <div className="grid grid-cols-3 gap-px bg-slate-200/60">
        {/* Sidebar mini */}
        <div className="hidden bg-white p-4 sm:block">
          <div className="mb-5 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Ship className="h-4 w-4" />
            </div>
            <span className="text-sm font-bold text-slate-900">LogiQuote</span>
          </div>
          <div className="space-y-1.5">
            {[
              { icon: TrendingUp, label: 'Dashboard', active: true },
              { icon: FileText, label: 'Cotizaciones' },
              { icon: Users, label: 'Leads' },
              { icon: MapPin, label: 'Enlace público' },
            ].map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-2 text-xs font-medium ${
                  item.active ? 'bg-blue-50 text-blue-700' : 'text-slate-400'
                }`}
              >
                <item.icon className="h-3.5 w-3.5" />
                {item.label}
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="col-span-3 bg-white p-5 sm:col-span-2">
          {/* KPI cards */}
          <div className="mb-4 grid grid-cols-3 gap-3">
            {[
              { label: 'Cotizaciones', value: '127', icon: FileText, trend: '+12%' },
              { label: 'Leads', value: '43', icon: Users, trend: '+8%' },
              { label: 'Conversión', value: '34%', icon: TrendingUp, trend: '+5%' },
            ].map((kpi) => (
              <div key={kpi.label} className="rounded-xl border border-slate-200/80 bg-slate-50/50 p-3">
                <div className="mb-2 flex items-center justify-between">
                  <kpi.icon className="h-4 w-4 text-blue-600" />
                  <span className="text-[10px] font-semibold text-blue-600">{kpi.trend}</span>
                </div>
                <p className="text-xl font-bold tracking-tight text-slate-900">{kpi.value}</p>
                <p className="text-[10px] text-slate-400">{kpi.label}</p>
              </div>
            ))}
          </div>

          {/* Tariff table */}
          <div className="rounded-xl border border-slate-200/80 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-200/60 bg-slate-50/50 px-4 py-2.5">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-semibold text-slate-700">Cotizaciones recientes</span>
              </div>
              <span className="rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-600">IA Activa</span>
            </div>
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400">
                  <th className="px-4 py-2 font-medium">Ruta</th>
                  <th className="px-3 py-2 font-medium">Incoterm</th>
                  <th className="px-3 py-2 font-medium">Volumen</th>
                  <th className="px-3 py-2 font-medium">Coste</th>
                  <th className="px-4 py-2 font-medium text-right">Margen</th>
                </tr>
              </thead>
              <tbody>
                {tariffRows.map((row) => (
                  <tr key={row.route} className="border-b border-slate-50 last:border-0 transition-colors hover:bg-blue-50/30">
                    <td className="px-4 py-2.5 font-medium text-slate-700">{row.route}</td>
                    <td className="px-3 py-2.5">
                      <span className="rounded-md bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">{row.incoterm}</span>
                    </td>
                    <td className="px-3 py-2.5 text-slate-500">{row.volume}</td>
                    <td className="px-3 py-2.5 font-semibold text-slate-700">{row.cost}</td>
                    <td className="px-4 py-2.5 text-right font-semibold text-blue-600">{row.margin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
