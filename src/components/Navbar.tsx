import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { navLinks, siteConfig } from '@/lib/content';
import { useAuth } from '@/lib/auth';

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

      {/* Main header */}
      <header
        className={`sticky top-0 z-50 bg-bone border-b transition-colors duration-150 ${
          scrolled ? 'border-line shadow-sm' : 'border-transparent'
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
              <Link to="/demo" className="btn-primary">
                Solicitar demo
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
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
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[100] bg-bone lg:hidden animate-fade-in">
          <div className="flex h-16 items-center justify-between px-6 border-b border-line">
            <Logo />
            <button
              className="flex h-10 w-10 items-center justify-center"
              onClick={() => setMobileOpen(false)}
              aria-label="Cerrar menú"
            >
              <X className="h-5 w-5 text-ink" />
            </button>
          </div>
          <nav className="px-6 py-8 flex flex-col gap-1">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-3 text-lg font-display font-semibold text-ink border-b border-line/60 transition-colors hover:text-signal"
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                setMobileOpen(false);
                handleLogin();
              }}
              className="py-3 text-lg font-display font-semibold text-ink border-b border-line/60 text-left transition-colors hover:text-signal"
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
          </nav>
        </div>
      )}
    </>
  );
}
