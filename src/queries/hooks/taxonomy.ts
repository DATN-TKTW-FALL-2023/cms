import { NError, NSuccess } from '@src/configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@src/configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { TPatchTaxonomy, TQueryTaxonomy, TTaxonomy, TTaxonomyMakeTree } from '@src/modules'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'

import { queryClient } from '..'
import {
  getListTaxonomy,
  getTaxonomyById,
  getTaxonomyMakeTree,
  moveTaxonomyById,
  patchTaxonomyById,
  postTaxonomy,
  putSlugTaxonomyById,
  removeTaxonomyById,
} from '../apis'
import { DETAIL_TAXONOMY, LIST_TAXONOMY, MAKE_TREE_TAXONOMY } from '../keys'

/**
 * @method useQueryListTaxonomy
 * @param {TQueryTaxonomy}params
 * @param {string}token
 * @returns
 */
export const useQueryListTaxonomy = (params: TQueryTaxonomy, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResDataListApi<TTaxonomy>>(
    [LIST_TAXONOMY, JSON.stringify(params)],
    () => getListTaxonomy(params, accessToken),
    {
      enabled: !!accessToken,
    },
  )
}

/**
 * @method useQueryTaxonomyMakeTree
 * @param {string}postType
 * @param {string}token
 * @param {string}taxonomyId
 * @returns
 */
export const useQueryTaxonomyMakeTree = (postType: string, token?: string, taxonomyId?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<TTaxonomyMakeTree>>(
    [MAKE_TREE_TAXONOMY, postType, taxonomyId],
    () => getTaxonomyMakeTree(postType, token, taxonomyId),
    {
      enabled: !!accessToken && !!postType,
    },
  )
}

/**
 * @method useQueryTaxonomyById
 * @param {string}id
 * @param {string}token
 * @returns
 */
export const useQueryTaxonomyById = (id: string, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<TTaxonomy>>([DETAIL_TAXONOMY, id], () => getTaxonomyById(id, accessToken), {
    enabled: !!accessToken && !!id,
  })
}

/**
 * @method useMutationPostTaxonomy
 */
export const useMutationPostTaxonomy = () =>
  useMutation(postTaxonomy, {
    onSuccess: (res: TResApi<TTaxonomy>) => {
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useMutationPatchTaxonomy
 */
export const useMutationPatchTaxonomyById = () =>
  useMutation(({ id, data }: { id: string; data: TPatchTaxonomy }) => patchTaxonomyById(id, data), {
    onSuccess: (res: TResApi) => {
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useMutationMoveTaxonomyById
 */
export const useMutationMoveTaxonomyById = () =>
  useMutation(({ id, newParentId }: { id: string; newParentId?: string }) => moveTaxonomyById(id, newParentId), {
    onSuccess: (res: TResApi, { id }) => {
      queryClient.invalidateQueries([DETAIL_TAXONOMY, id])
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useMutationPutSlugTaxonomyById
 */
export const useMutationPutSlugTaxonomyById = () =>
  useMutation(({ id, slug }: { id: string; slug: string }) => putSlugTaxonomyById(id, slug), {
    onSuccess: (res: TResApi) => {
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useMutationRemoveTaxonomyById
 */
export const useMutationRemoveTaxonomyById = () =>
  useMutation(removeTaxonomyById, {
    onSuccess: (res: TResApi) => {
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      notification.error({ message: NError, description: error?.message })
    },
  })
