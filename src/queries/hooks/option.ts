
import { NError, NSuccess } from '@configs/const.config'
import { GetListOption, UpdateOption } from '@queries/apis/option'
import { TResApi, TResApiErr } from '@src/configs/interface.config'
import { useMutation, useQuery } from 'react-query'
import { queryClient } from '..'
import { notification } from 'antd'
import { LIST_OPTION } from '../keys'
import { checkAuth } from '@src/libs/localStorage'

export const useQueryGetListOption = (params: any, token?: string) => {
    const accessToken = token || checkAuth()
    return useQuery([LIST_OPTION, JSON.stringify(params)], () => GetListOption(params, accessToken), {
      enabled: !!accessToken,
    })
  }
export const useMutationUpdateOption = () =>
  useMutation(UpdateOption, {
    onSuccess: (res: TResApi<any>) => {
      queryClient.refetchQueries([LIST_OPTION])
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })
