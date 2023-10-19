import { NError, NSuccess } from '@configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'

import { queryClient } from '..'
import {
    createLayout,
    getListLayout,
} from '../apis'
import { LIST_LAYOUT } from '../keys'

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
 * @param {TQueryPost}params
 * @param {string}token
 * @returns
 */
export const useQueryListLayout = (token?: string) => {
    const accessToken = token || checkAuth()
    return useQuery<TResDataListApi<any[]>>(
        [],
        () => getListLayout(accessToken),
        { enabled: !!accessToken },
    )
}

