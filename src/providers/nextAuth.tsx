// Providers for next auth. We will only use credentials provider.
// Compare this snippet from src\pages\api\auth\[...nextauth].ts:
import { prisma } from '~/server/prisma';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '~/validation/authVal';
import { verify } from 'argon2';
import { JWT } from 'next-auth/jwt';

export const providers: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'Email' },
        password: {
          label: 'password',
          type: 'password',
          placeholder: 'Password',
        },
      },
      async authorize(credentials) {
        const { email, password } = loginSchema.parse(credentials);
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          throw new Error('No user found');
        }

        const userPassword = user.password ?? ''; // Use empty string as default value
        const valid = await verify(userPassword, password);

        if (!valid) {
          throw new Error('Invalid password');
        }

        return user;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,

  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      try {
        // session.id = token.id;
        session.id = token.id as string;
      } catch (error) {
        console.error(error);
      }
      return session;
    },
  },

  pages: {
    signIn: 'auth/login',
  },
};

// export default (req, res) => NextAuth(req, res, authProviders);
declare module 'next-auth' {
  interface Session {
    id: string;
  }
}
