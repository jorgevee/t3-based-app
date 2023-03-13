// sign in and sign up validation using trpc

import * as z from 'zod';

//create calidate properties for login and signup
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const name = z.object({
  name: z.string(),
});

export const signUpSchema = loginSchema.extend({});

export type ILogin = z.infer<typeof loginSchema>;
export type ISignUp = z.infer<typeof signUpSchema>;

export const user = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});