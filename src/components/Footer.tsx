import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { siteConfig } from '@/lib/content';

const footerColumns = [
  {
    title: 'Producto',
    links: [
      { label: 'Cotizador', href: '/#producto' },
      { label: 'Cómo funciona', href: '/#como-funciona' },
      { label: 'Precios', href: '/precios' },
      { label: 'Demo', href: '/demo' },
      { label: 'Iniciar sesión', href: '/login' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Blog', href: '/recursos' },
      { label: 'Guía de Incoterms 2020', href: '/recursos/guia-incoterms-2020' },
      { label: 'Calcular flete LCL', href: '/recursos/calcular-flete-lcl' },
      { label: 'Cotización logística', href: '/recursos/que-incluye-cotizacion-logistica' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre nosotros', href: '/sobre-nosotros' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'Demo', href: '/demo' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Aviso legal', href: '/aviso-legal' },
      { label: 'Privacidad (RGPD)', href: '/privacidad' },
      { label: 'Cookies', href: '/cookies' },
      { label: 'Términos y condiciones', href: '/terminos' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[300px] w-[600px] rounded-full bg-signal/8 blur-[120px]" />
      </div>
      <div className="relative mx-auto max-w-9xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Logo variant="dark" size="lg" />
            <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-xs">
              Software de cotizaciones logísticas con IA para transitarios y agentes de aduanas en España.
            </p>
            <div className="mt-6 space-y-2 text-sm">
              <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 text-slate-400 transition-colors duration-200 hover:text-signal-light">
                <Mail className="h-4 w-4" />
                {siteConfig.email}
              </a>
              {siteConfig.phone && (
                <a href={`tel:${siteConfig.phone.replace(/\s/g, '')}`} className="flex items-center gap-2 text-slate-400 transition-colors duration-200 hover:text-signal-light">
                  <Phone className="h-4 w-4" />
                  {siteConfig.phone}
                </a>
              )}
              <p className="flex items-start gap-2 text-slate-500 text-xs leading-relaxed">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                {siteConfig.company.address}
              </p>
            </div>
          </div>

          <div className="md:col-span-8 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerColumns.map((col) => (
              <div key={col.title}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4">{col.title}</h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.href} className="text-sm text-slate-400 transition-colors duration-200 hover:text-signal-light">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-mono">
            © 2026 {siteConfig.company.legalName}{siteConfig.company.cif ? ` · CIF ${siteConfig.company.cif}` : ''}
          </p>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <span>Pagos seguros con Stripe</span>
            <span className="text-white/15">·</span>
            <span>RGPD</span>
            <span className="text-white/15">·</span>
            <span>SSL</span>
            <span className="text-white/15">·</span>
            <span>Datos en la UE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
