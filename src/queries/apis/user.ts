import { TPatchUser, TPostUser, TQueryUser, TSetPassword } from '@src/modules'

import { request } from './config'

export const getProfile = (token: string) => request({ url: 'user/profile', method: 'GET' }, { token })
export const getListUser = (params: TQueryUser, token: string) =>
  request({ url: 'user', method: 'GET', params }, { token })
export const getUserById = (id: string, token: string) => request({ url: `user/${id}`, method: 'GET' }, { token })
export const postUser = (data: TPostUser) => request({ url: 'user', method: 'POST', data })
export const patchUserById = (id: string, data: TPatchUser) => request({ url: `user/${id}`, method: 'PATCH', data })
export const patchPasswordUserById = (id: string, data: TSetPassword) =>
  request({ url: `user/${id}/set-password`, method: 'PATCH', data })
export const removeUserById = (id: string) => request({ url: `user/${id}`, method: 'DELETE' })
export const removeManyUserByIds = (ids: string[]) =>
  request({ url: `user/delete-many`, method: 'POST', data: { ids } })
export const getTotalUser = (token?: string) => request({ url: `user/total`, method: 'GET' }, { token })
