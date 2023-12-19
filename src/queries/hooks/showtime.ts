import { NError, NSuccess } from '@configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'
import { TQueryLayout } from '@src/modules'

import { queryClient } from '..'

import { LIST_SHOWTIME, DETAIL_SHOWTIME } from '../keys'

import { createShowtime, getListShowtime, getShowtimeById, getStatisticalShowtime, patchShowtimeById, removeShowtimeById } from '../apis'

export const useMutationCreateShowtime = () => useMutation(createShowtime, {
    onSuccess: (res: TResApi<any>) => {
        queryClient.refetchQueries([LIST_SHOWTIME])
        notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
        // [TODO] ...
        notification.error({ message: NError, description: error?.message })
    },
})

export const useQueryListShowtime = (params: any, token?: string) => {
    const accessToken = token || checkAuth()
    return useQuery<TResDataListApi<any[]>>([], () => getListShowtime(params, accessToken), {
        enabled: !!accessToken,
    })
}

export const useQueryStatisticalShowtime = (params: any, token?: string) => {
    const accessToken = token || checkAuth()
    return useQuery<TResDataListApi<any[]>>([LIST_SHOWTIME], () => getStatisticalShowtime(params, accessToken), {
        enabled: !!accessToken,
    })
}

export const useMutationRemoveShowtimeById = () => useMutation(removeShowtimeById, {
    onSuccess: (res: TResApi) => {
        queryClient.refetchQueries([LIST_SHOWTIME])
        notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
        notification.error({ message: NError, description: error?.message })
    },
})

export const useMutationUpdateShowTimeById = () =>
    useMutation(({ id, data }: { id: string; data: any }) => patchShowtimeById(id, data), {
        onSuccess: (res: TResApi) => {
            queryClient.refetchQueries([DETAIL_SHOWTIME])
            notification.success({ message: NSuccess, description: res?.message })
        },
        onError: (error: TResApiErr) => {
            notification.error({ message: NError, description: error?.message })
        },
    })

export const useQueryShowtimeById = (id: string, token?: string) => {
    const accessToken = token || checkAuth()
    return useQuery<TResApi<any>>([DETAIL_SHOWTIME, id], () => getShowtimeById(id, accessToken), {
        enabled: !!accessToken,
    })
}

