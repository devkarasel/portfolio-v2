import { NextRequest, NextResponse } from 'next/server'
import { getMessages, markRead, deleteMessage } from '@/lib/messages'
import { isAuthenticated } from '@/lib/auth'

export async function GET(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const messages = await getMessages()
  return NextResponse.json(messages)
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await markRead(id)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { id } = await req.json()
  await deleteMessage(id)
  return NextResponse.json({ success: true })
}