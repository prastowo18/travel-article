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
