import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from '@/lib/auth'
import { getMessages, markRead, deleteMessage } from '@/lib/messages'

export async function GET() {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const messages = getMessages()
  return NextResponse.json({ messages })
}

export async function PATCH(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await req.json()
  markRead(id)
  return NextResponse.json({ success: true })
}

export async function DELETE(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const { id } = await req.json()
  deleteMessage(id)
  return NextResponse.json({ success: true })
}
