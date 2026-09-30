import { useState, type FormEvent } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { useToast } from '@/components/Toast';

export default function Contacto() {
  const { showToast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      showToast('Por favor, rellena todos los campos', 'error');
      return;
    }
    setIsSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsSending(false);
    showToast('Mensaje enviado. Te responderemos en breve.', 'success');
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <>
      <SEO
        title="Contacto | LogiQuote"
        description="Contacta con el equipo de LogiQuote para cualquier consulta sobre nuestra plataforma de cotizaciones logísticas."
      />

      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Logo size="sm" />
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 mx-auto w-full max-w-5xl px-6 py-16">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Left: info */}
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3.5 py-1.5 text-xs font-medium text-brand-700">
                <MessageSquare className="h-3.5 w-3.5" />
                Contacto
              </div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-900">Hablemos</h1>
              <p className="mt-4 text-slate-500 leading-relaxed">
                ¿Tienes preguntas sobre LogiQuote? ¿Quieres ver una demo personalizada para tu
                transitaria? Nuestro equipo te responderá en menos de 24 horas.
              </p>

              <div className="mt-10 space-y-5">
                <a href="mailto:contacto@logiquote.app" className="flex items-center gap-4 group">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-soft transition-all duration-300 group-hover:border-brand-300">
                    <Mail className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Email</p>
                    <p className="text-sm text-slate-500 group-hover:text-brand-600 transition-colors">contacto@logiquote.app</p>
                  </div>
                </a>
                <a href="tel:+34910000000" className="flex items-center gap-4 group">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-soft transition-all duration-300 group-hover:border-brand-300">
                    <Phone className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Teléfono</p>
                    <p className="text-sm text-slate-500 group-hover:text-brand-600 transition-colors">+34 910 000 000</p>
                  </div>
                </a>
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-soft">
                    <MapPin className="h-5 w-5 text-brand-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">Oficina</p>
                    <p className="text-sm text-slate-500">Calle Principal 123, Madrid</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-soft">
              <h2 className="mb-6 text-xl font-semibold text-slate-900">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Nombre</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="input-glow w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tu@empresa.com"
                    className="input-glow w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">Mensaje</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder="¿En qué podemos ayudarte?"
                    className="input-glow w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition-all placeholder:text-slate-400"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSending}
                  className="btn-glow inline-flex w-full items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 disabled:opacity-50"
                >
                  {isSending ? (
                    <>Enviando...</>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Enviar mensaje
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}
