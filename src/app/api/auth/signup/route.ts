import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const { email, password, name } = await request.json()

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Create user in our database
    if (data.user) {
      await prisma.user.create({
        data: {
          id: data.user.id,
          email: data.user.email!,
          name,
        },
      })
    }

    return NextResponse.json({ user: data.user, session: data.session })
  } catch (error) {
    console.error('Error signing up:', error)
    return NextResponse.json({ error: 'Failed to sign up' }, { status: 500 })
  }
}
