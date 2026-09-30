import { LegalLayout, LegalSection } from '@/components/LegalLayout';

export default function AvisoLegal() {
  return (
    <LegalLayout
      title="Aviso Legal"
      description="Aviso legal de LogiQuote, plataforma de cotizaciones logísticas con IA."
    >
      <LegalSection title="1. Identificación del titular">
        <p>
          De conformidad con lo establecido en la Ley 34/2002, de 11 de julio, de servicios de la
          sociedad de la información y de comercio electrónico (LSSI-CE), se informa que el titular
          del presente sitio web es LogiQuote SL (en adelante, "LogiQuote"), con CIF B-12345678,
          domiciliada en Calle Principal 123, 28001, Madrid, España, inscrita en el Registro
          Mercantil de Madrid, Tomo 1234, Folio 56, Sección 8, Hoja M-12345.
        </p>
        <p>
          Puede contactar con LogiQuote a través del correo electrónico contacto@logiquote.app o del
          teléfono +34 910 000 000.
        </p>
      </LegalSection>

      <LegalSection title="2. Objeto">
        <p>
          El presente aviso legal regula el uso del sitio web logiquote.app, a través del cual
          LogiQuote proporciona a los usuarios un servicio de cotización logística automatizada
          mediante inteligencia artificial, dirigido a transitarios y agentes de aduanas.
        </p>
        <p>
          La utilización del sitio web atribuye la condición de usuario e implica la aceptación
          plena y sin reservas de todas y cada una de las disposiciones incluidas en este aviso
          legal.
        </p>
      </LegalSection>

      <LegalSection title="3. Condiciones de uso">
        <p>
          El usuario se compromete a hacer un uso lícito y adecuado del contenido y servicios
          ofrecidos en el sitio web. Queda prohibido cualquier uso que pueda dañar, sobrecargar,
          deteriorar o impedir la normal utilización del sitio web.
        </p>
        <p>
          LogiQuote no se hace responsable de los daños o perjuicios de cualquier naturaleza que
          pudieran derivarse de la utilización de la información y servicios del sitio web por parte
          de los usuarios.
        </p>
      </LegalSection>

      <LegalSection title="4. Propiedad intelectual">
        <p>
          Todos los contenidos del sitio web (incluidos, a título enunciativo, textos, fotografías,
          gráficos, imágenes, iconos, tecnología, software, así como su diseño gráfico y códigos
          fuente) son propiedad intelectual de LogiQuote, sin que pueda entenderse que el uso de
          los mismos otorga derecho alguno sobre ellos.
        </p>
      </LegalSection>

      <LegalSection title="5. Responsabilidad">
        <p>
          LogiQuote no garantiza la inexistencia de errores en el acceso al sitio web ni la
          disponibilidad y continuidad de su funcionamiento. Las cotizaciones generadas por el
          sistema son orientativas y no constituyen una oferta vinculante.
        </p>
      </LegalSection>

      <LegalSection title="6. Legislación aplicable">
        <p>
          Este aviso legal se rige por la legislación española. Para la resolución de cualquier
          controversia, las partes se someten a los juzgados y tribunales de Madrid.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
