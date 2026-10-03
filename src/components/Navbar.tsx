import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { navLinks, siteConfig } from '@/lib/content';
import { useAuth } from '@/lib/auth';
import { easeOut, fadeUp } from '@/lib/animations';

export function Navbar() {
  const { session } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleLogin = () => {
    navigate(session ? '/dashboard' : '/login');
  };

  return (
    <>
      {/* Top bar */}
      <div className="hidden md:block bg-navy text-white/70 text-xs">
        <div className="mx-auto max-w-9xl px-6 py-2 flex items-center justify-between">
          <p className="font-mono">
            Demo guiada de 20 min con un especialista en tarifas —{' '}
            <Link to="/demo" className="text-signal-light underline underline-offset-2 hover:text-white transition-colors">
              Reservar plaza
            </Link>
          </p>
          <p className="font-mono text-white/40">{siteConfig.phone}</p>
        </div>
      </div>

      {/* Main header with glassmorphism */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bone/80 backdrop-blur-xl border-b border-line/60 shadow-[0_4px_24px_rgb(0,0,0,0.04)]'
            : 'bg-bone/50 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-9xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Logo />

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Navegación principal">
              {navLinks.map((item) => (
                <Link key={item.label} to={item.href} className="nav-link">
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-4">
              <button onClick={handleLogin} className="nav-link">
                {session ? 'Mi panel' : 'Iniciar sesión'}
              </button>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} transition={{ duration: 0.2 }}>
                <Link to="/demo" className="btn-primary">
                  Solicitar demo
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            </div>

            {/* Mobile toggle */}
            <button
              className="lg:hidden flex h-10 w-10 items-center justify-center"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5 text-ink" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="fixed inset-0 z-[100] bg-bone backdrop-blur-xl lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6 border-b border-line/60">
              <Logo />
              <button
                className="flex h-10 w-10 items-center justify-center"
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5 text-ink" />
              </button>
            </div>
            <motion.nav
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="px-6 py-8 flex flex-col gap-1"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-lg font-display font-semibold text-ink border-b border-line/40 transition-colors hover:text-signal"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => {
                  setMobileOpen(false);
                  handleLogin();
                }}
                className="py-3 text-lg font-display font-semibold text-ink border-b border-line/40 text-left transition-colors hover:text-signal"
              >
                {session ? 'Mi panel' : 'Iniciar sesión'}
              </button>
              <Link
                to="/demo"
                onClick={() => setMobileOpen(false)}
                className="btn-primary mt-6 w-full"
              >
                Solicitar demo
                <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
