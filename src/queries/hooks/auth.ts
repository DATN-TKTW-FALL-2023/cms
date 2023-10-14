import { TResApi, TResApiErr } from '@configs/interface.config'
import { checkAuth, clearStoredAuth, getStoredAuth, setStoredAuth } from '@libs/localStorage'
import { NError, NSuccess } from '@configs/const.config'
import { TAuth, TSignature } from '@src/modules'
import { notification } from 'antd'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import logger from '@libs/logger'
import { TUser } from '@src/modules/user'
import { getProfile, refreshToken, signIn, signOut } from '@queries/apis'
import { USER_CURRENT_ROLE, USER_PROFILE } from '@queries/keys'
import { TRole } from '@src/modules/role'

import { getRoleCurrent } from '../apis/role'

/**
 * @method useQuerySignIn
 * @returns
 */
export const useMutationSignIn = () => {
  const queryClient = useQueryClient()
  return useMutation(signIn, {
    onSuccess: async (res: TResApi<TAuth>) => {
      setStoredAuth(res.data.auth)
      notification.success({
        message: NSuccess,
        description: res.message,
      })
    },
    onError: (error: TResApiErr) => {
      void clearStoredAuth()
      notification.error({
        message: NError,
        description: error.message || error.statusText,
      })
    },
    onSettled: () => {
      queryClient.invalidateQueries()
    },
  })
}

/**
 * @method useMutationSignOut
 * @returns
 */
export const useMutationSignOut = () => {
  const queryClient = useQueryClient()
  const accessToken = checkAuth()
  return useMutation(() => signOut(accessToken), {
    onSuccess: (data: TResApi) => {
      logger.debug('SignOut data:', data)
      // Todo
    },
    onError: (error: TResApiErr) => {
      logger.error('SignOut error:', error)
      // Todo
    },
    onSettled(data, error, variables, context) {
      logger.debug('signOut onSettled', data, error, variables, context)
      queryClient.invalidateQueries()
      void clearStoredAuth()
    },
  })
}

/**
 * @method useQueryProfile
 * @returns
 */
export const useQueryProfile = (token: string) =>
  useQuery<TResApi<TUser>>([USER_PROFILE], () => getProfile(token), {
    enabled: !!token,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 2,
  })

/**
 * @method useQueryRoleCurrent
 * @returns
 */
export const useQueryRoleCurrent = (token: string) =>
  useQuery<TResApi<TRole[]>>([USER_CURRENT_ROLE], () => getRoleCurrent(token), {
    enabled: !!token,
    refetchOnMount: true,
    refetchOnReconnect: true,
    refetchOnWindowFocus: true,
    retry: 2,
  })

/**
 * @method refreshTokenFn
 * @returns
 */
export const refreshTokenFn: () => void = async () => {
  const signature: TSignature | null = getStoredAuth()
  if (signature) {
    const result: TResApi = await refreshToken(signature.accessToken, signature?.refreshToken || '')
    if (result.statusCode === 200)
      setStoredAuth({
        ...signature,
        accessToken: result.data.accessToken,
        expiredAt: result.data.expiredAt,
      })
    return result
  }
  // TODO ...
  return false
}
