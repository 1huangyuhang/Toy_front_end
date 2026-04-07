import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const AuthContext = createContext(null)

async function api(path, options) {
  const res = await fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(options?.headers || {}),
    },
  })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(text || `${res.status}`)
  }
  return await res.json()
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true
    ;(async () => {
      try {
        const data = await api('/api/auth/me')
        if (alive) setUser(data.user)
      } catch {
        if (alive) setUser(null)
      } finally {
        if (alive) setLoading(false)
      }
    })()
    return () => {
      alive = false
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      loading,
      async login({ email, password }) {
        const data = await api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) })
        setUser(data.user)
      },
      async register({ email, password }) {
        const data = await api('/api/auth/register', { method: 'POST', body: JSON.stringify({ email, password }) })
        setUser(data.user)
      },
      async logout() {
        await api('/api/auth/logout', { method: 'POST', body: '{}' })
        setUser(null)
      },
    }),
    [user, loading],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

