import { TDocWithAuthor, TDocWithTimestamps, TDocWithVersion, TQueryParamsGetData } from '@src/configs/interface.config'

export enum EMediaFile {
  IMAGE = 'image',
  DOCUMENT = 'document',
  VIDEO = 'video',
  AUDIO = 'audio',
}

export enum EMediaSystem {
  S3 = 's3',
  SERVER = 'server',
}

export interface ParticleStoredFile {
  mimetype: string
  encoding: string
  originalName: string
}

export const IMAGE_RGX = /\.(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/
export const VIDEO_RGX = /\.(mp4|mov|mwv|avi|mkv|flv|webm|mts|mpeg4|MP4|MOV|WMV|AVI|MKV|FLV|WEBM|MTS|MPEG4)$/
export const DOCUMENT_RGX =
  /\.(csv|pdf|doc|docx|xls|xlsx|ppt|pptx|txt|xml|odt|ods|CSV|PDF|DOC|DOCX|XLS|XLSX|PPT|PPTX|TXT|XML|ODT|ODS)$/
export const AUDIO_RGX = /\.(mp3|flac|wav|wma|aac|m4A|M4A|FLAC|MP3|WAV|WMA|AAC)$/

// Folder

export type TFolder = {
  _id: string
  name: string
  nameSort: string
  parent: TFolder
  left: number
  right: number
} & TDocWithTimestamps &
  TDocWithAuthor &
  TDocWithVersion

export type TFolderMakeTree = {
  _id: string
  name: string
  nameSort: string
  parent: string | null
  title: string
  value: string
  children: TFolderMakeTree[]
}

export type TPathFolder = {
  _id: string
  name: string
}

export type TFormValueCEFolder = {
  name: string
}

export type TPostFolder = TFormValueCEFolder & {
  parentId?: string
}

export type TQueryFolder = TQueryParamsGetData<{
  parentId?: string
  isGenealogy?: 0 | 1
}>

export type TPatchFolder = {
  name?: string
}

export type TMoveFolder = {
  newParentId?: string
}

// File

export type TFile = {
  _id: string
  name: string
  originalname: string | null
  size: number
  extension: string
  mimetype: string
  bucket: string
  location: string
  key: string
  width: number | null
  height: number | null
  alt: string | null
  caption: string | null
  description: string | null
  system: string
  folder: TFolder
} & TDocWithTimestamps &
  TDocWithAuthor &
  TDocWithVersion

export type TUploadFile = {
  file: File[]
  isWebp: 0 | 1
  folderId?: string
}

export type TQueryFile = TQueryParamsGetData<{
  folderId?: string
}>

export type TPatchFile = {
  name?: string
  alt?: string
  caption?: string
  description?: string
}

export type TMoveFile = {
  folderId?: string
}
