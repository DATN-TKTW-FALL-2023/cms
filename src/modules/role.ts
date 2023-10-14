import { TDocWithTimestamps, TDocWithVersion, TQueryParamsGetData } from '@src/configs/interface.config'
import { ACCESS } from '@src/configs/permission'

export type TQueryRole = TQueryParamsGetData

export type TPostRole = {
  code: string
  description?: string
  permissions?: ACCESS[]
}

export type TPatchRole = Partial<TPostRole>

export type TPermission = {
  group: string
  permissions: ACCESS[]
}

export type TRole = {
  _id: string
  code: string
  description: string
  permissions: ACCESS[]
  isActive: boolean
} & TDocWithTimestamps &
  TDocWithVersion
