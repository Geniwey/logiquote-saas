export const siteConfig = {
  name: 'LogiQuote',
  domain: 'logiquote.app',
  email: 'soporte@logiquote.app',
  salesEmail: 'ventas@logiquote.app',
  phone: '+34 910 000 000',
  company: {
    legalName: 'LogiQuote Logistics Software S.L.',
    cif: 'B-12345678',
    address: 'Calle de Alcalá 95, 28009 Madrid, España',
  },
  social: {
    linkedin: 'https://linkedin.com/company/logiquote',
    twitter: 'https://twitter.com/logiquote',
  },
};

export const navLinks = [
  { label: 'Producto', href: '/#producto' },
  { label: 'Cómo funciona', href: '/#como-funciona' },
  { label: 'Precios', href: '/precios' },
  { label: 'Recursos', href: '/recursos' },
];

export const plans = [
  {
    name: 'Starter',
    priceMonthly: 29,
    priceAnnual: 23,
    description: 'Para transitarios autónomos que empiezan a digitalizar sus cotizaciones.',
    features: [
      'Tarifario base (hasta 50 rutas)',
      '50 cotizaciones/mes con IA',
      'Enlace público de captación de leads',
      '1 usuario',
      'Soporte por email',
    ],
    highlighted: false,
    cta: 'Empezar gratis 14 días',
  },
  {
    name: 'Pro',
    priceMonthly: 49,
    priceAnnual: 39,
    description: 'Para transitarios con volumen que necesitan automatizar todo el proceso comercial.',
    features: [
      'Tarifario ilimitado de rutas e Incoterms',
      'Cotizaciones ilimitadas con IA',
      'Enlace público personalizado',
      '3 usuarios incluidos',
      'Descarga de cotizaciones en PDF',
      'Captura automática de leads',
      'Soporte prioritario por email',
    ],
    highlighted: true,
    cta: 'Probar Pro gratis 14 días',
  },
  {
    name: 'Business',
    priceMonthly: 99,
    priceAnnual: 79,
    description: 'Para agencias con varios equipos que necesitan control y analítica avanzada.',
    features: [
      'Todo lo del plan Pro',
      'Usuarios ilimitados',
      'Analytics avanzados y exportación',
      'Integración con ERP (próximamente)',
      'Webhook de leads en tiempo real',
      'Gestor de cuenta dedicado',
      'Soporte por teléfono y WhatsApp',
    ],
    highlighted: false,
    cta: 'Hablar con ventas',
  },
];

export const faqs = [
  {
    q: '¿Qué tan precisas son las cotizaciones generadas por la IA?',
    a: 'La IA lee tu tarifario base —costes LCL, aranceles, márgenes por Incoterm— y aplica esa estructura a cada consulta. La precisión depende de lo completo que sea tu tarifario. La mayoría de errores vienen de tarifarios desactualizados, no del cálculo.',
  },
  {
    q: '¿Puedo usar mis propias tarifas y márgenes?',
    a: 'Sí. Subes tu tarifario una sola vez en el panel de control y la IA lo usa como referencia exclusiva. Nadie más ve tus precios: cada empresa tiene su propio tarifario privado.',
  },
  {
    q: '¿Mis datos están seguros? ¿Cumple con el RGPD?',
    a: 'Sí. Los datos se alojan en servidores dentro de la Unión Europea. Cumplimos con el RGPD y no compartimos tu tarifario ni los datos de tus clientes con terceros.',
  },
  {
    q: '¿Cómo se gestionan los pagos?',
    a: 'Los pagos se procesan con Stripe, en euros. Puedes pagar con tarjeta o por transferencia en el plan Business. La factura se emite automáticamente cada mes con tu CIF.',
  },
  {
    q: '¿Puedo cancelar cuando quiera?',
    a: 'Sí. No hay permanencia. Cancelas desde el panel de control y dejas de pagar al mes siguiente. Sin penalizaciones ni preguntas.',
  },
  {
    q: '¿Se puede integrar con mi ERP o gestora?',
    a: 'La integración con ERPs está en desarrollo. Mientras tanto, puedes exportar cotizaciones en PDF y leads en Excel. Si necesitas una integración específica, escríbenos y lo valoramos.',
  },
  {
    q: '¿Qué incluye una cotización generada?',
    a: 'Coste de flete (FCL/LCL/aéreo), aranceles estimados, recargos portuarios (THC, BAF, ISPS), margen por Incoterm y total. El cliente ve un documento profesional con tu marca y tus datos.',
  },
  {
    q: '¿Cómo funciona el enlace público de captación de leads?',
    a: 'Te damos una URL (logiquote.app/tu-empresa) donde tus clientes entran, introducen origen, destino, Incoterm y volumen, y reciben una cotización al instante. Su email se captura automáticamente para tu seguimiento.',
  },
  {
    q: '¿Necesito instalar algo?',
    a: 'No. LogiQuote funciona en el navegador. No hay software que instalar ni mantener. Funciona en Windows, Mac, Linux, tablet y móvil.',
  },
  {
    q: '¿Ofrecéis una demo guiada?',
    a: 'Sí. Puedes reservar una demo de 20 minutos con un especialista en tarifas que te muestra el producto con datos reales de tu sector. Solicítala desde el formulario de demo.',
  },
  {
    q: '¿Qué pasa cuando agoto las cotizaciones del plan Starter?',
    a: 'Te avisamos al llegar al 80% y al 100%. Puedes esperar al mes siguiente o subir al plan Pro, que tiene cotizaciones ilimitadas.',
  },
  {
    q: '¿Dónde puedo ver las cotizaciones que han hecho mis clientes?',
    a: 'En el panel de control, sección Cotizaciones. Cada cotización generada desde tu enlace público se registra con fecha, ruta y email del cliente. En el plan Business puedes exportar todo a Excel.',
  },
];

export const useCases = [
  {
    profile: 'Transitario autónomo / pequeña agencia',
    pain: 'Cotizas a mano en Excel. Cada consulta te media hora. Pierdes clientes por tardar.',
    benefit: 'Subes tu tarifario una vez. Tus clientes se auto-cotizan en tu enlace. Tú solo cierras.',
    metric: 'De 30 min a 45 segundos por cotización.',
  },
  {
    profile: 'Agente de aduanas',
    pain: 'Los clientes te piden presupuestos antes de saber si van a importar. Calculas aranceles una y otra vez.',
    benefit: 'Configuras tus márgenes por Incoterm. La IA aplica aranceles y recargos automáticamente.',
    metric: '3× más consultas atendidas sin contratar personal.',
  },
  {
    profile: 'Departamento de importación',
    pain: 'Comparas tarifas de varios proveedores en hojas distintas. Los márgenes varían según quién cotiza.',
    benefit: 'Un tarifario único para todo el equipo. Misma estructura de costes en cada cotización.',
    metric: 'Cotizaciones consistentes, sin errores manuales.',
  },
];

export const resources = [
  {
    slug: 'guia-incoterms-2020',
    title: 'Guía de Incoterms 2020: qué cambia y cómo afecta a tus cotizaciones',
    excerpt: 'Los Incoterms 2020 definen quién paga qué en una operación de comercio internacional. Esta guía repasa los 11 términos, quién asume cada coste y cómo configurarlos en tu tarifario.',
    date: '2026-09-15',
    author: 'Equipo LogiQuote',
    readTime: '8 min',
    category: 'Guía',
  },
  {
    slug: 'calcular-flete-lcl',
    title: 'Cómo calcular el flete LCL: CBM, peso volumétrico y recargos',
    excerpt: 'El flete LCL se cobra por volumen (CBM) o por peso, lo que sea mayor. Explicamos cómo calcularlo, qué recargos aplicar y cómo automatizar el cálculo con tu tarifario.',
    date: '2026-09-22',
    author: 'Equipo LogiQuote',
    readTime: '10 min',
    category: 'Guía',
  },
  {
    slug: 'que-incluye-cotizacion-logistica',
    title: 'Qué incluye una cotización logística completa (y qué suele olvidarse)',
    excerpt: 'Una cotización profesional no es solo el flete. Repasamos los 7 componentes que debe incluir: flete, aranceles, recargos portuarios, despacho, almacenaje, margen y validez.',
    date: '2026-09-28',
    author: 'Equipo LogiQuote',
    readTime: '7 min',
    category: 'Guía',
  },
];
