import { request } from './config'

export const GetListOption = (params: any, token?: string) => request({ url: 'option', method: 'GET', params }, { token })
export const UpdateOption = (data: any) => request({ url: `option`, data, method: 'POST' })
