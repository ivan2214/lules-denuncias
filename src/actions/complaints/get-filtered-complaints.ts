import {
  type Comment,
  type Category,
  type Complaint,
  type User,
  type Vote,
  type Image,
  type StatusComplaint,
  type CategoriesOnComplaint,
  type Prisma,
} from "@prisma/client";

import {db} from "@/lib/db";

export interface QueryProps {
  categories?: string;
  minPriority?: string;
  maxPriority?: string;
  latitude?: string;
  longitude?: string;
  keyword?: string;
  sortBy?: "date" | "priority" | "votes";
  sortOrder?: "asc" | "desc";
  status?: StatusComplaint;
}

/* interface LocationFilter {
  latitude: {
    lte: number;
    gte: number;
  };
  longitude: {
    lte: number;
    gte: number;
  };
}
 */
interface WhereClause {
  categories?: {
    some: {
      Category: {
        name: {
          in: string[];
        };
      };
    };
  };
  priority?: {
    gte?: number;
    lte?: number;
  };
  /* location?: LocationFilter; */
  status?: {
    equals?: StatusComplaint;
  };
  OR?:
    | {
        title: {
          contains: string;
        };
      }[]
    | {
        description: {
          contains: string;
        };
      }[];
}

export interface CommentExtends extends Comment {
  author?: User | null;
}

export interface CategoriesOnComplaintExtends extends CategoriesOnComplaint {
  Category: Category;
  complaint?: Complaint | null;
}

export interface ComplaintExtends extends Complaint {
  user?: User | null;
  comments: CommentExtends[];
  votes: Vote[];
  categories: CategoriesOnComplaintExtends[];
  images: Image[];
}

export const getFilteredComplaints = async (
  query?: QueryProps,
): Promise<{complaints: ComplaintExtends[] | []}> => {
  try {
    const {
      categories,
      minPriority,
      maxPriority,
      latitude,
      longitude,
      keyword,
      sortBy,
      sortOrder,
      status,
    } = query ?? {};

    const where: Prisma.ComplaintFindManyArgs["where"] = {};

    console.log(categories);

    // Función para normalizar una cadena de texto (convertir a minúsculas y eliminar acentos)
    const normalizeString = (str: string): string => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    };

    // Parsea las categorías normalizando cada una
    const parseCategories = (categories?: string): string[] => {
      if (!categories) {
        return [];
      }

      return categories
        .split(",")
        .map((category) => normalizeString(category.trim()))
        .filter((category) => !!category);
    };

    if (categories) {
      const normalizedCategories = parseCategories(categories);

      where.categories = {
        some: {
          Category: {
            name: {
              mode: "insensitive",
              in: normalizedCategories,
            },
          },
        },
      };
    }

    if (minPriority && maxPriority) {
      where.priority = {
        gte: parseInt(minPriority),
        lte: parseInt(maxPriority),
      };
    } else if (minPriority) {
      where.priority = {gte: parseInt(minPriority)};
    } else if (maxPriority) {
      where.priority = {lte: parseInt(maxPriority)};
    }

    // Impllementar con mapas mas adelante
    /* if (latitude && longitude) {
      where.location = {
        latitude: {
          lte: parseFloat(latitude) + 0.1,
          gte: parseFloat(latitude) - 0.1,
        },
        longitude: {
          lte: parseFloat(longitude) + 0.1,
          gte: parseFloat(longitude) - 0.1,
        },
      };
    } */

    if (status) {
      where.status = {
        equals: status,
      };
    }

    const orderBy = getOrderBy(sortBy, sortOrder); // Función para obtener el orden según el criterio y la dirección

    const complaints = await db.complaint.findMany({
      where: {
        AND: [
          where,
          {
            OR: [{title: {contains: keyword ?? ""}}, {description: {contains: keyword ?? ""}}],
          },
        ],
      },
      include: {
        user: true,
        categories: {
          include: {
            Category: true,
          },
        },
        comments: {
          include: {
            author: true,
          },
        },
        images: true,
        votes: true,
      },
      orderBy,
    });

    return {complaints};
  } catch (error) {
    return {complaints: []};
  }
};

const getOrderBy = (sortBy?: "date" | "priority" | "votes", sortOrder?: "asc" | "desc") => {
  const order = sortOrder ?? "desc"; // Si no se especifica sortOrder, el valor por defecto es "desc"

  switch (sortBy) {
    case "date":
      return {createdAt: order}; // Ordenar por fecha de creación en la dirección especificada
    case "priority":
      return {priority: order}; // Ordenar por prioridad en la dirección especificada, y luego por fecha de creación
    case "votes":
      return {votes: {_count: order}}; // Ordenar por cantidad de votos en la dirección especificada, y luego por fecha de creación
    default:
      return {createdAt: order}; // Si no se especifica un criterio de ordenamiento, ordenar por fecha de creación en la dirección especificada
  }
};
