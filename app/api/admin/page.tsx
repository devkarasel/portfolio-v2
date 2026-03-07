'use client'

import { useState, useEffect, useCallback } from 'react'

interface Message {
  id: string
  name: string
  email: string
  subject: string
  message: string
  receivedAt: string
  read: boolean
  replied: boolean
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async () => {
    setLoading(true)
    setError('')
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })
    if (res.ok) onLogin()
    else setError('Invalid password')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <p className="font-serif text-4xl text-text">Admin Panel</p>
          <p className="font-mono text-xs text-muted mt-2 tracking-widest">devrasel.me</p>
        </div>
        <div className="bg-surface border border-border rounded-2xl p-8">
          <label className="text-xs font-mono text-muted tracking-widest uppercase mb-2 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter admin password"
            className="form-field mb-4"
            autoFocus
          />
          {error && <p className="font-mono text-xs text-red-400 mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading || !password}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Login →'}
          </button>
        </div>
      </div>
    </div>
  )
}

function ReplyModal({ msg, onClose, onSent }: { msg: Message; onClose: () => void; onSent: () => void }) {
  const [body, setBody] = useState(`Hi ${msg.name},\n\nThank you for reaching out!\n\n\n\nBest regards,\nKhorshed Alam Rasel`)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  const send = async () => {
    setSending(true)
    setError('')
    const res = await fetch('/api/admin/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: msg.id, to: msg.email, subject: `Re: ${msg.subject}`, body }),
    })
    if (res.ok) { onSent(); onClose() }
    else setError('Failed to send reply')
    setSending(false)
  }

  return (
    <div className="fixed inset-0 bg-bg/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-surface border border-border rounded-2xl w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <p className="font-sans font-medium text-text">Reply to {msg.name}</p>
          <button onClick={onClose} className="text-muted hover:text-text">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <p className="text-xs font-mono text-muted mb-3">To: {msg.email}</p>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          className="form-field resize-none mb-4 text-sm"
        />
        {error && <p className="text-xs font-mono text-red-400 mb-3">{error}</p>}
        <div className="flex gap-3">
          <button onClick={send} disabled={sending} className="btn-primary disabled:opacity-50">
            {sending ? 'Sending...' : 'Send Reply'}
          </button>
          <button onClick={onClose} className="btn-outline">Cancel</button>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)
  const [replying, setReplying] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'replied'>('all')

  useEffect(() => {
    fetch('/api/admin/messages')
      .then((r) => { if (r.ok) setAuthed(true) })
      .finally(() => setChecking(false))
  }, [])

  const loadMessages = useCallback(async () => {
    const res = await fetch('/api/admin/messages')
    if (res.ok) {
      const data = await res.json()
      setMessages(Array.isArray(data) ? data : data.messages || [])
    }
  }, [])

  useEffect(() => {
    if (authed) loadMessages()
  }, [authed, loadMessages])

  const handleLogin = () => { setAuthed(true) }

  const selectMessage = async (msg: Message) => {
    setSelected(msg)
    if (!msg.read) {
      await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: msg.id }),
      })
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, read: true } : m))
    }
  }

  const deleteMsg = async (id: string) => {
    await fetch('/api/admin/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setMessages((prev) => prev.filter((m) => m.id !== id))
    if (selected?.id === id) setSelected(null)
  }

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setAuthed(false)
    setMessages([])
    setSelected(null)
  }

  if (checking) return (
    <div className="min-h-screen bg-bg flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  )

  if (!authed) return <LoginScreen onLogin={handleLogin} />

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return !m.read
    if (filter === 'replied') return m.replied
    return true
  })
  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Header */}
      <header className="border-b border-border bg-surface/50 backdrop-blur-md px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <p className="font-serif text-lg">Admin Panel</p>
          {unreadCount > 0 && (
            <span className="tag-green text-[10px]">{unreadCount} new</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="text-xs font-mono text-muted hover:text-text transition-colors">← Portfolio</a>
          <button onClick={logout} className="text-xs font-mono text-muted hover:text-red-400 transition-colors">Logout</button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8 grid md:grid-cols-[320px_1fr] gap-6">
        {/* Sidebar */}
        <div className="bg-surface border border-border rounded-2xl overflow-hidden">
          {/* Filters */}
          <div className="flex border-b border-border">
            {(['all', 'unread', 'replied'] as const).map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`flex-1 text-xs font-mono py-3 transition-colors capitalize ${filter === f ? 'text-accent border-b-2 border-accent' : 'text-muted hover:text-text'}`}>
                {f}
              </button>
            ))}
          </div>

          {/* Message list */}
          <div className="divide-y divide-border">
            {filtered.length === 0 ? (
              <p className="text-center text-muted font-mono text-xs py-12">No messages</p>
            ) : (
              filtered.map((msg) => (
                <button key={msg.id} onClick={() => selectMessage(msg)}
                  className={`w-full text-left px-4 py-4 hover:bg-bg/50 transition-colors ${selected?.id === msg.id ? 'bg-bg/50 border-l-2 border-accent' : ''}`}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <span className={`text-sm font-sans truncate ${!msg.read ? 'text-text font-medium' : 'text-muted'}`}>
                      {msg.name}
                    </span>
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0 mt-1" />}
                  </div>
                  <p className="text-xs text-muted truncate">{msg.subject}</p>
                  <p className="text-xs font-mono text-subtle mt-1">
                    {new Date(msg.receivedAt).toLocaleDateString()}
                  </p>
                  {msg.replied && <span className="tag-green text-[10px] mt-1 inline-block">Replied</span>}
                </button>
              ))
            )}
          </div>

          {/* Stats */}
          <div className="border-t border-border px-4 py-3 flex justify-between">
            <span className="text-xs font-mono text-muted">{messages.length} total</span>
            <span className="text-xs font-mono text-muted">{messages.filter((m) => m.replied).length} replied</span>
          </div>
        </div>

        {/* Detail */}
        <div className="bg-surface border border-border rounded-2xl p-6">
          {!selected ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-20">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-border mb-4">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <p className="text-muted font-mono text-sm">Select a message to read</p>
            </div>
          ) : (
            <>
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h2 className="font-sans font-medium text-text text-lg">{selected.subject}</h2>
                  <p className="text-sm text-muted mt-1">
                    From <span className="text-text">{selected.name}</span>
                    {' · '}
                    <a href={`mailto:${selected.email}`} className="text-accent hover:underline">{selected.email}</a>
                  </p>
                  <p className="text-xs font-mono text-subtle mt-1">
                    {new Date(selected.receivedAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button onClick={() => setReplying(true)}
                    className="btn-primary text-xs py-2 px-4">Reply</button>
                  <button onClick={() => deleteMsg(selected.id)}
                    className="btn-outline text-xs py-2 px-4 hover:border-red-400 hover:text-red-400">Delete</button>
                </div>
              </div>
              <div className="divider mb-6" />
              <p className="text-muted font-sans font-light leading-relaxed whitespace-pre-wrap text-sm">
                {selected.message}
              </p>
            </>
          )}
        </div>
      </div>

      {replying && selected && (
        <ReplyModal
          msg={selected}
          onClose={() => setReplying(false)}
          onSent={() => {
            setMessages((prev) => prev.map((m) => m.id === selected.id ? { ...m, replied: true, read: true } : m))
            loadMessages()
          }}
        />
      )}
    </div>
  )
}