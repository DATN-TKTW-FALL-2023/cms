import { request } from './config'

export const createShowtime = (data: any) => request({ url: 'showtime', method: 'POST', data })
export const getListShowtime = (params: any, token?: string) => request({ url: 'showtime', method: 'GET', params }, { token })
export const getShowtimeById = (id: string, token?: string) => request({ url: `showtime/${id}`, method: 'GET' }, { token })
export const patchShowtimeById = (id: string, data: any) => request({ url: `showtime/${id}`, data, method: 'PATCH' })
export const removeShowtimeById = (id: string) => request({ url: `showtime/${id}`, method: 'DELETE' })
export const getStatisticalShowtime = (params: any, token?: string) => request({ url: 'showtime/statistical', method: 'GET', params }, { token })