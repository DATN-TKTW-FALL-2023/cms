import {
  EStatusDoc,
  TDocWithAuthor,
  TDocWithTimestamps,
  TDocWithVersion,
  TQueryParamsGetData,
} from '@src/configs/interface.config'

import { TFile } from './media'
import { TTaxonomy } from './taxonomy'

export type TPost = {
  _id: string
  name: string
  nameSort: string
  slug: string
  content: string
  excerpt: string
  thumbnail: TFile
  taxonomies: TTaxonomy[]
  scheduleAt: Date
  status: EStatusDoc
} & TDocWithTimestamps &
  TDocWithAuthor &
  TDocWithVersion

export type TCreatePost = {
  name: string
  content?: string
  excerpt?: string
  thumbnailId?: string
  taxonomyIds?: string[]
  scheduleAt?: Date
  status?: EStatusDoc
}

export type TQueryPost = TQueryParamsGetData<{
  status?: EStatusDoc
  'taxonomyIds[]'?: string[]
}>

export type TPatchPost = Partial<TCreatePost>
