import { TUser } from '@src/modules'
import { PresetStatusColorType } from 'antd/es/_util/colors'

export enum EStatusDoc {
  ACTIVE = 'active', // Đang hoạt động
  DRAFT = 'draft', // Dự thảo or nháp
  INACTIVE = 'inactive', // Không hoạt động
  PENDING = 'pending', // Chờ phê duyệt
}

export type TStatusDoc = {
  key: number
  value: EStatusDoc
  status: PresetStatusColorType
}

export enum ERole {
  GUEST = 'GUEST',
  EDITOR = 'EDITOR',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

export enum ELanguage {
  VI = 'vi',
  EN = 'en',
}

export type TDocWithTimestamps = {
  createdAt: Date
  updatedAt: Date
}

export type TDocWithAuthor = {
  author: TUser
  editedBy: string
}

export type TDocWithVersion = {
  __v: number
}

export enum EOrder {
  DESC = 'DESC',
  ASC = 'ASC',
}

export enum EOrderBy {
  ID = '_id',
  CREATED_DATE = 'createdAt',
  UPDATED_DATE = 'updatedAt',
  USERNAME = 'username',
  NAME = 'name',
  NAME_SORT = 'nameSort',
}

export interface IStatusCode {
  statusCode: number
}

export interface IMessage {
  message: string
}

export interface ILimit {
  limit?: number
}

export interface IPage {
  page?: number
}

export interface IExtra<T = any> {
  [key: string]: T
}

export type TQueryParamsGetData<T = any> = ILimit &
  IPage & {
    order?: EOrder
    orderBy?: EOrderBy
    s?: string
    authorId?: string
    'unIds[]'?: string[]
    'notInIds[]'?: string[]
  } & T

export type TResDataListApi<T = any, K = any> = {
  page: number
  limit: number
  total: number
} & { data: T } & IExtra<K>

export type TResApi<T = any, K = any> = IStatusCode & IMessage & { data: T } & IExtra<K>

export type TResApiErr<T = any, K = any> = IStatusCode &
  IMessage & {
    code: number
    message: string | string[]
    statusText: string
    status: number | string
    data: T
  } & IExtra<K>

export type TRemoveMany = {
  ids: string[]
}

export type TEditSlug = {
  slug: string
}
