import { TDocWithAuthor, TDocWithTimestamps, TDocWithVersion, TQueryParamsGetData } from '@src/configs/interface.config'

export type TTaxonomy = {
  _id: string
  name: string
  nameSort: string
  slug: string
  description: string
  parent: TTaxonomy
  postType: string
  left: number
  right: number
} & TDocWithTimestamps &
  TDocWithAuthor &
  TDocWithVersion

export type TQueryTaxonomy = TQueryParamsGetData<{
  parentId?: string
  isGenealogy?: 0 | 1
  postType?: string
}>

export type TPatchTaxonomy = {
  name?: string
  description?: string
}

export type TTaxonomyMakeTree = {
  _id: string
  name: string
  nameSort: string
  slug: string
  parent: string | null
  children: TTaxonomyMakeTree[]
  text: string
  value: string
}

export type TPostTaxonomy = {
  name: string
  description?: string
  parentId?: string
  postType?: string
}

export type TMoveTaxonomy = {
  newParentId?: string
}
