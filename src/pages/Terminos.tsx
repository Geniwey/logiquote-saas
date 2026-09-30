import { LegalLayout, LegalSection } from '@/components/LegalLayout';

export default function Terminos() {
  return (
    <LegalLayout
      title="Términos y Condiciones"
      description="Términos y condiciones de uso de la plataforma LogiQuote."
    >
      <LegalSection title="1. Aceptación de los términos">
        <p>
          El acceso y uso de la plataforma LogiQuote implica la aceptación plena y sin reservas de
          los presentes Términos y Condiciones. Si el usuario no está de acuerdo con alguno de
          ellos, deberá abstenerse de utilizar el servicio.
        </p>
      </LegalSection>

      <LegalSection title="2. Descripción del servicio">
        <p>
          LogiQuote es una plataforma SaaS que permite a transitarios y agentes de aduanas
          automatizar la generación de cotizaciones logísticas mediante inteligencia artificial,
          basándose en el tarifario proporcionado por el usuario.
        </p>
        <p>
          El servicio incluye: almacenamiento de tarifarios en la nube, generación de cotizaciones
          automáticas mediante IA, y un enlace público para que los clientes finales soliciten
          presupuestos.
        </p>
      </LegalSection>

      <LegalSection title="3. Suscripción y facturación">
        <p>
          El servicio se ofrece bajo un modelo de suscripción mensual de 49€ (Plan Pro). El pago se
          realiza a través de la pasarela Stripe. La suscripción se renueva automáticamente cada
          mes hasta que el usuario la cancela.
        </p>
        <p>
          El usuario puede cancelar la suscripción en cualquier momento desde su panel de control o
          contactando con soporte. La cancelación surtirá efecto al final del periodo de
          facturación en curso.
        </p>
      </LegalSection>

      <LegalSection title="4. Cotizaciones generadas">
        <p>
          Las cotizaciones generadas por el sistema son orientativas y se basan exclusivamente en
          el tarifario proporcionado por el usuario. LogiQuote no garantiza la exactitud de los
          cálculos ni asume responsabilidad por decisiones comerciales tomadas en base a las
          cotizaciones.
        </p>
        <p>
          El usuario es el único responsable de la veracidad y actualización de su tarifario.
        </p>
      </LegalSection>

      <LegalSection title="5. Uso aceptable">
        <p>
          El usuario se compromete a: (a) no utilizar el servicio para fines ilícitos; (b) no
          intentar acceder a datos de otros usuarios; (c) no realizar ingeniería inversa del
          software; (d) no abusar del servicio mediante solicitudes automatizadas masivas.
        </p>
      </LegalSection>

      <LegalSection title="6. Limitación de responsabilidad">
        <p>
          LogiQuote no será responsable de: (a) interrupciones del servicio por causas de fuerza
          mayor; (b) errores en las cotizaciones derivados de tarifarios incorrectos; (c) daños
          indirectos, lucro cesante o pérdida de oportunidades comerciales.
        </p>
      </LegalSection>

      <LegalSection title="7. Modificaciones">
        <p>
          LogiQuote se reserva el derecho de modificar los presentes términos en cualquier momento.
          Las modificaciones se publicarán en esta página y entrarán en vigor a partir de su
          publicación.
        </p>
      </LegalSection>

      <LegalSection title="8. Legislación aplicable">
        <p>
          Los presentes términos se rigen por la legislación española. Para cualquier controversia,
          las partes se someten a la jurisdicción de los juzgados y tribunales de Madrid.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
