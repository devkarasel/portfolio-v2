import crypto from 'crypto'
import { cookies } from 'next/headers'

export function makeToken(password: string): string {
  return crypto.createHmac('sha256', 'dk-portfolio-secret').update(password).digest('hex')
}

export function validateToken(token: string | undefined): boolean {
  if (!token) return false
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123'
  return token === makeToken(adminPass)
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  return validateToken(token)
}
