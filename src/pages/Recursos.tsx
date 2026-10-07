import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { resources } from '@/lib/content';
import { easeOut, staggerContainer, staggerItem } from '@/lib/animations';

const faqStructured = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  itemListElement: resources.map((r, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: r.title,
  })),
};

export default function Recursos() {
  return (
    <>
      <SEO
        title="Recursos | LogiQuote — Guías de logística, Incoterms y flete"
        description="Guías prácticas sobre Incoterms 2020, cálculo de flete LCL y qué incluye una cotización logística completa."
        canonical="https://logiquote.app/recursos"
        structuredData={faqStructured}
      />
      <div className="min-h-screen bg-bone">
        <Navbar />
        <main>
          <section className="border-b border-line-light relative overflow-hidden" aria-label="Recursos">
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -top-40 right-0 h-[500px] w-[500px] rounded-full bg-signal/[0.05] blur-[120px]" />
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="relative mx-auto max-w-9xl px-6 py-32"
            >
              <motion.p variants={staggerItem} className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Recursos</motion.p>
              <motion.h1 variants={staggerItem} className="text-4xl md:text-5xl font-display font-bold tracking-tighter text-ink">Guías para transitarios que cotizan a diario.</motion.h1>
              <motion.p variants={staggerItem} className="mt-6 text-lg text-ink-muted max-w-xl leading-relaxed">Artículos prácticos sobre Incoterms, flete y cotizaciones. Sin teoría de manual: lo que necesitas saber para cotizar mejor.</motion.p>
            </motion.div>
          </section>

          <section className="border-b border-line-light bg-bone-200" aria-label="Articulos">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              className="mx-auto max-w-9xl px-6 py-24"
            >
              <div className="grid gap-px bg-white/[0.04]">
                {resources.map((article) => (
                  <motion.div
                    key={article.slug}
                    variants={staggerItem}
                    whileHover={{ y: -2, transition: { duration: 0.3, ease: easeOut } }}
                  >
                    <Link
                      to={`/recursos/${article.slug}`}
                      className="bg-bone-200 p-8 lg:p-10 transition-colors duration-200 hover:bg-bone/40 block group"
                    >
                      <div className="grid lg:grid-cols-12 gap-6 items-start">
                        <div className="lg:col-span-8">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="text-xs font-mono text-signal border border-signal px-2 py-0.5" style={{ borderRadius: '6px' }}>{article.category}</span>
                            <span className="text-xs font-mono text-ink-muted">{article.readTime}</span>
                          </div>
                          <h2 className="text-xl md:text-2xl font-display font-semibold tracking-tighter text-ink mb-3 group-hover:text-signal transition-colors">{article.title}</h2>
                          <p className="text-ink-muted leading-relaxed">{article.excerpt}</p>
                        </div>
                        <div className="lg:col-span-4 lg:text-right">
                          <p className="text-xs font-mono text-ink-muted">{article.date}</p>
                          <p className="text-sm text-ink-muted mt-1">{article.author}</p>
                          <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-signal">
                            Leer articulo <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" aria-hidden="true" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
