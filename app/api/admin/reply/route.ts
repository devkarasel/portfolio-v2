import { NextRequest, NextResponse } from 'next/server'
import { markReplied } from '@/lib/messages'
import { isAuthenticated } from '@/lib/auth'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  try {
    const { id, to, subject, body } = await req.json()

    const port = parseInt(process.env.SMTP_PORT || '587')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
    })

    await transporter.sendMail({
      from: `"Khorshed Alam Rasel" <${process.env.SMTP_USER}>`,
      to,
      subject: subject || 'Re: Your message',
      html: `<div style="font-family:sans-serif;line-height:1.7">${body.replace(/\n/g, '<br/>')}</div>`,
    })

    await markReplied(id)
    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}