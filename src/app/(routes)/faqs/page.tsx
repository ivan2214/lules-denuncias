import {MountainIcon} from "lucide-react"

import {
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
  Accordion,
} from "@/components/ui/accordion"

const FaqsPage = () => {
  return (
    <>
      <header className="bg-gray-100 px-4 py-6 dark:bg-gray-800 md:px-6">
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <MountainIcon className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold">Quejas de lules</h2>
          </div>
        </div>
      </header>
      <main className="px-4 py-12 md:px-6">
        <div className="container max-w-4xl space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">Preguntas frecuentes</h2>
            <p className="text-gray-500 dark:text-gray-400">
              Obtenga respuestas a sus preguntas más comunes sobre nuestra plataforma de quejas
              comunitarias.
            </p>
          </div>
          <Accordion collapsible type="single">
            <AccordionItem value="how-to-file">
              <AccordionTrigger className="text-lg font-medium">
                ¿Cómo presento una queja?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-500 dark:text-gray-400">
                  <p>
                    Para presentar una queja, simplemente visite nuestro sitio web y haga clic en el
                    botón Presentar una queja. Se le pedirá que proporcione detalles sobre el
                    problema, incluida la ubicación, la fecha y una descripción de lo que sucedió.
                  </p>

                  <p>
                    Una vez que haya enviado su queja, nuestro equipo la revisará y se comunicará
                    con usted con los siguientes pasos. También puede verificar el estado de su
                    queja en cualquier momento iniciando sesión en su cuenta.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="complaint-process">
              <AccordionTrigger className="text-lg font-medium">
                ¿Cómo se procesan las quejas?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-500 dark:text-gray-400">
                  <p>
                    Cuando se presenta una queja, nuestro equipo la revisa para garantizar que
                    cumpla con los criterios de nuestra plataforma. Luego investigamos el problema,
                    reunimos las pruebas necesarias y nos comunicamos con las partes pertinentes.
                  </p>
                  <p>
                    Dependiendo de la naturaleza de la queja, podemos trabajar con las autoridades
                    locales u organizaciones comunitarias para resolver el problema. Nuestro
                    objetivo es proporcionar un proceso justo e imparcial para todos los
                    denunciantes.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="accepted-complaints">
              <AccordionTrigger className="text-lg font-medium">
                ¿Qué tipos de quejas se aceptan?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-500 dark:text-gray-400">
                  <p>
                    Aceptamos una amplia gama de quejas relacionadas con la comunidad, incluidos
                    problemas con la infraestructura local, servicios públicos, preocupaciones de
                    seguridad y más. No aceptamos quejas que sean de naturaleza personal, que
                    involucren actividades ilegales o que queden fuera de nuestra jurisdicción.
                  </p>
                  <p>
                    Si no está seguro de si su problema califica, no dude en comunicarse con nuestro
                    equipo y estaremos encantados de ayudarle.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="check-status">
              <AccordionTrigger className="text-lg font-medium">
                ¿Cómo puedo consultar el estado de mi queja?
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-4 text-gray-500 dark:text-gray-400">
                  <p>
                    Puede verificar el estado de su queja iniciando sesión en su cuenta en nuestro
                    sitio web. Una vez que haya iniciado sesión, podrá ver el estado actual de su
                    queja, así como cualquier actualización o acción tomada por nuestro equipo.
                  </p>
                  <p>
                    Si tiene alguna pregunta o inquietud sobre el estado de su queja, no dude en
                    comunicarse con nuestro equipo de soporte. Estamos aquí para ayudar y garantizar
                    que su problema se resuelva de manera oportuna.
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </>
  )
}

export default FaqsPage
