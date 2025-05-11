import { z } from 'zod';

export const userLoginSchema = z.object({
  identifier: z.string().min(1),
  password: z.string().min(1),
});

export type UserLoginValues = z.infer<typeof userLoginSchema>;

export const userRegisterSchema = z.object({
  email: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

export type UserRegisterValues = z.infer<typeof userRegisterSchema>;

export const articleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  cover_image_url: z.string(),
  category: z.string().min(1),
});

export type ArticleValues = z.infer<typeof articleSchema>;

export const categoriesSchema = z.object({
  name: z.string().min(1),
});

export type CategoriesValues = z.infer<typeof categoriesSchema>;

export const commentsSchema = z.object({
  content: z.string().min(1),
});

export type CommentsValues = z.infer<typeof commentsSchema>;
