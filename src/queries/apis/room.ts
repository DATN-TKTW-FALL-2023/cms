import { TCreatePost } from '@src/modules'

import { request } from './config'

export const createLayout = (data: TCreatePost) => request({ url: 'room/layout', method: 'POST', data })
export const getListLayout = (token?: string) => request({ url: 'room/layout', method: 'GET' }, { token })

