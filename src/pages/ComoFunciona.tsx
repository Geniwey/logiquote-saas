import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Zap, Users, Calculator, Link2, TrendingUp } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { easeOut, staggerContainer, staggerItem } from '@/lib/animations';

const steps = [
  {
    num: '01',
    icon: FileText,
    title: 'Subes tu tarifario base',
    desc: 'Introduces tus costes de LCL, FCL y aéreo. Aranceles por origen. Recargos portuarios (THC, BAF, ISPS). Márgenes por Incoterm. Lo guardas una vez y la IA lo usa como referencia exclusiva para cada cotización.',
    detail: 'Tiempo de configuración: ~10 minutos.',
  },
  {
    num: '02',
    icon: Zap,
    title: 'La IA cotiza por ti',
    desc: 'Cuando un cliente entra a tu enlace público, introduce origen, destino, Incoterm y volumen. La IA lee tu tarifario, calcula flete, aranceles, recargos y margen, y devuelve un presupuesto profesional en segundos. 24/7, sin que tú estés delante.',
    detail: 'Tiempo de respuesta: 45 segundos de media.',
  },
  {
    num: '03',
    icon: Users,
    title: 'Recibes leads automáticos',
    desc: 'Cada cotización generada desde tu enlace captura el email del cliente y los datos de la consulta. Entras al panel, ves quién cotizó qué, y llamas para cerrar. Tú solo haces la parte que la IA no puede: convencer al cliente.',
    detail: 'Email + datos de ruta capturados automáticamente.',
  },
];

const features = [
  { icon: Calculator, title: 'Calculadora de cotización con IA', desc: 'Introduce origen, destino, Incoterm y volumen. La IA lee tu tarifario y devuelve un presupuesto completo: flete, aranceles, recargos y margen.', metric: 'De 42 minutos a 45 segundos.' },
  { icon: FileText, title: 'Tarifario propio, privado y editable', desc: 'Sube tus costes base de LCL, aranceles y márgenes por Incoterm. Lo editas cuando quieras. Nadie más ve tus precios.', metric: 'Un tarifario. Cotizaciones consistentes.' },
  { icon: Link2, title: 'Enlace público de captación de leads', desc: 'Te damos una URL donde tus clientes entran y se auto-cotizan. Cada consulta captura su email. Tú solo cierras el trato.', metric: 'Leads entrando mientras duermes.' },
  { icon: TrendingUp, title: 'Panel de analítica y control', desc: 'Cotizaciones del mes, leads capturados, tasa de conversión. Todo en un panel claro con cifras en monoespaciado.', metric: 'Mide lo que importa.' },
];

export default function ComoFunciona() {
  return (
    <>
      <SEO
        title="Cómo funciona | LogiQuote — Cotizaciones logísticas con IA"
        description="Tres pasos: subes tu tarifario, la IA cotiza por ti, recibes leads automáticos. Sin Excel, sin correos, sin esperas."
        canonical="https://logiquote.app/como-funciona"
      />
      <div className="min-h-screen bg-bone">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="border-b border-line relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-signal/5 blur-[120px]" />
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative mx-auto max-w-9xl px-6 py-24 md:py-32"
            >
              <motion.p variants={staggerItem} className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Cómo funciona</motion.p>
              <motion.h1 variants={staggerItem} className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-ink max-w-2xl">Tres pasos. Sin fricción.</motion.h1>
              <motion.p variants={staggerItem} className="mt-6 text-lg text-ink-muted max-w-xl leading-relaxed">Sin Excel. Sin correos. Sin esperas. Subes tu tarifario una vez y LogiQuote hace el resto.</motion.p>
            </motion.div>
          </section>

          {/* Steps */}
          <section className="border-b border-line bg-white">
            <div className="mx-auto max-w-9xl px-6 py-24 md:py-32">
              <div className="space-y-28">
                {steps.map((step) => (
                  <motion.div
                    key={step.num}
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-80px' }}
                    className="grid lg:grid-cols-12 gap-16 items-start"
                  >
                    <motion.div variants={staggerItem} className="lg:col-span-5">
                      <span className="text-6xl font-mono font-bold text-line-dark block mb-4">{step.num}</span>
                      <div className="flex items-center gap-3 mb-4">
                        <step.icon className="h-5 w-5 text-signal" />
                        <h2 className="text-2xl font-display font-semibold tracking-tight text-ink">{step.title}</h2>
                      </div>
                      <p className="text-ink-muted leading-relaxed">{step.desc}</p>
                      <p className="mt-4 text-sm font-mono text-signal bg-signal-bg inline-block px-4 py-2" style={{ borderRadius: '6px' }}>{step.detail}</p>
                    </motion.div>
                    <motion.div variants={staggerItem} className="lg:col-span-7 lg:pt-12">
                      <div className="border border-line bg-bone/50 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]" style={{ borderRadius: '8px' }}>
                        <div className="space-y-4 font-mono text-sm text-ink-light">
                          <div className="flex justify-between border-b border-line pb-3"><span className="text-ink-muted">Flete LCL (3,8 CBM)</span><span className="text-ink">1.710€</span></div>
                          <div className="flex justify-between border-b border-line pb-3"><span className="text-ink-muted">THC + BAF + ISPS</span><span className="text-ink">152€</span></div>
                          <div className="flex justify-between border-b border-line pb-3"><span className="text-ink-muted">Despacho aduanero</span><span className="text-ink">120€</span></div>
                          <div className="flex justify-between border-b border-line pb-3"><span className="text-ink-muted">Margen FOB (+15%)</span><span className="text-ink">297€</span></div>
                          <div className="flex justify-between font-bold text-base"><span className="text-ink">Total cotizado</span><span className="text-signal">2.450€</span></div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="border-b border-line">
            <div className="mx-auto max-w-9xl px-6 py-24 md:py-32">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="mb-16"
              >
                <motion.h2 variants={staggerItem} className="text-2xl md:text-3xl font-display font-bold tracking-tight text-ink">Producto en detalle</motion.h2>
              </motion.div>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-80px' }}
                className="grid gap-px bg-line"
              >
                {features.map((f) => (
                  <motion.div
                    key={f.title}
                    variants={staggerItem}
                    whileHover={{ y: -4, transition: { duration: 0.3, ease: easeOut } }}
                    className="bg-white p-8 lg:p-10 transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)]"
                  >
                    <div className="flex items-start gap-6">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center border border-line bg-bone/50" style={{ borderRadius: '6px' }}>
                        <f.icon className="h-5 w-5 text-signal" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-display font-semibold tracking-tight text-ink mb-2">{f.title}</h3>
                        <p className="text-ink-muted leading-relaxed mb-3">{f.desc}</p>
                        <p className="text-sm font-mono text-signal">{f.metric}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-navy relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[400px] w-[600px] rounded-full bg-signal/10 blur-[120px]" />
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="relative mx-auto max-w-9xl px-6 py-24 md:py-32 text-center"
            >
              <motion.h2 variants={staggerItem} className="text-3xl md:text-4xl font-display font-bold tracking-tight text-white mb-6">¿Listo para empezar?</motion.h2>
              <motion.p variants={staggerItem} className="text-white/50 mb-8">14 días gratis. Sin tarjeta. Subes tu tarifario y estás cotizando en menos de 15 minutos.</motion.p>
              <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/login" className="btn-primary">Probar gratis 14 días <ArrowRight className="h-4 w-4" /></Link>
                <Link to="/demo" className="btn-secondary bg-white/10 border-white/20 text-white hover:bg-white/15 hover:border-white/40">Reservar demo guiada</Link>
              </motion.div>
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
