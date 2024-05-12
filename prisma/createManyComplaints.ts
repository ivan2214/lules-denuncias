import {faker} from "@faker-js/faker";
import {type Complaint, StatusComplaint, type User, type Category} from "@prisma/client";

import {db} from "../src/lib/db";

export const createManyComplaints = async (users: User[], categories: Category[]) => {
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
  for (const complaintData of complaintsData) {
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

    // Comentarios
    const randomComments = faker.number.int({min: 0, max: 20});

    for (let i = 0; i < randomComments; i++) {
      const anonymousComment = faker.datatype.boolean();
      const userCommentId = users[Math.floor(Math.random() * users.length)].id;

      if (anonymousComment && complaint?.id) {
        await db.comment.create({
          data: {
            text: faker.lorem.paragraphs(3),
            anonymous: anonymousComment,
            complaintId: complaint?.id,
            likes: faker.number.int({min: 0, max: 55}),
          },
        });
      }

      if (!anonymousComment && complaint?.id) {
        await db.comment.create({
          data: {
            text: faker.lorem.paragraphs(3),
            authorId: userCommentId,
            complaintId: complaint?.id,
            likes: faker.number.int({min: 0, max: 55}),
          },
        });
      }

      console.log(`Comentario ${i.toString()}/${randomComments.toString()}`);
      console.log("*-------------------------------------------*");
    }

    // Votos
    const randomVotes = faker.number.int({min: 0, max: 55}); // Número aleatorio de votos
    const userIds = users.map((user) => user.id); // Array de todos los IDs de usuarios
    const usersWithVotes = new Set(); // Conjunto para almacenar IDs de usuarios que ya han votado

    for (let i = 0; i < randomVotes; i++) {
      // Escoger un ID de usuario aleatorio
      const userId = userIds[Math.floor(Math.random() * userIds.length)];

      // Verificar si este usuario ya ha votado
      if (!usersWithVotes.has(userId) && complaint?.id) {
        // Agregar el usuario al conjunto de usuarios que han votado
        usersWithVotes.add(userId);

        // Crear el voto
        await db.vote.create({
          data: {
            userId: userId,
            complaintId: complaint?.id,
          },
        });
      }

      console.log(`Voto ${i.toString()}/${randomVotes.toString()}`);
      console.log("*-------------------------------------------*");
    }
    // Contar los votos recibidos por la queja
    const votesCount = await db.vote.count({
      where: {
        complaintId: complaint?.id,
      },
    });

    // Actualizar la prioridad de la queja en función de los votos recibidos
    await db.complaint.update({
      where: {
        id: complaint?.id,
      },
      data: {
        priority: votesCount,
      },
    });
  }
};
