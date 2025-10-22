import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, full_name, tenant_id } = body

    // Validate input
    if (!email || !password || !tenant_id) {
      return NextResponse.json(
        { error: 'Email, password, and tenant_id are required' },
        { status: 400 }
      )
    }

    const supabase = await createClient()

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name,
          tenant_id,
        },
      },
    })

    if (authError) {
      console.error('Error creating user:', authError)
      return NextResponse.json(
        { error: authError.message },
        { status: 400 }
      )
    }

    if (!authData.user) {
      return NextResponse.json(
        { error: 'Failed to create user' },
        { status: 500 }
      )
    }

    // Simplified for now - will implement proper user record creation later
    return NextResponse.json(
      { 
        user: authData.user,
        message: 'User created successfully. Please check your email to verify your account.'
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error in POST /api/auth/register:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
