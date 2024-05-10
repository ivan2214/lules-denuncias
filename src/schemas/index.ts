import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email({message: "Email is required"}),
  password: z.string().min(1, {message: "Password is required"}),
});

export const RegisterSchema = z.object({
  email: z.string().email({message: "Email is required"}),
  password: z.string().min(6, {message: "Password must be at least 6 characters"}),
  name: z.string().min(1, {message: "Name is required"}),
});

export const CreateComplainSchema = z.object({
  userId: z.coerce.string().optional(),
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
  address: z.string().optional(),
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
