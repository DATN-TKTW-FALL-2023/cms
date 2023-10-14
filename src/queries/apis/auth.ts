import { TSignIn } from '@modules/auth'

import { request } from './config'

export const signIn = (body: TSignIn) => request({ url: 'auth/login/cms', method: 'POST', data: body })
export const signOut = (token: string) => request({ url: 'auth/logout', method: 'POST' }, { token })
export const refreshToken = (token: string, refreshToken: string) =>
  request({ url: 'auth/refresh-token', method: 'POST', data: { refreshToken } }, { token })
