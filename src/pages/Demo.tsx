import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { Send, Loader2, Calendar, ArrowRight, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useToast } from '@/components/Toast';
import { siteConfig } from '@/lib/content';

export default function Demo() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !company.trim()) {
      showToast('Por favor, rellena todos los campos', 'error');
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setSent(true);
    showToast('Solicitud enviada. Te contactaremos en menos de 24h.', 'success');
  };

  return (
    <>
      <SEO
        title="Solicitar demo | LogiQuote — Demo guiada de 20 minutos"
        description="Reserva una demo guiada de 20 minutos con un especialista en tarifas. Verás el producto con datos reales de tu sector."
        canonical="https://logiquote.app/demo"
      />
      <div className="min-h-screen bg-bone">
        <Navbar />
        <main>
          <section className="border-b border-line">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                  <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Demo guiada</p>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight">20 minutos con un especialista en tarifas.</h1>
                  <p className="mt-6 text-lg text-ink-light leading-relaxed">
                    Reservamos una sesión contigo, vemos tu caso real y te mostramos cómo LogiQuote se adapta a tu flujo de trabajo.
                    Sin presentación comercial. Sin compromisos.
                  </p>

                  <div className="mt-10 space-y-4">
                    {[
                      'Vemos tu tarifario actual y cómo subirlo',
                      'Generamos una cotización real con tus datos',
                      'Configuramos tu enlace público de captación',
                      'Resolvemos tus dudas técnicas',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-signal flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-ink-light">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 pt-8 border-t border-line">
                    <p className="text-sm text-ink-muted">¿Prefieres escribir?</p>
                    <a href={`mailto:${siteConfig.email}`} className="text-signal font-mono text-sm link-underline">{siteConfig.email}</a>
                  </div>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <div className="bg-white border border-line p-8" style={{ borderRadius: '6px' }}>
                    {sent ? (
                      <div className="text-center py-12">
                        <div className="flex h-14 w-14 mx-auto items-center justify-center border border-success bg-success-bg mb-6" style={{ borderRadius: '6px' }}>
                          <Check className="h-6 w-6 text-success" />
                        </div>
                        <h2 className="text-xl font-display font-semibold text-ink mb-2">Solicitud recibida</h2>
                        <p className="text-sm text-ink-muted mb-6">Te contactaremos en menos de 24 horas para agendar la sesión.</p>
                        <Link to="/" className="btn-secondary">Volver al inicio</Link>
                      </div>
                    ) : (
                      <>
                        <h2 className="text-xl font-display font-semibold text-ink mb-2">Solicitar demo</h2>
                        <p className="text-sm text-ink-muted mb-6">Rellena el formulario y te contactamos en menos de 24h.</p>
                        <form onSubmit={handleSubmit} className="space-y-5">
                          <div>
                            <label className="label-field">Nombre</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" className="input-field" />
                          </div>
                          <div>
                            <label className="label-field">Email profesional</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" className="input-field" />
                          </div>
                          <div>
                            <label className="label-field">Empresa</label>
                            <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Tu transitaria o agencia" className="input-field" />
                          </div>
                          <button type="submit" disabled={sending} className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                            {sending ? <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</> : <><Send className="h-4 w-4" /> Solicitar demo <ArrowRight className="h-3.5 w-3.5" /></>}
                          </button>
                        </form>
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-muted font-mono">
                          <Calendar className="h-3.5 w-3.5" /> Sesión de 20 min · Por videollamada · Sin compromiso
                        </div>
                      </>
                    )}
                  </div>
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
