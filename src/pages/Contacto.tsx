import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useToast } from '@/components/Toast';
import { siteConfig } from '@/lib/content';

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
          <section className="border-b border-line">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-5">
                  <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Contacto</p>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight">Hablemos.</h1>
                  <p className="mt-6 text-lg text-ink-light leading-relaxed">
                    ¿Tienes preguntas sobre LogiQuote? ¿Quieres ver una demo personalizada para tu transitaria?
                    Nuestro equipo te responderá en menos de 24 horas.
                  </p>

                  <div className="mt-10 space-y-5">
                    <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-4 group">
                      <div className="flex h-10 w-10 items-center justify-center border border-line bg-white" style={{ borderRadius: '4px' }}>
                        <Mail className="h-4 w-4 text-signal" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">Email</p>
                        <p className="text-sm text-ink-muted group-hover:text-signal transition-colors">{siteConfig.email}</p>
                      </div>
                    </a>
                    <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-center gap-4 group">
                      <div className="flex h-10 w-10 items-center justify-center border border-line bg-white" style={{ borderRadius: '4px' }}>
                        <Phone className="h-4 w-4 text-signal" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">Teléfono</p>
                        <p className="text-sm text-ink-muted group-hover:text-signal transition-colors">{siteConfig.phone}</p>
                      </div>
                    </a>
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center border border-line bg-white" style={{ borderRadius: '4px' }}>
                        <MapPin className="h-4 w-4 text-signal" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-ink">Oficina</p>
                        <p className="text-sm text-ink-muted">{siteConfig.company.address}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-6 lg:col-start-7">
                  <div className="bg-white border border-line p-8" style={{ borderRadius: '6px' }}>
                    <h2 className="text-xl font-display font-semibold text-ink mb-6">Envíanos un mensaje</h2>
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
                      <button type="submit" disabled={sending} className="btn-primary w-full py-3.5 disabled:opacity-60 disabled:cursor-not-allowed">
                        {sending ? <><Loader2 className="h-4 w-4 animate-spin" /> Enviando...</> : <><Send className="h-4 w-4" /> Enviar mensaje</>}
                      </button>
                    </form>
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
