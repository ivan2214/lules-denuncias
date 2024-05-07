import {faker} from "@faker-js/faker";

import {prisma} from "../src/lib/prisma";

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

  await prisma.category.createMany({
    data: categoriesData.map((name) => ({name})),
  });

  const categories = await prisma.category.findMany();

  // Usuarios
  const usersData = userNames.map((name) => ({
    username: name.toLowerCase(),
    email: `${name.toLowerCase()}@example.com`,
    password: "123",
  }));

  await prisma.user.createMany({data: usersData});

  const users = await prisma.user.findMany();

  // Títulos y descripciones realistas de quejas
  const complaintsData = [
    {
      title: "Baches peligrosos en la calle principal",
      description:
        "La calle principal tiene baches peligrosos que necesitan ser reparados urgentemente.",
      hasLocation: true,
    },
    {
      title: "Falta de iluminación en el parque central",
      description:
        "Falta de iluminación en el parque central, lo que lo hace inseguro por la noche.",
      hasLocation: true,
    },
    {
      title: "Acumulación de basura en las calles",
      description: "Basura acumulada en las calles, atrayendo insectos y roedores.",
      hasLocation: true,
    },
    {
      title: "Semáforos fuera de servicio",
      description:
        "Los semáforos en la intersección están fuera de servicio, causando congestionamiento de tráfico.",
      hasLocation: false,
    },
    {
      title: "Contaminación del río cercano",
      description:
        "El río cercano está contaminado, afectando la vida silvestre y la calidad del agua potable.",
      hasLocation: true,
    },
    {
      title: "Fugas de agua en la red de distribución",
      description:
        "Fugas de agua detectadas en la red de distribución, causando desperdicio y pérdida de presión en el suministro.",
      hasLocation: true,
    },
    {
      title: "Contaminación acústica en el centro urbano",
      description:
        "Altos niveles de contaminación acústica en el centro urbano, afectando la calidad de vida de los residentes.",
      hasLocation: false,
    },
    {
      title: "Inseguridad en el transporte público",
      description:
        "Incremento de actos delictivos en el transporte público, generando temor entre los usuarios.",
      hasLocation: false,
    },
    {
      title: "Deficiencia en la recolección de residuos",
      description:
        "Deficiencia en el servicio de recolección de residuos, resultando en contenedores desbordados y malos olores.",
      hasLocation: true,
    },
    {
      title: "Falta de mantenimiento en parques y plazas",
      description:
        "Falta de mantenimiento en parques y plazas, reduciendo su atractivo y utilidad para la comunidad.",
      hasLocation: true,
    },
  ];

  // Quejas y comentarios
  for (const complaintData of complaintsData) {
    const complaint = await prisma.complaint.create({
      data: {
        title: complaintData.title,
        description: complaintData.description,
        images: `https://picsum.photos/seed/${Math.random().toString()}/300`, // Imagen aleatoria
        priority: Math.floor(Math.random() * 10) + 1,
        userId: users[Math.floor(Math.random() * users.length)].id,
        categories: {
          connect: {
            id: categories[Math.floor(Math.random() * categories.length)].id,
          },
        },
        Location: complaintData.hasLocation
          ? {
              create: {
                latitude: Math.random() * (180 - -180) - 180, // Latitud aleatoria
                longitude: Math.random() * (180 - -180) - 180, // Longitud aleatoria
              },
            }
          : undefined,
      },
    });

    // Comentarios realistas
    for (let i = 0; i < 3; i++) {
      await prisma.comment.create({
        data: {
          text: `Este es un comentario realista de ejemplo sobre la queja "${complaintData.title}".`,
          authorId: users[Math.floor(Math.random() * users.length)].id,
          complaintId: complaint.id,
        },
      });
    }
  }
};
