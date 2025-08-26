import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  const token = request.cookies.get('Authentication')?.value
  console.log('token:' + token);

  const isProtectedRoute = pathname.startsWith('/admin')

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return NextResponse.next()
}


// Chạy middleware cho tất cả /admin/*
export const config = {
  matcher: ['/admin/:path*'],
}
