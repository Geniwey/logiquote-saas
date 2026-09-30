import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  Link2,
  Settings,
  LogOut,
  Save,
  Copy,
  Check,
  ExternalLink,
  Calendar,
  TrendingUp,
  Users,
  ChevronRight,
  Circle,
  Loader2,
  AlertCircle,
  Lock,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Container,
  Plane,
  Zap,
  Mail,
  Bell,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useToast } from '@/components/Toast';
import { useAuth } from '@/lib/auth';
import { supabase } from '@/lib/supabase';
import { SEO } from '@/components/SEO';

const DEFAULT_TARIFF = `# TARIFARIO BASE — LogiQuote

## Costes LCL (Less than Container Load)
- Origen Asia: 45€/CBM
- Origen USA: 65€/CBM
- Minimo: 35 CBM

## Aranceles y Aduanas
- Despacho aduanero: 120€/operacion
- DUA: 35€
- Almacen fiscal: 8€/dia

## Margenes por Incoterm
- EXW: +18%
- FOB: +15%
- CIF: +12%

## Recargos
- THC: 95€
- BAF: 45€
- ISPS: 12€`;

type SidebarSection = 'dashboard' | 'cotizaciones' | 'leads' | 'enlace' | 'ajustes';

const stats = [
  { label: 'Cotizaciones este mes', value: '127', icon: FileText, trend: '+12%', trendColor: 'text-blue-600' },
  { label: 'Leads capturados', value: '43', icon: Users, trend: '+8%', trendColor: 'text-blue-600' },
  { label: 'Tasa de conversion', value: '34%', icon: TrendingUp, trend: '+5%', trendColor: 'text-blue-600' },
];

const navSections: { label: string; items: { icon: typeof LayoutDashboard; label: string; section: SidebarSection }[] }[] = [
  {
    label: 'General',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', section: 'dashboard' },
      { icon: FileText, label: 'Cotizaciones', section: 'cotizaciones' },
      { icon: Users, label: 'Leads', section: 'leads' },
    ],
  },
  {
    label: 'Sistema',
    items: [
      { icon: Link2, label: 'Enlace publico', section: 'enlace' },
      { icon: Settings, label: 'Ajustes', section: 'ajustes' },
    ],
  },
];

const proFeatures = [
  { icon: FileText, title: 'Tarifario ilimitado', desc: 'Guarda y edita todas tus tarifas base en la nube' },
  { icon: Zap, title: 'Cotizaciones con IA', desc: 'Presupuestos automaticos generados con IA en segundos' },
  { icon: Link2, title: 'Enlace publico premium', desc: 'Comparte tu cotizador con clientes sin limites' },
  { icon: TrendingUp, title: 'Analytics avanzados', desc: 'Metricas de conversion y leads en tiempo real' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState<SidebarSection>('dashboard');
  const [tariff, setTariff] = useState(DEFAULT_TARIFF);
  const [copied, setCopied] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    let mounted = true;

    async function loadTariff() {
      if (!user) return;
      try {
        const { data, error } = await supabase
          .from('empresas')
          .select('tarifario, updated_at')
          .eq('user_id', user.id)
          .maybeSingle();

        if (error) throw error;

        if (mounted) {
          if (data?.tarifario) {
            setTariff(data.tarifario);
            setLastUpdated(data.updated_at ? new Date(data.updated_at) : null);
          }
          setLoadError(null);
        }
      } catch {
        if (mounted) {
          setLoadError('No se pudo cargar el tarifario desde la base de datos. Puedes seguir editando y guardar mas tarde.');
        }
      } finally {
        if (mounted) setIsLoading(false);
      }
    }

    loadTariff();

    return () => {
      mounted = false;
    };
  }, [user]);

  const handleTariffChange = (value: string) => {
    setTariff(value);
    setIsDirty(true);
  };

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('empresas')
        .upsert({
          user_id: user.id,
          tarifario: tariff,
          updated_at: new Date().toISOString(),
        });

      if (error) throw error;

      setIsDirty(false);
      setLastUpdated(new Date());
      showToast('Tarifario guardado correctamente', 'success');
    } catch {
      showToast('Error al guardar el tarifario en la base de datos', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const copyLink = () => {
    const url = `${window.location.origin}/cotizador/demo`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    showToast('Enlace copiado al portapapeles', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    showToast('Sesión cerrada correctamente', 'info');
    navigate('/');
  };

  const handleComingSoon = (featureName: string) => {
    showToast(`Funcionalidad premium disponible próximamente: ${featureName}`, 'info');
  };

  const userEmail = user?.email ?? '';
  const userInitials = userEmail.slice(0, 2).toUpperCase();

  const lineCount = tariff.split('\n').length;

  const sectionTitle = (() => {
    switch (activeSection) {
      case 'dashboard': return 'Dashboard';
      case 'cotizaciones': return 'Cotizaciones';
      case 'leads': return 'Leads';
      case 'enlace': return 'Enlace público';
      case 'ajustes': return 'Ajustes';
    }
  })();

  return (
    <>
      <SEO title="Dashboard | LogiQuote" description="Panel de control de LogiQuote." />

      <div className="min-h-screen bg-slate-50 flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 bottom-0 hidden w-64 border-r border-slate-200 bg-white flex-col md:flex">
          <div className="border-b border-slate-200 px-5 py-5">
            <Logo size="sm" />
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-5">
            {navSections.map((section) => (
              <div key={section.label} className="mb-6">
                <p className="px-3 pb-2.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  {section.label}
                </p>
                <nav className="space-y-1">
                  {section.items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => setActiveSection(item.section)}
                      className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-300 ${
                        activeSection === item.section
                          ? 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <item.icon className="h-[18px] w-[18px]" />
                      {item.label}
                      {activeSection === item.section && <ChevronRight className="ml-auto h-4 w-4" />}
                    </button>
                  ))}
                </nav>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 p-3">
            <div className="mb-2 flex items-center gap-3 rounded-lg px-3 py-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
                {userInitials}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-slate-900">{userEmail}</p>
                <p className="truncate text-xs text-slate-400">Plan Pro · Activo</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-500 transition-all duration-300 hover:bg-slate-50 hover:text-slate-900"
            >
              <LogOut className="h-[18px] w-[18px]" />
              Cerrar sesion
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 md:ml-64">
          {/* Top bar */}
          <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur-xl">
            <div className="flex items-center justify-between px-6 py-4 md:px-10">
              <div className="md:hidden">
                <Logo size="sm" />
              </div>
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-slate-400">Panel</span>
                <ChevronRight className="h-4 w-4 text-slate-300" />
                <span className="text-sm font-medium text-slate-900">{sectionTitle}</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleComingSoon('Notificaciones')}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-500 transition-all duration-300 hover:border-slate-300 hover:text-slate-700"
                >
                  <Bell className="h-4 w-4" />
                </button>
                <Link
                  to="/cotizador/demo"
                  className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
                >
                  <ExternalLink className="h-4 w-4" />
                  Ver cotizador
                </Link>
              </div>
            </div>
          </div>

          {/* Section content */}
          {activeSection === 'dashboard' && (
            <DashboardSection
              stats={stats}
              loadError={loadError}
              isLoading={isLoading}
              tariff={tariff}
              lineCount={lineCount}
              isDirty={isDirty}
              isSaving={isSaving}
              lastUpdated={lastUpdated}
              onTariffChange={handleTariffChange}
              onSave={handleSave}
              copied={copied}
              copyLink={copyLink}
              handleComingSoon={handleComingSoon}
            />
          )}

          {activeSection === 'cotizaciones' && (
            <PlaceholderSection
              icon={FileText}
              title="Cotizaciones"
              description="Aquí verás todas las cotizaciones generadas por tus clientes a través de tu enlace público."
              onCTA={() => handleComingSoon('Historial de Cotizaciones')}
            />
          )}

          {activeSection === 'leads' && (
            <PlaceholderSection
              icon={Users}
              title="Leads capturados"
              description="Cada cotización generada por un cliente captura su email y datos de contacto automáticamente."
              onCTA={() => handleComingSoon('Gestión de Leads')}
            />
          )}

          {activeSection === 'enlace' && (
            <PublicLinkSection copied={copied} copyLink={copyLink} handleComingSoon={handleComingSoon} />
          )}

          {activeSection === 'ajustes' && (
            <SettingsSection userEmail={userEmail} handleComingSoon={handleComingSoon} />
          )}
        </main>
      </div>
    </>
  );
}

function DashboardSection({
  stats,
  loadError,
  isLoading,
  tariff,
  lineCount,
  isDirty,
  isSaving,
  lastUpdated,
  onTariffChange,
  onSave,
  copied,
  copyLink,
  handleComingSoon,
}: {
  stats: { label: string; value: string; icon: typeof FileText; trend: string; trendColor: string }[];
  loadError: string | null;
  isLoading: boolean;
  tariff: string;
  lineCount: number;
  isDirty: boolean;
  isSaving: boolean;
  lastUpdated: Date | null;
  onTariffChange: (value: string) => void;
  onSave: () => void;
  copied: boolean;
  copyLink: () => void;
  handleComingSoon: (feature: string) => void;
}) {
  return (
    <div className="px-6 py-10 md:px-10 md:py-12">
      {/* Page header */}
      <div className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Panel de control</h1>
        <p className="mt-2 text-slate-500">Gestiona tu tarifario y enlace publico de cotizacion.</p>
      </div>

      {/* Stats */}
      <div className="mb-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-lg hover:border-slate-300"
          >
            <div className="flex items-center justify-between">
              <div className="rounded-lg border border-slate-100 bg-slate-50 p-2.5 transition-all duration-300 group-hover:border-blue-200">
                <stat.icon className="h-5 w-5 text-blue-600" />
              </div>
              <span className={`text-xs font-semibold ${stat.trendColor}`}>{stat.trend}</span>
            </div>
            <p className="mt-5 text-3xl font-bold tracking-tight text-slate-900">{stat.value}</p>
            <p className="mt-1.5 text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Load error banner */}
      {loadError && (
        <div className="mb-6 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-amber-600" />
          <p className="text-sm text-amber-800">{loadError}</p>
        </div>
      )}

      {/* Tarifario - Code Editor */}
      <div className="mb-14">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="h-6 w-6 text-blue-600" />
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900">Tu Tarifario Base</h2>
              <p className="mt-1 text-sm text-slate-500">
                Define tus costes base de LCL, aduanas y margenes por Incoterm.
              </p>
            </div>
          </div>
        </div>

        {/* Editor card */}
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {/* Editor header bar */}
          <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/80 px-5 py-3">
            <div className="flex items-center gap-3">
              <div className="flex gap-2">
                <Circle className="h-3 w-3 fill-red-300 text-red-300" />
                <Circle className="h-3 w-3 fill-amber-300 text-amber-300" />
                <Circle className="h-3 w-3 fill-green-300 text-green-300" />
              </div>
              <span className="ml-2 text-xs font-medium text-slate-400">tarifario_base.md</span>
            </div>
            <div className="flex items-center gap-3">
              {isDirty && (
                <span className="flex items-center gap-1.5 text-xs text-amber-600">
                  <Circle className="h-2 w-2 fill-amber-500 text-amber-500" />
                  Cambios sin guardar
                </span>
              )}
              <span className="text-xs text-slate-400">{lineCount} lineas</span>
            </div>
          </div>

          {/* Editor body */}
          <div className="relative flex bg-slate-900">
            {/* Line numbers */}
            <div className="select-none border-r border-slate-700/40 px-4 py-5 text-right font-mono text-xs leading-relaxed text-slate-500" style={{ minWidth: '3.5rem' }}>
              {Array.from({ length: lineCount }).map((_, i) => (
                <div key={i}>{i + 1}</div>
              ))}
            </div>

            {/* Textarea */}
            {isLoading ? (
              <div className="flex h-96 flex-1 items-center justify-center">
                <Loader2 className="h-6 w-6 animate-spin text-slate-600" />
              </div>
            ) : (
              <textarea
                value={tariff}
                onChange={(e) => onTariffChange(e.target.value)}
                spellCheck={false}
                className="h-96 flex-1 resize-none bg-transparent py-5 pr-5 font-mono text-sm leading-relaxed text-slate-200 outline-none transition-all placeholder:text-slate-600"
                placeholder="# Escribe tus tarifas base aqui..."
              />
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs text-slate-400">
            <Calendar className="h-3.5 w-3.5" />
            Ultima actualizacion:{' '}
            {lastUpdated
              ? lastUpdated.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
              : 'Sin guardar todavia'}
          </p>
          <button
            onClick={onSave}
            disabled={isSaving || isLoading}
            className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSaving ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                Guardar Tarifario
              </>
            )}
          </button>
        </div>
      </div>

      {/* Public Link */}
      <div className="mb-8">
        <div className="mb-3 flex items-center gap-3">
          <Link2 className="h-6 w-6 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">Tu enlace publico para clientes</h2>
            <p className="mt-1 text-sm text-slate-500">
              Comparte este enlace con tus clientes. Cotizaran al instante sin ver tus tarifas privadas.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex flex-col items-stretch gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
              <Link2 className="h-4 w-4 flex-shrink-0 text-slate-400" />
              <span className="flex-1 truncate font-mono text-sm text-blue-600">
                {window.location.origin}/cotizador/demo
              </span>
            </div>
            <button
              onClick={copyLink}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-blue-600" />
                  Copiado
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  Copiar
                </>
              )}
            </button>
            <Link
              to="/cotizador/demo"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-md"
            >
              <ExternalLink className="h-4 w-4" />
              Abrir
            </Link>
          </div>
        </div>
      </div>

      {/* Pro features preview */}
      <div className="mb-8">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-slate-900">Funciones premium</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {proFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-slate-50/50 p-5 transition-all duration-300 hover:border-blue-200"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-sm">
                <feature.icon className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-slate-900">{feature.title}</p>
                <p className="mt-1 text-xs text-slate-500 leading-relaxed">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PlaceholderSection({
  icon: Icon,
  title,
  description,
  onCTA,
}: {
  icon: typeof FileText;
  title: string;
  description: string;
  onCTA: () => void;
}) {
  return (
    <div className="px-6 py-10 md:px-10 md:py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
        <p className="mt-2 text-slate-500">{description}</p>
      </div>

      <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-100/30 blur-3xl" />

        <div className="relative px-8 py-16 md:px-16 md:py-20 text-center">
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-2xl bg-blue-200/20" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-blue-200 bg-blue-50">
                <Icon className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>

          <h2 className="text-2xl font-bold tracking-tight text-slate-900">Próximamente</h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-500">
            Estamos trabajando en esta funcionalidad. Pronto podrás gestionar todo desde aquí.
          </p>

          <button
            onClick={onCTA}
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl"
          >
            Notificarme al lanzar
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function PublicLinkSection({
  copied,
  copyLink,
  handleComingSoon,
}: {
  copied: boolean;
  copyLink: () => void;
  handleComingSoon: (feature: string) => void;
}) {
  return (
    <div className="px-6 py-10 md:px-10 md:py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Enlace público</h1>
        <p className="mt-2 text-slate-500">Comparte este enlace con tus clientes para que coticen al instante.</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col items-stretch gap-3 sm:flex-row">
          <div className="flex flex-1 items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
            <Link2 className="h-4 w-4 flex-shrink-0 text-slate-400" />
            <span className="flex-1 truncate font-mono text-sm text-blue-600">
              {window.location.origin}/cotizador/demo
            </span>
          </div>
          <button
            onClick={copyLink}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3.5 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-blue-600" />
                Copiado
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                Copiar
              </>
            )}
          </button>
          <Link
            to="/cotizador/demo"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-slate-800 hover:shadow-md"
          >
            <ExternalLink className="h-4 w-4" />
            Abrir
          </Link>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50/50 p-6">
        <h3 className="mb-4 text-sm font-semibold text-slate-900">Personalización del enlace</h3>
        <div className="space-y-3">
          <button
            onClick={() => handleComingSoon('Personalizar URL')}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
          >
            <span>URL personalizada con tu marca</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>
          <button
            onClick={() => handleComingSoon('QR Code')}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
          >
            <span>Generar código QR</span>
            <ChevronRight className="h-4 w-4 text-slate-400" />
          </button>
        </div>
      </div>
    </div>
  );
}

function SettingsSection({
  userEmail,
  handleComingSoon,
}: {
  userEmail: string;
  handleComingSoon: (feature: string) => void;
}) {
  return (
    <div className="px-6 py-10 md:px-10 md:py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Ajustes</h1>
        <p className="mt-2 text-slate-500">Gestiona tu cuenta y configuración.</p>
      </div>

      <div className="max-w-2xl space-y-6">
        {/* Account card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Cuenta</h3>
          <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white">
              {userEmail.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-slate-900">{userEmail}</p>
              <p className="text-xs text-slate-400">Plan Pro · Activo</p>
            </div>
          </div>
        </div>

        {/* Integrations */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold text-slate-900">Integraciones</h3>
          <div className="space-y-3">
            <button
              onClick={() => handleComingSoon('Integración ERP')}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
            >
              <span className="flex items-center gap-3">
                <Container className="h-4 w-4 text-slate-400" />
                Integración ERP
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleComingSoon('Exportación PDF masiva')}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
            >
              <span className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-slate-400" />
                Exportación PDF masiva
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleComingSoon('Webhook de leads')}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-700 transition-all duration-300 hover:border-slate-300 hover:shadow-sm"
            >
              <span className="flex items-center gap-3">
                <Bell className="h-4 w-4 text-slate-400" />
                Webhook de leads
              </span>
              <ChevronRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
