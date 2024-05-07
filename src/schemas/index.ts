import * as z from "zod";

export const CreateComplainSchema = z.object({
  userId: z.number().optional(),
  title: z.string(),
  description: z.string(),
  categories: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .optional(),
  images: z
    .array(
      z.object({
        url: z.string(),
      }),
    )
    .max(3)
    .optional(),
  latitude: z.number(),
  longitude: z.number(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});
