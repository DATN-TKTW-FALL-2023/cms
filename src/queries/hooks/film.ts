import { NError, NSuccess } from '@configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'

import { queryClient } from '..'
import {
          createFilm,
          createLayout,
          getListFilm,

} from '../apis'
import { TQueryLayout } from '@src/modules'
import { LIST_FILM } from '../keys'

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
          return useQuery<TResDataListApi<any[]>>(
              [LIST_FILM],
              () => getListFilm(params, accessToken),
              { enabled: !!accessToken },
          )
      }


