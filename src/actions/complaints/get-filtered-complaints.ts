import {
  type Comment,
  type Category,
  type Complaint,
  type User,
  type Vote,
  type Location,
  type Image,
} from "@prisma/client";

import {db} from "@/lib/db";

interface QueryProps {
  category?: string;
  minPriority?: string;
  maxPriority?: string;
  latitude?: string;
  longitude?: string;
  keyword?: string;
  sortBy?: "date" | "priority" | "votes";
  sortOrder?: "asc" | "desc";
}

interface LocationFilter {
  latitude: {
    lte: number;
    gte: number;
  };
  longitude: {
    lte: number;
    gte: number;
  };
}

interface WhereClause {
  categories?: {
    some: {
      name: string;
    };
  };
  priority?: {
    gte?: number;
    lte?: number;
  };
  location?: LocationFilter;
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
  author: User;
}

export interface ComplaintExtends extends Complaint {
  user: User;
  location?: Location | null;
  comments: CommentExtends[];
  votes: Vote[];
  categories: Category[];
  images: Image[];
}

export const getFilteredComplaints = async (
  query?: QueryProps,
): Promise<{complaints: ComplaintExtends[] | []}> => {
  try {
    const {category, minPriority, maxPriority, latitude, longitude, keyword, sortBy, sortOrder} =
      query ?? {};

    const where: WhereClause = {};

    if (category) {
      where.categories = {some: {name: category}};
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

    if (latitude && longitude) {
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
        categories: true,
        comments: {
          include: {
            author: true,
          },
        },
        images: true,
        location: true,
        votes: true,
      },
      orderBy,
    });

    return {complaints};
  } catch (error) {
    console.error("Error al obtener las quejas filtradas:", error);

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
