import { TCreatePost, TQueryLayout } from '@src/modules'

import { request } from './config'

export const createLayout = (data: TCreatePost) => request({ url: 'room/layout', method: 'POST', data })
export const getListLayout = (params: TQueryLayout, token?: string) => request({ url: 'room/layout', method: 'GET', params }, { token })
export const removeLayoutById = (id: string) => request({ url: `room/layout/${id}`, method: 'DELETE' })
