import { NError, NSuccess } from '@configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'

import { queryClient } from '..'
import {
    createLayout,
    getListLayout,
    removeLayoutById,
} from '../apis'
import { LIST_LAYOUT } from '../keys'
import { TQueryLayout } from '@src/modules'

/**
 *
 * @method useMutationCreateLayout
 * @returns
 */
export const useMutationCreateLayout = () =>
    useMutation(createLayout, {
        onSuccess: (res: TResApi<any>) => {
            queryClient.refetchQueries([LIST_LAYOUT])
            notification.success({ message: NSuccess, description: res?.message })
        },
        onError: (error: TResApiErr) => {
            // [TODO] ...
            notification.error({ message: NError, description: error?.message })
        },
    })

/**
 * @method useQueryListLayout
 * @param {TQueryLayout}params
 * @param {string}token
 * @returns
 */
export const useQueryListLayout = (params: TQueryLayout, token?: string) => {
    const accessToken = token || checkAuth()
    return useQuery<TResDataListApi<any[]>>(
        [LIST_LAYOUT],
        () => getListLayout(params, accessToken),
        { enabled: !!accessToken },
    )
}

/**
 * @method useMutationRemoveLayoutById
 */
export const useMutationRemoveLayoutById = () =>
    useMutation(removeLayoutById, {
        onSuccess: (res: TResApi) => {
            queryClient.refetchQueries([LIST_LAYOUT])
            notification.success({ message: NSuccess, description: res?.message })
        },
        onError: (error: TResApiErr) => {
            notification.error({ message: NError, description: error?.message })
        },
    })

