/**
 * This file contains the root router of your tRPC-backend
 */
import { publicProcedure, router } from '../trpc';
import { postRouter } from './post';
import { authRouter } from './auth';
import { userRouter } from './user';
import { proprtyRouter } from './property';

export const appRouter = router({
  healthcheck: publicProcedure.query(() => 'yay!'),

  post: postRouter,
  auth: authRouter,
  user: userRouter,
  proprty: proprtyRouter,
});

export type AppRouter = typeof appRouter;
