import NextAuth from 'next-auth/next';
import { providers } from '../../../providers/nextAuth';

export default NextAuth(providers);
