import { request } from "./config";

export const createFilm = (data: any) => request({ url: 'film', method: 'POST', data })
