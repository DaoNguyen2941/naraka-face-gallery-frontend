import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret'
const encoder = new TextEncoder()
const secretKey = encoder.encode(JWT_SECRET)

const PUBLIC_PATHS = ['/login']

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const token = request.cookies.get('Authentication')?.value

  // Public paths
  if (PUBLIC_PATHS.includes(pathname)) {
    if (token) {
      try {
        await jwtVerify(token, secretKey)
        // Nếu đã login, redirect vào dashboard admin
        if (pathname === '/login') {
          return NextResponse.redirect(new URL('/admin', request.url))
        }
      } catch {
        // Token invalid / expired → xóa cookie
        const response = NextResponse.next()
        response.cookies.delete('Authentication')
        return response
      }
    }
    return NextResponse.next()
  }

  // Admin routes
  if (pathname.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    try {
      await jwtVerify(token, secretKey)
    } catch {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
}
