import fs from 'fs'
import path from 'path'

export interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  receivedAt: string
  read: boolean
  replied: boolean
}

const DATA_DIR = path.join(process.cwd(), 'data')
const MESSAGES_FILE = path.join(DATA_DIR, 'messages.json')

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
  if (!fs.existsSync(MESSAGES_FILE)) fs.writeFileSync(MESSAGES_FILE, '[]', 'utf-8')
}

export function getMessages(): Message[] {
  ensureDataDir()
  const raw = fs.readFileSync(MESSAGES_FILE, 'utf-8')
  return JSON.parse(raw) as Message[]
}

export function saveMessage(msg: Omit<Message, 'id' | 'receivedAt' | 'read' | 'replied'>): Message {
  ensureDataDir()
  const messages = getMessages()
  const newMsg: Message = {
    ...msg,
    id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
    receivedAt: new Date().toISOString(),
    read: false,
    replied: false,
  }
  messages.unshift(newMsg)
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2))
  return newMsg
}

export function markRead(id: string): void {
  ensureDataDir()
  const messages = getMessages()
  const idx = messages.findIndex((m) => m.id === id)
  if (idx !== -1) {
    messages[idx].read = true
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2))
  }
}

export function markReplied(id: string): void {
  ensureDataDir()
  const messages = getMessages()
  const idx = messages.findIndex((m) => m.id === id)
  if (idx !== -1) {
    messages[idx].replied = true
    messages[idx].read = true
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2))
  }
}

export function deleteMessage(id: string): void {
  ensureDataDir()
  const messages = getMessages().filter((m) => m.id !== id)
  fs.writeFileSync(MESSAGES_FILE, JSON.stringify(messages, null, 2))
}
