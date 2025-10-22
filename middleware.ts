import { NextResponse, type NextRequest } from 'next/server'
import { updateSession } from './lib/supabase/middleware'
import { getTenantContext } from './lib/tenant'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const host = request.headers.get('host') || ''

  // Get tenant context
  const tenantContext = await getTenantContext(host)

  // Handle main domain routes
  if (tenantContext.isMainDomain) {
    // Allow access to public routes and API routes
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

  // Handle subdomain routes
  if (tenantContext.subdomain) {
    if (!tenantContext.tenant) {
      // Subdomain exists but tenant not found
      return NextResponse.redirect(new URL('/tenant-not-found', request.url))
    }
    
    // Redirect subdomain root to tenant page
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/tenant', request.url))
    }
  }

  // Set tenant context in headers for API routes
  if (pathname.startsWith('/api')) {
    const response = NextResponse.next()
    if (tenantContext.tenant) {
      response.headers.set('x-tenant-id', tenantContext.tenant.id)
      response.headers.set('x-tenant-subdomain', tenantContext.tenant.subdomain)
    }
    return response
  }

  // For tenant-specific routes, add tenant info to headers
  const response = NextResponse.next()
  if (tenantContext.tenant) {
    response.headers.set('x-tenant-id', tenantContext.tenant.id)
    response.headers.set('x-tenant-subdomain', tenantContext.tenant.subdomain)
    response.headers.set('x-tenant-name', tenantContext.tenant.name)
    response.headers.set('x-tenant-color', tenantContext.tenant.primary_color || '#3b82f6')
  }

  // Update Supabase session
  return updateSession(request)
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
