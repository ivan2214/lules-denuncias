import {faker} from "@faker-js/faker";
import {StatusComplaint} from "@prisma/client";

import {db} from "../src/lib/db";

export const createManyComplaints = async () => {
  // Usuarios

  const randomUsers = faker.number.int({min: 5, max: 10});

  for (let i = 0; i < randomUsers; i++) {
    await db.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: "123",
        image: faker.image.avatar(),
        reputation: faker.number.int({min: 0, max: 100}),
      },
    });
    console.log(`👤 Generando usuarios ${i.toString()}/${randomUsers.toString()}`);
    console.log("*-------------------------------------------*");
  }

  const users = await db.user.findMany();

  // Categorías
  const categoriesData = [
    "Infraestructura",
    "Servicios Públicos",
    "Seguridad",
    "Tráfico",
    "Medio Ambiente",
    "Transporte",
    "Vivienda",
    "Educación",
    "Salud",
    "Comercio",
    "Otro",
  ];

  await db.category.createMany({
    data: categoriesData.map((name) => ({name})),
    skipDuplicates: true,
  });

  const categories = await db.category.findMany();

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

  // Ubicaciones
  const randomLocations = faker.number.int({min: 2, max: 20});

  for (let i = 0; i < randomLocations; i++) {
    const latitude = faker.location.latitude();
    const longitude = faker.location.longitude();
    const address = faker.location.streetAddress();
    const city = faker.location.city();
    const country = faker.location.country();

    await db.location.create({
      data: {
        latitude,
        longitude,
        address,
        city,
        country,
      },
    });
    console.log(`📍 Generando ubicaciones ${i.toString()}/${randomLocations.toString()}`);
    console.log("*-------------------------------------------*");
  }

  const locations = await db.location.findMany();

  // Quejas y comentarios
  for (const complaintData of complaintsData) {
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
        categories: {
          connect: complaintCategories,
        },
      },
    });

    // Comentarios
    const randomComments = faker.number.int({min: 0, max: 20});

    for (let i = 0; i < randomComments; i++) {
      await db.comment.create({
        data: {
          text: faker.lorem.paragraphs(3),
          authorId: users[Math.floor(Math.random() * users.length)].id,
          complaintId: complaint.id,
        },
      });
    }

    // Votos
    const randomVotes = faker.number.int({min: 0, max: 10}); // Número aleatorio de votos
    const userIds = users.map((user) => user.id); // Array de todos los IDs de usuarios
    const usersWithVotes = new Set(); // Conjunto para almacenar IDs de usuarios que ya han votado

    for (let i = 0; i < randomVotes; i++) {
      // Escoger un ID de usuario aleatorio
      const userId = userIds[Math.floor(Math.random() * userIds.length)];

      // Verificar si este usuario ya ha votado
      if (!usersWithVotes.has(userId)) {
        // Agregar el usuario al conjunto de usuarios que han votado
        usersWithVotes.add(userId);

        // Crear el voto
        await db.vote.create({
          data: {
            userId: userId,
            complaintId: complaint.id,
          },
        });
      }
    }
    // Contar los votos recibidos por la queja
    const votesCount = await db.vote.count({
      where: {
        complaintId: complaint.id,
      },
    });

    // Actualizar la prioridad de la queja en función de los votos recibidos
    await db.complaint.update({
      where: {
        id: complaint.id,
      },
      data: {
        priority: votesCount,
      },
    });
  }
};
