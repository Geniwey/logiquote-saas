import { useState, type FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useToast } from '@/components/Toast';
import { siteConfig } from '@/lib/content';
import { easeOut, staggerContainer, staggerItem, scaleIn } from '@/lib/animations';

export default function Contacto() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Por favor, rellena todos los campos', 'error');
      return;
    }
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    showToast('Mensaje enviado. Te responderemos en breve.', 'success');
    setName(''); setEmail(''); setMessage('');
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
          <section className="border-b border-line relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-40 left-0 h-[500px] w-[500px] rounded-full bg-signal/5 blur-[120px]" />
            </div>
            <div className="relative mx-auto max-w-9xl px-6 py-24 md:py-32">
              <div className="grid lg:grid-cols-12 gap-16">
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
                    <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-4 group transition-transform duration-200 hover:translate-x-1">
                      <div className="flex h-10 w-10 items-center justify-center border border-line bg-white shadow-[0_4px_12px_rgb(0,0,0,0.03)]" style={{ borderRadius: '6px' }}>
                        <Mail className="h-4 w-4 text-signal" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">Email</p>
                        <p className="text-sm text-ink-muted group-hover:text-signal transition-colors">{siteConfig.email}</p>
                      </div>
                    </a>
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 group transition-transform duration-200 hover:translate-x-1">
                      <div className="flex h-10 w-10 items-center justify-center border border-line bg-white shadow-[0_4px_12px_rgb(0,0,0,0.03)]" style={{ borderRadius: '6px' }}>
                        <Phone className="h-4 w-4 text-signal" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">Teléfono</p>
                        <p className="text-sm text-ink-muted group-hover:text-signal transition-colors">{siteConfig.phone}</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center border border-line bg-white shadow-[0_4px_12px_rgb(0,0,0,0.03)]" style={{ borderRadius: '6px' }}>
                        <MapPin className="h-4 w-4 text-signal" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">Oficina</p>
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
                  <div className="bg-white/80 backdrop-blur-xl border border-line/60 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" style={{ borderRadius: '8px' }}>
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
                        <label className="label-field">Mensaje</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="¿En qué podemos ayudarte?" className="input-field resize-none" />
                      </div>
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        transition={{ duration: 0.2, ease: easeOut }}
                        disabled={sending}
                        className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {sending ? <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</> : <><Send className="h-4 w-4" /> Enviar mensaje</>}
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
