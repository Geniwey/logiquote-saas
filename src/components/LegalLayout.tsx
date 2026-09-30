import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

interface LegalLayoutProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function LegalLayout({ title, description, children }: LegalLayoutProps) {
  return (
    <>
      <SEO title={title} description={description} />

      <div className="min-h-screen bg-slate-50 flex flex-col">
        {/* Header */}
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
            <Logo size="sm" />
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 transition-colors hover:text-brand-600"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver al inicio
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 mx-auto w-full max-w-4xl px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">{title}</h1>
          <p className="mt-2 text-sm text-slate-500">Última actualización: enero 2026</p>
          <div className="mt-10 space-y-6 text-slate-600 leading-relaxed">
            {children}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold text-slate-900">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed">{children}</div>
    </section>
  );
}
