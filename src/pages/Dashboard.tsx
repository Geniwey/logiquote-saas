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
  ArrowRight,
  Container,
  Zap,
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

## Costes FCL
20' — 1.850€/contenedor
40' HC — 2.100€/contenedor

## Aranceles y Aduanas
- Despacho aduanero: 120€/operacion
- DUA: 35€
- Almacen fiscal: 8€/dia

## Margenes por Incoterm
- EXW: +18%
- FOB: +15%
- CIF: +12%
- DDP: +8%

## Recargos
- THC: 95€
- BAF: 45€
- ISPS: 12€`;

type Section = 'dashboard' | 'cotizaciones' | 'leads' | 'enlace' | 'ajustes';

const stats = [
  { label: 'Cotizaciones este mes', value: '127', icon: FileText, trend: '+12%' },
  { label: 'Leads capturados', value: '43', icon: Users, trend: '+8%' },
  { label: 'Tasa de conversión', value: '34%', icon: TrendingUp, trend: '+5%' },
];

const navItems: { label: string; section: Section; icon: typeof LayoutDashboard }[] = [
  { label: 'Dashboard', section: 'dashboard', icon: LayoutDashboard },
  { label: 'Cotizaciones', section: 'cotizaciones', icon: FileText },
  { label: 'Leads', section: 'leads', icon: Users },
  { label: 'Enlace público', section: 'enlace', icon: Link2 },
  { label: 'Ajustes', section: 'ajustes', icon: Settings },
];

const proFeatures = [
  { icon: FileText, title: 'Tarifario ilimitado', desc: 'Guarda y edita todas tus tarifas en la nube' },
  { icon: Zap, title: 'Cotizaciones con IA', desc: 'Presupuestos automáticos en segundos' },
  { icon: Link2, title: 'Enlace público premium', desc: 'Comparte tu cotizador sin límites' },
  { icon: TrendingUp, title: 'Analytics avanzados', desc: 'Métricas de conversión en tiempo real' },
];

const recentQuotes = [
  { ref: 'LQ-284901', email: 'm.torres@importsl.es', route: 'Shanghai → Valencia', volume: '3,8 CBM', total: '2.450€', date: '28 sep' },
  { ref: 'LQ-284890', email: 'compras@distribuidora.com', route: 'Rotterdam → Barcelona', volume: '8 CBM', total: '320€', date: '27 sep' },
  { ref: 'LQ-284872', email: 'j.ruiz@aduanas.es', route: 'Nueva York → Bilbao', volume: '15 CBM', total: '975€', date: '26 sep' },
  { ref: 'LQ-284855', email: 'logistica@amarpe.com', route: 'Hong Kong → Valencia', volume: '12 CBM', total: '640€', date: '25 sep' },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { user, signOut } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('dashboard');
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
        if (mounted) setLoadError('No se pudo cargar el tarifario. Puedes seguir editando y guardar más tarde.');
      } finally {
        if (mounted) setIsLoading(false);
      }
    }
    loadTariff();
    return () => { mounted = false; };
  }, [user]);

  const handleSave = async () => {
    if (!user) return;
    setIsSaving(true);
    try {
      const { error } = await supabase
        .from('empresas')
        .upsert({ user_id: user.id, tarifario: tariff, updated_at: new Date().toISOString() });
      if (error) throw error;
      setIsDirty(false);
      setLastUpdated(new Date());
      showToast('Tarifario guardado', 'success');
    } catch {
      showToast('Error al guardar el tarifario', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/cotizador/demo`);
    setCopied(true);
    showToast('Enlace copiado', 'info');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSignOut = async () => {
    await signOut();
    showToast('Sesión cerrada', 'info');
    navigate('/');
  };

  const handleComingSoon = (feature: string) => {
    showToast(`Próximamente: ${feature}`, 'info');
  };

  const userEmail = user?.email ?? '';
  const userInitials = userEmail.slice(0, 2).toUpperCase();
  const lineCount = tariff.split('\n').length;

  const sectionLabels: Record<Section, string> = {
    dashboard: 'Dashboard',
    cotizaciones: 'Cotizaciones',
    leads: 'Leads',
    enlace: 'Enlace público',
    ajustes: 'Ajustes',
  };

  return (
    <>
      <SEO title="Dashboard | LogiQuote" description="Panel de control de LogiQuote." />

      <div className="min-h-screen bg-bone flex">
        {/* Sidebar */}
        <aside className="fixed left-0 top-0 bottom-0 hidden w-60 bg-white border-r border-line flex-col md:flex">
          <div className="border-b border-line px-5 py-4">
            <Logo size="sm" />
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-5">
            <nav className="space-y-px">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => setActiveSection(item.section)}
                  className={`flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors duration-150 ${
                    activeSection === item.section
                      ? 'bg-bone text-signal font-semibold'
                      : 'text-ink-light hover:bg-bone hover:text-ink'
                  }`}
                  style={{ borderRadius: '4px' }}
                >
                  <item.icon className="h-[18px] w-[18px]" />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="border-t border-line p-3">
            <div className="flex items-center gap-3 px-2 py-2 mb-1">
              <div className="flex h-8 w-8 items-center justify-center bg-navy text-white text-xs font-mono font-bold" style={{ borderRadius: '50%' }}>
                {userInitials}
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-ink">{userEmail}</p>
                <p className="truncate text-xs text-ink-muted">Plan Pro · Activo</p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors duration-150 hover:bg-bone hover:text-ink"
              style={{ borderRadius: '4px' }}
            >
              <LogOut className="h-[18px] w-[18px]" />
              Cerrar sesión
            </button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 md:ml-60">
          {/* Top bar */}
          <div className="sticky top-0 z-30 border-b border-line bg-bone/95 backdrop-blur-sm">
            <div className="flex items-center justify-between px-6 py-4 md:px-10">
              <div className="md:hidden">
                <Logo size="sm" />
              </div>
              <div className="hidden md:flex items-center gap-2 text-sm">
                <span className="text-ink-muted">Panel</span>
                <ChevronRight className="h-3.5 w-3.5 text-line-dark" />
                <span className="font-medium text-ink">{sectionLabels[activeSection]}</span>
              </div>
              <div className="flex items-center gap-3">
                <button onClick={() => handleComingSoon('Notificaciones')} className="flex h-9 w-9 items-center justify-center border border-line bg-white text-ink-muted transition-colors hover:text-ink" style={{ borderRadius: '4px' }}>
                  <Bell className="h-4 w-4" />
                </button>
                <Link to="/cotizador/demo" className="btn-secondary">
                  <ExternalLink className="h-3.5 w-3.5" />
                  Ver cotizador
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          {activeSection === 'dashboard' && (
            <div className="px-6 py-10 md:px-10 md:py-12">
              <div className="mb-12">
                <h1 className="text-3xl font-display font-bold text-ink">Panel de control</h1>
                <p className="mt-2 text-ink-muted">Gestiona tu tarifario y enlace público de cotización.</p>
              </div>

              {/* Stats */}
              <div className="mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {stats.map((stat) => (
                  <div key={stat.label} className="card">
                    <div className="flex items-center justify-between mb-4">
                      <stat.icon className="h-5 w-5 text-signal" />
                      <span className="text-xs font-mono text-success">{stat.trend}</span>
                    </div>
                    <p className="text-3xl font-mono font-bold text-ink">{stat.value}</p>
                    <p className="mt-1 text-sm text-ink-muted">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent quotes table */}
              <div className="mb-14">
                <h2 className="text-xl font-display font-semibold text-ink mb-4">Cotizaciones recientes</h2>
                <div className="bg-white border border-line overflow-x-auto scrollbar-thin" style={{ borderRadius: '6px' }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-line text-xs text-ink-muted">
                        <th className="text-left px-5 py-3 font-medium">Referencia</th>
                        <th className="text-left px-3 py-3 font-medium">Cliente</th>
                        <th className="text-left px-3 py-3 font-medium">Ruta</th>
                        <th className="text-left px-3 py-3 font-medium">Vol.</th>
                        <th className="text-right px-3 py-3 font-medium">Total</th>
                        <th className="text-right px-5 py-3 font-medium">Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono">
                      {recentQuotes.map((q) => (
                        <tr key={q.ref} className="border-b border-line/60 last:border-0">
                          <td className="px-5 py-3 text-ink">{q.ref}</td>
                          <td className="px-3 py-3 text-ink-muted text-xs">{q.email}</td>
                          <td className="px-3 py-3 text-ink text-xs">{q.route}</td>
                          <td className="px-3 py-3 text-ink-muted text-xs">{q.volume}</td>
                          <td className="px-3 py-3 text-right font-semibold text-signal">{q.total}</td>
                          <td className="px-5 py-3 text-right text-ink-muted text-xs">{q.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Load error */}
              {loadError && (
                <div className="mb-6 flex items-start gap-3 border border-warning bg-warning-bg p-4" style={{ borderRadius: '6px' }}>
                  <AlertCircle className="h-5 w-5 flex-shrink-0 text-warning" />
                  <p className="text-sm text-warning">{loadError}</p>
                </div>
              )}

              {/* Tariff editor */}
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <FileText className="h-5 w-5 text-signal" />
                  <h2 className="text-xl font-display font-semibold text-ink">Tu Tarifario Base</h2>
                </div>

                <div className="bg-white border border-line overflow-hidden" style={{ borderRadius: '6px' }}>
                  <div className="flex items-center justify-between border-b border-line bg-bone px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1.5">
                        <Circle className="h-2.5 w-2.5 fill-line-dark text-line-dark" />
                        <Circle className="h-2.5 w-2.5 fill-line-dark text-line-dark" />
                        <Circle className="h-2.5 w-2.5 fill-line-dark text-line-dark" />
                      </div>
                      <span className="text-xs font-mono text-ink-muted">tarifario_base.md</span>
                    </div>
                    <div className="flex items-center gap-3">
                      {isDirty && <span className="text-xs font-mono text-signal">● Cambios sin guardar</span>}
                      <span className="text-xs font-mono text-ink-muted">{lineCount} líneas</span>
                    </div>
                  </div>

                  <div className="flex bg-ink">
                    <div className="select-none border-r border-white/10 px-4 py-5 text-right font-mono text-xs leading-relaxed text-white/30" style={{ minWidth: '3.5rem' }}>
                      {Array.from({ length: lineCount }).map((_, i) => <div key={i}>{i + 1}</div>)}
                    </div>
                    {isLoading ? (
                      <div className="flex h-96 flex-1 items-center justify-center">
                        <Loader2 className="h-5 w-5 animate-spin text-white/40" />
                      </div>
                    ) : (
                      <textarea
                        value={tariff}
                        onChange={(e) => { setTariff(e.target.value); setIsDirty(true); }}
                        spellCheck={false}
                        className="h-96 flex-1 resize-none bg-transparent py-5 pr-5 font-mono text-sm leading-relaxed text-white/90 outline-none placeholder:text-white/30"
                        placeholder="# Escribe tus tarifas base aquí..."
                      />
                    )}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <p className="flex items-center gap-1.5 text-xs text-ink-muted font-mono">
                    <Calendar className="h-3.5 w-3.5" />
                    Última actualización: {lastUpdated ? lastUpdated.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' }) : 'Sin guardar todavía'}
                  </p>
                  <button onClick={handleSave} disabled={isSaving || isLoading} className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                    {isSaving ? <><Loader2 className="h-4 w-4 animate-spin" /> Guardando...</> : <><Save className="h-4 w-4" /> Guardar Tarifario</>}
                  </button>
                </div>
              </div>

              {/* Public link */}
              <div className="mb-14">
                <div className="flex items-center gap-3 mb-4">
                  <Link2 className="h-5 w-5 text-signal" />
                  <h2 className="text-xl font-display font-semibold text-ink">Tu enlace público para clientes</h2>
                </div>
                <div className="card">
                  <div className="flex flex-col items-stretch gap-3 sm:flex-row">
                    <div className="flex flex-1 items-center gap-3 border border-line bg-bone px-4 py-3" style={{ borderRadius: '4px' }}>
                      <Link2 className="h-4 w-4 flex-shrink-0 text-ink-muted" />
                      <span className="flex-1 truncate font-mono text-sm text-signal">{window.location.origin}/cotizador/demo</span>
                    </div>
                    <button onClick={copyLink} className="btn-secondary">
                      {copied ? <><Check className="h-4 w-4 text-signal" /> Copiado</> : <><Copy className="h-4 w-4" /> Copiar</>}
                    </button>
                    <Link to="/cotizador/demo" className="btn-primary"><ExternalLink className="h-3.5 w-3.5" /> Abrir</Link>
                  </div>
                </div>
              </div>

              {/* Pro features */}
              <div>
                <h2 className="text-xl font-display font-semibold text-ink mb-4">Funciones premium</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {proFeatures.map((f) => (
                    <div key={f.title} className="card">
                      <div className="flex items-start gap-4">
                        <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center border border-line bg-bone" style={{ borderRadius: '4px' }}>
                          <f.icon className="h-4 w-4 text-signal" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ink">{f.title}</p>
                          <p className="mt-1 text-xs text-ink-muted">{f.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeSection === 'cotizaciones' && (
            <EmptySection icon={FileText} title="Cotizaciones" desc="Aquí verás todas las cotizaciones generadas por tus clientes." onCta={() => handleComingSoon('Historial de Cotizaciones')} />
          )}
          {activeSection === 'leads' && (
            <EmptySection icon={Users} title="Leads capturados" desc="Cada cotización captura el email del cliente automáticamente." onCta={() => handleComingSoon('Gestión de Leads')} />
          )}
          {activeSection === 'enlace' && (
            <div className="px-6 py-10 md:px-10 md:py-12">
              <h1 className="text-3xl font-display font-bold text-ink mb-2">Enlace público</h1>
              <p className="text-ink-muted mb-8">Comparte este enlace con tus clientes para que coticen al instante.</p>
              <div className="card mb-6">
                <div className="flex flex-col items-stretch gap-3 sm:flex-row">
                  <div className="flex flex-1 items-center gap-3 border border-line bg-bone px-4 py-3" style={{ borderRadius: '4px' }}>
                    <Link2 className="h-4 w-4 flex-shrink-0 text-ink-muted" />
                    <span className="flex-1 truncate font-mono text-sm text-signal">{window.location.origin}/cotizador/demo</span>
                  </div>
                  <button onClick={copyLink} className="btn-secondary">{copied ? <><Check className="h-4 w-4 text-signal" /> Copiado</> : <><Copy className="h-4 w-4" /> Copiar</>}</button>
                  <Link to="/cotizador/demo" className="btn-primary"><ExternalLink className="h-3.5 w-3.5" /> Abrir</Link>
                </div>
              </div>
              <div className="card">
                <h3 className="text-sm font-semibold text-ink mb-3">Personalización</h3>
                <div className="space-y-2">
                  <button onClick={() => handleComingSoon('URL personalizada')} className="flex w-full items-center justify-between border border-line px-4 py-3 text-sm text-ink-light transition-colors hover:bg-bone" style={{ borderRadius: '4px' }}>
                    URL personalizada con tu marca <ChevronRight className="h-4 w-4 text-ink-muted" />
                  </button>
                  <button onClick={() => handleComingSoon('Código QR')} className="flex w-full items-center justify-between border border-line px-4 py-3 text-sm text-ink-light transition-colors hover:bg-bone" style={{ borderRadius: '4px' }}>
                    Generar código QR <ChevronRight className="h-4 w-4 text-ink-muted" />
                  </button>
                </div>
              </div>
            </div>
          )}
          {activeSection === 'ajustes' && (
            <div className="px-6 py-10 md:px-10 md:py-12">
              <h1 className="text-3xl font-display font-bold text-ink mb-2">Ajustes</h1>
              <p className="text-ink-muted mb-8">Gestiona tu cuenta y configuración.</p>
              <div className="max-w-2xl space-y-6">
                <div className="card">
                  <h3 className="text-sm font-semibold text-ink mb-4">Cuenta</h3>
                  <div className="flex items-center gap-4 border border-line bg-bone px-4 py-3" style={{ borderRadius: '4px' }}>
                    <div className="flex h-9 w-9 items-center justify-center bg-navy text-white text-xs font-mono font-bold" style={{ borderRadius: '50%' }}>{userInitials}</div>
                    <div>
                      <p className="text-sm font-medium text-ink">{userEmail}</p>
                      <p className="text-xs text-ink-muted">Plan Pro · Activo</p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <h3 className="text-sm font-semibold text-ink mb-4">Integraciones</h3>
                  <div className="space-y-2">
                    {[
                      { icon: Container, label: 'Integración ERP' },
                      { icon: FileText, label: 'Exportación PDF masiva' },
                      { icon: Bell, label: 'Webhook de leads' },
                    ].map((item) => (
                      <button key={item.label} onClick={() => handleComingSoon(item.label)} className="flex w-full items-center justify-between border border-line px-4 py-3 text-sm text-ink-light transition-colors hover:bg-bone" style={{ borderRadius: '4px' }}>
                        <span className="flex items-center gap-3"><item.icon className="h-4 w-4 text-ink-muted" /> {item.label}</span>
                        <ChevronRight className="h-4 w-4 text-ink-muted" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </>
  );
}

function EmptySection({ icon: Icon, title, desc, onCta }: { icon: typeof FileText; title: string; desc: string; onCta: () => void }) {
  return (
    <div className="px-6 py-10 md:px-10 md:py-12">
      <h1 className="text-3xl font-display font-bold text-ink mb-2">{title}</h1>
      <p className="text-ink-muted mb-12">{desc}</p>
      <div className="border border-line bg-white p-16 text-center" style={{ borderRadius: '6px' }}>
        <div className="flex h-14 w-14 mx-auto items-center justify-center border border-line bg-bone mb-6" style={{ borderRadius: '6px' }}>
          <Icon className="h-6 w-6 text-ink-muted" />
        </div>
        <h2 className="text-xl font-display font-semibold text-ink mb-2">Próximamente</h2>
        <p className="text-sm text-ink-muted mb-6 max-w-sm mx-auto">Estamos trabajando en esta funcionalidad. Pronto podrás gestionar todo desde aquí.</p>
        <button onClick={onCta} className="btn-primary">Notificarme al lanzar <ArrowRight className="h-3.5 w-3.5" /></button>
      </div>
    </div>
  );
}
