import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sanitizeSubdomain, isValidSubdomain } from '@/lib/tenant'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, subdomain, primary_color } = body

    // Validate input
    if (!name || !subdomain) {
      return NextResponse.json(
        { error: 'Name and subdomain are required' },
        { status: 400 }
      )
    }

    // Sanitize and validate subdomain
    const sanitizedSubdomain = sanitizeSubdomain(subdomain)
    if (!isValidSubdomain(sanitizedSubdomain)) {
      return NextResponse.json(
        { error: 'Invalid subdomain format' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Check if subdomain already exists
    const { data: existingTenant } = await supabase
      .from('tenants')
      .select('id')
      .eq('subdomain', sanitizedSubdomain)
      .single()

    if (existingTenant) {
      return NextResponse.json(
        { error: 'Subdomain already exists' },
        { status: 409 }
      )
    }

    // Create tenant
    const { data: tenant, error } = await supabase
      .from('tenants')
      .insert({
        name,
        subdomain: sanitizedSubdomain,
        primary_color: primary_color || '#3b82f6',
      })
      .select()
      .single()

    if (error) {
      console.error('Error creating tenant:', error)
      return NextResponse.json(
        { error: 'Failed to create tenant' },
        { status: 500 }
      )
    }

    return NextResponse.json(tenant, { status: 201 })
  } catch (error) {
    console.error('Error in POST /api/tenants:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const subdomain = searchParams.get('subdomain')

    if (subdomain) {
      // Get specific tenant by subdomain
      const { data: tenant, error } = await supabase
        .from('tenants')
        .select('*')
        .eq('subdomain', subdomain)
        .single()

      if (error) {
        return NextResponse.json(
          { error: 'Tenant not found' },
          { status: 404 }
        )
      }

      return NextResponse.json(tenant)
    } else {
      // Get all tenants (for admin)
      const { data: tenants, error } = await supabase
        .from('tenants')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) {
        console.error('Error fetching tenants:', error)
        return NextResponse.json(
          { error: 'Failed to fetch tenants' },
          { status: 500 }
        )
      }

      return NextResponse.json(tenants)
    }
  } catch (error) {
    console.error('Error in GET /api/tenants:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
