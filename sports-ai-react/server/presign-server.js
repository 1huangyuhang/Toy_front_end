import express from 'express'
import cors from 'cors'
import crypto from 'crypto'
import mime from 'mime-types'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import fs from 'fs/promises'
import path from 'path'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

/**
 * 方案 B：预签名 URL 上传（后端只负责签名，不接收文件）
 *
 * 兼容：AWS S3 / MinIO / 大多数 S3 兼容对象存储（很多国内厂商也支持）
 *
 * 必填环境变量：
 * - S3_BUCKET
 * - S3_REGION
 * - S3_ACCESS_KEY_ID
 * - S3_SECRET_ACCESS_KEY
 *
 * 可选：
 * - S3_ENDPOINT           (S3 兼容存储时常用)
 * - S3_FORCE_PATH_STYLE   ("true"/"false") 兼容 MinIO 等
 * - PUBLIC_BASE_URL       (用于返回可访问的公网/CDN URL；不填则用 endpoint 拼)
 * - KEY_PREFIX            (默认 "uploads/")
 * - PORT                  (默认 8787)
 * - JWT_SECRET            (登录态签名密钥)
 */

const PORT = Number(process.env.PORT || 8787)
const KEY_PREFIX = process.env.KEY_PREFIX || 'uploads/'
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me'

function required(name) {
  const v = process.env[name]
  if (!v) throw new Error(`Missing env: ${name}`)
  return v
}

/**
 * 注意：不要在进程启动时强制要求 S3 配置，
 * 否则会导致“注册/登录也用不了”（前端就会看到 502）。
 * S3 仅在 /api/presign 被调用时才需要。
 */
let _s3 = null
let _bucket = null
let _publicBaseUrl = null

function getS3() {
  if (_s3) return { s3: _s3, bucket: _bucket, publicBaseUrl: _publicBaseUrl }

  const s3 = new S3Client({
    region: required('S3_REGION'),
    endpoint: process.env.S3_ENDPOINT || undefined,
    forcePathStyle: (process.env.S3_FORCE_PATH_STYLE || '').toLowerCase() === 'true',
    credentials: {
      accessKeyId: required('S3_ACCESS_KEY_ID'),
      secretAccessKey: required('S3_SECRET_ACCESS_KEY'),
    },
  })

  _s3 = s3
  _bucket = required('S3_BUCKET')
  _publicBaseUrl = process.env.PUBLIC_BASE_URL || ''
  return { s3: _s3, bucket: _bucket, publicBaseUrl: _publicBaseUrl }
}

function safeExt(filename) {
  const m = String(filename || '').toLowerCase().match(/\.([a-z0-9]+)$/i)
  if (!m) return ''
  const ext = m[1]
  // 只允许常见媒体/图片扩展，避免乱传
  const allow = new Set(['mp4', 'mov', 'm4v', 'webm', 'png', 'jpg', 'jpeg', 'webp'])
  return allow.has(ext) ? `.${ext}` : ''
}

function contentTypeFor(filename) {
  return mime.lookup(filename) || 'application/octet-stream'
}

function buildPublicUrl(key) {
  const { publicBaseUrl, bucket } = getS3()
  if (publicBaseUrl) return `${publicBaseUrl.replace(/\/+$/, '')}/${key}`
  // fallback：尽量从 endpoint 拼一个（不保证所有厂商可用）
  const ep = process.env.S3_ENDPOINT
  if (!ep) return key
  return `${String(ep).replace(/\/+$/, '')}/${bucket}/${key}`
}

const app = express()
app.use(cors())
app.use(express.json({ limit: '1mb' }))
app.use(cookieParser())

app.get('/health', (req, res) => res.json({ ok: true }))

// ---- simple file-based user store (dev-friendly) ----
const DATA_DIR = path.join(process.cwd(), 'server', 'data')
const USERS_FILE = path.join(DATA_DIR, 'users.json')

async function readUsers() {
  try {
    const raw = await fs.readFile(USERS_FILE, 'utf8')
    const data = JSON.parse(raw)
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

async function writeUsers(users) {
  await fs.mkdir(DATA_DIR, { recursive: true })
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2), 'utf8')
}

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET)
}

function authFromRequest(req) {
  const token = req.cookies?.token
  if (!token) return null
  try {
    return verifyToken(token)
  } catch {
    return null
  }
}

app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ error: 'email and password required' })
    const normalized = String(email).trim().toLowerCase()
    if (password.length < 6) return res.status(400).json({ error: 'password too short' })

    const users = await readUsers()
    if (users.some((u) => u.email === normalized)) return res.status(409).json({ error: 'email already exists' })

    const id = crypto.randomUUID()
    const passwordHash = await bcrypt.hash(password, 10)
    const user = { id, email: normalized, passwordHash, createdAt: new Date().toISOString() }
    users.push(user)
    await writeUsers(users)

    const token = signToken({ id: user.id, email: user.email })
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false, path: '/' })
    res.json({ user: { id: user.id, email: user.email } })
  } catch (e) {
    res.status(500).json({ error: e?.message || 'register failed' })
  }
})

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body || {}
    if (!email || !password) return res.status(400).json({ error: 'email and password required' })
    const normalized = String(email).trim().toLowerCase()

    const users = await readUsers()
    const user = users.find((u) => u.email === normalized)
    if (!user) return res.status(401).json({ error: 'invalid credentials' })
    const ok = await bcrypt.compare(password, user.passwordHash)
    if (!ok) return res.status(401).json({ error: 'invalid credentials' })

    const token = signToken({ id: user.id, email: user.email })
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax', secure: false, path: '/' })
    res.json({ user: { id: user.id, email: user.email } })
  } catch (e) {
    res.status(500).json({ error: e?.message || 'login failed' })
  }
})

app.post('/api/auth/logout', (req, res) => {
  res.clearCookie('token', { path: '/' })
  res.json({ ok: true })
})

app.get('/api/auth/me', (req, res) => {
  const user = authFromRequest(req)
  if (!user) return res.status(401).json({ error: 'unauthorized' })
  res.json({ user })
})

app.post('/api/presign', async (req, res) => {
  try {
    const user = authFromRequest(req)
    if (!user?.id) return res.status(401).json({ error: 'unauthorized' })

    const { s3, bucket } = getS3()
    const { filename, folder } = req.body || {}
    if (!filename) return res.status(400).json({ error: 'filename required' })

    const ext = safeExt(filename)
    if (!ext) return res.status(400).json({ error: 'unsupported file extension' })

    const ct = contentTypeFor(filename)
    const id = crypto.randomUUID()
    const cleanFolder = folder ? String(folder).replace(/^\/+|\/+$/g, '') + '/' : ''
    // 绑定用户：每个用户一个隔离目录
    const key = `${KEY_PREFIX}u/${user.id}/${cleanFolder}${new Date().toISOString().slice(0, 10)}/${id}${ext}`

    const cmd = new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      ContentType: ct,
    })

    const uploadUrl = await getSignedUrl(s3, cmd, { expiresIn: 60 * 5 })

    res.json({
      method: 'PUT',
      key,
      contentType: ct,
      uploadUrl,
      publicUrl: buildPublicUrl(key),
    })
  } catch (e) {
    // S3 配置缺失时，给出更明确错误
    if (String(e?.message || '').startsWith('Missing env: S3_')) {
      return res.status(500).json({ error: e.message })
    }
    res.status(500).json({ error: e?.message || 'presign failed' })
  }
})

app.listen(PORT, () => {
  console.log(`[presign] listening on http://127.0.0.1:${PORT}`)
})

