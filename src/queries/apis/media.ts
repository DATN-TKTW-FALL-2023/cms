import { TRemoveMany, TResApi } from '@src/configs/interface.config'
import {
  EMediaSystem,
  TFile,
  TMoveFile,
  TMoveFolder,
  TPatchFile,
  TPatchFolder,
  TPostFolder,
  TQueryFile,
  TQueryFolder,
} from '@src/modules'

import { request } from './config'

// Folder API
export const postFolder = (data: TPostFolder) => request({ url: 'media/folder', method: 'POST', data })
export const getListFolder = (params: TQueryFolder, token?: string) =>
  request({ url: 'media/folder', method: 'GET', params }, { token })
export const getFolderById = (id: string, token?: string) =>
  request({ url: `media/folder/${id}`, method: 'GET' }, { token })
export const patchFolderById = (id: string, data: TPatchFolder) =>
  request({ url: `media/folder/${id}`, method: 'PATCH', data })
export const removeFolderById = (id: string) => request({ url: `media/folder/${id}`, method: 'DELETE' })
export const moveFolderById = (id: string, data: TMoveFolder) =>
  request({ url: `media/folder/move/${id}`, method: 'PATCH', data })
export const getFolderMakeTreeById = (id?: string, token?: string) =>
  request({ url: 'media/folder/make/tree', params: { id }, method: 'GET' }, { token })

// File API
export const uploadFileBySystem = (system: EMediaSystem, data: FormData): Promise<TResApi<TFile | TFile[]>> =>
  request({
    url: `media/file/${system}/upload`,
    method: 'POST',
    data,
    headers: {
      Accept: 'application/xml, text/plain, text/html, *.*',
      'Content-Type': 'multipart/form-data, application/x-www-form-urlencoded;charset=utf-8',
    },
    transformRequest: [() => data],
  })

export const getListFile = (params: TQueryFile, token?: string) =>
  request({ url: 'media/file', method: 'GET', params }, { token })
export const getFileById = (id: string, token?: string) =>
  request({ url: `media/file/${id}`, method: 'GET' }, { token })
export const patchFileById = (id: string, data: TPatchFile) =>
  request({ url: `media/file/${id}`, method: 'PATCH', data })
export const removeFileById = (id: string) => request({ url: `media/file/${id}`, method: 'DELETE' })
export const removeManyFile = (data: TRemoveMany) => request({ url: 'file/delete-many', method: 'POST', data })
export const moveFile = (id: string, data: TMoveFile) =>
  request({ url: `media/file/move/${id}`, method: 'PATCH', data })
