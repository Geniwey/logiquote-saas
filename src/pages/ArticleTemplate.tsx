import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, ArrowRight } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { resources } from '@/lib/content';

const articleContent: Record<string, { toc: string[]; body: { h2: string; paragraphs: string[] }[] }> = {
  'guia-incoterms-2020': {
    toc: ['Qué son los Incoterms', 'Los 11 Incoterms 2020', 'Quién paga qué', 'Cómo configurarlos en LogiQuote', 'Errores frecuentes'],
    body: [
      {
        h2: 'Qué son los Incoterms y por qué importan',
        paragraphs: [
          'Los Incoterms (International Commercial Terms) son once reglas publicadas por la Cámara de Comercio Internacional (ICC) que definen las obligaciones del vendedor y del comprador en una operación de comercio internacional. La versión vigente es la de 2020, publicada el 1 de enero de ese año.',
          'Su función no es decorativa. Un Incoterm determina quién paga el flete, quién contrata el seguro, dónde se transfiere el riesgo de la mercancía y qué documentos debe entregar cada parte. Cotizar sin saber el Incoterm es como calcular un préstamo sin saber el tipo de interés: el número sale, pero no significa nada.',
          'En LogiQuote, el Incoterm es un campo obligatorio del cotizador. La IA aplica los márgenes y costes según el término seleccionado, porque un FOB y un DDP no se cotizan igual: en FOB el vendedor solo paga hasta el puerto de origen, en DDP paga todo hasta el destino final, incluyendo aranceles e impuestos.',
        ],
      },
      {
        h2: 'Los 11 Incoterms 2020: una guía rápida',
        paragraphs: [
          'Los Incoterms se dividen en dos categorías: los de transporte marítimo y fluvial (FAS, FOB, CFR, CIF) y los de cualquier modo de transporte (EXW, FCA, CPT, CIP, DAP, DPU, DDP). En la práctica, la mayoría de cotizaciones de importación usan FOB, CIF, EXW o DAP.',
          'EXW (Ex Works): el comprador asume todo desde la fábrica del vendedor. Es el Incoterm con menor obligación para el vendedor y el mayor para el comprador. Útil cuando el comprador tiene un transitario en origen que puede recoger la mercancía.',
          'FOB (Free On Board): el vendedor entrega la mercancía a bordo del buque en el puerto de origen. A partir de ahí, el comprador asume el flete, el seguro y los riesgos. Es el Incoterm más usado en importación marítima desde Asia.',
          'CIF (Cost, Insurance and Freight): el vendedor paga el flete y un seguro mínimo hasta el puerto de destino. El riesgo se transfiere en origen (a bordo del buque), aunque el vendedor paga el transporte. Sutil pero importante: el comprador asume el riesgo del viaje aunque no pague el flete.',
          'DAP (Delivered at Place): el vendedor entrega la mercancía en un lugar convenido, listo para ser descargado. El comprador paga aranceles e impuestos. Útil cuando el vendedor tiene buena red logística en destino.',
          'DDP (Delivered Duty Paid): el vendedor asume todo, incluyendo aranceles e IVA de importación. Es el Incoterm con mayor obligación para el vendedor. Poco frecuente en importación desde fuera de la UE porque requiere que el vendedor esté registrado ante la aduana del país de destino.',
        ],
      },
      {
        h2: 'Quién paga qué: la tabla que necesitas',
        paragraphs: [
          'La pregunta más frecuente al cotizar no es "cuánto cuesta" sino "quién paga qué". La respuesta depende del Incoterm. Aquí tienes un resumen práctico de los cuatro más usados en importación.',
          'En FOB: el vendedor paga la carga en origen y el flete hasta el puerto. El comprador paga el flete marítimo, el seguro, la descarga, los aranceles, el despacho aduanero y el transporte hasta el destino final. La mayoría de importadores españoles que traen mercancía de China trabajan en FOB.',
          'En CIF: el vendedor paga flete y seguro hasta el puerto de destino. El comprador paga la descarga, aranceles, despacho y transporte interior. La diferencia con FOB es quién contrata y paga el flete marítimo.',
          'En EXW: el comprador paga absolutamente todo, desde la recogida en la fábrica del vendedor. El vendedor solo tiene la obligación de tener la mercancía empaquetada y lista en sus instalaciones.',
          'En DDP: el vendedor paga absolutamente todo, incluyendo aranceles e IVA. El comprador solo recibe la mercancía en su almacén. Es el opuesto de EXW.',
        ],
      },
      {
        h2: 'Cómo configurar Incoterms en tu tarifario de LogiQuote',
        paragraphs: [
          'En LogiQuote, los márgenes por Incoterm se configuran en el tarifario base. El sistema permite definir un margen distinto para cada Incoterm, porque el riesgo y el coste asumido varían según el término.',
          'Por ejemplo, puedes configurar un margen del 18% para EXW (porque asumes menos riesgo y coste), 15% para FOB, 12% para CIF y 8% para DDP (porque asumes más). La IA aplicará automáticamente el margen correspondiente al Incoterm seleccionado en cada cotización.',
          'Para configurarlo, entra al panel de control, edita tu tarifario y añade los márgenes en la sección "Márgenes por Incoterm". Guarda y la IA los aplicará en cada cotización nueva.',
        ],
      },
      {
        h2: 'Errores frecuentes al cotizar con Incoterms',
        paragraphs: [
          'El error más común es cotizar sin especificar el Incoterm. Un precio de "2.450€" sin Incoterm es ambiguo: ¿incluye el flete? ¿los aranceles? ¿el seguro? Sin Incoterm, no hay respuesta. Y sin respuesta, el cliente desconfía.',
          'El segundo error más común es confundir CIF con DDP. En CIF, el riesgo se transfiere en origen, aunque el vendedor pague el flete. En DDP, el vendedor asume el riesgo hasta el destino final. Son términos radicalmente distintos con implicaciones de coste y riesgo muy diferentes.',
          'El tercer error es no actualizar los márgenes cuando cambian las condiciones del mercado. Si el flete marítimo sube un 30%, un margen fijo del 15% puede no ser suficiente. Revisa tu tarifario cada trimestre.',
        ],
      },
    ],
  },
  'calcular-flete-lcl': {
    toc: ['Qué es el flete LCL', 'Cómo se calcula el CBM', 'Peso volumétrico', 'Recargos portuarios', 'Automatizar el cálculo'],
    body: [
      {
        h2: 'Qué es el flete LCL y cuándo se usa',
        paragraphs: [
          'LCL (Less than Container Load) es el flete marítimo para envíos que no llenan un contenedor completo. En lugar de alquilar un contenedor entero (FCL), compartes el espacio con otros cargadores y pagas proporcionalmente al volumen que ocupas.',
          'Se usa típicamente para envíos de entre 1 y 15 CBM (metros cúbicos). Por debajo de 1 CBM, el coste de consolidación puede hacer que el LCL no sea rentable. Por encima de 15 CBM, un contenedor FCL de 20 pies suele ser más económico.',
          'La regla práctica de los transitarios es: si tu carga ocupa más de la mitad de un contenedor de 20 pies (aproximadamente 15 CBM), conviene un FCL. Si ocupa menos, LCL.',
        ],
      },
      {
        h2: 'Cómo se calcula el CBM (volumen de carga)',
        paragraphs: [
          'El CBM (Cubic Meter) es la unidad de medida del flete LCL. Se calcula multiplicando el largo × ancho × alto de cada bulto, en metros, y sumando todos los bultos.',
          'Por ejemplo: 10 cajas de 1,2m × 0,8m × 0,6m = 10 × 0,576 = 5,76 CBM. Ese es el volumen total de tu envío y la base para calcular el flete LCL.',
          'En LogiQuote, el campo de volumen del cotizador espera el CBM total. Si tienes varias cajas de distinto tamaño, calcula el CBM de cada una y súmalos antes de introducir el dato.',
        ],
      },
      {
        h2: 'Peso volumétrico: lo que sea mayor',
        paragraphs: [
          'Las navieras cobran LCL por lo que sea mayor: el volumen (CBM) o el peso (toneladas). La regla es 1 CBM = 1 tonelada (1.000 kg). Si tu carga pesa más de 1.000 kg por CBM, se cobra por peso. Si pesa menos, se cobra por volumen.',
          'Por ejemplo: 3 CBM de mercancía que pesa 4.000 kg. Como 4.000 kg > 3.000 kg (3 CBM × 1.000), se cobra por peso: 4 toneladas. Si la misma carga pesara 2.000 kg, se cobraría por volumen: 3 CBM.',
          'Esto es importante porque muchos importadores calculan el flete solo por volumen y se sorprenden cuando la factura final es mayor. Si tu mercancía es densa (metal, maquinaria, cerámica), el peso probablemente determine el precio.',
        ],
      },
      {
        h2: 'Recargos portuarios que se suman al flete',
        paragraphs: [
          'El flete LCL base no es el precio final. Se suman varios recargos portuarios fijos que dependen del origen y destino, no del volumen:',
          'THC (Terminal Handling Charge): coste de manipulación en el terminal portuario. Suele rondar los 95€ por envío LCL. Es el recargo más común y a veces se olvida en las cotizaciones manuales.',
          'BAF (Bunker Adjustment Factor): recargo por fluctuación del precio del combustible. Varía según la ruta y puede subir o bajar mensualmente. Suele estar entre 30 y 60€.',
          'ISPS (International Ship and Port Facility Security): recargo de seguridad portuaria. Fijo, aproximadamente 12€ por envío.',
          'Otros recargos posibles: documentación (BL fee, 25-40€), consolidación en origen, desconsolidación en destino, tasa de seguridad. La suma de todos estos recargos puede añadir entre 150 y 250€ al flete base.',
        ],
      },
      {
        h2: 'Automatizar el cálculo con tu tarifario',
        paragraphs: [
          'Calcular el flete LCL a mano cada vez es lento y propenso a errores. En LogiQuote, configuras tu coste por CBM para cada origen una sola vez y la IA aplica el cálculo automáticamente: coste base × CBM + recargos portuarios + margen por Incoterm.',
          'Por ejemplo, si tu tarifario tiene "Origen Asia: 45€/CBM" y un cliente solicita 3,8 CBM desde Shanghai a Valencia en FOB, la IA calcula: 45 × 3,8 = 1.710€ de flete base, + 152€ de recargos (THC+BAF+ISPS), + 120€ de despacho aduanero = 1.982€ subtotal. Con un margen FOB del 15%: 1.982 × 1,15 = 2.279€. En segundos, sin Excel.',
          'La ventaja no es solo la velocidad: es la consistencia. Cada cotización usa la misma estructura de costes, los mismos recargos y el mismo margen. No hay variación según quién cotice en la oficina.',
        ],
      },
    ],
  },
  'que-incluye-cotizacion-logistica': {
    toc: ['Los 7 componentes', 'Flete', 'Aranceles', 'Recargos portuarios', 'Despacho y almacenaje', 'Margen', 'Validez y observaciones'],
    body: [
      {
        h2: 'Los 7 componentes de una cotización logística completa',
        paragraphs: [
          'Una cotización logística profesional no es solo el precio del flete. Muchos transitarios envían cotizaciones incompletas que generan confusión, disputas con el cliente y, peor aún, pérdidas por costes no previstos. Una cotización completa tiene siete componentes.',
          'Saltarse cualquiera de ellos es la causa más frecuente de discrepancias entre lo que el cliente espera pagar y lo que finalmente paga. Aquí repasamos los siete, con ejemplos concretos.',
        ],
      },
      {
        h2: '1. Flete (FCL, LCL o aéreo)',
        paragraphs: [
          'El flete es el coste de transporte de la mercancía desde el origen hasta el destino. Puede ser marítimo (FCL contenedor completo o LCL consolidado) o aéreo. Se cobra por contenedor (FCL), por CBM o tonelada (LCL), o por kilo (aéreo).',
          'El Incoterm determina qué parte del flete paga el vendedor y cuál el comprador. En FOB, el comprador paga el flete marítimo. En CIF, el vendedor lo paga hasta el puerto de destino. El flete debe desglosarse, no incluirse como una linea genérica "transporte".',
        ],
      },
      {
        h2: '2. Aranceles e impuestos de importación',
        paragraphs: [
          'Los aranceles son impuestos que la aduana del país de destino cobra sobre el valor de la mercancía importada. En la UE, el arancel depende del código TARIC del producto y del país de origen. Puede ir del 0% (acuerdos de libre comercio) al 17% o más.',
          'Además del arancel, se paga el IVA de importación (21% en España sobre la base imponible + arancel) y, según el producto, impuestos especiales (alcohol, tabaco, hidrocarburos).',
          'Una cotización completa debe incluir una estimación de aranceles basada en el código TARIC del producto. Si no se conoce el código exacto, se debe indicar una estimación con el porcentaje aplicado.',
        ],
      },
      {
        h2: '3. Recargos portuarios (THC, BAF, ISPS)',
        paragraphs: [
          'Los recargos portuarios son costes fijos que las navieras y los terminales cobran por manipular la mercancía. No dependen del volumen, sino del envío. Los más comunes son THC (95€), BAF (45€) e ISPS (12€), aunque hay otros como el recargo de documentation o la tasa de seguridad.',
          'Estos recargos se deben listar individualmente, no agruparlos en una linea "varios". El cliente tiene derecho a saber qué está pagando. Una cotización que agrupa todo en "flete + gastos" genera desconfianza.',
        ],
      },
      {
        h2: '4. Despacho aduanero y almacenaje',
        paragraphs: [
          'El despacho aduanero es el trámite de nacionalización de la mercancía: presentación del DUA, pago de aranceles e IVA, liberación por la aduana. Suele costar entre 80 y 150€ por operación, según el transitario.',
          'El almacenaje fiscal se cobra si la mercancía permanece en el puerto o en un almacén aduanero más allá de los días libres (normalmente 5-7 días). Después, se cobra por día, entre 8 y 15€.',
          'Una cotización completa debe indicar los días libres de almacenaje incluidos y el coste por día adicional. Si no se menciona, el cliente puede asumir que el almacenaje es ilimitado y gratis.',
        ],
      },
      {
        h2: '5. Margen del transitario',
        paragraphs: [
          'El margen es la ganancia del transitario sobre el coste total. Se aplica como un porcentaje sobre el subtotal (flete + aranceles + recargos + despacho). El porcentaje varía según el Incoterm: más riesgo y coste asumido, menor margen.',
          'En LogiQuote, el margen se configura en el tarifario y se aplica automáticamente. Un margen típico es 15% para FOB, 12% para CIF, 18% para EXW. El margen no se muestra como una linea separada en la cotización al cliente: va integrado en el total.',
        ],
      },
      {
        h2: '6. Validez y observaciones',
        paragraphs: [
          'Toda cotización debe indicar una validez temporal. Los fletes marítimos fluctúan mensualmente, los aranceles pueden cambiar y los recargos portuarios se actualizan. Una validez estándar es 15 días desde la fecha de emisión.',
          'Las observaciones deben incluir: si el arancel es estimado o confirmado, qué pasa si el peso o volumen real difiere del cotizado, qué Incoterms aplican, y cualquier condición especial (carga peligrosa, reefer, sobredimensión).',
          'Una cotización sin validez ni observaciones es una nota, no un documento profesional. El cliente puede reclamar meses después un precio que ya no es válido. La validez protege al transitario y gestiona las expectativas del cliente.',
        ],
      },
    ],
  },
};

export default function ArticleTemplate() {
  const { slug } = useParams<{ slug: string }>();
  const article = resources.find((r) => r.slug === slug);
  const content = slug ? articleContent[slug] : undefined;

  if (!article || !content) {
    return <Navigate to="/recursos" replace />;
  }

  const articleStructured = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    datePublished: article.date,
    author: { '@type': 'Organization', name: article.author },
    publisher: { '@type': 'Organization', name: 'LogiQuote' },
  };

  return (
    <>
      <SEO
        title={`${article.title} | LogiQuote`}
        description={article.excerpt}
        canonical={`https://logiquote.app/recursos/${article.slug}`}
        ogType="article"
        structuredData={articleStructured}
      />
      <div className="min-h-screen bg-bone">
        <Navbar />
        <main>
          <article className="mx-auto max-w-3xl px-6 py-20 md:py-28">
            <Link to="/recursos" className="btn-ghost mb-8"><ArrowLeft className="h-4 w-4" /> Recursos</Link>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-xs font-mono text-signal border border-signal px-2 py-0.5" style={{ borderRadius: '4px' }}>{article.category}</span>
              <span className="text-xs font-mono text-ink-muted flex items-center gap-1"><Clock className="h-3 w-3" /> {article.readTime}</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-ink leading-tight mb-6">{article.title}</h1>

            <div className="flex items-center gap-4 text-sm text-ink-muted border-b border-line pb-6 mb-10">
              <span>{article.author}</span>
              <span className="font-mono">{new Date(article.date).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>

            {/* TOC */}
            <div className="border border-line bg-white p-6 mb-12" style={{ borderRadius: '6px' }}>
              <p className="text-xs font-mono text-ink-muted uppercase tracking-wider mb-3">Índice</p>
              <ol className="space-y-2">
                {content.toc.map((item, i) => (
                  <li key={i} className="text-sm text-ink-light flex items-baseline gap-3">
                    <span className="font-mono text-ink-muted text-xs">{String(i + 1).padStart(2, '0')}</span>
                    {item}
                  </li>
                ))}
              </ol>
            </div>

            {/* Body */}
            <div className="space-y-10">
              {content.body.map((section, i) => (
                <section key={i}>
                  <h2 className="text-2xl font-display font-semibold text-ink mb-4">{section.h2}</h2>
                  <div className="space-y-4">
                    {section.paragraphs.map((p, j) => (
                      <p key={j} className="text-ink-light leading-relaxed">{p}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-16 border-t border-line pt-12">
              <div className="bg-navy text-white p-8" style={{ borderRadius: '6px' }}>
                <h2 className="text-xl font-display font-semibold text-white mb-3">¿Quieres cotizar con tu propio tarifario?</h2>
                <p className="text-white/60 text-sm mb-6">Crea una cuenta gratis en LogiQuote y sube tu tarifario. La IA generará cotizaciones completas en segundos.</p>
                <Link to="/login" className="btn-primary">Probar gratis 14 días <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  );
}
