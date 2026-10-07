import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { navLinks } from '@/lib/content';
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
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: easeOut }}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-bone/80  border-b border-line'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Logo />

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
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} transition={{ duration: 0.2, ease: easeOut }}>
                <Link to="/demo" className="btn-primary" aria-label="Solicitar demo guiada">
                  Solicitar demo
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </motion.div>
            </div>

            <button
              className="lg:hidden flex h-10 w-10 items-center justify-center text-ink-light"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: easeOut }}
            className="fixed inset-0 z-[100] bg-bone  lg:hidden"
          >
            <div className="flex h-16 items-center justify-between px-6 border-b border-line">
              <Logo />
              <button
                className="flex h-10 w-10 items-center justify-center text-ink-light"
                onClick={() => setMobileOpen(false)}
                aria-label="Cerrar menú"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <motion.nav
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="px-6 py-10 flex flex-col gap-2"
            >
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="py-3 text-lg font-display font-semibold text-ink border-b border-line transition-colors hover:text-signal"
                >
                  {item.label}
                </Link>
              ))}
              <button
                onClick={() => { setMobileOpen(false); handleLogin(); }}
                className="py-3 text-lg font-display font-semibold text-ink border-b border-line text-left transition-colors hover:text-signal"
              >
                {session ? 'Mi panel' : 'Iniciar sesión'}
              </button>
              <Link to="/demo" onClick={() => setMobileOpen(false)} className="btn-primary mt-6 w-full">
                Solicitar demo
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
