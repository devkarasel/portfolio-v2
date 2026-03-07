import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { validateToken } from '../login/route'
import { getMessages, markRead, deleteMessage } from '@/lib/messages'

async function auth() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  return validateToken(token)
}

export async function GET() {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const messages = getMessages()
  return NextResponse.json({ messages })
}

export async function PATCH(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  markRead(id)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  if (!(await auth())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  deleteMessage(id)
  return NextResponse.json({ success: true })
}
