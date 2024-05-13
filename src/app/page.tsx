import Link from "next/link";
import {LinkedinIcon, TwitterIcon, FacebookIcon, ShareIcon} from "lucide-react";
import {StatusComplaint} from "@prisma/client";

import {CardTitle, CardHeader, CardContent, Card, CardFooter} from "@/components/ui/card";
import {type QueryProps, getFilteredComplaints} from "@/actions/complaints/get-filtered-complaints";
import {Button} from "@ui/button";
import {Badge} from "@ui/badge";
import {ButtonOpenModal} from "@components/button-open-modal";
import {ComplaintsHome} from "@components/complaints-home";
import {ChartFilterHome} from "@components/chart-filter-home";
import {db} from "@/lib/db";

export default async function HomePage({searchParams}: {searchParams: QueryProps}) {
  const {complaints} = await getFilteredComplaints(searchParams);

  const categoriesMostResolved = await db.category?.findMany({
    where: {
      complaints: {
        some: {
          complaint: {
            status: StatusComplaint.RESOLVED,
          },
        },
      },
    },
    select: {
      _count: {
        select: {
          complaints: {
            where: {
              complaint: {
                status: StatusComplaint.RESOLVED,
              },
            },
          },
        },
      },
      complaints: {
        select: {
          complaint: {
            select: {
              images: true,
            },
          },
        },
      },
      name: true,
    },
    orderBy: {
      complaints: {
        _count: "desc",
      },
    },
  });

  return (
    <main className="container h-full w-full">
      <section className="py-16">
        <div className="mx-auto grid max-w-[1300px] gap-4 md:grid-cols-2 md:gap-16">
          <div>
            <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
              Empodere a su comunidad con nuestra plataforma de quejas
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              Informe y realice un seguimiento fácilmente de los problemas de la comunidad, desde
              baches hasta vertidos ilegales. Nuestra plataforma conecta a los residentes con las
              autoridades locales para impulsar un cambio real.
            </p>
            <div className="mt-6 space-x-4">
              <ButtonOpenModal />
            </div>
          </div>
          <div className="flex flex-col items-start space-y-4">
            <Badge variant="outline">Empoderamiento comunitario</Badge>
            <p className="mx-auto max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl">
              Nuestra plataforma brinda a los residentes una voz y una forma de impulsar cambios
              positivos en sus vecindarios.
            </p>
          </div>
        </div>
      </section>
      <section className="container w-full space-y-10 border-b px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <ComplaintsHome complaints={complaints} />
      </section>
      {/* categories most creates */}

      <section className="container w-full space-y-10 border-b px-4 py-12 md:px-6 md:py-24 lg:py-32">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
          Categorías con más denuncias resueltas
        </h2>
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-4">
          {categoriesMostResolved
            ? categoriesMostResolved?.map((category) => (
                <div
                  key={category?.name}
                  className="flex flex-col gap-y-4 overflow-hidden rounded-md shadow-md transition-shadow duration-300 hover:shadow-2xl"
                >
                  {category?.complaints?.[0]?.complaint?.images ? (
                    <div className="h-32 w-full">
                      <img
                        alt=""
                        className="aspect-square h-full w-full  object-cover"
                        src={category?.complaints[0]?.complaint.images[0]?.url}
                      />
                    </div>
                  ) : null}
                  <div className="flex items-center justify-between p-4">
                    <h3 className="text-lg font-semibold">{category?.name}</h3>
                    <Badge>{category?._count.complaints} complaints</Badge>
                  </div>
                </div>
              ))
            : null}
        </div>
      </section>
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_300px]">
            <ChartFilterHome complaints={complaints} />
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Acerca de nuestra plataforma</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    Nuestra plataforma de quejas comunitarias permite a los residentes informar y
                    realizar un seguimiento de los problemas en sus vecindarios. Trabajamos en
                    estrecha colaboración con las autoridades locales para garantizar que se aborden
                    sus inquietudes.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link className="text-sm text-gray-500 hover:underline" href="#">
                    Leer más
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Cómo funciona</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    Presentar una queja es fácil. Simplemente proporcione detalles sobre el
                    problema, incluida su ubicación, y nuestra plataforma lo dirigirá a las
                    autoridades correspondientes.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link className="text-sm text-gray-500 hover:underline" href="#">
                    Leer más
                  </Link>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>FAQs</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-500 dark:text-gray-400">
                    Encuentre respuestas a preguntas comunes sobre nuestra plataforma y el proceso
                    de quejas.
                  </p>
                </CardContent>
                <CardFooter>
                  <Link className="text-sm text-gray-500 hover:underline" href="#">
                    Leer más
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="w-full  py-12  md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Únete al Movimiento por el Cambio
              </h2>
              <p className="max-w-[700px] text-gray-500 dark:text-gray-400 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Ayúdenos a construir una mejor comunidad informando problemas, compartiendo nuestra
                plataforma e involucrándose en iniciativas locales.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button size="icon" variant="ghost">
                <ShareIcon className="h-5 w-5" />
                <span className="sr-only">Share</span>
              </Button>
              <div className="flex gap-2">
                <Button size="icon" variant="ghost">
                  <TwitterIcon className="h-5 w-5" />
                  <span className="sr-only">Share on Twitter</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <FacebookIcon className="h-5 w-5" />
                  <span className="sr-only">Share on Facebook</span>
                </Button>
                <Button size="icon" variant="ghost">
                  <LinkedinIcon className="h-5 w-5" />
                  <span className="sr-only">Share on LinkedIn</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
