import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useToast } from '@/components/Toast';
import { siteConfig } from '@/lib/content';
import { supabase } from '@/lib/supabase';
import { easeOut, staggerContainer, staggerItem, scaleIn } from '@/lib/animations';

export default function Contacto() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Por favor, rellena todos los campos', 'error');
      return;
    }
    setSending(true);
    try {
      const { error } = await supabase.from('leads').insert({
        source: 'contact',
        name: name.trim(),
        email: email.trim(),
        company: company.trim() || null,
        message: message.trim(),
      });
      if (error) throw error;
      showToast('Mensaje enviado. Te responderemos en breve.', 'success');
      setName(''); setEmail(''); setCompany(''); setMessage('');
    } catch {
      showToast('Error al enviar. Inténtalo de nuevo.', 'error');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <SEO
        title="Contacto | LogiQuote"
        description="Contacta con el equipo de LogiQuote para cualquier consulta sobre nuestra plataforma de cotizaciones logísticas."
        canonical="https://logiquote.app/contacto"
      />
      <div className="min-h-screen bg-bone">
        <Navbar />
        <main>
          <section className="border-b border-line relative overflow-hidden" aria-label="Contacto">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-signal/[0.05] blur-[120px]" />
            </div>
            <div className="relative mx-auto max-w-9xl px-6 py-32">
              <div className="grid lg:grid-cols-12 gap-20">
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-5"
                >
                  <motion.p variants={staggerItem} className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Contacto</motion.p>
                  <motion.h1 variants={staggerItem} className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-ink leading-tight">Hablemos.</motion.h1>
                  <motion.p variants={staggerItem} className="mt-6 text-lg text-ink-muted leading-relaxed">
                    ¿Tienes preguntas sobre LogiQuote? ¿Quieres ver una demo personalizada para tu transitaria?
                    Nuestro equipo te responderá en menos de 24 horas.
                  </motion.p>

                  <motion.div variants={staggerItem} className="mt-10 space-y-5">
                    <a href={`mailto:${siteConfig.email}`} className="group flex items-start gap-4 transition-transform duration-200 hover:translate-x-1">
                      <div className="h-10 w-10 flex items-center justify-center border border-line bg-white shadow-sm rounded-md flex-shrink-0">
                        <Mail className="h-5 w-5 text-signal" />
                      </div>
                      <div>
                        <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Email</p>
                        <p className="text-sm text-ink-muted group-hover:text-signal transition-colors">{siteConfig.email}</p>
                      </div>
                    </a>
                    <div className="flex items-start gap-4">
                      <div className="h-10 w-10 flex items-center justify-center border border-line bg-white shadow-sm rounded-md flex-shrink-0">
                        <MapPin className="h-5 w-5 text-signal" />
                      </div>
                      <div>
                        <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-1">Oficina</p>
                        <p className="text-sm text-ink-muted">{siteConfig.company.address}</p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={scaleIn}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-6 lg:col-start-7"
                >
                  <div className="bg-white/70  border border-line p-8 " style={{ borderRadius: '16px' }}>
                    <h2 className="text-xl font-display font-semibold tracking-tight text-ink mb-6">Envíanos un mensaje</h2>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div>
                        <label className="label-field">Nombre</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Tu nombre" className="input-field" />
                      </div>
                      <div>
                        <label className="label-field">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@empresa.com" className="input-field" />
                      </div>
                      <div>
                        <label className="label-field">Empresa (opcional)</label>
                        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Tu empresa" className="input-field" />
                      </div>
                      <div>
                        <label className="label-field">Mensaje</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="¿En qué podemos ayudarte?" className="input-field resize-none" />
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.97 }}
                        transition={{ duration: 0.2, ease: easeOut }}
                        disabled={sending}
                        aria-label="Enviar mensaje de contacto"
                        className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {sending ? <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Enviando...</> : <><Send className="h-4 w-4" aria-hidden="true" /> Enviar mensaje</>}
                      </motion.button>
                    </form>
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
