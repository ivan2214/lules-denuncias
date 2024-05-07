import {fa, faker} from "@faker-js/faker";
import {StatusComplaint} from "@prisma/client";

import {db} from "../src/lib/db";

export const createManyComplaints = async () => {
  const userNames = faker.helpers.uniqueArray(() => faker.person.firstName(), 10);

  // Categorías
  const categoriesData = [
    "Infraestructura",
    "Servicios Públicos",
    "Seguridad",
    "Tráfico",
    "Medio Ambiente",
    "Transporte",
  ];

  await db.category.createMany({
    data: categoriesData.map((name) => ({name})),
  });

  const categories = await db.category.findMany();

  // Usuarios
  const usersData = userNames.map((name) => ({
    username: name.toLowerCase(),
    email: `${name.toLowerCase()}@example.com`,
    password: "123",
  }));

  await db.user.createMany({data: usersData});

  const users = await db.user.findMany();

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
  ];

  const locationsData = faker.helpers.uniqueArray(() => {
    return {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
    };
  }, 10);

  await db.location.createMany({
    data: locationsData,
    skipDuplicates: true,
  });

  const locations = await db.location.findMany();

  // Quejas y comentarios
  for (const complaintData of complaintsData) {
    const status = faker.helpers.enumValue(StatusComplaint);
    const complaint = await db.complaint.create({
      data: {
        title: complaintData.title,
        description: complaintData.description,
        isResolved: status === StatusComplaint.RESOLVED,
        priority: Math.floor(Math.random() * 5),
        status: status,
        images: {
          createMany: {
            data: faker.helpers.uniqueArray(() => {
              return {
                url: faker.image.urlPicsumPhotos(),
              };
            }, 3),
            skipDuplicates: true,
          },
        },
        user: {
          connect: {
            id: users[Math.floor(Math.random() * users.length)].id,
          },
        },
        categories: {
          connect: {
            id: categories[Math.floor(Math.random() * categories.length)].id,
          },
        },
        location: {
          connectOrCreate: {
            where: {
              id: locations[Math.floor(Math.random() * locations.length)].id,
            },
            create: {
              latitude: faker.location.latitude(),
              longitude: faker.location.longitude(),
              address: faker.location.streetAddress(),
              city: faker.location.city(),
              country: faker.location.country(),
            },
          },
        },
      },
    });

    // Comentarios realistas
    for (let i = 0; i < 3; i++) {
      await db.comment.create({
        data: {
          text: `Este es un comentario realista de ejemplo sobre la queja "${complaintData.title}".`,
          authorId: users[Math.floor(Math.random() * users.length)].id,
          complaintId: complaint.id,
        },
      });
    }
  }
};
