import { TQueryLayout } from "@src/modules";
import { request } from "./config";

export const createFilm = (data: any) => request({ url: 'film', method: 'POST', data })
export const getListFilm = (params: any, token?: string) => request({ url: 'film', method: 'GET', params }, { token })
export const removeFilmById = (id: string) => request({ url: `film/${id}`, method: 'DELETE' })
export const updateFilmById = (id: string, data: any) => request({ url: `film/${id}`, method: 'PATCH', data })
export const getFilmById = (id: string) => request({ url: `film/${id}`, method: 'GET' })
