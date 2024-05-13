const PrivacyPoliciesPage = () => {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-12 md:py-16 lg:py-20">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold tracking-tight">Política de privacidad</h1>
        <p className="text-lg text-gray-500 dark:text-gray-400">
          En nuestro sitio web de quejas de la comunidad, nos comprometemos a proteger la privacidad
          y seguridad de su información personal. Esta política de privacidad describe cómo
          recopilamos, utilizamos y salvaguardamos sus datos.
        </p>
        <section>
          <h2 className="text-xl font-semibold">Recopilación de datos</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Recopilamos la siguiente información de usted:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Su nombre y dirección de correo electrónico cuando envía una queja</li>
            <li>Los detalles de su queja, incluidos los documentos o imágenes de apoyo</li>
            <li>Su dirección IP y la información de su navegador para el análisis del sitio web</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Uso de datos</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Utilizamos la información que recopilamos para:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Responder y abordar sus quejas de la comunidad</li>
            <li>Mejorar la funcionalidad y la experiencia del usuario de nuestro sitio web</li>
            <li>Analizar el tráfico y los patrones de uso del sitio web</li>
            <li>Cumplir con los requisitos legales y normativos</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Intercambio de datos</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Podemos compartir su información con las siguientes partes:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Las autoridades o agencias gubernamentales relevantes, si lo exige la ley</li>
            <li>
              Proveedores de servicios de terceros que nos ayudan a operar el sitio web y abordar
              las quejas
            </li>
            <li>
              Otros usuarios del sitio web, pero solo los detalles de su queja, no su información
              personal
            </li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Seguridad de datos</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Nos tomamos en serio la seguridad de su información personal y hemos implementado las
            siguientes medidas para protegerla:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Cifrado de datos en tránsito y en reposo</li>
            <li>Servidores seguros y una infraestructura de red</li>
            <li>Auditorías y actualizaciones de seguridad periódicas</li>
            <li>Controles de acceso estrictos y capacitación de los empleados</li>
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold">Sus derechos</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Como usuario de nuestro sitio web, usted tiene los siguientes derechos:
          </p>
          <ul className="list-disc space-y-2 pl-6">
            <li>Acceso a la información personal que tenemos sobre usted</li>
            <li>Corrección de cualquier información personal inexacta o incompleta</li>
            <li>Eliminación de su información personal, sujeto a los requisitos legales</li>
            <li>Optar por no recibir comunicaciones de marketing o promocionales</li>
          </ul>
        </section>
        <p className="text-gray-500 dark:text-gray-400">
          Si tiene alguna pregunta o inquietud sobre nuestra política de privacidad, comuníquese con
          nosotros en
          <a
            className="text-blue-500 hover:underline"
            href="mailto:privacy@communitycomplaints.com"
          >
            privacy@communitycomplaints.com
          </a>
          .{"\n          "}
        </p>
      </div>
    </main>
  );
};

export default PrivacyPoliciesPage;
