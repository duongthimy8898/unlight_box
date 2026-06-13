// features/auth/api.ts

import { apiClient } from "../../shared/lib/apiClient"
import type { User } from "./types"

export async function verifyToken(token: string): Promise<User> {
  const res = await apiClient.get('/auth/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
  return res.data
}

export async function login(email: string, password: string): Promise<User> {
  const res = await apiClient.post('/auth/login', { email, password })
  return res.data
}

export async function logout() {
  await apiClient.post('/auth/logout')
}

export async function refreshToken() {
  const token = localStorage.getItem('token')
  if (!token) throw new Error('No token found')
  const res = await apiClient.post('/auth/refresh', { token })
  return res.data
}