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

// ── LOGIN SCREEN ──────────────────────────────────────────────
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
    if (res.ok) {
      onLogin()
    } else {
      setError('Invalid password')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-bg grid-bg flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-10">
          <span className="font-display text-5xl text-accent">DK.</span>
          <p className="font-mono text-xs text-muted mt-2 tracking-widest uppercase">Admin Panel</p>
        </div>
        <div className="bg-surface border border-border p-8">
          <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent/40" />
          <label className="font-mono text-xs text-muted tracking-widest uppercase mb-2 block">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Enter admin password"
            className="form-input mb-4"
            autoFocus
          />
          {error && <p className="font-mono text-xs text-red-400 mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            disabled={loading || !password}
            className="btn-primary w-full justify-center disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Login'}
          </button>
          <p className="font-mono text-xs text-muted mt-4 text-center">
            Default password: <span className="text-accent">admin123</span><br />
            Change via <span className="text-text">ADMIN_PASSWORD</span> in .env.local
          </p>
        </div>
      </div>
    </div>
  )
}

// ── REPLY MODAL ───────────────────────────────────────────────
function ReplyModal({
  msg,
  onClose,
  onSent,
}: {
  msg: Message
  onClose: () => void
  onSent: () => void
}) {
  const [subject, setSubject] = useState(`Re: ${msg.subject || 'Your message'}`)
  const [body, setBody] = useState(`Hi ${msg.name},\n\nThank you for reaching out!\n\n\n\nBest regards,\ndevkarasel`)
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const send = async () => {
    setStatus('sending')
    const res = await fetch('/api/admin/reply', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messageId: msg.id, to: msg.email, toName: msg.name, subject, body }),
    })
    if (res.ok) {
      setStatus('success')
      setTimeout(() => { onSent(); onClose() }, 1200)
    } else {
      const d = await res.json()
      setErrMsg(d.error || 'Failed to send')
      setStatus('error')
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-xl bg-surface border border-border relative">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border">
          <div>
            <p className="font-mono text-xs text-accent tracking-widest uppercase">Reply</p>
            <p className="font-mono text-sm text-text mt-0.5">To: {msg.name} &lt;{msg.email}&gt;</p>
          </div>
          <button onClick={onClose} className="text-muted hover:text-text transition-colors">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Original message */}
        <div className="mx-6 mt-4 p-3 border border-border bg-bg/50">
          <p className="font-mono text-xs text-muted mb-1">Original message</p>
          <p className="font-mono text-xs text-text/70 line-clamp-3">{msg.message}</p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          <div>
            <label className="font-mono text-xs text-muted tracking-widest uppercase mb-2 block">Subject</label>
            <input value={subject} onChange={(e) => setSubject(e.target.value)} className="form-input" />
          </div>
          <div>
            <label className="font-mono text-xs text-muted tracking-widest uppercase mb-2 block">Message</label>
            <textarea value={body} onChange={(e) => setBody(e.target.value)} rows={8} className="form-input resize-none" />
          </div>
          <button onClick={send} disabled={status === 'sending'} className="btn-primary w-full justify-center disabled:opacity-50">
            {status === 'sending' ? 'Sending...' : status === 'success' ? '✓ Sent!' : 'Send Reply'}
          </button>
          {status === 'error' && <p className="font-mono text-xs text-red-400 text-center">{errMsg}</p>}
        </div>
      </div>
    </div>
  )
}

// ── MESSAGE DETAIL ────────────────────────────────────────────
function MessageDetail({
  msg,
  onReply,
  onDelete,
  onBack,
}: {
  msg: Message
  onReply: () => void
  onDelete: () => void
  onBack: () => void
}) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 p-4 border-b border-border">
        <button onClick={onBack} className="text-muted hover:text-accent transition-colors md:hidden">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
        </button>
        <div className="flex-1 min-w-0">
          <h3 className="font-mono text-sm text-text truncate">{msg.subject || '(no subject)'}</h3>
          <p className="font-mono text-xs text-muted">{msg.name} · {msg.email}</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={onReply} className="btn-primary text-xs py-2 px-4">Reply</button>
          <button onClick={onDelete} className="btn-ghost text-xs py-2 px-3 hover:border-red-500 hover:text-red-400">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-10 h-10 bg-accent/10 border border-accent/20 flex items-center justify-center font-display text-xl text-accent flex-shrink-0">
            {msg.name[0].toUpperCase()}
          </div>
          <div>
            <div className="font-mono text-sm text-text">{msg.name}</div>
            <div className="font-mono text-xs text-muted">{msg.email}</div>
            <div className="font-mono text-xs text-muted mt-1">
              {new Date(msg.receivedAt).toLocaleString()}
            </div>
          </div>
          <div className="ml-auto flex gap-2">
            {msg.replied && <span className="tag-accent">replied</span>}
            {!msg.read && <span className="font-mono text-xs text-accent border border-accent px-2 py-0.5">new</span>}
          </div>
        </div>

        <div className="bg-bg border border-border p-5">
          <p className="text-text/80 leading-relaxed whitespace-pre-wrap text-sm">{msg.message}</p>
        </div>
      </div>
    </div>
  )
}

// ── MAIN DASHBOARD ────────────────────────────────────────────
export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [checking, setChecking] = useState(true)
  const [messages, setMessages] = useState<Message[]>([])
  const [selected, setSelected] = useState<Message | null>(null)
  const [replying, setReplying] = useState(false)
  const [filter, setFilter] = useState<'all' | 'unread' | 'replied'>('all')
  const [showDetail, setShowDetail] = useState(false)

  // Check if already logged in
  useEffect(() => {
    fetch('/api/admin/messages')
      .then((r) => { if (r.ok) setAuthed(true) })
      .finally(() => setChecking(false))
  }, [])

  const loadMessages = useCallback(async () => {
    const res = await fetch('/api/admin/messages')
    if (res.ok) {
      const data = await res.json()
      setMessages(data.messages)
    }
  }, [])

  useEffect(() => {
    if (authed) loadMessages()
  }, [authed, loadMessages])

  const selectMessage = async (msg: Message) => {
    setSelected(msg)
    setShowDetail(true)
    if (!msg.read) {
      await fetch('/api/admin/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: msg.id }),
      })
      setMessages((prev) => prev.map((m) => m.id === msg.id ? { ...m, read: true } : m))
    }
  }

  const deleteMessage = async (id: string) => {
    await fetch('/api/admin/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setMessages((prev) => prev.filter((m) => m.id !== id))
    setSelected(null)
    setShowDetail(false)
  }

  const logout = async () => {
    await fetch('/api/admin/login', { method: 'DELETE' })
    setAuthed(false)
  }

  if (checking) {
    return (
      <div className="min-h-screen bg-bg flex items-center justify-center">
        <div className="font-mono text-xs text-muted tracking-widest animate-pulse">LOADING...</div>
      </div>
    )
  }

  if (!authed) return <LoginScreen onLogin={() => { setAuthed(true) }} />

  const filtered = messages.filter((m) => {
    if (filter === 'unread') return !m.read
    if (filter === 'replied') return m.replied
    return true
  })

  const unreadCount = messages.filter((m) => !m.read).length

  return (
    <div className="min-h-screen bg-bg flex flex-col">
      {/* Top bar */}
      <header className="border-b border-border bg-surface px-6 h-14 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-display text-2xl text-accent">DK.</span>
          <span className="font-mono text-xs text-muted tracking-widest uppercase">Admin Panel</span>
          {unreadCount > 0 && (
            <span className="font-mono text-xs bg-accent text-bg px-2 py-0.5">{unreadCount} new</span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <a href="/" className="font-mono text-xs text-muted hover:text-accent transition-colors">← Portfolio</a>
          <button onClick={logout} className="font-mono text-xs text-muted hover:text-red-400 transition-colors">Logout</button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className={`w-full md:w-80 border-r border-border flex flex-col flex-shrink-0 ${showDetail ? 'hidden md:flex' : 'flex'}`}>
          {/* Filters */}
          <div className="flex border-b border-border">
            {(['all', 'unread', 'replied'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`flex-1 font-mono text-xs tracking-widest uppercase py-3 transition-colors ${filter === f ? 'text-accent border-b-2 border-accent' : 'text-muted hover:text-text'}`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Message list */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <div className="p-8 text-center">
                <p className="font-mono text-xs text-muted">No messages</p>
              </div>
            ) : (
              filtered.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => selectMessage(msg)}
                  className={`w-full text-left p-4 border-b border-border transition-all duration-150 ${selected?.id === msg.id ? 'bg-accent/5 border-l-2 border-l-accent' : 'hover:bg-surface'}`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      {!msg.read && <span className="w-2 h-2 rounded-full bg-accent flex-shrink-0" />}
                      <span className={`font-mono text-xs truncate ${!msg.read ? 'text-text font-medium' : 'text-muted'}`}>
                        {msg.name}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-muted flex-shrink-0">
                      {new Date(msg.receivedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="font-mono text-xs text-muted truncate mb-1">{msg.subject || '(no subject)'}</p>
                  <p className="font-mono text-[11px] text-muted/60 truncate">{msg.message}</p>
                  {msg.replied && <span className="tag-accent mt-1 inline-block">replied</span>}
                </button>
              ))
            )}
          </div>

          {/* Stats bar */}
          <div className="border-t border-border p-3 flex gap-4">
            <span className="font-mono text-xs text-muted">{messages.length} total</span>
            <span className="font-mono text-xs text-accent">{unreadCount} unread</span>
            <span className="font-mono text-xs text-muted">{messages.filter((m) => m.replied).length} replied</span>
          </div>
        </aside>

        {/* Detail panel */}
        <main className={`flex-1 overflow-hidden ${!showDetail ? 'hidden md:flex' : 'flex'} flex-col`}>
          {selected ? (
            <MessageDetail
              msg={selected}
              onReply={() => setReplying(true)}
              onDelete={() => deleteMessage(selected.id)}
              onBack={() => setShowDetail(false)}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="font-display text-6xl text-border mb-4">✉</div>
                <p className="font-mono text-xs text-muted tracking-widest">Select a message to read</p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Reply modal */}
      {replying && selected && (
        <ReplyModal
          msg={selected}
          onClose={() => setReplying(false)}
          onSent={() => {
            setMessages((prev) => prev.map((m) => m.id === selected.id ? { ...m, replied: true, read: true } : m))
            setSelected((s) => s ? { ...s, replied: true } : s)
            loadMessages()
          }}
        />
      )}
    </div>
  )
}
