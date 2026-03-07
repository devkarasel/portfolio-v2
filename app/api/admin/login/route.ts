import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { makeToken } from '@/lib/auth'

export async function POST(req: NextRequest) {
  const { password } = await req.json()
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123'

  if (password !== adminPass) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 })
  }

  const token = makeToken(adminPass)
  const cookieStore = await cookies()
  cookieStore.set('admin_token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 60 * 60 * 24,
    path: '/',
  })

  return NextResponse.json({ success: true })
}

export async function DELETE() {
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
  return NextResponse.json({ success: true })
}
