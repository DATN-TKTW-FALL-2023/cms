import { NError, NSuccess } from '@src/configs/const.config'
import { TResApi, TResApiErr, TResDataListApi } from '@src/configs/interface.config'
import { checkAuth } from '@src/libs/localStorage'
import {
  EMediaSystem,
  TFile,
  TFolder,
  TFolderMakeTree,
  TMoveFile,
  TMoveFolder,
  TPatchFile,
  TPatchFolder,
  TPathFolder,
  TQueryFile,
  TQueryFolder,
} from '@src/modules'
import { notification } from 'antd'
import { useMutation, useQuery } from 'react-query'

import {
  getFileById,
  getFolderById,
  getFolderMakeTreeById,
  getListFile,
  getListFolder,
  moveFile,
  moveFolderById,
  patchFileById,
  patchFolderById,
  postFolder,
  removeFileById,
  removeFolderById,
  removeManyFile,
  uploadFileBySystem,
} from '../apis'
import { DETAIL_FILE, DETAIL_FOLDER, FOLDER_MAKE_TREE, LIST_FILE, LIST_FOLDER } from '../keys'

// FOLDER

/**
 * @method useQueryListFolder
 * @param {TQueryFolder}params
 * @param {string}token
 * @returns
 */
export const useQueryListFolder = (params: TQueryFolder, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResDataListApi<TFolder[]>>(
    [LIST_FOLDER, JSON.stringify(params)],
    () => getListFolder(params, accessToken),
    {
      enabled: !!accessToken,
    },
  )
}

/**
 * @method useMutationFolder
 */
export const useMutationPostFolder = () =>
  useMutation(postFolder, {
    onSuccess: (res: TResApi<TFolder>) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useQueryFolderById
 * @param {string}id
 * @param {string}token
 * @returns
 */
export const useQueryFolderById = (id: string, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<TFolder, TPathFolder[]>>([DETAIL_FOLDER, id], () => getFolderById(id, accessToken), {
    enabled: !!accessToken && !!id,
  })
}

/**
 * @method useQueryFolderMakeTree
 * @param {string}id
 * @param {string}token
 * @returns
 */
export const useQueryFolderMakeTree = (token?: string, id?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<TFolderMakeTree>>([FOLDER_MAKE_TREE, id], () => getFolderMakeTreeById(id, accessToken), {
    enabled: !!accessToken,
  })
}

/**
 * @method useMutationPatchFolderById
 * @returns
 */
export const useMutationPatchFolderById = () =>
  useMutation(({ id, data }: { id: string; data: TPatchFolder }) => patchFolderById(id, data), {
    onSuccess: (res: TResApi) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useMutationRemoveFolderById
 * @returns
 */
export const useMutationRemoveFolderById = () =>
  useMutation(removeFolderById, {
    onSuccess: (res: TResApi) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

export const useMutationMoveFolderById = () =>
  useMutation(({ id, data }: { id: string; data: TMoveFolder }) => moveFolderById(id, data), {
    onSuccess: (res: TResApi) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

// FILE

/**
 * @method useMutationUploadFileBySystem
 * @returns
 */
export const useMutationUploadFileBySystem = () =>
  useMutation(({ system, data }: { system: EMediaSystem; data: FormData }) => uploadFileBySystem(system, data), {
    onSuccess: (res: TResApi<TFile | TFile[]>) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useQueryListFile
 * @param {TQueryFile}params
 * @param {string}token
 * @returns
 */
export const useQueryListFile = (params: TQueryFile, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResDataListApi<TFile[]>>(
    [LIST_FILE, JSON.stringify(params)],
    () => getListFile(params, accessToken),
    {
      enabled: !!accessToken,
    },
  )
}

/**
 * @method useQueryFileById
 * @param {string}id
 * @param {string}token
 * @returns
 */
export const useQueryFileById = (id: string, token?: string) => {
  const accessToken = token || checkAuth()
  return useQuery<TResApi<TFile>>([DETAIL_FILE, id], () => getFileById(id, accessToken), {
    enabled: !!accessToken,
  })
}

/**
 * @method useMutationPatchFileById
 */
export const useMutationPatchFileById = () =>
  useMutation(({ id, data }: { id: string; data: TPatchFile }) => patchFileById(id, data), {
    onSuccess: (res: TResApi) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useMutationRemoveFileById
 */
export const useMutationRemoveFileById = () =>
  useMutation(removeFileById, {
    onSuccess: (res: TResApi) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useMutationRemoveManyFile
 */
export const useMutationRemoveManyFile = () =>
  useMutation(removeManyFile, {
    onSuccess: (res: TResApi) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })

/**
 * @method useMutationMoveManyFile
 */
export const useMutationMoveFileById = () =>
  useMutation(({ id, data }: { id: string; data: TMoveFile }) => moveFile(id, data), {
    onSuccess: (res: TResApi) => {
      // [TODO] ...
      notification.success({ message: NSuccess, description: res?.message })
    },
    onError: (error: TResApiErr) => {
      // [TODO] ...
      notification.error({ message: NError, description: error?.message })
    },
  })
