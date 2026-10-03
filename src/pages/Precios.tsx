import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { plans } from '@/lib/content';
import { easeOut, staggerContainer, staggerItem } from '@/lib/animations';

const comparisonRows = [
  { feature: 'Tarifario base (rutas)', starter: '50', pro: 'Ilimitado', business: 'Ilimitado' },
  { feature: 'Cotizaciones/mes con IA', starter: '50', pro: 'Ilimitadas', business: 'Ilimitadas' },
  { feature: 'Enlace público de leads', starter: true, pro: true, business: true },
  { feature: 'Usuarios incluidos', starter: '1', pro: '3', business: 'Ilimitados' },
  { feature: 'Descarga en PDF', starter: false, pro: true, business: true },
  { feature: 'Exportación a Excel', starter: false, pro: false, business: true },
  { feature: 'Analytics avanzados', starter: false, pro: false, business: true },
  { feature: 'Integración ERP', starter: false, pro: false, business: 'Próxim.' },
  { feature: 'Webhook de leads', starter: false, pro: false, business: true },
  { feature: 'Soporte por email', starter: true, pro: 'Prioritario', business: 'Prioritario' },
  { feature: 'Soporte por teléfono', starter: false, pro: false, business: true },
  { feature: 'Gestor de cuenta', starter: false, pro: false, business: true },
];

function Cell({ value }: { value: string | boolean }) {
  if (typeof value === 'boolean') {
    return value ? <Check className="h-4 w-4 text-signal mx-auto" /> : <span className="text-ink-muted">—</span>;
  }
  return <span className="font-mono text-ink">{value}</span>;
}

export default function Precios() {
  const [annual, setAnnual] = useState(false);

  return (
    <>
      <SEO
        title="Precios | LogiQuote — Software de cotizaciones logísticas"
        description="Planes desde 29€/mes. Starter, Pro y Business. Sin permanencia. 14 días gratis. Cancela cuando quieras."
        canonical="https://logiquote.app/precios"
      />
      <div className="min-h-screen bg-bone">
        <Navbar />
        <main>
          {/* Hero */}
          <section className="border-b border-line relative overflow-hidden">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[500px] rounded-full bg-signal/5 blur-[120px]" />
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative mx-auto max-w-9xl px-6 py-24 md:py-32 text-center"
            >
              <motion.p variants={staggerItem} className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Precios</motion.p>
              <motion.h1 variants={staggerItem} className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-ink">Un precio claro. Sin trucos.</motion.h1>
              <motion.p variants={staggerItem} className="mt-4 text-ink-muted">Todos los planes incluyen 14 días gratis. Sin tarjeta.</motion.p>

              <motion.div variants={staggerItem} className="flex items-center justify-center gap-4 mt-8">
                <span className={`text-sm font-medium transition-colors duration-200 ${!annual ? 'text-ink' : 'text-ink-muted'}`}>Mensual</span>
                <motion.button
                  onClick={() => setAnnual(!annual)}
                  className="relative h-6 w-11 bg-line rounded-full transition-colors duration-200"
                  aria-label="Cambiar facturación"
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    animate={{ x: annual ? 20 : 2 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="absolute top-0.5 h-5 w-5 bg-signal rounded-full shadow-sm"
                  />
                </motion.button>
                <span className={`text-sm font-medium transition-colors duration-200 ${annual ? 'text-ink' : 'text-ink-muted'}`}>
                  Anual <span className="text-signal font-mono">-20%</span>
                </span>
              </motion.div>
            </motion.div>
          </section>

          {/* Plans */}
          <section className="border-b border-line bg-white">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mx-auto max-w-9xl px-6 py-20"
            >
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {plans.map((plan) => (
                  <motion.div
                    key={plan.name}
                    variants={staggerItem}
                    whileHover={{ y: -6, transition: { duration: 0.3, ease: easeOut } }}
                    className={`relative bg-white p-8 border transition-shadow duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] ${
                      plan.highlighted ? 'border-signal border-2' : 'border-line'
                    }`}
                    style={{ borderRadius: '8px' }}
                  >
                    {plan.highlighted && (
                      <span className="absolute -top-3 left-8 bg-signal text-white text-xs font-semibold px-3 py-1" style={{ borderRadius: '6px' }}>
                        Recomendado
                      </span>
                    )}
                    <h3 className="text-lg font-display font-bold text-ink mb-2">{plan.name}</h3>
                    <p className="text-sm text-ink-muted mb-6 leading-relaxed">{plan.description}</p>
                    <div className="flex items-baseline gap-1 mb-6">
                      <span className="text-4xl font-mono font-bold text-ink">{annual ? plan.priceAnnual : plan.priceMonthly}</span>
                      <span className="text-ink-muted">€/mes</span>
                    </div>
                    <Link to={plan.name === 'Business' ? '/contacto' : '/login'} className={`w-full ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} justify-center`}>
                      {plan.cta}
                    </Link>
                    <ul className="mt-8 space-y-3">
                      {plan.features.map((feat) => (
                        <li key={feat} className="flex items-start gap-3 text-sm text-ink-light">
                          <Check className="h-4 w-4 text-signal flex-shrink-0 mt-0.5" />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Comparison table */}
          <section className="border-b border-line">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mx-auto max-w-9xl px-6 py-24"
            >
              <motion.h2 variants={staggerItem} className="text-2xl font-display font-bold tracking-tight text-ink mb-8">Comparativa completa</motion.h2>
              <motion.div variants={staggerItem} className="bg-white border border-line overflow-x-auto scrollbar-thin shadow-[0_8px_30px_rgb(0,0,0,0.04)]" style={{ borderRadius: '8px' }}>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-line bg-bone/50">
                      <th className="text-left px-6 py-4 font-medium text-ink-muted">Característica</th>
                      <th className="text-center px-4 py-4 font-display font-semibold text-ink">Starter</th>
                      <th className="text-center px-4 py-4 font-display font-semibold text-signal">Pro</th>
                      <th className="text-center px-4 py-4 font-display font-semibold text-ink">Business</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonRows.map((row) => (
                      <tr key={row.feature} className="border-b border-line/40 last:border-0 transition-colors hover:bg-bone/30">
                        <td className="px-6 py-3.5 text-ink-light">{row.feature}</td>
                        <td className="text-center px-4 py-3.5"><Cell value={row.starter} /></td>
                        <td className="text-center px-4 py-3.5"><Cell value={row.pro} /></td>
                        <td className="text-center px-4 py-3.5"><Cell value={row.business} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </motion.div>
              <div className="mt-8 text-center space-y-2">
                <p className="text-sm text-ink-muted font-mono">Precios en euros · IVA no incluido · Pagos con Stripe</p>
                <p className="text-sm text-ink-muted">Cancela cuando quieras · Sin permanencia · Factura con tu CIF</p>
              </div>
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
