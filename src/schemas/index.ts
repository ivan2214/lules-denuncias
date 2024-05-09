import * as z from "zod";

export const CreateComplainSchema = z.object({
  userId: z.coerce.number().optional(),
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

export const CreateCommentSchema = z.object({
  text: z.string().min(1).max(500, {
    message: "El texto del comentario no puede superar los 500 caracteres",
  }),
  authorId: z.coerce.number().optional(),
  complaintId: z.coerce.number().min(1),
});

export const CommentActionSchema = z.object({
  commentId: z.coerce.number().min(1),
  action: z.enum(["like", "unlike"]),
  authorId: z.coerce.number().optional(),
  complaintId: z.coerce.number().min(1),
});
