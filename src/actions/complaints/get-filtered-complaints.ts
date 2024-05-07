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

export interface ComplaintExtends extends Complaint {
  user: User;
  location?: Location | null;
  comments: Comment[];
  votes: Vote[];
  categories: Category[];
  images: Image[];
}

export const getFilteredComplaints = async (
  query?: QueryProps,
): Promise<{complaints: ComplaintExtends[] | []}> => {
  try {
    const {category, minPriority, maxPriority, latitude, longitude, keyword} = query ?? {};

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
        comments: true,
        images: true,
        location: true,
        votes: true,
      },
    });

    return {complaints};
  } catch (error) {
    console.error("Error al obtener las quejas filtradas:", error);

    return {complaints: []};
  }
};
