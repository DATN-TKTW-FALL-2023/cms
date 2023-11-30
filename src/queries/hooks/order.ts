import { NError, NSuccess } from '@configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'

import { queryClient } from '..'

import { DETAIL_ORDER, LIST_ORDER } from '../keys'

import { getListOrder, getOrderById, patchOrderById, removeOrderById } from '../apis'



export const useQueryListOrder = (params: any, token?: string) => {
    const accessToken = token || checkAuth()
    return useQuery<TResDataListApi<any[]>>([LIST_ORDER, JSON.stringify(params)], () => getListOrder(params, accessToken), {
        enabled: !!accessToken,
    })
}

export const useMutationRemoveOrderById = () => useMutation(removeOrderById, {
    onSuccess: (res: TResApi) => {
        queryClient.refetchQueries([LIST_ORDER])
        notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
        notification.error({ message: NError, description: error?.message })
    },
})

export const useMutationUpdateOrderById = () =>
    useMutation(({ id, data }: { id: string; data: any }) => patchOrderById(id, data), {
        onSuccess: (res: TResApi) => {
            queryClient.refetchQueries([DETAIL_ORDER])
            notification.success({ message: NSuccess, description: res?.message })
        },
        onError: (error: TResApiErr) => {
            notification.error({ message: NError, description: error?.message })
        },
    })

export const useQueryOrderById = (id: string, token?: string) => {
    const accessToken = token || checkAuth()
    return useQuery<TResApi<any>>([DETAIL_ORDER, id], () => getOrderById(id, accessToken), {
        enabled: !!accessToken,
    })
}

