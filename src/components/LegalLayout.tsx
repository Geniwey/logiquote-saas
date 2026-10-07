import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Navbar } from '@/components/Navbar';
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

      <div className="min-h-screen bg-bone flex flex-col">
        <Navbar />

        <main className="flex-1 mx-auto w-full max-w-3xl px-6 py-16 md:py-24">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-ink">{title}</h1>
          <p className="mt-2 text-sm text-ink-muted font-mono">Última actualización: enero 2026</p>
          <div className="mt-12 space-y-8 text-ink-muted leading-relaxed">
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
      <h2 className="mb-3 text-xl font-display font-semibold text-ink">{title}</h2>
      <div className="space-y-3 text-sm leading-relaxed">{children}</div>
    </section>
  );
}
