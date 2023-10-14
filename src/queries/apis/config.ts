import { API_PREFIX, API_TIMEOUT, BASE_URL, SECRET_KEY } from '@configs/api.config'
import logger from '@libs/logger'
import axios, { AxiosRequestConfig } from 'axios'
import { LANGUAGE_DEFAULT } from '@src/configs/const.config'
import { ELanguage } from '@src/configs/interface.config'
import { checkAuth } from '@libs/localStorage'
import { HmacSHA256, enc } from 'crypto-js'

const client = axios.create({
  baseURL: BASE_URL + API_PREFIX,
  timeout: API_TIMEOUT,
  timeoutErrorMessage: '🚧🚧🚧 Server connection time out !',
  headers: {
    Accept: 'application/json',
    xsrfCookieName: 'XSRF-TOKEN',
    xsrfHeaderName: 'X-XSRF-TOKEN',
    responseEncoding: 'utf8',
    responseType: 'json',
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Access-Control-Allow-Origin': '*',
    'X-Application': 'web app',
    'X-Version': '1.0.1',
  },
})

export const request = async (
  options: AxiosRequestConfig,
  additional?: { lang?: ELanguage | string; token?: string },
) => {
  logger.debug('🚧🚧🚧 ~ Axios Options:', options)

  if (process.env.NODE_ENV === 'production') {
    const data = `${options?.method || 'GET'}:${API_PREFIX}/${options.url}`
    const apiKey = HmacSHA256(data, SECRET_KEY).toString(enc.Hex)
    client.defaults.headers.common['x-csrf-token'] = apiKey
  }

  client.defaults.headers.common.Authorization = `Bearer ${additional?.token || checkAuth() || undefined}`

  client.defaults.headers.common.lang = LANGUAGE_DEFAULT

  const onSuccess = (response: any) => {
    logger.debug('🚀🚀🚀 ~ Response API:', response?.data)
    return response?.data
  }
  const onError = async (error: any) => {
    logger.error('🚨🚨🚨 ~ Axios onError:', onError)
    await Promise.reject({
      statusCode: error?.response?.data?.statusCode,
      message: error?.response?.data?.message,
      statusText: error?.response?.statusText,
      status: error?.response?.status,
      data: error?.response?.data?.data || null,
    })
  }
  return client(options).then(onSuccess).catch(onError)
}
