import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import { saveMessage } from '@/lib/messages'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body
    if (!name || !email || !message)
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })

    // Save to MongoDB
    await saveMessage({ name, email, subject: subject || '(no subject)', message })

    // Send email notification
    const port = parseInt(process.env.SMTP_PORT || '587')
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port,
      secure: port === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'devkarasel@gmail.com',
      replyTo: email,
      subject: `[Portfolio] ${subject || 'New message'} — from ${name}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;background:#0D0D0F;color:#F0F0F0;padding:32px;border-radius:12px">
          <h2 style="color:#4ADE80;margin:0 0 24px">New Portfolio Message</h2>
          <p><strong>From:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}" style="color:#4ADE80">${email}</a></p>
          <p><strong>Subject:</strong> ${subject || '(none)'}</p>
          <hr style="border:none;border-top:1px solid #222226;margin:20px 0"/>
          <p style="white-space:pre-wrap;line-height:1.7">${message}</p>
        </div>
      `,
    })

    return NextResponse.json({ success: true })
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err)
    console.error('Contact error:', msg)
    return NextResponse.json({ error: msg }, { status: 500 })
  }
}