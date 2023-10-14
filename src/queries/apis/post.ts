import { TCreatePost, TPatchPost, TQueryPost } from '@src/modules'

import { request } from './config'

export const createPost = (data: TCreatePost) => request({ url: 'post', method: 'POST', data })
export const getListPost = (params: TQueryPost, token?: string) =>
  request({ url: 'post', method: 'GET', params }, { token })
export const getPostById = (id: string, token?: string) => request({ url: `post/${id}`, method: 'GET' }, { token })
export const patchPostById = (id: string, data: TPatchPost) => request({ url: `post/${id}`, method: 'PATCH', data })
export const removePostById = (id: string) => request({ url: `post/${id}`, method: 'DELETE' })
export const removeManyPostByIds = (ids: string[]) =>
  request({ url: `post/delete-many`, method: 'POST', data: { ids } })
export const putSlugPostById = (id: string, slug: string) =>
  request({ url: `post/${id}/slug`, method: 'PUT', data: { slug } })
export const getTotalPost = (token?: string) => request({ url: `post/total`, method: 'GET' }, { token })
