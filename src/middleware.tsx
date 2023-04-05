// pages/api/middleware.ts

import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;
  const protectedPaths = ['/dashboard', '/property'];
  const isPathProtected = protectedPaths?.some((path) => pathname == path);

  if (isPathProtected) {
    const token = await req.cookies.get('next-auth.session-token');
    if (!token) {
      const url = new URL('/auth/login', req.url);
      url.searchParams.set('callbackUrl', pathname);

      return NextResponse.redirect(url);
    }
  }

  const res = NextResponse.next();

  return res;
}
