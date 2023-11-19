import { request } from './config'

export const getListOrder = (params: any, token?: string) => request({ url: 'order', method: 'GET', params }, { token })
export const getOrderById = (id: string, token?: string) => request({ url: `order/${id}`, method: 'GET' }, { token })
export const patchOrderById = (id: string, data: any) => request({ url: `order/${id}/approve`, data, method: 'PATCH' })
export const removeOrderById = (id: string) => request({ url: `order/${id}`, method: 'DELETE' })
