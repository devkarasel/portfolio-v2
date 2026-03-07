import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { isAuthenticated } from '@/lib/auth'
import { markReplied } from '@/lib/messages'

export async function POST(req: NextRequest) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { messageId, to, toName, subject, body } = await req.json()

  if (!to || !body) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_PASS) {
    return NextResponse.json(
      { error: 'SMTP not configured. Add SMTP_HOST and SMTP_PASS to your environment variables.' },
      { status: 503 }
    )
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '465'),
      secure: parseInt(process.env.SMTP_PORT || '465') === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"devkarasel" <${process.env.SMTP_USER}>`,
      to: `${toName} <${to}>`,
      subject: subject || `Re: Your message`,
      html: `<div style="font-family:sans-serif;max-width:600px;line-height:1.6">
        ${body.replace(/\n/g, '<br/>')}
        <br/><br/>
        <hr style="border:none;border-top:1px solid #eee;margin:24px 0"/>
        <p style="color:#999;font-size:12px">devkarasel · devrasel.me</p>
      </div>`,
    })

    markReplied(messageId)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Reply error:', err)
    return NextResponse.json({ error: 'Failed to send reply' }, { status: 500 })
  }
}
