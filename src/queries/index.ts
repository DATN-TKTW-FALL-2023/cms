import { QueryClient } from 'react-query'
import logger from '@libs/logger'
import { checkAuth } from '@libs/localStorage'
import { refreshTokenFn } from '@queries/hooks'
import { notification } from 'antd'
import { NError, NSuccess } from '@src/configs/const.config'

function queryErrorHandler(error: any): void {
  notification.error({ message: NError, description: error?.message })
  // error is type unknown because in js, anything can be an error (e.g. throw(5))
  const accessToken = checkAuth()
  const id = 'react-query-error'
  const title =
    error instanceof Error
      ? // remove the initial 'Error: ' that accompanies many errors
        error.toString().replace(/^Error:\s*/, '')
      : 'error connecting to server'
  if (error?.statusCode === 401 && accessToken) {
    refreshTokenFn()
  } else {
    // Todo
  }
  // prevent duplicate toasts
  // TODO...
  logger.debug('🚀 ~ Query onError:', { id, title, error })
}

function querySuccessHandler(res: any): void {
  notification.success({ message: NSuccess, description: res?.message })
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      onError: queryErrorHandler,
      staleTime: 600000, // 10 minutes
      cacheTime: 900000, // 15 minutes
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      retry: 2,
    },
    mutations: {
      onError: queryErrorHandler,
      onSuccess: querySuccessHandler,
    },
  },
})
