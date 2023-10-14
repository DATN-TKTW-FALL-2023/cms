import { TUser } from './user'

export type TSignIn = {
  username: string
  password: string
}

export type TSignature = {
  accessToken: string
  expiredAt: number
  refreshToken: string
  expiredAtRefreshToken: number
  email: string
  phone: string
}

export type TAuth = {
  user: TUser
  auth: TSignature
}
