import { TQueryLayout } from "@src/modules";
import { request } from "./config";

export const createFilm = (data: any) => request({ url: 'film', method: 'POST', data })
export const getListFilm = (params: TQueryLayout, token?: string) => request({ url: 'film', method: 'GET', params }, { token })
