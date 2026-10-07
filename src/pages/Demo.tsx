import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send, Loader2, ArrowRight, Check } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useToast } from '@/components/Toast';
import { supabase } from '@/lib/supabase';
import { easeOut, staggerContainer, staggerItem, scaleIn } from '@/lib/animations';

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
    try {
      const { error } = await supabase.from('leads').insert({
        source: 'demo',
        name: name.trim(),
        email: email.trim(),
        company: company.trim(),
      });
      if (error) throw error;
      setSent(true);
      showToast('Solicitud enviada. Te contactaremos en menos de 24h.', 'success');
    } catch {
      showToast('Error al enviar. Inténtalo de nuevo.', 'error');
    } finally {
      setSending(false);
    }
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
          <section className="border-b border-line-light relative overflow-hidden" aria-label="Solicitar demo guiada">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-signal/[0.05] blur-[120px]" />
            </div>
            <div className="relative mx-auto max-w-9xl px-6 py-32">
              <div className="grid lg:grid-cols-12 gap-20">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-5"
                >
                  <motion.p variants={staggerItem} className="eyebrow mb-4">Demo guiada</motion.p>
                  <motion.h1 variants={staggerItem} className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-ink leading-tight">20 minutos con un especialista en tarifas.</motion.h1>
                  <motion.p variants={staggerItem} className="mt-6 text-lg text-ink-muted leading-relaxed">
                    Reservamos una sesión contigo, vemos tu caso real y te mostramos cómo LogiQuote se adapta a tu flujo de trabajo.
                    Sin presentación comercial. Sin compromisos.
                  </motion.p>

                  <motion.div variants={staggerItem} className="mt-10 space-y-4">
                    {[
                      'Vemos tu tarifario actual y cómo subirlo',
                      'Generamos una cotización real con tus datos',
                      'Configuramos tu enlace público de captación',
                      'Resolvemos tus dudas técnicas',
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-signal flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-ink-muted">{item}</span>
                      </div>
                    ))}
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-6 lg:col-start-7"
                >
                  <div className="bg-white/70  border border-line-light p-8 " style={{ borderRadius: '16px' }}>
                    {sent ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, ease: easeOut }}
                        className="text-center py-12"
                      >
                        <div className="flex h-14 w-14 mx-auto items-center justify-center border border-success bg-success/10 mb-6" style={{ borderRadius: '12px' }}>
                          <Check className="h-6 w-6 text-success" aria-hidden="true" />
                        </div>
                        <h2 className="text-xl font-display font-semibold tracking-tight text-ink mb-2">Solicitud recibida</h2>
                        <p className="text-sm text-ink-muted mb-6">Te contactaremos en menos de 24 horas para agendar la sesión.</p>
                        <Link to="/" className="btn-secondary">Volver al inicio</Link>
                      </motion.div>
                    ) : (
                      <>
                        <h2 className="text-xl font-display font-semibold tracking-tight text-ink mb-2">Solicitar demo</h2>
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
                          <motion.button
                            type="submit"
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.2, ease: easeOut }}
                            disabled={sending}
                            aria-label="Solicitar demo guiada"
                            className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                          >
                            {sending ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Enviando...</> : <><Send className="h-4 w-4" aria-hidden="true" /> Solicitar demo</>}
                          </motion.button>
                        </form>
                        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-ink-muted font-mono">
                          Sesión de 20 min · Por videollamada · Sin compromiso
                        </div>
                      </>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
