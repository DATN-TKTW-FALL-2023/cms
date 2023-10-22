import { TCreatePost, TQueryLayout } from '@src/modules'

import { request } from './config'

export const createLayout = (data: TCreatePost) => request({ url: 'room/layout', method: 'POST', data }) 
export const getListLayout = (params: TQueryLayout, token?: string) => request({ url: 'room/layout', method: 'GET', params }, { token })
export const removeLayoutById = (id: string) => request({ url: `room/layout/${id}`, method: 'DELETE' })
export const updateLayoutById = (id: string, data: any) => request({ url: `room/layout/${id}`, method: 'PATCH', data })
export const getLayoutById = (id: string) => request({ url: `room/layout/${id}`, method: 'GET' })

//room

export const createRoom = (data: any) => request({ url: 'room', method: 'POST', data })
export const getListRoom = (params: any, token?: string) => request({ url: 'room', method: 'GET', params }, { token })
export const removeRoomById = (id: string) => request({ url: `room/${id}`, method: 'DELETE' })
export const updateRoomById = (id: string, data: any) => request({ url: `room/${id}`, method: 'PATCH', data })
export const getRoomById = (id: string) => request({ url: `room/${id}`, method: 'GET' })
