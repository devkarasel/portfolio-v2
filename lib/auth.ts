import crypto from 'crypto'

export function makeToken(password: string): string {
  return crypto.createHmac('sha256', 'dk-portfolio-secret').update(password).digest('hex')
}

export function validateToken(token: string | undefined): boolean {
  if (!token) return false
  const adminPass = process.env.ADMIN_PASSWORD || 'admin123'
  return token === makeToken(adminPass)
}

export async function isAuthenticated(req?: Request): Promise<boolean> {
  // Check Authorization header first (client sends this)
  if (req) {
    const auth = req.headers.get('Authorization')
    if (auth?.startsWith('Bearer ')) {
      return validateToken(auth.slice(7))
    }
  }
  // Fallback: check cookie
  try {
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')?.value
    return validateToken(token)
  } catch {
    return false
  }
}