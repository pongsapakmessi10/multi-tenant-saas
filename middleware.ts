import { NextResponse, type NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') || ''

  // Simple subdomain detection
  const isLocalhost = host.includes('localhost') || host.includes('127.0.0.1')
  const isVercelDomain = host.includes('.vercel.app')
  
  // Extract subdomain
  let subdomain = null
  if (!isLocalhost && !isVercelDomain) {
    const parts = host.split('.')
    if (parts.length >= 3) {
      subdomain = parts[0]
    }
  } else if (isLocalhost) {
    const parts = host.split('.')
    if (parts.length >= 2 && parts[1] === 'localhost') {
      subdomain = parts[0]
    }
  }

  // Handle subdomain routes
  if (subdomain && subdomain !== 'www') {
    // Redirect subdomain root to tenant page
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/tenant', request.url))
    }
    
    // Allow tenant routes
    if (pathname.startsWith('/tenant') || pathname.startsWith('/api')) {
      return NextResponse.next()
    }
    
    // Redirect other subdomain routes to tenant page
    return NextResponse.redirect(new URL('/tenant', request.url))
  }

  // Handle main domain routes
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname === '/' ||
    pathname.startsWith('/register') ||
    pathname.startsWith('/admin') ||
    pathname.startsWith('/tenant-not-found')
  ) {
    return NextResponse.next()
  }

  // Redirect other routes to home
  return NextResponse.redirect(new URL('/', request.url))
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
