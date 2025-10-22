import { createClient } from './supabase/server'
import { Tenant } from './database.types'

export interface TenantContext {
  tenant: Tenant | null
  subdomain: string | null
  isMainDomain: boolean
}

/**
 * Extract subdomain from host header
 */
export function extractSubdomain(host: string): string | null {
  // Remove port if present
  const hostname = host.split(':')[0]
  
  // Handle localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return null
  }
  
  // Split by dots
  const parts = hostname.split('.')
  
  // If we have at least 3 parts (subdomain.domain.tld), return the subdomain
  if (parts.length >= 3) {
    return parts[0]
  }
  
  return null
}

/**
 * Check if the current request is for the main domain (no subdomain)
 */
export function isMainDomain(host: string): boolean {
  const subdomain = extractSubdomain(host)
  return subdomain === null
}

/**
 * Resolve tenant from subdomain
 */
export async function resolveTenant(subdomain: string): Promise<Tenant | null> {
  if (!subdomain) return null
  
  const supabase = await createClient()
  
  const { data: tenant, error } = await supabase
    .from('tenants')
    .select('*')
    .eq('subdomain', subdomain)
    .single()
  
  if (error) {
    console.error('Error resolving tenant:', error)
    return null
  }
  
  return tenant
}

/**
 * Get tenant context from request headers
 */
export async function getTenantContext(host: string): Promise<TenantContext> {
  const subdomain = extractSubdomain(host)
  const isMainDomainFlag = isMainDomain(host)
  
  let tenant: Tenant | null = null
  
  if (subdomain) {
    tenant = await resolveTenant(subdomain)
  }
  
  return {
    tenant,
    subdomain,
    isMainDomain: isMainDomainFlag
  }
}

/**
 * Validate subdomain format
 */
export function isValidSubdomain(subdomain: string): boolean {
  // Subdomain should be 3-63 characters, alphanumeric and hyphens only
  // Cannot start or end with hyphen
  const regex = /^[a-z0-9]([a-z0-9-]{1,61}[a-z0-9])?$/
  return regex.test(subdomain) && subdomain.length >= 3 && subdomain.length <= 63
}

/**
 * Sanitize subdomain input
 */
export function sanitizeSubdomain(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '')
    .replace(/^-+|-+$/g, '')
}
