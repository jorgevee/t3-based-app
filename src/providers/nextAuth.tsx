// Providers for next auth. We will only use credentials provider.
// Compare this snippet from src\pages\api\auth\[...nextauth].ts:
import { prisma } from '~/server/prisma';
import NextAuth, { type NextAuthOptions } from 'next-auth/next';
import Credentials from 'next-auth/providers/credentials';
import { loginSchema } from '~/validation/authVal';
import { verify } from 'argon2';

const nextAuthUrl = process.env.NEXTAUTH_URL;

export const providers: NextAuthOptions = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text', placeholder: 'Email' },
        password: { label: 'password', type: 'password' },
      },
      async authorize(credentials) {
        const { email, password } = loginSchema.parse(credentials);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('No user found');
        const valid = await verify(user.password, password);
        if (!valid) throw new Error('Invalid password');
        return user;
      },
    }),
  ],
  secret: process.env.JWT_SECRET,

  session: {
    jwt: true,
  },
  callbacks: {
    authorized({ req, token }) {
      if (token) {
        return true;
      }
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: 'auth/login',
  },
};

// export default (req, res) => NextAuth(req, res, authProviders);
