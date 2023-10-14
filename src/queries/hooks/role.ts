import { NError, NSuccess } from '@configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@configs/interface.config'
import { checkAuth } from '@libs/localStorage'
import { TPatchRole, TPermission, TQueryRole, TRole } from '@src/modules'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'

import {
  getListPermission,
  getListRole,
  getRoleById,
  getTotalRole,
  patchRoleById,
  postRole,
  removeManyRoleByIds,
  removeRoleById,
} from '../apis'
import { DETAIL_ROLE, LIST_PERMISSION, LIST_ROLE, TOTAL_ROLE } from '../keys'

/**
 * @method useQueryListRole
 * @param {TQueryRole}params
 * @param {string}token
 * @returns
 */
export const useQueryListRole = (params: TQueryRole, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResDataListApi<TRole[]>>(
    [LIST_ROLE, JSON.stringify(params)],
    () => getListRole(params, accessToken),
    { enabled: !!accessToken },
  )
}

/**
 *
 * @method useMutationFolder
 * @returns
 */
export const useMutationPostRole = () =>
  useMutation(postRole, {
    onSuccess: (res: TResApi<TRole>) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useQueryPermission
 * @param token
 * @returns
 */
export const useQueryPermission = (token: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<TPermission[]>>([LIST_PERMISSION], () => getListPermission(accessToken), {
    enabled: !!accessToken,
  })
}

/**
 * @method useQueryRoleById
 * @param {string}id
 * @param {string}token
 * @returns
 */
export const useQueryRoleById = (id: string, token: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<TRole>>([DETAIL_ROLE, id], () => getRoleById(id, accessToken), {
    enabled: !!accessToken && !!id,
  })
}

/**
 * @method useQueryRoleTotal
 * @param {string}token
 * @returns
 */
export const useQueryRoleTotal = (token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<number>>([TOTAL_ROLE], () => getTotalRole(token), { enabled: !!accessToken })
}

/**
 * @method useMutationPatchRoleById
 * @returns
 */
export const useMutationPatchRoleById = () =>
  useMutation(({ id, data }: { id: string; data: TPatchRole }) => patchRoleById(id, data), {
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
 * @method useMutationRemoveRoleById
 * @returns
 */
export const useMutationRemoveRoleById = () =>
  useMutation(removeRoleById, {
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
 * @method useMutationRemoveManyRoleByIds
 * @returns
 */
export const useMutationRemoveManyRoleByIds = () =>
  useMutation(removeManyRoleByIds, {
    onSuccess: (res: TResApi) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })
