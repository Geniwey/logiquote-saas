import { LegalLayout, LegalSection } from '@/components/LegalLayout';

export default function Cookies() {
  return (
    <LegalLayout
      title="Política de Cookies"
      description="Política de cookies de LogiQuote conforme a la Ley de servicios de la sociedad de la información (LSSI-CE)."
    >
      <LegalSection title="1. Qué son las cookies">
        <p>
          Las cookies son pequeños ficheros de texto que se descargan en el navegador del usuario cuando visita un sitio web.
          Permiten recordar información sobre la visita, como las preferencias del idioma o el estado de la sesión.
        </p>
      </LegalSection>

      <LegalSection title="2. Cookies utilizadas por LogiQuote">
        <p>LogiQuote utiliza los siguientes tipos de cookies:</p>
        <p><strong className="text-ink">Cookies esenciales:</strong> necesarias para el funcionamiento del sitio (sesión de usuario, autenticación). No requieren consentimiento.</p>
        <p><strong className="text-ink">Cookies analíticas:</strong> medición anónima del tráfico para mejorar el sitio. Requieren consentimiento.</p>
        <p>LogiQuote no utiliza cookies publicitarias ni de seguimiento de terceros.</p>
      </LegalSection>

      <LegalSection title="3. Consentimiento y rechazo">
        <p>
          Al acceder al sitio, se muestra un banner de cookies que permite aceptar o rechazar las cookies no esenciales.
          El rechazo tiene el mismo efecto que la aceptación en cuanto a navegación: puedes usar el sitio con normalidad.
        </p>
        <p>
          Puedes cambiar tu decisión en cualquier momento borrando las cookies de tu navegador y volviendo a cargar la página.
        </p>
      </LegalSection>

      <LegalSection title="4. Conservación">
        <p>
          Las cookies esenciales se conservan mientras la sesión esté activa. Las cookies analíticas se conservan
          durante un máximo de 12 meses.
        </p>
      </LegalSection>

      <LegalSection title="5. Más información">
        <p>
          Para cualquier consulta sobre el uso de cookies, contacta con nosotros en hola@logiquote.app.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
