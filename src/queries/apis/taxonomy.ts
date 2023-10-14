import { TPatchTaxonomy, TPostTaxonomy, TQueryTaxonomy } from '@src/modules'

import { request } from './config'

export const postTaxonomy = (data: TPostTaxonomy) => request({ url: 'taxonomy', method: 'POST', data })
export const getListTaxonomy = (params: TQueryTaxonomy, token?: string) =>
  request({ url: 'taxonomy', method: 'GET', params }, { token })
export const getTaxonomyMakeTree = (postType: string, token?: string, taxonomyId?: string) =>
  request({ url: `taxonomy/make/tree/${postType}`, params: { taxonomyId }, method: 'GET' }, { token })
export const getTaxonomyById = (id: string, token?: string) =>
  request({ url: `taxonomy/${id}`, method: 'GET' }, { token })
export const patchTaxonomyById = (id: string, data: TPatchTaxonomy) =>
  request({ url: `taxonomy/${id}`, data, method: 'PATCH' })
export const moveTaxonomyById = (id: string, newParentId?: string) =>
  request({ url: `taxonomy/move/${id}`, method: 'PATCH', data: { newParentId } })
export const putSlugTaxonomyById = (id: string, slug: string) =>
  request({ url: `taxonomy/${id}/slug`, method: 'PUT', data: { slug } })
export const removeTaxonomyById = (id: string) => request({ url: `taxonomy/${id}`, method: 'DELETE' })
