import { TDocWithTimestamps, TDocWithVersion, TQueryParamsGetData } from '@src/configs/interface.config'

import { TFile } from './media'
import { TRole } from './role'

export type TQueryUser = TQueryParamsGetData<{
  isActive?: boolean
  roles?: string[]
}>

export type TSetPassword = {
  newPassword: string
  confirmPassword: string
}

export type TPostUser = {
  username: string
  firstName: string
  lastName: string
  password: string
  confirmPassword: string
  avatar?: string
  email?: string
  phone?: string
  isActive?: boolean
  roles?: string[]
}

export type TPatchUser = Omit<Partial<TPostUser>, 'password' | 'confirmPassword'>

export type TUser = {
  _id: string
  username: string
  email: string
  phone: string
  lastName: string
  firstName: string
  isActive: boolean
  avatar: TFile
  roles: TRole[]
} & TDocWithTimestamps &
  TDocWithVersion
