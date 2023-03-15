// middleware.ts
import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ['/', '/dashboard/*'];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);
  const res = NextResponse.next();
  if (isPathProtected) {
    const token = await getToken({ req });
    if (!token) {
      const url = new URL(`/auth/login`, req.url);
      url.searchParams.set('callbackUrl', pathname);
      return NextResponse.redirect(url);
    }
  }
  return res;
}
export const config = {
  matcher: '/dashboard/:path*',
};
