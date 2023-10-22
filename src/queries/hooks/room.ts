import { NError, NSuccess } from '@configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'

import { queryClient } from '..'
import {
    createLayout,
    createRoom,
    getLayoutById,
    getListLayout,
    getListRoom,
    getRoomById,
    removeLayoutById,
    removeRoomById,
    updateLayoutById,
    updateRoomById,
} from '../apis'
import { DETAIL_LAYOUT, DETAIL_ROOM, LIST_LAYOUT, LIST_ROOM } from '../keys'
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
 * @returns
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

/**
 * @method useMutationUpdateLayoutById
 * @returns
 */

export const useMutationUpdateLayoutById = () =>
    useMutation(({ id, data }: { id: string; data: any }) => updateLayoutById(id, data), {
        onSuccess: (res: TResApi) => {
            queryClient.refetchQueries([LIST_LAYOUT, LIST_ROOM])
            notification.success({ message: NSuccess, description: res?.message })
        },
        onError: (error: TResApiErr) => {
            notification.error({ message: NError, description: error?.message })
        }
    })

/**
 * @method useQueryGetLayoutById
 * @param {string}id
 * @returns
 */

export const useQueryGetLayoutById = (id: string) => {
    return useQuery<TResApi<any>>([DETAIL_LAYOUT, id], () => getLayoutById(id), { enabled: !!id })
}

//room

export const useMutationCreateRoom = () =>
    useMutation(createRoom, {
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
 * @method useQueryListRoom
 * @param {TQueryLayout}params
 * @param {string}token
 * @returns
    */
export const useQueryListRoom = (params: any, token?: string) => {
    const accessToken = token || checkAuth()
    return useQuery<TResDataListApi<any[]>>(
        [LIST_ROOM],
        () => getListRoom(params, accessToken),
        { enabled: !!accessToken },
    )
}

/**
 * @method useMutationRemoveRoomById
 * @returns
 */
export const useMutationRemoveRoomById = () =>
    useMutation(removeRoomById, {
        onSuccess: (res: TResApi) => {
            queryClient.refetchQueries([LIST_ROOM])
            notification.success({ message: NSuccess, description: res?.message })
        },
        onError: (error: TResApiErr) => {
            notification.error({ message: NError, description: error?.message })
        },
    })

/**
 * @method useMutationUpdateRoomById
 * @returns
 */
export const useMutationUpdateRoomById = () => {
    return useMutation(({ id, data }: { id: string; data: any }) => updateRoomById(id, data), {
        onSuccess: (res: TResApi) => {
            queryClient.refetchQueries([LIST_ROOM])
            notification.success({ message: NSuccess, description: res?.message })
        },
        onError: (error: TResApiErr) => {
            notification.error({ message: NError, description: error?.message })
        }
    })
}

/**
 * @method useQueryGetRoomById
 * @param {string}id
 * @returns
 */

export const useQueryGetRoomById = (id: string) => {
    return useQuery<TResApi<any>>([DETAIL_ROOM, id], () => getRoomById(id), { enabled: !!id })
}

