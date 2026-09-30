import { LegalLayout, LegalSection } from '@/components/LegalLayout';

export default function Privacidad() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      description="Política de privacidad de LogiQuote conforme al Reglamento General de Protección de Datos (RGPD)."
    >
      <LegalSection title="1. Responsable del tratamiento">
        <p>
          El responsable del tratamiento de los datos personales es LogiQuote SL, con CIF B-12345678,
          domiciliada en Calle Principal 123, 28001, Madrid. Contacto: contacto@logiquote.app.
        </p>
      </LegalSection>

      <LegalSection title="2. Datos recogidos">
        <p>
          Tratamos los siguientes datos personales: nombre de la empresa, identificador de sesión
          anónimo, dirección de correo electrónico (en su caso) y datos de uso del servicio
          (tarifarios guardados, cotizaciones generadas).
        </p>
        <p>
          No tratamos categorías especiales de datos personales ni datos de menores de edad.
        </p>
      </LegalSection>

      <LegalSection title="3. Finalidades del tratamiento">
        <p>
          Los datos se tratan con las siguientes finalidades: (a) prestación del servicio de
          cotización logística automatizada; (b) almacenamiento de tarifarios en la nube;
          (c) gestión de la suscripción y facturación; (d) atención al cliente.
        </p>
      </LegalSection>

      <LegalSection title="4. Base jurídica">
        <p>
          La base jurídica para el tratamiento de los datos es la ejecución de un contrato para la
          prestación del servicio solicitado por el usuario, así como el interés legítimo en el
          mantenimiento y mejora del servicio.
        </p>
      </LegalSection>

      <LegalSection title="5. Conservación de datos">
        <p>
          Los datos se conservarán durante el tiempo en que el usuario mantenga la cuenta activa.
          Tras la cancelación, los datos se eliminarán en un plazo máximo de 90 días, salvo
          obligación legal de conservación.
        </p>
      </LegalSection>

      <LegalSection title="6. Destinatarios">
        <p>
          Los datos podrán ser comunicados a proveedores de servicios cloud y procesamiento de
          pagos (Supabase, Stripe, Google Cloud) que actúan como encargados del tratamiento bajo
          las garantías del artículo 28 del RGPD.
        </p>
      </LegalSection>

      <LegalSection title="7. Derechos de los usuarios">
        <p>
          El usuario tiene derecho a acceder a sus datos, rectificarlos, suprimirlos, limitar su
          tratamiento, oponerse al mismo y solicitar la portabilidad. Para ejercer estos derechos
          puede dirigirse a contacto@logiquote.app.
        </p>
      </LegalSection>

      <LegalSection title="8. Agencia Española de Protección de Datos">
        <p>
          Si considera que el tratamiento de sus datos vulnera sus derechos, puede presentar una
          reclamación ante la Agencia Española de Protección de Datos (www.aepd.es).
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
