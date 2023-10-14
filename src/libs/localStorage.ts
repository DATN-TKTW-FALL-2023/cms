import dayjs from 'dayjs'
import { TSignature } from '@modules/auth'

const SIGNATURE = 'signature'

// Helper to get user from localStorage

export function getStoredAuth(): TSignature | null {
  const storedAuth = typeof window !== 'undefined' ? localStorage.getItem(SIGNATURE) : ''
  return storedAuth ? JSON.parse(storedAuth) : null
}

export function checkAuth(): string {
  const now: number = dayjs().unix()
  const signature: TSignature | null = getStoredAuth()
  const accessToken: string | null = signature ? signature.accessToken : null
  const expiredAt: number = signature ? +signature.expiredAt : 0
  if (!!accessToken && +now < +expiredAt) return accessToken
  return ''
}

export function setStoredAuth(auth: TSignature): void {
  localStorage.setItem(SIGNATURE, JSON.stringify(auth))
}

export function clearStoredAuth(): void {
  localStorage.removeItem(SIGNATURE)
}

// Set localStorage common
export function getLocalStored(key: string): any {
  const stored = typeof window !== 'undefined' ? localStorage.getItem(key) : ''
  return stored ? JSON.parse(stored) : null
}

export function setLocalStored(key: string, data: any): void {
  localStorage.setItem(key, JSON.stringify(data))
}

export function clearLocalStored(key: string): void {
  localStorage.removeItem(key)
}
