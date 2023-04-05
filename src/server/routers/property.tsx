import { router, publicProcedure } from '../trpc';
import { Prisma } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { string, z } from 'zod';
import { prisma } from '~/server/prisma';
import { property } from '~/validation/authVal';

//create a new property
export const proprtyRouter = router({
  create: publicProcedure.input(property).mutation(async ({ input }) => {
    const newProperty = await prisma.property.create({
      data: input,
    });
    return newProperty;
  }),

  //get all properties

  //get a single property
  getPropertyById: publicProcedure.input(property).query(async ({ input }) => {
    const { id } = input;

    if (!id) throw new TRPCError({ code: 'NOT_FOUND' });

    const property = await prisma.property.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });
    return property;
  }),

  //update a property
  update: publicProcedure
    .input(z.object({ id: string() }).merge(property))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;

      if (!id) throw new TRPCError({ code: 'NOT_FOUND' });

      const updatedProperty = await prisma.property.update({
        where: {
          id,
        },
        data,
      });
      return updatedProperty;
    }),
});
