/* eslint-disable @typescript-eslint/no-unused-vars */
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
//Update context for user auth
//We are importing the session from next-auth
import { unstable_getServerSession } from 'next-auth';
import { prisma } from './prisma';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface CreateContextOptions {
  // session: Session | null
}

/**
 * Inner function for `createContext` where we create the context.
 * This is useful for testing when we don't want to mock Next.js' request/response
 */
export async function createContextInner(_opts: CreateContextOptions) {
  return {};
}

export type Context = trpc.inferAsyncReturnType<typeof createContextInner>;

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */

//add error handling
export async function createContext(ctx: trpcNext.CreateNextContextOptions) {
  const session = await unstable_getServerSession(ctx.req);
  // console.log(session);
  return {
    ...ctx,
    req: {
      ...ctx.req,
      session,
    },
    prisma,
  };
}
