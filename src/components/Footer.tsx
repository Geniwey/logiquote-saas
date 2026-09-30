import { Link } from 'react-router-dom';
import { Ship, Mail } from 'lucide-react';

const footerLinks = {
  producto: [
    { label: 'Cómo funciona', path: '/#how-it-works' },
    { label: 'Precios', path: '/#pricing' },
    { label: 'Cotizador Demo', path: '/cotizador/demo' },
    { label: 'Panel de control', path: '/dashboard' },
  ],
  empresa: [
    { label: 'Aviso Legal', path: '/aviso-legal' },
    { label: 'Política de Privacidad', path: '/privacidad' },
    { label: 'Términos y Condiciones', path: '/terminos' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand column */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="flex items-center justify-center rounded-xl bg-brand-600 text-white">
                <Ship className="h-7 w-7 p-1.5" />
              </div>
              <span className="text-lg font-bold tracking-tight text-slate-900">LogiQuote</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
              Software de cotizaciones logísticas con IA para transitarios y agentes de aduanas.
              Automatiza tus presupuestos de importación y exportación.
            </p>
            <div className="mt-6 space-y-2">
              <a href="mailto:soporte@logiquote.app" className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition-all duration-300 hover:border-slate-300 hover:shadow-sm">
                <Mail className="h-4 w-4 text-blue-600" />
                Soporte VIP: soporte@logiquote.app
              </a>
            </div>
          </div>

          {/* Product links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Producto</h3>
            <ul className="space-y-3">
              {footerLinks.producto.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-slate-500 transition-colors hover:text-brand-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-slate-900">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.empresa.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-slate-500 transition-colors hover:text-brand-600">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-slate-100 pt-8 sm:flex-row">
          <p className="text-sm text-slate-400">© 2026 LogiQuote. Todos los derechos reservados.</p>
          <p className="text-sm text-slate-400">Hecho para transitarias modernas.</p>
        </div>
      </div>
    </footer>
  );
}
