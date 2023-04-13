/* 
This will be the authentication router.
We will use this to handle all authentication related requests.
We will use Argon2 for password hashing.
USe prisma to store user data.
*/
import { z } from 'zod';
import { hash, verify } from 'argon2';
import { AppRouter } from './_app';
import { prisma } from '~/server/prisma';
import { router, publicProcedure } from '../trpc';
import { signUpSchema, loginSchema } from '~/validation/authVal';
import { initTRPC, TRPCError } from '@trpc/server';

// const t = initTRPC.context<IContext>().create();
// Create a new user
export const authRouter = router({
  signup: publicProcedure
    .input(signUpSchema)
    .mutation(async ({ input, ctx }: any) => {
      const { email, password } = input;

      const exists = await ctx.prisma.user.findFirst({
        where: { email },
      });

      if (exists) {
        throw new TRPCError({
          code: 'CONFLICT',
          message: 'User already exists.',
        });
      }
      //salt the password using argon2

      const hashedPassword = await hash(password);

      const result = await ctx.prisma.user.create({
        data: { email, password: hashedPassword },
      });

      return {
        status: 201,
        message: 'Account created successfully',
        result: result.email,
      };
    }),
});
