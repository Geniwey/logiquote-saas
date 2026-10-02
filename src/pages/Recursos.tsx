import { Link } from 'react-router-dom';
import { ArrowRight, Clock } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { resources } from '@/lib/content';

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
          <section className="border-b border-line">
            <div className="mx-auto max-w-9xl px-6 py-20 md:py-28">
              <p className="text-xs font-mono text-signal uppercase tracking-wider mb-4">Recursos</p>
              <h1 className="text-4xl md:text-5xl font-display font-bold text-ink">Guías para transitarios que cotizan a diario.</h1>
              <p className="mt-6 text-lg text-ink-light max-w-xl">Artículos prácticos sobre Incoterms, flete y cotizaciones. Sin teoría de manual: lo que necesitas saber para cotizar mejor.</p>
            </div>
          </section>

          <section className="border-b border-line bg-white">
            <div className="mx-auto max-w-9xl px-6 py-20">
              <div className="grid gap-px bg-line">
                {resources.map((article) => (
                  <Link
                    key={article.slug}
                    to={`/recursos/${article.slug}`}
                    className="bg-white p-8 lg:p-10 transition-colors duration-150 hover:bg-bone/50 block group"
                  >
                    <div className="grid lg:grid-cols-12 gap-6 items-start">
                      <div className="lg:col-span-8">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xs font-mono text-signal border border-signal px-2 py-0.5" style={{ borderRadius: '4px' }}>{article.category}</span>
                          <span className="text-xs font-mono text-ink-muted flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
                        </div>
                        <h2 className="text-xl md:text-2xl font-display font-semibold text-ink mb-3 group-hover:text-signal transition-colors">{article.title}</h2>
                        <p className="text-ink-muted leading-relaxed">{article.excerpt}</p>
                      </div>
                      <div className="lg:col-span-4 lg:text-right">
                        <p className="text-xs font-mono text-ink-muted">{article.date}</p>
                        <p className="text-sm text-ink-light mt-1">{article.author}</p>
                        <span className="inline-flex items-center gap-1 mt-4 text-sm font-medium text-signal">
                          Leer artículo <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
}
