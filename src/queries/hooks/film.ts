import { NError, NSuccess } from '@configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'

import { getFilmById, removeFilmById, updateFilmById } from '../apis'
import { queryClient } from '..'
import {
          createFilm,
          getListFilm,

} from '../apis'
import { TQueryLayout } from '@src/modules'
import { DETAIL_FILM, LIST_FILM } from '../keys'


/**
 *
 * @method useMutationCreateFilm
 * @returns
 */
export const useMutationCreateFilm = () =>
  useMutation(createFilm, {
    onSuccess: (res: TResApi<any>) => {
      queryClient.refetchQueries([LIST_FILM])
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useQueryListFilm
 * @param {TQueryLayout}params
 * @param {string}token
 * @returns
 */
export const useQueryListFilm = (params: TQueryLayout, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResDataListApi<any[]>>([LIST_FILM, JSON.stringify(params)], () => getListFilm(params, accessToken), {
    enabled: !!accessToken,
  })
}
/**
 * @method useMutationRemoveRoomById
 * @returns
 */
export const useMutationRemoveFilmById = () =>
    useMutation(removeFilmById, {
        onSuccess: (res: TResApi) => {
            queryClient.refetchQueries([LIST_FILM])
            notification.success({ message: NSuccess, description: res?.message })
        },
        onError: (error: TResApiErr) => {
            notification.error({ message: NError, description: error?.message })
        },
    })


/**
 * @method useMutationUpdateFilmById
 * @returns
 */
export const useMutationUpdateFilmById = () => {
    return useMutation(({ id, data }: { id: string; data: any }) => updateFilmById(id, data), {
        onSuccess: (res: TResApi) => {
            queryClient.refetchQueries([LIST_FILM])
            notification.success({ message: NSuccess, description: res?.message })
        },
        onError: (error: TResApiErr) => {
            notification.error({ message: NError, description: error?.message })
        }
    })
}

/**
 * @method useQueryGetFilmById
 * @param {string}id
 * @returns
 */

export const useQueryGetFilmById = (id: string) => {
    return useQuery<TResApi<any>>([DETAIL_FILM, id], () => getFilmById(id), { enabled: !!id })
}
