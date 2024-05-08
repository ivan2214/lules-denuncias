import * as z from "zod";

export const CreateComplainSchema = z.object({
  title: z.string(),
  description: z.string(),
  categoriesNames: z
    .array(
      z.object({
        name: z.string(),
      }),
    )
    .optional(),
  images: z.object({url: z.string()}).array().optional(),
  latitude: z.coerce.number(),
  longitude: z.coerce.number(),
  address: z.string().optional(),
  city: z.string().optional(),
  country: z.string().optional(),
});

export const UpdateComplainSchema = CreateComplainSchema.partial();
