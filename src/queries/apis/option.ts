import { request } from './config'

export const UpdateOption = (data: any) => request({ url: `option`, data, method: 'POST' })
