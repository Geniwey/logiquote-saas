import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Home } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { staggerContainer, staggerItem } from '@/lib/animations';

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Página no encontrada | LogiQuote" description="La página que buscas no existe o ha sido movida." />
      <div className="min-h-screen bg-bone flex flex-col relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[400px] w-[400px] rounded-full bg-signal/5 blur-[120px]" />
        </div>
        <div className="relative px-6 py-4">
          <Logo />
        </div>
        <main className="relative flex-1 flex items-center justify-center px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="text-center max-w-md"
          >
            <motion.p variants={staggerItem} className="text-8xl font-mono font-bold text-line-dark mb-6">404</motion.p>
            <motion.h1 variants={staggerItem} className="text-2xl font-display font-bold tracking-tight text-ink mb-3">Página no encontrada</motion.h1>
            <motion.p variants={staggerItem} className="text-ink-muted mb-8">La página que buscas no existe o ha sido movida. Quizás la URL cambió.</motion.p>
            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/" className="btn-primary"><Home className="h-4 w-4" /> Ir al inicio</Link>
              <Link to="/recursos" className="btn-secondary">Ver recursos <ArrowRight className="h-3.5 w-3.5" /></Link>
            </motion.div>
          </motion.div>
        </main>
        <Footer />
      </div>
    </>
  );
}
