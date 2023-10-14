import { TPatchRole, TPostRole, TQueryRole } from '@src/modules'

import { request } from './config'

export const postRole = (data: TPostRole) => request({ url: 'role', method: 'POST', data })
export const getListRole = (params: TQueryRole, token: string) =>
  request({ url: 'role', method: 'GET', params }, { token })
export const getListPermission = (token: string) => request({ url: 'role/permission', method: 'GET' }, { token })
export const getRoleCurrent = (token: string) => request({ url: 'role/current', method: 'GET' }, { token })
export const getRoleById = (id: string, token: string) => request({ url: `role/${id}`, method: 'GET' }, { token })
export const patchRoleById = (id: string, data: TPatchRole) => request({ url: `role/${id}`, method: 'PATCH', data })
export const removeRoleById = (id: string) => request({ url: `role/${id}`, method: 'DELETE' })
export const removeManyRoleByIds = (ids: string[]) =>
  request({ url: `role/delete-many`, method: 'POST', data: { ids } })
export const getTotalRole = (token?: string) => request({ url: `role/total`, method: 'GET' }, { token })
