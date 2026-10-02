import { Link } from 'react-router-dom';
import { ArrowRight, Target, Compass, Boxes } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

const values = [
  { icon: Target, title: 'Precisión antes que vistosidad', desc: 'Preferimos una tabla densa y legible a una animación bonita. El software logístico no tiene que entretener: tiene que ser útil.' },
  { icon: Compass, title: 'Opinión sobre el sector, no neutral', desc: 'No somos un ERP genérico. Construimos para transitarios y agentes de aduanas en España, con sus Incoterms, sus aranceles y su idioma.' },
  { icon: Boxes, title: 'Cotización honesta, no decorativa', desc: 'No mostramos testimonios falsos ni logos de clientes que no tenemos. Cuando tengamos casos reales, aparecerán.' },
];

const team = [
  { name: '[Nombre del CEO]', role: 'CEO y co-fundador', bio: '[REEMPLAZAR] Ex-transitario con 15 años en el sector. Fundó LogiQuote para resolver el problema que vivía cada día.' },
  { name: '[Nombre del CTO]', role: 'CTO y co-fundador', bio: '[REEMPLAZAR] Ingeniero de software con experiencia en SaaS B2B. Responsable de la arquitectura y la IA.' },
  { name: '[Nombre del Head of Product]', role: 'Head of Product', bio: '[REEMPLAZAR] Diseñadora de producto. Responsable de que el software sea claro y no necesite manual.' },
];

export default function SobreNosotros() {
  return (
    <>
      <SEO
        title="Sobre nosotros | LogiQuote — Software logístico hecho por y para transitarios"
        description="LogiQuote nace de la frustración de cotizar a mano. Construimos software logístico preciso, sobrio y honesto."
        canonical="https://logiquote.app/sobre-nosotros"
      />
      <div className="min-h-screen bg-bone">
        <Navbar />
        <main>
          <section className="border-b border-line">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <div className="grid lg:grid-cols-12 gap-12">
                <div className="lg:col-span-7">
                  <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Sobre nosotros</p>
                  <h1 className="text-4xl md:text-5xl font-display font-bold text-ink leading-tight">Construimos el software quehubiera querido tener de cliente.</h1>
                  <p className="mt-6 text-lg text-ink-light leading-relaxed">
                    LogiQuote nació en 2026, después de años viendo cómo transitarios y agentes de aduanas perdían horas
                    cotizando a mano en Excel. Tarifarios en PDF, cálculos repetidos, errores que costaban dinero.
                    Decidimos que la IA podía hacer algo más que generar texto: podía leer un tarifario y calcular un flete.
                  </p>
                  <p className="mt-4 text-lg text-ink-light leading-relaxed">
                    No somos una startup de moda. Somos un equipo pequeño en Madrid que prefiere el software útil
                    al software llamativo.
                  </p>
                </div>
                <div className="lg:col-span-4 lg:col-start-9">
                  <div className="border border-line bg-white p-6" style={{ borderRadius: '6px' }}>
                    <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-4">Datos de la empresa</p>
                    <dl className="space-y-3 text-sm">
                      <div><dt className="text-ink-muted">Fundación</dt><dd className="font-mono text-ink">2026</dd></div>
                      <div><dt className="text-ink-muted">Sede</dt><dd className="font-mono text-ink">Madrid, España</dd></div>
                      <div><dt className="text-ink-muted">Equipo</dt><dd className="font-mono text-ink">3 personas</dd></div>
                      <div><dt className="text-ink-muted">Alojamiento</dt><dd className="font-mono text-ink">Unión Europea</dd></div>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="border-b border-line bg-white">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-12">Lo que nos define</h2>
              <div className="grid gap-px bg-line">
                {values.map((v) => (
                  <div key={v.title} className="bg-white p-8 lg:p-10">
                    <div className="flex items-start gap-6">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-line bg-bone" style={{ borderRadius: '4px' }}>
                        <v.icon className="h-5 w-5 text-signal" />
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-semibold text-ink mb-2">{v.title}</h3>
                        <p className="text-ink-light leading-relaxed">{v.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="border-b border-line">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-ink mb-12">Equipo</h2>
              <div className="grid gap-6 md:grid-cols-3">
                {team.map((member) => (
                  <div key={member.role} className="border border-line bg-white p-6" style={{ borderRadius: '6px' }}>
                    <div className="h-16 w-16 bg-bone-200 flex items-center justify-center font-mono font-bold text-ink-muted mb-4" style={{ borderRadius: '50%' }}>?</div>
                    <h3 className="font-display font-semibold text-ink">{member.name}</h3>
                    <p className="text-sm text-signal font-mono mb-3">{member.role}</p>
                    <p className="text-sm text-ink-muted leading-relaxed">{member.bio}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="bg-navy text-white">
            <div className="mx-auto max-w-9xl px-6 py-20 text-center">
              <h2 className="text-3xl font-display font-bold text-white mb-6">¿Quieres hablar con nosotros?</h2>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/demo" className="btn-primary">Solicitar demo <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/contacto" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/40">Contactar</Link>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
