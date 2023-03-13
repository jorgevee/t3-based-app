import { publicProcedure, router } from '../trpc';
import { user, name } from '~/validation/authVal';
import { prisma } from '~/server/prisma';
import { Prisma } from '@prisma/client';
const defaultUser = Prisma.validator<Prisma.UserArgs>()({
  select: {
    id: true,
    email: true,
    name: true,
  },
});

export const userRouter = router({
  greeting: publicProcedure.input(name).query(async ({ input }) => {
    return `Hello ${input.name}`;
  }),
  //create route to create a user
  getAll: publicProcedure.query(async () => {
    const users = await prisma.user.findMany({
      select: defaultUser.select,
    });
    return users;
  }),
  byID: publicProcedure.input(user).query(async ({ input }) => {
    const user = await prisma.user.findUnique({
      where: {
        id: input.id,
      },
      select: defaultUser.select,
    });
    return user;
  }),
});
