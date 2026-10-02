import { Link } from 'react-router-dom';
import { ArrowRight, Home } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Página no encontrada | LogiQuote" description="La página que buscas no existe o ha sido movida." />
      <div className="min-h-screen bg-bone flex flex-col">
        <div className="px-6 py-4">
          <Logo />
        </div>
        <main className="flex-1 flex items-center justify-center px-6">
          <div className="text-center max-w-md">
            <p className="text-8xl font-mono font-bold text-line-dark mb-6">404</p>
            <h1 className="text-2xl font-display font-bold text-ink mb-3">Página no encontrada</h1>
            <p className="text-ink-muted mb-8">La página que buscas no existe o ha sido movida. Quizás la URL cambió.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="btn-primary"><Home className="h-4 w-4" /> Ir al inicio</Link>
              <Link to="/recursos" className="btn-secondary">Ver recursos <ArrowRight className="h-3.5 w-3.5" /></Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
