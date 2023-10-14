import { NError, NSuccess } from '@configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { TPatchPost, TPost, TQueryPost } from '@src/modules'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'

import { queryClient } from '..'
import {
  createPost,
  getListPost,
  getPostById,
  getTotalPost,
  patchPostById,
  putSlugPostById,
  removeManyPostByIds,
  removePostById,
} from '../apis'
import { DETAIL_POST, LIST_POST, TOTAL_POST } from '../keys'

/**
 *
 * @method useMutationCreatePost
 * @returns
 */
export const useMutationCreatePost = () =>
  useMutation(createPost, {
    onSuccess: (res: TResApi<TPost>) => {
      queryClient.refetchQueries([LIST_POST])
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useQueryListPost
 * @param {TQueryPost}params
 * @param {string}token
 * @returns
 */
export const useQueryListPost = (params: TQueryPost, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResDataListApi<TPost[]>>(
    [LIST_POST, JSON.stringify(params)],
    () => getListPost(params, accessToken),
    { enabled: !!accessToken },
  )
}

/**
 * @method useQueryPostTotal
 * @param {string}token
 * @returns
 */
export const useQueryPostTotal = (token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<number>>([TOTAL_POST], () => getTotalPost(token), { enabled: !!accessToken })
}

/**
 * @method useQueryPostById
 * @param {string}id
 * @param {string}token
 * @returns
 */
export const useQueryPostById = (id: string, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<TPost>>([DETAIL_POST, id], () => getPostById(id, token), { enabled: !!accessToken && !!id })
}

/**
 *
 * @method useMutationPatchPostById
 * @returns
 */
export const useMutationPatchPostById = () =>
  useMutation(({ id, data }: { id: string; data: TPatchPost }) => patchPostById(id, data), {
    onSuccess: (res: TResApi, { id }) => {
      queryClient.refetchQueries([LIST_POST])
      queryClient.invalidateQueries([DETAIL_POST, id])
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 *
 * @method useMutationRemovePostById
 * @returns
 */
export const useMutationRemovePostById = () =>
  useMutation((id: string) => removePostById(id), {
    onSuccess: (res: TResApi, id) => {
      queryClient.refetchQueries([LIST_POST])
      queryClient.removeQueries([DETAIL_POST, id])
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 *
 * @method useMutationRemoveManyPostByIds
 * @returns
 */
export const useMutationRemoveManyPostByIds = () =>
  useMutation((ids: string[]) => removeManyPostByIds(ids), {
    onSuccess: (res: TResApi) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 *
 * @method useMutationPutSlugPostByIds
 * @returns
 */
export const useMutationPutSlugPostById = () =>
  useMutation(({ id, slug }: { id: string; slug: string }) => putSlugPostById(id, slug), {
    onSuccess: (res: TResApi, { id, slug }) => {
      queryClient.setQueryData([DETAIL_POST, id], () => {
        const old = queryClient.getQueryData<TResApi<TPost>>([DETAIL_POST, id])
        if (old && old?.data)
          return {
            ...old,
            data: { ...old.data, slug },
          }
        return old
      })
      // queryClient.refetchQueries([LIST_POST])
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })
