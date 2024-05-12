import {type Category} from "@prisma/client";

import {db} from "../src/lib/db";

export const createManyCategories = async (): Promise<Category[]> => {
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

  return categories;
};
