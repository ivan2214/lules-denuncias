import {type Category} from "@prisma/client";

import {db} from "../src/lib/db";

// Función para normalizar una cadena de texto (convertir a minúsculas, eliminar acentos y reemplazar espacios en blanco por guiones)
const normalizeString = (str: string): string => {
  return str
    .normalize("NFD") // Normaliza caracteres Unicode
    .replace(/[\u0300-\u036f]/g, "") // Elimina caracteres diacríticos
    .toLowerCase() // Convierte a minúsculas
    .replace(/\s+/g, "-"); // Reemplaza espacios en blanco con guiones
};

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

  // Normaliza los nombres de las categorías antes de guardarlas en la base de datos
  const normalizedCategoriesData = categoriesData.map((name) => ({
    name: normalizeString(name),
  }));

  await db.category.createMany({
    data: normalizedCategoriesData,
    skipDuplicates: true,
  });

  const categories = await db.category.findMany();

  return categories;
};
