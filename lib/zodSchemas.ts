import { z } from "zod";

export const BlogCreationSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  content: z.string().min(1, { message: "Content is required" }),
  imageUrl: z.string().url({ message: "Invalid image URL" }),
});

export type BlogCreationSchemaType = z.infer<typeof BlogCreationSchema>;
