import {faker} from "@faker-js/faker";
import {type Complaint, StatusComplaint, type User, type Category} from "@prisma/client";

import {db} from "../src/lib/db";

export const createManyComplaints = async (users: User[], categories: Category[]) => {
  const complaintIds: number[] = [];
  // Títulos y descripciones realistas de quejas
  const complaintsData = [
    {
      title: "Baches peligrosos en la calle principal",
      description:
        "La calle principal tiene baches peligrosos que necesitan ser reparados urgentemente.",
    },
    {
      title: "Falta de iluminación en el parque central",
      description:
        "Falta de iluminación en el parque central, lo que lo hace inseguro por la noche.",
    },
    {
      title: "Acumulación de basura en las calles",
      description: "Basura acumulada en las calles, atrayendo insectos y roedores.",
    },
    {
      title: "Semáforos fuera de servicio",
      description:
        "Los semáforos en la intersección están fuera de servicio, causando congestionamiento de tráfico.",
    },
    {
      title: "Contaminación del río cercano",
      description:
        "El río cercano está contaminado, afectando la vida silvestre y la calidad del agua potable.",
    },
    {
      title: "Fugas de agua en la red de distribución",
      description:
        "Fugas de agua detectadas en la red de distribución, causando desperdicio y pérdida de presión en el suministro.",
    },
    {
      title: "Contaminación acústica en el centro urbano",
      description:
        "Altos niveles de contaminación acústica en el centro urbano, afectando la calidad de vida de los residentes.",
    },
    {
      title: "Inseguridad en el transporte público",
      description:
        "Incremento de actos delictivos en el transporte público, generando temor entre los usuarios.",
    },
    {
      title: "Deficiencia en la recolección de residuos",
      description:
        "Deficiencia en el servicio de recolección de residuos, resultando en contenedores desbordados y malos olores.",
    },
    {
      title: "Falta de mantenimiento en parques y plazas",
      description:
        "Falta de mantenimiento en parques y plazas, reduciendo su atractivo y utilidad para la comunidad.",
    },
    {
      title: "Problemas de estacionamiento en el centro comercial",
      description:
        "El centro comercial carece de suficientes espacios de estacionamiento, lo que dificulta encontrar un lugar para estacionar.",
    },
    {
      title: "Alumbrado público defectuoso en el vecindario",
      description:
        "Las luces de la calle en el vecindario están defectuosas, lo que aumenta la inseguridad durante la noche.",
    },
  ];

  // Quejas y comentarios
  for (let i = 0; i < complaintsData.length; i++) {
    const complaintData = complaintsData[i];
    const anonymousPost = faker.datatype.boolean();
    // Seleccionamos un conjunto aleatorio de categorías
    const randomCategories = faker.helpers
      .shuffle(categories)
      .slice(0, faker.number.int({min: 0, max: 3}));

    // Creamos un array de objetos de conexión para las categorías seleccionadas
    const complaintCategories = randomCategories.map((category) => {
      return {
        name: category.name,
      };
    });

    const images = faker.helpers.uniqueArray(() => {
      return {
        url: faker.image.urlPicsumPhotos(),
      };
    }, 3);

    const status = faker.helpers.enumValue(StatusComplaint);

    let complaint: Complaint | null = null;

    if (!anonymousPost) {
      complaint = await db.complaint.create({
        data: {
          title: complaintData.title,
          description: complaintData.description,
          isResolved: status === StatusComplaint.RESOLVED,
          priority: Math.floor(Math.random() * 5),
          status: status,
          images: {
            connectOrCreate: images.map((image) => {
              return {
                where: {
                  url: image.url,
                },
                create: {
                  url: image.url,
                },
              };
            }),
          },
          categories: {
            connectOrCreate: complaintCategories.map((category) => {
              return {
                where: {
                  name: category.name,
                },
                create: {
                  name: category.name,
                },
              };
            }),
          },
          user: {
            connect: {
              id: users[Math.floor(Math.random() * users.length)].id,
            },
          },
          anonymous: false,
          address: faker.location.streetAddress(),
        },
      });
    }

    if (anonymousPost) {
      complaint = await db.complaint.create({
        data: {
          title: complaintData.title,
          description: complaintData.description,
          isResolved: status === StatusComplaint.RESOLVED,
          priority: Math.floor(Math.random() * 5),
          status: status,
          images: {
            connectOrCreate: images.map((image) => {
              return {
                where: {
                  url: image.url,
                },
                create: {
                  url: image.url,
                },
              };
            }),
          },
          categories: {
            connectOrCreate: complaintCategories.map((category) => {
              return {
                where: {
                  name: category.name,
                },
                create: {
                  name: category.name,
                },
              };
            }),
          },
          anonymous: true,
          address: faker.location.streetAddress(),
        },
      });
    }

    if (complaint) {
      complaintIds.push(complaint.id);
    }

    console.log(`Queja ${i.toString()}/${complaintsData.length.toString()}`);
    console.log("*-------------------------------------------*");
  }

  return complaintIds; // Devolvemos todos los IDs de las quejas creadas
};
