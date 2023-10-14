import { NError, NSuccess } from '@configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@configs/interface.config'
import { checkAuth } from '@libs/localStorage'
import { TPatchUser, TQueryUser, TSetPassword, TUser } from '@src/modules'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'

import { queryClient } from '..'
import {
  getListUser,
  getTotalUser,
  getUserById,
  patchPasswordUserById,
  patchUserById,
  postUser,
  removeManyUserByIds,
  removeUserById,
} from '../apis'
import { DETAIL_USER, LIST_USER, TOTAL_USER, USER_PROFILE } from '../keys'

/**
 * @method useQueryListUser
 * @param params
 * @param token
 * @returns
 */
export const useQueryListUser = (params: TQueryUser, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResDataListApi<TUser[]>>(
    [LIST_USER, JSON.stringify(params)],
    () => getListUser(params, accessToken),
    {
      enabled: !!accessToken,
    },
  )
}

/**
 * @method useQueryUserById
 * @param id
 * @param token
 * @returns
 */
export const useQueryUserById = (id: string, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<TUser>>([DETAIL_USER, id], () => getUserById(id, accessToken), {
    enabled: !!accessToken && !!id,
  })
}

/**
 * @method useQueryUserTotal
 * @param {string}token
 * @returns
 */
export const useQueryUserTotal = (token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<number>>([TOTAL_USER], () => getTotalUser(token), { enabled: !!accessToken })
}

/**
 * @method useMutationPostUser
 * @returns
 */
export const useMutationPostUser = () =>
  useMutation(postUser, {
    onSuccess: (res: TResApi<TUser>) => {
      queryClient.refetchQueries([LIST_USER])
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useMutationPatchUserById
 * @returns
 */
export const useMutationPatchUserById = () =>
  useMutation(({ id, data }: { id: string; data: TPatchUser }) => patchUserById(id, data), {
    onSuccess: (res: TResApi, { id }) => {
      queryClient.refetchQueries([LIST_USER])
      queryClient.invalidateQueries([DETAIL_USER, id])
      const profileData = queryClient.getQueryData<TResApi<TUser>>(USER_PROFILE)
      if (profileData?.data && profileData?.data?._id === id) {
        queryClient.refetchQueries([USER_PROFILE])
      }
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useMutationSetPassword
 * @returns
 */
export const useMutationSetPassword = () =>
  useMutation(({ id, data }: { id: string; data: TSetPassword }) => patchPasswordUserById(id, data), {
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
 * @method useMutationRemoveUserById
 * @returns
 */
export const useMutationRemoveUserById = () =>
  useMutation(removeUserById, {
    onSuccess: (res: TResApi, id) => {
      queryClient.refetchQueries([LIST_USER])
      queryClient.removeQueries([DETAIL_USER, id])
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useMutationRemoveManyUserByIds
 * @returns
 */
export const useMutationRemoveManyUserByIds = () =>
  useMutation(removeManyUserByIds, {
    onSuccess: (res: TResApi) => {
      queryClient.refetchQueries([LIST_USER])
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })
